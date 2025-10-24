import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import abdomenImg from "@/assets/calisthenia-abdomen.webp";

const RutinaAbdominales = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6">
                Rutina de <span className="text-primary">Abdominales</span> 🔥
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Desarrolla un core fuerte y definido con ejercicios funcionales de calistenia que trabajan todo el abdomen.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-primary">Ver Programa Completo</Button>
                <Button size="lg" variant="outline">Descargar PDF</Button>
              </div>
            </div>
            <div>
              <img 
                src={abdomenImg} 
                alt="Ejercicios de abdominales en calistenia" 
                className="rounded-lg shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Por Qué Entrenar el Core
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Estabilidad Total</h3>
                <p className="text-muted-foreground">
                  Un core fuerte es la base para todos los movimientos y previene lesiones.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Mejor Rendimiento</h3>
                <p className="text-muted-foreground">
                  Mejora tu fuerza en todos los ejercicios: dominadas, flexiones, plancha, etc.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">Skills Avanzadas</h3>
                <p className="text-muted-foreground">
                  Esencial para dragon flag, front lever, planche y otras habilidades.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ejercicios */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Ejercicios Principales
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">1. Plancha Abdominal</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Core completo, estabilizadores
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Tiempo:</strong> 30-60 segundos</p>
                <p className="text-sm text-muted-foreground">
                  Posición de push-up pero sobre antebrazos. Mantén línea recta de cabeza a talones, glúteos apretados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">2. Hollow Body Hold</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Abdomen inferior, rectus abdominis
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Tiempo:</strong> 20-40 segundos</p>
                <p className="text-sm text-muted-foreground">
                  Tumbado boca arriba, eleva piernas y brazos del suelo, lumbar pegada al suelo. Posición fundamental.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">3. L-Sit en Suelo</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Abdomen inferior, hip flexors, tríceps
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Tiempo:</strong> 10-30 segundos</p>
                <p className="text-sm text-muted-foreground">
                  Sentado en el suelo, manos a los lados, empuja y eleva las piernas rectas. Rodillas dobladas si es necesario.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">4. Toes to Bar / Elevaciones de Piernas</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Abdomen completo, grip
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 8-15</p>
                <p className="text-sm text-muted-foreground">
                  Colgado de la barra, eleva las piernas hasta tocar la barra (o lo más alto posible). Sin balanceo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">5. Russian Twists</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Oblicuos, rotación de core
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 20-30 (total)</p>
                <p className="text-sm text-muted-foreground">
                  Sentado con piernas elevadas, rota el torso de lado a lado. Añade peso si es muy fácil.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">6. Mountain Climbers</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Core dinámico, cardio
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Tiempo:</strong> 30-45 segundos</p>
                <p className="text-sm text-muted-foreground">
                  Posición de flexión, alterna llevando rodillas al pecho rápidamente. Mantén core estable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consejos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Consejos para Abdominales Definidos
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>La dieta es clave:</strong> Los abdominales se hacen en la cocina. Mantén un déficit calórico si quieres definición.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Calidad sobre cantidad:</strong> Mejor 10 repeticiones perfectas que 50 mal hechas. Controla el movimiento.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Trabaja todos los ángulos:</strong> Incluye ejercicios isométricos, dinámicos, rotacionales y antirotacionales.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Respiración:</strong> Exhala en la contracción, inhala en la extensión. Mantén el core activado siempre.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Frecuencia:</strong> 3-4 veces por semana es suficiente. El core se trabaja también en otros ejercicios.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">
            Consigue un Core de <span className="text-primary">Acero</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Programas completos con progresiones para conseguir dragon flag, ab wheel y otras skills de core avanzadas.
          </p>
          <Button size="lg" className="bg-gradient-primary">
            Acceder a Programas Completos
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RutinaAbdominales;
