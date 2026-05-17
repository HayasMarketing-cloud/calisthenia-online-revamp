# Plan de evolución backend — App privada de alumnos (v2 con feedback PM)

**Contexto:** Aprovechar al máximo el schema existente en Lovable Cloud y añadir solo lo que aporta valor coach + alumno. Modo **single-coach** (Nico). Multi-coach diferido a Fase 3.

**Principio rector:** extender antes que recrear. ~90% del schema actual ya cubre la operativa.

**Cambios v2 (post-review producto):** se incorporan adherencia semanal histórica, evolución de objetivos visible al alumno, métricas de engagement como VIEW, `session_feeling` para perfiles no técnicos, `journey_stage` para funnels, y `last_activity_at` para detectar silencio antes de fallo de sesión.

---

## Resumen ejecutivo

| Fase | Qué hace | Tablas tocadas | Esfuerzo |
|---|---|---|---|
| **Fase 0** | Extender tablas existentes con campos para coaching real + comportamiento | 3 ALTER + 1 enum ampliado | 1-2 días |
| **Fase 1** | 6 tablas nuevas + 1 VIEW que generan valor coach y alumno | 6 CREATE + 1 VIEW + 1 bucket | 3-4 días |
| **Fase 2** | Desbloqueadores para escalar (versionado plantillas + overrides puntuales) | 2 CREATE | 2 días |
| **Fase 3** | Multi-coach (cuando entre 2º profesor) | 1 CREATE + refactor RLS | Diferido |

---

## Fase 0 — Extender lo existente

**Objetivo:** dejar las tablas que ya usamos preparadas para coaching profesional y para captar señales de comportamiento sin tocar UI base.

### `exercises` — añadir
- `movement_pattern` (enum: push, pull, squat, hinge, core, locomotion, isometric)
- `coach_tips` (text) — notas técnicas que Nico quiere recordar
- `common_errors` (text) — errores frecuentes del movimiento
- `easier_variation_id` (uuid → exercises.id)
- `harder_variation_id` (uuid → exercises.id)
- `default_sets`, `default_reps`, `default_rest_seconds`

### `session_checkins` — añadir
- `pain_level` (smallint 0-10)
- `pain_location` (text)
- `rpe` (smallint 1-10, opcional — perfil avanzado)
- `duration_minutes_real` (int)
- **`session_feeling`** (enum: `great | good | hard | too_hard | painful`) — **obligatorio**, primario, sustituye al RPE para perfil BASE que no sabe medir esfuerzo numéricamente

### `client_profiles` — añadir
- **`journey_stage`** (enum: `base | control | elite | renewal | annual_plan | inactive`) — default `base`. Movido manualmente por Nico desde panel. Alimenta funnels, upsells, reporting.
- **`last_activity_at`** (timestamptz) — actualizado por trigger en cualquier evento del alumno (sesión, checkin, vídeo de técnica, feedback). El silencio es información: permite alertar antes de que falte una sesión completa.

### `client_adherence` — ampliar enum existente
- Ampliar `adherence_status` enum: `active | low_engagement | at_risk | inactive | new` (añadido `low_engagement` entre `active` y `at_risk`)
- Refinar función `recalculate_adherence()` para usar también `last_activity_at`, no solo sesiones completadas

### Lo que NO se toca
- RLS actuales (admin gestiona todo, alumno ve lo suyo) sirven sin cambios
- `client_profiles.coach_id` queda como campo informativo hasta Fase 3
- `programs`, `program_weeks`, `program_days`, `program_day_exercises`, `workout_sessions` — intactas

---

## Fase 1 — Tablas nuevas con valor coach + alumno

### 1. `program_phases`
Agrupa semanas dentro de plantillas largas (Base / Fuerza / Pico).
Campos: `program_id`, `name`, `phase_number`, `phase_type` (enum: base, accumulation, intensification, peak, deload, test), `description`, `weeks_count`.

### 2. `weekly_reviews`
Revisión semanal documentada por Nico para cada alumno activo.
Campos: `client_id`, `coach_id`, `week_start_date`, `adherence_observed`, `notes`, `next_week_focus`, `risk_flag`.
Trigger: autocompletar `adherence_observed` desde `client_adherence` al crear.

### 3. `program_adjustments`
Log de cambios sobre el programa de un alumno con motivo y trazabilidad.
Campos: `client_id`, `program_id`, `adjustment_type` (enum: load_up, load_down, exercise_swap, volume_change, deload, pause, resume), `affected_day_id`, `affected_exercise_id`, `old_value`, `new_value`, `reason`, `applied_by`, `applied_at`.
**Nota técnica:** campos tipados en vez de `details_jsonb` para que las consultas y dashboards futuros sean directos.

### 4. `technique_reviews`
Alumno sube vídeo de un ejercicio → Nico anota feedback.
Campos: `client_id`, `coach_id`, `exercise_id`, `video_url`, `client_notes`, `coach_feedback`, `score` (1-5), `reviewed_at`.
**Storage bucket nuevo:** `technique-videos` (privado).

### 5. `client_adherence_weekly` ★ nuevo por feedback PM
Snapshot semanal histórico de adherencia (la tabla `client_adherence` actual solo guarda el snapshot actual).
Campos: `client_id`, `week_start_date`, `assigned_sessions`, `completed_sessions`, `completion_rate`, `feedback_rate`, `inactivity_days`, `created_at`.
**Cron pg_cron + función SQL** cada lunes a las 03:00 calcula la fila de la semana anterior para cada cliente activo.
**Valor:** habilita gráfica de evolución de adherencia en panel admin y en perfil del alumno — base del engagement.

### 6. `goal_progress` ★ nuevo por feedback PM
Evolución de objetivos del alumno (distinto de `baseline_metrics`, que es snapshot inicial inmutable).
Campos: `client_id`, `goal_type` (enum: weight_loss, pull_ups, push_ups, squats, mobility, autonomy, oposiciones, custom), `goal_label`, `start_value`, `current_value`, `target_value`, `unit`, `target_date`, `updated_at`.
**Valor:** el alumno ve gráfica de progreso → motor de retención en BASE. Sin esto, el alumno no percibe avance y abandona.

### VIEW: `client_engagement_metrics` ★ nuevo por feedback PM
NO es tabla (evita triggers en 4 sitios y desincronizaciones). Es vista calculada en tiempo real.
Campos derivados: `sessions_completed_7d/30d`, `sessions_missed_7d/30d`, `days_inactive`, `feedback_rate_30d`, `adherence_rate_30d`, `risk_score`, `last_technique_review_at`, `pending_weekly_review`.
**Valor:** dashboard admin lee directo, sin lógica de cálculo en frontend. Una sola fuente de verdad.

### RLS de Fase 1
- Todas las tablas: `has_role(auth.uid(), 'admin')` para gestión completa
- Cliente lee solo lo suyo en: `weekly_reviews`, `technique_reviews`, `client_adherence_weekly`, `goal_progress`
- `program_adjustments` y `program_phases`: cliente solo lectura de lo suyo
- VIEW `client_engagement_metrics`: SECURITY INVOKER, hereda RLS de tablas base

---

## Fase 2 — Desbloqueadores para escalar

### 7. `program_template_versions`
Versionar plantillas (`v1.0`, `v1.1`) sin romper instancias activas.
Cuando Nico mejora "Base 12 semanas", los alumnos en curso siguen con su versión congelada; los nuevos arrancan con la última.
Campos: `template_id`, `version_number`, `is_current`, `changelog`, `snapshot_jsonb` (estructura completa congelada — aquí jsonb SÍ es lo correcto, es snapshot de restauración, no campo queryable).

### 8. `program_day_overrides`
Personalizar UN día de UN alumno sin clonar la plantilla entera.
Campos: `program_day_id`, `client_id`, `exercise_id`, `override_sets`, `override_reps`, `override_video_id`, `reason`, `applied_by`, `valid_from`, `valid_until`.

---

## Fase 3 — Multi-coach (diferida)

Activar cuando entre el segundo profesor. Hoy NO se construye.

- Tabla `coaches` (extensión 1:1 de `auth.users`)
- Refactor RLS añadiendo cláusula "coach asignado puede gestionar a sus alumnos"
- UI de asignación coach↔alumno en `/admin/coach-panel`

**Enganche dejado hoy:** `programs.coach_id` y `client_profiles.coach_id` ya existen. La migración futura será solo políticas RLS + UI.

---

## Mis propuestas adicionales (sobre el feedback PM)

Tres mejoras pequeñas que encajan en Fase 1 sin coste extra significativo:

### A. Trigger automático de `coach_alerts` desde la VIEW de engagement
Cron diario que revisa `client_engagement_metrics.risk_score` y genera entrada en `coach_alerts` cuando un alumno pasa de `active` → `low_engagement` o `at_risk`. Nico no tiene que mirar el dashboard, la alerta llega sola. La tabla `coach_alerts` ya existe.

### B. Tabla `goal_progress_history` (snapshot de cada actualización)
`goal_progress` guarda el valor actual; añadir tabla ligera `goal_progress_history` (`goal_id, value, recorded_at`) permite gráfica histórica del objetivo (no solo "punto inicial vs ahora"). Coste: 1 tabla + 1 trigger automático al UPDATE. Sin esto, el alumno ve un número, no una curva.

### C. Campo `pinned_goal_id` en `client_profiles`
Permite que el alumno destaque UN objetivo principal en su dashboard (ej: "dominadas: 0 → 5"). El resto siguen tracked pero no protagonistas. Decisión de UX que potencia el efecto motivacional sin complejidad técnica.

---

## Lo que se descarta explícitamente

| Pieza | Por qué |
|---|---|
| Tablas paralelas (`users`, `user_programs`, `user_calendar`, `session_templates`) | Duplicarían `profiles`/`client_profiles`/`programs`/`program_days` que ya tienen datos, RLS y UI |
| Mensajería coach-alumno in-app | WhatsApp ya cumple; alto coste, bajo valor a corto plazo |
| `automation_events` + `automation_rules` (jsonb genérico) | YAGNI; primero validar triggers manuales |
| Pagos/suscripciones nativos | Cuando haya >10 alumnos de pago activos |
| `client_engagement_metrics` como TABLA | Se mantiene como VIEW para evitar triggers múltiples y desincronización |
| Migración a `exercise_categories/materials/tags` separadas | `exercises.muscle_groups[]`, `equipment_needed[]`, `category` ya cubren el 90% |

---

## Detalles técnicos

### Enums nuevos
- `movement_pattern_type` (push, pull, squat, hinge, core, locomotion, isometric)
- `adjustment_type` (load_up, load_down, exercise_swap, volume_change, deload, pause, resume)
- `phase_type` (base, accumulation, intensification, peak, deload, test)
- `session_feeling_type` (great, good, hard, too_hard, painful)
- `journey_stage_type` (base, control, elite, renewal, annual_plan, inactive)
- `goal_type` (weight_loss, pull_ups, push_ups, squats, mobility, autonomy, oposiciones, custom)

### Enum ampliado
- `adherence_status`: añadir valor `low_engagement` entre `active` y `at_risk`

### Triggers necesarios
- `update_updated_at_column` aplicado a todas las tablas nuevas
- Trigger en `program_adjustments` → autocompletar `applied_by = auth.uid()`
- Trigger en `weekly_reviews` → autocompletar `adherence_observed` desde `client_adherence`
- **Triggers en `workout_sessions`, `session_checkins`, `technique_reviews` → actualizar `client_profiles.last_activity_at`** (solo en eventos clave, no en SELECTs ni vistas, para evitar contención)
- Trigger en `goal_progress` UPDATE → insertar fila en `goal_progress_history`

### Cron jobs (pg_cron + pg_net)
- Diario 03:00 → recalcular `client_adherence` para todos los clientes activos
- Lunes 03:00 → snapshot semanal en `client_adherence_weekly` para semana anterior
- Diario 08:00 → revisar `client_engagement_metrics` y generar `coach_alerts` para alumnos en `low_engagement` / `at_risk`

### Storage
- Bucket privado `technique-videos`: alumno sube/lee solo lo suyo, admin lee todo

### Índices
- `weekly_reviews (client_id, week_start_date DESC)`
- `program_adjustments (client_id, applied_at DESC)`
- `technique_reviews (client_id, reviewed_at DESC)`
- `program_day_overrides (program_day_id, client_id, valid_from)`
- `client_adherence_weekly (client_id, week_start_date DESC)`
- `goal_progress (client_id, goal_type)`
- `goal_progress_history (goal_id, recorded_at DESC)`

### Validaciones (vía trigger, NO check constraint)
- `pain_level` 0-10
- `rpe` 1-10
- `score` (technique_reviews) 1-5
- `version_number` único por `template_id`

### Cambios frontend tras Fase 1
- `ClientDetailDialog.tsx` → pestañas: "Revisión semanal", "Ajustes", "Vídeos de técnica", "Objetivos", "Engagement"
- `Training.tsx` (alumno) → respetar `program_day_overrides`, mostrar `session_feeling` simplificado en checkin
- `Dashboard.tsx` (alumno) → widget de objetivo destacado (`pinned_goal_id`) con gráfica histórica
- `Progress.tsx` (alumno) → gráfica de adherencia semanal desde `client_adherence_weekly`
- `CoachPanel.tsx` → KPIs desde `client_engagement_metrics`, alertas en tiempo real desde `coach_alerts`, badge de `journey_stage` por alumno
- `OnboardingManager.tsx` → step nuevo para definir objetivo inicial (insert en `goal_progress`)

### Riesgo técnico identificado
- `last_activity_at` actualizado por trigger en múltiples tablas → potencial contención. Mitigado limitando a 3 tablas (sessions, checkins, technique_reviews) y NUNCA en lecturas.

---

## Orden recomendado

```
Fase 0  ──►  Fase 1  ──►  Fase 2  ──► [Fase 3 diferida]
   │            │
   │            └─ Requiere Fase 0 (usa enums y campos nuevos)
   └─ Sin dependencias, base segura
```

**Próximo paso si se aprueba:** arrancar Fase 0 con las 3 ALTER + enum ampliado y exponer los nuevos campos en `/admin/exercises` y en el checkin del alumno (`session_feeling`).

---

## Scoring final esperado

Con los ajustes del PM incorporados + las 3 mejoras propuestas, la arquitectura cubre:
- ✅ Adherencia (motor + histórico + alertas automáticas)
- ✅ Engagement (señales de silencio + scoring)
- ✅ Progreso visible (goals + histórico)
- ✅ Coaching profesional (revisión, ajustes, técnica)
- ✅ Modular y sin sobrecomplicación
- ✅ Listo para multi-coach sin deuda técnica
