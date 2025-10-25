import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByZone } from "@/lib/videoUtils";

const RutinaBrazos = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6 text-center">
              Rutina de <span className="text-primary">Brazos</span> 💪
            </h1>
            <p className="text-xl text-muted-foreground mb-6 text-center">
              Desarrolla bíceps, tríceps y antebrazos potentes con ejercicios de calistenia efectivos y sin necesidad de equipo especial.
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
                <h3 className="text-xl font-bold mb-2">Fuerza Funcional</h3>
                <p className="text-muted-foreground">
                  Desarrolla brazos fuertes que te sirven para movimientos reales del día a día.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold mb-2">Sin Equipo</h3>
                <p className="text-muted-foreground">
                  Entrena en casa o en el parque. Solo necesitas una barra o incluso el suelo.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">Progresión Clara</h3>
                <p className="text-muted-foreground">
                  Desde principiante hasta avanzado con variaciones adaptadas a tu nivel.
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
                <h3 className="text-2xl font-bold mb-2">1. Flexiones Diamante</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Tríceps principalmente, pecho secundario
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 8-12</p>
                <p className="text-sm text-muted-foreground">
                  Coloca las manos juntas formando un diamante bajo tu pecho. Mantén el core activado y baja controladamente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">2. Dominadas Supinas</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Bíceps y dorsales
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 6-10</p>
                <p className="text-sm text-muted-foreground">
                  Agarre supino (palmas hacia ti) para mayor activación del bíceps. Si no puedes, usa bandas elásticas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">3. Fondos en Paralelas</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Tríceps, pecho y hombros
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 8-15</p>
                <p className="text-sm text-muted-foreground">
                  Inclínate ligeramente hacia adelante para más pecho, o mantente vertical para más tríceps.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">4. Curl Australiano</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Bíceps y antebrazos
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 10-15</p>
                <p className="text-sm text-muted-foreground">
                  Bajo una barra baja, agarre supino, tira de tu cuerpo hacia arriba flexionando codos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">5. Extensiones de Tríceps en Pared</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Tríceps (cabeza larga)
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 12-20</p>
                <p className="text-sm text-muted-foreground">
                  De pie frente a una pared, apoya las manos arriba y deja caer el cuerpo flexionando codos.
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
                      <strong>Frecuencia:</strong> Entrena brazos 2-3 veces por semana con al menos 48h de descanso entre sesiones.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Calentamiento:</strong> Siempre calienta con movilidad articular y ejercicios progresivos antes de empezar.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Técnica primero:</strong> Prioriza la forma correcta sobre las repeticiones. La calidad {'>'} cantidad.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Progresión:</strong> Aumenta gradualmente la dificultad con más repeticiones, series o variantes más difíciles.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Nutrición:</strong> Asegúrate de consumir suficiente proteína (1.6-2g por kg de peso) para la recuperación muscular.
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
            videos={getVideosByZone(allVideos, 'Brazos', { limit: 6, sortBy: 'engagement' })}
            title="📹 Videos de Entrenamiento de Brazos"
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

export default RutinaBrazos;
