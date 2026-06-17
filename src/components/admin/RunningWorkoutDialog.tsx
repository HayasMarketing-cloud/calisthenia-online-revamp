import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Loader2, Footprints, ArrowUp, ArrowDown } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  RunningStep, StepType, DurationType, TargetType,
  STEP_LABELS, paceToSeconds, secondsToPace, summarizeStep,
} from '@/lib/runningWorkout';

interface Props {
  open: boolean;
  onClose: () => void;
  programDayId: string;
}

interface StepDraft {
  step_type: StepType;
  repeat_count: number | null;
  duration_type: DurationType;
  duration_value_text: string; // user input, parsed on save
  target_type: TargetType;
  target_low_text: string;
  target_high_text: string;
  notes: string;
}

const emptyStep = (): StepDraft => ({
  step_type: 'work',
  repeat_count: null,
  duration_type: 'time',
  duration_value_text: '',
  target_type: 'none',
  target_low_text: '',
  target_high_text: '',
  notes: '',
});

function parseDurationInput(type: DurationType, text: string): number | null {
  if (type === 'open') return null;
  const trimmed = text.trim();
  if (!trimmed) return null;
  if (type === 'time') {
    // accept "10" (min), "10:30" (min:sec), "30s"
    if (/^\d+s$/i.test(trimmed)) return parseInt(trimmed, 10);
    const mmss = trimmed.match(/^(\d+):(\d{2})$/);
    if (mmss) return parseInt(mmss[1], 10) * 60 + parseInt(mmss[2], 10);
    const min = parseFloat(trimmed);
    if (!isNaN(min)) return Math.round(min * 60);
    return null;
  }
  // distance: accept "400", "400m", "1.5km", "1500"
  const km = trimmed.match(/^([\d.]+)\s*km$/i);
  if (km) return Math.round(parseFloat(km[1]) * 1000);
  const m = trimmed.match(/^([\d.]+)\s*m?$/i);
  if (m) return Math.round(parseFloat(m[1]));
  return null;
}

function parseTargetInput(type: TargetType, low: string, high: string): { low: number | null; high: number | null } {
  if (type === 'none') return { low: null, high: null };
  if (type === 'pace') {
    return { low: paceToSeconds(low), high: paceToSeconds(high) || paceToSeconds(low) };
  }
  const lo = low ? parseInt(low, 10) : NaN;
  const hi = high ? parseInt(high, 10) : NaN;
  return {
    low: isNaN(lo) ? null : lo,
    high: isNaN(hi) ? (isNaN(lo) ? null : lo) : hi,
  };
}

export default function RunningWorkoutDialog({ open, onClose, programDayId }: Props) {
  const qc = useQueryClient();
  const [name, setName] = useState('Sesión de carrera');
  const [notes, setNotes] = useState('');
  const [totalDur, setTotalDur] = useState<string>('');
  const [totalDist, setTotalDist] = useState<string>('');
  const [draft, setDraft] = useState<StepDraft>(emptyStep());

  // Load workout + steps
  const { data, isLoading } = useQuery({
    queryKey: ['running-workout', programDayId],
    queryFn: async () => {
      const { data: w } = await supabase
        .from('running_workouts')
        .select('*')
        .eq('program_day_id', programDayId)
        .maybeSingle();
      let steps: RunningStep[] = [];
      if (w) {
        const { data: s } = await supabase
          .from('running_workout_steps')
          .select('*')
          .eq('workout_id', w.id)
          .order('order_index');
        steps = (s || []) as RunningStep[];
      }
      return { workout: w, steps };
    },
    enabled: open && !!programDayId,
  });

  useEffect(() => {
    if (data?.workout) {
      setName(data.workout.name);
      setNotes(data.workout.notes || '');
      setTotalDur(data.workout.total_duration_min?.toString() || '');
      setTotalDist(data.workout.total_distance_km?.toString() || '');
    } else if (open) {
      setName('Sesión de carrera');
      setNotes('');
      setTotalDur('');
      setTotalDist('');
    }
  }, [data?.workout, open]);

  const saveWorkout = useMutation({
    mutationFn: async () => {
      const payload = {
        program_day_id: programDayId,
        name,
        notes: notes || null,
        total_duration_min: totalDur ? parseInt(totalDur, 10) : null,
        total_distance_km: totalDist ? parseFloat(totalDist) : null,
      };
      if (data?.workout) {
        const { error } = await supabase.from('running_workouts').update(payload).eq('id', data.workout.id);
        if (error) throw error;
        return data.workout.id;
      } else {
        const { data: ins, error } = await supabase.from('running_workouts').insert(payload).select('id').single();
        if (error) throw error;
        return ins.id;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['running-workout', programDayId] });
      toast.success('Sesión guardada');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const addStep = useMutation({
    mutationFn: async () => {
      let workoutId = data?.workout?.id;
      if (!workoutId) {
        workoutId = await saveWorkout.mutateAsync();
      }
      const duration_value = parseDurationInput(draft.duration_type, draft.duration_value_text);
      const target = parseTargetInput(draft.target_type, draft.target_low_text, draft.target_high_text);
      const nextOrder = (data?.steps.length || 0);
      const { error } = await supabase.from('running_workout_steps').insert({
        workout_id: workoutId,
        order_index: nextOrder,
        step_type: draft.step_type,
        repeat_count: draft.repeat_count && draft.repeat_count > 1 ? draft.repeat_count : null,
        duration_type: draft.duration_type,
        duration_value,
        target_type: draft.target_type,
        target_low: target.low,
        target_high: target.high,
        notes: draft.notes || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['running-workout', programDayId] });
      setDraft(emptyStep());
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteStep = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('running_workout_steps').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['running-workout', programDayId] }),
  });

  const moveStep = useMutation({
    mutationFn: async ({ id, dir }: { id: string; dir: -1 | 1 }) => {
      const steps = data?.steps || [];
      const idx = steps.findIndex(s => s.id === id);
      const swapIdx = idx + dir;
      if (idx < 0 || swapIdx < 0 || swapIdx >= steps.length) return;
      const a = steps[idx]; const b = steps[swapIdx];
      await supabase.from('running_workout_steps').update({ order_index: b.order_index }).eq('id', a.id);
      await supabase.from('running_workout_steps').update({ order_index: a.order_index }).eq('id', b.id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['running-workout', programDayId] }),
  });

  const stepCard = (step: RunningStep, i: number) => (
    <Card key={step.id} className="border-l-4 border-l-primary/60">
      <CardContent className="py-3 px-3 flex items-start gap-2">
        <span className="text-xs text-muted-foreground pt-1">{i + 1}.</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-[10px]">{STEP_LABELS[step.step_type]}</Badge>
            <span className="font-semibold text-sm">{summarizeStep(step)}</span>
          </div>
          {step.notes && <p className="text-xs text-muted-foreground mt-1">{step.notes}</p>}
        </div>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => moveStep.mutate({ id: step.id, dir: -1 })}><ArrowUp className="h-3.5 w-3.5" /></Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => moveStep.mutate({ id: step.id, dir: 1 })}><ArrowDown className="h-3.5 w-3.5" /></Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" onClick={() => deleteStep.mutate(step.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Footprints className="h-5 w-5 text-primary" /> Sesión de carrera</DialogTitle>
          <DialogDescription>Define los bloques de la sesión (calentamiento, series, recuperaciones, vuelta a la calma).</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center"><Loader2 className="h-5 w-5 animate-spin mx-auto" /></div>
        ) : (
          <div className="space-y-4">
            {/* Header info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1 sm:col-span-3">
                <Label>Nombre</Label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Duración total (min)</Label>
                <Input type="number" value={totalDur} onChange={e => setTotalDur(e.target.value)} placeholder="ej. 45" />
              </div>
              <div className="space-y-1">
                <Label>Distancia total (km)</Label>
                <Input type="number" step="0.1" value={totalDist} onChange={e => setTotalDist(e.target.value)} placeholder="ej. 8" />
              </div>
              <div className="space-y-1 sm:col-span-1 flex items-end">
                <Button className="w-full" onClick={() => saveWorkout.mutate()} disabled={saveWorkout.isPending}>
                  {saveWorkout.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />}Guardar info
                </Button>
              </div>
            </div>

            {/* Steps list */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Bloques</h3>
              {(data?.steps || []).length === 0 ? (
                <p className="text-xs text-muted-foreground">Aún no hay bloques. Añade el primero abajo.</p>
              ) : (
                <div className="space-y-2">{(data?.steps || []).map(stepCard)}</div>
              )}
            </div>

            {/* New step */}
            <Card className="border-dashed">
              <CardContent className="py-3 px-3 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2"><Plus className="h-4 w-4" /> Añadir bloque</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Tipo</Label>
                    <Select value={draft.step_type} onValueChange={(v: StepType) => setDraft(d => ({ ...d, step_type: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {(['warmup','work','recovery','cooldown'] as StepType[]).map(t => (
                          <SelectItem key={t} value={t}>{STEP_LABELS[t]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Repeticiones</Label>
                    <Input type="number" min={1} placeholder="1" value={draft.repeat_count ?? ''} onChange={e => setDraft(d => ({ ...d, repeat_count: e.target.value ? parseInt(e.target.value, 10) : null }))} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Tipo duración</Label>
                    <Select value={draft.duration_type} onValueChange={(v: DurationType) => setDraft(d => ({ ...d, duration_type: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="time">Tiempo</SelectItem>
                        <SelectItem value="distance">Distancia</SelectItem>
                        <SelectItem value="open">Abierto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Duración</Label>
                    <Input placeholder={draft.duration_type === 'time' ? 'ej. 10 o 10:30' : 'ej. 400 o 1.5km'} disabled={draft.duration_type === 'open'} value={draft.duration_value_text} onChange={e => setDraft(d => ({ ...d, duration_value_text: e.target.value }))} />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Objetivo</Label>
                    <Select value={draft.target_type} onValueChange={(v: TargetType) => setDraft(d => ({ ...d, target_type: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Sin objetivo</SelectItem>
                        <SelectItem value="pace">Ritmo (min:s/km)</SelectItem>
                        <SelectItem value="heart_rate">Frec. cardiaca (ppm)</SelectItem>
                        <SelectItem value="rpe">RPE (1–10)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{draft.target_type === 'pace' ? 'Mín (rápido)' : 'Mín'}</Label>
                    <Input disabled={draft.target_type === 'none'} placeholder={draft.target_type === 'pace' ? '4:00' : '140'} value={draft.target_low_text} onChange={e => setDraft(d => ({ ...d, target_low_text: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{draft.target_type === 'pace' ? 'Máx (lento)' : 'Máx'}</Label>
                    <Input disabled={draft.target_type === 'none'} placeholder={draft.target_type === 'pace' ? '4:15' : '155'} value={draft.target_high_text} onChange={e => setDraft(d => ({ ...d, target_high_text: e.target.value }))} />
                  </div>
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <Label className="text-xs">Notas</Label>
                    <Input placeholder="opcional" value={draft.notes} onChange={e => setDraft(d => ({ ...d, notes: e.target.value }))} />
                  </div>
                </div>
                <Button onClick={() => addStep.mutate()} disabled={addStep.isPending} className="w-full">
                  {addStep.isPending && <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />}<Plus className="h-3.5 w-3.5 mr-1" /> Añadir bloque
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-1">
              <Label>Notas generales</Label>
              <Input value={notes} onChange={e => setNotes(e.target.value)} placeholder="opcional" />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
          <Button onClick={() => saveWorkout.mutate()} disabled={saveWorkout.isPending}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
