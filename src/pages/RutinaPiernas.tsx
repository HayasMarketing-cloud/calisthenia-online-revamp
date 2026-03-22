import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByIds } from "@/lib/videoUtils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoWithStructure from "@/components/VideoWithStructure";
import RoutineHero from "@/components/routine/RoutineHero";
import QuickJumpBanner from "@/components/QuickJumpBanner";
import ExerciseCard from "@/components/routine/ExerciseCard";
import CommunityCTA from "@/components/CommunityCTA";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import StructuredData from "@/components/seo/StructuredData";
import { useRoutineSchemas } from "@/hooks/useRoutineSchemas";

const RutinaPiernas = () => {
  const schemas = useRoutineSchemas({
    routineName: "Rutina de Piernas con Calistenia",
    routineDescription: "Rutina completa de piernas con calistenia. Ejercicios, progresiones y consejos para desarrollar fuerza, potencia y estética en casa, gimnasio o parque.",
    videoId: "tOZ_Rm2lm6M",
    videoTitle: "Rutina de Piernas Completa en Casa",
    videoDuration: "PT12M20S",
    uploadDate: "2024-02-10",
    totalTime: "PT50M",
    breadcrumbs: [
      { name: "Inicio", url: "https://calisthenia.online/" },
      { name: "Rutinas", url: "https://calisthenia.online/programas/" },
      { name: "Rutina Piernas", url: "https://calisthenia.online/rutina-piernas-calistenia/" }
    ],
    rating: {
      itemName: "Rutina de Piernas Calistenia",
      ratingValue: 4.6,
      reviewCount: 198,
      bestRating: 5,
      worstRating: 1
    },
    steps: [
      {
        name: "Activación y movilidad",
        text: "Comienza con 5-10 minutos de activación de glúteos, movilidad de cadera y tobillos para preparar las piernas."
      },
      {
        name: "Sentadillas y variaciones",
        text: "Realiza sentadillas clásicas, búlgaras y pistol squats progresivas. 3-4 series de 10-15 repeticiones por pierna."
      },
      {
        name: "Trabajo de isquiotibiales",
        text: "Ejecuta peso muerto a una pierna, puentes de glúteo y curl nórdico para fortalecer la parte posterior."
      },
      {
        name: "Ejercicios de cuádriceps",
        text: "Incluye zancadas, step-ups y extensiones isométricas para desarrollar la fuerza del cuádriceps."
      },
      {
        name: "Pantorrillas y enfriamiento",
        text: "Finaliza con elevaciones de pantorrilla y estiramientos completos de piernas durante 10 minutos."
      }
    ]
  });

  return (
    <>
      <Helmet>
        <title>Rutina de Piernas: Mejora Tu Fuerza y Estética Muscular</title>
        <meta 
          name="description" 
          content="Rutina completa de piernas con calistenia. Ejercicios, progresiones y consejos para desarrollar fuerza, potencia y estética en casa, gimnasio o parque." 
        />
        <meta 
          name="keywords" 
          content="rutina piernas calistenia, entrenamiento piernas casa, sentadillas pistol squat, ejercicios piernas sin material, rutina glúteos" 
        />
        <link rel="canonical" href="https://calisthenia.online/rutina-piernas-calistenia/" />
        
        <meta property="og:title" content="Rutina de Piernas: Mejora Tu Fuerza y Estética Muscular" />
        <meta property="og:description" content="Guía completa de entrenamiento de piernas con calistenia. Ejercicios para casa, gimnasio y parque." />
        <meta property="og:image" content="https://calisthenia.online/assets/calisthenia-piernas.webp" />
        <meta property="og:url" content="https://calisthenia.online/rutina-piernas-calistenia/" />
        <meta property="og:type" content="article" />
      </Helmet>

      <StructuredData data={schemas.allSchemas} />

      <Header />
      <CommunityStickyBanner />

      <RoutineHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rutinas", href: "/programas/" },
          { label: "Rutina Piernas", href: "/rutina-piernas-calistenia/" }
        ]}
        title="Rutina de"
        titleHighlight="Piernas"
        emoji="🦵"
        description="El entrenamiento de piernas es esencial para desarrollar fuerza y mejorar la estética muscular. Esta guía completa te proporciona las herramientas para maximizar tu rendimiento en cada sesión."
        nivel="Todos los Niveles"
        duracion="45-60 min"
        lugar="Casa/Gym/Parque"
        gradientFrom="from-orange-500/10"
        gradientTo="via-red-500/10 to-background"
      />

      {/* Quick Jump Banner */}
      <QuickJumpBanner 
        text="¿Quieres empezar a entrenar ya?"
        linkText="Ver Video Completo"
        href="#video-piernas"
        icon="🎯"
        variant="primary"
      />

      {/* Fundamentos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Fundamentos del Entrenamiento de Piernas
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Entrenar piernas no es solo una cuestión de apariencia: es la base para desarrollar una verdadera fuerza funcional.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-4">
                  Un tren inferior fuerte mejora el rendimiento deportivo, la postura, el equilibrio y la salud metabólica. Además, fortalece las conexiones neuromusculares que impactan en todo el cuerpo.
                </p>
                <p className="text-muted-foreground font-semibold">
                  Ignorar las piernas es limitar tu progreso.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Beneficios Clave del Entrenamiento de Piernas
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            El entrenamiento de piernas trae consigo una serie de efectos positivos que impactan tanto la salud como la estética
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">💪</div>
                <h3 className="font-bold text-xl mb-3">Fortalecimiento y Desarrollo Muscular</h3>
                <p className="text-muted-foreground mb-4">
                  Una de las razones principales para entrenar el tren inferior es el aumento de la fuerza. Este entrenamiento se enfoca en grupos musculares grandes, como los cuádriceps y los glúdeos.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Incremento en la potencia para actividades cotidianas y deportivas</li>
                  <li>Mejora de la resistencia general del cuerpo</li>
                  <li>Contribución al desarrollo simétrico del físico</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">🔥</div>
                <h3 className="font-bold text-xl mb-3">Mejora del Metabolismo y Pérdida de Grasa</h3>
                <p className="text-muted-foreground mb-4">
                  Ejercitar las piernas es fundamental para incrementar la tasa metabólica. Al involucrar grandes grupos musculares, se genera un alto gasto energético.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Estimulación de la quema de calorías incluso en reposo</li>
                  <li>Promoción de un entorno anabólico que facilita la reducción de grasa</li>
                  <li>Optimización del rendimiento en deportes y actividades físicas</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="font-bold text-xl mb-3">Prevención de Lesiones y Mejora del Equilibrio</h3>
                <p className="text-muted-foreground mb-4">
                  Entrenar las piernas no solo mejora la fuerza, sino que también proporciona estabilidad. Un tren inferior poderoso puede prevenir lesiones comunes.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Incremento de la estabilidad de las articulaciones</li>
                  <li>Mejora del equilibrio y la coordinación</li>
                  <li>Reducción del riesgo de lesiones deportivas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preparación y Calentamiento */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Preparación y Calentamiento para Rutina de Piernas
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Es fundamental preparar el cuerpo antes de realizar cualquier actividad física intensa. Un adecuado calentamiento favorecerá el rendimiento y reducirá el riesgo de lesiones.
          </p>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">🔄</div>
                <h3 className="font-bold text-xl mb-4 text-center">Movilidad Articular y Activación Muscular</h3>
                <p className="text-muted-foreground mb-4">
                  La movilidad articular es crucial para asegurar que las articulaciones puedan moverse sin restricciones. Esto no solo mejora el rendimiento, sino que también contribuye a evitar lesiones.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Movimientos circulares en rodillas y tobillos para aumentar la flexibilidad</li>
                  <li>Balanceos de piernas para preparar las articulaciones</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">⚡</div>
                <h3 className="font-bold text-xl mb-4 text-center">Ejercicios Previos para Activar Glúdeos y Cuádriceps</h3>
                <p className="text-muted-foreground mb-4">
                  La activación muscular se centra en activar los músculos que se utilizarán en la sesión.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Sentadillas sin peso: dos series de sentadillas profundas para calentar</li>
                  <li>Activaciones con bandas elásticas (band walk): enfoque en glúdeos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ancla para scroll suave */}
      <div id="video-piernas" className="relative -top-20"></div>

      {/* Video Principal */}
      <VideoWithStructure
        videoId="LleBD7YMt9o"
        videoTitle="🎬 Entrenamiento de Glúteos y Piernas Completo"
        videoDescription="Rutina completa para trabajar tu tren inferior de forma efectiva con peso corporal y sin material."
        insights={[
          "Ejercicios específicos para glúteos y piernas",
          "No requiere material adicional",
          "Ideal para entrenar en casa o parque",
          "Trabajo unilateral y bilateral"
        ]}
        nivel="Intermedio"
        zonaMuscular="Piernas"
        material="Peso corporal"
        formato={{
          calentamiento: {
            ejercicios: 3,
            intensidad: "Moderada"
          },
          partePrincipal: {
            series: 3,
            descripcion: "Por ejercicio"
          },
          tempo: {
            activo: "40s",
            descanso: "20s"
          }
        }}
        estimulos={[
          "💪 Fuerza del tren inferior",
          "🔥 Activación de glúdeos",
          "⚡ Estabilidad y equilibrio"
        ]}
        detalles="Esta rutina trabaja de manera integral todo el tren inferior, con especial énfasis en glúteos y cuádriceps. Perfecta para desarrollar fuerza y mejorar la estética muscular."
      />

      {/* Rutina de Piernas en Casa */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Rutina de Piernas en Casa: Entrena Sin Excusas
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Entrenar piernas en casa es totalmente posible y muy efectivo. Con tu peso corporal, mancuernas o bandas elásticas, puedes lograr resultados impresionantes.
          </p>

          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-6 text-center">Ejercicios Clave</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">1</Badge>
                    <div>
                      <h4 className="font-semibold mb-1">Sentadillas profundas sin peso</h4>
                      <p className="text-sm text-muted-foreground">Base fundamental para desarrollar cuádriceps y glúteos</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">2</Badge>
                    <div>
                      <h4 className="font-semibold mb-1">Zancadas adelante y atrás</h4>
                      <p className="text-sm text-muted-foreground">Trabajo unilateral para equilibrio y fuerza</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">3</Badge>
                    <div>
                      <h4 className="font-semibold mb-1">Puente de glúdeos o hip thrust en el suelo</h4>
                      <p className="text-sm text-muted-foreground">Activación intensa de glúteos e isquiotibiales</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">4</Badge>
                    <div>
                      <h4 className="font-semibold mb-1">Elevaciones de gemelos</h4>
                      <p className="text-sm text-muted-foreground">De pie o en escalón para trabajar pantorrillas</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">5</Badge>
                    <div>
                      <h4 className="font-semibold mb-1">Band walks con bandas elásticas</h4>
                      <p className="text-sm text-muted-foreground">Activación específica de glúteo medio</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold mb-2">💡 Sugerencia de Entrenamiento:</p>
                  <p className="text-sm text-muted-foreground">
                    Realiza 3 a 4 vueltas al circuito, con 12-15 repeticiones por ejercicio y descansos de 45-60 segundos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Entrenamiento en Gimnasio */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Entrenamiento en Gimnasio: Ejercicios con Barra y Máquina
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            En el gimnasio, se dispone de una variedad de equipos que permiten realizar ejercicios específicos para fortalecer las piernas
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">Sentadillas con Barra y Técnica Correcta</h3>
                <p className="text-muted-foreground mb-4">
                  Las sentadillas con barra son un pilar del entrenamiento de piernas. Mantener la espalda recta y bajar hasta que los muslos estén paralelos al suelo es esencial para maximizar el desarrollo muscular y minimizar lesiones.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-semibold mb-1">Músculos principales</p>
                    <p className="text-sm text-muted-foreground">Cuádriceps, glúteos, core</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-semibold mb-1">Series recomendadas</p>
                    <p className="text-sm text-muted-foreground">4-5 series</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="font-semibold mb-1">Repeticiones</p>
                    <p className="text-sm text-muted-foreground">6-12 reps</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">Prensa de Piernas y Carga Adecuada</h3>
                <p className="text-muted-foreground">
                  Trabaja cuádriceps, glúdeos e isquiotibiales. Ajusta la carga para mantener una técnica óptima y evitar lesiones en la espalda baja.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">Curl Femoral y Trabajo de Isquiotibiales</h3>
                <p className="text-muted-foreground">
                  Fortalece los isquiotibiales con un movimiento controlado y efectivo. Fundamental para equilibrar el desarrollo muscular y prevenir lesiones.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rutina en el Parque */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Rutina de Piernas en el Parque: Entreno Funcional y al Aire Libre
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Aprovecha bancos, barras y tu propio peso para un entrenamiento completo en el parque
          </p>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-6 text-center">Ejercicios Sugeridos</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🏃</span>
                      <div>
                        <h4 className="font-semibold mb-1">Sentadillas al aire con salto</h4>
                        <p className="text-sm text-muted-foreground">Desarrolla potencia explosiva</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🚶</span>
                      <div>
                        <h4 className="font-semibold mb-1">Zancadas caminando o alternadas</h4>
                        <p className="text-sm text-muted-foreground">Trabajo dinámico y funcional</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📦</span>
                      <div>
                        <h4 className="font-semibold mb-1">Step-ups en banco</h4>
                        <p className="text-sm text-muted-foreground">Unilateral y efectivo</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🍑</span>
                      <div>
                        <h4 className="font-semibold mb-1">Fondos de glúteos en banco</h4>
                        <p className="text-sm text-muted-foreground">Activación de glúteos e isquios</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⬆️</span>
                      <div>
                        <h4 className="font-semibold mb-1">Saltos al cajón o escalón seguro</h4>
                        <p className="text-sm text-muted-foreground">Pliometría para potencia</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold mb-2">💡 Tip Profesional:</p>
                  <p className="text-sm text-muted-foreground">
                    Intercala cardio como jumping jacks o trotes para un trabajo integral que combine fuerza y resistencia.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ejercicios Principales Detallados */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Ejercicios Fundamentales según Grupos Musculares
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Ejercicios clave organizados por grupo muscular para un desarrollo completo y equilibrado
          </p>

          <div className="max-w-6xl mx-auto space-y-12">
            {/* Cuádriceps */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Cuádriceps 🦵</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ExerciseCard
                  number={1}
                  title="Sentadillas Profundas"
                  emoji="💪"
                  targetMuscles="Cuádriceps, glúteos, core"
                  sets={4}
                  reps="15-25"
                  description="Baja hasta que glúteos toquen pantorrillas. Mantén pecho arriba y talones en el suelo. El ejercicio rey para piernas."
                />
                <ExerciseCard
                  number={2}
                  title="Pistol Squats"
                  emoji="🦵"
                  targetMuscles="Cuádriceps, glúteos, equilibrio"
                  sets={3}
                  reps="5-10 por pierna"
                  description="El rey de los ejercicios de piernas en calistenia. Empieza con ayuda o variantes asistidas hasta dominar el movimiento."
                />
                <ExerciseCard
                  number={3}
                  title="Prensa de Piernas"
                  emoji="🏋️"
                  targetMuscles="Cuádriceps, glúteos"
                  sets={3}
                  reps="10-15"
                  description="Perfecto para trabajar con carga pesada de forma segura. Controla el descenso y empuja con todo el pie."
                />
                <ExerciseCard
                  number={4}
                  title="Extensiones de Cuádriceps"
                  emoji="⚡"
                  targetMuscles="Aislamiento de cuádriceps"
                  sets={3}
                  reps="12-15"
                  description="Ejercicio de aislamiento para refinar y desarrollar el vasto medial. Movimiento controlado y concentrado."
                />
              </div>
            </div>

            <Separator className="my-12" />

            {/* Isquiotibiales */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Isquiotibiales 🏃</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ExerciseCard
                  number={1}
                  title="Nordic Curls"
                  emoji="🔥"
                  targetMuscles="Isquiotibiales (excéntrico fuerte)"
                  sets={3}
                  reps="5-8"
                  description="Arrodillado, alguien sujeta tus tobillos. Baja el torso controladamente hacia adelante. Uno de los mejores ejercicios para isquios."
                />
                <ExerciseCard
                  number={2}
                  title="Curl Femoral"
                  emoji="💪"
                  targetMuscles="Isquiotibiales"
                  sets={3}
                  reps="10-15"
                  description="En máquina o con bandas elásticas. Movimiento controlado enfocándose en la contracción del músculo."
                />
                <ExerciseCard
                  number={3}
                  title="Peso Muerto Rumano"
                  emoji="🏋️"
                  targetMuscles="Isquiotibiales, glúteos, espalda baja"
                  sets={3}
                  reps="8-12"
                  description="Mantén las piernas semi-flexionadas. Baja la barra controladamente sintiendo el estiramiento en isquios."
                />
              </div>
            </div>

            <Separator className="my-12" />

            {/* Glúteos */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Glúteos 🍑</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ExerciseCard
                  number={1}
                  title="Hip Thrust"
                  emoji="🍑"
                  targetMuscles="Glúteos e isquiotibiales"
                  sets={3}
                  reps="12-15"
                  description="El ejercicio más efectivo para glúteos. Apoya la espalda alta en un banco y empuja las caderas hacia arriba."
                />
                <ExerciseCard
                  number={2}
                  title="Zancadas Búlgaras"
                  emoji="🦵"
                  targetMuscles="Cuádriceps, glúteos (trabajo unilateral)"
                  sets={3}
                  reps="12-15 por pierna"
                  description="Pie trasero elevado en banco. Baja hasta rodilla casi toca el suelo. Excelente para equilibrio y desarrollo unilateral."
                />
                <ExerciseCard
                  number={3}
                  title="Peso Muerto"
                  emoji="💥"
                  targetMuscles="Glúteos, isquiotibiales, espalda"
                  sets={4}
                  reps="5-10"
                  description="Movimiento compuesto fundamental. Mantén la espalda recta y empuja con los talones."
                />
              </div>
            </div>

            <Separator className="my-12" />

            {/* Gemelos */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Gemelos y Pantorrillas 🦿</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ExerciseCard
                  number={1}
                  title="Elevaciones de Pie"
                  emoji="⬆️"
                  targetMuscles="Gastrocnemio"
                  sets={3}
                  reps="15-20"
                  description="De pie, eleva los talones lo más alto posible. Contrae en la parte superior del movimiento."
                />
                <ExerciseCard
                  number={2}
                  title="Elevaciones Sentado"
                  emoji="💺"
                  targetMuscles="Sóleo"
                  sets={3}
                  reps="15-20"
                  description="Sentado con peso en las rodillas. Trabaja el sóleo, músculo profundo de la pantorrilla."
                />
                <ExerciseCard
                  number={3}
                  title="Calf Raises a Una Pierna"
                  emoji="🦿"
                  targetMuscles="Pantorrillas (gastrocnemios y sóleo)"
                  sets={3}
                  reps="15-20 por pierna"
                  description="De pie en un escalón, eleva talón lo más alto posible. Baja hasta sentir estiramiento completo."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrenamiento Combinado Glúteos y Piernas */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Entrenamiento Combinado para Glúteos y Piernas en Gym
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La combinación de ejercicios para glúteos y piernas proporciona un enfoque equilibrado, favoreciendo un desarrollo armónico
          </p>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg">
                    <h4 className="font-bold text-lg mb-3">✨ Ejercicios Clave para la Combinación</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>Hip thrust:</strong> para glúdeos e isquiotibiales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>Variantes de zancadas y sentadillas:</strong> laterales, invertidas, front squats</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>Prensa de piernas:</strong> con diferentes posiciones de pies para enfocar glúteos</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Técnicas y Progresiones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Técnicas y Progresiones para Aumentar Fuerza y Volumen
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Estrategias efectivas para maximizar tus ganancias de fuerza y masa muscular
          </p>

          <div className="max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4">📊 Volumen de Entrenamiento</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong>Series:</strong> 3 a 5 por ejercicio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong>Repeticiones:</strong> 6 a 12 para hipertrofia</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong>Aumento progresivo del peso:</strong> +5-10% si dominas la técnica</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4">🎯 Principios de Progresión</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong>Periodización:</strong> alterna intensidad y volumen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong>Técnica perfecta:</strong> controla cada repetición, sin impulsos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span><strong>Sobrecarga progresiva:</strong> aumenta peso, reps o series gradualmente</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Frecuencia y Planificación */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Frecuencia y Planificación Semanal del Entrenamiento
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Cómo estructurar tu semana de entrenamiento para optimizar resultados y recuperación
          </p>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">📅</div>
                <h3 className="font-bold text-xl mb-4 text-center">Frecuencia Semanal</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>2 a 3 sesiones semanales</strong> es lo óptimo para la mayoría</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Deja al menos <strong>48 horas de descanso</strong> entre sesiones de piernas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Combina ejercicios compuestos y de aislamiento</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4 text-center">🔄</div>
                <h3 className="font-bold text-xl mb-4 text-center">Recuperación Activa</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Días intensos alternados con días de recuperación activa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Movilidad y estiramientos</strong> en días de descanso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Caminatas ligeras para mejorar la circulación</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Errores Comunes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Errores Comunes y Cómo Evitarlos
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Aprende a identificar y corregir los errores más frecuentes en el entrenamiento de piernas
          </p>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="border-red-200 dark:border-red-900">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">❌</span>
                  <div>
                    <h4 className="font-bold text-lg mb-2">No Calentar Adecuadamente</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Entrar directo a sentadillas pesadas sin preparar las articulaciones es receta para lesiones.
                    </p>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900">
                      <p className="text-sm"><strong className="text-green-700 dark:text-green-400">✓ Solución:</strong> 5-10 minutos de movilidad + activación muscular</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-900">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">❌</span>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Mala Postura en Sentadillas</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Rodillas hacia dentro, espalda redondeada o talones levantados comprometen la efectividad y seguridad.
                    </p>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900">
                      <p className="text-sm"><strong className="text-green-700 dark:text-green-400">✓ Solución:</strong> Filma tu técnica, reduce peso y practica la forma correcta</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-900">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">❌</span>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Sobrecarga sin Dominar la Técnica</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Añadir peso antes de tener una técnica sólida genera compensaciones y lesiones.
                    </p>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900">
                      <p className="text-sm"><strong className="text-green-700 dark:text-green-400">✓ Solución:</strong> Perfecciona la forma con peso corporal primero</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-900">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">❌</span>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Ignorar el Descanso</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Entrenar piernas todos los días impide la recuperación y el crecimiento muscular.
                    </p>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900">
                      <p className="text-sm"><strong className="text-green-700 dark:text-green-400">✓ Solución:</strong> Respeta 48-72h de descanso entre sesiones intensas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Monitorización */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Monitorización y Evaluación del Progreso
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Trackea tu progreso para asegurar que estás avanzando hacia tus objetivos
          </p>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <span>📝</span>
                      <span>Registro de Entrenamiento</span>
                    </h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Anota pesos, repeticiones y series en cada sesión</li>
                      <li>• Registra cómo te sientes (energía, dolor, fatiga)</li>
                      <li>• Documenta cambios en la técnica o variantes</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <span>📊</span>
                      <span>Evaluaciones de Fuerza</span>
                    </h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Prueba tu 1RM cada 8-12 semanas</li>
                      <li>• Evalúa progresión en pistol squats</li>
                      <li>• Mide circunferencia de muslos cada mes</li>
                    </ul>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h5 className="font-semibold mb-2">🔧 Ajustes Progresivos</h5>
                    <p className="text-sm text-muted-foreground">
                      Si no progresas en 2-3 semanas, ajusta carga, volumen o frecuencia. Escucha a tu cuerpo y modifica según sea necesario.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h5 className="font-semibold mb-2">😴 Reconocimiento de Fatiga</h5>
                    <p className="text-sm text-muted-foreground">
                      Si experimentas fatiga persistente, dolor articular o estancamiento, toma una semana de descarga con menor volumen e intensidad.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conclusión */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-orange-950/20 dark:via-red-950/20 dark:to-yellow-950/20 border-2 border-primary/20">
              <CardContent className="p-8">
                <h2 className="font-display font-bold text-3xl mb-4">
                  Construye Piernas de Acero 💪
                </h2>
                <p className="text-muted-foreground mb-6">
                  Esta guía es tu base para construir un tren inferior fuerte, funcional y estético. Ya sea que entrenes en casa, en el gym o al aire libre, lo importante es que sigas progresando con disciplina, técnica y constancia.
                </p>
                <p className="font-bold text-lg text-primary">
                  ¡Vamos a por esas piernas de acero! 🔥🦵
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Galería de Videos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <VideoGallery 
            videos={getVideosByIds(allVideos, [
              'RH7wEFKQ95M', // Pistol squat progresión
              'LleBD7YMt9o', // Entrenamiento glúteos
              'IWqIZk3hF14', // Full body principiantes (incluye piernas)
              'TW7Yf6G-Tbk', // Pino (trabajo de equilibrio útil para pistol squats)
              'Q6s7yUEA3N4', // Calentamiento (importante para piernas)
              'q2sf_TqNTIQ'  // Postura (relacionado con piernas)
            ])}
            title="📹 Videos de Entrenamiento de Piernas"
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
              Construye <span className="text-primary">Piernas de Acero</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Domina pistol squats, nordic curls y todos los ejercicios avanzados para tren inferior. Programas completos para desarrollar fuerza, potencia y estética en tus piernas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🦵</div>
                  <h3 className="font-bold mb-2">Progresiones Completas</h3>
                  <p className="text-sm text-muted-foreground">Desde sentadillas básicas hasta pistol squats</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-bold mb-2">Potencia Explosiva</h3>
                  <p className="text-sm text-muted-foreground">Ejercicios pliométricos y balísticos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">💪</div>
                  <h3 className="font-bold mb-2">Fuerza Funcional</h3>
                  <p className="text-sm text-muted-foreground">Desarrollo equilibrado de todo el tren inferior</p>
                </CardContent>
              </Card>
            </div>
            
            <Button size="lg" className="bg-gradient-primary" asChild>
              <Link to="/programas">Acceder a Programas de Piernas</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default RutinaPiernas;
