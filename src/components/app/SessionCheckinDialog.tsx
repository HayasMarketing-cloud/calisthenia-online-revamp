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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export type SessionFeeling = 'great' | 'good' | 'hard' | 'too_hard' | 'painful';

export interface CheckinPayload {
  difficulty: number;
  energy: number;
  comment: string;
  session_feeling: SessionFeeling;
  pain_level: number | null;
  pain_location: string | null;
  duration_minutes_real: number | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CheckinPayload) => Promise<void>;
}

const ratingEmojis = ['😩', '😓', '😐', '💪', '🔥'];
const energyEmojis = ['🪫', '😴', '😐', '⚡', '🚀'];

const feelingOptions: { value: SessionFeeling; emoji: string; label: string }[] = [
  { value: 'great', emoji: '🤩', label: 'Genial' },
  { value: 'good', emoji: '🙂', label: 'Bien' },
  { value: 'hard', emoji: '😮‍💨', label: 'Costoso' },
  { value: 'too_hard', emoji: '😵', label: 'Demasiado' },
  { value: 'painful', emoji: '🤕', label: 'Doloroso' },
];

const SessionCheckinDialog = ({ open, onClose, onSubmit }: Props) => {
  const [feeling, setFeeling] = useState<SessionFeeling>('good');
  const [difficulty, setDifficulty] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [comment, setComment] = useState('');
  const [painLevel, setPainLevel] = useState<number | ''>('');
  const [painLocation, setPainLocation] = useState('');
  const [duration, setDuration] = useState<number | ''>('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit({
        difficulty,
        energy,
        comment,
        session_feeling: feeling,
        pain_level: painLevel === '' ? null : Number(painLevel),
        pain_location: painLocation.trim() || null,
        duration_minutes_real: duration === '' ? null : Number(duration),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>¿Cómo fue la sesión? 💬</DialogTitle>
          <DialogDescription>Tu feedback ayuda a Nico a ajustar tu programa.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Session feeling — primary */}
          <div>
            <p className="text-sm font-medium mb-2">Sensación general</p>
            <div className="grid grid-cols-5 gap-1">
              {feelingOptions.map((opt) => (
                <button
                  key={opt.value}
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

          {/* Difficulty */}
          <div>
            <p className="text-sm font-medium mb-2">Dificultad</p>
            <div className="flex gap-2 justify-between">
              {ratingEmojis.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => setDifficulty(i + 1)}
                  className={`text-2xl p-2 rounded-lg transition-all ${
                    difficulty === i + 1
                      ? 'bg-primary/20 scale-110 ring-2 ring-primary'
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Energy */}
          <div>
            <p className="text-sm font-medium mb-2">Nivel de energía</p>
            <div className="flex gap-2 justify-between">
              {energyEmojis.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => setEnergy(i + 1)}
                  className={`text-2xl p-2 rounded-lg transition-all ${
                    energy === i + 1
                      ? 'bg-primary/20 scale-110 ring-2 ring-primary'
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <Label htmlFor="duration" className="text-sm font-medium">
              Duración real (min)
            </Label>
            <Input
              id="duration"
              type="number"
              min={0}
              max={300}
              value={duration}
              onChange={(e) => setDuration(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="60"
              className="mt-1"
            />
          </div>

          {/* Pain (optional) */}
          <div className="space-y-2 border-t border-border pt-4">
            <Label htmlFor="pain" className="text-sm font-medium">
              ¿Algo de dolor? (opcional, 0-10)
            </Label>
            <Input
              id="pain"
              type="number"
              min={0}
              max={10}
              value={painLevel}
              onChange={(e) => setPainLevel(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0 = nada"
            />
            {painLevel !== '' && Number(painLevel) > 0 && (
              <Input
                placeholder="Zona (hombro, lumbar...)"
                value={painLocation}
                onChange={(e) => setPainLocation(e.target.value)}
              />
            )}
          </div>

          {/* Comment */}
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
