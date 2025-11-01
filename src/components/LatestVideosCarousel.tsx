import { useEffect, useState } from 'react';
import { Eye, ThumbsUp, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import { YouTubeVideo } from '@/types/youtube';
import { formatNumber, formatDuration, getRelativeTime } from '@/lib/youtubeUtils';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const CACHE_KEY = 'youtube_latest_videos_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

interface CachedData {
  data: YouTubeVideo[];
  timestamp: number;
}

const LatestVideosCarousel = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLatestVideos = async () => {
    try {
      setLoading(true);
      setError(false);

      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const cachedData: CachedData = JSON.parse(cached);
        if (Date.now() - cachedData.timestamp < CACHE_TTL) {
          setVideos(cachedData.data);
          setLoading(false);
          return;
        }
      }

      // Fetch from edge function
      const { data, error: fetchError } = await supabase.functions.invoke('youtube-data', {
        body: { action: 'latestVideos', maxResults: 3 }
      });

      if (fetchError) throw fetchError;

      setVideos(data);
      
      // Save to cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('Error fetching latest videos:', err);
      setError(true);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudieron cargar los últimos videos'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestVideos();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Últimos Videos de YouTube
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Últimos Videos de YouTube
        </h2>
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            No se pudieron cargar los videos
          </p>
          <Button 
            onClick={fetchLatestVideos} 
            variant="outline"
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Últimos Videos de YouTube
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card 
            key={video.id}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] group"
            onMouseEnter={() => setHoveredId(video.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => window.open(video.videoUrl, '_blank')}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Duration Badge */}
              <Badge 
                className="absolute top-2 right-2 bg-black/70 text-white border-none"
              >
                {formatDuration(video.duration)}
              </Badge>

              {/* Play Overlay on Hover */}
              {hoveredId === video.id && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="bg-red-600 rounded-full p-4">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-base line-clamp-2 leading-snug">
                {video.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {getRelativeTime(video.publishedAt)}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{formatNumber(video.viewCount)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{formatNumber(video.likeCount)}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LatestVideosCarousel;
