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
import { Switch } from '@/components/ui/switch';
import { Loader2, Plus, Pencil, Trash2, Search, Dumbbell, Video, Globe } from 'lucide-react';
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

const EXERCISE_CATEGORIES = [
  { value: 'fuerza', label: 'Fuerza' },
  { value: 'movilidad', label: 'Movilidad' },
  { value: 'resistencia', label: 'Resistencia' },
  { value: 'pliometria', label: 'Pliometría' },
  { value: 'flexibilidad', label: 'Flexibilidad' },
];

interface ExerciseForm {
  id?: string;
  name: string;
  description: string;
  youtube_video_id: string;
  muscle_groups: string[];
  difficulty_level: string;
  equipment_needed: string;
  category: string;
  // SEO
  seo_slug: string;
  primary_keyword: string;
  aliases: string;
  seo_description: string;
  monthly_volume: string;
  is_public_seo: boolean;
  public_order: string;
}

const emptyForm: ExerciseForm = {
  name: '',
  description: '',
  youtube_video_id: '',
  muscle_groups: [],
  difficulty_level: 'beginner',
  equipment_needed: '',
  category: '',
  seo_slug: '',
  primary_keyword: '',
  aliases: '',
  seo_description: '',
  monthly_volume: '',
  is_public_seo: false,
  public_order: '',
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
        category: (data.category || null) as any,
        seo_slug: data.seo_slug.trim() || null,
        primary_keyword: data.primary_keyword.trim() || null,
        aliases: data.aliases ? data.aliases.split(',').map(s => s.trim()).filter(Boolean) : [],
        seo_description: data.seo_description.trim() || null,
        monthly_volume: data.monthly_volume ? parseInt(data.monthly_volume, 10) : null,
        is_public_seo: data.is_public_seo,
        public_order: data.public_order ? parseInt(data.public_order, 10) : null,
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

  const openEdit = (ex: any) => {
    setForm({
      id: ex.id,
      name: ex.name,
      description: ex.description || '',
      youtube_video_id: ex.youtube_video_id || '',
      muscle_groups: ex.muscle_groups || [],
      difficulty_level: ex.difficulty_level || 'beginner',
      equipment_needed: (ex.equipment_needed || []).join(', '),
      category: ex.category || '',
      seo_slug: ex.seo_slug || '',
      primary_keyword: ex.primary_keyword || '',
      aliases: (ex.aliases || []).join(', '),
      seo_description: ex.seo_description || '',
      monthly_volume: ex.monthly_volume != null ? String(ex.monthly_volume) : '',
      is_public_seo: !!ex.is_public_seo,
      public_order: ex.public_order != null ? String(ex.public_order) : '',
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
                  <TableHead>Categoría</TableHead>
                  <TableHead>Músculos</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead>Vídeo</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No se encontraron ejercicios
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(ex => (
                    <TableRow key={ex.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span>{ex.name}</span>
                          {(ex as any).is_public_seo && (
                            <Badge variant="default" className="text-[10px] gap-1"><Globe className="h-3 w-3" />SEO</Badge>
                          )}
                        </div>
                        {(ex as any).primary_keyword && (
                          <div className="text-[10px] text-muted-foreground mt-0.5">kw: {(ex as any).primary_keyword}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        {(ex as any).category ? (
                          <Badge variant="outline" className="text-xs">{EXERCISE_CATEGORIES.find(c => c.value === (ex as any).category)?.label || (ex as any).category}</Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </TableCell>
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
                          <button
                            onClick={() => setVideoModal({ open: true, videoId: ex.youtube_video_id!, name: ex.name })}
                            className="block rounded overflow-hidden hover:opacity-80 transition-opacity"
                          >
                            <img
                              src={`https://img.youtube.com/vi/${ex.youtube_video_id}/default.jpg`}
                              alt={ex.name}
                              className="w-16 h-12 object-cover rounded"
                            />
                          </button>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
              <Label>Categoría</Label>
              <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                <SelectTrigger><SelectValue placeholder="Selecciona categoría" /></SelectTrigger>
                <SelectContent>
                  {EXERCISE_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
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

            {/* SEO Fields */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">SEO público</h3>
              </div>

              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="space-y-0.5">
                  <Label className="text-sm">Mostrar en web pública</Label>
                  <p className="text-xs text-muted-foreground">Aparece en tablas SEO de páginas públicas</p>
                </div>
                <Switch
                  checked={form.is_public_seo}
                  onCheckedChange={v => setForm(p => ({ ...p, is_public_seo: v }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Keyword principal</Label>
                  <Input
                    value={form.primary_keyword}
                    onChange={e => setForm(p => ({ ...p, primary_keyword: e.target.value }))}
                    placeholder="Ej: dominadas pronas"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Volumen mensual</Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.monthly_volume}
                    onChange={e => setForm(p => ({ ...p, monthly_volume: e.target.value }))}
                    placeholder="Ej: 1300"
                  />
                </div>
                <div className="space-y-2">
                  <Label>SEO slug</Label>
                  <Input
                    value={form.seo_slug}
                    onChange={e => setForm(p => ({ ...p, seo_slug: e.target.value }))}
                    placeholder="dominadas-pronas"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Orden público</Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.public_order}
                    onChange={e => setForm(p => ({ ...p, public_order: e.target.value }))}
                    placeholder="Ej: 1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Aliases / sinónimos (separados por comas)</Label>
                <Input
                  value={form.aliases}
                  onChange={e => setForm(p => ({ ...p, aliases: e.target.value }))}
                  placeholder="Ej: pull ups, dominadas agarre prono"
                />
              </div>

              <div className="space-y-2">
                <Label>Descripción SEO</Label>
                <Textarea
                  value={form.seo_description}
                  onChange={e => setForm(p => ({ ...p, seo_description: e.target.value }))}
                  placeholder="Descripción optimizada para meta y rich snippets"
                  rows={2}
                />
              </div>
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

      {/* Video preview modal */}
      <Dialog open={videoModal.open} onOpenChange={open => !open && setVideoModal({ open: false, videoId: '', name: '' })}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>{videoModal.name}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {videoModal.open && (
              <iframe
                src={`https://www.youtube.com/embed/${videoModal.videoId}?autoplay=1`}
                title={videoModal.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExercisesManager;
