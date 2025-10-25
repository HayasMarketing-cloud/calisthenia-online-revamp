import { VideoMetadata } from '@/types/video';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, ThumbsUp } from 'lucide-react';
import { formatDuration, formatViews } from '@/lib/videoUtils';

interface VideoCardProps {
  video: VideoMetadata;
  onClick: () => void;
  showStats?: boolean;
}

const VideoCard = ({ video, onClick, showStats = false }: VideoCardProps) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
  
  // Color del badge según nivel
  const nivelColor = {
    'Principiante': 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
    'Intermedio': 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
    'Avanzado': 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20'
  };

  // Color del badge según zona muscular
  const zonaColor = {
    'Espalda': 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    'Pecho': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    'Brazos': 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20',
    'Piernas': 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
    'Core': 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    'Hombros': 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20',
    'Full Body': 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary dark:text-primary border-primary/20'
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-elegant transition-all duration-300 overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img 
            src={thumbnailUrl}
            alt={video.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Duración overlay */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            ⏱️ {formatDuration(video.durationSeconds)}
          </div>
          
          {/* Stats overlay (opcional) */}
          {showStats && (
            <div className="absolute top-2 left-2 flex gap-2">
              <div className="bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViews(video.vistas)}
              </div>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Título */}
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {video.titulo}
          </h3>
          
          {/* Descripción */}
          <p className="text-xs text-muted-foreground line-clamp-2">
            {video.descripcion}
          </p>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="outline" 
              className={zonaColor[video.zonaMuscular]}
            >
              {video.zonaMuscular}
            </Badge>
            <Badge 
              variant="outline" 
              className={nivelColor[video.nivel]}
            >
              {video.nivel}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {video.material}
            </Badge>
          </div>
          
          {/* Stats adicionales */}
          {showStats && (
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViews(video.vistas)}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                {video.likes}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
