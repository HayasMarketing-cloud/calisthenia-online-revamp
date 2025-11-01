import Header from "@/components/Header";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import HeroSectionImproved from "@/components/HeroSectionImproved";
import QuickPathSelector from "@/components/QuickPathSelector";
import BenefitsSection from "@/components/BenefitsSection";
import UnifiedRoutineFinder from "@/components/UnifiedRoutineFinder";
import CoachIntro from "@/components/CoachIntro";
import TestimonialsSection from "@/components/TestimonialsSection";
import YouTubeStatsWidget from "@/components/YouTubeStatsWidget";
import DualCTA from "@/components/DualCTA";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <CommunityStickyBanner />
      <HeroSectionImproved />
      <QuickPathSelector />
      <BenefitsSection />
      <UnifiedRoutineFinder />
      <CoachIntro />
      <TestimonialsSection />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Únete a la Comunidad en YouTube
          </h2>
          <YouTubeStatsWidget />
        </div>
      </section>
      <DualCTA />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
