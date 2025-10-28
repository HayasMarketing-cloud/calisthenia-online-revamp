import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const DualCTA = () => {
  const scrollToRutinas = () => {
    const element = document.getElementById('rutinas');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-secondary via-secondary/95 to-primary/10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-4xl lg:text-6xl text-white text-center mb-6">
            ¿Listo para <span className="text-primary">empezar</span>?
          </h2>
          
          <p className="text-xl text-gray-300 text-center mb-10 max-w-2xl mx-auto">
            Elige tu camino: entrenamiento personalizado o rutinas gratuitas
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Opción 1: Programas */}
            <Card className="bg-white hover:shadow-2xl transition-all group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-bold text-2xl">Entrena con Nico</h3>
                <p className="text-muted-foreground">
                  Programa 100% personalizado con seguimiento directo
                </p>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Evaluación inicial completa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Rutinas adaptadas a ti</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Soporte directo con Nico</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Corrección de técnica</span>
                  </li>
                </ul>
                <Link to="/programas">
                  <Button className="w-full" size="lg">
                    Ver Programas
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground">
                  Desde 49€/mes
                </p>
              </CardContent>
            </Card>
            
            {/* Opción 2: Rutinas Gratis */}
            <Card className="bg-white/95 hover:shadow-2xl transition-all group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="font-bold text-2xl">Explora Rutinas Gratis</h3>
                <p className="text-muted-foreground">
                  Accede a rutinas gratuitas por zonas musculares
                </p>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Rutinas para todos los niveles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Videos explicativos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Progresiones detalladas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Sin registros ni pagos</span>
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  variant="outline" 
                  size="lg"
                  onClick={scrollToRutinas}
                >
                  Ver Rutinas
                </Button>
                <p className="text-xs text-muted-foreground font-semibold text-primary">
                  100% Gratis
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualCTA;
