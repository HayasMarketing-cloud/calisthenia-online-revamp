-- =============================================================================
-- QA SEED – Sistema de notificaciones (nudges + campana)
-- =============================================================================
-- Reseteable: limpia SOLO los datos que crea para A y B y los vuelve a sembrar.
-- NO crea cuentas en auth.users: pásale los client_id de dos cuentas de prueba
-- creadas por el flujo normal de registro.
--
-- USO:
--   1) Crea (si no existen) dos cuentas de alumno en /auth (A y B).
--   2) Sustituye los UUID de :alumno_a y :alumno_b debajo.
--   3) psql -f scripts/qa-notifications-seed.sql
--
-- Idempotente: se puede ejecutar N veces sin duplicar datos.
-- NO toca usuarios reales: solo limpia datos pertenecientes a A y B.
-- =============================================================================

\set ON_ERROR_STOP on

-- >>> EDITAR ESTAS DOS LÍNEAS <<<
\set alumno_a '\'9784c6ab-e74b-49cc-b61e-efbf821adcdb\''
\set alumno_b '\'c6ae19e2-c0bc-4845-934b-414a4ca88219\''

BEGIN;

-- Validar que existen como client_profiles
DO $$
DECLARE a uuid := :alumno_a; b uuid := :alumno_b;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM client_profiles WHERE id = a) THEN
    RAISE EXCEPTION 'alumno_a % no existe en client_profiles. Crea la cuenta primero.', a;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM client_profiles WHERE id = b) THEN
    RAISE EXCEPTION 'alumno_b % no existe en client_profiles. Crea la cuenta primero.', b;
  END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 1) LIMPIEZA (solo datos de A y B)
-- -----------------------------------------------------------------------------
DELETE FROM notifications      WHERE client_id IN (:alumno_a, :alumno_b);
DELETE FROM nudge_dismissals   WHERE client_id IN (:alumno_a, :alumno_b);
DELETE FROM baseline_metrics   WHERE client_id IN (:alumno_a, :alumno_b);
DELETE FROM workout_sessions   WHERE client_id IN (:alumno_a, :alumno_b);
DELETE FROM programs           WHERE client_id IN (:alumno_a, :alumno_b);
-- client_milestones / technique_reviews / weekly_reviews: limpiamos por si quedaron de pruebas
DELETE FROM client_milestones  WHERE client_id IN (:alumno_a, :alumno_b);
DELETE FROM technique_reviews  WHERE client_id IN (:alumno_a, :alumno_b);
DELETE FROM weekly_reviews     WHERE client_id IN (:alumno_a, :alumno_b);

-- -----------------------------------------------------------------------------
-- 2) ALUMNO A y B: created_at hace 30 días
-- -----------------------------------------------------------------------------
UPDATE client_profiles
   SET created_at = now() - interval '30 days'
 WHERE id IN (:alumno_a, :alumno_b);

-- -----------------------------------------------------------------------------
-- 3) ALUMNO A: programa activo + sesión HOY (pending) + sesión MAÑANA
-- -----------------------------------------------------------------------------
WITH new_prog AS (
  INSERT INTO programs (name, client_id, status, start_date, duration_weeks)
  VALUES ('QA Programa A', :alumno_a, 'active', CURRENT_DATE, 4)
  RETURNING id
),
new_week AS (
  INSERT INTO program_weeks (program_id, week_number, start_date)
  SELECT id, 1, CURRENT_DATE FROM new_prog
  RETURNING id
)
INSERT INTO program_days (week_id, day_number, scheduled_date, is_rest_day, name)
SELECT id, 1, CURRENT_DATE,                false, 'Sesión QA hoy'     FROM new_week
UNION ALL
SELECT id, 2, CURRENT_DATE + interval '1 day', false, 'Sesión QA mañana' FROM new_week;

-- -----------------------------------------------------------------------------
-- 4) ALUMNO A: baseline_metrics con weight_kg hace 16 días
-- -----------------------------------------------------------------------------
INSERT INTO baseline_metrics (client_id, weight_kg, recorded_at)
VALUES (:alumno_a, 75.0, now() - interval '16 days');

-- -----------------------------------------------------------------------------
-- 5) ALUMNO A: dismissal de log_weight hace 4 días (debe REAPARECER en dashboard)
-- -----------------------------------------------------------------------------
INSERT INTO nudge_dismissals (client_id, nudge_key, dismissed_at)
VALUES (:alumno_a, 'log_weight', now() - interval '4 days');

-- -----------------------------------------------------------------------------
-- 6) ALUMNO A: 12 notificaciones no leídas (probar badge "9+")
-- -----------------------------------------------------------------------------
INSERT INTO notifications (client_id, type, priority, title, body, source_table, source_id)
SELECT :alumno_a, 'milestone', 'low',
       'QA noti #' || g, 'Notificación de prueba número ' || g,
       'qa_seed', gen_random_uuid()
  FROM generate_series(1, 12) g;

-- -----------------------------------------------------------------------------
-- 7) ALUMNO B: SIN programa activo (ya limpiado arriba). Nada que hacer.
-- -----------------------------------------------------------------------------

COMMIT;

-- Resumen
SELECT 'A: notifications'        AS k, count(*) FROM notifications     WHERE client_id = :alumno_a
UNION ALL SELECT 'A: programs activos',     count(*) FROM programs     WHERE client_id = :alumno_a AND status='active'
UNION ALL SELECT 'A: program_days hoy+1',   count(*) FROM program_days pd JOIN program_weeks pw ON pw.id=pd.week_id JOIN programs p ON p.id=pw.program_id WHERE p.client_id=:alumno_a
UNION ALL SELECT 'A: baseline weight rows', count(*) FROM baseline_metrics WHERE client_id=:alumno_a AND weight_kg IS NOT NULL
UNION ALL SELECT 'A: dismissals',           count(*) FROM nudge_dismissals WHERE client_id=:alumno_a
UNION ALL SELECT 'B: programs activos',     count(*) FROM programs     WHERE client_id=:alumno_b AND status='active';
