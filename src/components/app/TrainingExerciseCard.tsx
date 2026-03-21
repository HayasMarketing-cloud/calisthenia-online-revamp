import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Play, ChevronDown, ChevronUp, Clock } from 'lucide-react';
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

  return (
    <Card className={`transition-all duration-300 ${completed ? 'opacity-60 border-primary/30' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={completed}
            onCheckedChange={() => onToggle(item.id)}
            disabled={disabled}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-primary bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <h3 className={`font-semibold text-sm leading-tight ${completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {item.exercise.name}
              </h3>
            </div>

            {/* Muscle groups */}
            {item.exercise.muscle_groups && item.exercise.muscle_groups.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {item.exercise.muscle_groups.map((mg) => (
                  <Badge key={mg} variant="secondary" className="text-[10px] px-1.5 py-0">
                    {mg}
                  </Badge>
                ))}
              </div>
            )}

            {/* Sets / Reps / Rest */}
            <div className="flex flex-wrap gap-2 mb-2">
              {item.sets && (
                <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded">
                  {item.sets} series
                </span>
              )}
              {item.reps && (
                <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded">
                  {item.reps} reps
                </span>
              )}
              {item.rest_seconds && (
                <span className="text-xs bg-secondary/50 px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {item.rest_seconds}s
                </span>
              )}
            </div>

            {/* Notes */}
            {item.notes && (
              <p className="text-xs text-muted-foreground mb-2">{item.notes}</p>
            )}

            {/* Video toggle */}
            {videoId && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7 px-2 gap-1"
                  onClick={() => setShowVideo(!showVideo)}
                >
                  <Play className="h-3 w-3" />
                  {showVideo ? 'Ocultar vídeo' : 'Ver vídeo'}
                  {showVideo ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>
                {showVideo && (
                  <div className="mt-2 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={item.exercise.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingExerciseCard;
