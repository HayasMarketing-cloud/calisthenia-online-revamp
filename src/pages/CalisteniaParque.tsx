import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoGallery from "@/components/VideoGallery";
import VideoWithStructure from "@/components/VideoWithStructure";
import QuickJumpBanner from "@/components/QuickJumpBanner";
import RoutineBreadcrumbs from "@/components/routine/RoutineBreadcrumbs";
import FAQSection from "@/components/FAQSection";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import StructuredData from "@/components/seo/StructuredData";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schemas";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByIds } from "@/lib/videoUtils";
import entrenaParque from "@/assets/entrena-parque.jpg";
import { TreePine, CheckCircle, Home, Dumbbell, Target, Shield, Users, Zap, Sun, DollarSign, TrendingUp, MapPin, Clock, Heart, AlertCircle, Brain } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const CalisteniaParque = () => {
  // Selección curada de los mejores videos para entrenamiento en parques
  // Ordenados por nivel (principiante → avanzado) y engagement
  const videosParque = getVideosByIds(allVideos, [
    'IWqIZk3hF14',  // 1. Rutina fullbody principiantes (36K vistas) - Ideal inicio
    'joOoHh_P5RM',  // 2. Primera dominada - retracción (608 vistas) - Técnica barra
    'pwjUl5FQLCg',  // 3. Empezar calistenia sin material (24K vistas) - Base
    'WupvTaI9Zg0',  // 4. Dominadas sin lesionarte (40K vistas) 🔥 MÁS VIRAL
    'QmNx-kydmn0',  // 5. Fondos correctos (29K vistas) - Paralelas parque
    'nj6C3Mwe_aI',  // 6. Dominadas motivacional (13K vistas) - Técnica
    '7kPvnjZwN9Q',  // 7. Abdominales casa (54K vistas) 🔥 MÁS VISTO - Core
    'bSYhg5i28kg',  // 8. Súper dominada muscle up (295 vistas) - Avanzado
    'j1VaM6CNazM',  // 9. Superar 10 dominadas (422 vistas) - Avanzado
  ]);

  const parqueFAQs = [
    { question: "¿Dónde encuentro parques de calistenia cerca de mí?", answer: "Puedes buscar en Google Maps con términos como 'parque calistenia', 'street workout park' o 'outdoor gym'. También existen apps especializadas como Calisteniapp o comunidades en Instagram donde comparten ubicaciones." },
    { question: "¿Es seguro entrenar en parques públicos?", answer: "Sí, la mayoría de los parques de calistenia son seguros. Si tienes dudas sobre la zona, entrena en horarios con más gente." },
    { question: "¿Qué hago si todas las barras están ocupadas?", answer: "Puedes pedir educadamente compartir el espacio, hacer calentamiento extra mientras esperas, o trabajar ejercicios en el suelo." },
    { question: "¿Puedo entrenar en parques en invierno?", answer: "Sí, con la ropa adecuada y guantes para proteger tus manos del frío. Asegúrate de calentar bien antes de empezar." },
    { question: "¿Necesito ser fuerte para empezar?", answer: "No. Los parques tienen equipamiento para todos los niveles. Puedes empezar con ejercicios asistidos y progresiones simples." },
    { question: "¿Cuánto tiempo tardaré en ver resultados?", answer: "Con entrenamiento constante, verás mejoras en fuerza en 4-6 semanas. Los cambios físicos visibles suelen aparecer en 8-12 semanas." },
    { question: "¿Es mejor entrenar solo o en grupo?", answer: "Ambos tienen ventajas: en grupo, motivación y apoyo social; solo, más concentración y flexibilidad de horarios." },
    { question: "¿Qué hago si llueve o hace mal tiempo?", answer: "Puedes entrenar en casa con rutinas de peso corporal, buscar estructuras cubiertas, o tomar el día como descanso activo." },
  ];

  const faqSchema = generateFAQSchema(parqueFAQs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: "https://calisthenia.online/" },
    { name: "Calistenia en Parque", url: "https://calisthenia.online/calistenia-en-parque/" },
  ]);

  return (
    <>
      <Helmet>
        <title>Calistenia en Parques: Guía Completa | 2025</title>
        <meta 
          name="description" 
          content="Aprende calistenia en parques con barras y paralelas. Videos, ejercicios y rutinas para empezar a entrenar al aire libre desde cero." 
        />
        <meta name="keywords" content="calistenia parques, empezar calistenia, calistenia videos, parques calistenia cerca de mi, ejercicios barra dominadas" />
        <meta property="og:title" content="Calistenia en Parques | Entrena Gratis al Aire Libre" />
        <meta property="og:description" content="Guía completa para empezar en calistenia utilizando parques públicos. Videos, rutinas y técnicas." />
        <meta property="og:url" content="https://calisthenia.online/calistenia-en-parque/" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://calisthenia.online/calistenia-en-parque/" />
      </Helmet>
      <StructuredData data={[faqSchema, breadcrumbSchema]} />

      <div className="min-h-screen flex flex-col">
        <Header />
        <CommunityStickyBanner />
        
        <main className="flex-grow pt-20">
          {/* Breadcrumbs */}
          <div className="container mx-auto px-4 py-6">
            <RoutineBreadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Lugar", href: "/#entrenar" },
                { label: "Calistenia en Parque", href: "/calistenia-en-parque/" }
              ]}
            />
          </div>

          {/* Hero Section */}
          <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${entrenaParque})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
            </div>
            
            <div className="relative z-10 container mx-auto px-4 text-center">
              <TreePine className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
                Calistenia Parques
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Descubre cómo empezar en calistenia usando parques públicos. Entrena gratis con barras, paralelas y equipamiento urbano.
              </p>
            </div>
          </section>

          {/* QuickJumpBanner */}
          <div className="container mx-auto px-4 py-8">
            <QuickJumpBanner
              text="¿Listo para tu primera rutina en el parque?"
              linkText="Ver Video de Entrenamiento"
              href="#video-rutina"
              icon="🌳"
              variant="primary"
            />
          </div>

          {/* Highlights Expandidos */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Por Qué Entrenar en Parques
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="text-center">
                  <Sun className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Aire Libre</h3>
                  <p className="text-muted-foreground">
                    Entrena rodeado de naturaleza, mejorando tu salud mental y física
                  </p>
                </div>
                
                <div className="text-center">
                  <Dumbbell className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Equipamiento Completo</h3>
                  <p className="text-muted-foreground">
                    Barras, paralelas y estructuras para ejercicios avanzados
                  </p>
                </div>
                
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Comunidad</h3>
                  <p className="text-muted-foreground">
                    Conecta con otros atletas y mantente motivado
                  </p>
                </div>

                <div className="text-center">
                  <DollarSign className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Gratis y Accesible</h3>
                  <p className="text-muted-foreground">
                    Sin membresías ni cuotas mensuales, solo tú y las barras
                  </p>
                </div>

                <div className="text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Motivación Extra</h3>
                  <p className="text-muted-foreground">
                    Ver a otros entrenar te impulsa a mejorar constantemente
                  </p>
                </div>

                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Progresión Natural</h3>
                  <p className="text-muted-foreground">
                    El equipamiento te permite avanzar gradualmente sin presión
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ¿Qué es la Calistenia en Parques? */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <Card className="p-8 md:p-12 bg-muted/30 border-none text-center max-w-4xl mx-auto">
                <TreePine className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                  ¿Qué es la Calistenia en Parques?
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    La calistenia en parques es una forma de entrenamiento con peso corporal que utiliza el equipamiento disponible en espacios públicos: barras altas y bajas, paralelas, anillas, y espaleras.
                  </p>
                  <p>
                    A diferencia de los gimnasios tradicionales, los parques ofrecen un ambiente motivador donde personas de todos los niveles entrenan juntas al aire libre, sin cuotas mensuales.
                  </p>
                  <p>
                    Es ideal para principiantes porque el equipamiento es intuitivo y el ambiente comunitario te impulsa a mejorar. Además, puedes encontrar parques de calistenia en casi cualquier ciudad buscando en Google Maps o apps especializadas.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* Beneficios Detallados */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Beneficios de Entrenar en Parques de Calistenia
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <Card className="p-6">
                  <Sun className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">🌤️ Vitamina D Natural</h3>
                  <p className="text-muted-foreground">
                    Entrena bajo el sol y mejora tu salud hormonal, estado de ánimo y sistema inmunológico.
                  </p>
                </Card>

                <Card className="p-6">
                  <DollarSign className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">💰 100% Gratuito</h3>
                  <p className="text-muted-foreground">
                    Sin cuotas mensuales, sin contratos. Solo tú, las barras y tu determinación.
                  </p>
                </Card>

                <Card className="p-6">
                  <Users className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">🤝 Red de Apoyo</h3>
                  <p className="text-muted-foreground">
                    Conoce personas con tus mismos objetivos, comparte consejos y progresa juntos.
                  </p>
                </Card>

                <Card className="p-6">
                  <Target className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">🎯 Equipamiento Versátil</h3>
                  <p className="text-muted-foreground">
                    Barras de diferentes alturas para todos los niveles, desde principiante hasta avanzado.
                  </p>
                </Card>

                <Card className="p-6">
                  <Brain className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">🧠 Salud Mental</h3>
                  <p className="text-muted-foreground">
                    El aire libre y el ejercicio reducen estrés, ansiedad y mejoran tu bienestar general.
                  </p>
                </Card>

                <Card className="p-6">
                  <TrendingUp className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">📈 Progresión Visible</h3>
                  <p className="text-muted-foreground">
                    Ver tu evolución en el mismo lugar cada semana te motiva a seguir mejorando.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Video Principal */}
          <div id="video-rutina" className="relative -top-20"></div>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <VideoWithStructure
                videoId="EqS3CCu0qDY"
                videoTitle="🎬 Rutina Completa de Calistenia en Parque"
                videoDescription="Aprende cómo entrenar en un parque desde cero. Esta rutina utiliza barras y paralelas para trabajar todo el cuerpo."
                
                insights={[
                  "Perfecta para principiantes que empiezan en parques",
                  "Usa solo barras y paralelas del parque",
                  "Progresiones adaptadas a todos los niveles",
                  "Incluye calentamiento específico para barras"
                ]}
                
                nivel="Principiante"
                zonaMuscular="Full Body"
                material="Barra dominadas"
                
                formato={{
                  calentamiento: {
                    ejercicios: 5,
                    intensidad: "Movilidad de hombros y muñecas, activación escapular"
                  },
                  partePrincipal: {
                    series: 4,
                    descripcion: "Dominadas asistidas, fondos en paralelas, Australian pull-ups, knee raises"
                  },
                  tempo: {
                    activo: "8-12 reps",
                    descanso: "90 segundos"
                  }
                }}
                
                estimulos={[
                  "🏋️ Fuerza de tracción (espalda y bíceps)",
                  "💪 Fuerza de empuje (pecho y tríceps)",
                  "🔥 Core y estabilidad",
                  "⚡ Coordinación y control corporal"
                ]}
                
                detalles="Esta rutina está diseñada específicamente para quienes empiezan en parques de calistenia. Combina ejercicios de tirón en barra con ejercicios de empuje en paralelas, trabajando todo el cuerpo de forma equilibrada. Las progresiones permiten adaptarla tanto si es tu primera vez como si ya tienes algo de experiencia."
              />
            </div>
          </section>

          {/* Cómo Empezar en Calistenia */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Cómo Empezar en Calistenia en Parques
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="p-6">
                  <MapPin className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">🗺️ Encuentra tu Parque</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Busca en Google Maps "parque calistenia cerca de mi"</li>
                    <li>• Busca estructuras de metal con barras a diferentes alturas</li>
                    <li>• Verifica que tenga paralelas para fondos</li>
                    <li>• Ideal: que tenga suelo de caucho o césped</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <Dumbbell className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">👟 Qué Llevar Contigo</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Ropa cómoda y transpirable</li>
                    <li>• Zapatillas con buen agarre</li>
                    <li>• Toalla pequeña</li>
                    <li>• Botella de agua</li>
                    <li>• (Opcional) Guantes para proteger las manos al inicio</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <Clock className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">⏰ Mejor Momento para Entrenar</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Mañanas tempranas: parque vacío, aire fresco</li>
                    <li>• Tardes: más gente entrenando (motivación extra)</li>
                    <li>• Evita horas de máximo calor en verano</li>
                    <li>• Los fines de semana suelen estar más concurridos</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <Heart className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">🤝 Etiqueta en el Parque</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Respeta turnos en equipamiento popular</li>
                    <li>• Limpia tu sudor de las barras</li>
                    <li>• Sé amable y pide consejos si ves a alguien experimentado</li>
                    <li>• Comparte el espacio con otros atletas</li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* Ejercicios Esenciales con Accordion */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-4">
                Ejercicios Esenciales para Empezar
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Domina estos movimientos fundamentales para construir una base sólida en calistenia
              </p>
              
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">
                      <div>
                        <h3 className="font-semibold text-lg">Dominadas Asistidas (Assisted Pull-ups)</h3>
                        <p className="text-sm text-muted-foreground">Base fundamental de la calistenia</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <p><strong>Para qué sirve:</strong> Desarrollar fuerza de tracción y construir la base para dominadas completas</p>
                        <p><strong>Músculos trabajados:</strong> Espalda (dorsales), bíceps, core</p>
                        <p><strong>Cómo hacerlo:</strong> Con banda elástica bajo los pies o impulsándote desde el suelo, sube hasta que la barbilla supere la barra</p>
                        <p><strong>Series recomendadas:</strong> 3-4 x 5-8 repeticiones</p>
                        <p><strong>Progresión:</strong> Reducir asistencia gradualmente hasta lograr dominadas sin ayuda</p>
                        <p className="text-amber-600"><strong>⚠️ Error común:</strong> No activar las escápulas al inicio del movimiento</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">
                      <div>
                        <h3 className="font-semibold text-lg">Australian Pull-ups (Remo Invertido)</h3>
                        <p className="text-sm text-muted-foreground">Preparación para dominadas completas</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <p><strong>Para qué sirve:</strong> Preparar la fuerza necesaria para dominadas completas con menor dificultad</p>
                        <p><strong>Músculos trabajados:</strong> Espalda media, bíceps, core</p>
                        <p><strong>Cómo hacerlo:</strong> Barra baja, cuerpo inclinado, pies en el suelo. Tira de tu pecho hacia la barra</p>
                        <p><strong>Series recomendadas:</strong> 3-4 x 10-15 repeticiones</p>
                        <p><strong>Progresión:</strong> Bajar la altura de la barra o elevar los pies para mayor dificultad</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">
                      <div>
                        <h3 className="font-semibold text-lg">Fondos en Paralelas (Dips)</h3>
                        <p className="text-sm text-muted-foreground">Fuerza de empuje para pecho y tríceps</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <p><strong>Para qué sirve:</strong> Desarrollar fuerza de empuje en pecho, tríceps y hombros</p>
                        <p><strong>Músculos trabajados:</strong> Tríceps, pecho, hombros anteriores</p>
                        <p><strong>Cómo hacerlo:</strong> Entre paralelas, baja hasta que los codos formen 90°, sube extendiendo los brazos completamente</p>
                        <p><strong>Series recomendadas:</strong> 3-4 x 6-10 repeticiones</p>
                        <p><strong>Progresión:</strong> Fondos completos → fondos con lastre → fondos a una mano (muy avanzado)</p>
                        <p className="text-amber-600"><strong>⚠️ Error común:</strong> Dejar caer los hombros hacia adelante, mantén el pecho arriba</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left">
                      <div>
                        <h3 className="font-semibold text-lg">Knee Raises (Elevaciones de Rodillas)</h3>
                        <p className="text-sm text-muted-foreground">Core fuerte para skills avanzados</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <p><strong>Para qué sirve:</strong> Desarrollar fuerza de core necesaria para skills avanzados</p>
                        <p><strong>Músculos trabajados:</strong> Abdomen inferior, flexores de cadera</p>
                        <p><strong>Cómo hacerlo:</strong> Colgado de la barra, eleva las rodillas hacia el pecho de forma controlada</p>
                        <p><strong>Series recomendadas:</strong> 3 x 10-15 repeticiones</p>
                        <p><strong>Progresión:</strong> Knee raises → piernas extendidas (leg raises) → toes to bar</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left">
                      <div>
                        <h3 className="font-semibold text-lg">Push-ups en Barra Baja</h3>
                        <p className="text-sm text-muted-foreground">Variación de flexiones con más activación</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <p><strong>Para qué sirve:</strong> Trabajar empuje horizontal con mayor activación que flexiones normales</p>
                        <p><strong>Músculos trabajados:</strong> Pecho, tríceps, core, hombros</p>
                        <p><strong>Cómo hacerlo:</strong> Manos en barra baja, cuerpo recto, desciende hasta que el pecho casi toque la barra</p>
                        <p><strong>Series recomendadas:</strong> 3-4 x 8-12 repeticiones</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-left">
                      <div>
                        <h3 className="font-semibold text-lg">Dead Hang (Cuelgue Pasivo)</h3>
                        <p className="text-sm text-muted-foreground">Fuerza de agarre y movilidad</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <p><strong>Para qué sirve:</strong> Desarrollar fuerza de agarre y movilidad de hombros</p>
                        <p><strong>Músculos trabajados:</strong> Antebrazos, hombros, core</p>
                        <p><strong>Cómo hacerlo:</strong> Simplemente cuélgate de la barra y mantén la posición</p>
                        <p><strong>Tiempo recomendado:</strong> 3-4 x 20-60 segundos</p>
                        <p><strong>Beneficio:</strong> Base esencial para todos los ejercicios de barra, mejora la descompresión espinal</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-left">
                      <div>
                        <h3 className="font-semibold text-lg">Scapular Pull-ups (Retracción Escapular)</h3>
                        <p className="text-sm text-muted-foreground">Activación correcta para dominadas</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <p><strong>Para qué sirve:</strong> Aprender a activar correctamente las escápulas antes de tirar</p>
                        <p><strong>Músculos trabajados:</strong> Trapecio inferior, romboides, serratos</p>
                        <p><strong>Cómo hacerlo:</strong> Colgado de la barra, baja los hombros sin flexionar los codos</p>
                        <p><strong>Series recomendadas:</strong> 3 x 8-12 repeticiones</p>
                        <p><strong>Clave:</strong> El movimiento debe ser solo desde los omóplatos, brazos permanecen extendidos</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-left">
                      <div>
                        <h3 className="font-semibold text-lg">L-Sit Progression en Paralelas</h3>
                        <p className="text-sm text-muted-foreground">Core avanzado y control corporal</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <p><strong>Para qué sirve:</strong> Desarrollar fuerza de core avanzada y control corporal</p>
                        <p><strong>Músculos trabajados:</strong> Core completo, flexores de cadera, hombros</p>
                        <p><strong>Cómo hacerlo:</strong> Entre paralelas, apoya las manos y eleva las piernas frente a ti</p>
                        <p><strong>Progresión:</strong> Rodillas dobladas → una pierna extendida → L-sit completo (ambas piernas extendidas)</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>

          {/* Galería de Videos */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-4">
                Calistenia Videos: Entrenamientos en Parque
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Explora más rutinas y ejercicios para entrenar en parques
              </p>
              <VideoGallery 
                videos={videosParque}
                title=""
                showStats={true}
              />
            </div>
          </section>

          {/* Planifica tu Semana */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Planifica tu Semana en el Parque
              </h2>
              
              <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="text-center mb-4">
                    <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full mb-3">
                      LUNES
                    </div>
                    <h3 className="font-semibold text-xl">Full Body Básico</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Calentamiento: 10 min</li>
                    <li>• Australian pull-ups: 3x10</li>
                    <li>• Fondos asistidos: 3x8</li>
                    <li>• Knee raises: 3x12</li>
                    <li>• Dead hang: 3x30s</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                    ⏱️ Duración: 45-50 min
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="text-center mb-4">
                    <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full mb-3">
                      MIÉRCOLES
                    </div>
                    <h3 className="font-semibold text-xl">Enfoque Tirón</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Calentamiento: 10 min</li>
                    <li>• Dominadas asistidas: 4x5</li>
                    <li>• Scapular pull-ups: 3x10</li>
                    <li>• Australian pull-ups: 3x12</li>
                    <li>• Dead hang: 3x45s</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                    ⏱️ Duración: 50-55 min
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="text-center mb-4">
                    <div className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full mb-3">
                      VIERNES
                    </div>
                    <h3 className="font-semibold text-xl">Empuje + Core</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Calentamiento: 10 min</li>
                    <li>• Fondos en paralelas: 4x8</li>
                    <li>• Push-ups barra baja: 3x10</li>
                    <li>• Knee raises: 3x15</li>
                    <li>• L-sit progression: 3x20s</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                    ⏱️ Duración: 45-50 min
                  </div>
                </Card>
              </div>

              <Card className="mt-8 p-6 bg-primary/5 border-primary/20 max-w-3xl mx-auto">
                <div className="flex items-start gap-4">
                  <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">💡 Consejo Pro</h4>
                    <p className="text-muted-foreground">
                      Mantén 48 horas de descanso entre sesiones para permitir la recuperación muscular. Los días libres puedes hacer movilidad ligera o estiramientos.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Progresión */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Progresión en Parques: Del Principiante al Avanzado
              </h2>
              
              <div className="max-w-5xl mx-auto space-y-6">
                <Card className="p-8 border-l-4 border-l-green-500">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/10 text-green-600 font-bold px-4 py-2 rounded-full flex-shrink-0">
                      NIVEL 1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-3">Construcción de Base (Semanas 1-8)</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                        <div>
                          <p className="font-medium text-foreground mb-2">Objetivos:</p>
                          <ul className="space-y-1">
                            <li>• 5 dominadas asistidas</li>
                            <li>• 10 fondos en paralelas</li>
                            <li>• 30s L-sit con rodillas</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-2">Frecuencia:</p>
                          <p>3 días por semana</p>
                          <p className="mt-2">Enfoque en técnica correcta y construcción de fuerza base</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-l-4 border-l-blue-500">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/10 text-blue-600 font-bold px-4 py-2 rounded-full flex-shrink-0">
                      NIVEL 2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-3">Consolidación (Semanas 9-16)</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                        <div>
                          <p className="font-medium text-foreground mb-2">Objetivos:</p>
                          <ul className="space-y-1">
                            <li>• 5-10 dominadas sin ayuda</li>
                            <li>• 15 fondos en paralelas</li>
                            <li>• 45s L-sit progresión</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-2">Frecuencia:</p>
                          <p>4 días por semana</p>
                          <p className="mt-2">Mayor volumen de entrenamiento y variaciones de ejercicios</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-l-4 border-l-orange-500">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500/10 text-orange-600 font-bold px-4 py-2 rounded-full flex-shrink-0">
                      NIVEL 3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-3">Skills Avanzados (Semanas 17+)</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                        <div>
                          <p className="font-medium text-foreground mb-2">Objetivos:</p>
                          <ul className="space-y-1">
                            <li>• Trabajar muscle-ups</li>
                            <li>• Front lever progressions</li>
                            <li>• L-sit completo 30s+</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-2">Frecuencia:</p>
                          <p>4-5 días por semana</p>
                          <p className="mt-2">Entrenamientos especializados y trabajo de skills</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Evita Estos Errores */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Evita Estos Errores en el Parque
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <Card className="p-6 border-l-4 border-l-amber-500">
                  <AlertCircle className="w-10 h-10 mb-4 text-amber-600" />
                  <h3 className="font-semibold text-xl mb-3">❌ No Calentar Suficiente</h3>
                  <p className="text-muted-foreground mb-3">
                    En parques hace más frío, especialmente en las mañanas. Las articulaciones necesitan más tiempo para calentarse.
                  </p>
                  <p className="text-foreground font-medium">
                    ✅ Solución: Dedica 10-15 minutos de calentamiento, enfócate especialmente en muñecas y hombros.
                  </p>
                </Card>

                <Card className="p-6 border-l-4 border-l-amber-500">
                  <AlertCircle className="w-10 h-10 mb-4 text-amber-600" />
                  <h3 className="font-semibold text-xl mb-3">❌ Intentar Ejercicios Muy Avanzados</h3>
                  <p className="text-muted-foreground mb-3">
                    Ver a otros hacer muscle-ups o front lever puede motivarte a intentarlo sin tener la base necesaria.
                  </p>
                  <p className="text-foreground font-medium">
                    ✅ Solución: Sigue una progresión estructurada. Construye fundamentos sólidos primero.
                  </p>
                </Card>

                <Card className="p-6 border-l-4 border-l-amber-500">
                  <AlertCircle className="w-10 h-10 mb-4 text-amber-600" />
                  <h3 className="font-semibold text-xl mb-3">❌ Ignorar el Dolor Articular</h3>
                  <p className="text-muted-foreground mb-3">
                    Las barras metálicas son más duras que las de gimnasio y pueden ser más exigentes para las articulaciones.
                  </p>
                  <p className="text-foreground font-medium">
                    ✅ Solución: Escucha a tu cuerpo, usa guantes si es necesario, descansa cuando sientas dolor.
                  </p>
                </Card>

                <Card className="p-6 border-l-4 border-l-amber-500">
                  <AlertCircle className="w-10 h-10 mb-4 text-amber-600" />
                  <h3 className="font-semibold text-xl mb-3">❌ No Ajustar por Clima</h3>
                  <p className="text-muted-foreground mb-3">
                    Barras mojadas o muy frías en invierno pueden afectar significativamente tu agarre y rendimiento.
                  </p>
                  <p className="text-foreground font-medium">
                    ✅ Solución: Lleva toalla para secar las barras, considera usar guantes en invierno.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Encuentra tu Comunidad */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <Card className="p-8 md:p-12 max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                  La Calistenia es Mejor en Comunidad
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Los parques de calistenia tienen algo mágico: personas de todos los niveles entrenando juntas, compartiendo consejos y motivándose mutuamente.
                  </p>
                  <p>
                    No tengas miedo de pedir ayuda o consejo. La comunidad de calistenia es una de las más acogedoras del fitness. Todos empezamos desde cero y entendemos los desafíos que enfrentas.
                  </p>
                  <p className="font-medium text-foreground">
                    Busca grupos en redes sociales o simplemente preséntate en tu parque local. ¡La mejor versión de ti te está esperando!
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Preguntas Frecuentes
              </h2>
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>¿Dónde encuentro parques de calistenia cerca de mí?</AccordionTrigger>
                    <AccordionContent>
                      Puedes buscar en Google Maps con términos como "parque calistenia", "street workout park" o "outdoor gym". También existen apps especializadas como Calisteniapp o comunidades en Instagram donde comparten ubicaciones de parques.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-2">
                    <AccordionTrigger>¿Es seguro entrenar en parques públicos?</AccordionTrigger>
                    <AccordionContent>
                      Sí, la mayoría de los parques de calistenia son seguros. Si tienes dudas sobre la zona, entrena en horarios con más gente (mañanas o tardes). Los parques suelen tener buena iluminación y están en áreas transitadas.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-3">
                    <AccordionTrigger>¿Qué hago si todas las barras están ocupadas?</AccordionTrigger>
                    <AccordionContent>
                      Puedes pedir educadamente compartir el espacio (la comunidad suele ser muy receptiva), hacer calentamiento extra mientras esperas, o trabajar ejercicios en el suelo como flexiones y plancha. También puedes ir en horarios menos concurridos.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-4">
                    <AccordionTrigger>¿Puedo entrenar en parques en invierno?</AccordionTrigger>
                    <AccordionContent>
                      Sí, con la ropa adecuada y guantes para proteger tus manos del frío. De hecho, el frío puede ser beneficioso para algunos aspectos del entrenamiento. Solo asegúrate de calentar bien antes de empezar y escucha a tu cuerpo.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-5">
                    <AccordionTrigger>¿Necesito ser fuerte para empezar?</AccordionTrigger>
                    <AccordionContent>
                      No en absoluto. Los parques tienen equipamiento para todos los niveles. Puedes empezar con ejercicios asistidos y progresiones simples. La belleza de la calistenia es que avanzas a tu propio ritmo.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-6">
                    <AccordionTrigger>¿Cuánto tiempo tardaré en ver resultados?</AccordionTrigger>
                    <AccordionContent>
                      Con entrenamiento constante, verás mejoras en fuerza en 4-6 semanas. Los cambios físicos visibles suelen aparecer en 8-12 semanas. La clave está en la consistencia y una buena alimentación.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-7">
                    <AccordionTrigger>¿Es mejor entrenar solo o en grupo?</AccordionTrigger>
                    <AccordionContent>
                      Ambos tienen ventajas. Entrenar en grupo te da motivación y apoyo social. Entrenar solo permite más concentración y flexibilidad de horarios. Lo ideal es combinar ambos enfoques según tus preferencias y disponibilidad.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-8">
                    <AccordionTrigger>¿Qué hago si llueve o hace mal tiempo?</AccordionTrigger>
                    <AccordionContent>
                      Puedes entrenar en casa con rutinas de peso corporal (flexiones, sentadillas, core), buscar estructuras cubiertas en tu zona, o simplemente tomar ese día como descanso activo con movilidad y estiramientos.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <QuickJumpBanner
                text="¿Quieres un plan de entrenamiento personalizado?"
                linkText="Ver Programas de Entrenamiento"
                href="/programas"
                isExternal={false}
                icon="🎯"
                variant="secondary"
              />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CalisteniaParque;
