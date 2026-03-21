
-- =============================================
-- BLOQUE 0: Schema completo para Calistenia App
-- =============================================

-- 1. ENUMS
CREATE TYPE public.activity_level AS ENUM ('sedentary', 'light_active', 'active', 'very_active');
CREATE TYPE public.difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE public.program_status AS ENUM ('draft', 'active', 'completed', 'paused', 'cancelled');
CREATE TYPE public.session_status AS ENUM ('in_progress', 'completed', 'skipped');
CREATE TYPE public.adherence_status AS ENUM ('new', 'active', 'at_risk', 'inactive');
CREATE TYPE public.alert_type AS ENUM (
  'inactive_2_3_days',
  'inactive_4plus_days',
  'low_adherence',
  'high_difficulty_streak',
  'low_energy_streak',
  'session_not_completed',
  'new_client_not_started'
);

-- 2. GRUPO 1 — client_profiles (1:1 con profiles)
CREATE TABLE public.client_profiles (
  id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  short_term_goal text,
  long_term_goal text,
  health_conditions text,
  activity_level activity_level DEFAULT 'sedentary',
  daily_steps_avg int,
  lifestyle_description text,
  training_experience text,
  bodyweight_experience boolean DEFAULT false,
  current_training_description text,
  max_pull_ups int,
  max_push_ups int,
  max_squats int,
  training_location text,
  available_equipment text,
  training_days_per_week int DEFAULT 3,
  session_duration_minutes int DEFAULT 60,
  date_of_birth date,
  weight_kg decimal,
  height_cm decimal,
  coach_id uuid REFERENCES public.profiles(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. baseline_metrics
CREATE TABLE public.baseline_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  max_pull_ups int,
  max_push_ups int,
  max_squats int,
  weight_kg decimal,
  notes text,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. GRUPO 2 — exercises
CREATE TABLE public.exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  youtube_video_id text,
  muscle_groups text[] DEFAULT '{}',
  difficulty_level difficulty_level DEFAULT 'beginner',
  equipment_needed text[],
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES public.profiles(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 5. GRUPO 3 — programs
CREATE TABLE public.programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  duration_weeks int DEFAULT 12,
  difficulty_level difficulty_level DEFAULT 'beginner',
  is_template boolean DEFAULT false,
  client_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  coach_id uuid REFERENCES public.profiles(id),
  template_id uuid REFERENCES public.programs(id),
  start_date date,
  end_date date,
  status program_status DEFAULT 'draft',
  phase_number int DEFAULT 1,
  tags text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 6. program_weeks
CREATE TABLE public.program_weeks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  week_number int NOT NULL,
  name text,
  notes text,
  start_date date
);

-- 7. program_days
CREATE TABLE public.program_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id uuid NOT NULL REFERENCES public.program_weeks(id) ON DELETE CASCADE,
  day_number int NOT NULL,
  scheduled_date date,
  name text,
  is_rest_day boolean DEFAULT false,
  notes text
);

-- 8. program_day_exercises
CREATE TABLE public.program_day_exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id uuid NOT NULL REFERENCES public.program_days(id) ON DELETE CASCADE,
  exercise_id uuid NOT NULL REFERENCES public.exercises(id),
  order_index int NOT NULL DEFAULT 0,
  sets int,
  reps text,
  rest_seconds int,
  notes text,
  custom_youtube_video_id text
);

-- 9. GRUPO 4 — workout_sessions
CREATE TABLE public.workout_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  program_day_id uuid REFERENCES public.program_days(id),
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  status session_status DEFAULT 'in_progress',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 10. session_exercise_logs
CREATE TABLE public.session_exercise_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.workout_sessions(id) ON DELETE CASCADE,
  program_day_exercise_id uuid REFERENCES public.program_day_exercises(id),
  sets_completed int,
  reps_completed text,
  completed boolean DEFAULT false,
  notes text,
  logged_at timestamptz NOT NULL DEFAULT now()
);

-- 11. session_checkins (1:1 con workout_sessions)
CREATE TABLE public.session_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL UNIQUE REFERENCES public.workout_sessions(id) ON DELETE CASCADE,
  completed_workout boolean NOT NULL,
  difficulty_rating int NOT NULL CHECK (difficulty_rating BETWEEN 1 AND 5),
  energy_rating int NOT NULL CHECK (energy_rating BETWEEN 1 AND 5),
  comment text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 12. GRUPO 5 — client_adherence
CREATE TABLE public.client_adherence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  status adherence_status DEFAULT 'new',
  adherence_pct_7d decimal DEFAULT 0,
  adherence_pct_30d decimal DEFAULT 0,
  last_session_at timestamptz,
  days_since_last_session int DEFAULT 0,
  current_streak int DEFAULT 0,
  longest_streak int DEFAULT 0,
  calculated_at timestamptz DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 13. coach_alerts
CREATE TABLE public.coach_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id uuid NOT NULL REFERENCES public.profiles(id),
  client_id uuid NOT NULL REFERENCES public.profiles(id),
  alert_type alert_type NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  is_dismissed boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- RLS POLICIES
-- =============================================

-- client_profiles
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own profile" ON public.client_profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Clients can update own profile" ON public.client_profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Clients can insert own profile" ON public.client_profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Coach can view assigned clients" ON public.client_profiles
  FOR SELECT TO authenticated
  USING (coach_id = auth.uid());

CREATE POLICY "Admin can manage all client profiles" ON public.client_profiles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- baseline_metrics
ALTER TABLE public.baseline_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own metrics" ON public.baseline_metrics
  FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients can insert own metrics" ON public.baseline_metrics
  FOR INSERT TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Admin can manage all metrics" ON public.baseline_metrics
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- exercises (admin manages, clients read active ones)
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view active exercises" ON public.exercises
  FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "Admin can manage exercises" ON public.exercises
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- programs
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own programs" ON public.programs
  FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Admin can manage all programs" ON public.programs
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- program_weeks
ALTER TABLE public.program_weeks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view weeks of their programs" ON public.program_weeks
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.programs p
      WHERE p.id = program_id
      AND (p.client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Admin can manage program weeks" ON public.program_weeks
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- program_days
ALTER TABLE public.program_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view days of their programs" ON public.program_days
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.program_weeks pw
      JOIN public.programs p ON p.id = pw.program_id
      WHERE pw.id = week_id
      AND (p.client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Admin can manage program days" ON public.program_days
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- program_day_exercises
ALTER TABLE public.program_day_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view exercises of their program days" ON public.program_day_exercises
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.program_days pd
      JOIN public.program_weeks pw ON pw.id = pd.week_id
      JOIN public.programs p ON p.id = pw.program_id
      WHERE pd.id = day_id
      AND (p.client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Admin can manage program day exercises" ON public.program_day_exercises
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- workout_sessions
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own sessions" ON public.workout_sessions
  FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients can insert own sessions" ON public.workout_sessions
  FOR INSERT TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update own sessions" ON public.workout_sessions
  FOR UPDATE TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Admin can manage all sessions" ON public.workout_sessions
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- session_exercise_logs
ALTER TABLE public.session_exercise_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own exercise logs" ON public.session_exercise_logs
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.workout_sessions ws
      WHERE ws.id = session_id AND ws.client_id = auth.uid()
    )
  );

CREATE POLICY "Clients can insert own exercise logs" ON public.session_exercise_logs
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.workout_sessions ws
      WHERE ws.id = session_id AND ws.client_id = auth.uid()
    )
  );

CREATE POLICY "Admin can manage all exercise logs" ON public.session_exercise_logs
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- session_checkins
ALTER TABLE public.session_checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own checkins" ON public.session_checkins
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.workout_sessions ws
      WHERE ws.id = session_id AND ws.client_id = auth.uid()
    )
  );

CREATE POLICY "Clients can insert own checkins" ON public.session_checkins
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.workout_sessions ws
      WHERE ws.id = session_id AND ws.client_id = auth.uid()
    )
  );

CREATE POLICY "Admin can manage all checkins" ON public.session_checkins
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- client_adherence
ALTER TABLE public.client_adherence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own adherence" ON public.client_adherence
  FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Admin can manage all adherence" ON public.client_adherence
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- coach_alerts
ALTER TABLE public.coach_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Coach can view own alerts" ON public.coach_alerts
  FOR SELECT TO authenticated
  USING (coach_id = auth.uid());

CREATE POLICY "Coach can update own alerts" ON public.coach_alerts
  FOR UPDATE TO authenticated
  USING (coach_id = auth.uid());

CREATE POLICY "Admin can manage all alerts" ON public.coach_alerts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- FUNCTION: recalculate adherence
-- =============================================
CREATE OR REPLACE FUNCTION public.recalculate_adherence(p_client_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_sessions_7d int;
  v_completed_7d int;
  v_sessions_30d int;
  v_completed_30d int;
  v_pct_7d decimal;
  v_pct_30d decimal;
  v_status adherence_status;
  v_last_session timestamptz;
  v_days_since int;
  v_streak int := 0;
  v_longest int;
  v_rec record;
BEGIN
  -- Count programmed vs completed in last 7 days
  SELECT count(*), count(*) FILTER (WHERE ws.status = 'completed')
  INTO v_sessions_7d, v_completed_7d
  FROM program_days pd
  JOIN program_weeks pw ON pw.id = pd.week_id
  JOIN programs p ON p.id = pw.program_id
  LEFT JOIN workout_sessions ws ON ws.program_day_id = pd.id AND ws.client_id = p_client_id
  WHERE p.client_id = p_client_id
    AND p.status = 'active'
    AND pd.is_rest_day = false
    AND pd.scheduled_date >= CURRENT_DATE - 7
    AND pd.scheduled_date <= CURRENT_DATE;

  -- Count programmed vs completed in last 30 days
  SELECT count(*), count(*) FILTER (WHERE ws.status = 'completed')
  INTO v_sessions_30d, v_completed_30d
  FROM program_days pd
  JOIN program_weeks pw ON pw.id = pd.week_id
  JOIN programs p ON p.id = pw.program_id
  LEFT JOIN workout_sessions ws ON ws.program_day_id = pd.id AND ws.client_id = p_client_id
  WHERE p.client_id = p_client_id
    AND p.status = 'active'
    AND pd.is_rest_day = false
    AND pd.scheduled_date >= CURRENT_DATE - 30
    AND pd.scheduled_date <= CURRENT_DATE;

  v_pct_7d := CASE WHEN v_sessions_7d > 0 THEN (v_completed_7d::decimal / v_sessions_7d) * 100 ELSE 0 END;
  v_pct_30d := CASE WHEN v_sessions_30d > 0 THEN (v_completed_30d::decimal / v_sessions_30d) * 100 ELSE 0 END;

  -- Last session
  SELECT max(completed_at) INTO v_last_session
  FROM workout_sessions
  WHERE client_id = p_client_id AND status = 'completed';

  v_days_since := CASE WHEN v_last_session IS NOT NULL THEN (CURRENT_DATE - v_last_session::date) ELSE 999 END;

  -- Calculate streak (consecutive days with completed sessions)
  FOR v_rec IN
    SELECT DISTINCT completed_at::date as d
    FROM workout_sessions
    WHERE client_id = p_client_id AND status = 'completed'
    ORDER BY d DESC
  LOOP
    IF v_rec.d = CURRENT_DATE - v_streak THEN
      v_streak := v_streak + 1;
    ELSE
      EXIT;
    END IF;
  END LOOP;

  -- Get longest streak
  SELECT COALESCE(longest_streak, 0) INTO v_longest
  FROM client_adherence WHERE client_id = p_client_id;
  
  IF v_streak > COALESCE(v_longest, 0) THEN
    v_longest := v_streak;
  END IF;

  -- Determine status
  IF v_sessions_7d = 0 THEN
    v_status := 'new';
  ELSIF v_pct_7d >= 80 THEN
    v_status := 'active';
  ELSIF v_pct_7d >= 50 OR v_days_since BETWEEN 2 AND 3 THEN
    v_status := 'at_risk';
  ELSE
    v_status := 'inactive';
  END IF;

  -- Upsert
  INSERT INTO client_adherence (client_id, status, adherence_pct_7d, adherence_pct_30d, last_session_at, days_since_last_session, current_streak, longest_streak, calculated_at, updated_at)
  VALUES (p_client_id, v_status, v_pct_7d, v_pct_30d, v_last_session, v_days_since, v_streak, v_longest, now(), now())
  ON CONFLICT (client_id)
  DO UPDATE SET
    status = EXCLUDED.status,
    adherence_pct_7d = EXCLUDED.adherence_pct_7d,
    adherence_pct_30d = EXCLUDED.adherence_pct_30d,
    last_session_at = EXCLUDED.last_session_at,
    days_since_last_session = EXCLUDED.days_since_last_session,
    current_streak = EXCLUDED.current_streak,
    longest_streak = EXCLUDED.longest_streak,
    calculated_at = EXCLUDED.calculated_at,
    updated_at = EXCLUDED.updated_at;
END;
$$;
