import { useState } from 'react';
import { VideoMetadata } from '@/types/video';
import VideoCard from '@/components/VideoCard';
import VideoModal from '@/components/VideoModal';

interface VideoGalleryProps {
  videos: VideoMetadata[];
  title?: string;
  limit?: number;
  showStats?: boolean;
}

const VideoGallery = ({ 
  videos, 
  title = "Videos Recomendados",
  limit,
  showStats = false 
}: VideoGalleryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoMetadata | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const displayVideos = limit ? videos.slice(0, limit) : videos;

  const handleVideoClick = (video: VideoMetadata) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // Delay clearing selected video to allow smooth close animation
    setTimeout(() => setSelectedVideo(null), 300);
  };

  if (displayVideos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {title && (
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {displayVideos.length} video{displayVideos.length !== 1 ? 's' : ''} disponible{displayVideos.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Grid de videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {displayVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => handleVideoClick(video)}
            showStats={showStats}
          />
        ))}
      </div>

      {/* Modal de reproducción */}
      <VideoModal
        video={selectedVideo}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default VideoGallery;
