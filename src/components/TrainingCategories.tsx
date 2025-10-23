import { Card, CardContent } from "@/components/ui/card";
import FilterChip from "./FilterChip";
import brazosIcon from "@/assets/calisthenia-brazos.webp";
import espaldaIcon from "@/assets/calisthenia-espalda.webp";
import abdomenIcon from "@/assets/calisthenia-abdomen.webp";
import piernasIcon from "@/assets/calisthenia-piernas.webp";
import pechoIcon from "@/assets/calisthenia-pecho.webp";
import fullBodyIcon from "@/assets/calisthenia-full-body.webp";

const categories = [
  {
    icon: brazosIcon,
    title: "BÍCEPS",
    description: "Desarrolla unos bíceps impresionantes con dominadas y sus variaciones",
    color: "from-orange-500 to-red-500",
    nivel: "Intermedio",
    lugar: "Parque"
  },
  {
    icon: espaldaIcon,
    title: "ESPALDA", 
    description: "Fortalece toda tu espalda con ejercicios específicos de tracción",
    color: "from-blue-500 to-purple-500",
    nivel: "Intermedio",
    lugar: "Parque"
  },
  {
    icon: abdomenIcon,
    title: "ABDOMEN",
    description: "Consigue un core de acero con rutinas de abdominales avanzados",
    color: "from-green-500 to-teal-500",
    nivel: "Principiante",
    lugar: "Casa"
  },
  {
    icon: piernasIcon,
    title: "PIERNAS",
    description: "Construye unas piernas poderosas sin necesidad de pesas",
    color: "from-yellow-500 to-orange-500",
    nivel: "Principiante",
    lugar: "Casa"
  },
  {
    icon: pechoIcon,
    title: "PECHO",
    description: "Desarrolla un pecho fuerte con flexiones y sus progresiones",
    color: "from-red-500 to-pink-500",
    nivel: "Intermedio",
    lugar: "Casa"
  },
  {
    icon: fullBodyIcon,
    title: "FULL BODY",
    description: "Rutinas completas para trabajar todo tu cuerpo de forma integral",
    color: "from-purple-500 to-blue-500",
    nivel: "Avanzado",
    lugar: "Parque"
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
            return (
              <Card 
                key={index}
                className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 bg-gradient-card border-0 overflow-hidden cursor-pointer"
              >
                <CardContent className="p-8 text-center relative">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-card group-hover:scale-110 transition-transform duration-300 p-3`}>
                    <img 
                      src={category.icon} 
                      alt={`Icono ${category.title}`}
                      className="w-full h-full object-contain brightness-0 invert"
                    />
                  </div>
                  
                  <div className="flex justify-center gap-2 mb-4">
                    <FilterChip label={category.nivel} variant="nivel" />
                    <FilterChip label={category.lugar} variant="lugar" />
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
