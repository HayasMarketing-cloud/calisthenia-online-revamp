import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByZone } from "@/lib/videoUtils";

const RutinaEspalda = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6 text-center">
              Rutina de <span className="text-primary">Espalda</span> 🦾
            </h1>
            <p className="text-xl text-muted-foreground mb-6 text-center">
              Construye una espalda fuerte y definida con dominadas, remos y ejercicios de calistenia avanzados.
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
            Beneficios de Entrenar Espalda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold mb-2">Postura Mejorada</h3>
                <p className="text-muted-foreground">
                  Corrige la postura y previene dolores de espalda causados por la vida sedentaria.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">Fuerza de Tracción</h3>
                <p className="text-muted-foreground">
                  Desarrolla la capacidad fundamental de tirar, esencial para habilidades avanzadas.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Base para Skills</h3>
                <p className="text-muted-foreground">
                  Una espalda fuerte es la base para muscle-ups, front levers y más.
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
                <h3 className="text-2xl font-bold mb-2">1. Dominadas Pronadas</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Dorsales, romboides, trapecio
                </p>
                <p className="mb-2"><strong>Series:</strong> 4-5</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 5-10</p>
                <p className="text-sm text-muted-foreground">
                  El rey de los ejercicios de espalda. Agarre prono (palmas hacia fuera) a la anchura de los hombros.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">2. Remo Australiano</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Dorsales, trapecio medio, bíceps
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 10-15</p>
                <p className="text-sm text-muted-foreground">
                  Bajo una barra baja, cuerpo recto, tira hacia el pecho. Ajusta altura para dificultad.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">3. Dominadas Archer</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Dorsales (trabajo unilateral), core
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 4-8 por lado</p>
                <p className="text-sm text-muted-foreground">
                  Variante avanzada donde desplazas el peso hacia un brazo, preparación para dominada a un brazo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">4. Tuck Front Lever Hold</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Dorsales, core, fuerza isométrica
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Tiempo:</strong> 10-30 segundos</p>
                <p className="text-sm text-muted-foreground">
                  Colgado de la barra, lleva las rodillas al pecho manteniendo espalda paralela al suelo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">5. Scapular Pull-Ups</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Retracción escapular, estabilizadores
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 15-20</p>
                <p className="text-sm text-muted-foreground">
                  Colgado de la barra, eleva el cuerpo solo con la retracción de las escápulas, sin flexionar codos.
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
            Consejos Clave
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Control escapular:</strong> Aprende a retraer y deprimir las escápulas antes de tirar en dominadas.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Rango completo:</strong> Trabaja todo el recorrido del movimiento, desde brazos extendidos hasta pecho arriba.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Volumen adecuado:</strong> La espalda responde bien al volumen. 12-20 series semanales es óptimo.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Variedad de agarres:</strong> Alterna entre pronado, supino y neutro para trabajar todos los ángulos.
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
            videos={getVideosByZone(allVideos, 'Espalda', { limit: 6, sortBy: 'engagement' })}
            title="📹 Videos de Entrenamiento de Espalda"
            showStats={true}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">
            Domina las <span className="text-primary">Habilidades Avanzadas</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Accede a programas completos para conseguir front lever, muscle-up y otras skills impresionantes.
          </p>
          <Button size="lg" className="bg-gradient-primary">
            Ver Programas Avanzados
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RutinaEspalda;
