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
import { ArrowRight } from "lucide-react";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByZone } from "@/lib/videoUtils";
import RoutineBreadcrumbs from "@/components/routine/RoutineBreadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoWithStructure from "@/components/VideoWithStructure";
import RoutineHero from "@/components/routine/RoutineHero";
import QuickJumpBanner from "@/components/QuickJumpBanner";
import CommunityCTA from "@/components/CommunityCTA";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import StructuredData from "@/components/seo/StructuredData";
import { useRoutineSchemas } from "@/hooks/useRoutineSchemas";

const RutinaAbdominales = () => {
  // Rich Snippets: VideoObject + HowTo + Organization + BreadcrumbList + AggregateRating
  const { allSchemas } = useRoutineSchemas({
    routineName: "Rutina de Abdominales Calistenia para Six Pack Definido",
    routineDescription: "Rutina completa de abdominales con calistenia. Ejercicios progresivos para fortalecer el core, desarrollar abdominales definidos y mejorar la estabilidad funcional sin equipos.",
    videoId: "MnbNx2x-RY8",
    videoTitle: "Rutina de Abdominales 10 Minutos - Calistenia en Casa",
    videoDuration: "PT10M",
    totalTime: "PT20M",
    uploadDate: "2024-01-15",
    breadcrumbs: [
      { name: "Inicio", url: "https://calisthenia.online/" },
      { name: "Rutinas", url: "https://calisthenia.online/programas/" },
      { name: "Rutina Abdominales", url: "https://calisthenia.online/rutina-abdominales/" }
    ],
    rating: {
      itemName: "Rutina de Abdominales Calistenia",
      ratingValue: 4.8,
      reviewCount: 342,
      bestRating: 5,
      worstRating: 1
    },
    steps: [
      {
        name: "Calentamiento del Core",
        text: "Comienza con 3-5 minutos de activación del core con movimientos suaves: rotaciones de tronco, flexiones laterales y respiración diafragmática profunda.",
      },
      {
        name: "Plancha Abdominal",
        text: "Mantén la posición de plancha con codos bajo los hombros, cuerpo alineado y core activado. Realiza 3 series de 30-60 segundos.",
      },
      {
        name: "Crunches Abdominales",
        text: "Acostado boca arriba, manos detrás de la cabeza, eleva el tronco superior contrayendo abdominales. 3 series de 15-20 repeticiones.",
      },
      {
        name: "Elevaciones de Piernas",
        text: "Desde posición supina, eleva las piernas extendidas hasta 90 grados manteniendo la zona lumbar pegada al suelo. 3 series de 12-15 repeticiones.",
      },
      {
        name: "Mountain Climbers",
        text: "En posición de plancha alta, alterna llevando las rodillas hacia el pecho de forma dinámica. 3 series de 20 repeticiones (10 por pierna).",
      },
      {
        name: "Plancha Lateral",
        text: "Apoyado en un antebrazo, cuerpo lateral alineado, mantén la posición activando oblicuos. 3 series de 20-40 segundos por lado.",
      },
      {
        name: "Estiramientos Finales",
        text: "Finaliza con estiramientos del core: postura del niño, cobra y rotaciones suaves de columna durante 3-5 minutos.",
      }
    ]
  });

  return (
    <>
      <Helmet>
        <title>Rutina Abdominales Calistenia: Six Pack Definido | Calistenia Online</title>
        <meta 
          name="description" 
          content="Rutina abdominales calistenia completa. Ejercicios abdominales efectivos, planificación semanal y técnicas para conseguir un six pack definido naturalmente." 
        />
        <meta 
          name="keywords" 
          content="rutina abdominales, ejercicios abdominales, six pack, abdomen definido, plancha abdominal, crunches, entrenamiento abdominal, recto abdominal" 
        />
        <link rel="canonical" href="https://calisthenia.online/rutina-abdominales-calistenia/" />
        
        <meta property="og:title" content="Rutina Abdominales Calistenia Completa" />
        <meta property="og:description" content="Ejercicios abdominales efectivos para conseguir abdominales definidos. Planificación, técnicas y video guiado." />
        <meta property="og:image" content="https://calisthenia.online/assets/calisthenia-abdomen.webp" />
        <meta property="og:url" content="https://calisthenia.online/rutina-abdominales-calistenia/" />
        <meta property="og:type" content="article" />
      </Helmet>

      <StructuredData data={allSchemas} />
      
      <Header />
      <CommunityStickyBanner />

      <RoutineHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rutinas", href: "/programas/" },
          { label: "Rutina Abdominales", href: "/rutina-abdominales-calistenia/" }
        ]}
        title="Rutina de"
        titleHighlight="Abdominales"
        emoji="Calistenia 🔥"
        description="Una rutina abdominal adecuada es esencial para fortalecer los abdominales y mejorar la funcionalidad en los entrenamientos. Desarrolla un six pack definido con ejercicios funcionales que trabajan todo el abdomen y previenen lesiones."
        nivel="Todos los Niveles"
        duracion="10-30 min"
        lugar="Casa/Parque"
      />

      {/* Quick Jump Banner */}
      <QuickJumpBanner 
        text="¿Quieres ir directo a los ejercicios?"
        linkText="Ver Rutina Práctica"
        href="#video-rutina"
        icon="💪"
        variant="primary"
      />

      {/* Importancia de los Abdominales */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            La Importancia de Abdominales Fuertes en el Entrenamiento
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Contar con abdominales fuertes es fundamental para el rendimiento físico. Un abdomen tonificado no solo contribuye a la estética, sino que también juega un papel esencial en la postura y el soporte de la columna, algo que también trabajamos a fondo en la <Link to="/rutina-core-calistenia/" className="text-primary hover:underline font-medium underline-offset-4">rutina de core con calistenia</Link>.
          </p>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-8">
                <div className="text-5xl mb-4 text-center">🎯</div>
                <h3 className="font-bold text-xl mb-3 text-center">Función de los Abdominales en la Postura</h3>
                <p className="text-muted-foreground mb-4">
                  Los abdominales actúan como soporte fundamental de tu columna vertebral. Unos abdominales fuertes mantienen la columna alineada y mejoran la postura, reduciendo dolores de espalda y mejorando tu rendimiento en todos los ejercicios.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Reducción del riesgo de caídas</li>
                  <li>Mejor comportamiento en actividades deportivas</li>
                  <li>Incremento en la eficiencia de los ejercicios de fuerza</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-8">
                <div className="text-5xl mb-4 text-center">🔗</div>
                <h3 className="font-bold text-xl mb-3 text-center">Relación entre Zona Lumbar, Espalda Recta y Abdominales</h3>
                <p className="text-muted-foreground mb-4">
                  La conexión entre la zona lumbar y los abdominales es crucial para evitar lesiones. Una espalda recta, lograda mediante el fortalecimiento de los músculos del core, favorece una alineación adecuada, esencial durante la práctica de cualquier ejercicio.
                </p>
                <p className="text-sm text-muted-foreground">
                  Es imperativo mantener la lumbar en una posición neutra durante los ejercicios, lo que garantiza la protección de la columna vertebral.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-8">
                <div className="text-5xl mb-4 text-center">🛡️</div>
                <h3 className="font-bold text-xl mb-3 text-center">Prevención de Lesiones mediante Abdominales Fuertes</h3>
                <p className="text-muted-foreground mb-4">
                  Unos abdominales fuertes actúan como una armadura natural para tu cuerpo. Protegen la zona lumbar durante levantamientos pesados y movimientos explosivos, previniendo lesiones comunes en entrenamientos intensos.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Un abdomen tonificado distribuye mejor las cargas</li>
                  <li>Reduce la probabilidad de lesiones durante actividad física intensa</li>
                  <li>Permite realizar actividades diarias sin riesgo de dolor</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ejercicios Abdominales para Six Pack Definido */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Ejercicios Abdominales para un Six Pack Definido
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Estos ejercicios fundamentales te ayudarán a construir unos abdominales fuertes y definidos, trabajando todas las zonas del abdomen de manera efectiva.
          </p>
          
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Plancha Isométrica */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">1. Plancha Isométrica y sus Variantes</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Abdomen completo, recto abdominal y transverso
                </p>
                
                <div className="mb-6">
                  <p className="mb-2"><strong>Series:</strong> 3-4</p>
                  <p className="mb-4"><strong>Tiempo:</strong> 30-60 segundos (principiantes) / 60-120 segundos (avanzados)</p>
                  <p className="text-muted-foreground mb-4">
                    La plancha isométrica es esencial para fortalecer toda la zona abdominal y trabajar múltiples grupos musculares al mismo tiempo. Posición de push-up pero sobre antebrazos. Mantén línea recta de cabeza a talones, glúteos apretados.
                  </p>
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="variante-lateral">
                    <AccordionTrigger className="text-lg font-semibold">
                      Plancha Lateral para Trabajar Oblicuos Externos
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="mb-3">
                        La plancha lateral es ideal para centrar el esfuerzo en los oblicuos. Se debe mantener el cuerpo recto y bien alineado, apoyando un antebrazo y los pies de lado.
                      </p>
                      <p className="font-semibold mb-2">Mantener la Tensión y Postura Correcta:</p>
                      <p>
                        Es clave que la pelvis no caiga ni se eleve. Mantener la tensión en el abdomen es esencial para aprovechar al máximo la plancha y evitar lesiones. La postura debe mantenerse para trabajar eficazmente la zona.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Crunches */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">2. Crunches y Encogimientos para la Zona Superior</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Recto abdominal superior
                </p>
                
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 15-20 (principiantes) / 20-30 (avanzados)</p>
                
                <div className="bg-secondary/20 p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    ⚠️ Técnica para Evitar Lesiones Lumbares:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Es crucial mantener la zona lumbar en contacto con el suelo al realizar crunches. Esto evitará lesiones y asegurará una mayor eficacia en el ejercicio. No tires del cuello con las manos, usa los abdominales para elevarte.
                  </p>
                </div>
                
                <p className="text-muted-foreground">
                  Estos ejercicios ayudan a centrar el trabajo en el recto abdominal, permitiendo un desarrollo muscular eficaz en la parte superior del abdomen. Realizar de 3 a 4 series es lo óptimo para empezar.
                </p>
              </CardContent>
            </Card>

            {/* Elevaciones de Piernas */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">3. Elevaciones de Piernas para Abdominales Inferiores</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Abdomen inferior, hip flexors, forma de "V"
                </p>
                
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 10-15</p>
                
                <p className="text-muted-foreground mb-4">
                  Este ejercicio es excelente para trabajar la parte baja del abdomen, conocida como "la V". Se requiere control y precisión en el movimiento.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold mb-2">Forma de V y Control del Movimiento:</p>
                    <p className="text-sm text-muted-foreground">
                      Se debe levantar las piernas en un movimiento controlado y constante, buscando formar una forma de V con el torso al acercarse a las piernas. La zona lumbar debe mantenerse pegada al suelo.
                    </p>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <p className="font-semibold mb-2">⚠️ Evitar que los Pies Toquen el Suelo:</p>
                    <p className="text-sm text-muted-foreground">
                      No dejar caer los pies al suelo es fundamental para mantener tensión en el abdomen. Esto maximiza el trabajo realizado en esa zona.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hollow Body Hold */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">4. Hollow Body Hold</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Abdomen inferior, rectus abdominis, estabilización completa
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Tiempo:</strong> 20-40 segundos</p>
                <p className="text-muted-foreground">
                  Tumbado boca arriba, eleva piernas y brazos del suelo, lumbar pegada al suelo. Posición fundamental para gimnasia y calistenia avanzada. Base para front lever y otros movimientos de tensión corporal.
                </p>
              </CardContent>
            </Card>

            {/* Bicicletas y Russian Twists */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">5. Bicicletas y Giros Rusos para Oblicuos y Abdomen Completo</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Oblicuos, rotación abdominal, coordinación
                </p>
                
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 20-30 (total, 10-15 por lado)</p>
                
                <p className="text-muted-foreground mb-4">
                  Estos ejercicios no solo trabajan el recto abdominal, sino que también son ideales para activar los oblicuos y mejorar la coordinación.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold mb-2">Posición Inicial y Movimientos Sincronizados:</p>
                    <p className="text-sm text-muted-foreground">
                      Al iniciar, se debe acostar sobre la espalda, levantar las piernas y alternar el movimiento de pedaleo mientras se giran torso y codo hacia la rodilla opuesta. Para Russian Twists, sentado con piernas elevadas, rota el torso de lado a lado.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold mb-2">Intensidad:</p>
                    <p className="text-sm text-muted-foreground">
                      Lo recomendable son 3 series de 20 repeticiones para lograr una buena activación. Añade peso si es muy fácil.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mountain Climbers */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">6. Mountain Climbers como Ejercicio Cardiovascular y Abdominal</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Abdomen dinámico, cardio, quema de grasa
                </p>
                
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Tiempo:</strong> 30-45 segundos</p>
                
                <p className="text-muted-foreground mb-4">
                  Este ejercicio es perfecto para combinar trabajo cardiovascular y abdominal en un solo movimiento dinámico. Activa los abdominales mientras mejora la resistencia.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold mb-2">Técnica y Postura para Máxima Eficacia:</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Iniciar en posición de flexión, manteniendo la espalda recta. Llevar rápidamente las rodillas hacia el pecho de forma alternada es clave para un buen desempeño. Mantén los abdominales activados en todo momento.
                    </p>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="font-semibold mb-2">💡 Incluirlo en Rutinas de Intervalos Cortos:</p>
                    <p className="text-sm text-muted-foreground">
                      Incorporar este ejercicio en series cortas de alta intensidad, como por ejemplo 30 segundos de actividad seguida de 15 segundos de descanso, maximiza los beneficios.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* L-Sit */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">7. L-Sit en Suelo</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Abdomen inferior, hip flexors, tríceps, compresión
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Tiempo:</strong> 10-30 segundos</p>
                <p className="text-muted-foreground">
                  Sentado en el suelo, manos a los lados, empuja y eleva las piernas rectas formando una "L". Rodillas dobladas si es necesario para principiantes. Ejercicio fundamental para fuerza abdominal y compresión.
                </p>
              </CardContent>
            </Card>

            {/* Toes to Bar */}
            <Card>
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">8. Toes to Bar / Elevaciones de Piernas Colgado</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Abdomen completo, grip, coordinación
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 8-15</p>
                <p className="text-muted-foreground">
                  Colgado de la barra, eleva las piernas hasta tocar la barra con los pies (o lo más alto posible). Sin balanceo excesivo. Ejercicio avanzado que requiere gran fuerza abdominal y control corporal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ancla para scroll suave con espacio arriba */}
      <div id="video-rutina" className="relative -top-20"></div>

      {/* Video con Estructura */}
      <VideoWithStructure
        videoId="MnbNx2x-RY8"
        videoTitle="🎬 Rutina de Abdominales Completa (10 Minutos)"
        videoDescription="Entrena conmigo tus abdominales en solo 10 minutos. Sin material necesario, perfecto para casa o parque."
        insights={[
          "Rutina completa de abdominales en 10 minutos",
          "Trabaja abdomen superior, inferior y oblicuos",
          "Sin material, solo peso corporal",
          "Perfecto para casa o parque"
        ]}
        nivel="Intermedio"
        zonaMuscular="Core"
        material="Casa"
        formato={{
          calentamiento: {
            ejercicios: 3,
            intensidad: "Activación moderada"
          },
          partePrincipal: {
            series: 3,
            descripcion: "Circuito continuo"
          },
          tempo: {
            activo: "40s",
            descanso: "20s"
          }
        }}
        estimulos={[
          "💪 Fuerza isométrica",
          "🔥 Resistencia muscular",
          "⚡ Estabilización abdominal"
        ]}
        detalles="Rutina intensa de 10 minutos diseñada para fortalecer toda la zona abdominal: abdomen superior, inferior, oblicuos y zona lumbar. Ideal para realizar 3-4 veces por semana como complemento o como entrenamiento principal de abdominales."
      />

      {/* Rutinas Efectivas en Casa */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Rutina Core: Planificación Semanal Efectiva
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Desarrollar un abdomen definido requiere de una planificación adecuada y ejercicios específicos. Las rutinas en casa son una opción práctica que permite alcanzar objetivos sin necesidad de equipamiento profesional.
          </p>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Frecuencia y Recuperación */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Frecuencia de Entrenamiento y Recuperación</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3 text-center">🔄</div>
                    <h4 className="font-bold text-lg mb-3 text-center">Frecuencia Óptima</h4>
                    <p className="text-muted-foreground text-center mb-3">
                      Entrenar los abdominales entre <strong>2 y 3 veces por semana</strong> es lo ideal. Los músculos necesitan tiempo para repararse entre sesiones.
                    </p>
                    <p className="text-sm text-muted-foreground text-center">
                      Esto permite que se fortalezcan y crezcan adecuadamente.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3 text-center">🎯</div>
                    <h4 className="font-bold text-lg mb-3 text-center">Alternancia de Grupos Musculares</h4>
                    <p className="text-muted-foreground text-center mb-3">
                      Es recomendable <strong>variar los grupos musculares</strong> trabajados en cada sesión.
                    </p>
                    <p className="text-sm text-muted-foreground text-center">
                      Esto no solo evita el aburrimiento, sino que también garantiza un desarrollo equilibrado de la zona media. Alterna entre ejercicios de la parte superior, inferior y oblicuos.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabla de Volumen */}
              <Card>
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
                          <td className="py-3 px-4 font-semibold">​ Principiante</td>
                          <td className="text-center py-3 px-4">2-3</td>
                          <td className="text-center py-3 px-4">8-12</td>
                          <td className="text-center py-3 px-4">60-90s</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 font-semibold">💪 Intermedio</td>
                          <td className="text-center py-3 px-4">3-4</td>
                          <td className="text-center py-3 px-4">12-20</td>
                          <td className="text-center py-3 px-4">45-60s</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-semibold">🔥 Avanzado</td>
                          <td className="text-center py-3 px-4">4-5</td>
                          <td className="text-center py-3 px-4">15-30</td>
                          <td className="text-center py-3 px-4">30-45s</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progresiones */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Progresiones para Aumentar la Fuerza y Resistencia</h3>
              <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
                A medida que se avanza, es esencial incrementar la dificultad de los ejercicios para seguir observando cambios. Implementar progresiones adecuadas es un factor clave en la mejora del rendimiento.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-3">Variaciones de Planchas y Ejercicios Básicos</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Incrementar el tiempo en la plancha o ajustar el soporte pueden ser buenas maneras de progresar.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Aumentar tiempo de isometría gradualmente</li>
                      <li>Plancha con pierna elevada</li>
                      <li>Plancha lateral con rotaciones</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-3">Incorporación de Peso Corporal y Repeticiones</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Agregar más repeticiones o series es otra forma de progresar.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Aumentar series de 3 a 5</li>
                      <li>Hollow hold con tiempo progresivo</li>
                      <li>Añadir peso con chaleco o mochila</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Ejemplo de Rutina Semanal */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Ejemplo de Rutina Abdominal en Casa para Todos los Niveles</h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="dia1">
                  <AccordionTrigger className="text-lg font-semibold">
                    Día 1: Enfoque en Plancha y Mountain Climbers
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-muted-foreground">
                      <p className="font-semibold text-foreground mb-2">Circuito a repetir 3-4 veces:</p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Plancha isométrica: 30-60 segundos</li>
                        <li>Mountain climbers: 20-30 segundos</li>
                        <li>Plancha lateral (cada lado): 20-30 segundos</li>
                        <li>Descanso entre circuitos: 60-90 segundos</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dia2">
                  <AccordionTrigger className="text-lg font-semibold">
                    Día 2: Ejercicios de Hollow Hold y Bicicletas
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-muted-foreground">
                      <p className="font-semibold text-foreground mb-2">Circuito a repetir 3-4 veces:</p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Hollow hold: 20-40 segundos</li>
                        <li>Bicicletas: 20 repeticiones totales</li>
                        <li>Elevaciones de piernas: 10-15 repeticiones</li>
                        <li>Descanso entre circuitos: 60-90 segundos</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dia3">
                  <AccordionTrigger className="text-lg font-semibold">
                    Día 3 (Opcional): Plancha Lateral y Encogimientos
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-muted-foreground">
                      <p className="font-semibold text-foreground mb-2">Circuito a repetir 3-4 veces:</p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Plancha lateral: 20-30 segundos cada lado</li>
                        <li>Crunches: 15-20 repeticiones</li>
                        <li>Russian twists: 20-30 repeticiones totales</li>
                        <li>L-Sit (si es posible): 10-20 segundos</li>
                        <li>Descanso entre circuitos: 60-90 segundos</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Estrategias para Quemar Grasa */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Estrategias para Definir los Abdominales: Cómo Quemar Grasa Abdominal
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Existen múltiples enfoques para optimizar la quema de grasa abdominal y conseguir una mayor definición muscular. La combinación de entrenamientos y el conocimiento de ciertos mitos puede ser clave en este proceso.
          </p>

          <div className="max-w-6xl mx-auto space-y-12">
            {/* Entrenamiento Combinado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-elegant transition-shadow">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4 text-center">⚡</div>
                  <h3 className="font-bold text-xl mb-4 text-center">Entrenamiento Combinado de Fuerza y Cardio</h3>
                  <p className="text-muted-foreground mb-4">
                    Integrar ejercicios de fuerza con un trabajo cardiovascular es crucial para potenciar la eficacia del entrenamiento, especialmente cuando se busca marcar los músculos abdominales.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold mb-2">Importancia de Intervalos:</p>
                      <p className="text-sm text-muted-foreground">
                        Realizar entrenamientos en intervalos (30s activo / 15s descanso) puede aumentar la quema de grasa al maximizar la intensidad durante cortos periodos de tiempo.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-semibold mb-2">Impacto del Full Body:</p>
                      <p className="text-sm text-muted-foreground">
                        Los ejercicios compuestos involucran múltiples grupos musculares, lo que genera un mayor gasto calórico y mejora el desarrollo general de la zona abdominal.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-elegant transition-shadow">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4 text-center">💡</div>
                  <h3 className="font-bold text-xl mb-4 text-center">Mitos sobre la Reducción de Grasa Localizada</h3>
                  <p className="text-muted-foreground mb-4">
                    Es frecuente escuchar diversas afirmaciones respecto a la pérdida de grasa en áreas específicas del cuerpo. Comprender la importancia del enfoque adecuado es esencial para evitar desilusiones.
                  </p>
                  
                  <div className="bg-amber-100 dark:bg-amber-950/30 p-4 rounded-lg mb-4">
                    <p className="font-semibold mb-2">⚠️ Por qué hacer abdominales no basta:</p>
                    <p className="text-sm text-muted-foreground">
                      La pérdida de grasa no ocurre de forma localizada. El déficit calórico en la dieta y el ejercicio general son más efectivos que hacer solo abdominales.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold mb-2">Rol del Metabolismo:</p>
                    <p className="text-sm text-muted-foreground">
                      Mantener un estilo de vida activo, con una alimentación equilibrada y suficiente descanso, contribuye a un metabolismo más eficiente, facilitando la aparición de un abdomen definido.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ejercicios para Quemar Grasa */}
            <div>
              <h3 className="font-bold text-2xl mb-6 text-center">Ejercicios para Potenciar la Quema de Grasa sin Perder Músculo</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3 text-center">🏃</div>
                    <h4 className="font-bold text-lg mb-3 text-center">Mountain Climbers</h4>
                    <p className="text-sm text-muted-foreground text-center">
                      Ideal para activar el corazón y trabajar la zona abdominal simultáneamente. Su dinamismo permite una alta quema calórica.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3 text-center">💥</div>
                    <h4 className="font-bold text-lg mb-3 text-center">Burpees</h4>
                    <p className="text-sm text-muted-foreground text-center">
                      Combinan fuerza y cardio, utilizados para elevar la frecuencia cardíaca y quemar grasa mientras mantienen masa muscular.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3 text-center">🦵</div>
                    <h4 className="font-bold text-lg mb-3 text-center">Sentadillas</h4>
                    <p className="text-sm text-muted-foreground text-center">
                      Fortalecen las piernas y los abdominales, resultando en un gran gasto energético y activación del abdomen durante el movimiento.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Técnicas Correctas */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Técnica Correcta para Ejercicios Abdominales
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La correcta ejecución de los ejercicios abdominales es fundamental para evitar lesiones y maximizar los beneficios.
          </p>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="espalda">
                <AccordionTrigger className="text-lg font-semibold">
                  🔹 Mantener la Espalda Recta y Zona Lumbar Protegida
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Postura Corporal en Cada Movimiento:</p>
                      <p className="mb-3">
                        Es esencial mantener una postura adecuada durante la realización de los ejercicios. La espalda debe estar recta y alineada con la pelvis para evitar sobrecargas en la zona lumbar.
                      </p>
                      <p>
                        Durante los ejercicios de abdomen, la posición de la columna vertebral debe ser neutra, manteniendo la curva natural de la espalda. Esto ayuda a proteger los discos intervertebrales y mejora la activación de los músculos abdominales.
                      </p>
                    </div>
                    
                    <div className="bg-red-100 dark:bg-red-950/30 p-4 rounded-lg">
                      <p className="font-semibold text-foreground mb-2">⚠️ Evitar que la Zona Lumbar se Arquee:</p>
                      <p>
                        Es vital que, al ejecutar los ejercicios, la zona lumbar no se arquee, especialmente en movimientos como los crunches. El arqueo lumbar puede crear tensión en la parte baja de la espalda, aumentando el riesgo de lesiones. Se recomienda mantener siempre la lumbar apoyada en el suelo durante la serie.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="respiracion">
                <AccordionTrigger className="text-lg font-semibold">
                  🔹 Control de la Respiración y Tensión Muscular
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Sincronización entre Respiración y Movimiento:</p>
                      <p className="mb-3">
                        La respiración juega un papel crucial en el rendimiento durante el entrenamiento. Al realizar un esfuerzo, como en el momento de contraer los abdominales, es recomendable <strong>exhalar</strong>.
                      </p>
                      <p>
                        Esto no solo ayuda a mantener la tensión adecuada en la zona, sino que también permite un mejor control sobre los músculos activos.
                      </p>
                    </div>
                    
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="font-semibold text-foreground mb-2">💪 Mantener Tensión Abdominal Constante:</p>
                      <p>
                        Es fundamental mantener una tensión continua en los músculos a lo largo de todo el ejercicio. Esto no solo aumenta la efectividad del entrenamiento, sino que también ayuda a prevenir la fatiga prematura. Mantener los abdominales contraídos durante el movimiento asegura que se estará trabajando la musculatura de forma óptima.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="frecuencia">
                <AccordionTrigger className="text-lg font-semibold">
                  🔹 Frecuencia, Duración y Pausas Recomendadas
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Series de 15 a 30 Repeticiones:</p>
                      <p className="mb-3">
                        Para obtener resultados visibles, se recomienda realizar entre <strong>15 y 30 repeticiones</strong> por serie. Dependiendo del nivel de forma física, este rango puede ajustarse.
                      </p>
                      <p>
                        Las series deben ser lo suficientemente desafiantes para estimular el crecimiento muscular sin comprometer la técnica.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-foreground mb-2">Descansos para Maximizar Fuerza y Recuperación:</p>
                      <p>
                        La duración de los descansos también es importante. Entre <strong>30 y 60 segundos</strong> de descanso entre series ayuda a la recuperación y permite aprovechar al máximo cada repetición. Esto es vital para mantener un rendimiento alto y asegurar que los músculos se recuperen adecuadamente antes de realizar la siguiente serie.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Alimentación y Estilo de Vida */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Alimentación y Estilo de Vida para Potenciar el Desarrollo Abdominal
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La combinación de alimentación adecuada y un estilo de vida saludable es fundamental para conseguir un abdomen tonificado. Los nutrientes y hábitos diarios repercuten en la capacidad del cuerpo para desarrollar músculo y quemar grasa, igual de importante que estructurar bien tu <Link to="/rutina-full-body/" className="text-primary hover:underline font-medium underline-offset-4">rutina full body de calistenia</Link> o seguir uno de nuestros <Link to="/programas/" className="text-primary hover:underline font-medium underline-offset-4">programas de calistenia</Link>. Si vas empezando, te recomiendo la <Link to="/calistenia-principiantes/" className="text-primary hover:underline font-medium underline-offset-4">guía de calistenia para principiantes</Link>.
          </p>

          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-elegant transition-shadow">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4 text-center">🍗</div>
                  <h3 className="font-bold text-xl mb-4 text-center">Nutrientes Clave</h3>
                  <p className="text-muted-foreground mb-4">
                    Una dieta equilibrada que incluya proteínas, carbohidratos y grasas saludables es esencial para desarrollar masa muscular.
                  </p>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold mb-1">Proteínas:</p>
                      <p className="text-muted-foreground">Carnes magras, pescado, huevos, legumbres</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Carbohidratos:</p>
                      <p className="text-muted-foreground">Granos enteros, avena, arroz integral, verduras</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Grasas Saludables:</p>
                      <p className="text-muted-foreground">Aguacate, frutos secos, aceite de oliva, salmón</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-elegant transition-shadow">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4 text-center">💧</div>
                  <h3 className="font-bold text-xl mb-4 text-center">Hidratación y Definición Muscular</h3>
                  <p className="text-muted-foreground mb-4">
                    Mantener una adecuada hidratación es clave no solo para el rendimiento físico, sino también para la salud general y la definición muscular.
                  </p>
                  
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Consejos:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Beber al menos 2 litros de agua al día</li>
                      <li>Limitar alimentos ricos en sodio</li>
                      <li>Consumir frutas y verduras con alto contenido de agua</li>
                      <li>Evitar alcohol y bebidas azucaradas</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-elegant transition-shadow">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4 text-center">😴</div>
                  <h3 className="font-bold text-xl mb-4 text-center">Descanso y Recuperación</h3>
                  <p className="text-muted-foreground mb-4">
                    Descansar adecuadamente es crucial para la recuperación muscular y el desarrollo abdominal. El cuerpo necesita tiempo para repararse después de los entrenamientos.
                  </p>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold mb-1">Tiempo de Recuperación:</p>
                      <p className="text-muted-foreground">Mínimo 48 horas entre entrenamientos de abdomen</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Sueño de Calidad:</p>
                      <p className="text-muted-foreground">7-9 horas cada noche para producción óptima de hormonas de crecimiento</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Consejo destacado */}
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-5xl mb-4">💡</div>
                  <h3 className="font-bold text-2xl mb-4">Las Abdominlaes se hacen en la Cocina</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Puedes entrenar abdominales todos los días, pero si no mantienes un <strong>déficit calórico</strong> y una <strong>alimentación balanceada</strong>, no verás la definición deseada. La dieta representa aproximadamente el 70% del éxito en conseguir un six pack visible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ejercicios Complementarios */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Ejercicios Complementarios para Abdominales Completos
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Incorporar variaciones en la rutina de abdominales y ejercicios complementarios es fundamental para desarrollar un trabajo abdominal completo y funcional.
          </p>

          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <div className="text-4xl mb-4 text-center">🍑</div>
                  <h3 className="font-bold text-xl mb-4 text-center">Incorporación de Glúteos y Espalda</h3>
                  <p className="text-muted-foreground mb-4">
                    Integrar ejercicios que trabajen los glúteos y la espalda es clave para un desarrollo abdominal completo y equilibrado. La zona lumbar está directamente relacionada con los abdominales, y mantener esta área fuerte es crucial para prevenir lesiones.
                  </p>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Puentes para Estabilizar la Zona Lumbar:</p>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Túmbate boca arriba con rodillas flexionadas</li>
                      <li>Levanta las caderas formando una línea recta</li>
                      <li>Mantén la posición 2-3 segundos</li>
                      <li>Baja lentamente y repite 15-20 veces</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="text-4xl mb-4 text-center">🏋️</div>
                  <h3 className="font-bold text-xl mb-4 text-center">Ejercicios Funcionales</h3>
                  <p className="text-muted-foreground mb-4">
                    Los ejercicios funcionales son muy útiles para fortalecer los abdominales, ya que imitan movimientos de la vida diaria. Estas inclusiones proporcionan un entrenamiento más efectivo y completo.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-secondary/30 p-3 rounded-lg">
                      <p className="font-semibold mb-1">Sentadillas:</p>
                      <p className="text-sm text-muted-foreground">Excelente para trabajar los abdominales y la parte inferior del cuerpo simultáneamente</p>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded-lg">
                      <p className="font-semibold mb-1">Peso Muerto (con barra o kettlebell):</p>
                      <p className="text-sm text-muted-foreground">Implica varios grupos musculares, incluidos los abdominales, mejorando la fuerza general</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-4 text-center">Combinación de Movimientos para Rutina Full Body</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Combinar diferentes ejercicios en una rutina funcional maximiza el rendimiento y el desarrollo abdominal. Movimientos compuestos que integran trabajo de abdomen:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-background/50 p-4 rounded-lg text-center">
                    <p className="font-semibold mb-2">Sentadilla + Press</p>
                    <p className="text-sm text-muted-foreground">Abdominales activos durante todo el movimiento</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg text-center">
                    <p className="font-semibold mb-2">Peso Muerto + Remo</p>
                    <p className="text-sm text-muted-foreground">Estabilización lumbar y abdominal</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg text-center">
                    <p className="font-semibold mb-2">Dominadas + Toes to Bar</p>
                    <p className="text-sm text-muted-foreground">Transición directa a trabajo abdominal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Banner Enlace Interno a Rutina Core */}
      <section className="py-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-y border-blue-200/50">
        <div className="container mx-auto px-4">
          <Link 
            to="/rutina-core-calistenia"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 hover:opacity-90 transition-all group"
          >
            <span className="text-base sm:text-lg font-medium flex items-center gap-2 text-foreground">
              <span className="text-2xl">🎯</span>
              ¿Buscas trabajo de estabilización y fuerza funcional completa? Visita la página de Rutinas de Core
            </span>
            <Button 
              variant="ghost" 
              className="gap-2 group-hover:gap-3 transition-all hover:bg-blue-500/10 hover:text-blue-600 border border-blue-200"
            >
              Ir a Rutina Core
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Galería de Videos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <VideoGallery 
            videos={getVideosByZone(allVideos, 'Core', { 
              limit: 6, 
              sortBy: 'engagement'
            })}
            title="Más Videos de Entrenamiento Core"
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
              Consigue un <span className="text-primary">Six Pack Definido</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Accede a programas completos con progresiones para dragon flag, ab wheel rollout y otras skills avanzadas abdominales. Incluye planificación alimentaria y seguimiento personalizado.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📋</div>
                  <h3 className="font-bold mb-2">Planificación Completa</h3>
                  <p className="text-sm text-muted-foreground">12 semanas de progresión estructurada</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🎥</div>
                  <h3 className="font-bold mb-2">Videos Guiados</h3>
                  <p className="text-sm text-muted-foreground">Tutoriales paso a paso de cada ejercicio</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🍽️</div>
                  <h3 className="font-bold mb-2">Guía Nutricional</h3>
                  <p className="text-sm text-muted-foreground">Plan alimentario para definición</p>
                </CardContent>
              </Card>
            </div>
            
            <Button size="lg" className="bg-gradient-primary" asChild>
              <Link to="/programas">Acceder a Programas Completos</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default RutinaAbdominales;