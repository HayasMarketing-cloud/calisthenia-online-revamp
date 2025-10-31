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
import { getVideosByZone } from "@/lib/videoUtils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoWithStructure from "@/components/VideoWithStructure";
import RoutineHero from "@/components/routine/RoutineHero";
import QuickJumpBanner from "@/components/QuickJumpBanner";
import CommunityCTA from "@/components/CommunityCTA";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import { AlertCircle, CheckCircle2, TrendingUp, Dumbbell } from "lucide-react";

const RutinaHombro = () => {
  // Obtener videos de Hombros (si no hay, usaremos ejercicios que trabajen hombros o Full Body)
  const shoulderVideos = getVideosByZone(allVideos, "Hombros", { 
    limit: 12, 
    sortBy: 'engagement',
    minVistas: 100 
  });

  return (
    <>
      <Helmet>
        <title>Rutina de Hombros: Fortalece y Define tus Deltoides | Calistenia</title>
        <meta 
          name="description" 
          content="Rutina completa de hombros con calistenia. Ejercicios para deltoides, anatomía, progresiones, errores comunes y consejos de recuperación. Video guiado incluido." 
        />
        <meta 
          name="keywords" 
          content="rutina hombros, ejercicios deltoides, calistenia hombros, pike push-ups, flexiones pino, entrenar hombros casa" 
        />
        <link rel="canonical" href="https://calisthenia.online/rutinas-de-hombro-calistenia/" />
        
        <meta property="og:title" content="Rutina de Hombros: Fortalece y Define tus Deltoides" />
        <meta property="og:description" content="Desarrolla hombros fuertes con ejercicios de calistenia. Anatomía, ejercicios clave y rutina completa en video." />
        <meta property="og:image" content="https://calisthenia.online/assets/calisthenia-hombro.webp" />
        <meta property="og:url" content="https://calisthenia.online/rutinas-de-hombro-calistenia/" />
        <meta property="og:type" content="article" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ExercisePlan",
            "name": "Rutina de Hombros Calistenia",
            "description": "Plan completo de entrenamiento de hombros con calistenia para fortalecer deltoides",
            "activityFrequency": "2-3 times per week",
            "exerciseType": "Calisthenics",
            "video": {
              "@type": "VideoObject",
              "name": "Rutina de Hombros con Calistenia",
              "embedUrl": "https://www.youtube.com/embed/evORg2Y6LQQ"
            }
          })}
        </script>
      </Helmet>

      <Header />
      <CommunityStickyBanner />

      <RoutineHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rutinas", href: "/programas/" },
          { label: "Rutina Hombros", href: "/rutinas-de-hombro-calistenia/" }
        ]}
        title="Rutina de"
        titleHighlight="Hombros"
        emoji="💪"
        description="Fortalece y define tus deltoides con ejercicios de calistenia específicos. Desarrolla hombros potentes, estables y estéticos usando tu propio peso corporal."
        nivel="Todos los Niveles"
        duracion="10-15 min"
        lugar="Casa/Parque"
        gradientFrom="from-orange-500/10"
        gradientTo="via-amber-500/10 to-background"
      />

      {/* Quick Jump Banner */}
      <QuickJumpBanner 
        text="¿Quieres ir directo a la práctica?"
        linkText="Ver Rutina de Hombros"
        href="#video-rutina"
        icon="🎯"
        variant="primary"
      />

      {/* Anatomía y función de los deltoides */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Anatomía y Función de los Deltoides
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            El deltoides es uno de los músculos más importantes del hombro, responsable de múltiples movimientos y funciones esenciales.
          </p>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  El deltoides se encuentra en la parte lateral del hombro y se divide en tres 'cabezas' que cumplen roles específicos durante la actividad física. Su estructura permite una gran versatilidad de movimientos.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🔴</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Deltoides Anterior</h4>
                      <p className="text-muted-foreground">
                        Situado en la parte frontal, es esencial para los movimientos de empuje, como el press militar y las elevaciones frontales. Su activación es crucial al levantar objetos hacia adelante.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🟡</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Deltoides Medio</h4>
                      <p className="text-muted-foreground">
                        Localizado en el lateral, este músculo es el encargado de dar amplitud a los hombros. Se activa en ejercicios como las elevaciones laterales y es fundamental para crear una figura estilizada.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🔵</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Deltoides Posterior</h4>
                      <p className="text-muted-foreground">
                        Ubicado en la parte trasera, a menudo es menos trabajado, pero su fortalecimiento es vital para la estabilidad del hombro. Participa en movimientos de tracción como los face pulls, equilibrando la musculatura del hombro.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  Importancia Funcional
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  La función de los deltoides se extiende más allá de simplemente incrementar la estética. Esta musculatura es crucial en actividades cotidianas que implican levantar, empujar o tirar de objetos.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Fortalecer todas las cabezas del deltoides no solo mejora el rendimiento deportivo, sino que también ayuda a prevenir lesiones en la articulación del hombro, una de las más vulnerables del cuerpo humano. Una adecuada comprensión de la anatomía del deltoides permite implementar rutinas más efectivas y seguras en el entrenamiento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Principios clave */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Principios Clave para una Rutina Efectiva de Hombros
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Para alcanzar el máximo potencial en el entrenamiento de hombros, es esencial considerar varios principios que optimizan cada sesión.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                emoji: "✅", 
                title: "Técnica Correcta", 
                text: "Siempre es preferible utilizar un peso que se pueda manejar sin comprometer la forma. Mantener una postura correcta garantiza que se entrenen los músculos destinados." 
              },
              { 
                emoji: "🔄", 
                title: "Variedad de Ejercicios", 
                text: "Incluir movimientos que enfoquen todas las cabezas del deltoides permite un desarrollo equilibrado. Alternar entre ejercicios compuestos e isolativos maximiza la eficacia." 
              },
              { 
                emoji: "🔥", 
                title: "Calentamiento", 
                text: "Inicializar con una correcta movilidad articular ayuda a preparar los músculos y evitar lesiones. Nunca omitas esta fase crucial." 
              },
              { 
                emoji: "📈", 
                title: "Progresión Gradual", 
                text: "Aumentar gradualmente la carga o el volumen de trabajo es clave para estimular el crecimiento muscular sin sobrecargar las articulaciones." 
              },
              { 
                emoji: "⏸️", 
                title: "Tiempos de Descanso", 
                text: "Respetar los períodos de descanso entre series facilita una recuperación óptima y mejora el rendimiento en cada serie." 
              },
              { 
                emoji: "📅", 
                title: "Frecuencia Adecuada", 
                text: "Programar las sesiones permitiendo suficiente tiempo de recuperación entre entrenamientos intensivos de hombros previene el sobreentrenamiento." 
              }
            ].map((principle, i) => (
              <Card key={i} className="hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{principle.emoji}</div>
                  <h4 className="font-bold text-lg mb-2">{principle.title}</h4>
                  <p className="text-sm text-muted-foreground">{principle.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-2">Escucha a tu cuerpo</p>
                  <p className="text-sm text-muted-foreground">
                    La atención a los signos del cuerpo es fundamental para ajustar las cargas y los ejercicios según el nivel individual de cada persona. Reconocer y responder a las señales de fatiga o dolor evitará lesiones y garantizará un progreso sostenido en el entrenamiento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mejores ejercicios */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Mejores Ejercicios para Entrenar los Hombros
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            El entrenamiento de hombros puede ser increíblemente efectivo utilizando tanto mancuernas como barra. Cada método ofrece ventajas únicas que permiten trabajar de manera diversa las diferentes cabezas del deltoides.
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                title: "Press Militar con Barra",
                target: "Deltoides anterior",
                description: "Este ejercicio es fundamental para desarrollar la fuerza del deltoides anterior. Se realiza de pie y permite levantar un peso significativo que activa los músculos de los hombros y la parte superior del cuerpo."
              },
              {
                title: "Elevaciones Laterales con Mancuernas",
                target: "Deltoides medio",
                description: "Este movimiento se enfoca en el deltoides medio. Con un peso ligero, se levanta las mancuernas lateralmente, concentrándose en mantener la técnica adecuada y evitando movimientos bruscos."
              },
              {
                title: "Press Arnold",
                target: "Deltoides completo",
                description: "Una variación del press de hombros que, al girar las muñecas durante el movimiento, activa diferentes fibras musculares del deltoides, proporcionando un trabajo integral al área."
              },
              {
                title: "Pájaros (Rear Delt Fly)",
                target: "Deltoides posterior",
                description: "Este ejercicio se realiza inclinándose hacia adelante, utilizando mancuernas para trabajar el deltoides posterior. Es esencial para lograr un desarrollo equilibrado en los hombros."
              },
              {
                title: "Remo al Mentón",
                target: "Deltoides medio y trapecios",
                description: "Este ejercicio permite activar tanto el deltoides medio como los trapecios. Elevar la barra hacia el mentón proporciona un enfoque adicional en la fuerza y definición."
              },
              {
                title: "Pike Push-Ups (Calistenia)",
                target: "Deltoides anterior y medio",
                description: "Ejercicio de peso corporal que simula el press militar. Posición de V invertida, flexiona los codos llevando la cabeza hacia el suelo entre las manos. Ideal para entrenar sin material."
              }
            ].map((exercise, i) => (
              <Card key={i} className="hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Dumbbell className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{exercise.title}</h3>
                      <Badge variant="secondary" className="mb-3">
                        🎯 {exercise.target}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {exercise.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 max-w-4xl mx-auto">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                <strong>Consejo clave:</strong> Escoger los ejercicios adecuados y variar entre ellos es clave para conseguir un desarrollo armónico del hombro. La combinación de diferentes técnicas y el uso estratégico de mancuernas y barra pueden potenciar significativamente los resultados del entrenamiento.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Rutina de hombros para todos los niveles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Rutina de Hombros para Todos los Niveles
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            El entrenamiento de hombros puede adaptarse fácilmente a diferentes niveles de experiencia.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Principiantes */}
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30">
                    🌱 PRINCIPIANTES
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-6">
                  Para principiantes, es fundamental construir una base sólida antes de progresar a ejercicios más complejos. Se recomienda comenzar con movimientos básicos y enfocados en la técnica.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Press militar con mancuernas", sets: "3 series", reps: "10-12 reps", desc: "Desarrolla fuerza en los deltoides, fundamental para cualquier rutina." },
                    { name: "Elevaciones laterales", sets: "3 series", reps: "12-15 reps", desc: "Se centra en el deltoides medio, contribuyendo al ancho de los hombros." },
                    { name: "Elevaciones frontales", sets: "3 series", reps: "10-12 reps", desc: "Trabaja el deltoides anterior, crucial para la fuerza de empuje." },
                    { name: "Face pulls", sets: "3 series", reps: "12-15 reps", desc: "Ideal para fortalecer el deltoides posterior y mejorar la estabilidad." }
                  ].map((ex, i) => (
                    <div key={i} className="p-4 bg-secondary/20 rounded-lg">
                      <h4 className="font-semibold mb-2">{ex.name}</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>• {ex.sets} de {ex.reps}</p>
                        <p className="text-xs">{ex.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Intermedio/Avanzado */}
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30">
                    💪 INTERMEDIO / AVANZADO
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-6">
                  Para los niveles intermedios y avanzados, se pueden incluir variaciones más desafiantes. Estos ejercicios permiten trabajar de forma más intensa los diferentes músculos del hombro.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Press Arnold", sets: "4 series", reps: "8-10 reps", desc: "Activa múltiples cabezas del deltoides, aumentando la eficacia del entrenamiento." },
                    { name: "Remo al mentón", sets: "4 series", reps: "8-10 reps", desc: "Ayuda en el desarrollo del deltoides medio y los trapecios." },
                    { name: "Pájaros con mancuernas", sets: "4 series", reps: "10-12 reps", desc: "Excelente para aislar el deltoides posterior y prevenir desbalances musculares." },
                    { name: "Flexiones en pino asistidas", sets: "3-4 series", reps: "5-8 reps", desc: "Para quienes entrenan con calistenia, desarrolla fuerza vertical avanzada." }
                  ].map((ex, i) => (
                    <div key={i} className="p-4 bg-secondary/20 rounded-lg">
                      <h4 className="font-semibold mb-2">{ex.name}</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>• {ex.sets} de {ex.reps}</p>
                        <p className="text-xs">{ex.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Importante:</strong> Cualquiera que sea el nivel, es esencial escuchar al cuerpo y ajustar la intensidad según sea necesario. El enfoque en la técnica correcta y la progresión gradual garantiza un desarrollo efectivo y seguro de los hombros.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Entrenamiento combinado: hombros y tríceps */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Entrenamiento Combinado: Rutina de Hombros y Tríceps
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Combinar el entrenamiento de hombros y tríceps puede resultar altamente efectivo para desarrollar la fuerza y la estética del tren superior.
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">¿Por qué Combinarlos?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Estas dos áreas musculares están interrelacionadas y, al trabajarlas juntas, se optimiza el tiempo en el gimnasio y se mejora la funcionalidad global. Un enfoque equilibrado permitirá maximizar el rendimiento.
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg mb-3">Ejercicios Ideales para la Combinación:</h4>
                  
                  {[
                    {
                      title: "Press militar con barra o mancuernas",
                      desc: "Activa intensamente los deltoides y también involucra los tríceps en su ejecución."
                    },
                    {
                      title: "Fondos en paralelas",
                      desc: "Excelentes para trabajar tanto el tríceps como la parte posterior de los hombros."
                    },
                    {
                      title: "Elevaciones laterales + Extensiones de tríceps",
                      desc: "Combinación perfecta: enfoque en deltoides medio seguido de trabajo aislado de tríceps."
                    },
                    {
                      title: "Press de hombros a una mano",
                      desc: "Permite una mayor concentración en el tríceps del lado que se está ejercitando mientras trabajas el deltoides."
                    }
                  ].map((exercise, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">{exercise.title}</p>
                        <p className="text-sm text-muted-foreground">{exercise.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Estrategia de Entrenamiento</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Se aconseja alternar entre ejercicios de hombros y tríceps en una misma sesión. Esta técnica no solo mejora la resistencia, sino que también proporciona un enfoque dinámico al entrenamiento.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Por ejemplo, se pueden realizar press de hombros seguidos de extensiones de tríceps, permitiendo un breve descanso entre series. Es importante prestar atención a la técnica y evitar la sobrecarga inmediata.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Errores frecuentes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Errores Frecuentes y Consejos para Optimizar tu Rutina
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            El entrenamiento de hombros requiere atención y compromiso. Identificar errores comunes es el primer paso para superarlos.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Errores */}
              <Card className="border-2 border-destructive/20">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    Errores Comunes
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Sobrecargar el peso",
                        desc: "Usar cargas excesivas puede afectar la técnica y poner en peligro la salud del hombro. Siempre es preferible comenzar con un peso manejable y centrarse en la forma correcta."
                      },
                      {
                        title: "Descuidar el deltoides posterior",
                        desc: "Con frecuencia, se presta más atención a los músculos delanteros y laterales, lo que provoca desequilibrios. Incorporar ejercicios que trabajen esta área es crucial."
                      },
                      {
                        title: "Ignorar el calentamiento",
                        desc: "Pasar por alto un calentamiento adecuado puede llevar a lesiones. Es fundamental realizar movimientos de movilidad articular antes de levantar peso."
                      }
                    ].map((error, i) => (
                      <div key={i} className="p-3 bg-destructive/5 rounded-lg">
                        <p className="font-semibold text-sm mb-1">❌ {error.title}</p>
                        <p className="text-xs text-muted-foreground">{error.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Consejos */}
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Consejos de Optimización
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Mantener la atención durante el entrenamiento",
                        desc: "Concentrarse en cada repetición y asegurar un control adecuado durante el movimiento ayuda a potenciar la activación muscular."
                      },
                      {
                        title: "Escuchar al cuerpo",
                        desc: "Prestar atención a las señales de fatiga o dolor es esencial. Si se sienten molestias, es mejor reducir la carga o incluso descansar."
                      },
                      {
                        title: "Incluir ejercicios de movilidad",
                        desc: "La flexibilidad juega un rol vital en el rendimiento. Incorporar estiramientos y ejercicios de movilidad puede mejorar el rango de movimiento."
                      }
                    ].map((tip, i) => (
                      <div key={i} className="p-3 bg-primary/5 rounded-lg">
                        <p className="font-semibold text-sm mb-1">✅ {tip.title}</p>
                        <p className="text-xs text-muted-foreground">{tip.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center leading-relaxed">
                  El conocimiento sobre estos errores y consejos permitirá potenciar la práctica y lograr resultados más satisfactorios en el entrenamiento de hombros, evitando contratiempos innecesarios.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recuperación y cuidado */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Recomendaciones para la Recuperación y Cuidado del Hombro
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La correcta recuperación de los hombros es fundamental para evitar lesiones y garantizar el progreso en el entrenamiento.
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: "🔄",
                  title: "Descanso Activo",
                  desc: "Es importante alternar días de entrenamiento intenso con sesiones de descanso activo. Esto permite que los músculos recuperen sin dejar de moverse, promoviendo la circulación y ayudando a reducir la tensión."
                },
                {
                  icon: "🧘",
                  title: "Estiramientos",
                  desc: "Realizar estiramientos específicos después del entrenamiento contribuye a mantener la flexibilidad. Focalizarse en los músculos alrededor del hombro, incluyendo el deltoides y el pectoral, optimiza la recuperación."
                },
                {
                  icon: "🎯",
                  title: "Rodillos de Espuma",
                  desc: "Usar rodillos de espuma ayuda a liberar la tensión acumulada en los músculos. Esta técnica de liberación miofascial facilita el flujo sanguíneo y acelera el proceso de recuperación."
                },
                {
                  icon: "💧",
                  title: "Hidratación y Nutrición",
                  desc: "Mantenerse bien hidratado y seguir una dieta equilibrada que incluya proteínas es esencial. Esto asegura que los músculos tengan los nutrientes necesarios para recuperarse adecuadamente."
                }
              ].map((rec, i) => (
                <Card key={i} className="hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{rec.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground">{rec.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-primary/30 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl mb-3">Importancia de la Recuperación</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Estas recomendaciones son clave para evitar problemas en los hombros y garantizar un entrenamiento efectivo. Cuidar esta área del cuerpo es tan crucial como fortalecerla. Un enfoque adecuado puede marcar la diferencia en la calidad de los ejercicios y en la funcionalidad de esta articulación tan compleja.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ancla para scroll suave */}
      <div id="video-rutina" className="relative -top-20"></div>

      {/* Video Principal con Estructura */}
      <VideoWithStructure
        videoId="evORg2Y6LQQ"
        videoTitle="🎬 Rutina de Hombros Completa con Calistenia"
        videoDescription="En este video, se presenta una rutina de hombros de aproximadamente 10 minutos, diseñada para trabajar los deltoides utilizando ejercicios de calistenia. La rutina es accesible para todos los niveles y se puede realizar con tan solo unas mini paralelas."
        insights={[
          "Fortalecimiento de los deltoides: Trabaja las 2 porciones del hombro (anterior y lateral)",
          "Mejora de la movilidad: Aumenta el rango de movimiento articular y la coordinación",
          "Prevención de lesiones: Refuerza los estabilizadores del hombro para proteger articulaciones y tendones",
          "Aumento del equilibrio en el pino: Mejora el control corporal y la fuerza necesaria para progresar en verticales"
        ]}
        nivel="Intermedio"
        zonaMuscular="Hombros"
        material="Casa"
        formato={{
          calentamiento: {
            ejercicios: 3,
            intensidad: "Movilidad articular y activación"
          },
          partePrincipal: {
            series: 4,
            descripcion: "Cada ejercicio"
          },
          tempo: {
            activo: "40s",
            descanso: "20s"
          }
        }}
        estimulos={[
          "💪 Fuerza de hombros",
          "⚖️ Equilibrio y control corporal",
          "🔥 Resistencia muscular",
          "🎯 Estabilidad del core"
        ]}
        detalles="Esta rutina incluye: Rana (Frogstand) para equilibrio y control corporal, Flexiones de pica para deltoides anterior, Flexiones lean planche para hombros y core, Flexiones inclinadas para tren superior completo, y Hollow body rocks para alineación y estabilidad en movimientos invertidos."
      />

      {/* Galería de Videos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <VideoGallery 
            videos={shoulderVideos}
            title="📹 Más Videos de Entrenamientos de Hombros"
            showStats={true}
          />
          
          {shoulderVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Estamos preparando más contenido específico de hombros. Mientras tanto, consulta nuestros videos de Full Body que también trabajan esta zona.
              </p>
              <Link to="/rutina-full-body">
                <Button variant="outline">Ver Rutinas Full Body</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Comunidad */}
      <CommunityCTA />

      {/* CTA Final */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl lg:text-5xl mb-6">
              Desarrolla <span className="text-primary">Hombros de Acero</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Accede a programas estructurados con progresiones específicas para deltoides. Desde pike push-ups hasta flexiones en pino, desarrolla fuerza y estabilidad real.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">💪</div>
                  <h3 className="font-bold mb-2">Deltoides Completos</h3>
                  <p className="text-sm text-muted-foreground">Trabaja las 3 cabezas de forma equilibrada</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold mb-2">Prevención de Lesiones</h3>
                  <p className="text-sm text-muted-foreground">Fortalece el manguito rotador y estabilizadores</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📈</div>
                  <h3 className="font-bold mb-2">Progresión Clara</h3>
                  <p className="text-sm text-muted-foreground">Del nivel básico al pino asistido y más allá</p>
                </CardContent>
              </Card>
            </div>
            
            <Button size="lg" className="bg-gradient-primary" asChild>
              <Link to="/programas">Acceder a Programas de Hombros</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default RutinaHombro;
