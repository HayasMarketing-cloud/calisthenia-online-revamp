import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Importar imágenes existentes
import brazosImg from "@/assets/calisthenia-brazos.webp";
import espaldaImg from "@/assets/calisthenia-espalda.webp";
import abdomenImg from "@/assets/calisthenia-abdomen.webp";
import coreImg from "@/assets/calisthenia-core.webp";
import piernasImg from "@/assets/calisthenia-piernas.webp";
import pechoImg from "@/assets/calisthenia-pecho.webp";
import hombroImg from "@/assets/calisthenia-hombro.webp";
import fullBodyImg from "@/assets/calisthenia-full-body.webp";
import casaImg from "@/assets/entrena-casa.jpg";
import parqueImg from "@/assets/entrena-parque.jpg";

const muscleCategories = [
  { image: brazosImg, title: "BRAZOS", description: "Bíceps, tríceps y antebrazos", link: "/rutina-brazos-calistenia" },
  { image: espaldaImg, title: "ESPALDA", description: "Dorsales y trapecio", link: "/rutina-espalda-calistenia" },
  { image: abdomenImg, title: "ABDOMEN", description: "Core y abdominales", link: "/rutina-abdominales-calistenia" },
  { image: coreImg, title: "CORE", description: "Estabilidad y fuerza central", link: "/rutina-core-calistenia" },
  { image: piernasImg, title: "PIERNAS", description: "Cuádriceps, glúteos y gemelos", link: "/rutina-piernas-calistenia" },
  { image: pechoImg, title: "PECHO", description: "Pectorales y torso", link: "/rutina-pecho-calistenia" },
  { image: hombroImg, title: "HOMBRO", description: "Deltoides y manguito rotador", link: "/rutina-hombro-calistenia" },
  { image: fullBodyImg, title: "FULL BODY", description: "Entrenamiento completo", link: "/rutina-full-body" }
];

const locations = [
  {
    image: casaImg,
    title: "EN CASA",
    description: "Sin equipos, solo tu cuerpo",
    features: ["Sin necesidad de barras", "Entrena en tu habitación", "Rutinas adaptadas"],
    link: "/rutina-calistenia-en-casa"
  },
  {
    image: parqueImg,
    title: "EN EL PARQUE",
    description: "Barras y aire libre",
    features: ["Aprovecha las barras públicas", "Entrena al aire libre", "Skills avanzados"],
    link: "/calistenia-en-parque"
  }
];

const levels = [
  {
    badge: "Nivel 1",
    emoji: "🌱",
    title: "PRINCIPIANTE",
    description: "Empieza desde cero con ejercicios básicos y progresiones adaptadas",
    features: [
      "Flexiones básicas y variantes",
      "Dominadas asistidas",
      "Ejercicios de core básico",
      "Progresión gradual"
    ],
    link: "/calistenia-principiantes"
  },
  {
    badge: "Nivel 2+",
    emoji: "📈",
    title: "INTERMEDIO/AVANZADO",
    description: "Progresiones hacia movimientos complejos y skills avanzados",
    features: [
      "Dominadas completas y variantes",
      "Flexiones avanzadas",
      "Skills como muscle-up",
      "Entrenamiento periodizado"
    ],
    link: "/calistenia-nivel-avanzado"
  }
];

const UnifiedRoutineFinder = () => {
  return (
    <section id="rutinas" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
            ENCUENTRA TU <span className="text-primary">RUTINA PERFECTA</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestras rutinas organizadas por zona muscular, lugar o nivel de experiencia
          </p>
        </div>

        <Tabs defaultValue="zonas" className="w-full">
          {/* Tab Headers */}
          <TabsList className="grid w-full grid-cols-3 mb-12 max-w-3xl mx-auto h-auto">
            <TabsTrigger value="zonas" className="text-base py-4">
              🎯 Zona Muscular
            </TabsTrigger>
            <TabsTrigger value="lugar" className="text-base py-4">
              📍 Lugar
            </TabsTrigger>
            <TabsTrigger value="nivel" className="text-base py-4">
              📊 Nivel
            </TabsTrigger>
          </TabsList>

          {/* Tab Content: Zonas Musculares */}
          <TabsContent value="zonas">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {muscleCategories.map((category, idx) => (
                <Card key={idx} className="group hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-primary/20 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                    </div>
                    <Link to={category.link}>
                      <Button variant="outline" size="sm" className="w-full">
                        Ver Rutinas
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab Content: Lugar */}
          <TabsContent value="lugar">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {locations.map((location, idx) => (
                <Card key={idx} className="group hover:shadow-elegant transition-all overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={location.image} 
                      alt={location.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-bold text-2xl text-white">{location.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-muted-foreground">{location.description}</p>
                    <ul className="space-y-2">
                      {location.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={location.link}>
                      <Button className="w-full">Ver Rutinas</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab Content: Nivel */}
          <TabsContent value="nivel">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {levels.map((level, idx) => (
                <Card key={idx} className="group hover:shadow-elegant transition-all">
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{level.emoji}</span>
                      <div>
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                          {level.badge}
                        </span>
                        <h3 className="font-bold text-2xl mt-2">{level.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{level.description}</p>
                    <ul className="space-y-2">
                      {level.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={level.link}>
                      <Button className="w-full" size="lg">Ver Rutinas</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UnifiedRoutineFinder;
