import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByZone } from "@/lib/videoUtils";
import RoutineHero from "@/components/routine/RoutineHero";

const RutinaPecho = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <RoutineHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rutinas", href: "/programas" },
          { label: "Rutina Pecho", href: "/rutina-pecho" }
        ]}
        title="Rutina de"
        titleHighlight="Pecho"
        emoji="💯"
        description="Construye un pecho fuerte y definido con flexiones, fondos y variantes avanzadas de empuje en calistenia."
      />

      {/* Beneficios */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Beneficios del Entrenamiento de Pecho
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold mb-2">Fuerza de Empuje</h3>
                <p className="text-muted-foreground">
                  Desarrolla la capacidad fundamental de empujar, esencial para la vida diaria y deportes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">Físico Estético</h3>
                <p className="text-muted-foreground">
                  Un pecho bien desarrollado mejora significativamente tu apariencia física general.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Base para Planche</h3>
                <p className="text-muted-foreground">
                  Un pecho fuerte es fundamental para progressar hacia la planche y otros statics.
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
                <h3 className="text-2xl font-bold mb-2">1. Flexiones Estándar</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Pecho, tríceps, hombros
                </p>
                <p className="mb-2"><strong>Series:</strong> 4-5</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 12-20</p>
                <p className="text-sm text-muted-foreground">
                  Manos a la anchura de los hombros, cuerpo recto, baja hasta pecho casi toca el suelo. Fundamental.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">2. Flexiones Archer</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Pecho (trabajo unilateral), core
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 6-10 por lado</p>
                <p className="text-sm text-muted-foreground">
                  Desplaza el peso hacia un brazo mientras el otro se extiende. Preparación para flexión a un brazo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">3. Fondos en Paralelas</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Pecho inferior, tríceps, hombros
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 8-15</p>
                <p className="text-sm text-muted-foreground">
                  Inclínate hacia adelante para mayor énfasis en pecho. Baja hasta sentir estiramiento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">4. Pseudo Planche Push-Ups</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Pecho, hombros (preparación planche)
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 6-12</p>
                <p className="text-sm text-muted-foreground">
                  Manos hacia atrás a la altura de las caderas, inclínate hacia adelante. Construcción de planche.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">5. Flexiones Declinadas</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Pecho superior, hombros
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 10-15</p>
                <p className="text-sm text-muted-foreground">
                  Pies elevados en banco o escalón. Más difícil y mayor énfasis en parte superior del pecho.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">6. Pike Push-Ups</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Hombros principalmente, pecho superior
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 10-15</p>
                <p className="text-sm text-muted-foreground">
                  Posición de V invertida, baja la cabeza hacia el suelo. Progresión hacia handstand push-ups.
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
            Consejos para Mejor Desarrollo
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Retracción escapular:</strong> Junta las escápulas al bajar para máxima activación del pecho.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Rango completo:</strong> Baja hasta que el pecho casi toque el suelo en flexiones para máxima hipertrofia.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Volumen progresivo:</strong> Empieza con 8-12 series semanales, aumenta gradualmente hasta 15-20.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Variedad de ángulos:</strong> Combina ejercicios para trabajar pecho superior, medio e inferior.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Tempo controlado:</strong> 2 segundos bajada, 1 segundo arriba. Control sobre velocidad.
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
            videos={getVideosByZone(allVideos, 'Pecho', { limit: 6, sortBy: 'engagement' })}
            title="📹 Videos de Entrenamiento de Pecho"
            showStats={true}
          />
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default RutinaPecho;
