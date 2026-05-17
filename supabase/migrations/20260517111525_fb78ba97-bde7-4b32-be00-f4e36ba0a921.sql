
-- ============== ENUMS ==============
CREATE TYPE public.phase_type AS ENUM ('preparacion', 'fuerza', 'hipertrofia', 'tecnica', 'deload', 'evaluacion', 'mantenimiento', 'custom');
CREATE TYPE public.adjustment_type AS ENUM ('volume', 'intensity', 'exercise_swap', 'rest_day', 'progression', 'regression', 'mobility', 'other');
CREATE TYPE public.goal_type AS ENUM ('weight_loss', 'pull_ups', 'push_ups', 'squats', 'mobility', 'autonomy', 'oposiciones', 'hipertrofia', 'resistencia', 'custom');

-- ============== program_phases ==============
CREATE TABLE public.program_phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL,
  name text NOT NULL,
  phase_type phase_type NOT NULL DEFAULT 'custom',
  start_week int NOT NULL,
  end_week int NOT NULL,
  objective text,
  notes text,
  order_index int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (end_week >= start_week)
);
CREATE INDEX idx_program_phases_program ON public.program_phases(program_id);
ALTER TABLE public.program_phases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages program phases" ON public.program_phases
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients view phases of own programs" ON public.program_phases
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM programs p WHERE p.id = program_phases.program_id AND p.client_id = auth.uid()));

-- ============== weekly_reviews ==============
CREATE TABLE public.weekly_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL,
  coach_id uuid,
  week_start_date date NOT NULL,
  summary text,
  strengths text,
  improvement_areas text,
  next_steps text,
  client_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (client_id, week_start_date)
);
CREATE INDEX idx_weekly_reviews_client ON public.weekly_reviews(client_id, week_start_date DESC);
ALTER TABLE public.weekly_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages weekly reviews" ON public.weekly_reviews
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients view own visible weekly reviews" ON public.weekly_reviews
  FOR SELECT TO authenticated
  USING (client_id = auth.uid() AND client_visible = true);

-- ============== program_adjustments ==============
CREATE TABLE public.program_adjustments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL,
  program_id uuid,
  coach_id uuid,
  adjustment_type adjustment_type NOT NULL,
  reason text,
  affected_exercise_id uuid,
  old_value text,
  new_value text,
  applied_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_program_adjustments_client ON public.program_adjustments(client_id, applied_at DESC);
ALTER TABLE public.program_adjustments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages adjustments" ON public.program_adjustments
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients view own adjustments" ON public.program_adjustments
  FOR SELECT TO authenticated
  USING (client_id = auth.uid());

-- ============== technique_reviews ==============
CREATE TABLE public.technique_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL,
  coach_id uuid,
  exercise_id uuid,
  video_url text,
  video_storage_path text,
  client_notes text,
  coach_feedback text,
  score smallint,
  recommendations text,
  status text NOT NULL DEFAULT 'pending',
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (score IS NULL OR (score BETWEEN 1 AND 10)),
  CHECK (status IN ('pending', 'reviewed', 'archived'))
);
CREATE INDEX idx_technique_reviews_client ON public.technique_reviews(client_id, created_at DESC);
ALTER TABLE public.technique_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages technique reviews" ON public.technique_reviews
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients view own technique reviews" ON public.technique_reviews
  FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients insert own technique reviews" ON public.technique_reviews
  FOR INSERT TO authenticated
  WITH CHECK (client_id = auth.uid());

-- Trigger para touch last_activity_at en technique_reviews
CREATE OR REPLACE FUNCTION public.touch_client_last_activity_tr()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.client_profiles SET last_activity_at = now() WHERE id = NEW.client_id;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_touch_activity_technique
AFTER INSERT ON public.technique_reviews
FOR EACH ROW EXECUTE FUNCTION public.touch_client_last_activity_tr();

-- ============== client_adherence_weekly ==============
CREATE TABLE public.client_adherence_weekly (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL,
  week_start_date date NOT NULL,
  assigned_sessions int NOT NULL DEFAULT 0,
  completed_sessions int NOT NULL DEFAULT 0,
  completion_rate numeric(5,2) NOT NULL DEFAULT 0,
  feedback_rate numeric(5,2) NOT NULL DEFAULT 0,
  inactivity_days int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (client_id, week_start_date)
);
CREATE INDEX idx_adherence_weekly_client ON public.client_adherence_weekly(client_id, week_start_date DESC);
ALTER TABLE public.client_adherence_weekly ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages adherence weekly" ON public.client_adherence_weekly
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients view own adherence weekly" ON public.client_adherence_weekly
  FOR SELECT TO authenticated
  USING (client_id = auth.uid());

-- ============== goal_progress ==============
CREATE TABLE public.goal_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL,
  goal_type goal_type NOT NULL,
  custom_label text,
  start_value numeric,
  current_value numeric,
  target_value numeric,
  unit text,
  target_date date,
  notes text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_goal_progress_client ON public.goal_progress(client_id, is_active);
ALTER TABLE public.goal_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages goal progress" ON public.goal_progress
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients view own goal progress" ON public.goal_progress
  FOR SELECT TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients update own goal progress" ON public.goal_progress
  FOR UPDATE TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients insert own goal progress" ON public.goal_progress
  FOR INSERT TO authenticated
  WITH CHECK (client_id = auth.uid());

-- ============== Triggers de updated_at ==============
CREATE TRIGGER trg_program_phases_updated BEFORE UPDATE ON public.program_phases
FOR EACH ROW EXECUTE FUNCTION public.update_seo_pages_updated_at();
CREATE TRIGGER trg_weekly_reviews_updated BEFORE UPDATE ON public.weekly_reviews
FOR EACH ROW EXECUTE FUNCTION public.update_seo_pages_updated_at();
CREATE TRIGGER trg_technique_reviews_updated BEFORE UPDATE ON public.technique_reviews
FOR EACH ROW EXECUTE FUNCTION public.update_seo_pages_updated_at();
CREATE TRIGGER trg_goal_progress_updated BEFORE UPDATE ON public.goal_progress
FOR EACH ROW EXECUTE FUNCTION public.update_seo_pages_updated_at();

-- ============== VIEW client_engagement_metrics ==============
CREATE OR REPLACE VIEW public.client_engagement_metrics
WITH (security_invoker = true) AS
SELECT
  cp.id AS client_id,
  COALESCE(s7.completed, 0) AS sessions_completed_7d,
  COALESCE(s30.completed, 0) AS sessions_completed_30d,
  COALESCE(s7.missed, 0) AS sessions_missed_7d,
  COALESCE(s30.missed, 0) AS sessions_missed_30d,
  CASE WHEN cp.last_activity_at IS NOT NULL
       THEN EXTRACT(DAY FROM (now() - cp.last_activity_at))::int
       ELSE 999 END AS days_inactive,
  CASE WHEN COALESCE(s30.completed,0) > 0
       THEN ROUND((COALESCE(fb30.feedback_count,0)::numeric / s30.completed) * 100, 2)
       ELSE 0 END AS feedback_rate,
  CASE WHEN COALESCE(s30.assigned,0) > 0
       THEN ROUND((s30.completed::numeric / s30.assigned) * 100, 2)
       ELSE 0 END AS adherence_rate,
  -- risk_score: 0-100, mayor = más riesgo
  LEAST(100, GREATEST(0,
    (CASE WHEN cp.last_activity_at IS NULL THEN 60
          ELSE LEAST(60, EXTRACT(DAY FROM (now() - cp.last_activity_at))::int * 10) END)
    + (CASE WHEN COALESCE(s7.assigned,0) > 0 AND COALESCE(s7.completed,0) = 0 THEN 40 ELSE 0 END)
  ))::int AS risk_score
FROM public.client_profiles cp
LEFT JOIN LATERAL (
  SELECT
    count(*) FILTER (WHERE pd.scheduled_date >= CURRENT_DATE - 7 AND pd.scheduled_date <= CURRENT_DATE AND pd.is_rest_day = false) AS assigned,
    count(*) FILTER (WHERE ws.status = 'completed' AND ws.completed_at >= now() - interval '7 days') AS completed,
    count(*) FILTER (WHERE pd.scheduled_date >= CURRENT_DATE - 7 AND pd.scheduled_date < CURRENT_DATE AND pd.is_rest_day = false AND ws.id IS NULL) AS missed
  FROM programs p
  LEFT JOIN program_weeks pw ON pw.program_id = p.id
  LEFT JOIN program_days pd ON pd.week_id = pw.id
  LEFT JOIN workout_sessions ws ON ws.program_day_id = pd.id AND ws.client_id = cp.id
  WHERE p.client_id = cp.id AND p.status = 'active'
) s7 ON true
LEFT JOIN LATERAL (
  SELECT
    count(*) FILTER (WHERE pd.scheduled_date >= CURRENT_DATE - 30 AND pd.scheduled_date <= CURRENT_DATE AND pd.is_rest_day = false) AS assigned,
    count(*) FILTER (WHERE ws.status = 'completed' AND ws.completed_at >= now() - interval '30 days') AS completed,
    count(*) FILTER (WHERE pd.scheduled_date >= CURRENT_DATE - 30 AND pd.scheduled_date < CURRENT_DATE AND pd.is_rest_day = false AND ws.id IS NULL) AS missed
  FROM programs p
  LEFT JOIN program_weeks pw ON pw.program_id = p.id
  LEFT JOIN program_days pd ON pd.week_id = pw.id
  LEFT JOIN workout_sessions ws ON ws.program_day_id = pd.id AND ws.client_id = cp.id
  WHERE p.client_id = cp.id AND p.status = 'active'
) s30 ON true
LEFT JOIN LATERAL (
  SELECT count(*) AS feedback_count
  FROM session_checkins sc
  JOIN workout_sessions ws ON ws.id = sc.session_id
  WHERE ws.client_id = cp.id AND sc.created_at >= now() - interval '30 days'
) fb30 ON true;

-- ============== Storage bucket: technique-videos ==============
INSERT INTO storage.buckets (id, name, public) VALUES ('technique-videos', 'technique-videos', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Admin manages technique videos"
ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'technique-videos' AND has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'technique-videos' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients upload own technique videos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'technique-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Clients read own technique videos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'technique-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Clients delete own technique videos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'technique-videos' AND auth.uid()::text = (storage.foldername(name))[1]);
