
# Plan técnico (v3 — final) — Notificaciones in-app (beta 2-3 alumnos)

Aprobado. Incorpora los dos retoques finales: copy en primera persona para la revisión de técnica (con nombre del ejercicio) y nota explícita sobre el CTA de `plan_tomorrow`.

---

## 1. Migración de BD

Archivo: `supabase/migrations/<ts>_notifications_beta.sql`

### 1.1 Enums

```sql
create type public.notification_priority as enum ('high','medium','low');

create type public.notification_type as enum (
  'technique_review',
  'weekly_review',
  'milestone'
);

create type public.notification_action_route as enum (
  'today_session',   -- /app/training
  'log_weight',      -- /app/progress
  'view_reviews'     -- /app/progress (lista de revisiones)
);
```

### 1.2 Tabla `notifications`

```sql
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  type public.notification_type not null,
  priority public.notification_priority not null default 'medium',
  title text not null,
  body text,
  action_route public.notification_action_route,
  action_payload jsonb,
  source_table text,
  source_id uuid,
  is_read boolean not null default false,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  unique (client_id, source_table, source_id)   -- dedupe
);

create index on public.notifications (client_id, is_read, created_at desc);

grant select, update on public.notifications to authenticated;
grant all on public.notifications to service_role;

alter table public.notifications enable row level security;

create policy "client reads own notifications"
on public.notifications for select to authenticated
using (client_id = auth.uid());

create policy "client marks own as read"
on public.notifications for update to authenticated
using (client_id = auth.uid()) with check (client_id = auth.uid());
```

### 1.3 Tabla `nudge_dismissals`

```sql
create table public.nudge_dismissals (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  nudge_key text not null,
  dismissed_at timestamptz not null default now()
);
create index on public.nudge_dismissals (client_id, nudge_key, dismissed_at desc);

grant select, insert on public.nudge_dismissals to authenticated;
grant all on public.nudge_dismissals to service_role;

alter table public.nudge_dismissals enable row level security;
create policy "client manages own dismissals"
on public.nudge_dismissals for all to authenticated
using (client_id = auth.uid()) with check (client_id = auth.uid());
```

### 1.4 Triggers `AFTER INSERT` (SECURITY DEFINER) — 3

Todos: `language plpgsql security definer set search_path = public`, `client_id = new.client_id`, dedupe vía unique `(client_id, source_table, source_id)` con `ON CONFLICT DO NOTHING`.

**`notify_on_technique_review`** sobre `public.technique_reviews`
- `type='technique_review'`, `priority='high'`, `action_route='view_reviews'`, `action_payload = jsonb_build_object('review_id', new.id)`.
- Resuelve nombre del ejercicio con `SELECT name FROM public.exercises WHERE id = new.exercise_id` (variable local `v_exercise_name`, fallback `'tu ejercicio'` si null).
- Título: `"Revisión de técnica"`.
- Body (1ª persona, voz de Nico): `"He revisado tu técnica. Te dejé un par de notas en " || v_exercise_name || ", échales un ojo."`

**`notify_on_weekly_review`** sobre `public.weekly_reviews`
- `type='weekly_review'`, `priority='medium'`, `action_route='view_reviews'`.
- Título: `"Nueva revisión de tu coach"`.
- Body: `"Tu coach te ha dejado una revisión."` (sin "periódica").

**`notify_on_milestone`** sobre `public.client_milestones`
- `type='milestone'`, `priority='low'`, sin `action_route`.
- Título: `"¡Hito conseguido!"`.
- Body: usa `new.label` si existe, si no derivar de `new.milestone_type`.

(`coach_alerts` queda intacto como feed interno del coach.)

---

## 2. Función pura `selectDashboardNudges`

`src/lib/nudges/selectDashboardNudges.ts`

### 2.1 Catálogo cerrado

```ts
export type NudgeKey =
  | 'today_session' | 'log_weight' | 'plan_tomorrow' | 'waiting_program' | 'streak';

export type ActionRoute =
  | 'today_session'      // /app/training
  | 'log_weight'         // /app/progress
  | 'view_reviews'       // /app/progress
  | 'public_routines';   // /rutinas/
```

### 2.2 Firma

```ts
interface NudgeState {
  nowMadrid: Date;
  hasActiveProgram: boolean;
  todaySession?: { id: string; status?: 'pending'|'in_progress'|'completed'; isRest: boolean };
  tomorrowSession?: { id: string; isRest: boolean };
  lastWeightLoggedAt?: Date | null;        // baseline_metrics.weight_kg NOT NULL
  onboardingCompletedAt?: Date | null;     // = client_profiles.created_at
  currentStreak: number;
  dismissals: Partial<Record<NudgeKey, Date>>;
}
export interface Nudge {
  key: NudgeKey;
  priority: 'high'|'medium'|'low';
  title: string;
  body?: string;
  primaryAction: { label: string; route: ActionRoute };
  secondaryAction?: { label: string; route: ActionRoute };
}
export function selectDashboardNudges(s: NudgeState): Nudge[];
```

### 2.3 Reglas

- "No reaparece en 3 días" sobre `dismissals[key]`.
- Cascada Hoy → Mañana (corte 18:00 Madrid):
  - `todaySession` no completada → `today_session` (high).
  - Si completada y hora Madrid ≥ 18:00 → `plan_tomorrow` (medium), CTA "Echar un vistazo" → `today_session`.  
    **Nota:** `/app/training` muestra la sesión de hoy; no existe ruta para previsualizar la de mañana. Aceptable en beta.
- `!hasActiveProgram` → `waiting_program` (high) con CTA secundario "Mientras tanto, mira rutinas" → `public_routines`.
- `log_weight` (medium) — dos umbrales **distintos**:
  - Silencio: NO mostrar si `(nowMadrid - onboardingCompletedAt) < 14 días`.
  - Disparo: mostrar si `lastWeightLoggedAt == null` o `(nowMadrid - lastWeightLoggedAt) > 15 días`.
- `streak` (low, opcional): solo si `currentStreak >= 3`.
- Orden por prioridad y tope **1 destacada + 2 secundarias = 3**.

### 2.4 Tests (Vitest)

`src/lib/nudges/__tests__/selectDashboardNudges.test.ts` con casos:
- Sin programa → waiting_program + CTA pública.
- Sesión pendiente hoy → today_session destacada.
- Sesión completada y 17:59 Madrid → no plan_tomorrow.
- Sesión completada y 18:01 Madrid → plan_tomorrow destacada.
- Onboarding hace 5d, sin peso → no log_weight.
- Onboarding 30d + peso hace 10d → no log_weight.
- Onboarding 30d + peso hace 16d → log_weight.
- Onboarding 30d + cintura/cadera recientes pero weight_kg > 15d → log_weight.
- Racha 2 → no streak; racha 3 → streak.
- Dismiss hace 2d oculto, hace 4d reaparece.
- > 3 candidatos → exactamente 3, respetando prioridad.

---

## 3. Hooks

### `src/hooks/useNudgesState.ts`

React-query, reúne:
- Programa activo + sesión hoy/mañana (lógica análoga a la existente en `Dashboard.tsx`).
- Última fila `baseline_metrics` del cliente con `weight_kg is not null`.
- `client_profiles.created_at` como `onboardingCompletedAt`.
- `client_adherence.current_streak`.
- `nudge_dismissals` últimos 7d agregados por `nudge_key`.

`nowMadrid` con `Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', ... })`. Devuelve `{ nudges, dismiss(key) }` (insert + invalidar).

### `src/hooks/useNotifications.ts`

- `list`: `notifications` order by `created_at desc`, filtra en cliente leídas con `read_at < now()-30d`.
- `unreadCount`: cap visual `"9+"`.
- `markRead(id)` al abrir cada item (no al abrir panel).
- **Sin realtime.** Refetch al montar el panel y al recuperar foco.

---

## 4. Componentes

- `src/lib/nudges/routes.ts` — `resolveActionRoute(route, payload)`:
  - `today_session` → `/app/training`
  - `log_weight` → `/app/progress`
  - `view_reviews` → `/app/progress`
  - `public_routines` → `/rutinas/`
- `src/components/app/notifications/NotificationsBell.tsx` — `Badge` `"9+"`, `aria-label="Notificaciones, N sin leer"`.
- `src/components/app/notifications/NotificationsPanel.tsx` — `Popover`; al abrir foco al primer item; lista con `role="region"` + `aria-live="polite"`; Enter abre y marca leído, Esc cierra; botón "Ocultar" alcanzable por teclado; icono por `type` (Video / ClipboardCheck / Trophy); oculta leídas > 30d.
- `src/components/app/notifications/DashboardNudges.tsx` — render 1 destacada + 2 secundarias con CTA primario, secundario opcional y "Ocultar".

### Integración

- `src/pages/app/Dashboard.tsx`: `<DashboardNudges />` arriba de "Plan de hoy".
- `src/components/app/AppLayout.tsx` (header `/app/`): `<NotificationsBell />`.

---

## 5. Excluido de la beta

Telemetría, snooze global, sistema de archivado, botón "marcar como planificada" con persistencia, `coach_message`/trigger sobre `coach_alerts`, deep-link a revisión individual, realtime en la campana.

---

## 6. Orden de ejecución

1. Migración (enums + 2 tablas + grants + RLS + 3 triggers, con join a `exercises` en el de técnica).
2. `selectDashboardNudges` + `routes.ts` + tests Vitest.
3. Hooks `useNudgesState`, `useNotifications`.
4. Componentes campana + nudges.
5. Integración en `Dashboard.tsx` y `AppLayout.tsx`.
6. QA manual con admin + alumno de prueba: insertar fila en `technique_reviews` y verificar copy en 1ª persona con nombre del ejercicio; insertar `weekly_reviews` y `client_milestones`; verificar cascada de nudges según hora Madrid, estado de programa y peso.
