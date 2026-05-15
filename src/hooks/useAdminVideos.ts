import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AdminVideo {
  video_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  duration: string | null;
  published_at: string | null;
  view_count: number;
  like_count: number;
  comment_count: number;
  tags: string[];
  source: 'channel' | 'exercise_library';
  notes: string | null;
  last_synced_at: string;
  updated_at: string;
}

export interface VideoUsage {
  video_id: string;
  page_path: string;
  section: string;
  source: 'auto-scan' | 'manual';
  updated_at: string;
}

export function useAdminVideos(source: 'channel' | 'exercise_library') {
  return useQuery({
    queryKey: ['admin-videos', source],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('youtube_videos' as any)
        .select('*')
        .eq('source', source)
        .order('view_count', { ascending: false })
        .limit(2000);
      if (error) throw error;
      return (data ?? []) as unknown as AdminVideo[];
    },
  });
}

export function useVideoUsage() {
  return useQuery({
    queryKey: ['video-page-usage'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('video_page_usage' as any)
        .select('*')
        .limit(5000);
      if (error) throw error;
      return (data ?? []) as unknown as VideoUsage[];
    },
  });
}
