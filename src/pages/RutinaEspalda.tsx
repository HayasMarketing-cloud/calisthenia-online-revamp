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
import ExercisesTable from "@/components/seo/ExercisesTable";
import { useRoutineSchemas } from "@/hooks/useRoutineSchemas";

const RutinaEspalda = () => {
  const espaldaVideos = getVideosByZone(allVideos, 'Espalda', { limit: 9, sortBy: 'engagement' });

  const schemas = useRoutineSchemas({
    routineName: "Ejercicios de espalda calistenia: rutina completa",
    routineDescription: "Rutina de espalda con calistenia: dominadas, remo invertido y ejercicios sin material para entrenar dorsales en casa o en el parque, con o sin barra.",
    videoId: "joOoHh_P5RM",
    videoTitle: "Cómo Hacer la Primera Dominada - Retracción Escapular",
    videoDuration: "PT11M15S",
    uploadDate: "2024-01-15",
    totalTime: "PT45M",
    breadcrumbs: [
      { name: "Inicio", url: "https://calisthenia.online/" },
      { name: "Rutinas", url: "https://calisthenia.online/programas/" },
      { name: "Ejercicios de espalda calistenia", url: "https://calisthenia.online/rutina-espalda-calistenia/" }
    ],
    rating: {
      itemName: "Ejercicios de espalda calistenia",
      ratingValue: 4.8,
      reviewCount: 267,
      bestRating: 5,
      worstRating: 1
    },
    steps: [
      {
        name: "Activación escapular",
        text: "5 minutos de pull-aparts con banda, scapular pulls colgado y face pulls para activar dorsal y romboides."
      },
      {
        name: "Dominadas y variantes",
        text: "Dominadas pronas, supinas y neutras según nivel. Si no haces ninguna aún: asistidas con banda o negativas. 3-4 series de 4-10 repeticiones."
      },
      {
        name: "Remo invertido",
        text: "Remo invertido en barra baja o con toalla en puerta para grosor dorsal. 3-4 series de 8-12 repeticiones."
      },
      {
        name: "Accesorios sin material",
        text: "Superman, reverse snow angels y face pulls con banda para postura y trapecio medio. 3 series de 12-15 repeticiones."
      },
      {
        name: "Estiramiento",
        text: "Hang pasivo en barra 2x30s, dead hang y estiramiento de dorsal lateral 5 minutos para favorecer recuperación."
      }
    ]
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Ejercicios de espalda calistenia: espalda fuerte y ancha en casa</title>
        <meta name="description" content="Ejercicios de espalda calistenia para casa y parque: dominadas, remo invertido y face pulls. Rutina semanal lista con progresiones. ¡Empieza hoy gratis!" />
        <meta name="keywords" content="ejercicios espalda calistenia, ejercicios espalda en casa, ejercicios de espalda en casa, ejercicios espalda con barra, ejercicios espalda sin material, dominadas, remo invertido, ejercicios para dorsales en casa, rutina espalda calistenia" />
        <link rel="canonical" href="https://calisthenia.online/rutina-espalda-calistenia/" />

        {/* Open Graph */}
        <meta property="og:title" content="Ejercicios de espalda calistenia: espalda fuerte y ancha en casa" />
        <meta property="og:description" content="Dominadas, remo invertido y ejercicios de espalda calistenia para casa o parque. Tabla canónica de ejercicios, rutina semanal y guía técnica." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://calisthenia.online/rutina-espalda-calistenia/" />
      </Helmet>

      <StructuredData data={schemas.allSchemas} />

      <Header />
      <CommunityStickyBanner />

      <RoutineHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rutinas", href: "/programas/" },
          { label: "Ejercicios de espalda calistenia", href: "/rutina-espalda-calistenia/" }
        ]}
        fullH1="Ejercicios de espalda con calistenia: espalda fuerte y ancha"
        description="Rutina completa de espalda con calistenia: en casa o en el parque, con barra o sin material. Dominadas, remo invertido y trabajo escapular para una espalda fuerte y postura sana."
        nivel="Todos los niveles"
        duracion="35-50 min"
        lugar="Casa o Parque"
      />

      <QuickJumpBanner
        text="¿Quieres ver la técnica explicada en vídeo?"
        linkText="Ver vídeo principal"
        href="#video-principal"
        icon="Play"
        variant="primary"
      />

      {/* Introducción SEO */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Esta guía reúne los <strong>ejercicios de espalda calistenia</strong> que realmente funcionan: dominadas, remo invertido, face pulls y trabajo escapular. Todos se pueden hacer <strong>en casa o en el parque</strong>, con una sola barra o incluso <strong>sin material</strong> usando una toalla y una puerta. Más abajo encontrarás la tabla canónica con cada ejercicio, una rutina semanal lista para empezar y los errores que veo a diario como entrenador.
            </p>
          </div>
        </div>
      </section>

      {/* TABLA CANÓNICA DE EJERCICIOS — fuente única desde BD */}
      <section id="tabla-ejercicios" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
              Tabla completa de ejercicios de espalda calistenia
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-3xl mx-auto">
              Lista canónica de los mejores ejercicios de espalda en calistenia. Cada uno incluye descripción, músculos, material y nivel. Es la misma tabla que usamos para programar a clientes en el área privada.
            </p>
            <ExercisesTable
              muscleGroup="Espalda"
              caption="Ejercicios canónicos de espalda en calistenia, ordenados por relevancia"
            />
          </div>
        </div>
      </section>

      {/* Ejercicios de espalda en casa sin material */}
      <section id="espalda-en-casa-sin-material" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
              Ejercicios de espalda en casa sin material
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Si entrenas en casa y no tienes barra ni gomas, estos cuatro ejercicios cubren toda la espalda usando solo el suelo, una puerta y una toalla resistente. Para una sesión más completa puedes combinarlos con la <Link to="/rutina-calistenia-en-casa/" className="text-primary hover:underline font-medium underline-offset-4">rutina de calistenia en casa</Link> o con una <Link to="/rutina-full-body/" className="text-primary hover:underline font-medium underline-offset-4">rutina full body</Link>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Remo invertido con toalla en puerta</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    El sustituto perfecto del remo en barra. Pasa una toalla resistente al otro lado de una puerta cerrada (asegúrate de que está bien cerrada y aguanta el peso), agárrala con ambas manos, inclínate hacia atrás con cuerpo recto y rema acercando el pecho a la puerta.
                  </p>
                  <p className="text-xs text-muted-foreground"><strong>Series:</strong> 3-4 x 8-12 · <strong>Descanso:</strong> 60-90s</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Superman</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Boca abajo, eleva brazos y piernas a la vez contrayendo lumbares y glúteos. Aguanta 1-2 segundos arriba. Es el mejor ejercicio sin material para fortalecer la espalda baja y los erectores espinales.
                  </p>
                  <p className="text-xs text-muted-foreground"><strong>Series:</strong> 3 x 12-15 · <strong>Descanso:</strong> 45s</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Reverse snow angels</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Boca abajo con palmas hacia abajo. Despega brazos del suelo y dibuja un ángel de nieve invertido. Activa trapecio medio, romboides y deltoide posterior — claves para una postura sana si pasas mucho tiempo sentado.
                  </p>
                  <p className="text-xs text-muted-foreground"><strong>Series:</strong> 3 x 10-12 · <strong>Descanso:</strong> 45s</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Pendlay row con mochila</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Cuando ya dominas el remo con toalla, carga una mochila con libros o garrafas. Torso paralelo al suelo, sujeta la mochila y rema hacia el abdomen. Bájala hasta tocar el suelo en cada repetición.
                  </p>
                  <p className="text-xs text-muted-foreground"><strong>Series:</strong> 3-4 x 8-10 · <strong>Descanso:</strong> 90s</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Ejercicios de espalda con barra: dominadas y remo invertido */}
      <section id="espalda-con-barra" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
              Ejercicios de espalda calistenia con barra: dominadas y remo invertido
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Si tienes acceso a una barra de dominadas (en casa o en un parque de calistenia), estos son los ejercicios que dan más resultado por minuto invertido.
            </p>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-3">Dominadas (pull-ups)</h3>
                  <p className="text-muted-foreground mb-4">
                    El ejercicio rey de la espalda en calistenia. Cuelga con agarre prono (palmas hacia delante), hombros activados (no encogidos en las orejas), tira hasta que la barbilla supere la barra y baja controlando hasta extender los codos. Trabaja dorsal ancho, romboides, trapecio medio y bíceps en un solo movimiento.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-background p-4 rounded-lg">
                      <p className="font-bold mb-1">Principiante</p>
                      <p className="text-muted-foreground">Asistidas con banda · 3 x 5-8</p>
                    </div>
                    <div className="bg-background p-4 rounded-lg">
                      <p className="font-bold mb-1">Intermedio</p>
                      <p className="text-muted-foreground">Estrictas · 4 x 6-10</p>
                    </div>
                    <div className="bg-background p-4 rounded-lg">
                      <p className="font-bold mb-1">Avanzado</p>
                      <p className="text-muted-foreground">Lastradas · 5 x 4-6</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-3">Remo invertido (australian pull-up)</h3>
                  <p className="text-muted-foreground mb-4">
                    Túmbate bajo una barra baja (0,9-1,1 m), agárrala y tira del pecho hacia ella manteniendo el cuerpo recto en plancha. Cuanto más horizontal estés, más difícil. Es el mejor ejercicio para el grosor del dorsal en calistenia y la mejor progresión hacia la primera dominada.
                  </p>
                  <p className="text-sm text-muted-foreground"><strong>Series:</strong> 3-4 x 8-12 · <strong>Descanso:</strong> 90s</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-3">Scapular pull-ups</h3>
                  <p className="text-muted-foreground mb-4">
                    Cuelga de la barra con brazos completamente extendidos y, sin doblar codos, hunde los hombros tirando de los omóplatos hacia abajo y atrás. El cuerpo sube unos centímetros. Es la base técnica de toda dominada limpia: sin esta activación, los hombros se cargan y aparece dolor.
                  </p>
                  <p className="text-sm text-muted-foreground"><strong>Series:</strong> 3 x 8-10 · <strong>Descanso:</strong> 60s</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo entrenar dorsales en casa */}
      <section id="como-entrenar-dorsales-casa" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
              Cómo entrenar dorsales en casa con calistenia
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Para que el dorsal crezca solo necesitas dos cosas: <strong>tracción vertical</strong> (algo que se parezca a una dominada) y <strong>tracción horizontal</strong> (algo que se parezca a un remo). Combina las dos cada semana y el resto da igual.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Tracción vertical en casa</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Con barra de puerta:</strong> dominadas asistidas con banda → estrictas</li>
                    <li>• <strong>Sin barra:</strong> dead hangs en una rama o estructura segura</li>
                    <li>• <strong>Como mínimo:</strong> face pulls con banda anclada en alto</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Tracción horizontal en casa</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Con toalla en puerta:</strong> remo invertido (el más versátil)</li>
                    <li>• <strong>Con mochila cargada:</strong> Pendlay row</li>
                    <li>• <strong>Con banda elástica:</strong> seated row con banda en pies</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 bg-secondary/10 p-6 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Regla práctica:</strong> haz al menos <strong>3 series</strong> de tracción vertical y <strong>3 series</strong> de tracción horizontal por semana, repartidas en 2 días. Es lo mínimo que mueve la aguja en hipertrofia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rutina de espalda calistenia para principiantes */}
      <section id="rutina-principiantes" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
              Rutina de espalda calistenia para principiantes
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Sesión completa de 35-40 minutos, 2 veces por semana (lunes y jueves, por ejemplo). Apta para empezar desde cero, sin material salvo una banda elástica y un sitio donde colgarse.
            </p>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">1. Calentamiento (5 min)</h3>
                  <p className="text-sm text-muted-foreground">Pull-aparts con banda 2x15 · Rotaciones de hombro 1x10/lado · Dead hang 2x20s</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">2. Bloque principal (25 min)</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>· Scapular pull-ups: 3 x 8 (descanso 60s)</li>
                    <li>· Dominadas asistidas con banda o negativas: 4 x 5 (descanso 90s)</li>
                    <li>· Remo invertido con toalla en puerta: 3 x 10 (descanso 75s)</li>
                    <li>· Face pulls con banda: 3 x 15 (descanso 45s)</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">3. Accesorios sin material (5 min)</h3>
                  <p className="text-sm text-muted-foreground">Superman 3 x 12 · Reverse snow angels 3 x 10</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">4. Estiramiento (5 min)</h3>
                  <p className="text-sm text-muted-foreground">Hang pasivo en barra 2x30s · Estiramiento lateral de dorsal 30s/lado · Postura del niño 60s</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vídeo principal */}
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
          calentamiento: { ejercicios: 4, intensidad: "Movilidad articular de hombros y activación escapular" },
          partePrincipal: { series: 8, descripcion: "Dead hangs, scapular pulls, negativas y dominadas asistidas" },
          tempo: { activo: "Controlado en fase concéntrica", descanso: "2-3 minutos entre series" }
        }}
        estimulos={["Fuerza de tracción vertical", "Control escapular", "Resistencia de agarre", "Estabilidad de core"]}
        detalles="Esta serie de 8 episodios te lleva desde tu primera dominada hasta dominadas superlativas y explosivas. Cada video construye sobre el anterior, asegurando una progresión sólida y segura."
      />

      {/* Programación semanal */}
      <section id="programacion-semanal" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
              Programación semanal: cuántos días, series y repeticiones
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Para una espalda fuerte y simétrica con calistenia basta con <strong>2 sesiones por semana</strong> bien estructuradas. Estas son las pautas que aplico a mis clientes según objetivo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-sm font-bold uppercase text-primary mb-2">Hipertrofia</p>
                  <p className="text-3xl font-bold mb-2">3-4</p>
                  <p className="text-sm font-medium mb-1">series por ejercicio</p>
                  <p className="text-xs text-muted-foreground">8-12 reps · 60-90s descanso</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-sm font-bold uppercase text-primary mb-2">Fuerza</p>
                  <p className="text-3xl font-bold mb-2">4-6</p>
                  <p className="text-sm font-medium mb-1">series por ejercicio</p>
                  <p className="text-xs text-muted-foreground">3-6 reps · 2-3 min descanso</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-sm font-bold uppercase text-primary mb-2">Resistencia</p>
                  <p className="text-3xl font-bold mb-2">2-3</p>
                  <p className="text-sm font-medium mb-1">series por ejercicio</p>
                  <p className="text-xs text-muted-foreground">15+ reps · 30-45s descanso</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Errores comunes */}
      <section id="errores-comunes" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
              Errores comunes al entrenar la espalda en calistenia
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Llevo años corrigiendo los mismos cuatro errores en parques y consultas online. Si los evitas, tu progreso se acelera muchísimo.
            </p>

            <div className="space-y-4">
              <Card className="border-l-4 border-destructive">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">1. Hombros encogidos en las dominadas</h3>
                  <p className="text-sm text-muted-foreground">Si subes con los hombros pegados a las orejas, no trabaja el dorsal: trabaja el trapecio superior y el cuello. Antes de tirar, hunde escápulas (scapular pull) y mantén pecho fuera.</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-destructive">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">2. Recorrido a medias</h3>
                  <p className="text-sm text-muted-foreground">Subir solo a medio camino y bajar sin extender los codos engaña al cerebro pero no construye espalda. Cada repetición empieza con brazos completamente estirados y termina con la barbilla por encima.</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-destructive">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">3. Olvidar la tracción horizontal</h3>
                  <p className="text-sm text-muted-foreground">Solo dominadas (vertical) genera espaldas anchas pero planas y hombros desbalanceados. Mete remo invertido o remo con mochila siempre, en todas las sesiones.</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-destructive">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">4. Saltarse el trabajo escapular</h3>
                  <p className="text-sm text-muted-foreground">Los face pulls, pull-aparts y reverse snow angels parecen "ejercicios de calentamiento", pero son los que mantienen la articulación del hombro sana cuando subes el volumen de dominadas. Hazlos cada sesión.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Preguntas frecuentes sobre ejercicios de espalda calistenia
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Las dudas que más me encuentro como entrenador de calistenia. Si vas empezando, complementa esta rutina con la <Link to="/calistenia-principiantes/" className="text-primary hover:underline font-medium underline-offset-4">guía de calistenia para principiantes</Link>; y si quieres acelerar tu progreso, échale un ojo a nuestros <Link to="/programas/" className="text-primary hover:underline font-medium underline-offset-4">programas de calistenia</Link> o entrena al aire libre en un <Link to="/calistenia-en-parque/" className="text-primary hover:underline font-medium underline-offset-4">parque de calistenia</Link>.
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">¿Puedo entrenar la espalda en casa solo con calistenia?</h3>
                <p className="text-muted-foreground">
                  Sí. Con una barra de dominadas de puerta (20-30€) y una toalla resistente puedes hacer dominadas, remo invertido en puerta y todos los accesorios. Sin material absoluto, el remo con toalla en puerta + Superman + reverse snow angels cubre el 80% del estímulo necesario.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">¿Cuántos días a la semana entreno espalda en calistenia?</h3>
                <p className="text-muted-foreground">
                  <strong>2 sesiones por semana</strong> bastan para principiantes e intermedios. Si te dedicas a perseguir muscle-up o front lever puedes subir a 3 sesiones, pero deja siempre 48h de descanso entre ellas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">¿Qué ejercicio sustituye a las dominadas si aún no puedo hacer ninguna?</h3>
                <p className="text-muted-foreground">
                  Combina <strong>dominadas asistidas con banda</strong> + <strong>negativas</strong> (saltas arriba y bajas en 5 segundos) + <strong>remo invertido</strong>. En 6-10 semanas la mayoría consigue su primera dominada estricta con esta combinación.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">¿Cómo conseguir una espalda en V con calistenia?</h3>
                <p className="text-muted-foreground">
                  La forma en V depende del ancho del dorsal alto. Para conseguirla, prioriza <strong>dominadas con agarre amplio prono</strong> y trabaja a fallo técnico. Combínalas con remo invertido para grosor y mantén grasa corporal moderada para que se vea.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">¿Sirven las dominadas para corregir la postura?</h3>
                <p className="text-muted-foreground">
                  Mucho, sí, siempre que las combines con <strong>face pulls, pull-aparts y reverse snow angels</strong>. Solo dominadas puede acabar acortando pectoral y rotadores internos. La combinación tracción vertical + horizontal + trabajo escapular es lo que cambia la postura.
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
              title="📹 Biblioteca de vídeos de entrenamiento de espalda"
              showStats={true}
            />
          ) : (
            <div className="text-center">
              <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
                📹 Vídeos de entrenamiento de espalda
              </h2>
              <p className="text-muted-foreground">
                Próximamente añadiremos más contenido en vídeo sobre entrenamiento de espalda.
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
              Construye una <span className="text-primary">espalda en V</span> solo con calistenia
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Domina la primera dominada, el muscle-up y el front lever con programas estructurados de 12 semanas. Espalda ancha, gruesa y postura sana, sin gimnasio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold mb-2">Skills avanzadas</h3>
                  <p className="text-sm text-muted-foreground">Front lever, muscle-up y one arm pull-up</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="font-bold mb-2">Programación periodizada</h3>
                  <p className="text-sm text-muted-foreground">12 semanas de progresión estructurada</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">💪</div>
                  <h3 className="font-bold mb-2">Fuerza funcional</h3>
                  <p className="text-sm text-muted-foreground">Desarrollo equilibrado de toda la espalda</p>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" className="bg-gradient-primary" asChild>
              <Link to="/programas">Acceder a programas de espalda</Link>
            </Button>

            <p className="text-sm text-muted-foreground mt-8">
              ¿Buscas más rutinas? <Link to="/rutina-calistenia-en-casa/" className="text-primary hover:underline">Rutina completa de calistenia en casa</Link> · <Link to="/calistenia-en-parque/" className="text-primary hover:underline">Calistenia en el parque</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RutinaEspalda;
