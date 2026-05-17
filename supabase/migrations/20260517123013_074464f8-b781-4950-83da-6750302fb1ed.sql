
-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- =============================================================
-- Función: snapshot semanal de adherencia (semana anterior)
-- =============================================================
CREATE OR REPLACE FUNCTION public.snapshot_weekly_adherence()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_week_start date := (date_trunc('week', (now() AT TIME ZONE 'Europe/Madrid')::date - interval '7 days'))::date;
  v_week_end   date := v_week_start + 6;
BEGIN
  INSERT INTO public.client_adherence_weekly (
    client_id,
    week_start_date,
    assigned_sessions,
    completed_sessions,
    completion_rate,
    feedback_rate,
    inactivity_days
  )
  SELECT
    cp.user_id AS client_id,
    v_week_start AS week_start_date,
    COALESCE(s.assigned, 0) AS assigned_sessions,
    COALESCE(s.completed, 0) AS completed_sessions,
    CASE WHEN COALESCE(s.assigned, 0) = 0 THEN 0
         ELSE ROUND((s.completed::numeric / s.assigned::numeric) * 100, 2)
    END AS completion_rate,
    CASE WHEN COALESCE(s.completed, 0) = 0 THEN 0
         ELSE ROUND((COALESCE(c.checkins, 0)::numeric / s.completed::numeric) * 100, 2)
    END AS feedback_rate,
    GREATEST(
      0,
      EXTRACT(DAY FROM (
        (v_week_end::timestamp + interval '23 hours 59 minutes') -
        COALESCE(cp.last_activity_at, v_week_start::timestamp)
      ))::int
    ) AS inactivity_days
  FROM public.client_profiles cp
  LEFT JOIN (
    SELECT
      ws.user_id,
      COUNT(*) FILTER (WHERE ws.session_date BETWEEN v_week_start AND v_week_end) AS assigned,
      COUNT(*) FILTER (WHERE ws.session_date BETWEEN v_week_start AND v_week_end AND ws.status = 'completed') AS completed
    FROM public.workout_sessions ws
    GROUP BY ws.user_id
  ) s ON s.user_id = cp.user_id
  LEFT JOIN (
    SELECT
      sc.user_id,
      COUNT(*) AS checkins
    FROM public.session_checkins sc
    WHERE sc.created_at::date BETWEEN v_week_start AND v_week_end
    GROUP BY sc.user_id
  ) c ON c.user_id = cp.user_id
  ON CONFLICT (client_id, week_start_date) DO UPDATE
  SET assigned_sessions  = EXCLUDED.assigned_sessions,
      completed_sessions = EXCLUDED.completed_sessions,
      completion_rate    = EXCLUDED.completion_rate,
      feedback_rate      = EXCLUDED.feedback_rate,
      inactivity_days    = EXCLUDED.inactivity_days;
END;
$$;

-- Garantizamos unique constraint para el ON CONFLICT
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'client_adherence_weekly_client_week_unique'
  ) THEN
    ALTER TABLE public.client_adherence_weekly
    ADD CONSTRAINT client_adherence_weekly_client_week_unique
    UNIQUE (client_id, week_start_date);
  END IF;
END $$;

-- =============================================================
-- Función: generar alertas de coach a partir de engagement
-- =============================================================
CREATE OR REPLACE FUNCTION public.generate_engagement_alerts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r record;
  v_alert_type text;
  v_severity   text;
  v_message    text;
BEGIN
  FOR r IN
    SELECT
      m.client_id,
      m.adherence_status,
      m.days_inactive,
      m.risk_score
    FROM public.client_engagement_metrics m
    WHERE m.adherence_status IN ('low_engagement', 'at_risk', 'inactive')
  LOOP
    v_alert_type := CASE
      WHEN r.adherence_status = 'at_risk'        THEN 'at_risk'
      WHEN r.adherence_status = 'inactive'       THEN 'inactive'
      ELSE 'low_engagement'
    END;

    v_severity := CASE
      WHEN r.adherence_status = 'inactive' THEN 'high'
      WHEN r.adherence_status = 'at_risk'  THEN 'high'
      ELSE 'medium'
    END;

    v_message := CASE
      WHEN r.adherence_status = 'inactive'
        THEN 'Alumno inactivo: ' || COALESCE(r.days_inactive, 0) || ' días sin actividad.'
      WHEN r.adherence_status = 'at_risk'
        THEN 'Riesgo de abandono. Score: ' || COALESCE(r.risk_score, 0) || '.'
      ELSE 'Engagement bajo. Score: ' || COALESCE(r.risk_score, 0) || '.'
    END;

    -- Evitar duplicados: no insertar si ya hay alerta abierta del mismo tipo en últimos 7 días
    IF NOT EXISTS (
      SELECT 1 FROM public.coach_alerts ca
      WHERE ca.client_id = r.client_id
        AND ca.alert_type = v_alert_type
        AND ca.status = 'open'
        AND ca.created_at > now() - interval '7 days'
    ) THEN
      INSERT INTO public.coach_alerts (client_id, alert_type, severity, message, status)
      VALUES (r.client_id, v_alert_type, v_severity, v_message, 'open');
    END IF;
  END LOOP;
END;
$$;

-- =============================================================
-- Programación de cron jobs (idempotente)
-- =============================================================
DO $$
BEGIN
  PERFORM cron.unschedule('recalculate-adherence-daily');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  PERFORM cron.unschedule('weekly-adherence-snapshot');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  PERFORM cron.unschedule('engagement-alerts-daily');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Diario 03:00 Madrid (~02:00 UTC en invierno, 01:00 en verano; usamos 02:00 UTC como compromiso)
SELECT cron.schedule(
  'recalculate-adherence-daily',
  '0 2 * * *',
  $cron$ SELECT public.recalculate_adherence(); $cron$
);

-- Lunes 03:15 Madrid (~02:15 UTC)
SELECT cron.schedule(
  'weekly-adherence-snapshot',
  '15 2 * * 1',
  $cron$ SELECT public.snapshot_weekly_adherence(); $cron$
);

-- Diario 08:00 Madrid (~07:00 UTC)
SELECT cron.schedule(
  'engagement-alerts-daily',
  '0 7 * * *',
  $cron$ SELECT public.generate_engagement_alerts(); $cron$
);
