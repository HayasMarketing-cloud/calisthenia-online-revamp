ALTER TABLE public.exercises
  ADD COLUMN IF NOT EXISTS seo_slug text UNIQUE,
  ADD COLUMN IF NOT EXISTS primary_keyword text,
  ADD COLUMN IF NOT EXISTS aliases text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS seo_description text,
  ADD COLUMN IF NOT EXISTS monthly_volume int,
  ADD COLUMN IF NOT EXISTS is_public_seo boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS public_order int;

CREATE INDEX IF NOT EXISTS idx_exercises_public_seo ON public.exercises (is_public_seo) WHERE is_public_seo = true;

CREATE POLICY "Public can view SEO-enabled exercises"
ON public.exercises FOR SELECT
TO anon, authenticated
USING (is_active = true AND is_public_seo = true);