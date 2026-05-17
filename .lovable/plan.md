# Plan de evolución backend — App privada de alumnos (v3 — estado vivo)

**Contexto:** Modo **single-coach** (Nico). ~90% del schema heredado reaprovechado. Multi-coach diferido a Fase 3.

**Leyenda:** ✅ hecho · 🟡 en curso · ⬜ pendiente

---

## Estado por fases

| Fase | Estado | Resumen |
|---|---|---|
| **Fase 0** — Extender schema | ✅ | Enums, `session_feeling`, `journey_stage`, `last_activity_at`, `client_profiles` ampliado, `exercises` con tips/errores/variaciones |
| **Fase 1** — Tablas nuevas + VIEW | ✅ | 6 tablas + VIEW `client_engagement_metrics` + bucket `technique-videos` + RLS |
| **Bloque A** — Operativa coach completa | ✅ | Formularios coach, cron jobs, KPIs y filtros en CoachPanel |
| **Bloque B** — Motivación alumno | ⬜ | Rachas, badges, hitos, gráfica de adherencia/objetivos en área privada |
| **Fase 2** — Versionado + overrides | ✅ | Tablas + RPC + UI completas (versiones, snapshot, overrides en CoachDialog y aplicación en Training) |
| **Fase 3** — Multi-coach | ⬜ | Diferida hasta segundo profesor |

---

## ✅ Completado

### Fase 0 — Schema extendido
- Enums: `movement_pattern_type`, `adjustment_type`, `phase_type`, `session_feeling_type`, `journey_stage_type`, `goal_type`, `adherence_status` (con `low_engagement`)
- `exercises`: `movement_pattern`, `coach_tips`, `common_errors`, `easier_variation_id`, `harder_variation_id`, `default_sets/reps/rest`
- `session_checkins`: `pain_level`, `pain_location`, `rpe`, `duration_minutes_real`, `session_feeling`
- `client_profiles`: `journey_stage`, `last_activity_at` + triggers en sessions/checkins/technique_reviews

### Fase 1 — Backend completo
- Tablas: `program_phases`, `weekly_reviews`, `program_adjustments`, `technique_reviews`, `client_adherence_weekly`, `goal_progress`
- VIEW `client_engagement_metrics` (SECURITY INVOKER)
- Bucket `technique-videos` con RLS
- RLS estricto en todas

### Frontend alumno (Fase 1)
- `GoalsWidget` en Dashboard con CRUD de objetivos
- `Progress.tsx`: adherencia semanal, `weekly_reviews` y `technique_reviews` visibles
- `SessionCheckinDialog` con `session_feeling`

### Bloque A — Operativa coach
- **A.1** Formularios coach en `ClientDetailDialog`: weekly reviews, ajustes, objetivos, technique reviews (vía WhatsApp + entrada manual)
- **A.2** `ClientDetailDialog` con pestañas Objetivos / Revisiones / Ajustes / Técnica / Engagement
- **A.3** Cron jobs (`pg_cron` + `pg_net`):
  - Diario 03:00 → recalcular `client_adherence`
  - Lunes 03:15 → snapshot semanal en `client_adherence_weekly`
  - Diario 08:00 → generar `coach_alerts` desde `client_engagement_metrics`
- **A.4** KPIs en `CoachPanel`: alumnos / activos / en riesgo / adherencia media 7d / técnicas pendientes + panel de alertas activas con dismiss
- **A.5** Filtros y orden en tabla de alumnos: estado, programa, ordenación (nombre, adherencia, racha, sesión más reciente)
- Badges de fase/estado en cards de `AdminHub`

### Fase 2 (parcial)
- ✅ Migración: tablas `program_template_versions` y `program_day_overrides` + RLS
- ⬜ UI: editor de versiones de plantilla y aplicación de overrides desde `ClientDetailDialog`

---

## ⬜ Pendiente

### Bloque B — Motivación del alumno (prioridad alta)
Objetivo: que el alumno BASE perciba avance y vuelva a la app sin necesidad de empuje del coach.

- **B.1** Gráfica histórica de adherencia semanal en `Progress.tsx` (leer `client_adherence_weekly`, mostrar últimas 12 semanas con `recharts`)
- **B.2** Widget de racha actual + mejor racha en Dashboard (ya hay `current_streak`/`longest_streak` en `client_adherence`)
- **B.3** Sistema de hitos automáticos:
  - Migración: tabla ligera `client_milestones` (`client_id`, `milestone_type`, `value`, `achieved_at`)
  - Trigger SQL que detecta y registra hitos (7/30/90 días de racha, primer dominio, +10% adherencia, primer objetivo cumplido)
  - Componente `MilestonesTimeline` en `Progress.tsx`
- **B.4** Objetivo destacado (`pinned_goal_id` en `client_profiles`) con gráfica histórica
  - Requiere también `goal_progress_history` (propuesta B del plan original)
- **B.5** Toast/celebración al completar sesión con racha activa

### Fase 2 — UI de versionado y overrides ✅
- **C.1** `/admin/programs/:id/versions` lista versiones con resumen y JSON viewer
- **C.2** Botón "Snapshot" + acceso a "Versiones" desde el editor de plantilla
- **C.3** Tab "Overrides" en `ClientDetailDialog`: skip/note/swap/change/add/remove con caducidad y toggle activo
- **C.4** `useTodayTraining` resuelve overrides activos no caducados y los aplica al día (incluido día reasignado, nota visible y ejercicios añadidos sin registro en DB)

### Bloque D — Mejoras de coaching ✅
- **D.1** KPI + filtro + badge "sin revisión" en CoachPanel (alumnos activos sin `weekly_review` esta semana, ISO week)
- **D.2** Preset "Prioridad coach" (en riesgo + inactivo + activos con programa y sin feedback semanal)
- **D.3** Botón PDF en cada revisión semanal (ventana de impresión A4 con estilo, listo para guardar/enviar por WhatsApp)
- **D.4** Step 5 opcional en onboarding: objetivo estructurado en `goal_progress` con tipo + valor + target + fecha → se fija automáticamente como `pinned_goal_id`

### Fase 3 — Multi-coach (diferida)
- Tabla `coaches`, refactor RLS con cláusula "coach asignado", UI de asignación

---

## Mi recomendación de orden

1. **Bloque B** completo → impacto directo en retención del alumno
2. **Fase 2 UI** (C.1-C.4) → desbloquea trabajar plantillas sin miedo a romper alumnos activos
3. **Bloque D** según necesidad real (sobre todo D.1 y D.4)
4. **Fase 3** cuando entre segundo profesor

---

## Riesgos abiertos
- `last_activity_at` actualizado por triggers múltiples → vigilar contención si escalamos a >100 alumnos activos
- VIEW `client_engagement_metrics` puede ralentizarse si crecen mucho `workout_sessions` → revisar índices si se nota
