-- youtube_videos: catálogo sincronizado
CREATE TABLE public.youtube_videos (
  video_id text PRIMARY KEY,
  title text NOT NULL DEFAULT '',
  description text,
  thumbnail_url text,
  duration text,
  published_at timestamptz,
  view_count bigint NOT NULL DEFAULT 0,
  like_count bigint NOT NULL DEFAULT 0,
  comment_count bigint NOT NULL DEFAULT 0,
  tags text[] NOT NULL DEFAULT '{}',
  source text NOT NULL DEFAULT 'channel' CHECK (source IN ('channel','exercise_library')),
  notes text,
  last_synced_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_youtube_videos_source ON public.youtube_videos(source);
CREATE INDEX idx_youtube_videos_views ON public.youtube_videos(view_count DESC);

ALTER TABLE public.youtube_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage youtube_videos"
ON public.youtube_videos
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_youtube_videos_updated_at
BEFORE UPDATE ON public.youtube_videos
FOR EACH ROW EXECUTE FUNCTION public.update_seo_pages_updated_at();

-- video_page_usage: dónde se usa cada vídeo
CREATE TABLE public.video_page_usage (
  video_id text NOT NULL,
  page_path text NOT NULL,
  section text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT 'manual' CHECK (source IN ('auto-scan','manual')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (video_id, page_path, section)
);

CREATE INDEX idx_video_page_usage_video ON public.video_page_usage(video_id);
CREATE INDEX idx_video_page_usage_source ON public.video_page_usage(source);

ALTER TABLE public.video_page_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage video_page_usage"
ON public.video_page_usage
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_video_page_usage_updated_at
BEFORE UPDATE ON public.video_page_usage
FOR EACH ROW EXECUTE FUNCTION public.update_seo_pages_updated_at();