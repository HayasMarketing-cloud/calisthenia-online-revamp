import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VideoGallery from "@/components/VideoGallery";
import VideoWithStructure from "@/components/VideoWithStructure";
import { allVideos } from "@/data/videoLibrary";
import RoutineHero from "@/components/routine/RoutineHero";
import CommunityCTA from "@/components/CommunityCTA";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import QuickJumpBanner from "@/components/QuickJumpBanner";
import StructuredData from "@/components/seo/StructuredData";
import { generateCourseSchema, generateBreadcrumbSchema } from "@/lib/schemas";

const CalisteniaPrincipiantes = () => {
  // Filtrar videos para principiantes ordenados por engagement
  const videosPrincipiantes = allVideos
    .filter(video => video.nivel === "Principiante")
    .sort((a, b) => b.engagementScore - a.engagementScore);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Calistenia para Principiantes: Guía Completa desde Cero</title>
        <meta name="description" content="Calistenia para principiantes paso a paso: ejercicios básicos, rutina semanal y progresiones desde cero. Sin equipamiento, solo tu cuerpo. Empieza hoy." />
        <meta name="keywords" content="calistenia para principiantes, ejercicios de calistenia para principiantes, empezar en calistenia, calistenia desde cero, rutina calistenia principiantes" />
        <link rel="canonical" href="https://calisthenia.online/calistenia-principiantes/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Calistenia para Principiantes: Guía Completa desde Cero" />
        <meta property="og:description" content="Calistenia para principiantes paso a paso: ejercicios básicos, rutina semanal y progresiones desde cero. Empieza sin equipamiento." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://calisthenia.online/calistenia-principiantes/" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ExercisePlan",
            "name": "Calistenia para Principiantes - Guía Completa",
            "description": "Programa completo de calistenia para principiantes que enseña ejercicios básicos y progresiones desde cero",
            "exerciseType": "Calistenia",
            "targetArea": "Cuerpo Completo",
            "intensity": "Principiante",
            "additionalType": "https://schema.org/PhysicalActivity",
            "author": {
              "@type": "Person",
              "name": "Nicolás Reyero",
              "jobTitle": "Entrenador de Calistenia"
            }
          })}
        </script>
      </Helmet>

      <StructuredData data={[
        generateCourseSchema({
          name: "Guía Completa de Calistenia para Principiantes",
          description: "Curso gratuito de calistenia para principiantes. Aprende flexiones, sentadillas, planchas y dominadas con progresiones paso a paso.",
          provider: "Calistenia Online",
          providerUrl: "https://calisthenia.online",
          url: "https://calisthenia.online/calistenia-principiantes/",
          courseMode: "online",
          educationalLevel: "Principiante",
          hasCourseInstance: {
            courseMode: "Online",
            instructor: "Nicolás Reyero",
            courseWorkload: "3-4 horas/semana"
          },
          syllabusSections: [
            { name: "Flexiones (Push-ups)", description: "Fortalecen pecho, hombros y tríceps. 3x8-10", position: 1 },
            { name: "Sentadillas (Squats)", description: "Piernas y glúteos. 3x12-15", position: 2 },
            { name: "Plancha (Plank)", description: "Core y postura. 3x20-30s", position: 3 },
            { name: "Remo Invertido", description: "Espalda y bíceps. 3x6-8", position: 4 },
            { name: "Elevaciones de Rodillas", description: "Abdomen. 3x10-12", position: 5 }
          ],
          offers: { price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
          rating: { itemName: "Guía Calistenia Principiantes", ratingValue: 4.7, reviewCount: 312 }
        }),
        generateBreadcrumbSchema([
          { name: "Inicio", url: "https://calisthenia.online/" },
          { name: "Niveles", url: "https://calisthenia.online/" },
          { name: "Principiantes", url: "https://calisthenia.online/calistenia-principiantes/" }
        ])
      ]} />

      <Header />
      <CommunityStickyBanner />
      
      <RoutineHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Niveles", href: "/" },
          { label: "Principiantes", href: "/calistenia-principiantes/" }
        ]}
        title="Calistenia para"
        titleHighlight="Principiantes"
        emoji="​"
        description="¿Quieres empezar a entrenar pero no sabes por dónde comenzar? ¡Estás en el lugar correcto! Solo necesitas tu cuerpo, constancia y ganas de superarte."
        nivel="Principiante"
        duracion="30-45 min"
        lugar="Casa o Parque"
      />

      <QuickJumpBanner
        text="¿Listo para empezar tu entrenamiento?"
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
              La <strong>calistenia para principiantes</strong> es la forma más sencilla de empezar a entrenar desde cero: solo necesitas tu cuerpo, unos minutos al día y un plan claro. En esta guía encontrarás los ejercicios básicos, una rutina semanal y las progresiones para construir fuerza, control y movilidad sin pisar un gimnasio.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed mt-4">
              En Calisthenia.online te acompañamos desde cero, paso a paso, para que construyas una base sólida y disfrutes el proceso desde el primer día. Si buscas un enfoque adaptado, también tenemos una guía específica de <Link to="/calistenia-mujeres/" className="text-primary hover:underline font-medium underline-offset-4">calistenia para mujeres</Link> con rutina en casa, plan de 4 semanas y mitos desmontados.
            </p>
          </div>
        </div>
      </section>

      {/* Ejercicios de Calistenia para Principiantes */}
      <section id="ejercicios" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Ejercicios de Calistenia para Principiantes
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Si estás dando tus primeros pasos, aquí tienes una rutina básica con ejercicios que puedes hacer en casa, en el parque o donde quieras. Solo necesitas tu cuerpo y actitud. Si prefieres entrenar entre cuatro paredes, sigue la <Link to="/rutina-calistenia-en-casa/" className="text-primary hover:underline font-medium underline-offset-4">rutina de calistenia en casa</Link>; si tienes barras cerca, prueba la <Link to="/calistenia-en-parque/" className="text-primary hover:underline font-medium underline-offset-4">calistenia en parque</Link>.
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0">💪</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">1. Flexiones (Push-ups)</h3>
                    <p className="text-muted-foreground mb-4">
                      Fortalecen pecho, hombros y tríceps. Si no puedes hacerlas completas, empieza con las rodillas apoyadas.
                    </p>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="font-bold text-sm mb-2">📊 Objetivo:</p>
                      <p className="text-sm text-muted-foreground">3 series de 8-10 repeticiones</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0">🦵</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">2. Sentadillas (Squats)</h3>
                    <p className="text-muted-foreground mb-4">
                      Uno de los ejercicios más completos para piernas y glúteos. Mantén la espalda recta y baja lo más que puedas.
                    </p>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="font-bold text-sm mb-2">📊 Objetivo:</p>
                      <p className="text-sm text-muted-foreground">3 series de 12-15 repeticiones</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0">🧘</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">3. Plancha (Plank)</h3>
                    <p className="text-muted-foreground mb-4">
                      Ideal para activar el core y mejorar tu postura. Aprieta el abdomen y mantén la posición sin hundir la cadera.
                    </p>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="font-bold text-sm mb-2">📊 Objetivo:</p>
                      <p className="text-sm text-muted-foreground">3 series de 20 a 30 segundos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0">🔙</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">4. Remo Invertido (Inverted rows)</h3>
                    <p className="text-muted-foreground mb-4">
                      Si tienes una barra baja o anillas, es perfecto para empezar a trabajar la espalda y los bíceps.
                    </p>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="font-bold text-sm mb-2">📊 Objetivo:</p>
                      <p className="text-sm text-muted-foreground">3 series de 6-8 repeticiones</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0">🦴</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">5. Elevaciones de Rodillas (Knee raises)</h3>
                    <p className="text-muted-foreground mb-4">
                      Activa tu abdomen con este movimiento simple pero efectivo.
                    </p>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="font-bold text-sm mb-2">📊 Objetivo:</p>
                      <p className="text-sm text-muted-foreground">3 series de 10-12 repeticiones</p>
                    </div>
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
        videoTitle="Cómo Hacer la Primera Dominada: Retracción Escapular"
        videoDescription="Serie completa de 8 episodios sobre dominadas: aprende desde la retracción escapular hasta dominadas completas. Perfecto para principiantes."
        insights={[
          "La retracción escapular es la base fundamental de todas las dominadas",
          "Aprende a activar correctamente los músculos de la espalda desde el inicio",
          "Progresiones paso a paso: dead hangs, scapular pulls y negativas",
          "Evita los 5 errores más comunes que cometen los principiantes",
          "Ejercicios complementarios para fortalecer agarre y estabilizadores"
        ]}
        nivel="Principiante"
        zonaMuscular="Espalda"
        material="Barra de dominadas"
        formato={{
          calentamiento: {
            ejercicios: 3,
            intensidad: "Movilidad articular de hombros y activación escapular"
          },
          partePrincipal: {
            series: 6,
            descripcion: "Dead hangs, scapular pulls y dominadas asistidas con banda"
          },
          tempo: {
            activo: "Controlado en cada fase",
            descanso: "2-3 minutos entre series"
          }
        }}
        estimulos={[
          "Control escapular",
          "Fuerza de agarre",
          "Activación de dorsales",
          "Estabilidad del core"
        ]}
        detalles="Esta serie de 8 episodios es tu guía completa para conseguir tu primera dominada. Empezando desde la retracción escapular, aprenderás la técnica correcta, progresiones seguras y ejercicios complementarios. Cada video construye sobre el anterior, asegurando una base sólida y evitando lesiones."
      />

      {/* Consejos para Progresar */}
      <section id="consejos" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Consejos para Progresar
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Sigue estos consejos fundamentales para construir una base sólida y progresar de forma segura en la calistenia. Cuando domines lo básico, da el salto a una <Link to="/rutina-full-body/" className="text-primary hover:underline font-medium underline-offset-4">rutina full body de calistenia</Link>, prueba la <Link to="/calistenia-nivel-avanzado/" className="text-primary hover:underline font-medium underline-offset-4">calistenia de nivel avanzado</Link> o sigue uno de nuestros <Link to="/programas/" className="text-primary hover:underline font-medium underline-offset-4">programas de calistenia</Link>.
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">🚀</span>
                  Empieza con lo que tengas, no esperes el momento perfecto
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  El mejor momento para empezar es ahora. No necesitas equipamiento especial ni el gimnasio perfecto. Tu cuerpo es tu gimnasio, y cada día que esperas es un día menos de progreso. Empieza hoy, aunque sea con 5 minutos de entrenamiento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔥</span>
                  Calienta bien antes de entrenar para evitar lesiones
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dedica al menos 5-10 minutos al calentamiento. Moviliza tus articulaciones, activa tus músculos y prepara tu sistema nervioso. Un buen calentamiento no solo previene lesiones, sino que mejora significativamente tu rendimiento durante el entrenamiento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">👂</span>
                  Escucha a tu cuerpo y adapta los ejercicios si es necesario
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Aprende a diferenciar entre molestia muscular normal y dolor que indica lesión. Si algo no se siente bien, modifica el ejercicio, reduce la intensidad o descansa. Tu cuerpo te habla, aprende a escucharlo. La progresión sostenible siempre gana a largo plazo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  Sigue una rutina semanal y mide tu progreso
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  La constancia es clave. Establece una rutina de 3-4 entrenamientos semanales y respétala. Lleva un registro de tus repeticiones, series y cómo te sientes. Ver tu progreso semana a semana es increíblemente motivador y te ayuda a ajustar tu entrenamiento según tus resultados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Por qué empezar con Calistenia */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            ¿Por Qué Empezar con Calistenia?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La calistenia es ideal para principiantes por sus múltiples beneficios y accesibilidad.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🆓</div>
                  <h3 className="text-xl font-bold mb-3">Sin Costos Iniciales</h3>
                  <p className="text-muted-foreground">
                    No necesitas pagar gimnasio ni comprar equipos costosos. Tu cuerpo es todo lo que necesitas para empezar.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">📍</div>
                  <h3 className="text-xl font-bold mb-3">Entrena Donde Quieras</h3>
                  <p className="text-muted-foreground">
                    En casa, en el parque, de viaje... la calistenia te da total libertad para entrenar en cualquier lugar.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">💪</div>
                  <h3 className="text-xl font-bold mb-3">Desarrollo Funcional</h3>
                  <p className="text-muted-foreground">
                    Desarrolla fuerza real y útil para tu vida diaria, mejorando coordinación, equilibrio y control corporal.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">📈</div>
                  <h3 className="text-xl font-bold mb-3">Progresión Clara</h3>
                  <p className="text-muted-foreground">
                    Desde ejercicios básicos hasta movimientos avanzados impresionantes. Siempre hay un siguiente nivel que alcanzar.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🛡️</div>
                  <h3 className="text-xl font-bold mb-3">Bajo Riesgo de Lesiones</h3>
                  <p className="text-muted-foreground">
                    Al usar tu propio peso corporal, reduces el riesgo de lesiones por sobrecarga típicas del entrenamiento con pesas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-3">Para Todos los Niveles</h3>
                  <p className="text-muted-foreground">
                    No importa tu condición física actual, hay un ejercicio de calistenia adaptado a tu nivel desde el que empezar.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Errores Comunes a Evitar */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6 text-center">
            Errores Comunes que Debes Evitar
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Aprende de estos errores frecuentes en principiantes para acelerar tu progreso y evitar frustraciones, sobre todo cuando combines distintos enfoques como la <Link to="/rutina-piernas-calistenia/" className="text-primary hover:underline font-medium underline-offset-4">rutina de piernas</Link> o la <Link to="/rutina-core-calistenia/" className="text-primary hover:underline font-medium underline-offset-4">rutina de core</Link>.
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            <Card className="border-l-4 border-destructive">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">❌</span>
                  Querer resultados inmediatos
                </h3>
                <p className="text-muted-foreground mb-4">
                  El desarrollo de fuerza y habilidades en calistenia lleva tiempo. No esperes hacer muscle-ups en tu primera semana.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-bold text-sm mb-2">✅ Solución:</p>
                  <p className="text-sm text-muted-foreground">
                    Celebra las pequeñas victorias: una repetición más, mejor técnica, menos fatiga. El progreso es gradual pero constante.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-destructive">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">❌</span>
                  Saltar el calentamiento
                </h3>
                <p className="text-muted-foreground mb-4">
                  "No tengo tiempo para calentar" es una de las excusas más costosas. Un músculo frío es un músculo vulnerable.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-bold text-sm mb-2">✅ Solución:</p>
                  <p className="text-sm text-muted-foreground">
                    Dedica 5-10 minutos al calentamiento. Es una inversión que previene lesiones que pueden dejarte fuera semanas.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-destructive">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">❌</span>
                  Sacrificar técnica por repeticiones
                </h3>
                <p className="text-muted-foreground mb-4">
                  10 flexiones con buena técnica valen más que 30 con mala forma. La técnica es lo primero, siempre.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-bold text-sm mb-2">✅ Solución:</p>
                  <p className="text-sm text-muted-foreground">
                    Prioriza la calidad sobre la cantidad. Reduce las repeticiones si es necesario para mantener la forma perfecta.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-destructive">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">❌</span>
                  No descansar suficiente
                </h3>
                <p className="text-muted-foreground mb-4">
                  Entrenar todos los días sin descanso no es más productivo. El músculo crece durante el descanso, no durante el entrenamiento.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-bold text-sm mb-2">✅ Solución:</p>
                  <p className="text-sm text-muted-foreground">
                    Programa días de descanso activo o completo. Tu cuerpo necesita 48 horas para recuperar un grupo muscular trabajado intensamente.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-destructive">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">❌</span>
                  Compararte con otros
                </h3>
                <p className="text-muted-foreground mb-4">
                  Ver a alguien hacer front levers en Instagram puede ser desmoralizante cuando estás luchando con tu primera flexión.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-bold text-sm mb-2">✅ Solución:</p>
                  <p className="text-sm text-muted-foreground">
                    Tu única competencia eres tú del ayer. Céntrate en tu progreso personal y celebra cada pequeña mejora.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Galería de Videos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {videosPrincipiantes.length > 0 ? (
            <VideoGallery 
              videos={videosPrincipiantes.slice(0, 12)}
              title="📹 Biblioteca de Videos para Principiantes"
              showStats={true}
            />
          ) : (
            <div className="text-center">
              <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
                📹 Videos para Principiantes
              </h2>
              <p className="text-muted-foreground">
                Próximamente añadiremos más contenido en video para principiantes.
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
              Empieza Tu <span className="text-primary">Transformación Hoy</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              No importa tu nivel actual. Con constancia, técnica correcta y una buena guía, conseguirás resultados increíbles. Da el primer paso hoy.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold mb-2">Programas Personalizados</h3>
                  <p className="text-sm text-muted-foreground">Entrenamiento adaptado a tu nivel con seguimiento de Nico</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">📚</div>
                  <h3 className="font-bold mb-2">Rutinas Gratuitas</h3>
                  <p className="text-sm text-muted-foreground">Accede a rutinas completas sin costo alguno</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">👥</div>
                  <h3 className="font-bold mb-2">Comunidad Activa</h3>
                  <p className="text-sm text-muted-foreground">Únete a otros que están en tu mismo camino</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary" asChild>
                <Link to="/programas">Ver Programas Personalizados</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">Explorar Rutinas Gratuitas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CalisteniaPrincipiantes;
