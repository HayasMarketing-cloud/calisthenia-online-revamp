import { Card } from "@/components/ui/card";
import { Award, GraduationCap, Heart, Dumbbell, Users, Activity } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      icon: GraduationCap,
      title: "Entrenamiento Funcional",
      institution: "Instituto Nacional de Fitness",
      year: "2018",
      color: "from-primary/20 to-accent/20"
    },
    {
      icon: Award,
      title: "Calistenia Avanzada",
      institution: "Academia Internacional de Calistenia",
      year: "2019",
      color: "from-accent/20 to-primary/20"
    },
    {
      icon: Activity,
      title: "Biomecánica Deportiva",
      institution: "Universidad del Deporte",
      year: "2020",
      color: "from-primary/20 to-secondary/20"
    },
    {
      icon: Heart,
      title: "Nutrición Deportiva Aplicada",
      institution: "Centro de Nutrición Avanzada",
      year: "2020",
      color: "from-secondary/20 to-primary/20"
    },
    {
      icon: Users,
      title: "Instructor Street Workout",
      institution: "Federación de Street Workout",
      year: "2021",
      color: "from-primary/20 to-accent/20"
    },
    {
      icon: Dumbbell,
      title: "Movilidad y Flexibilidad",
      institution: "Instituto de Movimiento Funcional",
      year: "2023",
      color: "from-accent/20 to-secondary/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {certifications.map((cert, index) => {
        const Icon = cert.icon;
        return (
          <Card 
            key={index}
            className="overflow-hidden hover:border-primary border-2 transition-all duration-300 hover:shadow-elegant group"
          >
            <div className={`aspect-[4/3] bg-gradient-to-br ${cert.color} flex items-center justify-center`}>
              <Icon className="h-20 w-20 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-5 bg-white">
              <h3 className="font-display font-bold text-lg mb-2 text-foreground">
                {cert.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                {cert.institution}
              </p>
              <p className="text-sm font-semibold text-primary">
                {cert.year}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Certifications;
