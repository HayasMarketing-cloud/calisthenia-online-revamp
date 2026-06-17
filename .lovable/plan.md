# Módulo de Running + Strava

Añadimos sesiones de carrera estructuradas a los programas existentes (calistenia + running mezclados en la misma semana) e importamos los entrenamientos reales desde Strava de cada alumno para compararlos con lo planificado.

## 1. Modelo de datos

Extendemos las tablas de programas para que un día pueda ser una sesión de carrera estructurada por bloques.

**`program_days`** — añadir:
- `session_type` enum (`strength` | `running` | `mobility` | `mixed`), default `strength` para no romper datos existentes.

**Nueva `running_workouts`** (1 fila por día de carrera):
- `program_day_id` (FK)
- `name` (ej. "Rodaje Z2 + 6×400")
- `total_duration_min`, `total_distance_km` (estimados)
- `notes`

**Nueva `running_workout_steps`** (los bloques: calentamiento, series, vuelta a la calma):
- `workout_id` (FK)
- `order_index`
- `step_type` enum (`warmup` | `work` | `recovery` | `cooldown` | `repeat`)
- `repeat_count` (para grupos tipo "6×")
- `parent_step_id` (para anidar pasos dentro de un repeat)
- `duration_type` enum (`time` | `distance` | `open`)
- `duration_value` (segundos o metros)
- `target_type` enum (`pace` | `heart_rate` | `rpe` | `none`)
- `target_low`, `target_high` (ritmo en seg/km o ppm)
- `notes`

**Nueva `strava_connections`** (1 por alumno):
- `client_id`, `strava_athlete_id`
- `access_token`, `refresh_token`, `expires_at` (cifrados — solo lectura desde edge functions con service_role; nunca expuestos al cliente)
- `scope`, `connected_at`, `last_sync_at`

**Nueva `running_activities`** (entrenamiento real importado):
- `client_id`, `strava_activity_id` (único)
- `started_at`, `duration_sec`, `distance_m`
- `avg_pace_sec_per_km`, `avg_hr`, `max_hr`, `elevation_gain_m`, `calories`
- `activity_type` (run, trail_run, …)
- `raw_jsonb` (payload completo para futura analítica)
- `matched_program_day_id` (FK opcional — auto-match por fecha)

RLS: el alumno solo ve lo suyo; el coach (admin) ve todo. `strava_connections.access_token` nunca seleccionable desde el cliente (policy bloquea SELECT de esa columna o se usa vista).

## 2. Integración con Strava (per-user OAuth)

Strava no es un conector de Lovable: cada alumno autoriza su propia cuenta. Flujo:

1. Crear app en developers.strava.com → obtener `Client ID` y `Client Secret`.
2. Guardar `STRAVA_CLIENT_ID` y `STRAVA_CLIENT_SECRET` como secretos del backend.
3. Edge functions nuevas:
   - `strava-oauth-start` — devuelve URL de autorización con scopes `read,activity:read_all`.
   - `strava-oauth-callback` — recibe `code`, lo intercambia por tokens, guarda en `strava_connections`.
   - `strava-sync` — para el usuario actual: refresca token si expira, descarga las actividades nuevas desde `last_sync_at`, las inserta en `running_activities`, e intenta hacer match con un `program_day` de tipo `running` de ±1 día.
   - `strava-webhook` (opcional fase 2) — recibe push de Strava cuando hay actividad nueva.

## 3. UI

**Coach (`/admin/programas/...`)**
- En el editor de día, selector de tipo de sesión (Fuerza / Carrera / …).
- Si es Carrera, abre un constructor de bloques: añadir warm-up, series con repeticiones, recovery, cool-down. Cada bloque pide duración (tiempo o distancia) y objetivo (ritmo min/km, FC o RPE).

**Alumno (`/app/training`)**
- Si el día es de carrera, renderiza la sesión por bloques (en lugar de la lista de ejercicios actual). Vista clara: "10' Z2 → 6 × (400 m @ 4:10/km + 1' trote) → 10' Z1".
- Botón "Conectar Strava" en `/app/profile` (si no está conectado).
- Tras hacer la carrera, "Sincronizar" trae la actividad y la pinta junto al plan: planificado vs real (distancia, tiempo, ritmo medio, FC media).
- Marca el día como completado automáticamente si hay match.

## 4. Entregables por fases

**Fase A — Estructura (sin Strava todavía)**
- Migración: enum `session_type`, tablas `running_workouts`, `running_workout_steps` con RLS y GRANTs.
- Constructor de sesiones de carrera en el editor de plantillas/programas.
- Renderizado de sesión de carrera en `/app/training`.
- Botón "Marcar como completada" manual.

**Fase B — Strava**
- Tablas `strava_connections` y `running_activities` con RLS estricta sobre tokens.
- 3 edge functions OAuth + sync.
- Pantalla "Conectar Strava" + sincronización manual.
- Auto-match actividad ↔ día planificado y vista comparativa planificado vs real.

**Fase C (opcional, más adelante)**
- Webhook de Strava para sincronización automática.
- Exportar la sesión a archivo `.FIT` para enviarla al reloj (esto sí requeriría Garmin u otra vía y se valoraría aparte).

## Decisiones que necesito confirmar antes de implementar

1. ¿Implemento las **dos fases (A y B) ahora**, o prefieres empezar solo por la Fase A y dejar Strava para un segundo paso?
2. Para Strava necesitaré que crees una app en https://developers.strava.com/ y me pases `Client ID` + `Client Secret` (te los pediré con el formulario seguro cuando toque la Fase B).
3. ¿Los ritmos objetivo los introduces como **rango** (ej. 4:00–4:15/km) o como **valor único**? El plan asume rango porque es lo estándar en TrainingPeaks.
