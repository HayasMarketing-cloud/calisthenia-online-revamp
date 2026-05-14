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
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import StructuredData from "@/components/seo/StructuredData";
import EventPopup from "@/components/EventPopup";
import { generateOrganizationSchema, generateFAQSchema, ORGANIZATION_DATA } from "@/lib/schemas";

const Index = () => {
  // FAQs para el schema
  const faqs = [
    {
      question: "¿Necesito equipos para empezar?",
      answer: "No, absolutamente ningún equipo es necesario. Todos nuestros programas están diseñados para trabajar únicamente con tu peso corporal. Lo único que necesitas es motivación y un espacio para entrenar."
    },
    {
      question: "¿Cuánto tiempo tardaré en ver resultados?",
      answer: "Los primeros resultados visibles suelen aparecer entre 4-6 semanas de entrenamiento constante. Sin embargo, sentirás mejoras en tu fuerza y energía desde la primera semana."
    },
    {
      question: "¿Es adecuado para principiantes?",
      answer: "¡Por supuesto! Tenemos programas específicos para todos los niveles, desde principiantes absolutos hasta atletas avanzados. Cada rutina incluye progresiones adaptadas a tu nivel actual."
    },
    {
      question: "¿Cómo accedo a las rutinas?",
      answer: "Una vez que te registres, tendrás acceso inmediato a todas las rutinas y programas desde cualquier dispositivo. Puedes entrenar cuando quieras y donde quieras."
    },
    {
      question: "¿Hay soporte personalizado?",
      answer: "Sí, ofrecemos soporte continuo a través de nuestra comunidad y acceso directo para resolver tus dudas sobre técnica, progresión y adaptación de los programas a tus necesidades."
    },
    {
      question: "¿Puedo entrenar si tengo lesiones previas?",
      answer: "Siempre recomendamos consultar con un médico antes de comenzar cualquier programa de ejercicios si tienes lesiones o condiciones médicas. Nuestros programas incluyen modificaciones, pero la seguridad es primero."
    }
  ];

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
