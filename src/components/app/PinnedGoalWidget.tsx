import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Pin, TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const goalLabels: Record<string, string> = {
  weight_loss: 'Pérdida de peso',
  pull_ups: 'Dominadas',
  push_ups: 'Flexiones',
  squats: 'Sentadillas',
  mobility: 'Movilidad',
  autonomy: 'Autonomía',
  oposiciones: 'Oposiciones',
  hipertrofia: 'Hipertrofia',
  resistencia: 'Resistencia',
  custom: 'Personalizado',
};

const calcPct = (start: number | null, current: number | null, target: number | null) => {
  if (start == null || current == null || target == null) return 0;
  if (target === start) return current >= target ? 100 : 0;
  const pct = ((current - start) / (target - start)) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
};

const PinnedGoalWidget = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['client-profile-pinned', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('client_profiles')
        .select('pinned_goal_id')
        .eq('id', user!.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  const pinnedId = profile?.pinned_goal_id;

  const { data: goal } = useQuery({
    queryKey: ['pinned-goal', pinnedId],
    queryFn: async () => {
      if (!pinnedId) return null;
      const { data } = await supabase
        .from('goal_progress')
        .select('*')
        .eq('id', pinnedId)
        .maybeSingle();
      return data;
    },
    enabled: !!pinnedId,
  });

  const { data: history } = useQuery({
    queryKey: ['pinned-goal-history', pinnedId],
    queryFn: async () => {
      if (!pinnedId) return [];
      const { data } = await supabase
        .from('goal_progress_history')
        .select('value, recorded_at')
        .eq('goal_id', pinnedId)
        .order('recorded_at', { ascending: true })
        .limit(30);
      return data || [];
    },
    enabled: !!pinnedId,
  });

  if (!pinnedId || !goal) return null;

  const label = goal.custom_label || goalLabels[goal.goal_type] || 'Objetivo';
  const pct = calcPct(
    goal.start_value != null ? Number(goal.start_value) : null,
    goal.current_value != null ? Number(goal.current_value) : null,
    goal.target_value != null ? Number(goal.target_value) : null
  );

  const chartData = (history || []).map(h => ({
    date: format(parseISO(h.recorded_at as string), 'd MMM', { locale: es }),
    value: Number(h.value),
  }));

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Pin className="h-5 w-5 text-primary" /> Objetivo destacado
      </h2>
      <Card className="rounded-2xl">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-base font-bold text-foreground truncate">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {goal.start_value ?? '—'} → <span className="text-foreground font-semibold">{goal.current_value ?? '—'}</span> / {goal.target_value ?? '—'} {goal.unit || ''}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-bold text-primary leading-none">{pct}%</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Avance</p>
            </div>
          </div>

          <Progress value={pct} className="h-2" />

          {chartData.length >= 2 ? (
            <div className="h-32 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-3">
              <TrendingUp className="h-3.5 w-3.5" />
              Registra más actualizaciones de este objetivo para ver tu evolución.
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default PinnedGoalWidget;
