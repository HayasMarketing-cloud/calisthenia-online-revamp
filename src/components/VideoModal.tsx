import { VideoMetadata } from '@/types/video';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye, ThumbsUp, MessageCircle } from 'lucide-react';
import VideoEmbed from '@/components/VideoEmbed';
import { formatDuration, formatViews } from '@/lib/videoUtils';

interface VideoModalProps {
  video: VideoMetadata | null;
  open: boolean;
  onClose: () => void;
}

const VideoModal = ({ video, open, onClose }: VideoModalProps) => {
  if (!video) return null;

  const youtubeUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl pr-8">{video.titulo}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline">{video.nivel}</Badge>
            <Badge variant="outline">{video.zonaMuscular}</Badge>
            <Badge variant="outline">{video.material}</Badge>
            <Badge variant="outline">⏱️ {formatDuration(video.durationSeconds)}</Badge>
          </DialogDescription>
        </DialogHeader>

        {/* Video Embed */}
        <div className="my-4">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground py-4 border-t border-b">
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            {formatViews(video.vistas)} vistas
          </span>
          <span className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4" />
            {video.likes} likes
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            {video.comentarios} comentarios
          </span>
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <h4 className="font-semibold">Descripción</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-6">
            {video.descripcion}
          </p>
        </div>

        {/* Botón Ver en YouTube */}
        <div className="flex justify-end pt-4">
          <Button asChild variant="outline">
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
              Ver en YouTube
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
