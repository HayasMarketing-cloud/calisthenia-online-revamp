import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-calistenia-parque.webp";
const HeroSectionImproved = () => {
  const scrollToRutinas = () => {
    const element = document.getElementById('rutinas');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-[700px] lg:min-h-screen flex items-center overflow-hidden">
      {/* Imagen de fondo: calistenia impactante */}
      <img
        src={heroImage}
        alt="Atleta entrenando calistenia en un parque al aire libre"
        width={1600}
        height={872}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlays escalonados para mejor contraste y jerarquía */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/30 md:via-secondary/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 py-20 md:py-28">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 md:mb-8 bg-primary/10 border border-primary/30 rounded-full backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-primary uppercase">
              Entrenamiento Pro
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 md:mb-8 tracking-tight">
            Calistenia para <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">transformar</span> tu cuerpo y tu vida
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mb-10 md:mb-12">
            Entrena donde quieras, con rutinas adaptadas a tu nivel y objetivos. Encuentra tu ritmo, mejora tu salud y bienestar solo con tu cuerpo.
          </p>

          {/* CTAs claros */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button size="lg" asChild className="text-lg px-8 py-6 rounded-xl font-bold shadow-xl">
              <Link to="/programas/">
                Entrenar con Guía Profesional
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToRutinas} className="text-lg px-8 py-6 rounded-xl font-bold bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10">
              Encuentra tu rutina
              <ChevronDown className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSectionImproved;