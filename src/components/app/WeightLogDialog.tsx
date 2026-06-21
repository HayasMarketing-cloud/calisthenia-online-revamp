import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface Props {
  open: boolean;
  onClose: () => void;
}

const DEFINITION_KEYWORDS = ['defin', 'medida', 'reducir', 'perder', 'adelgaz', 'cintura', 'cadera'];

function matchesDefinition(text: string | null | undefined) {
  if (!text) return false;
  const t = text.toLowerCase();
  return DEFINITION_KEYWORDS.some((k) => t.includes(k));
}

const WeightLogDialog = ({ open, onClose }: Props) => {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [weight, setWeight] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  // Detecta si el alumno tiene objetivo de definición/medidas
  const { data: showMeasures } = useQuery({
    queryKey: ['client-definition-goal', user?.id],
    enabled: !!user && open,
    queryFn: async () => {
      const { data: cp } = await supabase
        .from('client_profiles')
        .select('short_term_goal, long_term_goal')
        .eq('id', user!.id)
        .maybeSingle();
      if (matchesDefinition(cp?.short_term_goal) || matchesDefinition(cp?.long_term_goal)) return true;

      const { data: goals } = await supabase
        .from('goal_progress')
        .select('goal_type, custom_label')
        .eq('client_id', user!.id)
        .eq('is_active', true);
      return (goals || []).some(
        (g) => g.goal_type === 'weight_loss' || matchesDefinition(g.custom_label)
      );
    },
  });

  useEffect(() => {
    if (!open) {
      setWeight('');
      setWaist('');
      setHip('');
      setNotes('');
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!user) return;
    const weightNum = weight === '' ? null : Number(weight);
    const waistNum = waist === '' ? null : Number(waist);
    const hipNum = hip === '' ? null : Number(hip);
    if (weightNum == null && waistNum == null && hipNum == null) {
      toast({ title: 'Introduce al menos un valor', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from('baseline_metrics').insert({
        client_id: user.id,
        weight_kg: weightNum,
        waist_cm: waistNum,
        hip_cm: hipNum,
        notes: notes.trim() || null,
        recorded_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast({ title: '¡Registrado! 💪', description: 'Tu progreso se ha guardado.' });
      qc.invalidateQueries({ queryKey: ['nudges-state'] });
      qc.invalidateQueries({ queryKey: ['client-engagement'] });
      qc.invalidateQueries({ queryKey: ['client-adherence-weekly'] });
      qc.invalidateQueries({ queryKey: ['client-goals-progress'] });
      qc.invalidateQueries({ queryKey: ['baseline-metrics'] });
      onClose();
    } catch (e) {
      toast({ title: 'Error al guardar', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Registrar peso</DialogTitle>
          <DialogDescription>
            {showMeasures
              ? 'Anota tu peso y, si quieres, tus medidas de hoy.'
              : 'Anota tu peso de hoy para seguir tu evolución.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input
              id="weight"
              type="number"
              inputMode="decimal"
              step="0.1"
              min={0}
              max={300}
              placeholder="72.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1"
              autoFocus
            />
          </div>

          {showMeasures && (
            <>
              <div>
                <Label htmlFor="waist">Cintura (cm) — opcional</Label>
                <Input
                  id="waist"
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min={0}
                  max={250}
                  placeholder="78"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="hip">Cadera (cm) — opcional</Label>
                <Input
                  id="hip"
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min={0}
                  max={250}
                  placeholder="96"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  className="mt-1"
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="notes">Notas (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="¿Algo a destacar?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="mt-1"
            />
          </div>

          <Button onClick={handleSubmit} disabled={submitting} className="w-full">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WeightLogDialog;
