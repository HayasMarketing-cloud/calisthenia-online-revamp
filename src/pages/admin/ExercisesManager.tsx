import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Plus, Pencil, Trash2, Search, Dumbbell, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import AdminBreadcrumbs from '@/components/admin/AdminBreadcrumbs';

const MUSCLE_GROUPS = [
  'Pecho', 'Espalda', 'Hombros', 'Bíceps', 'Tríceps', 'Core',
  'Cuádriceps', 'Isquiotibiales', 'Glúteos', 'Pantorrillas', 'Antebrazo', 'Full Body',
];

const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
];

interface ExerciseForm {
  id?: string;
  name: string;
  description: string;
  youtube_video_id: string;
  muscle_groups: string[];
  difficulty_level: string;
  equipment_needed: string;
}

const emptyForm: ExerciseForm = {
  name: '',
  description: '',
  youtube_video_id: '',
  muscle_groups: [],
  difficulty_level: 'beginner',
  equipment_needed: '',
};

const ExercisesManager = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [filterMuscle, setFilterMuscle] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string; name: string }>({ open: false, id: '', name: '' });
  const [videoModal, setVideoModal] = useState<{ open: boolean; videoId: string; name: string }>({ open: false, videoId: '', name: '' });
  const [form, setForm] = useState<ExerciseForm>(emptyForm);
  const isEditing = !!form.id;

  const { data: exercises, isLoading } = useQuery({
    queryKey: ['admin-exercises'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: ExerciseForm) => {
      const payload = {
        name: data.name,
        description: data.description || null,
        youtube_video_id: data.youtube_video_id || null,
        muscle_groups: data.muscle_groups,
        difficulty_level: data.difficulty_level as 'beginner' | 'intermediate' | 'advanced',
        equipment_needed: data.equipment_needed ? data.equipment_needed.split(',').map(s => s.trim()) : null,
      };

      if (data.id) {
        const { error } = await supabase.from('exercises').update(payload).eq('id', data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('exercises').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(isEditing ? 'Ejercicio actualizado' : 'Ejercicio creado');
      queryClient.invalidateQueries({ queryKey: ['admin-exercises'] });
      setDialogOpen(false);
      setForm(emptyForm);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // First remove references in program_day_exercises
      const { error: refError } = await supabase.from('program_day_exercises').delete().eq('exercise_id', id);
      if (refError) throw refError;
      const { error } = await supabase.from('exercises').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Ejercicio eliminado');
      queryClient.invalidateQueries({ queryKey: ['admin-exercises'] });
      setDeleteDialog({ open: false, id: '', name: '' });
    },
    onError: (err: Error) => toast.error('No se pudo eliminar: ' + err.message),
  });

  const openEdit = (ex: typeof exercises extends (infer T)[] ? T : never) => {
    setForm({
      id: ex.id,
      name: ex.name,
      description: ex.description || '',
      youtube_video_id: ex.youtube_video_id || '',
      muscle_groups: ex.muscle_groups || [],
      difficulty_level: ex.difficulty_level || 'beginner',
      equipment_needed: (ex.equipment_needed || []).join(', '),
    });
    setDialogOpen(true);
  };

  const openNew = () => {
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const toggleMuscle = (muscle: string) => {
    setForm(prev => ({
      ...prev,
      muscle_groups: prev.muscle_groups.includes(muscle)
        ? prev.muscle_groups.filter(m => m !== muscle)
        : [...prev.muscle_groups, muscle],
    }));
  };

  const filtered = (exercises || []).filter(ex => {
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchMuscle = filterMuscle === 'all' || (ex.muscle_groups || []).some(
      m => m.toLowerCase() === filterMuscle.toLowerCase()
    );
    return matchSearch && matchMuscle;
  });

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
        <AdminBreadcrumbs current="Ejercicios" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-primary" /> Ejercicios
            </h1>
            <p className="text-sm text-muted-foreground">{exercises?.length || 0} ejercicios en la base de datos</p>
          </div>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4 mr-1" /> Nuevo ejercicio
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={filterMuscle} onValueChange={setFilterMuscle}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Grupo muscular" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los grupos</SelectItem>
              {MUSCLE_GROUPS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Músculos</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead>Vídeo</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No se encontraron ejercicios
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(ex => (
                    <TableRow key={ex.id}>
                      <TableCell className="font-medium">{ex.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(ex.muscle_groups || []).slice(0, 3).map(m => (
                            <Badge key={m} variant="outline" className="text-[10px]">{m}</Badge>
                          ))}
                          {(ex.muscle_groups || []).length > 3 && (
                            <Badge variant="outline" className="text-[10px]">+{(ex.muscle_groups || []).length - 3}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">{diffLabel(ex.difficulty_level)}</Badge>
                      </TableCell>
                      <TableCell>
                        {ex.youtube_video_id ? (
                          <a href={`https://youtube.com/watch?v=${ex.youtube_video_id}`} target="_blank" rel="noopener noreferrer">
                            <Video className="h-4 w-4 text-primary" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(ex)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setDeleteDialog({ open: true, id: ex.id, name: ex.name })}>
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
            <DialogTitle>{isEditing ? 'Editar ejercicio' : 'Nuevo ejercicio'}</DialogTitle>
            <DialogDescription>{isEditing ? 'Modifica los datos del ejercicio' : 'Añade un nuevo ejercicio a la base de datos'}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nombre *</Label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Ej: Flexiones diamante" />
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Breve descripción del ejercicio" rows={2} />
            </div>
            <div className="space-y-2">
              <Label>ID de vídeo YouTube</Label>
              <Input value={form.youtube_video_id} onChange={e => setForm(p => ({ ...p, youtube_video_id: e.target.value }))} placeholder="Ej: dQw4w9WgXcQ" />
              {form.youtube_video_id && (
                <img src={`https://img.youtube.com/vi/${form.youtube_video_id}/mqdefault.jpg`} alt="Preview" className="rounded-md w-40 mt-1" />
              )}
            </div>
            <div className="space-y-2">
              <Label>Nivel de dificultad</Label>
              <Select value={form.difficulty_level} onValueChange={v => setForm(p => ({ ...p, difficulty_level: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DIFFICULTY_LEVELS.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Grupos musculares</Label>
              <div className="flex flex-wrap gap-1.5">
                {MUSCLE_GROUPS.map(m => (
                  <Badge
                    key={m}
                    variant={form.muscle_groups.includes(m) ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleMuscle(m)}
                  >
                    {m}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Equipamiento (separado por comas)</Label>
              <Input value={form.equipment_needed} onChange={e => setForm(p => ({ ...p, equipment_needed: e.target.value }))} placeholder="Ej: barra, paralelas" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setDialogOpen(false); setForm(emptyForm); }}>Cancelar</Button>
            <Button disabled={!form.name || saveMutation.isPending} onClick={() => saveMutation.mutate(form)}>
              {saveMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              {isEditing ? 'Guardar cambios' : 'Crear ejercicio'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={deleteDialog.open} onOpenChange={open => !open && setDeleteDialog({ open: false, id: '', name: '' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar ejercicio</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar <strong>{deleteDialog.name}</strong>? Esta acción no se puede deshacer.
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

export default ExercisesManager;
