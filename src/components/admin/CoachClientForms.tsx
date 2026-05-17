import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ChevronDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  clientId: string;
}

const adjustmentOptions = [
  { value: 'volume', label: 'Volumen' },
  { value: 'intensity', label: 'Intensidad' },
  { value: 'exercise_swap', label: 'Cambio de ejercicio' },
  { value: 'rest_day', label: 'Día de descanso' },
  { value: 'progression', label: 'Progresión' },
  { value: 'regression', label: 'Regresión' },
  { value: 'mobility', label: 'Movilidad' },
  { value: 'other', label: 'Otro' },
];

const goalOptions = [
  { value: 'pull_ups', label: 'Dominadas' },
  { value: 'push_ups', label: 'Flexiones' },
  { value: 'squats', label: 'Sentadillas' },
  { value: 'weight_loss', label: 'Pérdida de peso' },
  { value: 'mobility', label: 'Movilidad' },
  { value: 'autonomy', label: 'Autonomía' },
  { value: 'oposiciones', label: 'Oposiciones' },
  { value: 'hipertrofia', label: 'Hipertrofia' },
  { value: 'resistencia', label: 'Resistencia' },
  { value: 'custom', label: 'Personalizado' },
];

function FormShell({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="border-dashed">
        <CollapsibleTrigger asChild>
          <button type="button" className="w-full flex items-center justify-between p-3 text-sm font-medium hover:bg-muted/50 transition">
            <span className="flex items-center gap-2"><Plus className="h-4 w-4 text-primary" />{title}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-3">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

// ---------------- WEEKLY REVIEW ----------------
export function WeeklyReviewForm({ clientId }: Props) {
  const qc = useQueryClient();
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const [weekStart, setWeekStart] = useState(monday.toISOString().slice(0, 10));
  const [summary, setSummary] = useState('');
  const [strengths, setStrengths] = useState('');
  const [improvement, setImprovement] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [visible, setVisible] = useState(true);

  const m = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { error } = await supabase.from('weekly_reviews').insert({
        client_id: clientId,
        coach_id: u.user?.id,
        week_start_date: weekStart,
        summary: summary || null,
        strengths: strengths || null,
        improvement_areas: improvement || null,
        next_steps: nextSteps || null,
        client_visible: visible,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Revisión guardada');
      setSummary(''); setStrengths(''); setImprovement(''); setNextSteps('');
      qc.invalidateQueries({ queryKey: ['coach-client-reviews', clientId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <FormShell title="Nueva revisión semanal">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Inicio de semana</Label>
          <Input type="date" value={weekStart} onChange={e => setWeekStart(e.target.value)} className="h-8 text-xs" />
        </div>
        <div className="flex items-end gap-2">
          <Switch checked={visible} onCheckedChange={setVisible} id="visible" />
          <Label htmlFor="visible" className="text-xs">Visible para el alumno</Label>
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Resumen</Label>
        <Textarea value={summary} onChange={e => setSummary(e.target.value)} rows={2} className="text-xs" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Fortalezas</Label>
        <Textarea value={strengths} onChange={e => setStrengths(e.target.value)} rows={2} className="text-xs" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">A mejorar</Label>
        <Textarea value={improvement} onChange={e => setImprovement(e.target.value)} rows={2} className="text-xs" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Próximos pasos</Label>
        <Textarea value={nextSteps} onChange={e => setNextSteps(e.target.value)} rows={2} className="text-xs" />
      </div>
      <Button size="sm" onClick={() => m.mutate()} disabled={m.isPending || !weekStart}>
        {m.isPending && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}Guardar revisión
      </Button>
    </FormShell>
  );
}

// ---------------- ADJUSTMENT ----------------
export function AdjustmentForm({ clientId }: Props) {
  const qc = useQueryClient();
  const [type, setType] = useState<string>('volume');
  const [reason, setReason] = useState('');
  const [oldVal, setOldVal] = useState('');
  const [newVal, setNewVal] = useState('');

  const m = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { error } = await supabase.from('program_adjustments').insert({
        client_id: clientId,
        coach_id: u.user?.id,
        adjustment_type: type as 'volume' | 'intensity' | 'exercise_swap' | 'rest_day' | 'progression' | 'regression' | 'mobility' | 'other',
        reason: reason || null,
        old_value: oldVal || null,
        new_value: newVal || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Ajuste registrado');
      setReason(''); setOldVal(''); setNewVal('');
      qc.invalidateQueries({ queryKey: ['coach-client-adjustments', clientId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <FormShell title="Nuevo ajuste de programa">
      <div className="space-y-1">
        <Label className="text-xs">Tipo</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            {adjustmentOptions.map(o => <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs">Valor anterior</Label>
          <Input value={oldVal} onChange={e => setOldVal(e.target.value)} placeholder="ej. 3x10" className="h-8 text-xs" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Valor nuevo</Label>
          <Input value={newVal} onChange={e => setNewVal(e.target.value)} placeholder="ej. 4x8" className="h-8 text-xs" />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Motivo</Label>
        <Textarea value={reason} onChange={e => setReason(e.target.value)} rows={2} className="text-xs" />
      </div>
      <Button size="sm" onClick={() => m.mutate()} disabled={m.isPending}>
        {m.isPending && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}Registrar ajuste
      </Button>
    </FormShell>
  );
}

// ---------------- GOAL ----------------
export function GoalForm({ clientId }: Props) {
  const qc = useQueryClient();
  const [type, setType] = useState<string>('pull_ups');
  const [label, setLabel] = useState('');
  const [start, setStart] = useState('');
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('');
  const [unit, setUnit] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [notes, setNotes] = useState('');

  const m = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('goal_progress').insert({
        client_id: clientId,
        goal_type: type as 'pull_ups' | 'push_ups' | 'squats' | 'weight_loss' | 'mobility' | 'autonomy' | 'oposiciones' | 'hipertrofia' | 'resistencia' | 'custom',
        custom_label: label || null,
        start_value: start ? Number(start) : null,
        current_value: current ? Number(current) : null,
        target_value: target ? Number(target) : null,
        unit: unit || null,
        target_date: targetDate || null,
        notes: notes || null,
        is_active: true,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Objetivo creado');
      setLabel(''); setStart(''); setCurrent(''); setTarget(''); setUnit(''); setTargetDate(''); setNotes('');
      qc.invalidateQueries({ queryKey: ['coach-client-goals', clientId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <FormShell title="Nuevo objetivo">
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs">Tipo</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {goalOptions.map(o => <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Etiqueta libre</Label>
          <Input value={label} onChange={e => setLabel(e.target.value)} placeholder="opcional" className="h-8 text-xs" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <Label className="text-xs">Inicio</Label>
          <Input type="number" value={start} onChange={e => setStart(e.target.value)} className="h-8 text-xs" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Actual</Label>
          <Input type="number" value={current} onChange={e => setCurrent(e.target.value)} className="h-8 text-xs" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Objetivo</Label>
          <Input type="number" value={target} onChange={e => setTarget(e.target.value)} className="h-8 text-xs" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs">Unidad</Label>
          <Input value={unit} onChange={e => setUnit(e.target.value)} placeholder="reps, kg, min..." className="h-8 text-xs" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Fecha objetivo</Label>
          <Input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="h-8 text-xs" />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Notas</Label>
        <Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="text-xs" />
      </div>
      <Button size="sm" onClick={() => m.mutate()} disabled={m.isPending}>
        {m.isPending && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}Crear objetivo
      </Button>
    </FormShell>
  );
}

// ---------------- TECHNIQUE REVIEW (coach-side, vídeo llega por WhatsApp) ----------------
export function TechniqueReviewForm({ clientId }: Props) {
  const qc = useQueryClient();
  const [exerciseId, setExerciseId] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [coachFeedback, setCoachFeedback] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [score, setScore] = useState('');

  const { data: exercises } = useQuery({
    queryKey: ['exercises-min'],
    queryFn: async () => {
      const { data } = await supabase.from('exercises').select('id, name').eq('is_active', true).order('name').limit(300);
      return data || [];
    },
  });

  const m = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { error } = await supabase.from('technique_reviews').insert({
        client_id: clientId,
        coach_id: u.user?.id,
        exercise_id: exerciseId || null,
        video_url: videoUrl || null,
        client_notes: clientNotes || null,
        coach_feedback: coachFeedback || null,
        recommendations: recommendations || null,
        score: score ? Number(score) : null,
        status: coachFeedback ? 'reviewed' : 'pending',
        reviewed_at: coachFeedback ? new Date().toISOString() : null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Revisión de técnica guardada');
      setExerciseId(''); setVideoUrl(''); setClientNotes(''); setCoachFeedback(''); setRecommendations(''); setScore('');
      qc.invalidateQueries({ queryKey: ['coach-client-technique', clientId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <FormShell title="Nueva revisión de técnica (vídeo desde WhatsApp)">
      <p className="text-[11px] text-muted-foreground">
        El alumno envía el vídeo por WhatsApp. Pega aquí un enlace opcional (Drive, YouTube, etc.) y el feedback.
      </p>
      <div className="space-y-1">
        <Label className="text-xs">Ejercicio</Label>
        <Select value={exerciseId} onValueChange={setExerciseId}>
          <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Selecciona ejercicio" /></SelectTrigger>
          <SelectContent className="max-h-72">
            {exercises?.map(ex => <SelectItem key={ex.id} value={ex.id} className="text-xs">{ex.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Enlace al vídeo (opcional)</Label>
        <Input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://..." className="h-8 text-xs" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Comentario del alumno (lo que dijo por WhatsApp)</Label>
        <Textarea value={clientNotes} onChange={e => setClientNotes(e.target.value)} rows={2} className="text-xs" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Feedback del coach</Label>
        <Textarea value={coachFeedback} onChange={e => setCoachFeedback(e.target.value)} rows={3} className="text-xs" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Recomendaciones / progresiones</Label>
        <Textarea value={recommendations} onChange={e => setRecommendations(e.target.value)} rows={2} className="text-xs" />
      </div>
      <div className="space-y-1 w-24">
        <Label className="text-xs">Puntuación (1-10)</Label>
        <Input type="number" min={1} max={10} value={score} onChange={e => setScore(e.target.value)} className="h-8 text-xs" />
      </div>
      <Button size="sm" onClick={() => m.mutate()} disabled={m.isPending}>
        {m.isPending && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}Guardar revisión
      </Button>
    </FormShell>
  );
}
