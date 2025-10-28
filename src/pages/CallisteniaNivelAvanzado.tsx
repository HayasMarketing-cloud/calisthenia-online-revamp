import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoGallery from "@/components/VideoGallery";
import VideoWithStructure from "@/components/VideoWithStructure";
import RoutineHero from "@/components/routine/RoutineHero";
import QuickJumpBanner from "@/components/QuickJumpBanner";
import CommunityCTA from "@/components/CommunityCTA";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import { allVideos } from "@/data/videoLibrary";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, TrendingUp, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallisteniaNivelAvanzado = () => {
  // Filtrar videos para nivel intermedio y avanzado, ordenados por engagement
  const videosIntermedioAvanzado = allVideos
    .filter(video => video.nivel === "Intermedio" || video.nivel === "Avanzado")
    .sort((a, b) => b.engagementScore - a.engagementScore);

  return (
    <>
      <Helmet>
        <title>Rutina Calistenia Intermedio | Ejercicios Nivel Avanzado</title>
        <meta 
          name="description" 
          content="Rutina de calistenia intermedio y avanzado para progresar en skills. Domina muscle-ups, front lever, planche y más con entrenamiento estructurado." 
        />
        <meta 
          name="keywords" 
          content="rutina calistenia intermedio, calistenia nivel avanzado, ejercicios avanzados calistenia, muscle up, front lever, planche, dominadas, entrenamiento intermedio, skills calistenia" 
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Rutina Calistenia Intermedio | Ejercicios Nivel Avanzado" />
        <meta property="og:description" content="Rutina de calistenia intermedio y avanzado para progresar en skills. Domina muscle-ups, front lever, planche y más." />
        <meta property="og:url" content="https://calisthenia.online/calistenia-nivel-avanzado/" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rutina Calistenia Intermedio | Ejercicios Nivel Avanzado" />
        <meta name="twitter:description" content="Rutina de calistenia intermedio y avanzado para progresar en skills. Domina muscle-ups, front lever, planche y más." />
        
        <link rel="canonical" href="https://calisthenia.online/calistenia-nivel-avanzado/" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ExercisePlan",
            "name": "Rutina Calistenia Intermedio y Avanzado",
            "description": "Rutina de calistenia intermedio y avanzado para progresar en skills. Domina muscle-ups, front lever, planche y más con entrenamiento estructurado.",
            "exerciseType": "Calistenia",
            "activityDuration": "PT45M",
            "activityFrequency": "3 días/semana",
            "intensity": "Intermedio-Avanzado",
            "url": "https://calisthenia.online/calistenia-nivel-avanzado/"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <CommunityStickyBanner />
        
        <main className="flex-grow">
          {/* Hero Section con Breadcrumbs */}
          <RoutineHero
            breadcrumbs={[
              { label: "Inicio", href: "/" },
              { label: "Programas", href: "/programas" },
              { label: "Nivel Intermedio/Avanzado", href: "/calistenia-nivel-avanzado" }
            ]}
            title="Rutina Calistenia"
            titleHighlight="Intermedio"
            emoji="💪"
            description="Ya diste los primeros pasos y ahora toca subir el nivel. Si estás buscando una rutina de calistenia intermedio, aquí encontrarás un entrenamiento diseñado para que sigas progresando, ganes fuerza y mejores tu control corporal."
            nivel="Intermedio-Avanzado"
            duracion="45-60 min"
            lugar="Casa o Parque"
            gradientFrom="from-primary/10"
            gradientTo="to-background"
          />

          {/* Quick Jump Banner */}
          <QuickJumpBanner
            text="¿Quieres ver la rutina en acción?"
            linkText="Ver Video Principal"
            href="#video-principal"
            icon="▶️"
            variant="primary"
          />

          {/* Introducción */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  En <strong>Calisthenia.online</strong> te acompañamos en este nuevo nivel, donde el reto es mayor, pero también la satisfacción.
                </p>
              </div>
            </div>
          </section>

          {/* A quién va dirigida */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display font-bold text-3xl lg:text-4xl mb-8 text-center">
                  ¿A Quién Va Dirigida Esta Rutina?
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 mb-4">
                        <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Ya Dominas los Básicos</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>✓ Flexiones estándar</li>
                            <li>✓ Sentadillas controladas</li>
                            <li>✓ Plancha de 30 segundos</li>
                            <li>✓ Remo invertido o dominadas asistidas</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Y Buscas Mejorar En</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>🔥 Explosividad</li>
                            <li>⚡ Estabilidad del core</li>
                            <li>💪 Dominadas reales</li>
                            <li>🎯 Progresiones hacia movimientos avanzados</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Rutina de Calistenia Intermedio */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 id="ejercicios" className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
                  Ejercicios de Calistenia Nivel Intermedio y Avanzado
                </h2>
                <p className="text-center text-muted-foreground mb-12">
                  Puedes realizar esta rutina en casa o en el parque. Solo necesitas una barra y tu cuerpo.
                </p>

                <div className="space-y-8">
                  {/* Día 1 */}
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="default" className="text-lg px-4 py-1">Día 1</Badge>
                        <h3 className="font-display font-bold text-2xl">Fuerza de Empuje</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Flexiones declinadas</strong> – 4x10</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Flexiones diamante</strong> – 3x12</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Pike push-ups</strong> (para hombros) – 3x8</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Plancha frontal</strong> – 3x30 seg</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Fondos en paralelas o entre bancos</strong> – 3x8-10</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Día 2 */}
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="default" className="text-lg px-4 py-1">Día 2</Badge>
                        <h3 className="font-display font-bold text-2xl">Dominadas + Core</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Dominadas estrictas o asistidas</strong> – 4x6-8</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Remo invertido</strong> – 4x10</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Elevaciones de rodillas colgado</strong> – 3x10</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Planchas laterales</strong> – 3x20 seg por lado</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Hollow body hold</strong> – 3x20-30 seg</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Día 3 */}
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="default" className="text-lg px-4 py-1">Día 3</Badge>
                        <h3 className="font-display font-bold text-2xl">Piernas y Equilibrio</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Sentadillas explosivas</strong> – 4x12</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Zancadas alternas</strong> – 3x10 por pierna</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Puente de glúteos a una pierna</strong> – 3x10</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Wall sits</strong> (sentadilla isométrica) – 3x30 seg</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span><strong>Equilibrio en pino contra la pared</strong> (opcional) – 3x15 seg</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Video Principal */}
          <section id="video-principal" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <VideoWithStructure
                videoId="joOoHh_P5RM"
                videoTitle="Progresión a Muscle-Up | Tutorial Completo"
                videoDescription="Aprende la progresión completa para lograr tu primer muscle-up. Desde dominadas explosivas hasta la técnica perfecta."
                nivel="Intermedio-Avanzado"
                zonaMuscular="Full Body"
                material="Barra dominadas"
                formato={{
                  calentamiento: {
                    ejercicios: 4,
                    intensidad: "Movilidad de hombros, scapular pulls, dominadas y fondos preparatorios"
                  },
                  partePrincipal: {
                    series: 4,
                    descripcion: "Pull-ups explosivos, chest to bar, straight bar dips, negativas y asistidas"
                  },
                  tempo: {
                    activo: "Explosivo en concéntrica",
                    descanso: "2 segundos en excéntrica"
                  }
                }}
                estimulos={[
                  "💪 Fuerza explosiva de tirón",
                  "🔥 Transición pull-to-dip",
                  "⚡ Control en movimientos dinámicos",
                  "🎯 Coordinación total del cuerpo"
                ]}
                insights={[
                  "El muscle-up requiere no solo fuerza, sino técnica y timing perfecto",
                  "La clave está en la explosividad de las dominadas y la transición rápida",
                  "Trabaja las negativas para ganar control en todo el rango de movimiento"
                ]}
              />
            </div>
          </section>

          {/* Consejos para Progresar */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
                  Consejos para Progresar
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Controla Cada Repetición</h3>
                          <p className="text-muted-foreground">
                            En nivel intermedio, la técnica lo es todo. Prioriza la calidad sobre la cantidad.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Descansa Adecuadamente</h3>
                          <p className="text-muted-foreground">
                            Descansa entre 60 y 90 segundos entre ejercicios para mantener la intensidad.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Zap className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Añade un Cuarto Día</h3>
                          <p className="text-muted-foreground">
                            Si ya recuperas rápido o si tu objetivo es avanzar hacia skills, añade un día más.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Movilidad y Estiramientos</h3>
                          <p className="text-muted-foreground">
                            Combina esta rutina con estiramientos y movilidad para evitar lesiones.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Galería de Videos */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
                Videos de Nivel Intermedio y Avanzado
              </h2>
              
              {videosIntermedioAvanzado.length > 0 ? (
                <VideoGallery 
                  videos={videosIntermedioAvanzado}
                  title=""
                  showStats={true}
                />
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No hay videos disponibles en este momento.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* CTA Comunidad */}
          <section className="py-16 bg-background">
            <CommunityCTA />
          </section>

          {/* CTA Final */}
          <section className="py-16 bg-secondary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display font-bold text-3xl lg:text-5xl mb-6">
                  Lleva Tu Entrenamiento <span className="text-primary">Al Siguiente Nivel</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Con constancia, técnica correcta y progresiones bien planificadas, dominarás skills avanzados. Da el siguiente paso hoy.
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
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CallisteniaNivelAvanzado;
