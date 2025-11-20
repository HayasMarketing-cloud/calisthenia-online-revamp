import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByIds } from "@/lib/videoUtils";
import CommunityCTA from "@/components/CommunityCTA";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoWithStructure from "@/components/VideoWithStructure";
import RoutineHero from "@/components/routine/RoutineHero";
import QuickJumpBanner from "@/components/QuickJumpBanner";
import StructuredData from "@/components/seo/StructuredData";
import { useRoutineSchemas } from "@/hooks/useRoutineSchemas";

const RutinaBrazos = () => {
  const schemas = useRoutineSchemas({
    routineName: "Cómo entrenar brazos con calistenia",
    routineDescription: "Desarrolla brazos fuertes y definidos con ejercicios de calistenia. Rutina completa para bíceps, tríceps y antebrazos usando solo tu peso corporal.",
    videoId: "iwfZkXQRaXU",
    videoTitle: "Cómo Entrenar Brazos con Calistenia",
    videoDuration: "PT8M30S",
    uploadDate: "2024-01-15",
    totalTime: "PT30M",
    steps: [
      {
        name: "Calentamiento",
        text: "Realiza 5 minutos de movilidad articular enfocándote en codos, muñecas y hombros para preparar las articulaciones."
      },
      {
        name: "Ejercicios de Bíceps",
        text: "Ejecuta curl australiano en barra baja, chin-ups y variaciones isométricas para trabajar la flexión del codo."
      },
      {
        name: "Ejercicios de Tríceps",
        text: "Realiza fondos en paralelas, flexiones diamante y extensiones de tríceps para trabajar la extensión del codo."
      },
      {
        name: "Trabajo de Antebrazos",
        text: "Incluye ejercicios de agarre como cuelgues en barra y farmer walks para fortalecer los antebrazos."
      },
      {
        name: "Enfriamiento",
        text: "Finaliza con estiramientos suaves de bíceps, tríceps y antebrazos durante 5 minutos."
      }
    ]
  });

  return (
    <>
      <Helmet>
        <title>Rutina de Brazos con Calistenia: Bíceps y Tríceps Fuertes</title>
        <meta 
          name="description" 
          content="Desarrolla brazos fuertes y definidos con ejercicios de calistenia. Rutina completa para bíceps, tríceps y antebrazos. Guía con video, técnicas y progresión." 
        />
        <meta 
          name="keywords" 
          content="rutina brazos calistenia, ejercicios bíceps, ejercicios tríceps, brazos fuertes, entrenamiento brazos sin pesas, curl australiano, fondos paralelas" 
        />
        <link rel="canonical" href="https://calisthenia.online/rutina-brazos-calistenia/" />
        
        <meta property="og:title" content="Rutina de Brazos Calistenia: Fuerza y Definición" />
        <meta property="og:description" content="Entrena bíceps y tríceps con ejercicios de calistenia efectivos. Técnicas, progresión y video guiado completo." />
        <meta property="og:image" content="https://calisthenia.online/assets/calisthenia-brazos.webp" />
        <meta property="og:url" content="https://calisthenia.online/rutina-brazos-calistenia/" />
        <meta property="og:type" content="article" />
      </Helmet>

      <StructuredData data={schemas.allSchemas} />

      <Header />
      <CommunityStickyBanner />

      <RoutineHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rutinas", href: "/programas/" },
          { label: "Rutina Brazos", href: "/rutina-brazos-calistenia/" }
        ]}
        title="Rutina de"
        titleHighlight="Brazos"
        emoji="💪"
        description="¿Quieres unos brazos más fuertes, definidos y funcionales? Esta rutina está pensada para ayudarte a desarrollar bíceps y tríceps de forma equilibrada, potenciando tu rendimiento tanto en los entrenamientos como en tu día a día."
        nivel="Todos los Niveles"
        duracion="30-45 min"
        lugar="Casa/Parque"
        gradientFrom="from-blue-500/10"
        gradientTo="via-cyan-500/10 to-background"
      />

      {/* Quick Jump Banner */}
      <QuickJumpBanner 
        text="¿Quieres ir directo a la rutina en video?"
        linkText="Ver Video Completo"
        href="#video-rutina"
        icon="🎯"
        variant="primary"
      />

      {/* Por qué trabajar brazos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Por qué trabajar los brazos es clave para tu progreso
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Entrenar los brazos no solo mejora tu estética, también te da ventaja en ejercicios compuestos como dominadas, flexiones o fondos. Unos bíceps y tríceps fuertes te hacen más eficiente, más resistente… y sí, también más seguro en cada movimiento.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
                  <span className="text-4xl">🔥</span>
                  Beneficios principales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl">•</span>
                    <p className="text-muted-foreground">Mayor fuerza y rendimiento en ejercicios complejos</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl">•</span>
                    <p className="text-muted-foreground">Definición muscular visible</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl">•</span>
                    <p className="text-muted-foreground">Reducción del riesgo de lesiones por desbalances</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl">•</span>
                    <p className="text-muted-foreground">Mejora funcional para tu día a día</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ejercicios clave */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Ejercicios clave para brazos fuertes y definidos
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Aquí no venimos a perder el tiempo. Esta selección de ejercicios activa al máximo tus bíceps y tríceps, para que cada serie cuente.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Bíceps */}
            <div>
              <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
                <span className="text-4xl">💥</span>
                Ejercicios para Bíceps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-3">Curl con Barra</h4>
                    <p className="text-sm text-muted-foreground">
                      Básico, efectivo y directo. El clásico que nunca falla para construir masa en los bíceps.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-3">Curl con Mancuernas</h4>
                    <p className="text-sm text-muted-foreground">
                      Más control y amplitud. Permite trabajar cada brazo de forma independiente para corregir desbalances.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-3">Curl con Barra Z</h4>
                    <p className="text-sm text-muted-foreground">
                      Agarre supino que reduce tensión en muñecas y maximiza el estímulo en el bíceps.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Tríceps */}
            <div>
              <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
                <span className="text-4xl">💪</span>
                Ejercicios para Tríceps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-3">Extensiones en Polea</h4>
                    <p className="text-sm text-muted-foreground">
                      Controla la técnica y siente el bombeo. Perfecto para aislar y definir el tríceps.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-3">Fondos en Paralelas</h4>
                    <p className="text-sm text-muted-foreground">
                      Trabaja tríceps, hombros y pecho a la vez. Un ejercicio compuesto muy eficiente.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-3">Press Francés</h4>
                    <p className="text-sm text-muted-foreground">
                      Ideal para añadir carga y progresión. Trabaja especialmente la cabeza larga del tríceps.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo estructurar tu rutina */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Cómo estructurar tu rutina
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La clave está en la consistencia y la progresión. Aquí te mostramos cómo organizar tu entrenamiento de brazos.
          </p>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">📊</div>
                <h3 className="font-bold text-lg mb-3 text-center">Series y Repeticiones</h3>
                <p className="text-sm text-muted-foreground text-center">
                  3 a 4 series de 8-12 repeticiones por ejercicio
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">⏱️</div>
                <h3 className="font-bold text-lg mb-3 text-center">Descanso</h3>
                <p className="text-sm text-muted-foreground text-center">
                  60 a 90 segundos entre series para mantener intensidad
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">✅</div>
                <h3 className="font-bold text-lg mb-3 text-center">Técnica</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Espalda recta, movimientos controlados. Si balanceas, baja el peso.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8">
              <h3 className="font-bold text-xl mb-4 text-center">💡 Regla de Oro</h3>
              <p className="text-muted-foreground text-center text-lg">
                Técnica ante todo: espalda recta, movimientos controlados, y nada de impulsos. Si balanceas, baja el peso.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ancla para scroll suave */}
      <div id="video-rutina" className="relative -top-20"></div>

      {/* Video Principal con Estructura */}
      <VideoWithStructure
        videoId="QmNx-kydmn0"
        videoTitle="🎬 Rutina Completa de Brazos en Video"
        videoDescription="Sigue esta rutina de brazos paso a paso. Incluye calentamiento, ejercicios principales y enfriamiento para maximizar resultados."
        insights={[
          "Calentamiento específico para brazos y hombros",
          "Ejercicios progresivos de bíceps y tríceps",
          "Técnica detallada para cada movimiento",
          "Variaciones según tu nivel de fuerza"
        ]}
        nivel="Intermedio"
        zonaMuscular="Brazos"
        material="Barra / Casa"
        formato={{
          calentamiento: {
            ejercicios: 4,
            intensidad: "Movilidad articular"
          },
          partePrincipal: {
            series: 4,
            descripcion: "Por ejercicio alternando bíceps y tríceps"
          },
          tempo: {
            activo: "8-12 reps",
            descanso: "60-90s"
          }
        }}
        estimulos={[
          "💪 Hipertrofia muscular",
          "⚡ Fuerza de brazos",
          "🎯 Definición y tono"
        ]}
        detalles="Esta rutina está diseñada para trabajar bíceps y tríceps de forma equilibrada. Perfecto para desarrollar brazos fuertes y definidos con ejercicios de calistenia y peso corporal."
      />

      {/* Métodos avanzados */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Métodos para llevar tu entrenamiento al siguiente nivel
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            ¿Quieres más resultados? Añade estos métodos avanzados a tu rutina.
          </p>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-5xl mb-4 text-center">🔄</div>
                <h3 className="font-bold text-xl mb-3 text-center">Superseries</h3>
                <p className="text-sm text-muted-foreground">
                  Combina bíceps y tríceps sin descanso entre ejercicios. Por ejemplo: curl + extensiones.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-5xl mb-4 text-center">⚖️</div>
                <h3 className="font-bold text-xl mb-3 text-center">Variaciones con Peso</h3>
                <p className="text-sm text-muted-foreground">
                  Añade carga en fondos o usa chaleco lastrado para romper límites y seguir progresando.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-5xl mb-4 text-center">🎯</div>
                <h3 className="font-bold text-xl mb-3 text-center">Ejercicios Combinados</h3>
                <p className="text-sm text-muted-foreground">
                  Curl + press militar para activar brazos y deltoides a la vez. Máxima eficiencia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rutina combinada brazos y hombros */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Rutina combinada de brazos y hombros
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Una estrategia poderosa para esculpir la parte superior del cuerpo. Combinar bíceps, tríceps y deltoides te permite entrenar con más intensidad y menos tiempo.
          </p>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
                  <span className="text-3xl">💡</span>
                  Ejercicios sugeridos
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/10">
                    <span className="text-2xl">1️⃣</span>
                    <div>
                      <h4 className="font-bold mb-1">Curl de bíceps + Press militar</h4>
                      <p className="text-sm text-muted-foreground">Trabaja brazos y hombros en un solo movimiento fluido</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/10">
                    <span className="text-2xl">2️⃣</span>
                    <div>
                      <h4 className="font-bold mb-1">Fondos en paralelas</h4>
                      <p className="text-sm text-muted-foreground">Activa tríceps + hombros + pecho simultáneamente</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/10">
                    <span className="text-2xl">3️⃣</span>
                    <div>
                      <h4 className="font-bold mb-1">Press de hombros con barra o mancuernas</h4>
                      <p className="text-sm text-muted-foreground">Fortalece deltoides mientras estabilizas con los brazos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mujeres: brazos fuertes */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/10 dark:to-purple-950/10">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Mujeres: brazos fuertes, cuerpo tonificado
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            El entrenamiento de brazos para mujeres se enfoca en tonificar sin ganar volumen excesivo. Ejercicios como el curl con mancuernas o extensiones en polea con cuerda son ideales para resaltar definición con elegancia y fuerza.
          </p>

          <div className="max-w-4xl mx-auto">
            <Card className="border-pink-200 dark:border-pink-800">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <span className="text-2xl">✨</span>
                      Ejercicios recomendados
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Curl con mancuernas (ligeras a moderadas)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Extensiones en polea con cuerda</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Flexiones diamante modificadas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Fondos asistidos en paralelas</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <span className="text-2xl">💪</span>
                      Beneficios específicos
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Tonificación sin volumen excesivo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Definición elegante y funcional</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Mayor fuerza para el día a día</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Mejora de la postura y estabilidad</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips finales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Tips finales para progresar sin lesionarte
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Estos consejos te ayudarán a maximizar resultados mientras cuidas tu salud y prevines lesiones.
          </p>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/10 dark:to-emerald-950/10">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">🎯</div>
                <h3 className="font-bold text-lg mb-3 text-center">Control del Peso</h3>
                <p className="text-sm text-muted-foreground text-center">
                  No sacrifiques técnica por ego. Es mejor menos peso con buena forma que más peso con mala ejecución.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/10 dark:to-cyan-950/10">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">✅</div>
                <h3 className="font-bold text-lg mb-3 text-center">Postura Correcta</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Espalda recta, codos cerca del torso. La postura correcta protege tus articulaciones.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/10 dark:to-pink-950/10">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">🧘</div>
                <h3 className="font-bold text-lg mb-3 text-center">Estiramiento</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Post-entreno favorece la recuperación y previene lesiones. No lo saltes nunca.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Preguntas Frecuentes
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Resolvemos las dudas más comunes sobre el entrenamiento de brazos
          </p>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">¿Cuántos días a la semana entrenar brazos?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  De 1 a 2 veces por semana, dejando al menos 48 horas de recuperación entre sesiones. Los músculos necesitan descanso para crecer y fortalecerse.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">¿Mejor entrenar brazo con pecho o espalda?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Puedes combinar según tu enfoque. Pecho-tríceps funciona bien porque ambos son músculos de empuje. Espalda-bíceps también es efectivo porque ambos son de tracción. Elige lo que mejor se adapte a tu rutina semanal.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">¿Cómo evitar sobrecarga y lesiones?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Calienta bien antes de entrenar, escucha a tu cuerpo y cuida la técnica en cada repetición. Si sientes dolor (no confundir con la quemazón muscular normal), detente y revisa tu forma o reduce la intensidad.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">¿Puedo entrenar brazos todos los días?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No es recomendable. Los músculos necesitan tiempo de recuperación (48-72 horas) para repararse y crecer. Entrenar todos los días puede llevar a sobreentrenamiento y aumentar el riesgo de lesiones.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">¿Cuánto tiempo para ver resultados en brazos?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Con entrenamiento consistente y buena alimentación, puedes notar cambios en la fuerza en 2-3 semanas, y cambios visibles en definición muscular en 6-8 semanas. La paciencia y constancia son clave.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Galería de Videos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <VideoGallery 
            videos={getVideosByIds(allVideos, [
              'bSYhg5i28kg', // Súper dominada - bíceps avanzado
              'j1VaM6CNazM', // 10 dominadas - bíceps avanzado
              'qa00fnGijEo', // 5 dominadas - bíceps intermedio
              '15T6TRnJ63Y', // Primera dominada - bíceps principiante
              'QmNx-kydmn0', // Fondos - tríceps intermedio
              'IWqIZk3hF14'  // Fullbody principiantes - brazos general
            ])}
            title="📹 Videos de Entrenamiento de Brazos"
            showStats={true}
          />
        </div>
      </section>

      {/* CTA Comunidad */}
      <CommunityCTA />

      {/* CTA Final */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl lg:text-5xl mb-6">
              Desarrolla <span className="text-primary">Brazos Poderosos</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Domina muscle-ups, one arm pull-ups y las progresiones más avanzadas para bíceps y tríceps. Programas estructurados para maximizar tamaño y definición en tus brazos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">💪</div>
                  <h3 className="font-bold mb-2">Bíceps y Tríceps</h3>
                  <p className="text-sm text-muted-foreground">Programación específica para ambos grupos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold mb-2">Skills Avanzadas</h3>
                  <p className="text-sm text-muted-foreground">One arm pull-up y variantes explosivas</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📈</div>
                  <h3 className="font-bold mb-2">Hipertrofia Máxima</h3>
                  <p className="text-sm text-muted-foreground">Protocolos optimizados para crecimiento</p>
                </CardContent>
              </Card>
            </div>
            
            <Button size="lg" className="bg-gradient-primary" asChild>
              <Link to="/programas">Acceder a Programas de Brazos</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default RutinaBrazos;