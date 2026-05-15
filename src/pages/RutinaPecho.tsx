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
import StructuredData from "@/components/seo/StructuredData";
import { useRoutineSchemas } from "@/hooks/useRoutineSchemas";

const RutinaPecho = () => {
  const pechoVideos = getVideosByZone(allVideos, 'Pecho', { limit: 9, sortBy: 'engagement' });

  const schemas = useRoutineSchemas({
    routineName: "Rutina de Pecho con Calistenia",
    routineDescription: "Descubre la mejor rutina de pecho con calistenia. Ejercicios clave como flexiones, fondos y press para desarrollar un pecho fuerte, definido y simétrico.",
    videoId: "QmNx-kydmn0",
    videoTitle: "No Hagas los Fondos Así - Errores Comunes",
    videoDuration: "PT9M45S",
    uploadDate: "2024-01-15",
    totalTime: "PT45M",
    breadcrumbs: [
      { name: "Inicio", url: "https://calisthenia.online/" },
      { name: "Rutinas", url: "https://calisthenia.online/programas/" },
      { name: "Rutina Pecho", url: "https://calisthenia.online/rutina-pecho-calistenia/" }
    ],
    rating: {
      itemName: "Rutina de Pecho Calistenia",
      ratingValue: 4.7,
      reviewCount: 312,
      bestRating: 5,
      worstRating: 1
    },
    steps: [
      {
        name: "Calentamiento dinámico",
        text: "Realiza 5-10 minutos de movilidad articular para hombros, codos y muñecas. Incluye círculos de brazos y estiramientos dinámicos."
      },
      {
        name: "Flexiones y variaciones",
        text: "Ejecuta flexiones clásicas, diamante y declinadas para trabajar todo el pectoral. 3-4 series de 8-15 repeticiones."
      },
      {
        name: "Fondos en paralelas",
        text: "Realiza fondos con inclinación adelante para enfatizar el pecho. Controla el descenso y empuja con potencia. 3-4 series."
      },
      {
        name: "Trabajo de aperturas",
        text: "Incluye pseudo push-ups o aperturas en anillas para amplitud y definición del pectoral."
      },
      {
        name: "Enfriamiento y estiramiento",
        text: "Estira el pecho, hombros y tríceps durante 5-10 minutos para mejorar la recuperación."
      }
    ]
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Rutina Pecho Calistenia: Mejora tu Musculatura de Manera Efectiva | Nicolás Reyero</title>
        <meta name="description" content="Descubre la mejor rutina de pecho con calistenia. Ejercicios clave como flexiones, fondos y press para desarrollar un pecho fuerte, definido y simétrico." />
        <meta name="keywords" content="rutina pecho, ejercicios pecho, flexiones, fondos paralelas, press banca, pecho calistenia, entrenar pecho casa, pectoral desarrollo" />
        <link rel="canonical" href="https://calistenia.online/rutina-pecho" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Rutina Pecho Calistenia: Mejora tu Musculatura de Manera Efectiva" />
        <meta property="og:description" content="Desarrolla un pecho fuerte y definido con flexiones, fondos y ejercicios de calistenia. Guía completa con técnicas y progresiones." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://calistenia.online/rutina-pecho" />
      </Helmet>

      <StructuredData data={schemas.allSchemas} />

      <Header />
      <CommunityStickyBanner />
      
      <RoutineHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rutinas", href: "/programas/" },
          { label: "Rutina Pecho", href: "/rutina-pecho-calistenia/" }
        ]}
        title="Rutina"
        titleHighlight="Pecho"
        emoji="💪"
        description="Construye un pecho fuerte y definido con flexiones, fondos y ejercicios de calistenia para desarrollar masa muscular y fuerza."
        nivel="Todos los niveles"
        duracion="40-60 min"
        lugar="Casa o Gimnasio"
      />

      <QuickJumpBanner
        text="¿Quieres ver la rutina en acción?"
        linkText="Ver Video Principal"
        href="#video-principal"
        icon="▶️"
        variant="primary"
      />

      {/* Introducción SEO */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-xl text-muted-foreground leading-relaxed">
              La <strong>rutina de pecho</strong> es fundamental para desarrollar una musculatura superior fuerte y bien definida. Conocer los músculos que componen el pecho permite seleccionar los ejercicios más adecuados para lograr los mejores resultados. Una buena rutina no solo mejora la estética, sino que también incrementa la fuerza funcional y previene lesiones.
            </p>
          </div>
        </div>
      </section>

      {/* Anatomía del Pecho */}
      <section id="anatomia" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Anatomía y Función de los Músculos del Pecho
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            El pecho humano está compuesto principalmente por dos grandes grupos musculares esenciales para diversas actividades físicas, y trabaja en sinergia con los <Link to="/rutina-brazos-calistenia/" className="text-primary hover:underline font-medium underline-offset-4">brazos en calistenia</Link> y los <Link to="/rutinas-de-hombro-calistenia/" className="text-primary hover:underline font-medium underline-offset-4">hombros</Link>.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">💪 Pectoral Mayor</h3>
                <p className="text-muted-foreground mb-6">
                  El pectoral mayor es el músculo más prominente de la región pectoral y se divide en dos porciones: la clavicular y la esternal.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-secondary/20 p-6 rounded-lg">
                    <h4 className="font-bold mb-3 text-lg">Porción Clavicular</h4>
                    <p className="text-sm text-muted-foreground">
                      Se activa principalmente en <strong>movimientos inclinados</strong>, permitiendo desarrollar la parte superior del pecho y proporcionándole un aspecto más volumétrico.
                    </p>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-lg">
                    <h4 className="font-bold mb-3 text-lg">Porción Esternal</h4>
                    <p className="text-sm text-muted-foreground">
                      Se encuentra en la parte media y es crucial para la <strong>fuerza en movimientos horizontales</strong>, como el press de banca.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">🎯 Pectoral Menor</h3>
                <p className="text-muted-foreground">
                  Aunque más pequeño, también desempeña un papel importante. Se encuentra debajo del pectoral mayor y ayuda en la <strong>estabilidad del hombro</strong> y en la elevación de las costillas durante la respiración. Su activación es más sutil pero contribuye a la funcionalidad global del torso.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">⬆️</div>
                  <h3 className="font-bold mb-2">Pectoral Superior</h3>
                  <p className="text-sm text-muted-foreground">
                    Se activa con ejercicios inclinados, desarrollando la parte alta del músculo
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">↔️</div>
                  <h3 className="font-bold mb-2">Pectoral Medio</h3>
                  <p className="text-sm text-muted-foreground">
                    Se concentra en el trabajo en banco plano, proporcionando un crecimiento más ancho
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">⬇️</div>
                  <h3 className="font-bold mb-2">Pectoral Inferior</h3>
                  <p className="text-sm text-muted-foreground">
                    Se estimula en posiciones declinadas, fortaleciendo la zona baja del pectoral
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">
                  <strong>Un entendimiento profundo de la anatomía del pecho</strong> permite diseñar rutinas de entrenamiento más efectivas, maximizando los resultados en la musculatura pectoral y mejorando la fuerza funcional en diversas actividades deportivas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mejores Ejercicios */}
      <section id="ejercicios" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Mejores Ejercicios para Desarrollar el Pecho
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            El desarrollo del pecho se basa en la ejecución de ejercicios específicos que estimulen los músculos pectorales de forma efectiva.
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">🏋️ Press de Banca</h3>
                <p className="text-muted-foreground mb-6">
                  Este ejercicio es fundamental y se considera uno de los más eficaces. Realizarlo en un banco plano, ya sea con barra o mancuernas, permite trabajar tanto la parte media como los tríceps.
                </p>
                <div className="bg-secondary/20 p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Ejecución:</strong> Al bajar la barra o las mancuernas hasta el pecho y empujar hacia arriba, se estimulan de manera óptima los pectorales. Mantén la espalda bien apoyada y los pies firmes en el suelo.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">🦅 Aperturas con Mancuernas</h3>
                <p className="text-muted-foreground mb-6">
                  Este movimiento ayuda a aislar el pectoral, favoreciendo una mayor contracción muscular.
                </p>
                <div className="bg-secondary/20 p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Ejecución:</strong> Al acostarse en un banco plano y abrir los brazos en forma de cruz, se obtiene un rango de movimiento que maximiza el trabajo de las fibras musculares del pecho. Mantén un ligero ángulo en los codos.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">📐 Press de Banca Inclinado</h3>
                <p className="text-muted-foreground mb-6">
                  Al ajustar el banco a una inclinación, se activa la parte superior del pectoral, ofreciendo una variación que completa el trabajo del pecho.
                </p>
                <div className="bg-secondary/20 p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Importante:</strong> Es importante mantener la técnica adecuada para evitar lesiones y asegurar la eficacia del ejercicio. El ángulo ideal está entre 30-45 grados.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">💪 Flexiones</h3>
                <p className="text-muted-foreground mb-6">
                  Aunque a menudo pasadas por alto, las flexiones son una excelente opción que permite trabajar no solo el pecho, sino también el core.
                </p>
                <div className="bg-secondary/20 p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Ejecución:</strong> Manteniendo el cuerpo alineado y bajando hasta que el pecho casi toque el suelo, se pueden realizar múltiples variaciones para un entrenamiento más diverso. Mantén el core activado durante todo el movimiento.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">🔽 Press Floor</h3>
                <p className="text-muted-foreground mb-6">
                  Este ejercicio resulta ideal para quienes no cuentan con acceso a un banco.
                </p>
                <div className="bg-secondary/20 p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Ventaja:</strong> Al realizarlo en el suelo, se controla el rango de movimiento y se pueden introducir mancuernas de forma segura, ofreciendo así un gran trabajo muscular sin comprometer la seguridad del hombro.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  <strong>Cada uno de estos ejercicios puede ajustarse</strong> en función del nivel de experiencia y los objetivos de entrenamiento, asegurando así un desarrollo equilibrado y sólido del pectoral.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Principal con Estructura */}
      <VideoWithStructure
        id="video-principal"
        videoId="QmNx-kydmn0"
        videoTitle="Domina la Técnica Perfecta en Fondos"
        videoDescription="Aprende a ejecutar los fondos correctamente para maximizar el desarrollo del pecho y evitar los errores más comunes que frenan tu progreso."
        insights={[
          "La inclinación del torso determina si trabajas más pecho o tríceps",
          "Los codos deben formar un ángulo de 45° con el cuerpo, no 90°",
          "Mantén las escápulas retraídas para proteger los hombros",
          "El rango de movimiento completo es clave para la hipertrofia",
          "Progresa gradualmente desde fondos asistidos hasta lastrados"
        ]}
        nivel="Intermedio"
        zonaMuscular="Pecho"
        material="Paralelas o Barras"
        formato={{
          calentamiento: {
            ejercicios: 3,
            intensidad: "Movilidad de hombros y activación escapular"
          },
          partePrincipal: {
            series: 4,
            descripcion: "Fondos en paralelas con énfasis en pecho"
          },
          tempo: {
            activo: "2 segundos bajada controlada",
            descanso: "2-3 minutos entre series"
          }
        }}
        estimulos={[
          "Fuerza de empuje vertical",
          "Hipertrofia pectoral inferior",
          "Estabilidad escapular",
          "Fuerza de tríceps"
        ]}
        detalles="Los fondos en paralelas son uno de los ejercicios más efectivos para desarrollar el pecho inferior y los tríceps. La clave está en la técnica: inclínate hacia adelante para enfatizar el pecho, mantén los codos a 45° y controla todo el movimiento. Este video te enseña cómo evitar los errores más comunes y maximizar tus resultados."
      />

      {/* Rutinas Efectivas */}
      <section id="rutinas" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Rutinas Efectivas para Entrenar el Pecho
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Una rutina bien estructurada es crucial para optimizar el desarrollo del pecho. Existen diversas opciones que se adaptan a diferentes niveles.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">​</span>
                  Rutina para Principiantes
                </h3>
                <p className="text-muted-foreground mb-6">
                  Para una adecuada progresión, se recomienda alternar entre diferentes tipos de ejercicios, combinando movimientos compuestos y de aislamiento.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">1️⃣</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">Press de Banca</h4>
                      <p className="text-sm text-muted-foreground">2-3 series de 10-15 repeticiones</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">2️⃣</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">Aperturas con Mancuernas</h4>
                      <p className="text-sm text-muted-foreground">2-3 series de 10-15 repeticiones</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">3️⃣</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">Flexiones</h4>
                      <p className="text-sm text-muted-foreground">2-3 series de 8-10 repeticiones</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">📈</span>
                  Rutina para Intermedios
                </h3>
                <p className="text-muted-foreground mb-6">
                  Los intermedios pueden beneficiarse de una rutina más intensa con mayor volumen de entrenamiento.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">1️⃣</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">Press de Banca</h4>
                      <p className="text-sm text-muted-foreground">3 series de 8-10 repeticiones</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">2️⃣</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">Press Inclinado</h4>
                      <p className="text-sm text-muted-foreground">3 series de 8-10 repeticiones</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">3️⃣</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">Aperturas en Banco Inclinado</h4>
                      <p className="text-sm text-muted-foreground">3 series de 12 repeticiones</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">4️⃣</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">Flexiones</h4>
                      <p className="text-sm text-muted-foreground">3 series hasta el fallo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">🏆</span>
                  Rutina para Avanzados
                </h3>
                <p className="text-muted-foreground mb-6">
                  En el caso de los atletas avanzados, la rutina podría ser más exigente, incluyendo técnicas avanzadas.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">1️⃣</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">Press de Banca</h4>
                      <p className="text-sm text-muted-foreground">4 series de 6-8 repeticiones + series descendentes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">2️⃣</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">Press con Mancuernas</h4>
                      <p className="text-sm text-muted-foreground">3 series de 6-8 repeticiones</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">3️⃣</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">Aperturas con Polea</h4>
                      <p className="text-sm text-muted-foreground">3 series de 12 repeticiones</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">4️⃣</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">Flexiones</h4>
                      <p className="text-sm text-muted-foreground">4 series al fallo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  <strong>La variación en el entrenamiento</strong>, así como el rango de repeticiones y series, permite mantener los músculos siempre desafiados, facilitando el progreso y desarrollo muscular continuo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Combinación con otros grupos musculares */}
      <section id="combinacion" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Combinación de Rutinas para Pecho con Otros Grupos Musculares
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Integrar ejercicios de pecho con otros grupos musculares es una estrategia efectiva para optimizar el tiempo de entrenamiento.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">🔄 Pecho + Espalda</h3>
                <p className="text-muted-foreground mb-6">
                  Esta fusión no solo ayuda a equilibrar el desarrollo muscular, sino que también mejora la estabilidad y la postura. Al realizar un circuito que incluya el press de banca seguido de dominadas, se activa tanto el pectoral como los músculos dorsales.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-secondary/20 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium">Press de banca con dominadas</p>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium">Aperturas con remo con barra</p>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium">Flexiones con elevaciones</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">🦵 Pecho + Piernas</h3>
                <p className="text-muted-foreground mb-6">
                  Esta opción fomenta el aprovechamiento de los días de entrenamiento, alternando entre el tren superior e inferior. Por ejemplo, se puede empezar con un press de banca, seguido de sentadillas.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-secondary/20 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium">Press de banca con sentadillas</p>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium">Aperturas con elevación de talones</p>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg text-center">
                    <p className="text-sm font-medium">Flexiones con zancadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">⚡ Circuito de Cuerpo Completo</h3>
                <p className="text-muted-foreground">
                  Incorporar ejercicios de pecho en un circuito de cuerpo completo permite fortalecer el corazón y mejorar la resistencia. Alternar entre diferentes ejercicios de fuerza y cardio optimiza los resultados y aumenta la quema de grasa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Técnicas para Mejorar */}
      <section id="tecnicas" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Técnicas para Mejorar la Ejecución y Resultados
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La correcta ejecución de los ejercicios es fundamental para optimizar los resultados y prevenir lesiones.
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  Mantenimiento de la postura correcta
                </h3>
                <p className="text-muted-foreground">
                  Asegurarse de que la espalda esté recta y bien apoyada durante los ejercicios evita tensiones innecesarias en la columna. Una alineación adecuada contribuye a un mejor rendimiento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  Control del movimiento
                </h3>
                <p className="text-muted-foreground">
                  Al realizar cada repetición, es vital ejecutar el movimiento de manera controlada. Evitar movimientos demasiado rápidos permite una mayor activación muscular y una mejor conexión mente-músculo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-2xl">📏</span>
                  Uso de rangos de movimiento completos
                </h3>
                <p className="text-muted-foreground">
                  Completar el rango de movimiento en cada ejercicio es crucial para estimular el crecimiento muscular. Esto implica bajar la barra o las mancuernas hasta el pecho o abrir bien los brazos para maximizar la contracción.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-2xl">🔄</span>
                  Variación en los ejercicios
                </h3>
                <p className="text-muted-foreground">
                  Incorporar diferentes ejercicios y ángulos en la rutina favorece el desarrollo de todas las partes del pecho. Cambiar regularmente los movimientos evita la adaptación muscular y promueve un crecimiento continuo.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  <strong>La incorporación de estas técnicas</strong> no solo mejora la eficacia del entrenamiento, sino que también hace que cada sesión sea más desafiante y estimulante.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calentamiento y Prevención */}
      <section id="calentamiento" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Calentamiento y Prevención de Lesiones
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Realizar un calentamiento adecuado es fundamental para preparar el cuerpo antes de cualquier sesión de entrenamiento de pecho. Si vas empezando, repasa la <Link to="/calistenia-principiantes/" className="text-primary hover:underline font-medium underline-offset-4">guía de calistenia para principiantes</Link>; si buscas un plan completo, descubre nuestros <Link to="/programas/" className="text-primary hover:underline font-medium underline-offset-4">programas de calistenia</Link>.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">🔥 Ejercicios de Calentamiento Efectivos</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">💪</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">Flexiones de brazos suaves</h4>
                      <p className="text-sm text-muted-foreground">
                        Ayudan a activar los músculos del pecho y aumentar la circulación sanguínea sin fatiga excesiva
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">🌀</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">Estiramientos dinámicos</h4>
                      <p className="text-sm text-muted-foreground">
                        Incluir movimientos como giros de torso o estiramientos de brazos contribuirá a preparar los músculos y las articulaciones
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="text-2xl">🔄</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">Movimientos articulares</h4>
                      <p className="text-sm text-muted-foreground">
                        Realizar círculos con los hombros y estiramientos de pectorales puede mejorar la movilidad antes de realizar cargas más pesadas
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">🛡️ Prevención de Lesiones</h3>
                <p className="text-muted-foreground mb-6">
                  La prevención de lesiones debe ser prioritaria en cualquier rutina. Un enfoque sensato incluye prestar atención a la forma y técnica durante los ejercicios.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">Durante el entrenamiento:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Realizar los movimientos de manera controlada</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Identificar los límites del propio cuerpo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>No realizar ejercicios si aparecen molestias</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-3">Fuera del entrenamiento:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Incluir días de descanso adecuados</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Mantener una buena hidratación</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Asegurar nutrición adecuada</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nutrición y Descanso */}
      <section id="nutricion" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Nutrición y Descanso para Potenciar la Ganancia Muscular
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La alimentación es fundamental a la hora de aumentar la masa muscular, especialmente en la zona del pecho.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">🥗 Alimentación para el Desarrollo Muscular</h3>
                <p className="text-muted-foreground mb-6">
                  Incluir suficientes proteínas en la dieta es crucial. Estas deben provenir de diversas fuentes:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">Fuentes de Proteína:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">🍗</span>
                        <span>Carnes magras (pollo, pavo, ternera)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">🐟</span>
                        <span>Pescados (salmón, atún, bacalao)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">🥚</span>
                        <span>Huevos y productos lácteos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">🥜</span>
                        <span>Legumbres y frutos secos</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary/10 p-6 rounded-lg">
                    <h4 className="font-bold mb-2">Cantidad Recomendada</h4>
                    <p className="text-2xl font-bold text-primary mb-2">1.6-2.2g</p>
                    <p className="text-sm text-muted-foreground">
                      Por kilogramo de peso corporal diariamente. Esto favorece la reparación y el crecimiento muscular tras las sesiones de entrenamiento.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">🍚 Carbohidratos y Energía</h3>
                <p className="text-muted-foreground mb-6">
                  El consumo de carbohidratos también juega un papel esencial. Energizan el cuerpo y permiten realizar los entrenamientos con mayor intensidad.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-secondary/20 p-4 rounded-lg text-center">
                    <p className="text-2xl mb-2">🍚</p>
                    <p className="text-sm font-medium">Arroz integral</p>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg text-center">
                    <p className="text-2xl mb-2">🥣</p>
                    <p className="text-sm font-medium">Avena</p>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg text-center">
                    <p className="text-2xl mb-2">🥔</p>
                    <p className="text-sm font-medium">Patatas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">😴</span>
                  La Importancia del Descanso
                </h3>
                <p className="text-muted-foreground mb-6">
                  Dormir entre <strong>7 y 9 horas</strong> por noche facilita la recuperación muscular y hormonal. Durante el sueño, el cuerpo libera hormonas esenciales para la regeneración y el crecimiento muscular.
                </p>
                <p className="text-muted-foreground">
                  Un descanso adecuado también ayuda a prevenir el sobreentrenamiento y las lesiones. La planificación de las comidas a lo largo del día, combinando proteínas, carbohidratos y grasas saludables, asegurará que el organismo cuenta con los nutrientes necesarios.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Entrenamiento en Casa */}
      <section id="casa" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Entrenamiento de Pecho en Casa con Calistenia
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La calistenia ofrece un enfoque efectivo para desarrollar la musculatura del pecho sin necesidad de equipamiento costoso.
          </p>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">💪 Ejercicios con Peso Corporal</h3>
                <p className="text-muted-foreground mb-6">
                  Utilizando el peso corporal, se pueden realizar ejercicios muy efectivos que ayudan a fortalecer esta zona. Estas rutinas se pueden hacer en casa o en espacios al aire libre.
                </p>

                <div className="space-y-4">
                  <div className="bg-secondary/20 p-6 rounded-lg">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">👊</span>
                      Flexiones
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Este clásico activa toda la región del pecho. Variar la posición de las manos puede intensificar el trabajo en diferentes áreas del pectoral.
                    </p>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-lg">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">⬆️</span>
                      Flexiones con pies elevados
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Al colocar los pies sobre un banco o un escalón, se enfatiza la parte superior del pecho, aumentando la dificultad del ejercicio.
                    </p>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-lg">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">💎</span>
                      Flexiones diamante
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Esta variante implica colocar las manos en forma de diamante, lo que activa más los tríceps y la parte interna del pecho.
                    </p>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-lg">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <span className="text-xl">📏</span>
                      Flexiones en profundidad
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Usar dos elementos, como libros o superficies estables, permite bajar más allá del nivel de las manos, aumentando el rango de movimiento y la intensidad.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  <strong>Es importante incorporar estas variaciones de manera progresiva</strong>, empezando por aquellas que se controlan mejor y avanzando hacia los movimientos más desafiantes. Mantener una buena técnica es esencial para maximizar el ejercicio y prevenir lesiones. Con un enfoque constante y dedicado, se pueden obtener resultados notables en el desarrollo del pecho usando solo el peso corporal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipamiento Recomendado */}
      <section id="equipamiento" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Equipamiento Recomendable para una Rutina Completa
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Para llevar a cabo una rutina de pecho efectiva, contar con el equipamiento adecuado es fundamental.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 text-center">🛋️</div>
                  <h3 className="font-bold text-lg mb-3 text-center">Banco de pesas ajustable</h3>
                  <p className="text-sm text-muted-foreground">
                    Un banco que permita modificar la inclinación facilita trabajar diferentes ángulos del pectoral. Ideal para press inclinado o plano.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 text-center">🏋️</div>
                  <h3 className="font-bold text-lg mb-3 text-center">Mancuernas</h3>
                  <p className="text-sm text-muted-foreground">
                    Versátiles y esenciales, las mancuernas permiten una variedad de movimientos, desde aperturas hasta presses, adaptándose al nivel de cada usuario.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 text-center">⚡</div>
                  <h3 className="font-bold text-lg mb-3 text-center">Barra de pesas</h3>
                  <p className="text-sm text-muted-foreground">
                    La barra es un elemento clásico para el press de banca. Permite levantar más peso y mejorar la fuerza de manera progresiva.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 text-center">🎨</div>
                  <h3 className="font-bold text-lg mb-3 text-center">Bandas de resistencia</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfectas para realizar ejercicios de calentamiento y de activación muscular. Ayudan a aumentar la dificultad de los movimientos básicos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 text-center">🧘</div>
                  <h3 className="font-bold text-lg mb-3 text-center">Colchoneta</h3>
                  <p className="text-sm text-muted-foreground">
                    Aportar comodidad durante las flexiones y otros ejercicios en el suelo es esencial. Una colchoneta evita lesiones y brinda soporte.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardContent className="p-6 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Tener el equipo adecuado</strong> puede incrementar la eficacia de los entrenamientos y ayudarte a alcanzar tus objetivos más rápido.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Videos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {pechoVideos.length > 0 ? (
            <VideoGallery 
              videos={pechoVideos}
              title="📹 Biblioteca de Videos de Entrenamiento de Pecho"
              showStats={true}
            />
          ) : (
            <div className="text-center">
              <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
                📹 Videos de Entrenamiento de Pecho
              </h2>
              <p className="text-muted-foreground">
                Próximamente añadiremos más contenido en video sobre entrenamiento de pecho.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Comunidad */}
      <CommunityCTA />

      {/* CTA Final */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl lg:text-5xl mb-6">
              Construye un <span className="text-primary">Pecho Poderoso</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Domina progresiones avanzadas como fondos en anillas, flexiones a una mano y planche leans. Programas estructurados para maximizar hipertrofia y fuerza en pecho.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📈</div>
                  <h3 className="font-bold mb-2">Progresión Avanzada</h3>
                  <p className="text-sm text-muted-foreground">Desde flexiones básicas hasta planche</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🎥</div>
                  <h3 className="font-bold mb-2">Técnica Perfecta</h3>
                  <p className="text-sm text-muted-foreground">Videos detallados de cada variante</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">💥</div>
                  <h3 className="font-bold mb-2">Máxima Hipertrofia</h3>
                  <p className="text-sm text-muted-foreground">Volumen optimizado para crecimiento</p>
                </CardContent>
              </Card>
            </div>
            
            <Button size="lg" className="bg-gradient-primary" asChild>
              <Link to="/programas">Acceder a Programas de Pecho</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RutinaPecho;
