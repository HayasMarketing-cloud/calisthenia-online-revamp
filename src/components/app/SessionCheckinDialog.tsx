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
import { Loader2 } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { difficulty: number; energy: number; comment: string }) => Promise<void>;
}

const ratingEmojis = ['😩', '😓', '😐', '💪', '🔥'];
const energyEmojis = ['🪫', '😴', '😐', '⚡', '🚀'];

const SessionCheckinDialog = ({ open, onClose, onSubmit }: Props) => {
  const [difficulty, setDifficulty] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit({ difficulty, energy, comment });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>¿Cómo fue la sesión? 💬</DialogTitle>
          <DialogDescription>Tu feedback ayuda a Nico a ajustar tu programa.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
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
