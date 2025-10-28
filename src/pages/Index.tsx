import Header from "@/components/Header";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import TrainingCategories from "@/components/TrainingCategories";
import TrainLocation from "@/components/TrainLocation";
import TrainingLevels from "@/components/TrainingLevels";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToAction from "@/components/CallToAction";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <CommunityStickyBanner />
      <HeroSection />
      <BenefitsSection />
      <TrainingCategories />
      <TrainLocation />
      <TrainingLevels />
      <AboutSection />
      <TestimonialsSection />
      <CallToAction />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
