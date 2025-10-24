import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const levels = [
  {
    level: "PRINCIPIANTE",
    badge: "Nivel 1",
    description: "Comienza tu viaje en la calistenia desde cero. Ejercicios básicos y progresiones adaptadas para desarrollar fuerza y técnica fundamental.",
    features: [
      "Flexiones básicas y progresiones",
      "Dominadas asistidas",
      "Sentadillas y core básico",
      "Técnica y movilidad"
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    link: "/nivel-principiante"
  },
  {
    level: "INTERMEDIO",
    badge: "Nivel 2",
    description: "Lleva tu entrenamiento al siguiente nivel. Ejercicios más desafiantes y progresiones hacia movimientos avanzados de calistenia.",
    features: [
      "Dominadas y fondos completos",
      "Flexiones avanzadas",
      "L-sit y progresiones de equilibrio",
      "Entrenamiento de fuerza máxima"
    ],
    gradient: "from-orange-500/20 to-red-500/20",
    link: "/nivel-intermedio"
  }
];

const TrainingLevels = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl mb-6">
            ELIGE TU <span className="text-primary">NIVEL</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra el programa perfecto según tu experiencia actual. 
            Progresa de forma segura y efectiva con rutinas diseñadas para tu nivel.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {levels.map((item, index) => (
            <Card 
              key={index}
              className="group hover:shadow-elegant transition-all duration-500 border-0 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${item.gradient}`}>
                <CardContent className="p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Left side: Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full">
                          {item.badge}
                        </span>
                        <h3 className="font-display font-bold text-3xl text-foreground">
                          {item.level}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground text-lg mb-6">
                        {item.description}
                      </p>

                      {/* Features grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span className="text-sm text-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right side: CTA */}
                    <div className="lg:pl-8">
                      <Link to={item.link}>
                        <Button 
                          size="lg" 
                          className="w-full lg:w-auto group-hover:scale-105 transition-transform"
                        >
                          Ver Rutinas
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingLevels;
