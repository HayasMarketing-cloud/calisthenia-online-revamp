-- Drop existing permissive policies for seo_redirects
DROP POLICY IF EXISTS "Authenticated users can manage redirects" ON public.seo_redirects;

-- Create admin-only policies for seo_redirects
CREATE POLICY "Admins can insert redirects"
ON public.seo_redirects
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update redirects"
ON public.seo_redirects
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete redirects"
ON public.seo_redirects
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop existing permissive policies for seo_robots
DROP POLICY IF EXISTS "Authenticated users can manage robots" ON public.seo_robots;

-- Create admin-only policies for seo_robots
CREATE POLICY "Admins can insert robots"
ON public.seo_robots
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update robots"
ON public.seo_robots
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete robots"
ON public.seo_robots
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Also fix seo_pages table (same issue)
DROP POLICY IF EXISTS "Authenticated users can insert SEO pages" ON public.seo_pages;
DROP POLICY IF EXISTS "Authenticated users can update SEO pages" ON public.seo_pages;
DROP POLICY IF EXISTS "Authenticated users can delete SEO pages" ON public.seo_pages;

-- Create admin-only policies for seo_pages
CREATE POLICY "Admins can insert SEO pages"
ON public.seo_pages
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update SEO pages"
ON public.seo_pages
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete SEO pages"
ON public.seo_pages
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));