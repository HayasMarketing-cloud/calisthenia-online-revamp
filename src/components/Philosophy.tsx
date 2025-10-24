import { Globe, Zap, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const Philosophy = () => {
  const pillars = [
    {
      icon: Globe,
      title: "Democratizar el Acceso",
      description: "Hacer que el entrenamiento de calidad profesional sea accesible para todos, sin importar ubicación o recursos"
    },
    {
      icon: Zap,
      title: "Transformación Integral",
      description: "No solo transformamos cuerpos, transformamos mentalidades y estilos de vida completos"
    },
    {
      icon: Users,
      title: "Comunidad de Apoyo",
      description: "Crear un espacio donde cada persona se sienta apoyada, motivada y parte de algo más grande"
    },
    {
      icon: TrendingUp,
      title: "Progresión Sostenible",
      description: "Enfoque en mejora continua, adaptando cada programa a tu nivel y ritmo de evolución"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {pillars.map((pillar, index) => {
        const Icon = pillar.icon;
        return (
          <Card 
            key={index}
            className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3 text-foreground">
              {pillar.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {pillar.description}
            </p>
          </Card>
        );
      })}
    </div>
  );
};

export default Philosophy;
