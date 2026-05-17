
-- ============ ENUMS NUEVOS ============
CREATE TYPE public.movement_pattern_type AS ENUM (
  'push', 'pull', 'squat', 'hinge', 'core', 'locomotion', 'isometric'
);

CREATE TYPE public.session_feeling_type AS ENUM (
  'great', 'good', 'hard', 'too_hard', 'painful'
);

CREATE TYPE public.journey_stage_type AS ENUM (
  'base', 'control', 'elite', 'renewal', 'annual_plan', 'inactive'
);

-- ============ AMPLIAR ENUM EXISTENTE ============
-- Nota: ALTER TYPE ADD VALUE debe ir en su propia transacción si se referencia en la misma migración.
-- Lo añadimos solo (no se referencia desde DDL aquí); la lógica que lo usa irá en la refactorización
-- de recalculate_adherence() posterior.
ALTER TYPE public.adherence_status ADD VALUE IF NOT EXISTS 'low_engagement' BEFORE 'at_risk';

-- ============ ALTER: exercises ============
ALTER TABLE public.exercises
  ADD COLUMN IF NOT EXISTS movement_pattern public.movement_pattern_type,
  ADD COLUMN IF NOT EXISTS coach_tips text,
  ADD COLUMN IF NOT EXISTS common_errors text,
  ADD COLUMN IF NOT EXISTS easier_variation_id uuid REFERENCES public.exercises(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS harder_variation_id uuid REFERENCES public.exercises(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS default_sets integer,
  ADD COLUMN IF NOT EXISTS default_reps text,
  ADD COLUMN IF NOT EXISTS default_rest_seconds integer;

-- ============ ALTER: session_checkins ============
ALTER TABLE public.session_checkins
  ADD COLUMN IF NOT EXISTS pain_level smallint,
  ADD COLUMN IF NOT EXISTS pain_location text,
  ADD COLUMN IF NOT EXISTS rpe smallint,
  ADD COLUMN IF NOT EXISTS duration_minutes_real integer,
  ADD COLUMN IF NOT EXISTS session_feeling public.session_feeling_type;

-- Validación por trigger (no CHECK constraint, según política del proyecto)
CREATE OR REPLACE FUNCTION public.validate_session_checkin()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.pain_level IS NOT NULL AND (NEW.pain_level < 0 OR NEW.pain_level > 10) THEN
    RAISE EXCEPTION 'pain_level debe estar entre 0 y 10';
  END IF;
  IF NEW.rpe IS NOT NULL AND (NEW.rpe < 1 OR NEW.rpe > 10) THEN
    RAISE EXCEPTION 'rpe debe estar entre 1 y 10';
  END IF;
  IF NEW.difficulty_rating IS NOT NULL AND (NEW.difficulty_rating < 1 OR NEW.difficulty_rating > 10) THEN
    RAISE EXCEPTION 'difficulty_rating debe estar entre 1 y 10';
  END IF;
  IF NEW.energy_rating IS NOT NULL AND (NEW.energy_rating < 1 OR NEW.energy_rating > 10) THEN
    RAISE EXCEPTION 'energy_rating debe estar entre 1 y 10';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_session_checkin ON public.session_checkins;
CREATE TRIGGER trg_validate_session_checkin
  BEFORE INSERT OR UPDATE ON public.session_checkins
  FOR EACH ROW EXECUTE FUNCTION public.validate_session_checkin();

-- ============ ALTER: client_profiles ============
ALTER TABLE public.client_profiles
  ADD COLUMN IF NOT EXISTS journey_stage public.journey_stage_type NOT NULL DEFAULT 'base',
  ADD COLUMN IF NOT EXISTS last_activity_at timestamptz;

-- ============ TRIGGER: actualizar last_activity_at en eventos clave ============
CREATE OR REPLACE FUNCTION public.touch_client_last_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_client_id uuid;
BEGIN
  -- Determinar client_id según la tabla
  IF TG_TABLE_NAME = 'workout_sessions' THEN
    v_client_id := NEW.client_id;
  ELSIF TG_TABLE_NAME = 'session_checkins' THEN
    SELECT ws.client_id INTO v_client_id
    FROM public.workout_sessions ws WHERE ws.id = NEW.session_id;
  END IF;

  IF v_client_id IS NOT NULL THEN
    UPDATE public.client_profiles
       SET last_activity_at = now()
     WHERE id = v_client_id;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_touch_activity_sessions ON public.workout_sessions;
CREATE TRIGGER trg_touch_activity_sessions
  AFTER INSERT OR UPDATE ON public.workout_sessions
  FOR EACH ROW EXECUTE FUNCTION public.touch_client_last_activity();

DROP TRIGGER IF EXISTS trg_touch_activity_checkins ON public.session_checkins;
CREATE TRIGGER trg_touch_activity_checkins
  AFTER INSERT ON public.session_checkins
  FOR EACH ROW EXECUTE FUNCTION public.touch_client_last_activity();

-- ============ Backfill last_activity_at desde datos existentes ============
UPDATE public.client_profiles cp
   SET last_activity_at = sub.last_at
  FROM (
    SELECT client_id, MAX(GREATEST(COALESCE(completed_at, started_at), started_at)) AS last_at
      FROM public.workout_sessions
     GROUP BY client_id
  ) sub
 WHERE cp.id = sub.client_id;
