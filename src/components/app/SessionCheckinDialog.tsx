import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Loader2 } from 'lucide-react';

export type SessionFeeling = 'great' | 'good' | 'hard' | 'too_hard' | 'painful';

export interface CheckinPayload {
  difficulty: number; // 1..10 (RPE Borg CR10)
  comment: string;
  session_feeling: SessionFeeling;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CheckinPayload) => Promise<void>;
}

const feelingOptions: { value: SessionFeeling; emoji: string; label: string }[] = [
  { value: 'great', emoji: '🤩', label: 'Genial' },
  { value: 'good', emoji: '🙂', label: 'Bien' },
  { value: 'hard', emoji: '😮‍💨', label: 'Costoso' },
  { value: 'too_hard', emoji: '😵', label: 'Demasiado' },
  { value: 'painful', emoji: '🤕', label: 'Doloroso' },
];

const rpeHints: Record<number, string> = {
  1: 'Muy fácil',
  3: 'Suave',
  5: 'Moderado',
  7: 'Duro',
  9: 'Muy duro',
  10: 'Máximo',
};

const SessionCheckinDialog = ({ open, onClose, onSubmit }: Props) => {
  const [feeling, setFeeling] = useState<SessionFeeling>('good');
  const [difficulty, setDifficulty] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit({
        difficulty,
        comment,
        session_feeling: feeling,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const hint = rpeHints[difficulty] || (difficulty < 5 ? 'Suave' : difficulty < 8 ? 'Moderado' : 'Duro');

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>¿Cómo fue la sesión? 💬</DialogTitle>
          <DialogDescription>Tu feedback ayuda a Nico a ajustar tu programa.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Sensación general — 5 caritas */}
          <div>
            <p className="text-sm font-medium mb-2">Sensación general</p>
            <div className="grid grid-cols-5 gap-1">
              {feelingOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFeeling(opt.value)}
                  className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-all ${
                    feeling === opt.value
                      ? 'bg-primary/20 ring-2 ring-primary'
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dificultad — RPE 1..10 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Dificultad (1–10)</p>
              <span className="text-sm font-semibold text-primary">
                {difficulty} · {hint}
              </span>
            </div>
            <Slider
              value={[difficulty]}
              onValueChange={(v) => setDifficulty(v[0])}
              min={1}
              max={10}
              step={1}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>Muy fácil</span>
              <span>Máximo</span>
            </div>
          </div>

          {/* Comentario */}
          <div>
            <p className="text-sm font-medium mb-2">Comentario (opcional)</p>
            <Textarea
              placeholder="¿Cómo te sentiste? ¿Algo que destacar?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>

          <Button onClick={handleSubmit} disabled={submitting} className="w-full">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Enviar check-in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SessionCheckinDialog;
