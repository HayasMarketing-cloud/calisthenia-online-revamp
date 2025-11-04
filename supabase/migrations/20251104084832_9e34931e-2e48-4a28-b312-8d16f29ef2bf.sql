-- Crear tabla para redirecciones SEO
CREATE TABLE public.seo_redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path text UNIQUE NOT NULL,
  to_path text NOT NULL,
  code integer DEFAULT 301 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- RLS para seo_redirects
ALTER TABLE public.seo_redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view redirects"
ON public.seo_redirects FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can manage redirects"
ON public.seo_redirects FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Trigger para updated_at en redirects
CREATE TRIGGER update_seo_redirects_updated_at
  BEFORE UPDATE ON public.seo_redirects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_seo_pages_updated_at();

-- Crear tabla para robots.txt
CREATE TABLE public.seo_robots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- RLS para seo_robots
ALTER TABLE public.seo_robots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active robots"
ON public.seo_robots FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "Authenticated users can manage robots"
ON public.seo_robots FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Trigger para updated_at en robots
CREATE TRIGGER update_seo_robots_updated_at
  BEFORE UPDATE ON public.seo_robots
  FOR EACH ROW
  EXECUTE FUNCTION public.update_seo_pages_updated_at();

-- Insertar contenido inicial de robots.txt
INSERT INTO public.seo_robots (content, is_active)
VALUES (
'User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /',
true
);

-- Insertar las 40 redirecciones desde seoConfig.ts
INSERT INTO public.seo_redirects (from_path, to_path, code)
VALUES
  ('/core-y-abdomen-de-acero-sin-material-en-10/', '/blog', 301),
  ('/la-rutina-perfecta-de-empuje-en-casa/', '/rutina-pecho-calistenia/', 301),
  ('/rutina-de-fuerza-en-parque-para-empezar-a-entrenar/', '/blog', 301),
  ('/tuck-planche-tutorial-cero-to-full-planche/', '/calistenia-nivel-avanzado/', 301),
  ('/la-mejor-rutina-para-empezar-en-calistenia-rutina-fullbody-para-principiantes/', '/calistenia-principiantes/', 301),
  ('/rutinas-con-kettlebells/', '/programas/', 301),
  ('/guia-consigue-5-dominadas-estrictas-desde-cero/', '/', 301),
  ('/rutinas-con-bandas-elasticas-para-calistenia/', '/programas/', 301),
  ('/rutina-de-resistencia-calistenia/', '/programas/', 301),
  ('/como-empezar-a-entrenar-calistenia-en-casa/', '/calistenia-principiantes/', 301),
  ('/3-pasos-para-iniciarte-en-calistenia/', '/calistenia-principiantes/', 301),
  ('/category/hombros/', '/rutinas-de-hombro-calistenia/', 301),
  ('/category/espalda/', '/rutina-espalda-calistenia/', 301),
  ('/category/estiramientos/', '/', 301),
  ('/category/calistenia-nivel-intermedio/', '/calistenia-nivel-avanzado/', 301),
  ('/category/calistenia/', '/', 301),
  ('/calistenia/', '/blog/que-es-la-calistenia/', 301),
  ('/rutina-calistenia-en-casa-de-30-minutos/', '/rutina-calistenia-en-casa/', 301),
  ('/entrenar-calistenia-en-el-parque/', '/calistenia-en-parque/', 301),
  ('/presentacion/', '/quien-soy/', 301),
  ('/rutina-fullbody-en-casa-de-calistenia/', '/rutina-full-body/', 301),
  ('/como-empiezo-en-calistenia-sin-material/', '/', 301),
  ('/como-organizar-rutinas-calistenia-semanales/', '/', 301),
  ('/corrige-el-valgo-de-rodilla/', '/programas/', 301),
  ('/el-metodo-mas-rapido-de-definicion-el-hiit-y-su-evidencia-cientifica/', '/programas/', 301),
  ('/la-guia-del-entrenamiento-de-fuerza-en-casa-ejercicios-de-calistenia-para-3-meses/', '/programas/', 301),
  ('/las-4-mejores-rutinas-de-calistenia-para-mejorar-en-1-semana/', '/programas/', 301),
  ('/se-pueden-hacer-dominadas-en-casa/', '/rutina-calistenia-en-casa/', 301),
  ('/pros-contras-gym-vs-calistenia/', '/programas/', 301),
  ('/mejora-tu-postura-con-estos-3-pasos-ep2/', '/programas/', 301),
  ('/rutina-para-principiantes-y-no-tanto-calisteniapp-mi-nueva-colaboracion-nico-reyero/', '/calistenia-principiantes/', 301),
  ('/ejercicios-para-empezar-en-calistenia-💪⚡️/', '/calistenia-principiantes/', 301),
  ('/hiperlordosis-y-3-ejercicios-que-puedes-hacer-para-corregirla/', '/programas/', 301),
  ('/rutina-de-fuerza-enfocada-en-hombros-handstand/', '/rutinas-de-hombro-calistenia/', 301),
  ('/3-ejercicios-para-fortalecer-el-cuello/', '/programas/', 301),
  ('/tipos-dominadas-objetivo/', '/', 301),
  ('/mejores-rutinas-calistenia-para-mejorar/', '/programas/', 301),
  ('/empiezo-rutina-de-flexibilidad-diaria/', '/programas/', 301),
  ('/rutina-de-pino-facil-para-dominarlo/', '/rutinas-de-hombro-calistenia/', 301);
