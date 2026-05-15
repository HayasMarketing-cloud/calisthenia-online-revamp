import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, ClipboardList, Search, Eye, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminBreadcrumbs from '@/components/admin/AdminBreadcrumbs';
import ClientDetailDialog from '@/components/admin/ClientDetailDialog';
import { format } from 'date-fns';

const OnboardingManager = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState<{ open: boolean; clientId: string; clientName: string }>({
    open: false,
    clientId: '',
    clientName: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-onboarding'],
    queryFn: async () => {
      const [{ data: profiles }, { data: clientProfiles }, { data: roles }] = await Promise.all([
        supabase.from('profiles').select('id, display_name, created_at').order('created_at', { ascending: false }),
        supabase.from('client_profiles').select('*'),
        supabase.from('user_roles').select('user_id, role'),
      ]);

      const adminIds = new Set((roles || []).filter(r => r.role === 'admin').map(r => r.user_id));
      const byId = new Map((clientProfiles || []).map(cp => [cp.id, cp]));

      return (profiles || [])
        .filter(p => !adminIds.has(p.id))
        .map(p => {
          const cp = byId.get(p.id);
          const completed = !!cp && (!!cp.short_term_goal || !!cp.long_term_goal || !!cp.training_experience);
          return {
            id: p.id,
            display_name: p.display_name,
            created_at: p.created_at,
            completed,
            short_term_goal: cp?.short_term_goal,
            long_term_goal: cp?.long_term_goal,
            activity_level: cp?.activity_level,
            training_days_per_week: cp?.training_days_per_week,
            training_location: cp?.training_location,
            updated_at: cp?.updated_at,
          };
        });
    },
    enabled: !!user,
  });

  const filtered = (data || []).filter(c =>
    (c.display_name || '').toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = filtered.filter(c => c.completed).length;
  const pendingCount = filtered.length - completedCount;

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
        <AdminBreadcrumbs current="Onboarding" />

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-primary" /> Onboarding de alumnos
            </h1>
            <p className="text-sm text-muted-foreground">
              Gestiona el formulario y consulta los datos recibidos de cada alumno
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/app/onboarding" target="_blank" rel="noopener">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver formulario
            </Link>
          </Button>
        </div>

        {/* Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{filtered.length}</p>
                <p className="text-xs text-muted-foreground">Alumnos registrados</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Completados</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pendientes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar alumno..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Datos recibidos</CardTitle>
            <CardDescription>Información que cada alumno ha enviado en el formulario inicial</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground flex flex-col items-center gap-2">
                <AlertCircle className="h-8 w-8" />
                <p>No hay alumnos para mostrar</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alumno</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Objetivo</TableHead>
                    <TableHead>Nivel</TableHead>
                    <TableHead>Días/sem</TableHead>
                    <TableHead>Lugar</TableHead>
                    <TableHead>Actualizado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(c => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.display_name || 'Sin nombre'}</TableCell>
                      <TableCell>
                        {c.completed ? (
                          <Badge variant="default">Completado</Badge>
                        ) : (
                          <Badge variant="outline">Pendiente</Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[220px] truncate text-sm text-muted-foreground">
                        {c.short_term_goal || c.long_term_goal || '—'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground capitalize">
                        {c.activity_level || '—'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {c.training_days_per_week ?? '—'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {c.training_location || '—'}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {c.updated_at ? format(new Date(c.updated_at), 'dd/MM/yyyy') : '—'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setDetail({
                              open: true,
                              clientId: c.id,
                              clientName: c.display_name || 'Alumno',
                            })
                          }
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Ver ficha
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <ClientDetailDialog
        open={detail.open}
        onOpenChange={open => !open && setDetail({ open: false, clientId: '', clientName: '' })}
        clientId={detail.clientId}
        clientName={detail.clientName}
      />
    </div>
  );
};

export default OnboardingManager;
