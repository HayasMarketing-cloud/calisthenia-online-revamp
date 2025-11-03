-- Create table for SEO pages configuration
CREATE TABLE public.seo_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  h1 TEXT,
  h2_primary TEXT,
  h2_secondary_1 TEXT,
  h2_secondary_2 TEXT,
  canonical TEXT,
  og_image TEXT,
  keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view SEO pages" 
ON public.seo_pages 
FOR SELECT 
USING (true);

-- Create policies for insert (for now, allow all authenticated users)
CREATE POLICY "Authenticated users can insert SEO pages" 
ON public.seo_pages 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create policies for update (for now, allow all authenticated users)
CREATE POLICY "Authenticated users can update SEO pages" 
ON public.seo_pages 
FOR UPDATE 
TO authenticated
USING (true);

-- Create policies for delete (for now, allow all authenticated users)
CREATE POLICY "Authenticated users can delete SEO pages" 
ON public.seo_pages 
FOR DELETE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_seo_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_seo_pages_updated_at
BEFORE UPDATE ON public.seo_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_seo_pages_updated_at();

-- Create index for faster path lookups
CREATE INDEX idx_seo_pages_path ON public.seo_pages(path);