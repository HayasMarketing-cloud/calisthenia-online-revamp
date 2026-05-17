import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Loader2, History, Plus, FileText, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

interface VersionRow {
  id: string;
  version_number: number;
  change_notes: string | null;
  created_at: string;
  snapshot_jsonb: any;
}

const ProgramTemplateVersions = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [newDialog, setNewDialog] = useState(false);
  const [notes, setNotes] = useState('');
  const [viewVersion, setViewVersion] = useState<VersionRow | null>(null);

  const { data: program } = useQuery({
    queryKey: ['version-program', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('programs').select('id, name').eq('id', id!).single();
      if (error) throw error;
      return data;
    },
  });

  const { data: versions, isLoading } = useQuery({
    queryKey: ['program-template-versions', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('program_template_versions')
        .select('*')
        .eq('template_id', id!)
        .order('version_number', { ascending: false });
      if (error) throw error;
      return data as VersionRow[];
    },
  });

  const snapshotMutation = useMutation({
    mutationFn: async (change_notes: string) => {
      const { error } = await supabase.rpc('create_template_version', {
        p_template_id: id!,
        p_change_notes: change_notes || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Snapshot creado');
      queryClient.invalidateQueries({ queryKey: ['program-template-versions', id] });
      setNewDialog(false);
      setNotes('');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const summary = (snap: any) => {
    if (!snap || !snap.weeks) return { weeks: 0, days: 0, exercises: 0 };
    const weeks = snap.weeks.length;
    let days = 0;
    let exercises = 0;
    snap.weeks.forEach((w: any) => {
      days += (w.days || []).length;
      (w.days || []).forEach((d: any) => { exercises += (d.exercises || []).length; });
    });
    return { weeks, days, exercises };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/admin/">Admin</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/admin/programs/">Plantillas</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/admin/programs/${id}`}>{program?.name || 'Plantilla'}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Versiones</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <History className="h-6 w-6 text-primary" /> Versiones de plantilla
            </h1>
            <p className="text-sm text-muted-foreground">{program?.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={`/admin/programs/${id}`}><ArrowLeft className="h-4 w-4 mr-1" /> Volver al editor</Link>
            </Button>
            <Button onClick={() => setNewDialog(true)}>
              <Plus className="h-4 w-4 mr-1" /> Nuevo snapshot
            </Button>
          </div>
        </div>

        {!versions || versions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Aún no hay versiones guardadas. Crea un snapshot antes de editar para poder recuperarlo.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {versions.map(v => {
              const s = summary(v.snapshot_jsonb);
              return (
                <Card key={v.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Badge variant="secondary">v{v.version_number}</Badge>
                        <span className="text-muted-foreground font-normal">
                          {format(new Date(v.created_at), "d MMM yyyy · HH:mm", { locale: es })}
                        </span>
                      </span>
                      <Button size="sm" variant="ghost" onClick={() => setViewVersion(v)}>Ver snapshot</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-1">
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>{s.weeks} semanas</span>
                      <span>{s.days} días</span>
                      <span>{s.exercises} ejercicios</span>
                    </div>
                    {v.change_notes && <p className="text-sm text-foreground">{v.change_notes}</p>}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={newDialog} onOpenChange={setNewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear snapshot de la versión actual</DialogTitle>
            <DialogDescription>
              Guarda el estado actual de la plantilla (semanas, días y ejercicios) para poder consultarlo más adelante.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label>Notas del cambio (opcional)</Label>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Ej: añadidas progresiones de dominadas en semana 4"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewDialog(false)}>Cancelar</Button>
            <Button disabled={snapshotMutation.isPending} onClick={() => snapshotMutation.mutate(notes)}>
              {snapshotMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              Crear snapshot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewVersion} onOpenChange={open => !open && setViewVersion(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Snapshot v{viewVersion?.version_number}</DialogTitle>
            <DialogDescription>
              {viewVersion && format(new Date(viewVersion.created_at), "d MMM yyyy · HH:mm", { locale: es })}
              {viewVersion?.change_notes ? ` — ${viewVersion.change_notes}` : ''}
            </DialogDescription>
          </DialogHeader>
          <pre className="text-[11px] bg-muted rounded p-3 overflow-auto flex-1">
            {viewVersion ? JSON.stringify(viewVersion.snapshot_jsonb, null, 2) : ''}
          </pre>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgramTemplateVersions;
