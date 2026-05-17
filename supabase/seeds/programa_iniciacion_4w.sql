-- ============================================================
-- Semilla: "Programa Iniciación — 4 semanas (seed)"
-- ------------------------------------------------------------
-- Crea (o regenera) una plantilla de 4 semanas con ejercicios
-- reales tomados de public.exercises y la asigna a un alumno
-- de prueba como programa activo con fechas a partir de hoy.
--
-- Es idempotente: borra y recrea la plantilla y el programa
-- asignado si ya existen con los mismos nombres.
--
-- Para personalizar, edita las variables del bloque DO inicial:
--   v_template_name : nombre de la plantilla
--   v_client_email  : alumno destino (display_name match)
--   v_start_date    : fecha de inicio del programa asignado
-- ============================================================

DO $$
DECLARE
  -- === PARÁMETROS EDITABLES =================================
  v_template_name text := 'Programa Iniciación — 4 semanas (seed)';
  v_client_name   text := 'Train Tester';      -- public.profiles.display_name
  v_start_date    date := CURRENT_DATE;        -- lunes recomendado
  -- ==========================================================

  v_template_id   uuid;
  v_program_id    uuid;
  v_client_id     uuid;
  v_week_id       uuid;
  v_day_id        uuid;
  v_week int;
  v_day  int;
  v_sets int;
  v_reps text;

  -- Ejercicios (lookup por nombre)
  ex_calentamiento uuid;
  ex_movilidad     uuid;
  ex_flex_inclin   uuid;
  ex_fondos_banco  uuid;
  ex_postura_emp   uuid;
  ex_plancha       uuid;
  ex_remo_inv      uuid;
  ex_dom_asist     uuid;
  ex_scap_pull     uuid;
  ex_pull_apart    uuid;
  ex_retrac_esc    uuid;
  ex_sentadillas   uuid;
  ex_zancadas      uuid;
  ex_puente_glut   uuid;
  ex_crunches      uuid;
  ex_dead_bug      uuid;
BEGIN
  -- 1) Resolver client_id
  SELECT id INTO v_client_id
  FROM public.profiles
  WHERE display_name = v_client_name
  LIMIT 1;
  IF v_client_id IS NULL THEN
    RAISE EXCEPTION 'No se encontró alumno con display_name %', v_client_name;
  END IF;

  -- 2) Resolver IDs de ejercicios (LIMIT 1 por seguridad ante duplicados)
  SELECT id INTO ex_calentamiento FROM public.exercises WHERE name = 'Calentamiento de calistenia'        LIMIT 1;
  SELECT id INTO ex_movilidad     FROM public.exercises WHERE name = 'Movilidad de hombros'               LIMIT 1;
  SELECT id INTO ex_flex_inclin   FROM public.exercises WHERE name = 'Flexiones inclinadas'               LIMIT 1;
  SELECT id INTO ex_fondos_banco  FROM public.exercises WHERE name = 'Fondos en banco'                    LIMIT 1;
  SELECT id INTO ex_postura_emp   FROM public.exercises WHERE name = 'Ejercicios de postura (empuje)'     LIMIT 1;
  SELECT id INTO ex_plancha       FROM public.exercises WHERE name = 'Plancha frontal'                    LIMIT 1;
  SELECT id INTO ex_remo_inv      FROM public.exercises WHERE name = 'Remo invertido'                     LIMIT 1;
  SELECT id INTO ex_dom_asist     FROM public.exercises WHERE name = 'Dominadas asistidas con banda'      LIMIT 1;
  SELECT id INTO ex_scap_pull     FROM public.exercises WHERE name = 'Scapular pull-ups'                  LIMIT 1;
  SELECT id INTO ex_pull_apart    FROM public.exercises WHERE name = 'Pull-aparts con banda'              LIMIT 1;
  SELECT id INTO ex_retrac_esc    FROM public.exercises WHERE name = 'Retracción escapular'               LIMIT 1;
  SELECT id INTO ex_sentadillas   FROM public.exercises WHERE name = 'Sentadillas'                        LIMIT 1;
  SELECT id INTO ex_zancadas      FROM public.exercises WHERE name = 'Zancadas'                           LIMIT 1;
  SELECT id INTO ex_puente_glut   FROM public.exercises WHERE name = 'Puente de glúteo'                   LIMIT 1;
  SELECT id INTO ex_crunches      FROM public.exercises WHERE name = 'Crunches abdominales'               LIMIT 1;
  SELECT id INTO ex_dead_bug      FROM public.exercises WHERE name = 'Dead bug'                           LIMIT 1;

  -- 3) Limpiar plantilla previa con el mismo nombre (cascada manual)
  FOR v_template_id IN
    SELECT id FROM public.programs WHERE name = v_template_name AND is_template = true
  LOOP
    DELETE FROM public.program_day_exercises
      WHERE day_id IN (
        SELECT pd.id FROM public.program_days pd
        JOIN public.program_weeks pw ON pw.id = pd.week_id
        WHERE pw.program_id = v_template_id
      );
    DELETE FROM public.program_days
      WHERE week_id IN (SELECT id FROM public.program_weeks WHERE program_id = v_template_id);
    DELETE FROM public.program_weeks WHERE program_id = v_template_id;
    DELETE FROM public.programs      WHERE id = v_template_id;
  END LOOP;

  -- 4) Crear plantilla
  INSERT INTO public.programs (name, description, difficulty_level, duration_weeks, status, is_template, tags)
  VALUES (
    v_template_name,
    'Plantilla seed de iniciación: 3 días/semana, fullbody. Pensada para 4 semanas.',
    'beginner', 4, 'draft', true,
    ARRAY['seed','iniciacion','fullbody']
  )
  RETURNING id INTO v_template_id;

  -- 5) Crear semanas / días / ejercicios
  FOR v_week IN 1..4 LOOP
    INSERT INTO public.program_weeks (program_id, week_number, name)
    VALUES (v_template_id, v_week, 'Semana ' || v_week)
    RETURNING id INTO v_week_id;

    -- Progresión sencilla por semana
    v_sets := CASE WHEN v_week <= 2 THEN 3 ELSE 4 END;
    v_reps := CASE v_week WHEN 1 THEN '8' WHEN 2 THEN '10' WHEN 3 THEN '10' ELSE '12' END;

    FOR v_day IN 1..7 LOOP
      INSERT INTO public.program_days (week_id, day_number, name, is_rest_day)
      VALUES (
        v_week_id,
        v_day,
        CASE v_day
          WHEN 1 THEN 'Día 1 — Empuje'
          WHEN 3 THEN 'Día 2 — Tirón'
          WHEN 5 THEN 'Día 3 — Pierna + Core'
          ELSE 'Descanso'
        END,
        v_day NOT IN (1,3,5)
      )
      RETURNING id INTO v_day_id;

      IF v_day = 1 THEN
        -- Empuje
        INSERT INTO public.program_day_exercises (day_id, exercise_id, order_index, sets, reps, rest_seconds, notes) VALUES
          (v_day_id, ex_calentamiento, 0, 1, '5-8 min', 0,  'Activación general antes de empezar'),
          (v_day_id, ex_movilidad,     1, 1, '5 min',   0,  'Hombros sin dolor'),
          (v_day_id, ex_flex_inclin,   2, v_sets, v_reps, 90, 'Banco o pared. Subir altura si cuesta'),
          (v_day_id, ex_fondos_banco,  3, v_sets, v_reps, 90, 'Hombros abajo y atrás'),
          (v_day_id, ex_postura_emp,   4, 2, '12',     60, 'Trabajo postural complementario'),
          (v_day_id, ex_plancha,       5, 3, '30s',    45, 'Cadera neutra');
      ELSIF v_day = 3 THEN
        -- Tirón
        INSERT INTO public.program_day_exercises (day_id, exercise_id, order_index, sets, reps, rest_seconds, notes) VALUES
          (v_day_id, ex_calentamiento, 0, 1, '5-8 min', 0, ''),
          (v_day_id, ex_scap_pull,     1, 3, '6',      60, 'Activación escapular'),
          (v_day_id, ex_remo_inv,      2, v_sets, v_reps, 90, 'Ajustar altura de barra'),
          (v_day_id, ex_dom_asist,     3, v_sets, v_reps, 120, 'Banda gruesa al principio'),
          (v_day_id, ex_pull_apart,    4, 3, '15',     45, 'Salud de hombro'),
          (v_day_id, ex_retrac_esc,    5, 2, '10',     45, '');
      ELSIF v_day = 5 THEN
        -- Pierna + Core
        INSERT INTO public.program_day_exercises (day_id, exercise_id, order_index, sets, reps, rest_seconds, notes) VALUES
          (v_day_id, ex_calentamiento, 0, 1, '5-8 min', 0, ''),
          (v_day_id, ex_sentadillas,   1, v_sets, v_reps, 90, 'Profundidad cómoda'),
          (v_day_id, ex_zancadas,      2, v_sets, '10/pierna', 90, 'Alterna piernas'),
          (v_day_id, ex_puente_glut,   3, 3, '12',     60, 'Aprieta glúteo arriba'),
          (v_day_id, ex_dead_bug,      4, 3, '8/lado', 45, 'Lumbar pegada al suelo'),
          (v_day_id, ex_crunches,      5, 3, '15',     45, '');
      END IF;
    END LOOP;
  END LOOP;

  -- 6) Limpiar programa asignado previo con el mismo nombre + alumno
  FOR v_program_id IN
    SELECT id FROM public.programs
    WHERE client_id = v_client_id AND name = v_template_name AND is_template = false
  LOOP
    DELETE FROM public.program_day_exercises
      WHERE day_id IN (
        SELECT pd.id FROM public.program_days pd
        JOIN public.program_weeks pw ON pw.id = pd.week_id
        WHERE pw.program_id = v_program_id
      );
    DELETE FROM public.program_days
      WHERE week_id IN (SELECT id FROM public.program_weeks WHERE program_id = v_program_id);
    DELETE FROM public.program_weeks WHERE program_id = v_program_id;
    DELETE FROM public.programs      WHERE id = v_program_id;
  END LOOP;

  -- 7) Clonar plantilla -> programa asignado al alumno con fechas reales
  INSERT INTO public.programs (
    name, description, difficulty_level, duration_weeks, status,
    is_template, template_id, client_id, start_date, end_date, tags
  )
  VALUES (
    v_template_name,
    'Programa asignado a ' || v_client_name || ' desde plantilla seed',
    'beginner', 4, 'active',
    false, v_template_id, v_client_id,
    v_start_date, v_start_date + 27,
    ARRAY['seed','iniciacion']
  )
  RETURNING id INTO v_program_id;

  -- Clonar semanas con start_date
  INSERT INTO public.program_weeks (program_id, week_number, name, start_date)
  SELECT v_program_id, pw.week_number, pw.name, v_start_date + ((pw.week_number - 1) * 7)
  FROM public.program_weeks pw
  WHERE pw.program_id = v_template_id;

  -- Clonar días con scheduled_date
  INSERT INTO public.program_days (week_id, day_number, name, is_rest_day, scheduled_date)
  SELECT
    npw.id,
    pd.day_number,
    pd.name,
    pd.is_rest_day,
    npw.start_date + (pd.day_number - 1)
  FROM public.program_weeks tpw
  JOIN public.program_days  pd  ON pd.week_id = tpw.id
  JOIN public.program_weeks npw ON npw.program_id = v_program_id AND npw.week_number = tpw.week_number
  WHERE tpw.program_id = v_template_id;

  -- Clonar ejercicios del día
  INSERT INTO public.program_day_exercises (day_id, exercise_id, order_index, sets, reps, rest_seconds, notes)
  SELECT
    npd.id, pde.exercise_id, pde.order_index, pde.sets, pde.reps, pde.rest_seconds, pde.notes
  FROM public.program_weeks tpw
  JOIN public.program_days  tpd ON tpd.week_id = tpw.id
  JOIN public.program_day_exercises pde ON pde.day_id = tpd.id
  JOIN public.program_weeks npw ON npw.program_id = v_program_id AND npw.week_number = tpw.week_number
  JOIN public.program_days  npd ON npd.week_id = npw.id AND npd.day_number = tpd.day_number
  WHERE tpw.program_id = v_template_id;

  RAISE NOTICE 'Plantilla creada: % | Programa asignado: % a %', v_template_id, v_program_id, v_client_name;
END $$;
