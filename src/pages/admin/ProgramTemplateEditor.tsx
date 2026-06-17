import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Loader2, Plus, Trash2, Calendar, Dumbbell, Moon, ChevronsUpDown, Check, Youtube, History, Camera, Footprints } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RunningWorkoutDialog from '@/components/admin/RunningWorkoutDialog';
import { toast as sonnerToast } from 'sonner';

// Extracts an 11-char YouTube video ID from a URL or returns the trimmed input if it already looks like an ID
const parseYouTubeId = (input: string): string | null => {
  const v = (input || '').trim();
  if (!v) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(v)) return v;
  const m = v.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
};
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import AdminBreadcrumbs from '@/components/admin/AdminBreadcrumbs';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface ExerciseOption {
  id: string;
  name: string;
  muscle_groups: string[] | null;
  youtube_video_id?: string | null;
}

interface DayExercise {
  id: string;
  exercise_id: string;
  order_index: number;
  sets: number | null;
  reps: string | null;
  rest_seconds: number | null;
  notes: string | null;
  custom_youtube_video_id?: string | null;
  exercise?: ExerciseOption;
}

interface Day {
  id: string;
  day_number: number;
  name: string | null;
  is_rest_day: boolean | null;
  notes: string | null;
  exercises: DayExercise[];
}

interface Week {
  id: string;
  week_number: number;
  name: string | null;
  notes: string | null;
  days: Day[];
}

const ProgramTemplateEditor = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [addExDialog, setAddExDialog] = useState<{ open: boolean; dayId: string }>({ open: false, dayId: '' });
  const [exForm, setExForm] = useState({ exercise_id: '', sets: 3, reps: '10', rest_seconds: 60, notes: '', custom_youtube_video_id: '' });
  const [exPickerOpen, setExPickerOpen] = useState(false);
  const [addDayDialog, setAddDayDialog] = useState<{ open: boolean; weekId: string; nextNum: number }>({ open: false, weekId: '', nextNum: 1 });
  const [dayForm, setDayForm] = useState({ name: '', is_rest_day: false });
  const [videoEditDialog, setVideoEditDialog] = useState<{ open: boolean; exId: string; current: string; exerciseName: string; baseVideoId: string | null }>({ open: false, exId: '', current: '', exerciseName: '', baseVideoId: null });

  // Fetch program
  const { data: program, isLoading: loadingProgram } = useQuery({
    queryKey: ['template-program', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('programs').select('*').eq('id', id!).single();
      if (error) throw error;
      return data;
    },
  });

  // Fetch full hierarchy
  const { data: weeks, isLoading: loadingWeeks } = useQuery({
    queryKey: ['template-weeks', id],
    queryFn: async () => {
      const { data: weeksData, error: wErr } = await supabase
        .from('program_weeks')
        .select('*')
        .eq('program_id', id!)
        .order('week_number');
      if (wErr) throw wErr;
      if (!weeksData?.length) return [];

      const weekIds = weeksData.map(w => w.id);
      const { data: daysData } = await supabase
        .from('program_days')
        .select('*')
        .in('week_id', weekIds)
        .order('day_number');

      const dayIds = (daysData || []).map(d => d.id);
      let exercisesData: any[] = [];
      if (dayIds.length) {
        const { data: exData } = await supabase
          .from('program_day_exercises')
          .select('*, exercises(id, name, muscle_groups, youtube_video_id)')
          .in('day_id', dayIds)
          .order('order_index');
        exercisesData = exData || [];
      }

      return weeksData.map(w => ({
        ...w,
        days: (daysData || [])
          .filter(d => d.week_id === w.id)
          .map(d => ({
            ...d,
            exercises: exercisesData
              .filter(e => e.day_id === d.id)
              .map(e => ({ ...e, exercise: e.exercises })),
          })),
      })) as Week[];
    },
  });

  // Fetch all exercises for the picker
  const { data: allExercises } = useQuery({
    queryKey: ['all-exercises'],
    queryFn: async () => {
      const { data, error } = await supabase.from('exercises').select('id, name, muscle_groups, youtube_video_id').eq('is_active', true).order('name');
      if (error) throw error;
      return data as ExerciseOption[];
    },
  });

  // Add day
  const addDayMutation = useMutation({
    mutationFn: async ({ weekId, dayNumber, name, isRest }: { weekId: string; dayNumber: number; name: string; isRest: boolean }) => {
      const { error } = await supabase.from('program_days').insert({
        week_id: weekId,
        day_number: dayNumber,
        name: name || `Día ${dayNumber}`,
        is_rest_day: isRest,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Día añadido');
      queryClient.invalidateQueries({ queryKey: ['template-weeks', id] });
      setAddDayDialog({ open: false, weekId: '', nextNum: 1 });
      setDayForm({ name: '', is_rest_day: false });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  // Delete day
  const deleteDayMutation = useMutation({
    mutationFn: async (dayId: string) => {
      await supabase.from('program_day_exercises').delete().eq('day_id', dayId);
      const { error } = await supabase.from('program_days').delete().eq('id', dayId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Día eliminado');
      queryClient.invalidateQueries({ queryKey: ['template-weeks', id] });
    },
  });

  // Add exercise to day
  const addExMutation = useMutation({
    mutationFn: async ({ dayId, exercise_id, sets, reps, rest_seconds, notes, custom_youtube_video_id, order }: any) => {
      const { error } = await supabase.from('program_day_exercises').insert({
        day_id: dayId,
        exercise_id,
        sets,
        reps,
        rest_seconds,
        notes: notes || null,
        custom_youtube_video_id: custom_youtube_video_id || null,
        order_index: order,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Ejercicio añadido al día');
      queryClient.invalidateQueries({ queryKey: ['template-weeks', id] });
      setAddExDialog({ open: false, dayId: '' });
      setExForm({ exercise_id: '', sets: 3, reps: '10', rest_seconds: 60, notes: '', custom_youtube_video_id: '' });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  // Update custom YouTube video for an existing exercise row
  const updateVideoMutation = useMutation({
    mutationFn: async ({ exId, videoId }: { exId: string; videoId: string | null }) => {
      const { error } = await supabase
        .from('program_day_exercises')
        .update({ custom_youtube_video_id: videoId })
        .eq('id', exId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Vídeo actualizado');
      queryClient.invalidateQueries({ queryKey: ['template-weeks', id] });
      setVideoEditDialog({ open: false, exId: '', current: '', exerciseName: '', baseVideoId: null });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  // Remove exercise from day
  const removeExMutation = useMutation({
    mutationFn: async (exId: string) => {
      const { error } = await supabase.from('program_day_exercises').delete().eq('id', exId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Ejercicio eliminado del día');
      queryClient.invalidateQueries({ queryKey: ['template-weeks', id] });
    },
  });

  if (loadingProgram || loadingWeeks) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!program) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Plantilla no encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Custom breadcrumb for nested page */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/admin/">Admin</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/admin/programs/">Plantillas</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{program.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{program.name}</h1>
            <p className="text-sm text-muted-foreground">{program.description || 'Sin descripción'}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{program.duration_weeks} semanas</Badge>
              <Badge variant="outline">{program.difficulty_level}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const { error } = await supabase.rpc('create_template_version', {
                  p_template_id: id!,
                  p_change_notes: null,
                });
                if (error) sonnerToast.error(error.message);
                else sonnerToast.success('Snapshot creado');
              }}
            >
              <Camera className="h-4 w-4 mr-1" /> Snapshot
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/admin/programs/${id}/versions`}>
                <History className="h-4 w-4 mr-1" /> Versiones
              </Link>
            </Button>
          </div>
        </div>

        {/* Weeks accordion */}
        <Accordion type="multiple" className="space-y-4">
          {(weeks || []).map(week => (
            <AccordionItem
              key={week.id}
              value={week.id}
              className="border-2 border-border rounded-xl px-4 sm:px-5 bg-card shadow-sm data-[state=open]:border-primary/40 data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-foreground">Semana {week.week_number}</span>
                  <Badge variant="secondary" className="text-xs font-semibold ml-1">{week.days.length} días</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2 pb-4">
                {week.days.map(day => (
                  <Card
                    key={day.id}
                    className={cn(
                      "overflow-hidden shadow-sm",
                      day.is_rest_day
                        ? 'border-dashed border-2 bg-muted/30'
                        : 'border-l-4 border-l-primary border-y border-r border-border bg-background'
                    )}
                  >
                    <CardHeader className="py-3 px-4 flex flex-row items-center justify-between gap-2 bg-muted/40 border-b">
                      <div className="flex items-center gap-2 min-w-0">
                        {day.is_rest_day ? (
                          <Moon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <Dumbbell className="h-5 w-5 text-primary flex-shrink-0" />
                        )}
                        <CardTitle className="text-base sm:text-lg font-bold">
                          {day.name || `Día ${day.day_number}`}
                          {day.is_rest_day && <span className="text-muted-foreground ml-2 font-normal text-sm">(Descanso)</span>}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-1">
                        {!day.is_rest_day && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setAddExDialog({ open: true, dayId: day.id });
                              setExForm({ exercise_id: '', sets: 3, reps: '10', rest_seconds: 60, notes: '', custom_youtube_video_id: '' });
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" /> Ejercicio
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteDayMutation.mutate(day.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardHeader>
                    {!day.is_rest_day && day.exercises.length > 0 && (
                      <CardContent className="px-4 pb-3 pt-0">
                        <div className="space-y-2">
                          {day.exercises.map((ex, i) => {
                            const videoId = ex.custom_youtube_video_id || ex.exercise?.youtube_video_id;
                            const hasVideo = !!videoId;
                            const openVideoEditor = () => setVideoEditDialog({
                              open: true,
                              exId: ex.id,
                              current: ex.custom_youtube_video_id || '',
                              exerciseName: ex.exercise?.name || 'Ejercicio',
                              baseVideoId: ex.exercise?.youtube_video_id || null,
                            });
                            return (
                            <div
                              key={ex.id}
                              className={cn(
                                "rounded-lg p-3 transition-colors",
                                hasVideo
                                  ? "bg-card border border-border"
                                  : "bg-amber-500/10 border-2 border-dashed border-amber-500/50"
                              )}
                            >
                              {/* Top row: number + thumb + actions */}
                              <div className="flex items-start gap-3">
                                <span className="text-muted-foreground font-bold text-sm pt-1 flex-shrink-0">{i + 1}.</span>
                                {hasVideo ? (
                                  <a
                                    href={`https://www.youtube.com/watch?v=${videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative flex-shrink-0 w-24 aspect-video rounded-md overflow-hidden bg-black"
                                    title="Ver técnica en YouTube"
                                  >
                                    <img
                                      src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                                      alt={`Técnica: ${ex.exercise?.name}`}
                                      loading="lazy"
                                      className="w-full h-full object-cover"
                                    />
                                  </a>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={openVideoEditor}
                                    title="Añadir vídeo de YouTube"
                                    className="relative flex-shrink-0 w-24 aspect-video rounded-md border-2 border-dashed border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 flex flex-col items-center justify-center gap-0.5 transition-colors"
                                  >
                                    <Plus className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                                    <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 leading-none">Vídeo</span>
                                  </button>
                                )}
                                <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className={cn("h-8 w-8 p-0", !hasVideo && "text-amber-600 hover:text-amber-700")}
                                    title={hasVideo ? "Editar vídeo de YouTube" : "Añadir vídeo de YouTube"}
                                    onClick={openVideoEditor}
                                  >
                                    <Youtube className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-destructive h-8 w-8 p-0" onClick={() => removeExMutation.mutate(ex.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Title — full width, no truncate */}
                              <div className="mt-3">
                                <p className="font-bold text-base sm:text-lg text-foreground leading-tight break-words">
                                  {ex.exercise?.name || 'Ejercicio desconocido'}
                                </p>
                                {!hasVideo && (
                                  <Badge variant="outline" className="mt-1.5 text-[10px] py-0 px-1.5 h-4 border-amber-500/60 text-amber-700 dark:text-amber-400 bg-amber-500/10">
                                    Sin vídeo
                                  </Badge>
                                )}
                              </div>

                              {/* Stats row — full width, prominent, black bg */}
                              <div className="grid grid-cols-3 gap-2 mt-3">
                                <div className="rounded-md bg-foreground px-2 py-2.5 text-center">
                                  <div className="text-lg sm:text-xl font-extrabold text-background leading-none">
                                    {ex.sets ?? 'Sin'}
                                  </div>
                                  <div className="text-[10px] uppercase tracking-wider text-background/80 mt-1 font-bold">
                                    Series
                                  </div>
                                </div>
                                <div className="rounded-md bg-foreground px-2 py-2.5 text-center">
                                  <div className="text-lg sm:text-xl font-extrabold text-background leading-none break-words">
                                    {ex.reps ?? 'Sin'}
                                  </div>
                                  <div className="text-[10px] uppercase tracking-wider text-background/80 mt-1 font-bold">
                                    Reps
                                  </div>
                                </div>
                                <div className="rounded-md bg-foreground px-2 py-2.5 text-center">
                                  <div className="text-lg sm:text-xl font-extrabold text-background leading-none">
                                    {ex.rest_seconds ? `${ex.rest_seconds}s` : 'Sin'}
                                  </div>
                                  <div className="text-[10px] uppercase tracking-wider text-background/80 mt-1 font-bold">
                                    Descanso
                                  </div>
                                </div>
                              </div>

                              {ex.notes && (
                                <p className="text-xs text-muted-foreground italic mt-2">{ex.notes}</p>
                              )}
                              {!hasVideo && (
                                <button
                                  type="button"
                                  onClick={openVideoEditor}
                                  className="inline-flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 hover:underline mt-2 font-medium"
                                >
                                  <Youtube className="h-3.5 w-3.5" /> Asignar vídeo de YouTube
                                </button>
                              )}
                            </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setAddDayDialog({
                    open: true,
                    weekId: week.id,
                    nextNum: week.days.length > 0 ? Math.max(...week.days.map(d => d.day_number)) + 1 : 1,
                  })}
                >
                  <Plus className="h-3 w-3 mr-1" /> Añadir día
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Add Day Dialog */}
      <Dialog open={addDayDialog.open} onOpenChange={open => !open && setAddDayDialog({ open: false, weekId: '', nextNum: 1 })}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Añadir día</DialogTitle>
            <DialogDescription>Día {addDayDialog.nextNum}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input value={dayForm.name} onChange={e => setDayForm(p => ({ ...p, name: e.target.value }))} placeholder={`Día ${addDayDialog.nextNum}`} />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={dayForm.is_rest_day}
                onChange={e => setDayForm(p => ({ ...p, is_rest_day: e.target.checked }))}
                className="rounded"
                id="rest-day-check"
              />
              <Label htmlFor="rest-day-check">Es día de descanso</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDayDialog({ open: false, weekId: '', nextNum: 1 })}>Cancelar</Button>
            <Button
              disabled={addDayMutation.isPending}
              onClick={() => addDayMutation.mutate({
                weekId: addDayDialog.weekId,
                dayNumber: addDayDialog.nextNum,
                name: dayForm.name,
                isRest: dayForm.is_rest_day,
              })}
            >
              {addDayMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              Añadir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Exercise Dialog */}
      <Dialog open={addExDialog.open} onOpenChange={open => !open && setAddExDialog({ open: false, dayId: '' })}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Añadir ejercicio al día</DialogTitle>
            <DialogDescription>Selecciona un ejercicio y configura series, repeticiones y descanso</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Ejercicio *</Label>
              <Popover open={exPickerOpen} onOpenChange={setExPickerOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={exPickerOpen} className="w-full justify-between font-normal">
                    {exForm.exercise_id
                      ? (allExercises || []).find(e => e.id === exForm.exercise_id)?.name || 'Ejercicio'
                      : 'Buscar ejercicio...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Buscar por nombre o músculo..." />
                    <CommandList>
                      <CommandEmpty>No se encontraron ejercicios.</CommandEmpty>
                      <CommandGroup>
                        {(allExercises || []).map(ex => (
                          <CommandItem
                            key={ex.id}
                            value={`${ex.name} ${ex.muscle_groups?.join(' ') || ''}`}
                            onSelect={() => {
                              setExForm(p => ({ ...p, exercise_id: ex.id }));
                              setExPickerOpen(false);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", exForm.exercise_id === ex.id ? "opacity-100" : "opacity-0")} />
                            <div>
                              <span className="font-medium">{ex.name}</span>
                              {ex.muscle_groups?.length ? (
                                <span className="text-xs text-muted-foreground ml-2">({ex.muscle_groups.join(', ')})</span>
                              ) : null}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Series</Label>
                <Input type="number" min={1} value={exForm.sets} onChange={e => setExForm(p => ({ ...p, sets: parseInt(e.target.value) || 1 }))} />
              </div>
              <div className="space-y-2">
                <Label>Repeticiones</Label>
                <Input value={exForm.reps} onChange={e => setExForm(p => ({ ...p, reps: e.target.value }))} placeholder="10" />
              </div>
              <div className="space-y-2">
                <Label>Descanso (seg)</Label>
                <Input type="number" min={0} value={exForm.rest_seconds} onChange={e => setExForm(p => ({ ...p, rest_seconds: parseInt(e.target.value) || 0 }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notas</Label>
              <Textarea value={exForm.notes} onChange={e => setExForm(p => ({ ...p, notes: e.target.value }))} rows={2} placeholder="Ej: Mantener core activado" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Youtube className="h-3.5 w-3.5 text-red-600" />
                Vídeo de YouTube (opcional)
              </Label>
              <Input
                value={exForm.custom_youtube_video_id}
                onChange={e => setExForm(p => ({ ...p, custom_youtube_video_id: e.target.value }))}
                placeholder="URL de YouTube o ID (ej: dQw4w9WgXcQ)"
                maxLength={200}
              />
              {exForm.custom_youtube_video_id && !parseYouTubeId(exForm.custom_youtube_video_id) && (
                <p className="text-xs text-destructive">URL o ID de YouTube no válido</p>
              )}
              {(() => {
                const baseId = (allExercises || []).find(e => e.id === exForm.exercise_id)?.youtube_video_id;
                return !exForm.custom_youtube_video_id && baseId ? (
                  <p className="text-xs text-muted-foreground">Por defecto se usará el vídeo del ejercicio.</p>
                ) : null;
              })()}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddExDialog({ open: false, dayId: '' })}>Cancelar</Button>
            <Button
              disabled={
                !exForm.exercise_id ||
                addExMutation.isPending ||
                (!!exForm.custom_youtube_video_id && !parseYouTubeId(exForm.custom_youtube_video_id))
              }
              onClick={() => {
                const day = (weeks || []).flatMap(w => w.days).find(d => d.id === addExDialog.dayId);
                const order = day ? day.exercises.length : 0;
                addExMutation.mutate({
                  dayId: addExDialog.dayId,
                  exercise_id: exForm.exercise_id,
                  sets: exForm.sets,
                  reps: exForm.reps,
                  rest_seconds: exForm.rest_seconds,
                  notes: exForm.notes,
                  custom_youtube_video_id: exForm.custom_youtube_video_id ? parseYouTubeId(exForm.custom_youtube_video_id) : null,
                  order,
                });
              }}
            >
              {addExMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              Añadir ejercicio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit YouTube video dialog */}
      <Dialog
        open={videoEditDialog.open}
        onOpenChange={open => !open && setVideoEditDialog({ open: false, exId: '', current: '', exerciseName: '', baseVideoId: null })}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Youtube className="h-4 w-4 text-red-600" />
              Vídeo de YouTube
            </DialogTitle>
            <DialogDescription>{videoEditDialog.exerciseName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label>URL o ID de YouTube</Label>
              <Input
                value={videoEditDialog.current}
                onChange={e => setVideoEditDialog(p => ({ ...p, current: e.target.value }))}
                placeholder="https://youtu.be/... o ID de 11 caracteres"
                maxLength={200}
                autoFocus
              />
              {videoEditDialog.current && !parseYouTubeId(videoEditDialog.current) && (
                <p className="text-xs text-destructive">URL o ID no válido</p>
              )}
              {!videoEditDialog.current && videoEditDialog.baseVideoId && (
                <p className="text-xs text-muted-foreground">
                  Vacío usará el vídeo por defecto del ejercicio.
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            {videoEditDialog.current && (
              <Button
                variant="ghost"
                className="text-destructive mr-auto"
                onClick={() => updateVideoMutation.mutate({ exId: videoEditDialog.exId, videoId: null })}
                disabled={updateVideoMutation.isPending}
              >
                Quitar
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setVideoEditDialog({ open: false, exId: '', current: '', exerciseName: '', baseVideoId: null })}
            >
              Cancelar
            </Button>
            <Button
              disabled={
                updateVideoMutation.isPending ||
                (!!videoEditDialog.current && !parseYouTubeId(videoEditDialog.current))
              }
              onClick={() => updateVideoMutation.mutate({
                exId: videoEditDialog.exId,
                videoId: videoEditDialog.current ? parseYouTubeId(videoEditDialog.current) : null,
              })}
            >
              {updateVideoMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgramTemplateEditor;
