import { useEffect, useState } from 'react';
import { Play, Eye, ThumbsUp, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import { YouTubeVideo } from '@/types/youtube';
import { formatNumber, getRelativeTime } from '@/lib/youtubeUtils';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const CACHE_KEY = 'youtube_latest_video_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

interface CachedData {
  data: YouTubeVideo;
  timestamp: number;
}

const VideoHeroBanner = () => {
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const fetchLatestVideo = async () => {
    try {
      setLoading(true);
      setError(false);

      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const cachedData: CachedData = JSON.parse(cached);
        if (Date.now() - cachedData.timestamp < CACHE_TTL) {
          setVideo(cachedData.data);
          setLoading(false);
          return;
        }
      }

      // Fetch from edge function
      const { data, error: fetchError } = await supabase.functions.invoke('youtube-data', {
        body: { action: 'latestVideo' }
      });

      if (fetchError) throw fetchError;

      setVideo(data);
      
      // Save to cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('Error fetching latest video:', err);
      setError(true);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo cargar el último video'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestVideo();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full min-h-[500px] bg-gray-200">
        <Skeleton className="absolute inset-0" />
      </section>
    );
  }

  if (error || !video) {
    return (
      <section className="relative w-full min-h-[500px] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <h3 className="text-2xl font-bold text-white">
            Visita mi canal de YouTube
          </h3>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <a 
              href="https://youtube.com/@Nicoreyero" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Youtube className="w-4 h-4 mr-2" />
              Ver Canal
            </a>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(video.videoUrl, '_blank')}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{ 
          backgroundImage: `url(${video.thumbnailUrl})`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
      
      {/* Play Icon Overlay on Hover */}
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-red-600 rounded-full p-6 animate-pulse">
            <Play className="w-16 h-16 text-white fill-white" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white space-y-6">
        <div className="flex items-center justify-center gap-2 text-red-500">
          <Youtube className="w-6 h-6" />
          <span className="text-sm font-semibold uppercase tracking-wide">
            Nuevo en YouTube
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          {video.title}
        </h2>

        <p className="text-lg text-gray-300">
          {getRelativeTime(video.publishedAt)}
        </p>

        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            <span>{formatNumber(video.viewCount)} vistas</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5" />
            <span>{formatNumber(video.likeCount)} likes</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <a 
              href={video.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Play className="w-4 h-4 mr-2" />
              Ver en YouTube
            </a>
          </Button>
          
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30"
          >
            <a 
              href="https://youtube.com/@Nicoreyero" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Youtube className="w-4 h-4 mr-2" />
              Explorar Canal
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoHeroBanner;
