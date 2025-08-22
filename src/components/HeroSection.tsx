import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-calisthenics.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white space-y-8">
          <div className="space-y-4">
            <p className="text-primary font-semibold text-lg tracking-wide uppercase">
              Entrenamiento de élite
            </p>
            <h1 className="font-display font-bold text-5xl lg:text-7xl leading-tight">
              ENTRENA
              <br />
              <span className="text-primary">DONDE QUIERAS</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              Descubre el poder de la calistenia con programas diseñados por Nicolás Reyero. 
              Transforma tu cuerpo sin equipos, solo con tu peso corporal.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-accent text-lg px-8 py-4 rounded-xl font-semibold shadow-elegant hover:shadow-xl transition-all duration-300"
            >
              Comenzar Mi Transformación
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/20 bg-white/10 hover:bg-white/20 text-white text-lg px-8 py-4 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Demo
            </Button>
          </div>
          
          <div className="flex items-center space-x-8 pt-4">
            <div className="text-center">
              <p className="font-bold text-3xl text-primary">500+</p>
              <p className="text-sm text-gray-300">Estudiantes</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-3xl text-primary">15+</p>
              <p className="text-sm text-gray-300">Programas</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-3xl text-primary">5⭐</p>
              <p className="text-sm text-gray-300">Valoración</p>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="hidden lg:block relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={heroImage} 
              alt="Calistenia profesional"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent"></div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 bg-primary text-white p-4 rounded-xl shadow-elegant">
            <p className="font-bold text-2xl">100%</p>
            <p className="text-sm">Efectivo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;