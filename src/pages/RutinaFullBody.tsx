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
import VideoEmbed from "@/components/VideoEmbed";
import ExerciseCard from "@/components/routine/ExerciseCard";
import RoutineBreadcrumbs from "@/components/routine/RoutineBreadcrumbs";
import fullBodyImg from "@/assets/calisthenia-full-body.webp";

const RutinaFullBody = () => {
  return (
    <>
      <Helmet>
        <title>Rutina Full Body Calistenia: Ejercicios y Beneficios Esenciales</title>
        <meta 
          name="description" 
          content="Rutina full body de calistenia completa. Aprende ejercicios, beneficios, planificación y progresión para entrenar todo el cuerpo 3x/semana. Video guiado incluido." 
        />
        <meta 
          name="keywords" 
          content="rutina full body calistenia, ejercicios cuerpo completo, entrenamiento 3 días semana, calistenia en casa, beneficios full body" 
        />
        <link rel="canonical" href="https://calisthenia.online/rutina-full-body" />
        
        <meta property="og:title" content="Rutina Full Body Calistenia Completa" />
        <meta property="og:description" content="Entrena todo tu cuerpo con calistenia. Ejercicios, planificación y video guiado completo." />
        <meta property="og:image" content="https://calisthenia.online/assets/calisthenia-full-body.webp" />
        <meta property="og:url" content="https://calisthenia.online/rutina-full-body" />
        <meta property="og:type" content="article" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ExercisePlan",
            "name": "Rutina Full Body Calistenia",
            "description": "Plan completo de entrenamiento full body con calistenia",
            "activityFrequency": "3 times per week",
            "exerciseType": "Calisthenics",
            "video": {
              "@type": "VideoObject",
              "name": "Rutina Full Body Calistenia Completa",
              "embedUrl": "https://www.youtube.com/embed/PmkNJ7fQhPY"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-background">
        <div className="container mx-auto px-4">
          <RoutineBreadcrumbs 
            items={[
              { label: "Inicio", href: "/" },
              { label: "Programas", href: "/programas" },
              { label: "Rutina Full Body", href: "/rutina-full-body" }
            ]}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <div>
              <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6">
                Rutina <span className="text-primary">Full Body</span> Calistenia ⚡
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="secondary">💪 Todos los Niveles</Badge>
                <Badge variant="secondary">⏱️ 30-60 min</Badge>
                <Badge variant="secondary">🔄 3x/semana</Badge>
                <Badge variant="secondary">📍 Casa/Parque</Badge>
              </div>
              
              <p className="text-xl text-muted-foreground mb-8">
                La rutina full body en calistenia es un enfoque de entrenamiento que trabaja todos los grupos musculares en una sola sesión. Desarrolla fuerza, resistencia y equilibrio muscular usando únicamente tu peso corporal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <a href="#video-principal">Ver Video Completo</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/programas">Ver Programas</Link>
                </Button>
              </div>
            </div>
            
            <div>
              <img 
                src={fullBodyImg} 
                alt="Persona realizando ejercicios de calistenia full body: dominadas, fondos y sentadillas al aire libre" 
                className="rounded-xl shadow-elegant"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fundamentos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Fundamentos de la Calistenia Full Body
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La calistenia full body se centra en el uso del propio peso corporal para trabajar todos los músculos en una misma sesión.
          </p>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">¿Qué es una rutina full body en calistenia?</h3>
                <p className="text-muted-foreground mb-4">
                  Este enfoque de entrenamiento abarca ejercicios que implican el esfuerzo de múltiples grupos musculares, optimizando el tiempo y el rendimiento. En lugar de dividir los entrenamientos por áreas específicas, la rutina full body busca integrar diferentes movimientos en sesiones compactas.
                </p>
                <p className="text-muted-foreground">
                  Así, es posible lograr un trabajo más completo y armónico en el cuerpo, favoreciendo el desarrollo funcional y la capacidad aeróbica.
                </p>
              </CardContent>
            </Card>

            {/* Grupos Musculares */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Grupos Musculares Implicados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { emoji: "💯", title: "Pecho", desc: "Implicado en movimientos como las flexiones y fondos" },
                  { emoji: "🦾", title: "Espalda", desc: "Fortalecido a través de dominadas y ejercicios de tracción" },
                  { emoji: "🦵", title: "Piernas", desc: "Trabajadas con sentadillas y variaciones, así como ejercicios de extensión y elevación" },
                  { emoji: "🔥", title: "Abdominales", desc: "Activados durante la mayoría de los ejercicios, contribuyendo a la estabilización del core" },
                  { emoji: "🤸", title: "Hombros", desc: "Activados en ejercicios de empuje como las flexiones y los fondos" }
                ].map((muscle, i) => (
                  <Card key={i}>
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{muscle.emoji}</div>
                      <h4 className="font-bold text-lg mb-2">{muscle.title}</h4>
                      <p className="text-sm text-muted-foreground">{muscle.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-muted-foreground mt-6 text-center max-w-3xl mx-auto">
                En su conjunto, estos grupos musculares se activan de forma sinérgica, lo que resulta en un entrenamiento altamente efectivo y funcional. La calistenia full body no solo contribuye a desarrollar fuerza, sino que también mejora la coordinación y resistencia corporal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Ventajas de Entrenar el Cuerpo Completo
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Entrenar todos los grupos musculares en una única sesión presenta múltiples beneficios
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { emoji: "⚡", title: "Eficiencia de Tiempo", text: "Las sesiones son más cortas sin sacrificar la efectividad del entrenamiento. Ideal para agendas ocupadas." },
              { emoji: "💪", title: "Desarrollo Equilibrado", text: "Se evita el sobreentrenamiento de ciertas áreas, promoviendo un desarrollo muscular más armónico." },
              { emoji: "🔄", title: "Mayor Frecuencia", text: "Permite realizar entrenamientos con mayor regularidad, facilitando el avance continuo." },
              { emoji: "🎯", title: "Ajustes según Objetivos", text: "Las rutinas pueden adaptarse fácilmente a diferentes niveles de habilidad y metas personales." },
              { emoji: "🔥", title: "Quema de Calorías", text: "Al implicar grandes grupos musculares, se favorece la quema calórica y mejora la composición corporal." },
              { emoji: "🏃", title: "Desarrollo Funcional", text: "Mejora la coordinación, resistencia corporal y capacidad aeróbica de forma integral." }
            ].map((benefit, i) => (
              <Card key={i} className="hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{benefit.emoji}</div>
                  <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Principal */}
      <section id="video-principal" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              🎬 Sigue la Rutina Full Body Completa
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entrena conmigo siguiendo este video guiado. Incluye calentamiento y todos los ejercicios principales.
            </p>
          </div>
          
          <VideoEmbed 
            videoId="PmkNJ7fQhPY" 
            title="Rutina Full Body Calistenia Completa | Entrena Todo el Cuerpo"
          />
        </div>
      </section>

      {/* Estructura del Video */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Estructura de la Rutina
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-6 text-center">Formato del Entrenamiento</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔥</div>
                    <p className="text-sm text-muted-foreground mb-1">Calentamiento</p>
                    <p className="text-xl font-bold">5 ejercicios</p>
                    <p className="text-sm text-muted-foreground">Baja intensidad</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">💪</div>
                    <p className="text-sm text-muted-foreground mb-1">Parte Principal</p>
                    <p className="text-xl font-bold">3 series</p>
                    <p className="text-sm text-muted-foreground">Por ejercicio</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">⏱️</div>
                    <p className="text-sm text-muted-foreground mb-1">Tempo</p>
                    <p className="text-xl font-bold">30s / 30s</p>
                    <p className="text-sm text-muted-foreground">Activo / Descanso</p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h4 className="font-bold text-lg mb-4">🧠 Estímulos Trabajados:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['⚡ Fuerza', '💪 Resistencia muscular', '❤️ Activación cardiovascular'].map((e, i) => (
                    <div key={i} className="flex items-center gap-3 bg-background/50 p-3 rounded-lg">
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Planificación y Estructura */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Planificación y Estructura de la Rutina Full Body
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Una adecuada planificación y estructura son esenciales para maximizar los beneficios del entrenamiento.
          </p>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Calentamiento */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Calentamiento Adecuado para Calistenia</h3>
              <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
                El calentamiento es fundamental para preparar el cuerpo antes de un entrenamiento intenso. Una rutina de calentamiento adecuada reduce el riesgo de lesiones y mejora el rendimiento general.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4 text-center">🔄</div>
                    <h4 className="font-bold text-lg mb-3 text-center">Movilidad Articular</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      La movilidad articular permite que las articulaciones se muevan a través de su rango completo. Algunos movimientos recomendados son:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Círculos con los brazos</li>
                      <li>Rotaciones de cadera</li>
                      <li>Flexiones y extensiones de muñeca</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4 text-center">🏃</div>
                    <h4 className="font-bold text-lg mb-3 text-center">Estiramientos Dinámicos</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Los estiramientos dinámicos aumentan la temperatura muscular y la circulación sanguínea.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Elevaciones de rodillas</li>
                      <li>Giros del tronco</li>
                      <li>Zancadas caminando</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4 text-center">⚡</div>
                    <h4 className="font-bold text-lg mb-3 text-center">Activación Muscular</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Incluye movimientos específicos que activan los músculos que se van a utilizar en la rutina.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Serie ligera de flexiones</li>
                      <li>Sentadillas de activación</li>
                      <li>Colgadas activas en barra</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Distribución Series y Reps */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Distribución de Series, Repeticiones y Descansos</h3>
              
              <Card className="mb-6">
                <CardContent className="p-8">
                  <h4 className="font-bold text-lg mb-4 text-center">Volumen de Entrenamiento según el Nivel</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Nivel</th>
                          <th className="text-center py-3 px-4">Series</th>
                          <th className="text-center py-3 px-4">Repeticiones</th>
                          <th className="text-center py-3 px-4">Descanso</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b">
                          <td className="py-3 px-4 font-semibold">🌱 Principiante</td>
                          <td className="text-center py-3 px-4">2-3</td>
                          <td className="text-center py-3 px-4">8-12</td>
                          <td className="text-center py-3 px-4">60-90s</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-semibold">💪 Intermedio</td>
                          <td className="text-center py-3 px-4">4-5</td>
                          <td className="text-center py-3 px-4">10-15</td>
                          <td className="text-center py-3 px-4">30-60s</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-semibold">⚡ Avanzado</td>
                          <td className="text-center py-3 px-4">5-6</td>
                          <td className="text-center py-3 px-4">12+</td>
                          <td className="text-center py-3 px-4">30-45s</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enfriamiento */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Enfriamiento y Estiramientos para la Recuperación</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-3xl mx-auto">
                El enfriamiento es un paso crucial que a menudo se pasa por alto. Finalizar eficazmente el entrenamiento ayudará a la recuperación y a prevenir la rigidez muscular.
              </p>
              
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-3">Estiramientos Estáticos Recomendados:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span><strong>Cuádriceps:</strong> 30-60 segundos por pierna</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span><strong>Isquiotibiales:</strong> 30-60 segundos por pierna</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span><strong>Hombros y brazos:</strong> 20-30 segundos por lado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span><strong>Espalda y pecho:</strong> 30-45 segundos</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong className="block mb-2 text-foreground">💡 Consejo:</strong>
                        Invertir tiempo en el enfriamiento contribuye a un proceso de recuperación más efectivo y permite que el cuerpo vuelva a su estado de reposo de manera gradual.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Ejercicios Clave */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Ejercicios Clave en una Rutina Full Body Calistenia
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La inclusión de ejercicios estratégicos es fundamental para trabajar el cuerpo completo y promover un desarrollo equilibrado.
          </p>

          <div className="max-w-5xl mx-auto space-y-16">
            {/* Ejercicios de Empuje */}
            <div>
              <h3 className="font-bold text-2xl mb-8 flex items-center gap-3">
                <span className="text-4xl">🚀</span>
                Ejercicios de Empuje
              </h3>
              <p className="text-muted-foreground mb-8">
                Los movimientos de empuje son cruciales para potenciar la fuerza del tren superior, especialmente pectorales, tríceps y hombros.
              </p>

              <div className="space-y-6">
                <ExerciseCard
                  number={1}
                  title="Flexiones y Variantes"
                  emoji="💪"
                  targetMuscles="Pecho, Tríceps, Hombros"
                  sets={3-4}
                  reps="10-20"
                  description="Las flexiones son un ejercicio clásico y versátil. Se pueden realizar en varias variantes, siendo las flexiones pronadas las más comunes. Estas trabajan el pecho y los tríceps de manera efectiva."
                  variations={[
                    "Flexiones pronadas: Ejercicio clásico para pecho y tríceps",
                    "Pike push-ups: Con el cuerpo en posición de 'V', enfocan más en los hombros",
                    "Flexiones diamante: Mayor énfasis en tríceps",
                    "Flexiones amplias: Mayor trabajo de pecho"
                  ]}
                />

                <ExerciseCard
                  number={2}
                  title="Fondos en Paralelas y en Barra"
                  emoji="⚡"
                  targetMuscles="Pectoral mayor, Tríceps, Deltoides"
                  sets={3-4}
                  reps="8-12"
                  description="Los fondos son ideales para trabajar el pectoral mayor, los tríceps y los deltoides. Al realizarse en paralelas, se añade un nivel extra de dificultad y activación muscular."
                  tips={[
                    "En paralelas: Mayor rango de movimiento y dificultad",
                    "En barra: Mantén el mismo enfoque muscular con evolución progresiva",
                    "Inclínate adelante para enfatizar pecho",
                    "Mantén el cuerpo vertical para mayor trabajo de tríceps"
                  ]}
                />
              </div>
            </div>

            {/* Ejercicios de Tracción */}
            <div>
              <h3 className="font-bold text-2xl mb-8 flex items-center gap-3">
                <span className="text-4xl">🦾</span>
                Ejercicios de Tracción
              </h3>
              <p className="text-muted-foreground mb-8">
                Los ejercicios de tracción desarrollan la musculatura de la espalda y los bíceps, complementando así los movimientos de empuje.
              </p>

              <div className="space-y-6">
                <ExerciseCard
                  number={3}
                  title="Dominadas Pronas, Supinas y Australianas"
                  emoji="🦾"
                  targetMuscles="Espalda, Bíceps"
                  sets={3-4}
                  reps="6-12"
                  description="Las dominadas son fundamentales y se pueden realizar en diferentes posiciones de las manos. Las dominadas pronas activan la espalda alta, mientras que las supinas se centran más en los bíceps."
                  variations={[
                    "Dominadas pronas: Palmas hacia adelante, mayor trabajo de espalda alta",
                    "Dominadas supinas: Palmas hacia ti, mayor énfasis en bíceps",
                    "Dominadas australianas: Con pies en el suelo, perfectas para principiantes",
                    "Dominadas con agarre amplio: Mayor activación dorsal"
                  ]}
                />

                <ExerciseCard
                  number={4}
                  title="Remo Invertido y Agarres Variados"
                  emoji="🚣"
                  targetMuscles="Espalda media y baja"
                  sets={3}
                  reps="10-15"
                  description="El remo invertido es excelente para trabajar la parte media y baja de la espalda. Además, permite variar el agarre para enfatizar distintos músculos. Se puede realizar en cualquier superficie elevada y ajustarse de acuerdo al nivel de habilidad."
                  tips={[
                    "Mantén el cuerpo recto como una tabla",
                    "Retrae las escápulas al tirar",
                    "Varía el agarre: prono, supino o neutro",
                    "Ajusta altura para modificar dificultad"
                  ]}
                />
              </div>
            </div>

            {/* Trabajo de Piernas */}
            <div>
              <h3 className="font-bold text-2xl mb-8 flex items-center gap-3">
                <span className="text-4xl">🦵</span>
                Trabajo de Piernas y Tren Inferior
              </h3>
              <p className="text-muted-foreground mb-8">
                Un buen programa requiere un enfoque específico en las piernas para asegurar un desarrollo integral.
              </p>

              <div className="space-y-6">
                <ExerciseCard
                  number={5}
                  title="Sentadillas, Sentadillas Búlgaras y Pistol Squat"
                  emoji="🦵"
                  targetMuscles="Cuádriceps, Glúteos, Isquiotibiales"
                  sets={4}
                  reps="15-20"
                  description="Las sentadillas son un ejercicio básico que involucra cuádriceps, glúteos e isquiotibiales. Se pueden progresar incorporando peso o variantes como las sentadillas búlgaras, que mejoran el equilibrio y la fuerza unilateral."
                  variations={[
                    "Sentadillas clásicas: Base fundamental para piernas",
                    "Sentadillas búlgaras: Una pierna elevada atrás, mejora equilibrio y fuerza unilateral",
                    "Pistol squat: Sentadilla a una pierna, gran desafío para fuerza y estabilidad del core",
                    "Jump squats: Variante pliométrica para potencia"
                  ]}
                />

                <ExerciseCard
                  number={6}
                  title="Elevaciones de Gemelos y Variantes"
                  emoji="💎"
                  targetMuscles="Pantorrillas (Gemelos y Sóleo)"
                  sets={3}
                  reps="15-25"
                  description="Las elevaciones de gemelos son esenciales para fortalecer la pantorrilla. Se pueden realizar en diferentes posiciones, como en una escalera o en el suelo, con el objetivo de apuntar a ambos músculos de la parte inferior de la pierna."
                  tips={[
                    "En escalera: Mayor rango de movimiento",
                    "Con una pierna: Mayor intensidad",
                    "Pausa en la contracción máxima",
                    "Controla tanto la subida como la bajada"
                  ]}
                />
              </div>
            </div>

            {/* Ejercicios Core */}
            <div>
              <h3 className="font-bold text-2xl mb-8 flex items-center gap-3">
                <span className="text-4xl">🔥</span>
                Ejercicios para Abdominales y Core
              </h3>
              <p className="text-muted-foreground mb-8">
                Un core fuerte es vital para mantener la postura y mejorar el rendimiento en todos los ejercicios.
              </p>

              <div className="space-y-6">
                <ExerciseCard
                  number={7}
                  title="L-Sit, Elevaciones de Rodillas y Abdominales Escalador"
                  emoji="🧘"
                  targetMuscles="Abdominales, Flexores de cadera"
                  sets={3}
                  time="15-30s (L-sit) / 10-15 reps (otros)"
                  description="El L-sit es un movimiento avanzado que fortalece tanto los abdominales como los flexores de la cadera. Este requiere fuerza y control. Las elevaciones de rodillas se enfocan directamente en los abdominales inferiores y se pueden realizar en barra o en paralelas."
                  variations={[
                    "L-sit: Mantén piernas extendidas paralelas al suelo",
                    "Elevaciones de rodillas: En barra o paralelas, trabajo de abdominales inferiores",
                    "Abdominales escalador: Dinámicos, trabajan abdominales y resistencia cardiovascular",
                    "Tuck L-sit: Versión más accesible con rodillas dobladas"
                  ]}
                />

                <ExerciseCard
                  number={8}
                  title="Plancha y Hollow Plank"
                  emoji="🏋️"
                  targetMuscles="Core completo, Estabilizadores"
                  sets={3}
                  time="30-60s"
                  description="La plancha es un ejercicio estático que integra todo el core, ofreciendo estabilidad y resistencia. El hollow plank, que implica mantener el cuerpo en forma de arco, refuerza aún más la conexión entre el core y la estabilidad del tronco."
                  tips={[
                    "Plancha frontal: Mantén cuerpo recto, glúteos contraídos",
                    "Hollow plank: Forma de arco, ombligo hacia dentro",
                    "Plancha lateral: Trabaja oblicuos",
                    "Evita hundir cadera o elevar glúteos"
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rutinas por Nivel */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Rutinas Full Body según el Nivel de Experiencia
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Las rutinas full body se pueden ajustar para adaptarse a diferentes niveles de habilidad, desde principiantes hasta atletas avanzados.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Principiantes */}
            <Card className="border-green-200 dark:border-green-900">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">🌱</span>
                  <div>
                    <h3 className="font-bold text-2xl">Rutina Full Body para Principiantes</h3>
                    <p className="text-sm text-muted-foreground">Ideal para quienes están iniciándose en calistenia</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">Selección de Ejercicios Básicos:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Flexiones simples (Push-ups)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Sentadillas (Squats)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Dominadas australianas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Fondos en banco (Dips)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Elevaciones de rodillas colgado</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                    <h4 className="font-bold mb-3">Series, Repeticiones y Descansos:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Series:</strong> 2-3 por ejercicio</li>
                      <li><strong>Repeticiones:</strong> 5-10 reps</li>
                      <li><strong>Descanso entre series:</strong> 60-90 segundos</li>
                      <li><strong>Descanso entre ejercicios:</strong> 3-5 minutos</li>
                    </ul>
                    <p className="mt-3 text-xs">
                      💡 Enfócate en aprender la técnica correcta antes de aumentar el volumen
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intermedios */}
            <Card className="border-blue-200 dark:border-blue-900">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">💪</span>
                  <div>
                    <h3 className="font-bold text-2xl">Rutina para Nivel Intermedio</h3>
                    <p className="text-sm text-muted-foreground">Para quienes ya tienen experiencia en calistenia</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">Incremento en Volumen y Dificultad:</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      En esta fase es fundamental incorporar variaciones y combinaciones de ejercicios que supongan un reto mayor.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        <span>Remo en paralelas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        <span>Flexiones con codos pegados</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        <span>Dominadas en pronación</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        <span>Sentadillas con salto</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✓</span>
                        <span>Burpees</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <h4 className="font-bold mb-3">Parámetros de Entrenamiento:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Series:</strong> 3-4 por ejercicio</li>
                      <li><strong>Repeticiones:</strong> 8-12 reps</li>
                      <li><strong>Descanso:</strong> 30-60 segundos</li>
                    </ul>
                    <p className="mt-3 text-xs">
                      💡 Introduce ejercicios que requieran mayor estabilidad y fuerza
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Avanzados */}
            <Card className="border-purple-200 dark:border-purple-900">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">⚡</span>
                  <div>
                    <h3 className="font-bold text-2xl">Rutina Avanzada de Calistenia Full Body</h3>
                    <p className="text-sm text-muted-foreground">Para atletas experimentados</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">Inclusión de Muscle Ups y Front Lever:</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      La incorporación de ejercicios como muscle ups y front lever no solo mejora la fuerza general, sino también la técnica del movimiento. Estos son ejercicios complejos que requieren un alto nivel de fuerza y técnica.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">✓</span>
                        <span>Muscle ups</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">✓</span>
                        <span>Front lever progressions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">✓</span>
                        <span>Planche progressions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500">✓</span>
                        <span>One arm variations</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                    <h4 className="font-bold mb-3">Gestión del Volumen:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Series:</strong> 4-6 por ejercicio</li>
                      <li><strong>Repeticiones:</strong> Varía según dificultad</li>
                      <li><strong>Descanso:</strong> 30-45 segundos</li>
                    </ul>
                    <p className="mt-3 text-xs">
                      💡 Establece metas de repetición y resistencia que desafíen el cuerpo a adaptarse continuamente
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Adaptaciones para Casa */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Adaptaciones para Entrenar en Casa
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Entrenar en casa puede ser igual de efectivo que hacerlo en un gimnasio con las adaptaciones correctas.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Ejercicios sin equipamiento */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-6">Ejercicios y Rutinas sin Equipamiento</h3>
                <p className="text-muted-foreground mb-6">
                  Los ejercicios de calistenia pueden realizarse sin necesidad de máquinas o pesos específicos. La clave reside en utilizar el propio peso corporal para desafiar los músculos.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { emoji: "💪", title: "Flexiones", desc: "Excelentes para trabajar el pecho, tríceps y hombros. Variaciones amplias o con pies elevados." },
                    { emoji: "🦵", title: "Sentadillas", desc: "Ideales para fortalecer el tren inferior. Variaciones a una pierna (pistol squat) o con saltos." },
                    { emoji: "🚪", title: "Dominadas en Puertas", desc: "Si tienes una puerta resistente, utiliza el marco como barra para dominadas." },
                    { emoji: "🏋️", title: "Plancha", desc: "Fundamental para fortalecer el core. Plancha lateral o con elevación de piernas." }
                  ].map((ex, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                      <span className="text-3xl">{ex.emoji}</span>
                      <div>
                        <h4 className="font-bold mb-1">{ex.title}</h4>
                        <p className="text-sm text-muted-foreground">{ex.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Objetos caseros */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-6">Uso de Objetos Caseros para el Entrenamiento</h3>
                <p className="text-muted-foreground mb-6">
                  Es posible crear un entorno de entrenamiento efectivo utilizando objetos caseros.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-5xl mb-3">🪑</div>
                    <h4 className="font-bold mb-2">Sillas</h4>
                    <p className="text-sm text-muted-foreground">
                      Para realizar fondos o como apoyo para flexiones inclinadas
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl mb-3">💧</div>
                    <h4 className="font-bold mb-2">Botellas de Agua</h4>
                    <p className="text-sm text-muted-foreground">
                      Llenas pueden servir como pesa improvisada para curls o elevaciones
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl mb-3">🪜</div>
                    <h4 className="font-bold mb-2">Escaleras</h4>
                    <p className="text-sm text-muted-foreground">
                      Para flexiones inclinadas o soporte durante trabajos de core
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optimización */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-6">Optimización del Espacio y Tiempo</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">📍 Espacio Dedicado</h4>
                    <p className="text-sm text-muted-foreground">
                      Designar un área específica de la casa para entrenar ayuda a concentrarse y mantener la motivación
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">⏰ Horarios Fijos</h4>
                    <p className="text-sm text-muted-foreground">
                      Establecer horarios puede garantizar la constancia y facilitar la integración del ejercicio en la rutina diaria
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">📝 Llevar un Registro</h4>
                    <p className="text-sm text-muted-foreground">
                      Anotar las repeticiones, series y mejoras permite seguir el progreso y ajustarse a las necesidades personales
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consejos para Progresar */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Consejos para Progresar y Evitar Lesiones
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Para disfrutar de los beneficios de la calistenia y mejorar el rendimiento, es crucial seguir ciertas recomendaciones.
          </p>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-bold text-xl mb-3">Importancia de la Técnica Correcta</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  La forma en la que se ejecutan los ejercicios es fundamental para maximizar los resultados y minimizar el riesgo de lesiones.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Realizar un calentamiento antes de cada sesión</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Focalizarse en la alineación correcta del cuerpo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Comenzar con rango de movimiento dominable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Buscar orientación de un entrenador experimentado</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="font-bold text-xl mb-3">Progresión y Sobrecarga Progresiva</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  La progresión en calistenia es clave para continuar desarrollando fuerza y resistencia.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Aumentar número de repeticiones y series gradualmente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Incorporar variaciones más avanzadas progresivamente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Reducir tiempo de descanso para mayor desafío</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Monitorizar progreso y establecer metas claras</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4">💤</div>
                <h3 className="font-bold text-xl mb-3">Días de Descanso y Recuperación</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  El descanso es parte esencial del entrenamiento. Permitir que los músculos se recuperen previene el sobreentrenamiento y las lesiones.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Incluir al menos un día de descanso entre sesiones full body</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Escuchar al cuerpo y permitir pausas adicionales si hay fatiga</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Actividades ligeras en días off: caminar, yoga</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Calidad del sueño (7-9 horas) contribuye a la rehabilitación</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🍗</div>
                <h3 className="font-bold text-xl mb-3">Nutrición Adecuada</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Una alimentación equilibrada es crucial para respaldar el entrenamiento. Los nutrientes son vitales para la recuperación y optimizar el rendimiento.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Consumir proteínas adecuadas (1.8-2.2g/kg peso corporal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Incluir carbohidratos complejos para mantener energía</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Incorporar grasas saludables para función hormonal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Hidratación constante (2-3L/día) para evitar calambres</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Preguntas Frecuentes sobre Full Body
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-background rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  ¿Cuántas veces a la semana se debe entrenar?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-2">La frecuencia del entrenamiento puede variar según la experiencia y los objetivos de cada persona. Como guía general:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Principiantes:</strong> 2-3 veces por semana, dejando al menos un día de descanso entre sesiones</li>
                    <li><strong>Intermedios:</strong> 3-4 veces por semana, permitiendo una recuperación adecuada</li>
                    <li><strong>Avanzados:</strong> 4-6 veces semanales, integrando variaciones en intensidad y volumen</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-background rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  ¿Cómo adaptar la rutina según el objetivo (quemar grasa, ganar músculo)?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-2"><strong>Para quemar grasa:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                    <li>Incorporar ejercicios de alta intensidad y circuitos</li>
                    <li>Reducir los descansos entre series</li>
                    <li>Agregar trabajo cardiovascular complementario (sprints, saltos)</li>
                  </ul>
                  <p className="mb-2"><strong>Para ganar masa muscular:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Utilizar ejercicios compuestos</li>
                    <li>Aumentar gradualmente el volumen de entreno</li>
                    <li>Asegurar aporte adecuado de proteínas y calorías</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-background rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  ¿Cuánto debe durar cada entrenamiento?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Principiantes:</strong> 30-45 minutos, suficiente para aprender técnica correcta</li>
                    <li><strong>Intermedios:</strong> 45-60 minutos, para incluir mayor volumen y calentamiento</li>
                    <li><strong>Avanzados:</strong> 60+ minutos, integran ejercicios más complejos</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-background rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  ¿Cuándo es recomendable cambiar la rutina o aumentar dificultad?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Modificar la rutina cada 6 a 8 semanas, introduciendo nuevos ejercicios o variaciones</li>
                    <li>Aumentar la dificultad cuando un ejercicio se vuelva demasiado fácil</li>
                    <li>Evaluar el progreso personal: si no se notan diferencias en fuerza o resistencia, ajustar el enfoque</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">💪⚡🔥</div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl mb-6">
              ¿Listo para tu <span className="text-primary">Transformación</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Lleva tu entrenamiento al siguiente nivel con programas personalizados y seguimiento profesional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/programas">Ver Programas Premium</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/quien-soy">Conocer al Entrenador</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RutinaFullBody;
