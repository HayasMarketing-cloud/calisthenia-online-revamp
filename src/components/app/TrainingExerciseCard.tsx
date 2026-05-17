import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, Clock, Dumbbell, ExternalLink } from 'lucide-react';
import type { TodayExercise } from '@/hooks/useTodayTraining';

interface Props {
  item: TodayExercise;
  index: number;
  completed: boolean;
  onToggle: (id: string) => void;
  disabled?: boolean;
}

const TrainingExerciseCard = ({ item, index, completed, onToggle, disabled }: Props) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = item.custom_youtube_video_id || item.exercise.youtube_video_id;

  const openVideo = () => {
    if (videoId) setShowVideo(true);
  };

  return (
    <Card className={`transition-all duration-300 border-2 ${completed ? 'opacity-60 border-primary/40 bg-primary/5' : 'border-border hover:border-primary/30 shadow-sm'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={completed}
            onCheckedChange={() => onToggle(item.id)}
            disabled={disabled}
            className="mt-1 h-6 w-6"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 mb-3">
              {/* Thumbnail */}
              <button
                type="button"
                onClick={openVideo}
                className="relative flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden bg-muted group shadow-sm"
                aria-label={videoId ? 'Ver vídeo del ejercicio' : 'Sin vídeo disponible'}
                disabled={!videoId}
              >
                {videoId ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                      alt={`Vista previa de ${item.exercise.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <Play className="h-7 w-7 text-white fill-white" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Dumbbell className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary-foreground bg-primary rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <h3 className={`font-bold text-base sm:text-lg leading-tight ${completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {item.exercise.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Muscle groups */}
            {item.exercise.muscle_groups && item.exercise.muscle_groups.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {item.exercise.muscle_groups.map((mg) => (
                  <Badge key={mg} variant="secondary" className="text-xs px-2 py-0.5">
                    {mg}
                  </Badge>
                ))}
              </div>
            )}

            {/* Sets / Reps / Rest */}
            <div className="flex flex-wrap gap-2 mb-2">
              {item.sets && (
                <span className="text-sm font-semibold bg-secondary/70 text-secondary-foreground px-2.5 py-1 rounded-md">
                  {item.sets} series
                </span>
              )}
              {item.reps && (
                <span className="text-sm font-semibold bg-secondary/70 text-secondary-foreground px-2.5 py-1 rounded-md">
                  {item.reps} reps
                </span>
              )}
              {item.rest_seconds && (
                <span className="text-sm font-semibold bg-secondary/70 text-secondary-foreground px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {item.rest_seconds}s
                </span>
              )}
            </div>

            {/* Notes */}
            {item.notes && (
              <p className="text-sm text-muted-foreground mb-2">{item.notes}</p>
            )}

            {/* Video button */}
            {videoId && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-8 px-2 gap-1"
                onClick={openVideo}
              >
                <Play className="h-3.5 w-3.5" />
                Ver técnica
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      {/* In-app video modal */}
      {videoId && (
        <Dialog open={showVideo} onOpenChange={setShowVideo}>
          <DialogContent className="max-w-3xl p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg pr-8">
                {item.exercise.name}
              </DialogTitle>
            </DialogHeader>
            <div className="rounded-lg overflow-hidden bg-black" style={{ aspectRatio: '16/9' }}>
              {showVideo && (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={item.exercise.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors self-end"
            >
              Abrir en YouTube <ExternalLink className="h-3 w-3" />
            </a>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default TrainingExerciseCard;
