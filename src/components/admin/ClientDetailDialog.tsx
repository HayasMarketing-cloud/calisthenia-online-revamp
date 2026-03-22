import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2, User, Dumbbell, Heart, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
            difficulty_rating, energy_rating, completed_workout, comment
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
            <div className="space-y-5 pt-2">
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
            </div>
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

export default ClientDetailDialog;
