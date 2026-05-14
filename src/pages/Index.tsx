import { Helmet } from "react-helmet-async";
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
import FAQSection, { faqs } from "@/components/FAQSection";
import Footer from "@/components/Footer";
import StructuredData from "@/components/seo/StructuredData";
import EventPopup from "@/components/EventPopup";
import { generateOrganizationSchema, generateFAQSchema, ORGANIZATION_DATA } from "@/lib/schemas";

const Index = () => {
  const organizationSchema = generateOrganizationSchema(ORGANIZATION_DATA);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Calistenia Online | Nicolás Reyero</title>
        <meta name="description" content="Entrena calistenia con Nicolás Reyero: rutinas, programas y guías para transformar tu cuerpo sin equipos, desde casa o el parque." />
        <link rel="canonical" href="https://calisthenia.online/" />
        <meta property="og:title" content="Calistenia Online | Nicolás Reyero" />
        <meta property="og:description" content="Entrena calistenia con Nicolás Reyero: rutinas, programas y guías para transformar tu cuerpo sin equipos." />
        <meta property="og:url" content="https://calisthenia.online/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <StructuredData data={[organizationSchema, faqSchema]} />
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
