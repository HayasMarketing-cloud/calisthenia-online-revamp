import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const paths = [
  {
    emoji: "🌱",
    title: "Empiezo desde cero",
    description: "Nunca he entrenado o llevo poco tiempo",
    features: [
      "Rutinas para principiantes",
      "Ejercicios básicos explicados",
      "Sin equipos necesarios"
    ],
    link: "/calistenia-principiantes/",
    buttonText: "Ver Rutinas",
    variant: "outline" as const
  },
  {
    emoji: "📈",
    title: "Quiero progresar",
    description: "Entreno hace tiempo pero me estanqué",
    features: [
      "Rutinas por zonas musculares",
      "Skills y progresiones",
      "Entrenamientos avanzados"
    ],
    link: "/calistenia-nivel-avanzado/",
    buttonText: "Ver Rutinas",
    variant: "outline" as const
  },
  {
    emoji: "🎯",
    title: "Quiero un entrenador",
    description: "Necesito un plan 100% adaptado a mí",
    features: [
      "Programas personalizados",
      "Seguimiento directo con Nico",
      "Corrección de técnica"
    ],
    link: "/programas/",
    buttonText: "Ver Programas",
    variant: "outline" as const
  }
];

const QuickPathSelector = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl lg:text-5xl mb-4">
            ¿Qué estás <span className="text-primary">buscando</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige tu camino según tu nivel y objetivos
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {paths.map((path, idx) => (
            <Card 
              key={idx} 
              className="group hover:shadow-2xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-primary/20"
            >
              <CardContent className="p-8 text-center space-y-6">
                <div className="text-6xl mb-2">{path.emoji}</div>
                <h3 className="font-bold text-2xl">{path.title}</h3>
                <p className="text-muted-foreground">{path.description}</p>
                <ul className="text-sm text-left space-y-2 pb-2">
                  {path.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link to={path.link}>
                    <Button 
                      className="w-full" 
                      variant={path.variant}
                      size="lg"
                    >
                      {path.buttonText}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickPathSelector;
