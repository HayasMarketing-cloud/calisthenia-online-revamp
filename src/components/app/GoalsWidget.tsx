import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';

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

const GoalsWidget = () => {
  const { user } = useAuth();

  const { data: goals } = useQuery({
    queryKey: ['client-goals', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('goal_progress')
        .select('*')
        .eq('client_id', user!.id)
        .eq('is_active', true)
        .order('updated_at', { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  if (!goals || goals.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">Mis objetivos</h2>
      <Card className="rounded-2xl">
        <CardContent className="p-5 space-y-4">
          {goals.slice(0, 3).map((g) => {
            const label = g.custom_label || goalLabels[g.goal_type] || 'Objetivo';
            const pct = calcPct(
              g.start_value != null ? Number(g.start_value) : null,
              g.current_value != null ? Number(g.current_value) : null,
              g.target_value != null ? Number(g.target_value) : null
            );
            return (
              <div key={g.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Target className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-foreground truncate">{label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {g.current_value ?? '—'} / {g.target_value ?? '—'} {g.unit || ''}
                  </span>
                </div>
                <Progress value={pct} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
};

export default GoalsWidget;
