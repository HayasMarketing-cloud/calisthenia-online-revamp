import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, Plus, Settings2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

type OverrideType =
  | 'skip_day'
  | 'custom_note'
  | 'swap_exercise'
  | 'change_sets_reps'
  | 'add_exercise'
  | 'remove_exercise';

const TYPE_OPTIONS: { value: OverrideType; label: string }[] = [
  { value: 'skip_day', label: 'Saltar día (descanso)' },
  { value: 'custom_note', label: 'Nota personalizada' },
  { value: 'swap_exercise', label: 'Cambiar ejercicio' },
  { value: 'change_sets_reps', label: 'Cambiar series/reps' },
  { value: 'add_exercise', label: 'Añadir ejercicio' },
  { value: 'remove_exercise', label: 'Quitar ejercicio' },
];

interface Props {
  clientId: string;
}

const ProgramDayOverridesTab = ({ clientId }: Props) => {
  const queryClient = useQueryClient();
  const [dayId, setDayId] = useState<string>('');
  const [type, setType] = useState<OverrideType>('custom_note');
  const [note, setNote] = useState('');
  const [exerciseFromId, setExerciseFromId] = useState('');
  const [exerciseToId, setExerciseToId] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [rest, setRest] = useState('');
  const [reason, setReason] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  // Active program of this client
  const { data: program } = useQuery({
    queryKey: ['override-program', clientId],
    queryFn: async () => {
      const { data } = await supabase
        .from('programs')
        .select('id, name')
        .eq('client_id', clientId)
        .eq('status', 'active')
        .maybeSingle();
      return data;
    },
  });

  // Days of that program
  const { data: days } = useQuery({
    queryKey: ['override-days', program?.id],
    enabled: !!program?.id,
    queryFn: async () => {
      const { data: weeks } = await supabase
        .from('program_weeks')
        .select('id, week_number')
        .eq('program_id', program!.id)
        .order('week_number');
      if (!weeks?.length) return [];
      const weekIds = weeks.map(w => w.id);
      const { data: ds } = await supabase
        .from('program_days')
        .select('id, day_number, name, week_id')
        .in('week_id', weekIds)
        .order('day_number');
      return (ds || []).map(d => {
        const w = weeks.find(wk => wk.id === d.week_id);
        return { ...d, week_number: w?.week_number || 0 };
      });
    },
  });

  // Exercises of the selected day (for swap/change/remove)
  const { data: dayExercises } = useQuery({
    queryKey: ['override-day-exercises', dayId],
    enabled: !!dayId,
    queryFn: async () => {
      const { data } = await supabase
        .from('program_day_exercises')
        .select('id, exercise_id, sets, reps, rest_seconds, exercises(id, name)')
        .eq('day_id', dayId)
        .order('order_index');
      return data || [];
    },
  });

  // Catalog for "to_exercise" / "add_exercise"
  const { data: allExercises } = useQuery({
    queryKey: ['override-all-exercises'],
    queryFn: async () => {
      const { data } = await supabase
        .from('exercises')
        .select('id, name')
        .eq('is_active', true)
        .order('name');
      return data || [];
    },
  });

  // Existing overrides for client
  const { data: overrides, refetch } = useQuery({
    queryKey: ['client-overrides', clientId],
    queryFn: async () => {
      const { data } = await supabase
        .from('program_day_overrides')
        .select('*')
        .eq('client_id', clientId)
        .order('applied_at', { ascending: false });
      return data || [];
    },
  });

  const dayLabel = useMemo(() => {
    const map: Record<string, string> = {};
    (days || []).forEach(d => {
      map[d.id] = `Sem. ${d.week_number} · ${d.name || `Día ${d.day_number}`}`;
    });
    return map;
  }, [days]);

  const reset = () => {
    setType('custom_note');
    setNote('');
    setExerciseFromId('');
    setExerciseToId('');
    setSets(''); setReps(''); setRest('');
    setReason('');
    setExpiresAt('');
  };

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!dayId) throw new Error('Selecciona un día');
      let payload: Record<string, any> = {};
      switch (type) {
        case 'skip_day':
          payload = { reason: reason || null };
          break;
        case 'custom_note':
          if (!note.trim()) throw new Error('Escribe la nota');
          payload = { note: note.trim() };
          break;
        case 'swap_exercise':
          if (!exerciseFromId || !exerciseToId) throw new Error('Selecciona ambos ejercicios');
          payload = {
            from_exercise_id: exerciseFromId,
            to_exercise_id: exerciseToId,
            sets: sets ? Number(sets) : null,
            reps: reps || null,
            rest_seconds: rest ? Number(rest) : null,
          };
          break;
        case 'change_sets_reps':
          if (!exerciseFromId) throw new Error('Selecciona un ejercicio');
          payload = {
            exercise_id: exerciseFromId,
            sets: sets ? Number(sets) : null,
            reps: reps || null,
            rest_seconds: rest ? Number(rest) : null,
          };
          break;
        case 'add_exercise':
          if (!exerciseToId) throw new Error('Selecciona el ejercicio a añadir');
          payload = {
            exercise_id: exerciseToId,
            sets: sets ? Number(sets) : 3,
            reps: reps || '10',
            rest_seconds: rest ? Number(rest) : 60,
          };
          break;
        case 'remove_exercise':
          if (!exerciseFromId) throw new Error('Selecciona el ejercicio a quitar');
          payload = { exercise_id: exerciseFromId };
          break;
      }
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from('program_day_overrides').insert({
        client_id: clientId,
        program_day_id: dayId,
        override_type: type,
        payload_jsonb: payload,
        reason: reason || null,
        expires_at: expiresAt || null,
        created_by: user?.id || null,
        is_active: true,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Override aplicado');
      reset();
      queryClient.invalidateQueries({ queryKey: ['client-overrides', clientId] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from('program_day_overrides').update({ is_active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => refetch(),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('program_day_overrides').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Override eliminado');
      refetch();
    },
  });

  if (!program) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-sm text-muted-foreground">
          El alumno no tiene un programa activo. Asígnale uno para poder crear overrides.
        </CardContent>
      </Card>
    );
  }

  const needsExerciseFrom = ['swap_exercise', 'change_sets_reps', 'remove_exercise'].includes(type);
  const needsExerciseTo = ['swap_exercise', 'add_exercise'].includes(type);
  const needsSetsReps = ['swap_exercise', 'change_sets_reps', 'add_exercise'].includes(type);

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Settings2 className="h-4 w-4 text-primary" /> Nuevo override de día
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Día del programa</Label>
              <Select value={dayId} onValueChange={setDayId}>
                <SelectTrigger><SelectValue placeholder="Selecciona día" /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {(days || []).map(d => (
                    <SelectItem key={d.id} value={d.id}>{dayLabel[d.id]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Tipo de override</Label>
              <Select value={type} onValueChange={v => setType(v as OverrideType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {type === 'custom_note' && (
            <div className="space-y-1.5">
              <Label className="text-xs">Nota para el alumno</Label>
              <Textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Ej: hoy haz solo la parte A" />
            </div>
          )}

          {needsExerciseFrom && (
            <div className="space-y-1.5">
              <Label className="text-xs">Ejercicio del día</Label>
              <Select value={exerciseFromId} onValueChange={setExerciseFromId} disabled={!dayId}>
                <SelectTrigger><SelectValue placeholder={dayId ? 'Selecciona ejercicio' : 'Selecciona primero el día'} /></SelectTrigger>
                <SelectContent>
                  {(dayExercises || []).map((ex: any) => (
                    <SelectItem key={ex.id} value={ex.exercise_id}>{ex.exercises?.name || 'Ejercicio'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {needsExerciseTo && (
            <div className="space-y-1.5">
              <Label className="text-xs">{type === 'swap_exercise' ? 'Reemplazar por' : 'Ejercicio a añadir'}</Label>
              <Select value={exerciseToId} onValueChange={setExerciseToId}>
                <SelectTrigger><SelectValue placeholder="Selecciona ejercicio del catálogo" /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {(allExercises || []).map(e => (
                    <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {needsSetsReps && (
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Series</Label>
                <Input type="number" min={1} value={sets} onChange={e => setSets(e.target.value)} placeholder="3" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Reps</Label>
                <Input value={reps} onChange={e => setReps(e.target.value)} placeholder="10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Descanso (s)</Label>
                <Input type="number" min={0} value={rest} onChange={e => setRest(e.target.value)} placeholder="60" />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Motivo (opcional)</Label>
              <Input value={reason} onChange={e => setReason(e.target.value)} placeholder="Ej: lesión hombro" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Caduca (opcional)</Label>
              <Input type="date" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} />
            </div>
          </div>

          <Button size="sm" disabled={createMutation.isPending || !dayId} onClick={() => createMutation.mutate()}>
            {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
            Aplicar override
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Overrides existentes ({overrides?.length || 0})</p>
        {!overrides || overrides.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">Sin overrides aún</p>
        ) : (
          overrides.map(o => (
            <Card key={o.id}>
              <CardContent className="p-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-[10px]">
                      {TYPE_OPTIONS.find(t => t.value === o.override_type)?.label || o.override_type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{dayLabel[o.program_day_id] || 'Día'}</span>
                    {!o.is_active && <Badge variant="outline" className="text-[10px]">Inactivo</Badge>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={o.is_active}
                      onCheckedChange={(v) => toggleMutation.mutate({ id: o.id, is_active: v })}
                    />
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" onClick={() => deleteMutation.mutate(o.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <pre className="text-[10px] text-muted-foreground bg-muted rounded p-2 overflow-x-auto">
                  {JSON.stringify(o.payload_jsonb, null, 0)}
                </pre>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  {o.reason && <span>Motivo: {o.reason}</span>}
                  <span>
                    {format(new Date(o.applied_at), "d MMM yyyy", { locale: es })}
                    {o.expires_at && ` · caduca ${format(new Date(o.expires_at), 'd MMM', { locale: es })}`}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProgramDayOverridesTab;
