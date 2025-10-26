import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import brazosIcon from "@/assets/calisthenia-brazos.webp";
import espaldaIcon from "@/assets/calisthenia-espalda.webp";
import abdomenIcon from "@/assets/calisthenia-abdomen.webp";
import coreIcon from "@/assets/calisthenia-core.webp";
import piernasIcon from "@/assets/calisthenia-piernas.webp";
import pechoIcon from "@/assets/calisthenia-pecho.webp";
import hombroIcon from "@/assets/calisthenia-hombro.webp";
import fullBodyIcon from "@/assets/calisthenia-full-body.webp";

const categories = [
  {
    icon: brazosIcon,
    title: "BRAZOS",
    description: "Desarrolla unos bíceps impresionantes con dominadas y sus variaciones",
    link: "/rutina-brazos-calistenia"
  },
  {
    icon: espaldaIcon,
    title: "ESPALDA", 
    description: "Fortalece toda tu espalda con ejercicios específicos de tracción",
    link: "/rutina-espalda-calistenia"
  },
  {
    icon: abdomenIcon,
    title: "ABDOMEN",
    description: "Consigue un core de acero con rutinas de abdominales avanzados",
    link: "/rutina-abdominales-calistenia"
  },
  {
    icon: coreIcon,
    title: "CORE",
    description: "Fortalece tu zona media con ejercicios de estabilización funcional",
    link: "/rutina-core-calistenia"
  },
  {
    icon: piernasIcon,
    title: "PIERNAS",
    description: "Construye unas piernas poderosas sin necesidad de pesas",
    link: "/rutina-piernas-calistenia"
  },
  {
    icon: pechoIcon,
    title: "PECHO",
    description: "Desarrolla un pecho fuerte con flexiones y sus progresiones",
    link: "/rutina-pecho-calistenia"
  },
  {
    icon: hombroIcon,
    title: "HOMBRO",
    description: "Fortalece tus deltoides y estabiliza el manguito rotador",
    link: "/rutina-hombro-calistenia"
  },
  {
    icon: fullBodyIcon,
    title: "FULL BODY",
    description: "Rutinas completas para trabajar todo tu cuerpo de forma integral",
    link: "/rutina-full-body"
  }
];

const TrainingCategories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl mb-6">
            ENTRENAMIENTO DE CALISTENIA POR
            <span className="text-primary"> ZONAS MUSCULARES</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Programas especializados para cada grupo muscular. 
            Encuentra el entrenamiento perfecto para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            return (
              <Card 
                key={index}
                className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 bg-gradient-card border-0 overflow-hidden"
              >
                <CardContent className="p-8 text-center relative">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={category.icon} 
                      alt={`Icono ${category.title}`}
                      loading="lazy"
                      className="w-18 h-18 object-contain"
                    />
                  </div>
                  
                  <h3 className="font-display font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {category.description}
                  </p>
                  
                  <Link to={category.link}>
                    <Button variant="outline" className="w-full">
                      Ver Rutinas
                    </Button>
                  </Link>
                  
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
