import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/30 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/20 backdrop-blur-sm rounded-full p-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h2 className="font-display font-bold text-4xl lg:text-6xl text-white leading-tight">
            ¿LISTO PARA
            <br />
            <span className="text-primary">TRANSFORMARTE?</span>
          </h2>
          
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Únete a la comunidad de Calistenia Online y comienza tu viaje hacia la mejor versión de ti mismo. 
            Sin equipos, sin excusas, solo resultados reales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-accent text-lg px-10 py-6 rounded-xl font-semibold shadow-elegant hover:shadow-2xl transition-all duration-300 group"
            >
              Comenzar Mi Transformación
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-300">Más de <span className="text-primary font-semibold">500 estudiantes</span> ya confiaron en nosotros</p>
              <div className="flex justify-center mt-2 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
                <span className="text-gray-300 ml-2 text-sm">(4.9/5)</span>
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
            <div className="text-center">
              <p className="font-bold text-2xl text-primary">💪</p>
              <p className="text-white font-semibold">Sin Equipos</p>
              <p className="text-gray-300 text-sm">Solo tu peso corporal</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-primary">🎯</p>
              <p className="text-white font-semibold">Resultados Garantizados</p>
              <p className="text-gray-300 text-sm">Metodología probada</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-primary">🚀</p>
              <p className="text-white font-semibold">Acceso Inmediato</p>
              <p className="text-gray-300 text-sm">Comienza hoy mismo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;