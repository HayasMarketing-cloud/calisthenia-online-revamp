import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Target, Users, Trophy, Heart, Zap } from "lucide-react";

const categories = [
  {
    icon: Dumbbell,
    title: "BÍCEPS",
    description: "Desarrolla unos bíceps impresionantes con dominadas y sus variaciones",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Target,
    title: "ESPALDA", 
    description: "Fortalece toda tu espalda con ejercicios específicos de tracción",
    color: "from-blue-500 to-purple-500"
  },
  {
    icon: Users,
    title: "ABDOMEN",
    description: "Consigue un core de acero con rutinas de abdominales avanzados",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Trophy,
    title: "PIERNAS",
    description: "Construye unas piernas poderosas sin necesidad de pesas",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Heart,
    title: "PECHO",
    description: "Desarrolla un pecho fuerte con flexiones y sus progresiones",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "FULL BODY",
    description: "Rutinas completas para trabajar todo tu cuerpo de forma integral",
    color: "from-purple-500 to-blue-500"
  }
];

const TrainingCategories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl mb-6">
            ENTRENAMIENTOS DE 
            <span className="text-primary"> CALISTENIA</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Programas especializados para cada grupo muscular. Desde principiante hasta avanzado, 
            encuentra el entrenamiento perfecto para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 bg-gradient-card border-0 overflow-hidden cursor-pointer"
              >
                <CardContent className="p-8 text-center relative">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-card group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="font-display font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Decorative element */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrainingCategories;