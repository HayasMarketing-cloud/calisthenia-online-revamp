import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Users, Copy, Calendar, Search, AlertCircle, Eye, ClipboardList, Smartphone, TrendingUp, Activity, AlertTriangle, CheckCircle2, BellRing, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import AdminBreadcrumbs from '@/components/admin/AdminBreadcrumbs';
import { format, addWeeks, addDays } from 'date-fns';
import ClientDetailDialog from '@/components/admin/ClientDetailDialog';

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  active: { label: 'Activo', variant: 'default' },
  at_risk: { label: 'En riesgo', variant: 'secondary' },
  inactive: { label: 'Inactivo', variant: 'destructive' },
  new: { label: 'Nuevo', variant: 'outline' },
};

const CoachPanel = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [assignDialog, setAssignDialog] = useState<{ open: boolean; clientId: string; clientName: string }>({ open: false, clientId: '', clientName: '' });
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [detailDialog, setDetailDialog] = useState<{ open: boolean; clientId: string; clientName: string }>({ open: false, clientId: '', clientName: '' });

  // Fetch all clients (profiles + adherence + active program)
  const { data: clients, isLoading } = useQuery({
    queryKey: ['coach-clients'],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, display_name, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;

      // Get adherence for all
      const { data: adherenceData } = await supabase
        .from('client_adherence')
        .select('*');

      // Get active programs
      const { data: activePrograms } = await supabase
        .from('programs')
        .select('id, name, client_id, status, start_date')
        .eq('status', 'active')
        .eq('is_template', false);

      // Get user roles to filter out admins
      const { data: roles } = await supabase
        .from('user_roles')
        .select('user_id, role');

      const adminIds = new Set((roles || []).filter(r => r.role === 'admin').map(r => r.user_id));

      return (profiles || [])
        .filter(p => !adminIds.has(p.id))
        .map(p => ({
          ...p,
          adherence: (adherenceData || []).find(a => a.client_id === p.id),
          activeProgram: (activePrograms || []).find(ap => ap.client_id === p.id),
        }));
    },
    enabled: !!user,
  });

  // Fetch templates
  const { data: templates } = useQuery({
    queryKey: ['program-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('id, name, description, duration_weeks, difficulty_level')
        .eq('is_template', true)
        .order('name');
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch active coach alerts (not dismissed)
  const { data: alerts } = useQuery({
    queryKey: ['coach-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coach_alerts')
        .select('id, client_id, alert_type, message, created_at, is_read')
        .eq('is_dismissed', false)
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Pending technique reviews (waiting for coach feedback)
  const { data: pendingReviews } = useQuery({
    queryKey: ['coach-pending-reviews'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('technique_reviews')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending');
      if (error) throw error;
      return count ?? 0;
    },
    enabled: !!user,
  });

  // Dismiss alert
  const dismissAlertMutation = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase
        .from('coach_alerts')
        .update({ is_dismissed: true, is_read: true })
        .eq('id', alertId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coach-alerts'] });
    },
  });

  // Clone template and assign to client
  const assignMutation = useMutation({
    mutationFn: async ({ clientId, templateId }: { clientId: string; templateId: string }) => {
      const template = templates?.find(t => t.id === templateId);
      if (!template) throw new Error('Plantilla no encontrada');

      const startDate = new Date();

      // 1. Create program
      const { data: newProgram, error: progErr } = await supabase
        .from('programs')
        .insert({
          name: template.name,
          description: template.description,
          duration_weeks: template.duration_weeks,
          difficulty_level: template.difficulty_level,
          is_template: false,
          client_id: clientId,
          coach_id: user!.id,
          template_id: templateId,
          start_date: format(startDate, 'yyyy-MM-dd'),
          end_date: format(addWeeks(startDate, template.duration_weeks || 12), 'yyyy-MM-dd'),
          status: 'active',
        })
        .select('id')
        .single();
      if (progErr) throw progErr;

      // 2. Clone weeks
      const { data: templateWeeks } = await supabase
        .from('program_weeks')
        .select('*')
        .eq('program_id', templateId)
        .order('week_number');

      if (!templateWeeks?.length) return;

      for (const week of templateWeeks) {
        const weekStart = addWeeks(startDate, week.week_number - 1);
        const { data: newWeek, error: weekErr } = await supabase
          .from('program_weeks')
          .insert({
            program_id: newProgram.id,
            week_number: week.week_number,
            name: week.name,
            notes: week.notes,
            start_date: format(weekStart, 'yyyy-MM-dd'),
          })
          .select('id')
          .single();
        if (weekErr) throw weekErr;

        // 3. Clone days
        const { data: templateDays } = await supabase
          .from('program_days')
          .select('*')
          .eq('week_id', week.id)
          .order('day_number');

        if (!templateDays?.length) continue;

        for (const day of templateDays) {
          const scheduledDate = addDays(weekStart, day.day_number - 1);
          const { data: newDay, error: dayErr } = await supabase
            .from('program_days')
            .insert({
              week_id: newWeek.id,
              day_number: day.day_number,
              name: day.name,
              notes: day.notes,
              is_rest_day: day.is_rest_day,
              scheduled_date: format(scheduledDate, 'yyyy-MM-dd'),
            })
            .select('id')
            .single();
          if (dayErr) throw dayErr;

          // 4. Clone exercises
          const { data: templateExercises } = await supabase
            .from('program_day_exercises')
            .select('*')
            .eq('day_id', day.id)
            .order('order_index');

          if (templateExercises?.length) {
            const { error: exErr } = await supabase
              .from('program_day_exercises')
              .insert(
                templateExercises.map(ex => ({
                  day_id: newDay.id,
                  exercise_id: ex.exercise_id,
                  order_index: ex.order_index,
                  sets: ex.sets,
                  reps: ex.reps,
                  rest_seconds: ex.rest_seconds,
                  notes: ex.notes,
                  custom_youtube_video_id: ex.custom_youtube_video_id,
                }))
              );
            if (exErr) throw exErr;
          }
        }
      }
    },
    onSuccess: () => {
      toast.success('Programa asignado correctamente');
      queryClient.invalidateQueries({ queryKey: ['coach-clients'] });
      setAssignDialog({ open: false, clientId: '', clientName: '' });
      setSelectedTemplate('');
    },
    onError: (err: Error) => {
      toast.error(`Error: ${err.message}`);
    },
  });

  const filteredClients = (clients || []).filter(c =>
    (c.display_name || '').toLowerCase().includes(search.toLowerCase())
  );

  // KPIs aggregated
  const totalClients = clients?.length || 0;
  const activeClients = (clients || []).filter(c => c.adherence?.status === 'active').length;
  const atRiskClients = (clients || []).filter(c => c.adherence?.status === 'at_risk' || c.adherence?.status === 'inactive').length;
  const avgAdherence7d = totalClients > 0
    ? Math.round(
        (clients || []).reduce((sum, c) => sum + Number(c.adherence?.adherence_pct_7d || 0), 0) / totalClients
      )
    : 0;
  const openAlerts = alerts?.length || 0;

  const alertTypeLabels: Record<string, string> = {
    low_engagement: 'Bajo engagement',
    at_risk: 'En riesgo',
    inactive: 'Inactivo',
    missed_sessions: 'Sesiones perdidas',
    no_feedback: 'Sin feedback',
  };

  const clientNameById = (id: string) =>
    (clients || []).find(c => c.id === id)?.display_name || 'Alumno';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <AdminBreadcrumbs current="Panel de Coach" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Panel de Coach
            </h1>
            <p className="text-sm text-muted-foreground">{clients?.length || 0} alumnos registrados</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/onboarding/">
                <ClipboardList className="h-4 w-4 mr-2" />
                Onboarding
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/app/dashboard" target="_blank" rel="noopener">
                <Smartphone className="h-4 w-4 mr-2" />
                Vista alumno
              </Link>
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Users className="h-3.5 w-3.5" /> Alumnos
              </div>
              <div className="text-2xl font-bold text-foreground">{totalClients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> Activos
              </div>
              <div className="text-2xl font-bold text-foreground">{activeClients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <AlertTriangle className="h-3.5 w-3.5 text-orange-500" /> En riesgo
              </div>
              <div className="text-2xl font-bold text-foreground">{atRiskClients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <TrendingUp className="h-3.5 w-3.5 text-primary" /> Adherencia 7d
              </div>
              <div className="text-2xl font-bold text-foreground">{avgAdherence7d}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Activity className="h-3.5 w-3.5 text-blue-500" /> Técnicas pendientes
              </div>
              <div className="text-2xl font-bold text-foreground">{pendingReviews ?? 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts panel */}
        {openAlerts > 0 && (
          <Card className="border-orange-500/30 bg-orange-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BellRing className="h-4 w-4 text-orange-500" />
                Alertas activas ({openAlerts})
              </CardTitle>
              <CardDescription>
                Generadas automáticamente cada día a las 08:00. Descártalas cuando estén gestionadas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-80 overflow-y-auto">
              {(alerts || []).map(alert => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-md bg-background border border-border"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <button
                        type="button"
                        className="font-medium text-sm text-foreground hover:text-primary truncate text-left"
                        onClick={() =>
                          setDetailDialog({
                            open: true,
                            clientId: alert.client_id,
                            clientName: clientNameById(alert.client_id),
                          })
                        }
                      >
                        {clientNameById(alert.client_id)}
                      </button>
                      <Badge variant="outline" className="text-xs">
                        {alertTypeLabels[alert.alert_type] || alert.alert_type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(alert.created_at), 'dd/MM HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => dismissAlertMutation.mutate(alert.id)}
                    disabled={dismissAlertMutation.isPending}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar alumno..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Client table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Alumnos</CardTitle>
            <CardDescription>Gestiona programas y monitorea adherencia</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {filteredClients.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground flex flex-col items-center gap-2">
                <AlertCircle className="h-8 w-8" />
                <p>No hay alumnos registrados</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alumno</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Adherencia 7d</TableHead>
                    <TableHead>Racha</TableHead>
                    <TableHead>Programa activo</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map(client => {
                    const status = client.adherence?.status || 'new';
                    const cfg = statusConfig[status] || statusConfig.new;
                    return (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.display_name || 'Sin nombre'}</TableCell>
                        <TableCell>
                          <Badge variant={cfg.variant}>{cfg.label}</Badge>
                        </TableCell>
                        <TableCell>
                          {client.adherence?.adherence_pct_7d
                            ? `${Math.round(Number(client.adherence.adherence_pct_7d))}%`
                            : '—'}
                        </TableCell>
                        <TableCell>{client.adherence?.current_streak || 0} días</TableCell>
                        <TableCell>
                          {client.activeProgram ? (
                            <span className="text-sm text-foreground">{client.activeProgram.name}</span>
                          ) : (
                            <span className="text-sm text-muted-foreground italic">Sin programa</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setDetailDialog({
                                open: true,
                                clientId: client.id,
                                clientName: client.display_name || 'Alumno',
                              })
                            }
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            Ver
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!!client.activeProgram}
                            onClick={() =>
                              setAssignDialog({
                                open: true,
                                clientId: client.id,
                                clientName: client.display_name || 'Alumno',
                              })
                            }
                          >
                            <Copy className="h-3.5 w-3.5 mr-1" />
                            Asignar
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Templates overview */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Plantillas disponibles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(templates || []).map(t => (
              <Card key={t.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{t.name}</CardTitle>
                  <CardDescription>{t.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Badge variant="outline">{t.duration_weeks} semanas</Badge>
                  <Badge variant="secondary">{t.difficulty_level}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Assign dialog */}
      <Dialog open={assignDialog.open} onOpenChange={open => !open && setAssignDialog({ open: false, clientId: '', clientName: '' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Asignar programa a {assignDialog.clientName}</DialogTitle>
            <DialogDescription>
              Se clonará la plantilla seleccionada y se creará un programa activo con fecha de inicio hoy.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Plantilla</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una plantilla" />
                </SelectTrigger>
                <SelectContent>
                  {(templates || []).map(t => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name} ({t.duration_weeks}sem · {t.difficulty_level})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Inicio: {format(new Date(), 'dd/MM/yyyy')}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialog({ open: false, clientId: '', clientName: '' })}>
              Cancelar
            </Button>
            <Button
              disabled={!selectedTemplate || assignMutation.isPending}
              onClick={() => assignMutation.mutate({ clientId: assignDialog.clientId, templateId: selectedTemplate })}
            >
              {assignMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              Asignar programa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Client detail dialog */}
      <ClientDetailDialog
        open={detailDialog.open}
        onOpenChange={open => !open && setDetailDialog({ open: false, clientId: '', clientName: '' })}
        clientId={detailDialog.clientId}
        clientName={detailDialog.clientName}
      />
    </div>
  );
};

export default CoachPanel;
