import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Plus, Pencil, Trash2, Search, ClipboardList, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AdminBreadcrumbs from '@/components/admin/AdminBreadcrumbs';

const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
];

interface TemplateForm {
  id?: string;
  name: string;
  description: string;
  difficulty_level: string;
  duration_weeks: number;
  tags: string;
}

const emptyForm: TemplateForm = {
  name: '',
  description: '',
  difficulty_level: 'beginner',
  duration_weeks: 4,
  tags: '',
};

const ProgramTemplates = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string; name: string }>({ open: false, id: '', name: '' });
  const [form, setForm] = useState<TemplateForm>(emptyForm);
  const isEditing = !!form.id;

  const { data: templates, isLoading } = useQuery({
    queryKey: ['program-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('is_template', true)
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: TemplateForm) => {
      const payload = {
        name: data.name,
        description: data.description || null,
        difficulty_level: data.difficulty_level as 'beginner' | 'intermediate' | 'advanced',
        duration_weeks: data.duration_weeks,
        tags: data.tags ? data.tags.split(',').map(s => s.trim()) : null,
        is_template: true,
      };
      if (data.id) {
        const { error } = await supabase.from('programs').update(payload).eq('id', data.id);
        if (error) throw error;
      } else {
        const { data: created, error } = await supabase.from('programs').insert(payload).select().single();
        if (error) throw error;
        // Auto-create weeks
        const weeks = Array.from({ length: data.duration_weeks }, (_, i) => ({
          program_id: created.id,
          week_number: i + 1,
          name: `Semana ${i + 1}`,
        }));
        const { error: wErr } = await supabase.from('program_weeks').insert(weeks);
        if (wErr) throw wErr;
      }
    },
    onSuccess: () => {
      toast.success(isEditing ? 'Plantilla actualizada' : 'Plantilla creada');
      queryClient.invalidateQueries({ queryKey: ['program-templates'] });
      setDialogOpen(false);
      setForm(emptyForm);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Delete hierarchy: exercises → days → weeks → program
      const { data: weeks } = await supabase.from('program_weeks').select('id').eq('program_id', id);
      if (weeks?.length) {
        const weekIds = weeks.map(w => w.id);
        const { data: days } = await supabase.from('program_days').select('id').in('week_id', weekIds);
        if (days?.length) {
          const dayIds = days.map(d => d.id);
          await supabase.from('program_day_exercises').delete().in('day_id', dayIds);
          await supabase.from('program_days').delete().in('week_id', weekIds);
        }
        await supabase.from('program_weeks').delete().eq('program_id', id);
      }
      const { error } = await supabase.from('programs').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Plantilla eliminada');
      queryClient.invalidateQueries({ queryKey: ['program-templates'] });
      setDeleteDialog({ open: false, id: '', name: '' });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const openEdit = (t: NonNullable<typeof templates>[number]) => {
    setForm({
      id: t.id,
      name: t.name,
      description: t.description || '',
      difficulty_level: t.difficulty_level || 'beginner',
      duration_weeks: t.duration_weeks || 4,
      tags: (t.tags || []).join(', '),
    });
    setDialogOpen(true);
  };

  const filtered = (templates || []).filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const diffLabel = (level: string | null) => DIFFICULTY_LEVELS.find(d => d.value === level)?.label || level;

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
        <AdminBreadcrumbs current="Plantillas de programa" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-primary" /> Plantillas de programa
            </h1>
            <p className="text-sm text-muted-foreground">{templates?.length || 0} plantillas</p>
          </div>
          <Button onClick={() => { setForm(emptyForm); setDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-1" /> Nueva plantilla
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead>Semanas</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No hay plantillas
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(t => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">{diffLabel(t.difficulty_level)}</Badge>
                      </TableCell>
                      <TableCell>{t.duration_weeks || '—'}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(t.tags || []).slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/programs/${t.id}`)}>
                          <Eye className="h-3.5 w-3.5 mr-1" /> Editar contenido
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => openEdit(t)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setDeleteDialog({ open: true, id: t.id, name: t.name })}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={open => { if (!open) { setDialogOpen(false); setForm(emptyForm); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar plantilla' : 'Nueva plantilla'}</DialogTitle>
            <DialogDescription>{isEditing ? 'Modifica los datos de la plantilla' : 'Crea una nueva plantilla de programa'}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nombre *</Label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Ej: Calistenia Intermedia 8 semanas" />
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nivel</Label>
                <Select value={form.difficulty_level} onValueChange={v => setForm(p => ({ ...p, difficulty_level: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {DIFFICULTY_LEVELS.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duración (semanas)</Label>
                <Input type="number" min={1} max={52} value={form.duration_weeks} onChange={e => setForm(p => ({ ...p, duration_weeks: parseInt(e.target.value) || 1 }))} disabled={isEditing} />
                {isEditing && <p className="text-[10px] text-muted-foreground">No editable tras crear</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tags (separados por comas)</Label>
              <Input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="Ej: fuerza, hipertrofia" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDialogOpen(false); setForm(emptyForm); }}>Cancelar</Button>
            <Button disabled={!form.name || saveMutation.isPending} onClick={() => saveMutation.mutate(form)}>
              {saveMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              {isEditing ? 'Guardar' : 'Crear plantilla'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={deleteDialog.open} onOpenChange={open => !open && setDeleteDialog({ open: false, id: '', name: '' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar plantilla</DialogTitle>
            <DialogDescription>
              ¿Eliminar <strong>{deleteDialog.name}</strong> y todo su contenido (semanas, días, ejercicios)? No se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, id: '', name: '' })}>Cancelar</Button>
            <Button variant="destructive" disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate(deleteDialog.id)}>
              {deleteMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgramTemplates;
