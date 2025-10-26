import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByZone } from "@/lib/videoUtils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoWithStructure from "@/components/VideoWithStructure";
import RoutineHero from "@/components/routine/RoutineHero";
import QuickJumpBanner from "@/components/QuickJumpBanner";

const RutinaCore = () => {
  const coreVideos = getVideosByZone(allVideos, 'Core', { limit: 6, sortBy: 'engagement' });

  return (
    <>
      <Helmet>
        <title>Rutina Core Calistenia: Fortalece tu Centro con Ejercicios Funcionales | Calistenia Online</title>
        <meta name="description" content="Rutina core completa con ejercicios de calistenia para fortalecer tu zona media. Mejora estabilización, postura y previene lesiones con planificación semanal efectiva." />
        <meta name="keywords" content="rutina core, core ejercicios, que es el core, estabilización core, fuerza funcional, transverso abdominal, plancha core, entrenamiento funcional" />
        <link rel="canonical" href="https://calisthenia.online/rutina-core-calistenia" />
        
        <meta property="og:title" content="Rutina Core Calistenia: Ejercicios para Fortalecer tu Centro" />
        <meta property="og:description" content="Fortalece tu core con ejercicios funcionales. Mejora estabilización, postura y previene lesiones." />
        <meta property="og:image" content="https://calisthenia.online/assets/calisthenia-core.webp" />
        <meta property="og:url" content="https://calisthenia.online/rutina-core-calistenia" />
        <meta property="og:type" content="article" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ExercisePlan",
            "name": "Rutina Core Calistenia",
            "description": "Plan completo de entrenamiento core funcional con calistenia para fortalecer la zona media, mejorar estabilización y prevenir lesiones",
            "activityFrequency": "3-4 times per week",
            "exerciseType": "Functional Core Training"
          })}
        </script>
      </Helmet>

      <Header />

      <RoutineHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rutinas", href: "/programas" },
          { label: "Rutina Core", href: "/rutina-core-calistenia" }
        ]}
        title="Rutina de"
        titleHighlight="Core"
        emoji="Calistenia 💪"
        description="Una rutina bien diseñada para el core es clave para transformar tu estilo de vida. Al fortalecer el centro del cuerpo no solo mejoras el aspecto estético, sino que aumentas tu funcionalidad global, mejoras la postura y te proteges de lesiones."
        nivel="Todos los Niveles"
        duracion="15-40 min"
        lugar="Casa/Parque"
        gradientFrom="from-emerald-50"
        gradientTo="to-teal-50"
      />

      <QuickJumpBanner 
        text="¿Quieres ir directo a la rutina práctica?"
        linkText="Ver Rutina en Video"
        href="#video-rutina"
        icon="🎯"
        variant="primary"
      />

      {/* La importancia de un core fuerte */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              La importancia de un <span className="text-primary">core fuerte</span> en tu entrenamiento
            </h2>
            <p className="text-lg text-muted-foreground">
              Tener un centro sólido es imprescindible para tu rendimiento y bienestar. Un core bien desarrollado no solo aporta estética, también cumple un papel esencial en tu día a día y en tu entrenamiento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-xl mb-3">Función del core en postura y movimiento</h3>
                <p className="text-muted-foreground mb-4">
                  El core —que abarca los músculos del abdomen, la zona lumbar, los oblicuos y la pelvis— actúa como estabilizador central del cuerpo. Cuando estos músculos trabajan en armonía, mejoran tu equilibrio, tu coordinación y la postura.
                </p>
                <p className="text-sm text-muted-foreground italic">Referencia: Mayo Clinic</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-bold text-xl mb-3">Relación entre zona lumbar, espalda recta y core</h3>
                <p className="text-muted-foreground mb-4">
                  El vínculo entre una zona lumbar protegida y unos abdominales activos es fundamental para evitar lesiones. Mantener una espalda recta y una buena alineación gracias a un core sólido favorece la ejecución segura de cualquier movimiento.
                </p>
                <p className="text-sm text-muted-foreground italic">Referencia: Harvard Health</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="font-bold text-xl mb-3">Prevención de lesiones mediante fuerza muscular</h3>
                <p className="text-muted-foreground mb-4">
                  Un core fuerte no es solo "bueno para ver". Es un requisito para reducir cargas innecesarias en la espalda baja, estabilizar la pelvis y asegurar que los músculos activos compartan el trabajo de forma adecuada.
                </p>
                <p className="text-sm text-muted-foreground italic">Referencia: Heart Research Institute</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Ejercicios */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              Core Ejercicios: <span className="text-primary">Fortalece tu Centro</span> Paso a Paso
            </h2>
            <p className="text-lg text-muted-foreground">
              Aquí tienes una excelente selección de ejercicios para trabajar el centro desde distintos ángulos y niveles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Plancha */}
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">🔥</span>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Planchas (Isométricas y Variantes)</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Core completo</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">3-4 series</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">30-60s</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  La plancha es esencial: activa múltiples músculos del core al mismo tiempo y exige control corporal. Variante: plancha lateral para enfatizar los oblicuos.
                </p>
                <p className="text-sm text-primary font-medium">
                  💡 Técnica: Cuida que la cadera no se hunda ni se eleve excesivamente. Mantén tensión constante en el abdomen.
                </p>
              </CardContent>
            </Card>

            {/* Dead Bug */}
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">🐛</span>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Dead Bug (Insecto Muerto)</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Control lumbo-pélvico</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">3 series</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">10-12/lado</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  Ejercicio fundamental para coordinación, control lumbo-pélvico y anti-extensión. Perfecto para principiantes.
                </p>
                <p className="text-sm text-primary font-medium">
                  💡 Técnica: Espalda pegada al suelo, extiende brazo y pierna opuestos de forma controlada. Mantén la zona lumbar neutra.
                </p>
              </CardContent>
            </Card>

            {/* Bird Dog */}
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">🦅</span>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Bird Dog (Perro-Pájaro)</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Estabilización cruzada</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">3 series</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">10-12/lado</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  Excelente para equilibrio, estabilización cruzada y fortalecimiento de erectores espinales.
                </p>
                <p className="text-sm text-primary font-medium">
                  💡 Técnica: Desde cuadrupedia, extiende brazo y pierna opuestos manteniendo la espalda recta. Evita rotación de cadera.
                </p>
              </CardContent>
            </Card>

            {/* Hollow Body */}
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Hollow Body Hold</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Core completo</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">3-4 series</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">20-40s</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  Core completo en tensión máxima. Preparación esencial para skills avanzados de calistenia como front lever.
                </p>
                <p className="text-sm text-primary font-medium">
                  💡 Técnica: Zona lumbar pegada al suelo, piernas y brazos extendidos. Mantén la tensión constante en todo el core.
                </p>
              </CardContent>
            </Card>

            {/* Mountain Climbers */}
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">⛰️</span>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Mountain Climbers</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Core + Cardio</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">3-4 series</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">30-45s</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  Excelente ejercicio híbrido: trabaja el core y eleva tu ritmo cardíaco al mismo tiempo.
                </p>
                <p className="text-sm text-primary font-medium">
                  💡 Técnica: Posición tipo flexión, espalda recta, rodillas hacia el pecho alternadas rápidas. Ideal: 30s actividad / 15s descanso.
                </p>
              </CardContent>
            </Card>

            {/* Giros Rusos */}
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">🌀</span>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Giros Rusos / Russian Twists</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Oblicuos</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">3 series</span>
                      <span className="text-xs bg-secondary/50 px-2 py-1 rounded">20 reps</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  Excelente para oblicuos, coordinación y rotación funcional. Añade dinamismo al entrenamiento del centro.
                </p>
                <p className="text-sm text-primary font-medium">
                  💡 Técnica: Espalda apoyada, piernas elevadas, gira el torso de lado a lado. Puedes añadir peso para mayor intensidad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video con Estructura */}
      <VideoWithStructure
        id="video-rutina"
        videoId="7kPvnjZwN9Q"
        videoTitle="Rutina Core Funcional: 10 Minutos de Estabilización"
        videoDescription="Rutina core de 10 minutos enfocada en fortalecer tu zona media con ejercicios funcionales de calistenia. Perfecta para todos los niveles."
        insights={[
          "Esta rutina enfatiza la estabilización funcional del core",
          "No busca 'quemar' los abdominales, sino fortalecer los músculos profundos",
          "Protege tu columna y mejora tu rendimiento en todos los movimientos",
          "Ideal para combinar con otros entrenamientos o hacer de forma independiente"
        ]}
        nivel="Principiante"
        zonaMuscular="Core"
        material="Sin equipamiento"
        formato={{
          calentamiento: {
            ejercicios: 3,
            intensidad: "Movilidad de cadera, rotaciones de torso, cat-cow"
          },
          partePrincipal: {
            series: 3,
            descripcion: "Plancha frontal 30s, Dead Bug 10/lado, Mountain climbers 30s, Plancha lateral 20s/lado, Hollow body 20s"
          },
          tempo: {
            activo: "Controlado, enfoque en tensión constante",
            descanso: "30-60s entre ejercicios"
          }
        }}
        estimulos={[
          "Estabilización anti-extensión",
          "Control lumbo-pélvico",
          "Fuerza isométrica del core",
          "Activación de transverso abdominal"
        ]}
        detalles="Esta rutina está diseñada para fortalecer los músculos profundos del core que son fundamentales para la estabilización y prevención de lesiones. A diferencia de ejercicios enfocados en estética, estos movimientos mejoran tu funcionalidad global."
      />

      {/* Banner a Rutina Abdominales */}
      <section className="py-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-y border-blue-200/50">
        <div className="container mx-auto px-4">
          <Link 
            to="/rutina-abdominales-calistenia"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 hover:opacity-90 transition-all group"
          >
            <span className="text-base sm:text-lg font-medium flex items-center gap-2 text-foreground">
              <span className="text-2xl">💎</span>
              ¿Buscas enfocarte en el six pack visible y abdominales definidos? Visita la página de Rutinas de Abdominales
            </span>
            <Button 
              variant="ghost" 
              className="gap-2 group-hover:gap-3 transition-all hover:bg-blue-500/10 hover:text-blue-600 border border-blue-200"
            >
              Ir a Rutina Abdominales
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Planificación Semanal */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              Planificación Semanal de <span className="text-primary">Core Funcional</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Diseñar una rutina para casa y adaptarla a tu nivel hace que el entrenamiento del centro sea práctico, eficiente y accesible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="font-bold text-xl mb-3">Frecuencia Recomendada</h3>
                <p className="text-muted-foreground">
                  <strong>2-3 sesiones semanales de core.</strong> Eso permite que los músculos se reparen y crezcan. Alterna grupos de músculos del centro en cada sesión (frontal, oblicuos, zona baja) para desarrollo equilibrado.
                </p>
                <p className="text-sm text-muted-foreground italic mt-3">Referencia: Harvard Health</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="font-bold text-xl mb-3">Progresiones para Incrementar Fuerza</h3>
                <p className="text-muted-foreground">
                  Puedes incrementar el tiempo en la plancha, añadir variantes, aumentar repeticiones o series. Ejemplo: comienza con plancha básica, luego avanza a plancha lateral, plancha con apoyo reducido, etc.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ejemplo de Rutina Semanal */}
          <div className="max-w-5xl mx-auto">
            <h3 className="font-bold text-2xl mb-6 text-center">Ejemplo de Rutina Semanal</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🔥</div>
                  <h4 className="font-bold text-lg mb-2">Día 1: Estabilidad + Cardio-Core</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Planchas: 30s</li>
                    <li>• Mountain climbers: 20s</li>
                    <li>• Dead Bug: 10 por lado</li>
                    <li>• Repetir 3-4 rondas</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">💪</div>
                  <h4 className="font-bold text-lg mb-2">Día 2: Fuerza del Core</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Hollow hold: 30s</li>
                    <li>• Bicicletas: 20 reps</li>
                    <li>• Bird Dog: 10 por lado</li>
                    <li>• Realizar 3-4 series</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🌀</div>
                  <h4 className="font-bold text-lg mb-2">Día 3: Oblicuos + Zona Baja</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Plancha lateral: 20s/lado</li>
                    <li>• Giros rusos: 20 reps</li>
                    <li>• Elevaciones piernas: 12 reps</li>
                    <li>• 3-4 series de cada</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Qué es el Core */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              Qué es el Core: <span className="text-primary">Más que Abdominales Visibles</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              El core es el conjunto de músculos que estabilizan el centro de tu cuerpo, no solo el "six pack" que se ve.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="font-bold text-xl mb-3">Músculos que Componen el Core</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Recto abdominal (six pack visible)</li>
                  <li>✓ Transverso abdominal (faja natural profunda)</li>
                  <li>✓ Oblicuos internos y externos</li>
                  <li>✓ Erectores espinales</li>
                  <li>✓ Multífidos</li>
                  <li>✓ Suelo pélvico</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="font-bold text-xl mb-3">Diferencia: Core vs Abdominales</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Aspecto</th>
                        <th className="text-left py-2">Core</th>
                        <th className="text-left py-2">Abdominales</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b">
                        <td className="py-2 font-medium">Enfoque</td>
                        <td className="py-2">Funcional</td>
                        <td className="py-2">Estético</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 font-medium">Músculos</td>
                        <td className="py-2">Profundos + superficiales</td>
                        <td className="py-2">Recto + oblicuos</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Objetivo</td>
                        <td className="py-2">Estabilización</td>
                        <td className="py-2">Six pack</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="font-bold text-xl mb-3">Beneficios de un Core Fuerte</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Mejor postura y alineación</li>
                  <li>✓ Prevención de dolor lumbar</li>
                  <li>✓ Mayor rendimiento en ejercicios</li>
                  <li>✓ Estabilidad en movimientos</li>
                  <li>✓ Base para skills avanzados</li>
                  <li>✓ Protección de columna</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Estrategias para Optimizar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              Maximiza tus <span className="text-primary">Resultados</span> en el Entrenamiento de Core
            </h2>
            <p className="text-lg text-muted-foreground">
              Para lograr un centro funcional y fuerte, no basta con hacer ejercicios: también hay que combinar entrenamiento con estilo de vida.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="font-bold text-xl mb-3">Entrenamiento Combinado</h3>
                <p className="text-muted-foreground">
                  Integrar trabajo de fuerza del core junto a cardio funcional mejora la definición del centro. El core se activa mejor cuando está integrado en movimientos globales, no aislados.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-xl mb-3">Mitos sobre la Grasa Abdominal</h3>
                <p className="text-muted-foreground mb-3">
                  Hacer solo ejercicios de core <strong>NO garantiza</strong> perder la grasa localizada en esta zona. La pérdida de grasa es un asunto global: dieta + entrenamiento + descanso.
                </p>
                <p className="text-sm text-muted-foreground italic">Referencia: Harvard Health</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🥗</div>
                <h3 className="font-bold text-xl mb-3">Alimentación y Estilo de Vida</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>✓ Proteínas para recuperación</li>
                  <li>✓ Carbohidratos complejos para energía</li>
                  <li>✓ Grasas saludables para salud general</li>
                  <li>✓ Hidratación fundamental</li>
                  <li>✓ Descanso para reparación muscular</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Técnica Correcta */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              Técnica Correcta en <span className="text-primary">Ejercicios de Core</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Una correcta ejecución marca la diferencia entre progresar y quedarte estancado o lesionarte.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="postura" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧘</span>
                    <span className="font-bold">Posición Neutra de Columna</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  Mantén la espalda en posición neutra durante los ejercicios del core. Evita que la zona lumbar se arquee o se despegue del suelo en movimientos como crunches o hollow body. Una columna neutral protege tus discos vertebrales.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="respiracion" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💨</span>
                    <span className="font-bold">Respiración y Activación</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  Controla la respiración: exhala al contraer el centro y mantén la tensión muscular durante el movimiento. La respiración diafragmática activa el transverso abdominal, que es la faja natural del cuerpo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="intensidad" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <span className="font-bold">Intensidad Adecuada</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  Asegúrate de que las series sean lo suficientemente desafiantes (15-30 repeticiones o tiempos adecuados), y descansa entre 30-60s para recuperación. Si puedes hacer más de 30 repeticiones fácilmente, aumenta la dificultad.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="progresion" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📈</span>
                    <span className="font-bold">Progresión Gradual</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  No saltes niveles. Domina la plancha básica antes de intentar variantes avanzadas. La técnica siempre antes que la intensidad. Una progresión sólida evita lesiones y maximiza resultados.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="compensaciones" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <span className="font-bold">Evita Compensaciones</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  Si tu cadera se hunde en la plancha o tu espalda se arquea en hollow hold, es señal de que necesitas reducir la intensidad o descansar. Las compensaciones generan malos patrones de movimiento y pueden causar lesiones.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Ejercicios Complementarios */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              Variaciones y <span className="text-primary">Ejercicios Complementarios</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Un centro fuerte va más allá del abdomen: involucra glúteos, espalda baja, estabilidad de pelvis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🍑</div>
                <h3 className="font-bold text-xl mb-3">Glute Bridge (Puente de Glúteos)</h3>
                <p className="text-muted-foreground">
                  Activa glúteos y parte posterior, refuerza la zona lumbar. Un core fuerte incluye la cadena posterior. Ejercicio esencial para equilibrar el trabajo del core.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🔺</div>
                <h3 className="font-bold text-xl mb-3">L-Sit Progresiones</h3>
                <p className="text-muted-foreground">
                  Para nivel avanzado. Core en tensión máxima + flexores de cadera. Preparación para front lever y otros skills avanzados de calistenia.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-xl mb-3">Pallof Press (con banda elástica)</h3>
                <p className="text-muted-foreground">
                  Anti-rotación funcional. Fortalece oblicuos y mejora la estabilidad en movimientos deportivos. Excelente para prevenir lesiones en deportes de rotación.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🏋️</div>
                <h3 className="font-bold text-xl mb-3">Ejercicios Funcionales Compuestos</h3>
                <p className="text-muted-foreground">
                  Sentadillas, peso muerto, ejercicios de estabilidad. El core se activa de forma natural en movimientos globales. Integra el core en tu rutina completa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              Preguntas Frecuentes sobre <span className="text-primary">Entrenamiento de Core</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="resultados" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-bold">¿Cuánto tiempo para ver resultados en el core?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  Con entrenamiento constante (3x semana) y alimentación adecuada, verás mejoras en fuerza y estabilidad en 4-6 semanas. La definición visible depende de tu porcentaje de grasa corporal, que se reduce principalmente con dieta.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="frecuencia" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-bold">¿Puedo entrenar core todos los días?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  No es recomendable. El core necesita 48h de recuperación como cualquier grupo muscular. 3-4 días a la semana es óptimo. Trabajo ligero de activación se puede hacer diariamente (5-10 min).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="equipamiento" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-bold">¿Es necesario equipamiento para entrenar core?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  No. El peso corporal es suficiente para desarrollar un core fuerte. Bandas elásticas o discos pueden añadir variedad y progresión, pero no son imprescindibles. Tu cuerpo es la mejor herramienta.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="abdominales" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-bold">¿Core fuerte = abdominales visibles?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  No necesariamente. Un core fuerte se refiere a la capacidad funcional de estabilización y fuerza. Los abdominales visibles (six pack) dependen principalmente de tu porcentaje de grasa corporal (10-15% hombres, 15-20% mujeres), que se consigue con dieta.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dolor" className="bg-card rounded-lg px-6 border">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-bold">¿Los ejercicios de core quitan el dolor de espalda?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  Un core fuerte puede prevenir y reducir dolor lumbar al mejorar la estabilidad de la columna. Sin embargo, si tienes dolor crónico o agudo, consulta a un profesional de salud antes de entrenar. El core fortalecido es prevención, no tratamiento.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <VideoGallery 
            videos={coreVideos}
            title="Más Videos de Entrenamiento Core"
            showStats={true}
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default RutinaCore;
