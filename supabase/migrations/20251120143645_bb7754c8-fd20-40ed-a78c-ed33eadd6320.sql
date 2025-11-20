-- Create enum for blog post status
CREATE TYPE public.blog_status AS ENUM ('draft', 'published', 'scheduled');

-- Create blog_categories table
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  status public.blog_status NOT NULL DEFAULT 'draft',
  publish_date TIMESTAMP WITH TIME ZONE,
  views INTEGER NOT NULL DEFAULT 0,
  read_time INTEGER, -- in minutes
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_categories
CREATE POLICY "Anyone can view categories"
  ON public.blog_categories
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage categories"
  ON public.blog_categories
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published posts"
  ON public.blog_posts
  FOR SELECT
  USING (status = 'published' AND publish_date <= now());

CREATE POLICY "Authenticated users can view all posts"
  ON public.blog_posts
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert posts"
  ON public.blog_posts
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update posts"
  ON public.blog_posts
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete posts"
  ON public.blog_posts
  FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category_id);
CREATE INDEX idx_blog_posts_publish_date ON public.blog_posts(publish_date);
CREATE INDEX idx_blog_categories_slug ON public.blog_categories(slug);

-- Trigger for updated_at on blog_posts
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_seo_pages_updated_at();

-- Trigger for updated_at on blog_categories
CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON public.blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_seo_pages_updated_at();

-- Insert default categories
INSERT INTO public.blog_categories (name, slug, description, color) VALUES
  ('Guías', 'guias', 'Guías completas y tutoriales paso a paso', '#3b82f6'),
  ('Entrenamiento', 'entrenamiento', 'Rutinas y consejos de entrenamiento', '#10b981'),
  ('Nutrición', 'nutricion', 'Alimentación y suplementación', '#f59e0b'),
  ('Skills', 'skills', 'Progresiones y técnicas avanzadas', '#8b5cf6'),
  ('Motivación', 'motivacion', 'Historias y consejos motivacionales', '#ec4899');