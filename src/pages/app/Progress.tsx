import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Flame, Target, Activity, CalendarDays, ClipboardList, Video, MessageSquare, Trophy, Award } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const milestoneLabels: Record<string, { label: string; icon: string }> = {
  streak_7: { label: 'Racha 7 días', icon: '🔥' },
  streak_30: { label: 'Racha 30 días', icon: '🔥🔥' },
  streak_90: { label: 'Racha 90 días', icon: '🏆' },
  best_streak: { label: 'Nueva mejor racha', icon: '⚡' },
  adherence_80: { label: 'Adherencia ≥80%', icon: '💪' },
  first_session: { label: 'Primera sesión', icon: '🎯' },
  goal_completed: { label: 'Objetivo completado', icon: '🏅' },
  sessions_10: { label: '10 sesiones', icon: '✨' },
  sessions_50: { label: '50 sesiones', icon: '🌟' },
  sessions_100: { label: '100 sesiones', icon: '👑' },
};

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

const Progress = () => {
  const { user } = useAuth();

  const { data: engagement } = useQuery({
    queryKey: ['client-engagement', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('client_engagement_metrics')
        .select('*')
        .eq('client_id', user!.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  const { data: weekly } = useQuery({
    queryKey: ['client-adherence-weekly', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('client_adherence_weekly')
        .select('*')
        .eq('client_id', user!.id)
        .order('week_start_date', { ascending: false })
        .limit(8);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: weekly } = useQuery({
    queryKey: ['client-adherence-weekly', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('client_adherence_weekly')
        .select('*')
        .eq('client_id', user!.id)
        .order('week_start_date', { ascending: false })
        .limit(12);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: milestones } = useQuery({
    queryKey: ['client-milestones', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('client_milestones')
        .select('*')
        .eq('client_id', user!.id)
        .eq('is_archived', false)
        .order('achieved_at', { ascending: false })
        .limit(20);
      return data || [];
    },
    enabled: !!user,
  });

  const { data: goals } = useQuery({
    queryKey: ['client-goals-progress', user?.id],
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

  // Weekly reviews (solo las marcadas client_visible = true por RLS)
  const { data: reviews } = useQuery({
    queryKey: ['client-weekly-reviews', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('weekly_reviews')
        .select('*')
        .eq('client_id', user!.id)
        .order('week_start_date', { ascending: false })
        .limit(8);
      return data || [];
    },
    enabled: !!user,
  });

  // Technique reviews del alumno
  const { data: technique } = useQuery({
    queryKey: ['client-technique-reviews', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('technique_reviews')
        .select('id, exercise_id, video_url, client_notes, coach_feedback, score, recommendations, status, reviewed_at, created_at')
        .eq('client_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(15);
      return data || [];
    },
    enabled: !!user,
  });

  // Nombres de ejercicios referenciados
  const exerciseIds = Array.from(new Set((technique || []).map(t => t.exercise_id).filter(Boolean) as string[]));
  const { data: exerciseNames } = useQuery({
    queryKey: ['exercises-by-id', exerciseIds],
    queryFn: async () => {
      if (!exerciseIds.length) return {} as Record<string, string>;
      const { data } = await supabase.from('exercises').select('id, name').in('id', exerciseIds);
      const map: Record<string, string> = {};
      (data || []).forEach(e => { map[e.id] = e.name; });
      return map;
    },
    enabled: exerciseIds.length > 0,
  });

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Mi progreso</h1>

      {/* Engagement actual */}
      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" /> Actividad reciente
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Stat label="Sesiones (7d)" value={engagement?.sessions_completed_7d ?? 0} />
          <Stat label="Sesiones (30d)" value={engagement?.sessions_completed_30d ?? 0} />
          <Stat
            label="Adherencia 30d"
            value={`${engagement?.adherence_rate ? Math.round(Number(engagement.adherence_rate)) : 0}%`}
          />
          <Stat
            label="Feedback 30d"
            value={`${engagement?.feedback_rate ? Math.round(Number(engagement.feedback_rate)) : 0}%`}
          />
        </CardContent>
      </Card>

      {/* Objetivos */}
      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" /> Mis objetivos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!goals || goals.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aún no tienes objetivos activos. Tu coach los configurará pronto.
            </p>
          ) : (
            <div className="space-y-4">
              {goals.map((g) => {
                const label = g.custom_label || goalLabels[g.goal_type] || 'Objetivo';
                const pct = calcPct(
                  g.start_value != null ? Number(g.start_value) : null,
                  g.current_value != null ? Number(g.current_value) : null,
                  g.target_value != null ? Number(g.target_value) : null
                );
                return (
                  <div key={g.id} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-foreground truncate">{label}</span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {g.current_value ?? '—'} / {g.target_value ?? '—'} {g.unit || ''}
                      </span>
                    </div>
                    <ProgressBar value={pct} className="h-2" />
                    {g.target_date && (
                      <p className="text-[11px] text-muted-foreground">
                        Objetivo para {format(parseISO(g.target_date), "d 'de' MMMM yyyy", { locale: es })}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Adherencia semanal */}
      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" /> Adherencia semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!weekly || weekly.length === 0 ? (
            <div className="text-center py-6">
              <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Aún no hay registros semanales. Completa tus sesiones para empezar a ver tu evolución.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {weekly.map((w) => {
                const pct = Number(w.completion_rate || 0);
                return (
                  <div key={w.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">
                        Semana del {format(parseISO(w.week_start_date), 'd MMM', { locale: es })}
                      </span>
                      <span className="text-muted-foreground">
                        {w.completed_sessions}/{w.assigned_sessions} · {Math.round(pct)}%
                      </span>
                    </div>
                    <ProgressBar value={pct} className="h-1.5" />
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Días inactivo */}
      {engagement && engagement.days_inactive != null && engagement.days_inactive < 999 && (
        <Card className="rounded-2xl">
          <CardContent className="p-4 flex items-center gap-3">
            <Flame className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm text-foreground">
                {engagement.days_inactive === 0
                  ? '¡Activo hoy! Sigue así.'
                  : `${engagement.days_inactive} día${engagement.days_inactive === 1 ? '' : 's'} desde tu última actividad.`}
              </p>
            </div>
            {engagement.risk_score != null && engagement.risk_score >= 60 && (
              <Badge variant="destructive" className="text-[10px]">Atención</Badge>
            )}
          </CardContent>
        </Card>
      )}

      {/* Revisiones semanales del coach */}
      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-primary" /> Notas del coach
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!reviews || reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Tu coach aún no ha publicado ninguna revisión semanal.
            </p>
          ) : (
            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="border rounded-lg p-3 space-y-1.5">
                  <p className="text-xs font-semibold text-foreground">
                    Semana del {format(parseISO(r.week_start_date), "d 'de' MMMM yyyy", { locale: es })}
                  </p>
                  {r.summary && <p className="text-xs text-foreground">{r.summary}</p>}
                  {r.strengths && (
                    <p className="text-xs"><span className="font-medium text-foreground">Fortalezas:</span> <span className="text-muted-foreground">{r.strengths}</span></p>
                  )}
                  {r.improvement_areas && (
                    <p className="text-xs"><span className="font-medium text-foreground">A mejorar:</span> <span className="text-muted-foreground">{r.improvement_areas}</span></p>
                  )}
                  {r.next_steps && (
                    <p className="text-xs"><span className="font-medium text-foreground">Próximos pasos:</span> <span className="text-muted-foreground">{r.next_steps}</span></p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback de técnica */}
      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Video className="h-4 w-4 text-primary" /> Feedback de técnica
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!technique || technique.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aún no has enviado videos de técnica para revisar.
            </p>
          ) : (
            <div className="space-y-3">
              {technique.map((t) => {
                const exName = t.exercise_id && exerciseNames ? exerciseNames[t.exercise_id] : null;
                const statusVariant =
                  t.status === 'reviewed' ? 'default' :
                  t.status === 'archived' ? 'outline' : 'secondary';
                const statusLabel =
                  t.status === 'reviewed' ? 'Revisado' :
                  t.status === 'archived' ? 'Archivado' : 'Pendiente';
                return (
                  <div key={t.id} className="border rounded-lg p-3 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {exName || 'Ejercicio'}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Enviado {format(new Date(t.created_at), "d MMM yyyy", { locale: es })}
                          {t.reviewed_at && ` · Revisado ${format(new Date(t.reviewed_at), "d MMM", { locale: es })}`}
                        </p>
                      </div>
                      <Badge variant={statusVariant} className="text-[10px] shrink-0">{statusLabel}</Badge>
                    </div>

                    {t.client_notes && (
                      <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <MessageSquare className="h-3 w-3 mt-0.5 shrink-0" />
                        <span className="italic">"{t.client_notes}"</span>
                      </div>
                    )}

                    {t.coach_feedback && (
                      <div className="bg-muted rounded p-2 text-xs text-foreground">
                        <span className="font-medium">Coach:</span> {t.coach_feedback}
                      </div>
                    )}

                    {t.recommendations && (
                      <p className="text-xs text-foreground">
                        <span className="font-medium">Recomendaciones:</span> {t.recommendations}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      {t.score != null ? (
                        <span className="text-muted-foreground">
                          Puntuación: <span className="font-semibold text-foreground">{t.score}/10</span>
                        </span>
                      ) : <span />}
                      {t.video_url && (
                        <a href={t.video_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                          Ver video
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-muted rounded-lg p-3 text-center">
    <p className="text-xl font-bold text-foreground">{value}</p>
    <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
  </div>
);

export default Progress;
