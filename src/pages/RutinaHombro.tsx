import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByZone } from "@/lib/videoUtils";

const RutinaHombro = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6 text-center">
              Rutina de <span className="text-primary">Hombros</span> 💪
            </h1>
            <p className="text-xl text-muted-foreground mb-6 text-center">
              Fortalece y desarrolla hombros potentes y estables con ejercicios de calistenia específicos para deltoides y manguito rotador.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary">Ver Programa Completo</Button>
              <Button size="lg" variant="outline">Descargar PDF</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Beneficios de esta Rutina
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Estabilidad</h3>
                <p className="text-muted-foreground">
                  Fortalece el manguito rotador y previene lesiones en movimientos diarios.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold mb-2">Sin Equipo</h3>
                <p className="text-muted-foreground">
                  Entrena en cualquier lugar usando solo tu peso corporal y una barra.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">Progresión Clara</h3>
                <p className="text-muted-foreground">
                  Desde básico hasta avanzado con variaciones adaptadas a tu nivel.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ejercicios Principales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Ejercicios Principales
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">1. Pike Push-Ups</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Deltoides anterior y medio
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 8-12</p>
                <p className="text-sm text-muted-foreground">
                  Posición de V invertida, flexiona los codos llevando la cabeza hacia el suelo entre las manos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">2. Flexiones en Pino Asistidas</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Deltoides completo
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 5-8</p>
                <p className="text-sm text-muted-foreground">
                  Apoyo en pared, baja controladamente flexionando codos. Ideal para construir fuerza para el pino libre.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">3. Elevaciones Laterales en Anillas</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Deltoides medio
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 10-15</p>
                <p className="text-sm text-muted-foreground">
                  Inclinado en anillas o TRX, abre los brazos lateralmente controlando el movimiento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">4. Plancha con Protracción</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Serrato anterior y estabilizadores
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 12-20</p>
                <p className="text-sm text-muted-foreground">
                  En posición de plancha, empuja el suelo alejando las escápulas sin flexionar codos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">5. Face Pulls en Anillas</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Deltoides posterior y manguito rotador
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 15-20</p>
                <p className="text-sm text-muted-foreground">
                  Tira de las anillas hacia tu cara, abriendo los codos hacia los lados. Crucial para salud del hombro.
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
            Consejos para Mejores Resultados
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Frecuencia:</strong> Entrena hombros 2-3 veces por semana con suficiente descanso entre sesiones.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Movilidad:</strong> Dedica tiempo al calentamiento articular. Los hombros son articulaciones complejas.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Equilibrio:</strong> Trabaja todos los deltoides (anterior, medio, posterior) para desarrollo completo.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Progresión gradual:</strong> No fuerces rangos de movimiento. Aumenta la dificultad lentamente.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Prevención:</strong> Incluye siempre trabajo de deltoides posterior y manguito rotador para prevenir lesiones.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Galería de Videos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <VideoGallery 
            videos={getVideosByZone(allVideos, 'Hombros', { limit: 6, sortBy: 'engagement' })}
            title="📹 Videos de Entrenamiento de Hombros"
            showStats={true}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">
            ¿Quieres un Programa <span className="text-primary">Personalizado</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Accede a rutinas completas, planes de progresión detallados y coaching personalizado para alcanzar tus objetivos más rápido.
          </p>
          <Button size="lg" className="bg-gradient-primary">
            Ver Programas de Entrenamiento
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RutinaHombro;