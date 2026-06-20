-- Notifications & nudges beta
create type public.notification_priority as enum ('high','medium','low');

create type public.notification_type as enum (
  'technique_review',
  'weekly_review',
  'milestone'
);

create type public.notification_action_route as enum (
  'today_session',
  'log_weight',
  'view_reviews'
);

-- notifications
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
  unique (client_id, source_table, source_id)
);

create index idx_notifications_client_unread on public.notifications (client_id, is_read, created_at desc);

grant select, update on public.notifications to authenticated;
grant all on public.notifications to service_role;

alter table public.notifications enable row level security;

create policy "client reads own notifications"
on public.notifications for select to authenticated
using (client_id = auth.uid());

create policy "client marks own as read"
on public.notifications for update to authenticated
using (client_id = auth.uid()) with check (client_id = auth.uid());

-- nudge_dismissals
create table public.nudge_dismissals (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  nudge_key text not null,
  dismissed_at timestamptz not null default now()
);
create index idx_nudge_dismissals_client_key on public.nudge_dismissals (client_id, nudge_key, dismissed_at desc);

grant select, insert on public.nudge_dismissals to authenticated;
grant all on public.nudge_dismissals to service_role;

alter table public.nudge_dismissals enable row level security;

create policy "client manages own dismissals"
on public.nudge_dismissals for all to authenticated
using (client_id = auth.uid()) with check (client_id = auth.uid());

-- Trigger fn: technique review
create or replace function public.notify_on_technique_review()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_exercise_name text;
begin
  if new.exercise_id is not null then
    select name into v_exercise_name from public.exercises where id = new.exercise_id;
  end if;
  v_exercise_name := coalesce(v_exercise_name, 'tu ejercicio');

  insert into public.notifications (
    client_id, type, priority, title, body, action_route, action_payload, source_table, source_id
  ) values (
    new.client_id,
    'technique_review',
    'high',
    'Revisión de técnica',
    'He revisado tu técnica. Te dejé un par de notas en ' || v_exercise_name || ', échales un ojo.',
    'view_reviews',
    jsonb_build_object('review_id', new.id),
    'technique_reviews',
    new.id
  )
  on conflict (client_id, source_table, source_id) do nothing;

  return new;
end;
$$;

create trigger trg_notify_on_technique_review
after insert on public.technique_reviews
for each row execute function public.notify_on_technique_review();

-- Trigger fn: weekly review
create or replace function public.notify_on_weekly_review()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.client_visible is distinct from true then
    return new;
  end if;

  insert into public.notifications (
    client_id, type, priority, title, body, action_route, source_table, source_id
  ) values (
    new.client_id,
    'weekly_review',
    'medium',
    'Nueva revisión de tu coach',
    'Tu coach te ha dejado una revisión.',
    'view_reviews',
    'weekly_reviews',
    new.id
  )
  on conflict (client_id, source_table, source_id) do nothing;

  return new;
end;
$$;

create trigger trg_notify_on_weekly_review
after insert on public.weekly_reviews
for each row execute function public.notify_on_weekly_review();

-- Trigger fn: milestone
create or replace function public.notify_on_milestone()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_body text;
begin
  v_body := coalesce(new.label, new.milestone_type::text);

  insert into public.notifications (
    client_id, type, priority, title, body, source_table, source_id
  ) values (
    new.client_id,
    'milestone',
    'low',
    '¡Hito conseguido!',
    v_body,
    'client_milestones',
    new.id
  )
  on conflict (client_id, source_table, source_id) do nothing;

  return new;
end;
$$;

create trigger trg_notify_on_milestone
after insert on public.client_milestones
for each row execute function public.notify_on_milestone();