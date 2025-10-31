import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-wellness-calisthenics.jpg";
const HeroSectionImproved = () => {
  const scrollToRutinas = () => {
    const element = document.getElementById('rutinas');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Imagen de fondo: calistenia impactante */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: `url(${heroImage})`
    }} />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/60" />
      
      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-3xl space-y-8">
          
          
          <h1 className="font-display font-bold text-5xl lg:text-7xl text-white leading-tight">
            Calistenia para transformar tu cuerpo y tu vida
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl">
            Entrena donde quieras, con rutinas adaptadas a tu nivel y objetivos. Encuentra tu ritmo, mejora tu salud y bienestar con solo tu cuerpo
          </p>
          
          {/* CTAs claros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="text-lg px-8">
              <Link to="/programas/">
                Entrenar con Guía Profesional
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToRutinas} className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              Ver Rutinas Gratis
              <ChevronDown className="ml-2" />
            </Button>
          </div>
          
        </div>
      </div>
    </section>;
};
export default HeroSectionImproved;