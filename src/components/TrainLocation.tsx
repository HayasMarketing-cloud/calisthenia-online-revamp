import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import casaImg from "@/assets/entrena-casa.jpg";
import parqueImg from "@/assets/entrena-parque.jpg";

const locations = [
  {
    image: casaImg,
    title: "ENTRENA EN CASA",
    description: "Rutinas completas que puedes hacer en la comodidad de tu hogar. Solo necesitas tu cuerpo y un poco de espacio.",
    features: ["Sin equipo necesario", "Cualquier momento", "Máxima comodidad"],
    link: "/entrenar-en-casa"
  },
  {
    image: parqueImg,
    title: "ENTRENA EN EL PARQUE",
    description: "Aprovecha los parques y espacios al aire libre para entrenar. Barras, paralelas y el entorno perfecto.",
    features: ["Aire libre", "Equipamiento público", "Comunidad activa"],
    link: "/entrenar-en-parque"
  }
];

const TrainLocation = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl mb-6">
            ENTRENA <span className="text-primary">DONDE QUIERAS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige tu entorno ideal y descubre rutinas adaptadas a cada espacio. 
            La calistenia te da la libertad de entrenar en cualquier lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {locations.map((location, index) => (
            <Card 
              key={index}
              className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 bg-gradient-card border-0 overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={location.image} 
                  alt={location.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
              </div>
              
              <CardContent className="p-8 relative">
                <h3 className="font-display font-bold text-2xl mb-4 text-foreground group-hover:text-primary transition-colors">
                  {location.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {location.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {location.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <Link to={location.link}>
                  <Button variant="outline" className="w-full">
                    Ver Rutinas
                  </Button>
                </Link>
                
                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainLocation;
