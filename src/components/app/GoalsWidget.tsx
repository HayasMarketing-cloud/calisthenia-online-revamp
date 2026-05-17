import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Pin, PinOff } from 'lucide-react';
import { toast } from 'sonner';

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
  const queryClient = useQueryClient();

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

  const pinMutation = useMutation({
    mutationFn: async (goalId: string | null) => {
      const { error } = await supabase
        .from('client_profiles')
        .update({ pinned_goal_id: goalId })
        .eq('id', user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-profile-pinned'] });
      queryClient.invalidateQueries({ queryKey: ['pinned-goal'] });
      queryClient.invalidateQueries({ queryKey: ['pinned-goal-history'] });
      toast.success('Objetivo destacado actualizado');
    },
    onError: () => toast.error('No se pudo actualizar el objetivo destacado'),
  });

  if (!goals || goals.length === 0) return null;

  const pinnedId = profile?.pinned_goal_id;

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
            const isPinned = pinnedId === g.id;
            return (
              <div key={g.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Target className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-foreground truncate">{label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {g.current_value ?? '—'} / {g.target_value ?? '—'} {g.unit || ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => pinMutation.mutate(isPinned ? null : g.id)}
                      disabled={pinMutation.isPending}
                      className="p-1 rounded hover:bg-muted transition-colors"
                      aria-label={isPinned ? 'Quitar destacado' : 'Destacar objetivo'}
                      title={isPinned ? 'Quitar destacado' : 'Destacar objetivo'}
                    >
                      {isPinned
                        ? <Pin className="h-3.5 w-3.5 text-primary fill-primary" />
                        : <PinOff className="h-3.5 w-3.5 text-muted-foreground" />
                      }
                    </button>
                  </div>
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
