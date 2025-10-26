import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByZone } from "@/lib/videoUtils";
import RoutineHero from "@/components/routine/RoutineHero";

const RutinaPiernas = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <RoutineHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Rutinas", href: "/programas" },
          { label: "Rutina Piernas", href: "/rutina-piernas" }
        ]}
        title="Rutina de"
        titleHighlight="Piernas"
        emoji="🦵"
        description="Desarrolla piernas fuertes y explosivas con sentadillas, pistol squats y ejercicios unilaterales de calistenia."
      />

      {/* Beneficios */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Por Qué Entrenar Piernas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold mb-2">Equilibrio Muscular</h3>
                <p className="text-muted-foreground">
                  Evita desbalances musculares y construye un físico proporcionado y atlético.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Potencia y Explosividad</h3>
                <p className="text-muted-foreground">
                  Mejora saltos, sprints y agilidad. Fundamental para deportes y movimientos dinámicos.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-bold mb-2">Mayor Gasto Calórico</h3>
                <p className="text-muted-foreground">
                  Los músculos grandes queman más calorías. Entrena piernas para acelerar tu metabolismo.
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
                <h3 className="text-2xl font-bold mb-2">1. Sentadillas Profundas</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Cuádriceps, glúteos, core
                </p>
                <p className="mb-2"><strong>Series:</strong> 4-5</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 15-25</p>
                <p className="text-sm text-muted-foreground">
                  Baja hasta que glúteos toquen pantorrillas. Mantén pecho arriba y talones en el suelo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">2. Pistol Squats (Sentadilla a una Pierna)</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Cuádriceps, glúteos, equilibrio
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 5-10 por pierna</p>
                <p className="text-sm text-muted-foreground">
                  El rey de los ejercicios de piernas en calistenia. Empieza con ayuda o variantes asistidas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">3. Zancadas Búlgaras</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Cuádriceps, glúteos (trabajo unilateral)
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 12-15 por pierna</p>
                <p className="text-sm text-muted-foreground">
                  Pie trasero elevado en banco. Baja hasta rodilla casi toca el suelo. Excelente para equilibrio.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">4. Nordic Curls (Curl Nórdico)</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Isquiotibiales (excéntrico fuerte)
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 5-8</p>
                <p className="text-sm text-muted-foreground">
                  Arrodillado, alguien sujeta tus tobillos. Baja el torso controladamente hacia adelante.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">5. Saltos en Caja / Box Jumps</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Potencia explosiva, pantorrillas
                </p>
                <p className="mb-2"><strong>Series:</strong> 3-4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 8-12</p>
                <p className="text-sm text-muted-foreground">
                  Salta a una plataforma elevada. Aterriza suavemente. Baja con control, no saltes hacia abajo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">6. Calf Raises a Una Pierna</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Pantorrillas (gastrocnemios y sóleo)
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 15-20 por pierna</p>
                <p className="text-sm text-muted-foreground">
                  De pie en un escalón, eleva talón lo más alto posible. Baja hasta sentir estiramiento.
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
            Consejos para Maximizar Resultados
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Frecuencia:</strong> 2-3 veces por semana es óptimo. Las piernas necesitan tiempo de recuperación.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Progresión:</strong> Si las sentadillas son fáciles, pasa a variantes a una pierna o añade tempo lento.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Movilidad de tobillo:</strong> Trabaja la flexibilidad del tobillo para mejorar profundidad en sentadillas.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>No descuides isquios:</strong> Muchos se centran solo en cuádriceps. Incluye siempre ejercicios de isquiotibiales.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Variedad:</strong> Combina ejercicios bilaterales y unilaterales para desarrollo equilibrado.
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
            videos={getVideosByZone(allVideos, 'Piernas', { limit: 6, sortBy: 'engagement' })}
            title="📹 Videos de Entrenamiento de Piernas"
            showStats={true}
          />
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default RutinaPiernas;
