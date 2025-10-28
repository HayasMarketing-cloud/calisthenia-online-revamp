import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-calisthenics.jpg";

const HeroSectionImproved = () => {
  const scrollToRutinas = () => {
    const element = document.getElementById('rutinas');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Imagen de fondo: calistenia impactante */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/60" />
      
      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-3xl space-y-8">
          <Badge className="bg-primary/20 text-primary border-primary backdrop-blur-sm text-base px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300 cursor-default">
            ✨ +500 estudiantes transformados
          </Badge>
          
          <h1 className="font-display font-bold text-5xl lg:text-7xl text-white leading-tight">
            TRANSFORMA TU CUERPO
            <br/>
            <span className="text-primary">SIN EQUIPOS</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl">
            Descubre el poder de la calistenia. Entrena donde quieras, cuando quieras.
            Solo necesitas tu cuerpo y la metodología correcta.
          </p>
          
          {/* CTAs claros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="text-lg px-8">
              <Link to="/programas">
                Entrenar con Guía Profesional
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToRutinas}
              className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              Ver Rutinas Gratis
              <ChevronDown className="ml-2" />
            </Button>
          </div>
          
          {/* Stats sin foto de Nico */}
          <div className="flex flex-wrap gap-8 pt-8">
            <div className="backdrop-blur-sm bg-white/10 px-6 py-3 rounded-lg">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-gray-300">Alumnos</p>
            </div>
            <div className="backdrop-blur-sm bg-white/10 px-6 py-3 rounded-lg">
              <p className="text-3xl font-bold text-primary">10+</p>
              <p className="text-sm text-gray-300">Años Experiencia</p>
            </div>
            <div className="backdrop-blur-sm bg-white/10 px-6 py-3 rounded-lg">
              <p className="text-3xl font-bold text-primary">4.9⭐</p>
              <p className="text-sm text-gray-300">Valoración</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionImproved;
