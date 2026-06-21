
-- 1) Drop disused notification triggers (feedback del coach va por WhatsApp)
DROP TRIGGER IF EXISTS trg_notify_on_technique_review ON public.technique_reviews;
DROP TRIGGER IF EXISTS trg_notify_on_weekly_review ON public.weekly_reviews;

-- 2) RPE 1..10 para difficulty_rating (Borg CR10)
ALTER TABLE public.session_checkins
  DROP CONSTRAINT IF EXISTS session_checkins_difficulty_rating_check;
ALTER TABLE public.session_checkins
  ADD CONSTRAINT session_checkins_difficulty_rating_check
  CHECK (difficulty_rating IS NULL OR (difficulty_rating >= 1 AND difficulty_rating <= 10));

-- 3) baseline_metrics: añadir waist_cm y hip_cm (opcionales)
ALTER TABLE public.baseline_metrics
  ADD COLUMN IF NOT EXISTS waist_cm numeric,
  ADD COLUMN IF NOT EXISTS hip_cm numeric;
