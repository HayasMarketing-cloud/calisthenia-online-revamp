import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VideoGallery from "@/components/VideoGallery";
import VideoWithStructure from "@/components/VideoWithStructure";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByZone } from "@/lib/videoUtils";
import RoutineHero from "@/components/routine/RoutineHero";
import CommunityCTA from "@/components/CommunityCTA";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import QuickJumpBanner from "@/components/QuickJumpBanner";

const RutinaEspalda = () => {
  const espaldaVideos = getVideosByZone(allVideos, 'Espalda', { limit: 9, sortBy: 'engagement' });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Rutina de Espalda Calistenia: Ejercicios para Fortalecer y Definir | Nicolás Reyero</title>
        <meta name="description" content="Descubre la mejor rutina de espalda con calistenia. Ejercicios clave como dominadas, remos y front lever para desarrollar una espalda fuerte, ancha y definida en V." />
        <meta name="keywords" content="rutina espalda, ejercicios espalda, dominadas, remo australiano, front lever, espalda calistenia, entrenar espalda casa, rutina espalda gym" />
        <link rel="canonical" href="https://calistenia.online/rutina-espalda" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Rutina de Espalda Calistenia: Ejercicios para Fortalecer y Definir" />
        <meta property="og:description" content="Desarrolla una espalda fuerte y definida con dominadas, remos y ejercicios de calistenia avanzados. Guía completa con técnicas y progresiones." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://calistenia.online/rutina-espalda" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ExercisePlan",
            "name": "Rutina de Espalda Calistenia Completa",
            "description": "Programa completo de ejercicios de espalda con calistenia para desarrollar fuerza, masa muscular y definición",
            "exerciseType": "Calistenia",
            "targetArea": "Espalda, Dorsales, Trapecio",
            "intensity": "Intermedio a Avanzado",
            "additionalType": "https://schema.org/PhysicalActivity",
            "video": {
              "@type": "VideoObject",
              "name": "Cómo Hacer la Primera Dominada - Retracción Escapular",
              "description": "Guía completa para dominar la técnica de dominadas desde cero",
              "thumbnailUrl": `https://img.youtube.com/vi/joOoHh_P5RM/maxresdefault.jpg`,
              "uploadDate": "2024-01-15",
              "contentUrl": `https://www.youtube.com/watch?v=joOoHh_P5RM`
            },
            "author": {
              "@type": "Person",
              "name": "Nicolás Reyero",
              "jobTitle": "Entrenador de Calistenia"
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
          { label: "Rutina Espalda", href: "/rutina-espalda-calistenia/" }
        ]}
        title="Rutina de"
        titleHighlight="Espalda"
        emoji="🦾"
        description="Construye una espalda fuerte y definida con dominadas, remos y ejercicios de calistenia avanzados para desarrollar la forma en V."
        nivel="Todos los niveles"
        duracion="45-60 min"
        lugar="Casa o Parque"
      />

      <QuickJumpBanner
        text="¿Quieres ver la rutina en acción?"
        linkText="Ver Video Principal"
        href="#video-principal"
        icon="Play"
        variant="primary"
      />

      {/* Introducción SEO */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Entrenar la espalda es fundamental para lograr un cuerpo equilibrado y fortalecer la postura. La espalda, al ser un grupo muscular grande y complejo, juega un papel clave en muchas actividades diarias y deportivas. Una <strong>rutina de espalda</strong> adecuada mejora la estética y la funcionalidad del cuerpo, previene lesiones comunes y fomenta una mayor fuerza general.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios de Entrenar la Espalda */}
      <section id="beneficios" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Beneficios de Entrenar la Espalda
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Fortalecer la espalda ofrece múltiples ventajas que van más allá de la estética y contribuyen a una mejor salud general.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">🧍</span>
                  Importancia de la espalda en la postura y fuerza general
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Una espalda bien entrenada es fundamental para mantener una buena postura. Esto es esencial, ya que una postura adecuada ayuda a reducir la tensión en músculos y articulaciones, previniendo molestias y dolores. Además, una espalda fuerte permite realizar actividades diarias con mayor facilidad.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Los músculos de la espalda, como el <strong>dorsal ancho y el trapecio</strong>, son clave en numerosos movimientos. Por lo tanto, su fortalecimiento no solo mejora la estética del cuerpo, sino que también incrementa la fuerza general, lo que resulta en un mejor rendimiento en ejercicios que involucran otros grupos musculares.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">🛡️</span>
                  Prevención de lesiones y equilibrio muscular
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El entrenamiento de la espalda juega un papel crucial en la prevención de lesiones. Al fortalecer los músculos espinales y mejorar la estabilidad, se reducen los riesgos de lesiones en la lumbar y otros problemas asociados a una debilidad en esta zona.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Un programa de entrenamiento equilibrado que incluya ejercicios para la espalda ayuda a mejorar la movilidad y la flexibilidad, facilitando una mayor amplitud de movimiento y minimizando el riesgo de lesiones deportivas. A su vez, una espalda fuerte contribuye a una mejor alineación de la columna vertebral, favoreciendo la salud en general.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fundamentos para una Rutina Efectiva */}
      <section id="fundamentos" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Fundamentos para una Rutina de Espalda Efectiva
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Para desarrollar una espalda fuerte y definida, es fundamental tener en cuenta algunos principios básicos que asegurarán un entrenamiento efectivo y seguro.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔥</span>
                  Calentamiento específico para espalda
                </h3>
                <p className="text-muted-foreground mb-6">
                  El calentamiento es un paso crucial que no debe pasarse por alto. Preparar adecuadamente los músculos y articulaciones ayudará a prevenir lesiones y a optimizar el rendimiento.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3">Movilidad articular</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Realizar círculos con los brazos para activar los hombros</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Incluir giros de tronco para movilizar la columna vertebral</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Flexionar y extender el cuello para calentar el área cervical</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-3">Estiramientos dinámicos</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Ejercicios como el "codo a rodilla" pueden activar los músculos de la espalda</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>El estiramiento lateral ayuda a elongar los dorsales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Retos dinámicos como el "puente" preparan la parte baja</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    Técnica correcta
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    El dominio de la técnica es vital para asegurar la efectividad y reducir el riesgo de lesiones. Realizar los ejercicios con una postura adecuada garantiza que los músculos trabajen de manera eficiente.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <span className="text-2xl">😴</span>
                    Descanso y recuperación
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Permitir que los músculos descansen y se recuperen es igual de importante que el propio entrenamiento. Se recomienda dejar al menos 48 horas entre sesiones dirigidas a la espalda.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <span className="text-2xl">📈</span>
                    Progresión en carga
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Con el tiempo, es necesario aumentar la carga o las repeticiones para continuar desafiando los músculos. La progresión gradual ayuda a maximizar el desarrollo y a evitar estancamientos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Ejercicios Clave */}
      <section id="ejercicios" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Ejercicios Clave para la Rutina de Espalda
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Una sólida rutina de espalda incluye una variedad de ejercicios que se centran en los músculos principales de esta área.
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            {/* Peso Muerto */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">💪 Peso muerto para la parte baja y muscular</h3>
                <p className="text-muted-foreground mb-4">
                  Este ejercicio es fundamental para trabajar la musculatura de la espalda baja, así como otros grupos musculares como glúteos y piernas.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-bold mb-2">Posición inicial y ejecución segura</h4>
                    <p className="text-sm text-muted-foreground">
                      Colocarse de pie frente a una barra, con los pies a la anchura de los hombros. Es vital mantener la espalda recta y el abdomen contraído durante todo el movimiento.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Series y repeticiones recomendadas</h4>
                    <p className="text-sm text-muted-foreground">
                      4 series de 6-8 repeticiones con peso progresivo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Remo con Barra */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">🚣 Remo con barra para grosor dorsal</h3>
                <p className="text-muted-foreground mb-4">
                  Este ejercicio se centra en el desarrollo del grosor de los dorsales, siendo clave para una espalda robusta.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Agarre y postura durante el ejercicio</h4>
                    <p className="text-sm text-muted-foreground">
                      Inclinarse hacia adelante con la barra en las manos, asegurándose de que la espalda permanezca recta. Los codos deben mantenerse cerca del cuerpo durante el movimiento.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Control del movimiento y respiración</h4>
                    <p className="text-sm text-muted-foreground">
                      Realizar el movimiento de forma controlada, inhalando al bajar la barra y exhalando al levantarla.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Remo con Mancuerna */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">🏋️ Remo con mancuerna a un brazo para aislamiento</h3>
                <p className="text-muted-foreground mb-4">
                  Este ejercicio permite trabajar ambos lados de la espalda de manera equilibrada, contribuyendo al desarrollo muscular específico.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Colocación del cuerpo y apoyo en banco</h4>
                    <p className="text-sm text-muted-foreground">
                      Apoyarse con una mano y una rodilla en un banco, mientras se sostiene la mancuerna con la otra mano. Mantener la espalda recta es crucial.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Repeticiones y series por lado</h4>
                    <p className="text-sm text-muted-foreground">
                      3-4 series de 10-12 repeticiones para cada lado.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Jalón al Pecho */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">⬇️ Jalón al pecho para amplitud dorsal</h3>
                <p className="text-muted-foreground mb-4">
                  Perfecto para incrementar la amplitud de la espalda, ayudando a lograr una forma en 'V'.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Ajuste de máquina y agarre correcto</h4>
                    <p className="text-sm text-muted-foreground">
                      Sentarse en una máquina de polea y ajustar la almohadilla. Se recomienda un agarre amplio para maximizar la activación de los dorsales.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Técnicas para juntar los omoplatos</h4>
                    <p className="text-sm text-muted-foreground">
                      Concentrarse en juntar los omóplatos al final del movimiento para un mejor desarrollo muscular.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Encogimiento de Hombros */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">🤷 Encogimiento de hombros para trapecio</h3>
                <p className="text-muted-foreground mb-4">
                  Este ejercicio es ideal para fortalecer el trapecio, una parte fundamental del tren superior.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Mantener espalda recta y evitar balanceos</h4>
                    <p className="text-sm text-muted-foreground">
                      Con una barra en la parte posterior de los muslos, se levantan los hombros hacia las orejas, manteniendo la espalda recta para evitar lesiones.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Pausas y ritmo de ejecución</h4>
                    <p className="text-sm text-muted-foreground">
                      Incorporar pausas en la parte superior del movimiento para maximizar el trabajo muscular, realizando 3-4 series de 10-15 repeticiones.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pullover */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">🔄 Pullover con mancuerna para estirar dorsales</h3>
                <p className="text-muted-foreground mb-4">
                  Este ejercicio ayuda a estirar los dorsales y mejorar la flexibilidad de la espalda.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Posición en banco y recorrido del brazo</h4>
                    <p className="text-sm text-muted-foreground">
                      Acuéstate en un banco y sostén la mancuerna con ambas manos. Baja la mancuerna detrás de tu cabeza, manteniendo los brazos casi rectos.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Series de estiramiento y control del peso</h4>
                    <p className="text-sm text-muted-foreground">
                      Realizar 2-3 series de 12 repeticiones, controlando el peso durante todo el recorrido.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Principal con Estructura */}
      <VideoWithStructure
        id="video-principal"
        videoId="joOoHh_P5RM"
        videoTitle="Cómo Hacer la Primera Dominada"
        videoDescription="Serie completa sobre dominadas: aprende la técnica correcta, ejercicios progresivos y evita los errores más comunes para dominar este ejercicio fundamental de espalda."
        insights={[
          "La retracción escapular es la base fundamental para dominar las dominadas",
          "Aprende progresiones desde cero: dead hangs, scapular pulls y negativas",
          "Técnica correcta para activar dorsales y evitar compensaciones",
          "Ejercicios complementarios para fortalecer agarre y estabilizadores",
          "Evita los 5 errores más comunes que frenan tu progreso"
        ]}
        nivel="Principiante a Intermedio"
        zonaMuscular="Espalda"
        material="Barra de dominadas"
        formato={{
          calentamiento: {
            ejercicios: 4,
            intensidad: "Movilidad articular de hombros y activación escapular"
          },
          partePrincipal: {
            series: 8,
            descripcion: "Dead hangs, scapular pulls, negativas y dominadas asistidas"
          },
          tempo: {
            activo: "Controlado en fase concéntrica",
            descanso: "2-3 minutos entre series"
          }
        }}
        estimulos={[
          "Fuerza de tracción vertical",
          "Control escapular",
          "Resistencia de agarre",
          "Estabilidad de core"
        ]}
        detalles="Esta serie de 8 episodios te lleva desde tu primera dominada hasta dominadas superlativas y explosivas. Cada video construye sobre el anterior, asegurando una progresión sólida y segura. Perfecto para principiantes que quieren dominar este ejercicio fundamental de espalda."
      />

      {/* Rutinas para el Gimnasio */}
      <section id="rutinas-gym" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Rutinas de Espalda para el Gimnasio
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Entrenar la espalda en un gimnasio ofrece diversas opciones y enfoques para desarrollar fuerza y musculatura.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">📅 Programación completa para entrenar la espalda</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-lg mb-4">Distribución de ejercicios por sesión</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Peso muerto para la parte baja de la espalda</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Remo con barra para la zona media y el grosor dorsal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Jalón al pecho para ampliar la parte superior</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Encogimiento de hombros para fortalecer el trapecio</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4">Series y repeticiones para distintos objetivos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-background">
                        <CardContent className="p-4">
                          <p className="font-bold mb-2">Para fuerza:</p>
                          <p className="text-sm text-muted-foreground">4-6 series de 6-8 repeticiones</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-background">
                        <CardContent className="p-4">
                          <p className="font-bold mb-2">Para hipertrofia:</p>
                          <p className="text-sm text-muted-foreground">3-4 series de 8-12 repeticiones</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-background">
                        <CardContent className="p-4">
                          <p className="font-bold mb-2">Para resistencia:</p>
                          <p className="text-sm text-muted-foreground">2-3 series de 12-15 repeticiones</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">🎮 Rutina alternativa con máquinas y cables</h3>
                <p className="text-muted-foreground mb-6">
                  Utilizar máquinas y cables puede ofrecer un enfoque diferente y efectivo. Este tipo de equipamiento permite aislar mejor los músculos y mantener un movimiento controlado.
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold mb-2">Remo en cable sentado y variaciones</h4>
                    <p className="text-sm text-muted-foreground">
                      Se puede modificar el agarre y variar la posición para trabajar los músculos de la espalda desde distintas perspectivas. Se debe asegurar un movimiento fluido y controlado.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold mb-2">Jalón tras nuca y lat pushdowns</h4>
                    <p className="text-sm text-muted-foreground">
                      El jalón tras nuca permite trabajar un amplio rango de movimiento en los dorsales, mientras que el lat pushdown ayuda a fortalecer la parte baja y lateral de la espalda.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">💪 Entrenamiento combinado de espalda y bíceps</h3>
                <p className="text-muted-foreground mb-6">
                  Entrenar espalda y bíceps en una misma sesión puede ser altamente efectivo, ya que muchos ejercicios de espalda también involucran a estos músculos.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">Selección de ejercicios complementarios</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Incluir remo con barra y curl de bíceps alternado</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Implementar dominadas seguidas de flexiones de brazos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Optar por pullover con mancuerna y curl martillo</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-3">Organización de series para optimizar el tiempo</h4>
                    <p className="text-sm text-muted-foreground">
                      Es recomendable alternar series de espalda con ejercicios de bíceps. Esto permite un enfoque mixto que hace más eficiente el tiempo de entrenamiento y logra un buen bombeo muscular.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Entrenamiento con Mancuernas */}
      <section id="mancuernas" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Entrenamiento de Espalda con Mancuernas
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            El uso de mancuernas permite un desarrollo muscular equilibrado y enfocado, adaptándose a diferentes niveles de habilidad.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">✨ Ventajas de usar mancuernas en la rutina</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📐</span>
                      <div>
                        <h4 className="font-bold mb-1">Movilidad</h4>
                        <p className="text-sm text-muted-foreground">Permiten una mayor amplitud de movimiento en comparación con las barras</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h4 className="font-bold mb-1">Aislamiento</h4>
                        <p className="text-sm text-muted-foreground">Facilitan el aislamiento de músculos específicos</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚖️</span>
                      <div>
                        <h4 className="font-bold mb-1">Simetría</h4>
                        <p className="text-sm text-muted-foreground">Ayudan a corregir desbalances musculares</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🔄</span>
                      <div>
                        <h4 className="font-bold mb-1">Adaptabilidad</h4>
                        <p className="text-sm text-muted-foreground">Se adaptan a diferentes objetivos y niveles de experiencia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Remo a un brazo con mancuerna</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Este ejercicio es ideal para trabajar un lado de la espalda a la vez, enfocándose en los dorsales y romboides.
                  </p>
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Ejecución:</p>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Apóyate con una mano y rodilla en un banco</li>
                      <li>Toma la mancuerna y mantén el codo cerca del cuerpo</li>
                      <li>Eleva hacia la cadera de forma controlada</li>
                      <li>Baja y repite el movimiento</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Pullover y variantes de estiramiento</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Excelente para estirar y activar los dorsales, también involucra pectorales y tríceps.
                  </p>
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Ejecución:</p>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Acuéstate en un banco con cabeza y hombros elevados</li>
                      <li>Sujeta la mancuerna con ambas manos sobre el pecho</li>
                      <li>Baja detrás de la cabeza con brazos ligeramente flexionados</li>
                      <li>Regresa controlando el movimiento</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">📊 Series y repeticiones recomendadas para ganar masa muscular</h3>
                <p className="text-muted-foreground mb-6">
                  La combinación de series y repeticiones es crucial para el desarrollo muscular. Para maximizar los resultados al usar mancuernas:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-secondary/20">
                    <CardContent className="p-6 text-center">
                      <p className="text-3xl font-bold text-primary mb-2">3-4</p>
                      <p className="text-sm font-medium mb-1">Series</p>
                      <p className="text-xs text-muted-foreground">Por ejercicio</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-secondary/20">
                    <CardContent className="p-6 text-center">
                      <p className="text-3xl font-bold text-primary mb-2">8-12</p>
                      <p className="text-sm font-medium mb-1">Repeticiones</p>
                      <p className="text-xs text-muted-foreground">Sin sacrificar técnica</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-secondary/20">
                    <CardContent className="p-6 text-center">
                      <p className="text-3xl font-bold text-primary mb-2">60-90"</p>
                      <p className="text-sm font-medium mb-1">Descanso</p>
                      <p className="text-xs text-muted-foreground">Entre series</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Aspectos Técnicos y Errores */}
      <section id="errores" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Aspectos Técnicos y Errores Comunes
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Los aspectos técnicos son cruciales para evitar lesiones y maximizar resultados. Conoce los errores más comunes.
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            <Card className="border-l-4 border-destructive">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔴</span>
                  Mantener la espalda recta y evitar lesiones
                </h3>
                <p className="text-muted-foreground mb-4">
                  Una de las premisas más importantes al trabajar la espalda es mantener la columna en una posición neutral durante los ejercicios. Esto no solo previene lesiones, sino que también garantiza una activación óptima de los músculos.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Flexión y extensión correcta</h4>
                    <p className="text-sm text-muted-foreground">
                      Es fundamental realizar correctamente los movimientos de flexión y extensión. En ejercicios como el peso muerto, una flexión excesiva puede conllevar a lesiones. En movimientos de extensión, debe evitarse una sobrecarga en la zona cervical.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2">Importancia de juntar los omoplatos</h4>
                    <p className="text-sm text-muted-foreground">
                      Juntar los omoplatos durante los ejercicios ayuda a activar correctamente los músculos de la espalda. Esto no solo promueve una mejor activación del dorsal y trapecio, sino que también proporciona estabilidad al torso.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">⚠️</span>
                  Control del peso y evitar movimientos bruscos
                </h3>
                <p className="text-muted-foreground">
                  Utilizar un peso que se pueda manejar sin dificultad es clave para mantener el control durante los ejercicios. Realizar movimientos bruscos o descontrolados no solo limita la efectividad del entrenamiento, sino que genera un alto riesgo de lesión. Una progresión gradual en la carga es siempre recomendable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Complementos para Mejorar la Rutina */}
      <section id="complementos" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Complementos para Mejorar la Rutina de Espalda
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Incorporar estos complementos puede potenciar los resultados, mejorar la flexibilidad y fortalecer el bienestar general.
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">🧘</span>
                  Estiramientos para mejorar la flexibilidad y prevenir dolor
                </h3>
                <p className="text-muted-foreground mb-6">
                  La flexibilidad es esencial para mantener la salud muscular y articular. Los estiramientos específicos para la espalda no solo ayudan a aliviar la tensión, sino que también previenen lesiones.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-secondary/20">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-2">Estiramiento de columna</h4>
                      <p className="text-sm text-muted-foreground">
                        Posicionarse de pie, elevar los brazos y arquear la espalda suavemente
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/20">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-2">Estiramiento de dorsal ancho</h4>
                      <p className="text-sm text-muted-foreground">
                        De pie, inclinarse hacia un lado manteniendo el brazo por encima de la cabeza
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/20">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-2">Estiramiento de trapecio</h4>
                      <p className="text-sm text-muted-foreground">
                        Sentado, llevar la cabeza hacia un lado mientras se presiona el hombro opuesto hacia abajo
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-2xl">🥗</span>
                    Nutrición para crecimiento muscular
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Para maximizar el desarrollo de la espalda, adopta una alimentación adecuada que soporte los entrenamientos:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Proteínas magras:</strong> Pollo, pescado, legumbres</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Carbohidratos complejos:</strong> Arroz integral, avena</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Grasas saludables:</strong> Frutos secos, aguacate</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚖️</span>
                    Integrar entrenamiento de hombros y pecho
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Fortalecer la espalda junto con los hombros y el pecho proporciona un equilibrio muscular que previene lesiones:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Hombros:</strong> Press militar, elevaciones laterales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span><strong>Pecho:</strong> Press de banca, flexiones</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">😴</span>
                  Importancia del descanso y recuperación
                </h3>
                <p className="text-muted-foreground">
                  El descanso es tan importante como el propio entrenamiento. Permitir que la espalda y el cuerpo en general se recuperen es esencial para evitar el sobreentrenamiento. Un adecuado periodo de descanso facilita la reparación muscular y optimiza los resultados. Se recomienda descansar entre sesiones y asegurar una buena calidad de sueño.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rutinas en Casa */}
      <section id="rutinas-casa" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Rutinas de Espalda en Casa y sin Máquina
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Realizar efectivos entrenamientos de espalda en casa es completamente viable, incluso sin equipamiento especializado.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">🏋️ Ejercicios con peso corporal para la espalda</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold mb-4">Dominadas y variantes básicas</h4>
                    <p className="text-muted-foreground mb-4">
                      Las dominadas son uno de los ejercicios más completos para fortalecer la espalda. Se pueden realizar en barras fijas disponibles en parques o gimnasios al aire libre.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-background">
                        <CardContent className="p-4">
                          <h5 className="font-bold mb-2">Dominadas asistidas</h5>
                          <p className="text-sm text-muted-foreground">Usar una banda elástica para ayudar con el levantamiento</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-background">
                        <CardContent className="p-4">
                          <h5 className="font-bold mb-2">Dominadas negativas</h5>
                          <p className="text-sm text-muted-foreground">Subir con un salto y bajar lentamente controlando</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-background">
                        <CardContent className="p-4">
                          <h5 className="font-bold mb-2">Dominadas supinas</h5>
                          <p className="text-sm text-muted-foreground">Este agarre ayuda a trabajar también el bíceps</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-4">Remo invertido con apoyo en suelo o bancos</h4>
                    <p className="text-muted-foreground mb-4">
                      Este ejercicio es ideal para trabajar la parte media de la espalda. Para realizar el remo invertido, se requiere un lugar donde colocar una barra baja o un banco.
                    </p>
                    
                    <div className="bg-secondary/20 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-bold mb-2">Posición inicial:</p>
                          <p className="text-sm text-muted-foreground">
                            Colocarse debajo de la barra con los pies apoyados en el suelo y el cuerpo recto
                          </p>
                        </div>
                        <div>
                          <p className="font-bold mb-2">Ejecución:</p>
                          <p className="text-sm text-muted-foreground">
                            Tirar del cuerpo hacia arriba, acercando el pecho a la barra, manteniendo los codos pegados al cuerpo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">🎨 Uso de bandas elásticas y mancuernas en casa</h3>
                <p className="text-muted-foreground mb-6">
                  Las bandas elásticas son un recurso excelente para diversificar el entrenamiento de espalda. Permiten imitar varios ejercicios de gimnasio y son fáciles de almacenar y transportar.
                </p>

                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-lg">
                  <h4 className="font-bold mb-4">Técnicas para mantener la postura y progresar</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>Mantener la espalda recta:</strong> La alineación del torso es clave durante todos los movimientos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>Control del movimiento:</strong> Evitar realizar los ejercicios de forma brusca, mantener un ritmo constante</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">📅 Rutina semanal para entrenamiento en casa o parque</h3>
                <p className="text-muted-foreground mb-6">
                  Una rutina semanal puede incluir los siguientes ejercicios, alternando entre ellos para trabajar diferentes áreas de la espalda:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-background">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-bold mb-2">Dominadas</h4>
                      <p className="text-2xl font-bold text-primary my-3">3x5-8</p>
                      <p className="text-sm text-muted-foreground">Series x repeticiones</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-background">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-bold mb-2">Remo invertido</h4>
                      <p className="text-2xl font-bold text-primary my-3">4x8-10</p>
                      <p className="text-sm text-muted-foreground">Series x repeticiones</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-background">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-bold mb-2">Jalones con bandas</h4>
                      <p className="text-2xl font-bold text-primary my-3">3x10-12</p>
                      <p className="text-sm text-muted-foreground">Series x repeticiones</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section id="faq" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Preguntas Frecuentes sobre el Entrenamiento de Espalda
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Resolvemos las dudas más comunes sobre cómo entrenar la espalda de manera efectiva.
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">¿Cuántas series y repeticiones debo hacer para ganar fuerza?</h3>
                <p className="text-muted-foreground">
                  Para incrementar la fuerza en la espalda, se recomienda realizar de <strong>3 a 5 series de entre 4 y 8 repeticiones</strong> por ejercicio. Este rango es ideal para construir fuerza, enfocándose en cargas más elevadas. Sin embargo, también es importante combinar esta estrategia con series de mayor número de repeticiones (8 a 12) con pesos moderados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">¿Es mejor entrenar espalda con barra o mancuernas?</h3>
                <p className="text-muted-foreground">
                  No hay una respuesta única, ya que ambos métodos tienen sus ventajas. Utilizar una <strong>barra permite levantar más peso</strong> debido a la estabilidad que proporciona, ideal para ejercicios compuestos. Por otro lado, las <strong>mancuernas favorecen un rango de movimiento más amplio</strong> y ayudan a trabajar cada lado del cuerpo de forma independiente, útil para corregir desequilibrios.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">¿Cómo evitar dolores después del entrenamiento?</h3>
                <p className="text-muted-foreground">
                  Para prevenir dolores posteriores, es fundamental adoptar una <strong>buena técnica</strong> durante la ejecución de los ejercicios. Se recomienda incorporar <strong>estiramientos después de las sesiones</strong> y realizar ejercicios de movilidad antes de entrenar. Adecuada hidratación y una dieta equilibrada también son factores esenciales para la recuperación muscular.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">¿Puedo entrenar espalda y bíceps el mismo día?</h3>
                <p className="text-muted-foreground">
                  Sí, entrenar espalda y bíceps el mismo día es bastante común y efectivo. Ambos grupos musculares están interrelacionados, puesto que muchos <strong>ejercicios para la espalda también involucran a los bíceps</strong>. Esta combinación puede maximizar el tiempo de entrenamiento y permitir un enfoque equilibrado de los músculos de la parte superior del cuerpo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">¿Qué ejercicios son mejores para ensanchar la espalda en forma de "V"?</h3>
                <p className="text-muted-foreground mb-4">
                  Para lograr la forma de 'V' en la espalda, los ejercicios más efectivos incluyen:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Jalón al pecho</strong> - Desarrolla la amplitud del dorsal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Remo con barra</strong> - Trabaja el grosor dorsal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Dominadas</strong> - El ejercicio fundamental para la espalda</span>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Asegurarse de variar el agarre y el estilo de ejecución puede ayudar a trabajar el músculo desde diferentes ángulos, potenciando los resultados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Galería de Videos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          {espaldaVideos.length > 0 ? (
            <VideoGallery 
              videos={espaldaVideos}
              title="📹 Biblioteca de Videos de Entrenamiento de Espalda"
              showStats={true}
            />
          ) : (
            <div className="text-center">
              <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
                📹 Videos de Entrenamiento de Espalda
              </h2>
              <p className="text-muted-foreground">
                Próximamente añadiremos más contenido en video sobre entrenamiento de espalda.
              </p>
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
              Desarrolla una <span className="text-primary">Espalda en V</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Domina muscle-ups, front lever y todas las variantes de dominadas. Programas completos para construir una espalda ancha, gruesa y definida con calistenia.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold mb-2">Skills Avanzadas</h3>
                  <p className="text-sm text-muted-foreground">Front lever, muscle-up y one arm pull-up</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="font-bold mb-2">Programación Periodizada</h3>
                  <p className="text-sm text-muted-foreground">12 semanas de progresión estructurada</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">💪</div>
                  <h3 className="font-bold mb-2">Fuerza Funcional</h3>
                  <p className="text-sm text-muted-foreground">Desarrollo equilibrado de toda la espalda</p>
                </CardContent>
              </Card>
            </div>
            
            <Button size="lg" className="bg-gradient-primary" asChild>
              <Link to="/programas">Acceder a Programas de Espalda</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RutinaEspalda;
