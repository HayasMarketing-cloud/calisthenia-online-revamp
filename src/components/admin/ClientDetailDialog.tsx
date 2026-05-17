import type React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, User, Dumbbell, Heart, TrendingUp, Calendar, MessageSquare, Target, ClipboardList, Wrench, Video, Settings2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { WeeklyReviewForm, AdjustmentForm, GoalForm, TechniqueReviewForm } from './CoachClientForms';
import ProgramDayOverridesTab from './ProgramDayOverridesTab';

interface ClientDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  clientName: string;
}

const activityLabels: Record<string, string> = {
  sedentary: 'Sedentario',
  light_active: 'Ligeramente activo',
  active: 'Activo',
  very_active: 'Muy activo',
};

const ClientDetailDialog = ({ open, onOpenChange, clientId, clientName }: ClientDetailDialogProps) => {
  // Client profile (onboarding data)
  const { data: clientProfile, isLoading: loadingProfile } = useQuery({
    queryKey: ['coach-client-profile', clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('id', clientId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: open && !!clientId,
  });

  // Adherence
  const { data: adherence } = useQuery({
    queryKey: ['coach-client-adherence', clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_adherence')
        .select('*')
        .eq('client_id', clientId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: open && !!clientId,
  });

  // Baseline metrics
  const { data: metrics } = useQuery({
    queryKey: ['coach-client-metrics', clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('baseline_metrics')
        .select('*')
        .eq('client_id', clientId)
        .order('recorded_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
    enabled: open && !!clientId,
  });

  // Session history with check-ins
  const { data: sessions } = useQuery({
    queryKey: ['coach-client-sessions', clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workout_sessions')
        .select(`
          id, started_at, completed_at, status,
          program_day_id,
          session_checkins (
            difficulty_rating, energy_rating, completed_workout, comment,
            session_feeling, pain_level, pain_location, rpe, duration_minutes_real, created_at
          )
        `)
        .eq('client_id', clientId)
        .order('started_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data;
    },
    enabled: open && !!clientId,
  });

  // Program day names for sessions
  const dayIds = (sessions || []).map(s => s.program_day_id).filter(Boolean) as string[];
  const { data: dayNames } = useQuery({
    queryKey: ['coach-day-names', dayIds],
    queryFn: async () => {
      if (!dayIds.length) return {};
      const { data } = await supabase
        .from('program_days')
        .select('id, name, day_number')
        .in('id', dayIds);
      const map: Record<string, string> = {};
      (data || []).forEach(d => { map[d.id] = d.name || `Día ${d.day_number}`; });
      return map;
    },
    enabled: open && dayIds.length > 0,
  });

  // Goals
  const { data: goals } = useQuery({
    queryKey: ['coach-client-goals', clientId],
    queryFn: async () => {
      const { data } = await supabase.from('goal_progress').select('*').eq('client_id', clientId)
        .order('is_active', { ascending: false }).order('updated_at', { ascending: false });
      return data || [];
    },
    enabled: open && !!clientId,
  });

  const { data: weekly } = useQuery({
    queryKey: ['coach-client-adherence-weekly', clientId],
    queryFn: async () => {
      const { data } = await supabase.from('client_adherence_weekly').select('*')
        .eq('client_id', clientId).order('week_start_date', { ascending: false }).limit(12);
      return data || [];
    },
    enabled: open && !!clientId,
  });

  const { data: engagement } = useQuery({
    queryKey: ['coach-client-engagement', clientId],
    queryFn: async () => {
      const { data } = await supabase.from('client_engagement_metrics').select('*')
        .eq('client_id', clientId).maybeSingle();
      return data;
    },
    enabled: open && !!clientId,
  });

  const { data: reviews } = useQuery({
    queryKey: ['coach-client-reviews', clientId],
    queryFn: async () => {
      const { data } = await supabase.from('weekly_reviews').select('*')
        .eq('client_id', clientId).order('week_start_date', { ascending: false }).limit(10);
      return data || [];
    },
    enabled: open && !!clientId,
  });

  const { data: adjustments } = useQuery({
    queryKey: ['coach-client-adjustments', clientId],
    queryFn: async () => {
      const { data } = await supabase.from('program_adjustments').select('*')
        .eq('client_id', clientId).order('applied_at', { ascending: false }).limit(15);
      return data || [];
    },
    enabled: open && !!clientId,
  });

  const { data: technique } = useQuery({
    queryKey: ['coach-client-technique', clientId],
    queryFn: async () => {
      const { data } = await supabase.from('technique_reviews').select('*')
        .eq('client_id', clientId).order('created_at', { ascending: false }).limit(15);
      return data || [];
    },
    enabled: open && !!clientId,
  });

  const goalLabels: Record<string, string> = {
    weight_loss: 'Pérdida de peso', pull_ups: 'Dominadas', push_ups: 'Flexiones',
    squats: 'Sentadillas', mobility: 'Movilidad', autonomy: 'Autonomía',
    oposiciones: 'Oposiciones', hipertrofia: 'Hipertrofia', resistencia: 'Resistencia', custom: 'Personalizado',
  };
  const adjustmentLabels: Record<string, string> = {
    volume: 'Volumen', intensity: 'Intensidad', exercise_swap: 'Cambio de ejercicio',
    rest_day: 'Día de descanso', progression: 'Progresión', regression: 'Regresión',
    mobility: 'Movilidad', other: 'Otro',
  };
  const calcGoalPct = (s: number | null, c: number | null, t: number | null) => {
    if (s == null || c == null || t == null || t === s) return 0;
    return Math.max(0, Math.min(100, Math.round(((c - s) / (t - s)) * 100)));
  };

  const difficultyEmojis = ['', '😊', '🙂', '😐', '😤', '🥵'];
  const energyEmojis = ['', '😴', '😑', '⚡', '🔥', '💥'];

  const statusBadge = (status: string | null) => {
    switch (status) {
      case 'completed': return <Badge variant="default" className="text-xs">Completada</Badge>;
      case 'skipped': return <Badge variant="destructive" className="text-xs">Omitida</Badge>;
      default: return <Badge variant="outline" className="text-xs">En curso</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            {clientName}
          </DialogTitle>
          <DialogDescription>Perfil completo, métricas y historial</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] px-6 pb-6">
          {loadingProfile ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs defaultValue="resumen" className="pt-2">
              <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-1 mb-3">
                <TabsTrigger value="resumen" className="text-xs">Resumen</TabsTrigger>
                <TabsTrigger value="objetivos" className="text-xs"><Target className="h-3 w-3 mr-1" />Objetivos</TabsTrigger>
                <TabsTrigger value="adherencia" className="text-xs"><TrendingUp className="h-3 w-3 mr-1" />Adherencia</TabsTrigger>
                <TabsTrigger value="revisiones" className="text-xs"><ClipboardList className="h-3 w-3 mr-1" />Revisiones</TabsTrigger>
                <TabsTrigger value="ajustes" className="text-xs"><Wrench className="h-3 w-3 mr-1" />Ajustes</TabsTrigger>
                <TabsTrigger value="tecnica" className="text-xs"><Video className="h-3 w-3 mr-1" />Técnica</TabsTrigger>
                <TabsTrigger value="overrides" className="text-xs"><Settings2 className="h-3 w-3 mr-1" />Overrides</TabsTrigger>
              </TabsList>

              <TabsContent value="resumen" className="space-y-5 mt-0">
                {/* Onboarding Data */}
              {clientProfile && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <User className="h-4 w-4" /> Datos del formulario
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      <InfoRow label="Nivel de actividad" value={activityLabels[clientProfile.activity_level || ''] || '—'} />
                      <InfoRow label="Experiencia" value={clientProfile.training_experience || '—'} />
                      <InfoRow label="Peso" value={clientProfile.weight_kg ? `${clientProfile.weight_kg} kg` : '—'} />
                      <InfoRow label="Altura" value={clientProfile.height_cm ? `${clientProfile.height_cm} cm` : '—'} />
                      <InfoRow label="Días/semana" value={clientProfile.training_days_per_week?.toString() || '—'} />
                      <InfoRow label="Duración sesión" value={clientProfile.session_duration_minutes ? `${clientProfile.session_duration_minutes} min` : '—'} />
                      <InfoRow label="Ubicación" value={clientProfile.training_location || '—'} />
                      <InfoRow label="Equipamiento" value={clientProfile.available_equipment || '—'} />
                      <InfoRow label="Exp. peso corporal" value={clientProfile.bodyweight_experience ? 'Sí' : 'No'} />
                      <InfoRow label="Pasos diarios" value={clientProfile.daily_steps_avg?.toString() || '—'} />
                    </div>
                    {(clientProfile.short_term_goal || clientProfile.long_term_goal) && (
                      <>
                        <Separator className="my-3" />
                        <div className="space-y-2 text-sm">
                          {clientProfile.short_term_goal && (
                            <div><span className="font-medium text-foreground">Objetivo corto plazo:</span> <span className="text-muted-foreground">{clientProfile.short_term_goal}</span></div>
                          )}
                          {clientProfile.long_term_goal && (
                            <div><span className="font-medium text-foreground">Objetivo largo plazo:</span> <span className="text-muted-foreground">{clientProfile.long_term_goal}</span></div>
                          )}
                        </div>
                      </>
                    )}
                    {clientProfile.health_conditions && (
                      <>
                        <Separator className="my-3" />
                        <div className="text-sm">
                          <span className="font-medium text-foreground">Condiciones de salud:</span>{' '}
                          <span className="text-muted-foreground">{clientProfile.health_conditions}</span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Adherence & Metrics */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" /> Adherencia y métricas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <MetricBox label="Adherencia 7d" value={adherence?.adherence_pct_7d ? `${Math.round(Number(adherence.adherence_pct_7d))}%` : '—'} />
                    <MetricBox label="Adherencia 30d" value={adherence?.adherence_pct_30d ? `${Math.round(Number(adherence.adherence_pct_30d))}%` : '—'} />
                    <MetricBox label="Racha actual" value={`${adherence?.current_streak || 0} días`} />
                    <MetricBox label="Mejor racha" value={`${adherence?.longest_streak || 0} días`} />
                  </div>

                  {/* Baseline metrics history */}
                  {metrics && metrics.length > 0 && (
                    <>
                      <Separator className="my-3" />
                      <p className="text-xs font-medium text-muted-foreground mb-2">Métricas base (últimas {metrics.length})</p>
                      <div className="space-y-1.5">
                        {metrics.map(m => (
                          <div key={m.id} className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="text-foreground font-medium w-20">
                              {format(new Date(m.recorded_at), 'dd MMM yy', { locale: es })}
                            </span>
                            {m.max_push_ups != null && <span>Push-ups: {m.max_push_ups}</span>}
                            {m.max_pull_ups != null && <span>Pull-ups: {m.max_pull_ups}</span>}
                            {m.max_squats != null && <span>Squats: {m.max_squats}</span>}
                            {m.weight_kg != null && <span>{Number(m.weight_kg)} kg</span>}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Session History */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Dumbbell className="h-4 w-4" /> Historial de sesiones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!sessions || sessions.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">Sin sesiones registradas</p>
                  ) : (
                    <div className="space-y-2">
                      {sessions.map(session => {
                        const checkin = session.session_checkins?.[0];
                        const dayName = session.program_day_id && dayNames ? dayNames[session.program_day_id] : null;
                        return (
                          <div key={session.id} className="border rounded-lg p-3 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">
                                  {format(new Date(session.started_at), 'dd MMM yyyy · HH:mm', { locale: es })}
                                </span>
                                {dayName && <span className="text-xs text-muted-foreground">— {dayName}</span>}
                              </div>
                              {statusBadge(session.status)}
                            </div>
                            {checkin && (
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Dificultad: {difficultyEmojis[checkin.difficulty_rating] || checkin.difficulty_rating}</span>
                                <span>Energía: {energyEmojis[checkin.energy_rating] || checkin.energy_rating}</span>
                                {!checkin.completed_workout && <Badge variant="destructive" className="text-[10px]">No completó</Badge>}
                              </div>
                            )}
                            {checkin?.comment && (
                              <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                <MessageSquare className="h-3 w-3 mt-0.5 shrink-0" />
                                <span className="italic">"{checkin.comment}"</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
              </TabsContent>

              {/* OBJETIVOS */}
              <TabsContent value="objetivos" className="space-y-3 mt-0">
                <GoalForm clientId={clientId} />
                {!goals || goals.length === 0 ? (
                  <EmptyState icon={Target} text="Sin objetivos registrados" />
                ) : (
                  goals.map((g) => {
                    const label = g.custom_label || goalLabels[g.goal_type] || 'Objetivo';
                    const pct = calcGoalPct(
                      g.start_value != null ? Number(g.start_value) : null,
                      g.current_value != null ? Number(g.current_value) : null,
                      g.target_value != null ? Number(g.target_value) : null
                    );
                    return (
                      <Card key={g.id}>
                        <CardContent className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-foreground">{label}</span>
                              {!g.is_active && <Badge variant="outline" className="text-[10px]">Inactivo</Badge>}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {g.current_value ?? '—'} / {g.target_value ?? '—'} {g.unit || ''}
                            </span>
                          </div>
                          <ProgressBar value={pct} className="h-2" />
                          {g.target_date && (
                            <p className="text-[11px] text-muted-foreground">
                              Objetivo: {format(parseISO(g.target_date), "d MMM yyyy", { locale: es })}
                            </p>
                          )}
                          {g.notes && <p className="text-xs text-muted-foreground italic">{g.notes}</p>}
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </TabsContent>

              {/* ADHERENCIA */}
              <TabsContent value="adherencia" className="space-y-3 mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Engagement actual</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <MetricBox label="Sesiones 7d" value={`${engagement?.sessions_completed_7d ?? 0}`} />
                    <MetricBox label="Sesiones 30d" value={`${engagement?.sessions_completed_30d ?? 0}`} />
                    <MetricBox label="Adherencia" value={engagement?.adherence_rate != null ? `${Math.round(Number(engagement.adherence_rate))}%` : '—'} />
                    <MetricBox label="Feedback" value={engagement?.feedback_rate != null ? `${Math.round(Number(engagement.feedback_rate))}%` : '—'} />
                    <MetricBox label="Días inactivo" value={`${engagement?.days_inactive ?? '—'}`} />
                    <MetricBox label="Risk score" value={`${engagement?.risk_score ?? 0}`} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Histórico semanal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!weekly || weekly.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">Sin registros semanales aún</p>
                    ) : (
                      <div className="space-y-2">
                        {weekly.map((w) => (
                          <div key={w.id} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-foreground">
                                Semana del {format(parseISO(w.week_start_date), 'd MMM yy', { locale: es })}
                              </span>
                              <span className="text-muted-foreground">
                                {w.completed_sessions}/{w.assigned_sessions} · {Math.round(Number(w.completion_rate || 0))}% · {w.inactivity_days}d inactivo
                              </span>
                            </div>
                            <ProgressBar value={Number(w.completion_rate || 0)} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* REVISIONES SEMANALES */}
              <TabsContent value="revisiones" className="space-y-3 mt-0">
                <WeeklyReviewForm clientId={clientId} />
                {!reviews || reviews.length === 0 ? (
                  <EmptyState icon={ClipboardList} text="Sin revisiones semanales" />
                ) : (
                  reviews.map((r) => (
                    <Card key={r.id}>
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            Semana del {format(parseISO(r.week_start_date), "d 'de' MMMM yyyy", { locale: es })}
                          </span>
                          <div className="flex items-center gap-2">
                            {!r.client_visible && <Badge variant="outline" className="text-[10px]">Privada</Badge>}
                          </div>
                        </div>
                        {r.summary && <p className="text-xs text-foreground">{r.summary}</p>}
                        {r.strengths && <p className="text-xs"><span className="font-medium">Fortalezas:</span> <span className="text-muted-foreground">{r.strengths}</span></p>}
                        {r.improvement_areas && <p className="text-xs"><span className="font-medium">A mejorar:</span> <span className="text-muted-foreground">{r.improvement_areas}</span></p>}
                        {r.next_steps && <p className="text-xs"><span className="font-medium">Próximos pasos:</span> <span className="text-muted-foreground">{r.next_steps}</span></p>}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* AJUSTES */}
              <TabsContent value="ajustes" className="space-y-2 mt-0">
                <AdjustmentForm clientId={clientId} />
                {!adjustments || adjustments.length === 0 ? (
                  <EmptyState icon={Wrench} text="Sin ajustes registrados" />
                ) : (
                  adjustments.map((a) => (
                    <div key={a.id} className="border rounded-lg p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">{adjustmentLabels[a.adjustment_type] || a.adjustment_type}</Badge>
                        <span className="text-[11px] text-muted-foreground">
                          {format(new Date(a.applied_at), 'd MMM yyyy', { locale: es })}
                        </span>
                      </div>
                      {a.reason && <p className="text-xs text-foreground">{a.reason}</p>}
                      {(a.old_value || a.new_value) && (
                        <p className="text-xs text-muted-foreground">
                          {a.old_value || '—'} → <span className="font-medium text-foreground">{a.new_value || '—'}</span>
                        </p>
                      )}
                    </div>
                  ))
                )}
              </TabsContent>

              {/* TÉCNICA */}
              <TabsContent value="tecnica" className="space-y-3 mt-0">
                <TechniqueReviewForm clientId={clientId} />
                {!technique || technique.length === 0 ? (
                  <EmptyState icon={Video} text="Sin revisiones de técnica" />
                ) : (
                  technique.map((t) => (
                    <Card key={t.id}>
                      <CardContent className="p-3 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-foreground">
                            {format(new Date(t.created_at), "d MMM yyyy", { locale: es })}
                          </span>
                          <Badge variant={t.status === 'reviewed' ? 'default' : 'outline'} className="text-[10px]">
                            {t.status === 'reviewed' ? 'Revisado' : t.status === 'pending' ? 'Pendiente' : 'Archivado'}
                          </Badge>
                        </div>
                        {t.client_notes && <p className="text-xs text-muted-foreground italic">"{t.client_notes}"</p>}
                        {t.coach_feedback && <p className="text-xs"><span className="font-medium">Feedback:</span> {t.coach_feedback}</p>}
                        {t.score != null && <p className="text-xs">Puntuación: <span className="font-medium">{t.score}/10</span></p>}
                        {t.video_url && (
                          <a href={t.video_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline">
                            Ver video
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* OVERRIDES */}
              <TabsContent value="overrides" className="mt-0">
                <ProgramDayOverridesTab clientId={clientId} />
              </TabsContent>
            </Tabs>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-muted-foreground text-xs">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);

const MetricBox = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-muted rounded-lg p-3 text-center">
    <p className="text-lg font-bold text-foreground">{value}</p>
    <p className="text-[11px] text-muted-foreground">{label}</p>
  </div>
);

const EmptyState = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
  <div className="text-center py-8 text-muted-foreground">
    <Icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
    <p className="text-sm">{text}</p>
  </div>
);

export default ClientDetailDialog;
