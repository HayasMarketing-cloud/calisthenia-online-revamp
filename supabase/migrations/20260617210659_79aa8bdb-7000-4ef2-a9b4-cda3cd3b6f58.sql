-- Enum para tipo de sesión
DO $$ BEGIN
  CREATE TYPE public.session_type AS ENUM ('strength', 'running', 'mobility', 'mixed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Añadir session_type a program_days
ALTER TABLE public.program_days
  ADD COLUMN IF NOT EXISTS session_type public.session_type NOT NULL DEFAULT 'strength';

-- Enums para steps
DO $$ BEGIN
  CREATE TYPE public.running_step_type AS ENUM ('warmup', 'work', 'recovery', 'cooldown', 'repeat');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.running_duration_type AS ENUM ('time', 'distance', 'open');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.running_target_type AS ENUM ('pace', 'heart_rate', 'rpe', 'none');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Tabla principal de sesión de carrera
CREATE TABLE IF NOT EXISTS public.running_workouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_day_id uuid NOT NULL UNIQUE REFERENCES public.program_days(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT 'Sesión de carrera',
  total_duration_min integer,
  total_distance_km numeric(6,2),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.running_workouts TO authenticated;
GRANT ALL ON public.running_workouts TO service_role;

ALTER TABLE public.running_workouts ENABLE ROW LEVEL SECURITY;

-- Helper: ¿este program_day pertenece a un programa del usuario?
CREATE OR REPLACE FUNCTION public.user_owns_program_day(_day_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM program_days pd
    JOIN program_weeks pw ON pw.id = pd.week_id
    JOIN programs p ON p.id = pw.program_id
    WHERE pd.id = _day_id AND p.client_id = _user_id
  );
$$;
REVOKE EXECUTE ON FUNCTION public.user_owns_program_day(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.user_owns_program_day(uuid, uuid) TO authenticated, service_role;

CREATE POLICY "Clients view own running workouts"
  ON public.running_workouts FOR SELECT TO authenticated
  USING (public.user_owns_program_day(program_day_id, auth.uid()) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage running workouts"
  ON public.running_workouts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Tabla de pasos
CREATE TABLE IF NOT EXISTS public.running_workout_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id uuid NOT NULL REFERENCES public.running_workouts(id) ON DELETE CASCADE,
  parent_step_id uuid REFERENCES public.running_workout_steps(id) ON DELETE CASCADE,
  order_index integer NOT NULL DEFAULT 0,
  step_type public.running_step_type NOT NULL,
  repeat_count integer,
  duration_type public.running_duration_type NOT NULL DEFAULT 'time',
  duration_value integer,
  target_type public.running_target_type NOT NULL DEFAULT 'none',
  target_low integer,
  target_high integer,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS running_workout_steps_workout_idx ON public.running_workout_steps(workout_id, order_index);
CREATE INDEX IF NOT EXISTS running_workout_steps_parent_idx ON public.running_workout_steps(parent_step_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.running_workout_steps TO authenticated;
GRANT ALL ON public.running_workout_steps TO service_role;

ALTER TABLE public.running_workout_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients view own running steps"
  ON public.running_workout_steps FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.running_workouts rw
      WHERE rw.id = workout_id
        AND (public.user_owns_program_day(rw.program_day_id, auth.uid()) OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Admins manage running steps"
  ON public.running_workout_steps FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.touch_running_workout()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS running_workouts_updated_at ON public.running_workouts;
CREATE TRIGGER running_workouts_updated_at
  BEFORE UPDATE ON public.running_workouts
  FOR EACH ROW EXECUTE FUNCTION public.touch_running_workout();