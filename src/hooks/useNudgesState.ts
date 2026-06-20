import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  selectDashboardNudges,
  type NudgeKey,
  type NudgeState,
} from '@/lib/nudges/selectDashboardNudges';

function nowInMadrid(): Date {
  // Construye una Date "local" cuyos campos representan la hora de Europe/Madrid.
  // Sirve para que getHours() refleje la hora española sin depender del cliente.
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value || '0';
  return new Date(
    `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`
  );
}

function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function useNudgesState() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const now = nowInMadrid();
  const todayISO = ymd(now);
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowISO = ymd(tomorrow);

  const enabled = !!user;

  const { data } = useQuery({
    queryKey: ['nudges-state', user?.id, todayISO],
    enabled,
    queryFn: async (): Promise<NudgeState> => {
      const uid = user!.id;

      // Programa activo
      const { data: prog } = await supabase
        .from('programs')
        .select('id')
        .eq('client_id', uid)
        .eq('status', 'active')
        .maybeSingle();

      let todaySession: NudgeState['todaySession'] = null;
      let tomorrowSession: NudgeState['tomorrowSession'] = null;

      if (prog) {
        const { data: weeks } = await supabase
          .from('program_weeks')
          .select('id')
          .eq('program_id', prog.id);
        const weekIds = (weeks || []).map((w) => w.id);

        if (weekIds.length) {
          const { data: days } = await supabase
            .from('program_days')
            .select('id, is_rest_day, scheduled_date')
            .in('week_id', weekIds)
            .in('scheduled_date', [todayISO, tomorrowISO]);

          const today = days?.find((d) => d.scheduled_date === todayISO);
          const tom = days?.find((d) => d.scheduled_date === tomorrowISO);

          if (today) {
            const { data: session } = await supabase
              .from('workout_sessions')
              .select('id, status')
              .eq('client_id', uid)
              .eq('program_day_id', today.id)
              .order('started_at', { ascending: false })
              .maybeSingle();
            todaySession = {
              id: today.id,
              isRest: !!today.is_rest_day,
              status: (session?.status as NudgeState['todaySession']['status']) ?? 'pending',
            };
          }
          if (tom) {
            tomorrowSession = { id: tom.id, isRest: !!tom.is_rest_day };
          }
        }
      }

      // Última fila con weight_kg NOT NULL
      const { data: weightRow } = await supabase
        .from('baseline_metrics')
        .select('recorded_at')
        .eq('client_id', uid)
        .not('weight_kg', 'is', null)
        .order('recorded_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      // Onboarding = client_profiles.created_at
      const { data: cp } = await supabase
        .from('client_profiles')
        .select('created_at')
        .eq('id', uid)
        .maybeSingle();

      // Racha
      const { data: adh } = await supabase
        .from('client_adherence')
        .select('current_streak')
        .eq('client_id', uid)
        .maybeSingle();

      // Dismissals últimos 7d
      const sevenAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: dismissals } = await supabase
        .from('nudge_dismissals')
        .select('nudge_key, dismissed_at')
        .eq('client_id', uid)
        .gte('dismissed_at', sevenAgo)
        .order('dismissed_at', { ascending: false });

      const dismissMap: NudgeState['dismissals'] = {};
      for (const d of dismissals || []) {
        const key = d.nudge_key as NudgeKey;
        if (!dismissMap[key]) dismissMap[key] = new Date(d.dismissed_at);
      }

      return {
        nowMadrid: now,
        hasActiveProgram: !!prog,
        todaySession,
        tomorrowSession,
        lastWeightLoggedAt: weightRow?.recorded_at ? new Date(weightRow.recorded_at) : null,
        onboardingCompletedAt: cp?.created_at ? new Date(cp.created_at) : null,
        currentStreak: adh?.current_streak ?? 0,
        dismissals: dismissMap,
      };
    },
  });

  const dismiss = useMutation({
    mutationFn: async (key: NudgeKey) => {
      if (!user) return;
      await supabase
        .from('nudge_dismissals')
        .insert({ client_id: user.id, nudge_key: key });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['nudges-state', user?.id] });
    },
  });

  const nudges = data ? selectDashboardNudges(data) : [];
  return { nudges, dismiss: (key: NudgeKey) => dismiss.mutate(key) };
}
