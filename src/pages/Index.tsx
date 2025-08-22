import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrainingCategories from "@/components/TrainingCategories";
import AboutSection from "@/components/AboutSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <TrainingCategories />
      <AboutSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
