import Header from "@/components/Header";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import HeroSectionImproved from "@/components/HeroSectionImproved";
import QuickPathSelector from "@/components/QuickPathSelector";
import BenefitsSection from "@/components/BenefitsSection";
import UnifiedRoutineFinder from "@/components/UnifiedRoutineFinder";
import CoachIntro from "@/components/CoachIntro";
import TestimonialsSection from "@/components/TestimonialsSection";
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
      <DualCTA />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
