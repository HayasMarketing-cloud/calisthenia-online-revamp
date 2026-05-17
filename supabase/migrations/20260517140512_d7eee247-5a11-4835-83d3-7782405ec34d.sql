-- ============================================================
-- BLOQUE B — Motivación del alumno: hitos, historial objetivos
-- ============================================================

-- 1. Enum tipo de hito
DO $$ BEGIN
  CREATE TYPE public.milestone_type AS ENUM (
    'streak_7',
    'streak_30',
    'streak_90',
    'best_streak',
    'adherence_80',
    'first_session',
    'goal_completed',
    'sessions_10',
    'sessions_50',
    'sessions_100'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. Tabla client_milestones
CREATE TABLE IF NOT EXISTS public.client_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL,
  milestone_type public.milestone_type NOT NULL,
  value numeric,
  label text,
  metadata jsonb DEFAULT '{}'::jsonb,
  achieved_at timestamptz NOT NULL DEFAULT now(),
  is_archived boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_client_milestones_unique
  ON public.client_milestones (client_id, milestone_type, COALESCE(value, 0));
CREATE INDEX IF NOT EXISTS idx_client_milestones_client
  ON public.client_milestones (client_id, achieved_at DESC);

ALTER TABLE public.client_milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin manages milestones" ON public.client_milestones;
CREATE POLICY "Admin manages milestones" ON public.client_milestones
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Clients view own milestones" ON public.client_milestones;
CREATE POLICY "Clients view own milestones" ON public.client_milestones
  FOR SELECT TO authenticated
  USING (client_id = auth.uid());

DROP POLICY IF EXISTS "Clients archive own milestones" ON public.client_milestones;
CREATE POLICY "Clients archive own milestones" ON public.client_milestones
  FOR UPDATE TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

-- 3. Tabla goal_progress_history
CREATE TABLE IF NOT EXISTS public.goal_progress_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id uuid NOT NULL,
  client_id uuid NOT NULL,
  value numeric NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_goal_progress_history_goal
  ON public.goal_progress_history (goal_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_goal_progress_history_client
  ON public.goal_progress_history (client_id, recorded_at DESC);

ALTER TABLE public.goal_progress_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin manages goal history" ON public.goal_progress_history;
CREATE POLICY "Admin manages goal history" ON public.goal_progress_history
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Clients view own goal history" ON public.goal_progress_history;
CREATE POLICY "Clients view own goal history" ON public.goal_progress_history
  FOR SELECT TO authenticated
  USING (client_id = auth.uid());

-- 4. pinned_goal_id en client_profiles
ALTER TABLE public.client_profiles
  ADD COLUMN IF NOT EXISTS pinned_goal_id uuid;

-- 5. Trigger goal_progress -> history + goal_completed milestone
CREATE OR REPLACE FUNCTION public.track_goal_progress()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert history row si current_value cambió
  IF TG_OP = 'INSERT' OR NEW.current_value IS DISTINCT FROM OLD.current_value THEN
    IF NEW.current_value IS NOT NULL THEN
      INSERT INTO public.goal_progress_history (goal_id, client_id, value)
      VALUES (NEW.id, NEW.client_id, NEW.current_value);
    END IF;
  END IF;

  -- Hito: objetivo completado
  IF NEW.target_value IS NOT NULL
     AND NEW.current_value IS NOT NULL
     AND NEW.start_value IS NOT NULL THEN
    -- Detectar dirección (subir o bajar)
    IF (
      (NEW.target_value >= NEW.start_value AND NEW.current_value >= NEW.target_value)
      OR
      (NEW.target_value <  NEW.start_value AND NEW.current_value <= NEW.target_value)
    ) THEN
      INSERT INTO public.client_milestones (client_id, milestone_type, value, label, metadata)
      VALUES (
        NEW.client_id,
        'goal_completed',
        NEW.target_value,
        COALESCE(NEW.custom_label, NEW.goal_type::text),
        jsonb_build_object('goal_id', NEW.id, 'goal_type', NEW.goal_type)
      )
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_track_goal_progress ON public.goal_progress;
CREATE TRIGGER trg_track_goal_progress
  AFTER INSERT OR UPDATE ON public.goal_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.track_goal_progress();

-- 6. Función de detección de hitos por sesión completada
CREATE OR REPLACE FUNCTION public.detect_session_milestones()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total_completed int;
  v_streak int;
  v_pct_7d numeric;
BEGIN
  -- Solo nos interesa cuando una sesión pasa a 'completed'
  IF NEW.status IS DISTINCT FROM 'completed' THEN
    RETURN NEW;
  END IF;
  IF TG_OP = 'UPDATE' AND OLD.status = 'completed' THEN
    RETURN NEW;
  END IF;

  -- Total de sesiones completadas
  SELECT COUNT(*) INTO v_total_completed
  FROM public.workout_sessions
  WHERE client_id = NEW.client_id AND status = 'completed';

  -- Primera sesión
  IF v_total_completed = 1 THEN
    INSERT INTO public.client_milestones (client_id, milestone_type, value, label)
    VALUES (NEW.client_id, 'first_session', 1, 'Primera sesión completada')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Hitos por totales
  IF v_total_completed >= 10 THEN
    INSERT INTO public.client_milestones (client_id, milestone_type, value, label)
    VALUES (NEW.client_id, 'sessions_10', 10, '10 sesiones completadas')
    ON CONFLICT DO NOTHING;
  END IF;
  IF v_total_completed >= 50 THEN
    INSERT INTO public.client_milestones (client_id, milestone_type, value, label)
    VALUES (NEW.client_id, 'sessions_50', 50, '50 sesiones completadas')
    ON CONFLICT DO NOTHING;
  END IF;
  IF v_total_completed >= 100 THEN
    INSERT INTO public.client_milestones (client_id, milestone_type, value, label)
    VALUES (NEW.client_id, 'sessions_100', 100, '100 sesiones completadas')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Hitos de racha (leemos client_adherence ya actualizada)
  SELECT current_streak, adherence_pct_7d
  INTO v_streak, v_pct_7d
  FROM public.client_adherence
  WHERE client_id = NEW.client_id;

  IF v_streak >= 7 THEN
    INSERT INTO public.client_milestones (client_id, milestone_type, value, label)
    VALUES (NEW.client_id, 'streak_7', 7, 'Racha de 7 días')
    ON CONFLICT DO NOTHING;
  END IF;
  IF v_streak >= 30 THEN
    INSERT INTO public.client_milestones (client_id, milestone_type, value, label)
    VALUES (NEW.client_id, 'streak_30', 30, 'Racha de 30 días')
    ON CONFLICT DO NOTHING;
  END IF;
  IF v_streak >= 90 THEN
    INSERT INTO public.client_milestones (client_id, milestone_type, value, label)
    VALUES (NEW.client_id, 'streak_90', 90, 'Racha de 90 días')
    ON CONFLICT DO NOTHING;
  END IF;
  IF v_pct_7d >= 80 THEN
    INSERT INTO public.client_milestones (client_id, milestone_type, value, label)
    VALUES (NEW.client_id, 'adherence_80', 80, 'Adherencia ≥80% (7d)')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_detect_session_milestones ON public.workout_sessions;
CREATE TRIGGER trg_detect_session_milestones
  AFTER INSERT OR UPDATE OF status ON public.workout_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.detect_session_milestones();
