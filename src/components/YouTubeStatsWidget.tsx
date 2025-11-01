import { useEffect, useState } from 'react';
import { Users, Video, Eye, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { YouTubeChannelStats } from '@/types/youtube';
import { formatNumber } from '@/lib/youtubeUtils';

const CACHE_KEY = 'youtube_stats_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

interface CachedData {
  data: YouTubeChannelStats;
  timestamp: number;
}

const YouTubeStatsWidget = () => {
  const [stats, setStats] = useState<YouTubeChannelStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(false);

      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const cachedData: CachedData = JSON.parse(cached);
        if (Date.now() - cachedData.timestamp < CACHE_TTL) {
          setStats(cachedData.data);
          setLoading(false);
          return;
        }
      }

      // Fetch from edge function
      const { data, error: fetchError } = await supabase.functions.invoke('youtube-data', {
        body: { action: 'channelStats' }
      });

      if (fetchError) throw fetchError;

      setStats(data);
      
      // Save to cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('Error fetching YouTube stats:', err);
      setError(true);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudieron cargar las estadísticas de YouTube'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-r from-slate-50 to-slate-100">
        <Skeleton className="h-[180px] w-full" />
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Card className="p-6 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            No se pudieron cargar las estadísticas
          </p>
          <Button onClick={fetchStats} variant="outline">
            Reintentar
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-slate-50 to-slate-100">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Left side: Stats */}
        <div className="flex-1 space-y-4 w-full">
          <div className="flex items-center gap-2 text-red-600">
            <Youtube className="w-6 h-6" />
            <h3 className="font-bold text-lg">Sígueme en YouTube</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{formatNumber(stats.subscriberCount)}</p>
                <p className="text-xs text-muted-foreground">Suscriptores</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <Video className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{formatNumber(stats.videoCount)}</p>
                <p className="text-xs text-muted-foreground">Videos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <Eye className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{formatNumber(stats.viewCount)}</p>
                <p className="text-xs text-muted-foreground">Vistas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Thumbnail & CTA */}
        <div className="flex flex-col items-center gap-4">
          {stats.lastVideoThumbnail && (
            <img 
              src={stats.lastVideoThumbnail} 
              alt="Último video"
              className="w-20 h-20 rounded-full object-cover shadow-md"
              loading="lazy"
            />
          )}
          <Button 
            asChild
            className="bg-red-600 hover:bg-red-700 text-white"
            size="lg"
          >
            <a 
              href={stats.channelUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Youtube className="w-4 h-4 mr-2" />
              Suscríbete
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default YouTubeStatsWidget;
