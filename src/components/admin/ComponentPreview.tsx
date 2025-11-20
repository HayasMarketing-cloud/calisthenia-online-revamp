import { Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ComponentPreviewProps {
  componentName: string;
}

// Lazy load all components
const componentMap: Record<string, React.LazyExoticComponent<any>> = {
  DualCTA: lazy(() => import('@/components/DualCTA')),
  CallToAction: lazy(() => import('@/components/CallToAction')),
  CommunityCTA: lazy(() => import('@/components/CommunityCTA')),
  CommunityStickyBanner: lazy(() => import('@/components/CommunityStickyBanner')),
  Header: lazy(() => import('@/components/Header')),
  HeroSection: lazy(() => import('@/components/HeroSection')),
  HeroSectionImproved: lazy(() => import('@/components/HeroSectionImproved')),
  PersonalHero: lazy(() => import('@/components/PersonalHero')),
  VideoHeroBanner: lazy(() => import('@/components/VideoHeroBanner')),
  QuickJumpBanner: lazy(() => import('@/components/QuickJumpBanner')),
  AboutSection: lazy(() => import('@/components/AboutSection')),
  BenefitsSection: lazy(() => import('@/components/BenefitsSection')),
  Certifications: lazy(() => import('@/components/Certifications')),
  CoachIntro: lazy(() => import('@/components/CoachIntro')),
  FAQSection: lazy(() => import('@/components/FAQSection')),
  Philosophy: lazy(() => import('@/components/Philosophy')),
  TestimonialsSection: lazy(() => import('@/components/TestimonialsSection')),
  Timeline: lazy(() => import('@/components/Timeline')),
  TrainLocation: lazy(() => import('@/components/TrainLocation')),
  TrainingCategories: lazy(() => import('@/components/TrainingCategories')),
  TrainingLevels: lazy(() => import('@/components/TrainingLevels')),
  QuickPathSelector: lazy(() => import('@/components/QuickPathSelector')),
  UnifiedRoutineFinder: lazy(() => import('@/components/UnifiedRoutineFinder')),
  VideoCard: lazy(() => import('@/components/VideoCard')),
  VideoEmbed: lazy(() => import('@/components/VideoEmbed')),
  VideoGallery: lazy(() => import('@/components/VideoGallery')),
  VideoModal: lazy(() => import('@/components/VideoModal')),
  LatestVideosCarousel: lazy(() => import('@/components/LatestVideosCarousel')),
  YouTubeStatsWidget: lazy(() => import('@/components/YouTubeStatsWidget')),
};

export const ComponentPreview = ({ componentName }: ComponentPreviewProps) => {
  const Component = componentMap[componentName];

  if (!Component) {
    return (
      <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Preview no disponible</p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      }
    >
      <div className="border rounded-lg p-4 bg-background">
        <Component />
      </div>
    </Suspense>
  );
};
