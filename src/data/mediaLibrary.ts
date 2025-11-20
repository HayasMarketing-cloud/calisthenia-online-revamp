export type MediaCategory = 
  | 'buttons'
  | 'headers'
  | 'icons'
  | 'hero-images'
  | 'routine-images'
  | 'components'
  | 'video';

export interface MediaItem {
  id: string;
  name: string;
  category: MediaCategory;
  type: 'image' | 'component' | 'icon';
  path?: string;
  component?: string;
  description?: string;
  tags?: string[];
  dimensions?: string;
  format?: string;
}

export const mediaLibrary: MediaItem[] = [
  // CTA Buttons Components
  {
    id: 'cta-dual',
    name: 'Dual CTA',
    category: 'buttons',
    type: 'component',
    component: 'DualCTA',
    description: 'Sección con dos CTAs principales',
    tags: ['cta', 'action', 'conversion']
  },
  {
    id: 'cta-main',
    name: 'Call to Action Principal',
    category: 'buttons',
    type: 'component',
    component: 'CallToAction',
    description: 'CTA hero con gradiente y beneficios',
    tags: ['cta', 'hero', 'conversion']
  },
  {
    id: 'cta-community',
    name: 'Community CTA',
    category: 'buttons',
    type: 'component',
    component: 'CommunityCTA',
    description: 'CTA para unirse a la comunidad',
    tags: ['cta', 'community', 'social']
  },
  {
    id: 'cta-banner',
    name: 'Sticky Banner CTA',
    category: 'buttons',
    type: 'component',
    component: 'CommunityStickyBanner',
    description: 'Banner pegajoso con CTA de comunidad',
    tags: ['cta', 'banner', 'sticky']
  },

  // Headers & Banners
  {
    id: 'header-main',
    name: 'Header Principal',
    category: 'headers',
    type: 'component',
    component: 'Header',
    description: 'Navegación principal del sitio',
    tags: ['navigation', 'menu', 'header']
  },
  {
    id: 'hero-section',
    name: 'Hero Section',
    category: 'headers',
    type: 'component',
    component: 'HeroSection',
    description: 'Hero principal con estadísticas',
    tags: ['hero', 'landing', 'featured']
  },
  {
    id: 'hero-improved',
    name: 'Hero Section Mejorado',
    category: 'headers',
    type: 'component',
    component: 'HeroSectionImproved',
    description: 'Hero con mejor diseño y CTAs',
    tags: ['hero', 'landing', 'improved']
  },
  {
    id: 'personal-hero',
    name: 'Personal Hero',
    category: 'headers',
    type: 'component',
    component: 'PersonalHero',
    description: 'Hero para página personal/about',
    tags: ['hero', 'personal', 'about']
  },
  {
    id: 'video-hero',
    name: 'Video Hero Banner',
    category: 'headers',
    type: 'component',
    component: 'VideoHeroBanner',
    description: 'Banner hero con video destacado',
    tags: ['hero', 'video', 'banner']
  },
  {
    id: 'quick-jump',
    name: 'Quick Jump Banner',
    category: 'headers',
    type: 'component',
    component: 'QuickJumpBanner',
    description: 'Banner de navegación rápida',
    tags: ['navigation', 'quick', 'banner']
  },

  // Hero & Background Images
  {
    id: 'hero-calisthenics',
    name: 'Hero Calisthenics',
    category: 'hero-images',
    type: 'image',
    path: '/src/assets/hero-calisthenics.jpg',
    format: 'JPG',
    tags: ['hero', 'background', 'calisthenics']
  },
  {
    id: 'hero-wellness',
    name: 'Hero Wellness',
    category: 'hero-images',
    type: 'image',
    path: '/src/assets/hero-wellness-calisthenics.jpg',
    format: 'JPG',
    tags: ['hero', 'wellness', 'background']
  },
  {
    id: 'entrena-casa',
    name: 'Entrena en Casa',
    category: 'hero-images',
    type: 'image',
    path: '/src/assets/entrena-casa.jpg',
    format: 'JPG',
    tags: ['training', 'home', 'lifestyle']
  },
  {
    id: 'entrena-parque',
    name: 'Entrena en el Parque',
    category: 'hero-images',
    type: 'image',
    path: '/src/assets/entrena-parque.jpg',
    format: 'JPG',
    tags: ['training', 'outdoor', 'park']
  },
  {
    id: 'nicolas-reyero',
    name: 'Nicolás Reyero',
    category: 'hero-images',
    type: 'image',
    path: '/src/assets/nicolas-reyero.jpg',
    format: 'JPG',
    tags: ['coach', 'personal', 'profile']
  },
  {
    id: 'nicolas-about',
    name: 'Nicolás About',
    category: 'hero-images',
    type: 'image',
    path: '/src/assets/nicolas-about.jpg',
    format: 'JPG',
    tags: ['coach', 'about', 'personal']
  },

  // Routine Images
  {
    id: 'routine-abdomen',
    name: 'Rutina Abdomen',
    category: 'routine-images',
    type: 'image',
    path: '/src/assets/calisthenia-abdomen.webp',
    format: 'WEBP',
    tags: ['routine', 'abdomen', 'core']
  },
  {
    id: 'routine-brazos',
    name: 'Rutina Brazos',
    category: 'routine-images',
    type: 'image',
    path: '/src/assets/calisthenia-brazos.webp',
    format: 'WEBP',
    tags: ['routine', 'arms', 'biceps']
  },
  {
    id: 'routine-core',
    name: 'Rutina Core',
    category: 'routine-images',
    type: 'image',
    path: '/src/assets/calisthenia-core.webp',
    format: 'WEBP',
    tags: ['routine', 'core', 'abs']
  },
  {
    id: 'routine-espalda',
    name: 'Rutina Espalda',
    category: 'routine-images',
    type: 'image',
    path: '/src/assets/calisthenia-espalda.webp',
    format: 'WEBP',
    tags: ['routine', 'back', 'pull']
  },
  {
    id: 'routine-fullbody',
    name: 'Rutina Full Body',
    category: 'routine-images',
    type: 'image',
    path: '/src/assets/calisthenia-full-body.webp',
    format: 'WEBP',
    tags: ['routine', 'fullbody', 'complete']
  },
  {
    id: 'routine-hombro',
    name: 'Rutina Hombro',
    category: 'routine-images',
    type: 'image',
    path: '/src/assets/calisthenia-hombro.webp',
    format: 'WEBP',
    tags: ['routine', 'shoulders', 'deltoids']
  },
  {
    id: 'routine-pecho',
    name: 'Rutina Pecho',
    category: 'routine-images',
    type: 'image',
    path: '/src/assets/calisthenia-pecho.webp',
    format: 'WEBP',
    tags: ['routine', 'chest', 'push']
  },
  {
    id: 'routine-piernas',
    name: 'Rutina Piernas',
    category: 'routine-images',
    type: 'image',
    path: '/src/assets/calisthenia-piernas.webp',
    format: 'WEBP',
    tags: ['routine', 'legs', 'lower']
  },

  // Icons - Transparent
  {
    id: 'icon-abdomen-trans',
    name: 'Icono Abdomen Transparente',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-transparente-abdomen-final.png',
    format: 'PNG',
    tags: ['icon', 'abdomen', 'transparent']
  },
  {
    id: 'icon-brazos-trans',
    name: 'Icono Brazos Transparente',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-transparente-brazos-v2.png',
    format: 'PNG',
    tags: ['icon', 'arms', 'transparent']
  },
  {
    id: 'icon-espalda-trans',
    name: 'Icono Espalda Transparente',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-transparente-espalda.png',
    format: 'PNG',
    tags: ['icon', 'back', 'transparent']
  },
  {
    id: 'icon-fullbody-trans',
    name: 'Icono Full Body Transparente',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-transparente-fullbody.png',
    format: 'PNG',
    tags: ['icon', 'fullbody', 'transparent']
  },
  {
    id: 'icon-pecho-trans',
    name: 'Icono Pecho Transparente',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-transparente-pecho.png',
    format: 'PNG',
    tags: ['icon', 'chest', 'transparent']
  },
  {
    id: 'icon-piernas-trans',
    name: 'Icono Piernas Transparente',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-transparente-piernas.png',
    format: 'PNG',
    tags: ['icon', 'legs', 'transparent']
  },

  // Icons - Anatomic
  {
    id: 'icon-abdomen-anat',
    name: 'Icono Abdomen Anatómico',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-anatomico-abdomen.png',
    format: 'PNG',
    tags: ['icon', 'abdomen', 'anatomic']
  },
  {
    id: 'icon-brazos-anat',
    name: 'Icono Brazos Anatómico',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-anatomico-brazos.png',
    format: 'PNG',
    tags: ['icon', 'arms', 'anatomic']
  },
  {
    id: 'icon-espalda-anat',
    name: 'Icono Espalda Anatómico',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-anatomico-espalda.png',
    format: 'PNG',
    tags: ['icon', 'back', 'anatomic']
  },
  {
    id: 'icon-fullbody-anat',
    name: 'Icono Full Body Anatómico',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-anatomico-fullbody.png',
    format: 'PNG',
    tags: ['icon', 'fullbody', 'anatomic']
  },
  {
    id: 'icon-pecho-anat',
    name: 'Icono Pecho Anatómico',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-anatomico-pecho.png',
    format: 'PNG',
    tags: ['icon', 'chest', 'anatomic']
  },
  {
    id: 'icon-piernas-anat',
    name: 'Icono Piernas Anatómico',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-anatomico-piernas.png',
    format: 'PNG',
    tags: ['icon', 'legs', 'anatomic']
  },

  // Icons - Zone
  {
    id: 'icon-abdomen-zone',
    name: 'Icono Zona Abdomen',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-zona-abdomen.png',
    format: 'PNG',
    tags: ['icon', 'abdomen', 'zone']
  },
  {
    id: 'icon-brazos-zone',
    name: 'Icono Zona Brazos',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-zona-brazos.png',
    format: 'PNG',
    tags: ['icon', 'arms', 'zone']
  },
  {
    id: 'icon-espalda-zone',
    name: 'Icono Zona Espalda',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-zona-espalda.png',
    format: 'PNG',
    tags: ['icon', 'back', 'zone']
  },
  {
    id: 'icon-fullbody-zone',
    name: 'Icono Zona Full Body',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-zona-fullbody.png',
    format: 'PNG',
    tags: ['icon', 'fullbody', 'zone']
  },
  {
    id: 'icon-pecho-zone',
    name: 'Icono Zona Pecho',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-zona-pecho.png',
    format: 'PNG',
    tags: ['icon', 'chest', 'zone']
  },
  {
    id: 'icon-piernas-zone',
    name: 'Icono Zona Piernas',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/icon-zona-piernas.png',
    format: 'PNG',
    tags: ['icon', 'legs', 'zone']
  },

  // Branding
  {
    id: 'logo-footer',
    name: 'Logo Footer',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/logo-footer.webp',
    format: 'WEBP',
    tags: ['logo', 'branding', 'footer']
  },
  {
    id: 'feswc-logo',
    name: 'FESWC Logo',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/feswc-logo.jpg',
    format: 'JPG',
    tags: ['certification', 'logo', 'feswc']
  },
  {
    id: 'feswc-seal',
    name: 'FESWC Certification Seal',
    category: 'icons',
    type: 'icon',
    path: '/src/assets/feswc-certification-seal.png',
    format: 'PNG',
    tags: ['certification', 'seal', 'feswc']
  },

  // Section Components
  {
    id: 'about-section',
    name: 'About Section',
    category: 'components',
    type: 'component',
    component: 'AboutSection',
    description: 'Sección Sobre Mí',
    tags: ['about', 'section', 'info']
  },
  {
    id: 'benefits-section',
    name: 'Benefits Section',
    category: 'components',
    type: 'component',
    component: 'BenefitsSection',
    description: 'Sección de beneficios',
    tags: ['benefits', 'features', 'section']
  },
  {
    id: 'certifications',
    name: 'Certifications',
    category: 'components',
    type: 'component',
    component: 'Certifications',
    description: 'Sección de certificaciones',
    tags: ['certifications', 'credentials', 'trust']
  },
  {
    id: 'coach-intro',
    name: 'Coach Intro',
    category: 'components',
    type: 'component',
    component: 'CoachIntro',
    description: 'Introducción del coach',
    tags: ['coach', 'intro', 'about']
  },
  {
    id: 'faq-section',
    name: 'FAQ Section',
    category: 'components',
    type: 'component',
    component: 'FAQSection',
    description: 'Sección de preguntas frecuentes',
    tags: ['faq', 'questions', 'help']
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    category: 'components',
    type: 'component',
    component: 'Philosophy',
    description: 'Sección de filosofía de entrenamiento',
    tags: ['philosophy', 'values', 'approach']
  },
  {
    id: 'testimonials',
    name: 'Testimonials Section',
    category: 'components',
    type: 'component',
    component: 'TestimonialsSection',
    description: 'Sección de testimonios',
    tags: ['testimonials', 'reviews', 'social-proof']
  },
  {
    id: 'timeline',
    name: 'Timeline',
    category: 'components',
    type: 'component',
    component: 'Timeline',
    description: 'Timeline de progreso',
    tags: ['timeline', 'journey', 'progress']
  },
  {
    id: 'train-location',
    name: 'Train Location',
    category: 'components',
    type: 'component',
    component: 'TrainLocation',
    description: 'Selector de ubicación de entrenamiento',
    tags: ['location', 'training', 'selector']
  },
  {
    id: 'training-categories',
    name: 'Training Categories',
    category: 'components',
    type: 'component',
    component: 'TrainingCategories',
    description: 'Categorías de entrenamiento',
    tags: ['categories', 'training', 'navigation']
  },
  {
    id: 'training-levels',
    name: 'Training Levels',
    category: 'components',
    type: 'component',
    component: 'TrainingLevels',
    description: 'Niveles de entrenamiento',
    tags: ['levels', 'difficulty', 'progression']
  },
  {
    id: 'quick-path',
    name: 'Quick Path Selector',
    category: 'components',
    type: 'component',
    component: 'QuickPathSelector',
    description: 'Selector rápido de camino',
    tags: ['selector', 'quick', 'navigation']
  },
  {
    id: 'routine-finder',
    name: 'Unified Routine Finder',
    category: 'components',
    type: 'component',
    component: 'UnifiedRoutineFinder',
    description: 'Buscador unificado de rutinas',
    tags: ['finder', 'search', 'routines']
  },

  // Video Components
  {
    id: 'video-card',
    name: 'Video Card',
    category: 'video',
    type: 'component',
    component: 'VideoCard',
    description: 'Tarjeta de video individual',
    tags: ['video', 'card', 'youtube']
  },
  {
    id: 'video-embed',
    name: 'Video Embed',
    category: 'video',
    type: 'component',
    component: 'VideoEmbed',
    description: 'Embed de video de YouTube',
    tags: ['video', 'embed', 'youtube']
  },
  {
    id: 'video-gallery',
    name: 'Video Gallery',
    category: 'video',
    type: 'component',
    component: 'VideoGallery',
    description: 'Galería de videos',
    tags: ['video', 'gallery', 'collection']
  },
  {
    id: 'video-modal',
    name: 'Video Modal',
    category: 'video',
    type: 'component',
    component: 'VideoModal',
    description: 'Modal de reproducción de video',
    tags: ['video', 'modal', 'player']
  },
  {
    id: 'latest-videos',
    name: 'Latest Videos Carousel',
    category: 'video',
    type: 'component',
    component: 'LatestVideosCarousel',
    description: 'Carrusel de últimos videos',
    tags: ['video', 'carousel', 'latest']
  },
  {
    id: 'youtube-stats',
    name: 'YouTube Stats Widget',
    category: 'video',
    type: 'component',
    component: 'YouTubeStatsWidget',
    description: 'Widget de estadísticas de YouTube',
    tags: ['video', 'stats', 'youtube']
  },
];

export const categoryLabels: Record<MediaCategory, string> = {
  buttons: 'Botones CTA',
  headers: 'Headers & Banners',
  icons: 'Iconos',
  'hero-images': 'Imágenes Hero',
  'routine-images': 'Imágenes de Rutinas',
  components: 'Componentes de Sección',
  video: 'Componentes de Video',
};

export const getCategoryItems = (category: MediaCategory) => {
  return mediaLibrary.filter(item => item.category === category);
};

export const searchMedia = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return mediaLibrary.filter(
    item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description?.toLowerCase().includes(lowerQuery) ||
      item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
