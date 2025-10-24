import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import fullBodyImg from "@/assets/calisthenia-full-body.webp";

const RutinaFullBody = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6">
                Rutina <span className="text-primary">Full Body</span> ⚡
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Entrena todo el cuerpo en una sola sesión con ejercicios compuestos de calistenia para máxima eficiencia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-primary">Ver Programa Completo</Button>
                <Button size="lg" variant="outline">Descargar PDF</Button>
              </div>
            </div>
            <div>
              <img 
                src={fullBodyImg} 
                alt="Ejercicios full body en calistenia" 
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
            Ventajas del Entrenamiento Full Body
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Máxima Eficiencia</h3>
                <p className="text-muted-foreground">
                  Entrena todo el cuerpo en 45-60 minutos. Perfecto si tienes poco tiempo.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-bold mb-2">Alto Gasto Calórico</h3>
                <p className="text-muted-foreground">
                  Los ejercicios compuestos queman más calorías y aceleran tu metabolismo.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold mb-2">Desarrollo Equilibrado</h3>
                <p className="text-muted-foreground">
                  Trabaja todos los grupos musculares con la frecuencia óptima de 3x semana.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Estructura Rutina */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Estructura de la Rutina
          </h2>
          <div className="max-w-3xl mx-auto mb-12">
            <Card className="bg-secondary/5">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ejemplo de Sesión Full Body</h3>
                <p className="text-muted-foreground mb-6">
                  Esta rutina trabaja empuje, tracción, piernas y core en una sola sesión. Realízala 3 veces por semana con al menos un día de descanso entre sesiones.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Duración:</strong> 45-60 minutos</p>
                  <p><strong>Frecuencia:</strong> 3x semana (Lunes, Miércoles, Viernes)</p>
                  <p><strong>Descanso entre series:</strong> 1-3 minutos</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <h3 className="font-display font-bold text-2xl lg:text-3xl mb-8 text-center">
            Ejercicios de la Rutina
          </h3>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <h4 className="text-2xl font-bold">Dominadas</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Espalda, bíceps (ejercicio de tracción)
                </p>
                <p className="mb-2"><strong>Series:</strong> 4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 6-10</p>
                <p className="text-sm text-muted-foreground">
                  Agarre prono, tira hasta barbilla sobre la barra. Si no puedes, usa bandas elásticas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <h4 className="text-2xl font-bold">Fondos en Paralelas</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Pecho, tríceps, hombros (ejercicio de empuje)
                </p>
                <p className="mb-2"><strong>Series:</strong> 4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 8-12</p>
                <p className="text-sm text-muted-foreground">
                  Inclínate hacia adelante para más pecho. Baja hasta codos a 90 grados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <h4 className="text-2xl font-bold">Sentadillas Profundas</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Piernas completas (cuádriceps, glúteos)
                </p>
                <p className="mb-2"><strong>Series:</strong> 4</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 15-20</p>
                <p className="text-sm text-muted-foreground">
                  Baja hasta que glúteos toquen pantorrillas. Si es fácil, haz tempo lento o a una pierna.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <h4 className="text-2xl font-bold">Flexiones</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Pecho, tríceps (empuje horizontal)
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 12-20</p>
                <p className="text-sm text-muted-foreground">
                  Manos anchura hombros, baja hasta pecho casi toca suelo. Variante: archer, diamante.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                  <h4 className="text-2xl font-bold">Remo Australiano</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Espalda media (tracción horizontal)
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 10-15</p>
                <p className="text-sm text-muted-foreground">
                  Bajo barra baja, tira hacia el pecho. Mantén cuerpo recto como una tabla.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">6</div>
                  <h4 className="text-2xl font-bold">Nordic Curls</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Isquiotibiales (piernas posterior)
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 5-8</p>
                <p className="text-sm text-muted-foreground">
                  Arrodillado, alguien sujeta tobillos. Baja torso controladamente. Usa manos si necesitas ayuda.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">7</div>
                  <h4 className="text-2xl font-bold">L-Sit / Hollow Body</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Core completo (isométrico)
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Tiempo:</strong> 15-30 segundos</p>
                <p className="text-sm text-muted-foreground">
                  L-sit en suelo o paralelas. Alternativa: hollow body hold tumbado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">8</div>
                  <h4 className="text-2xl font-bold">Pike Push-Ups</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  <strong>Objetivo:</strong> Hombros (empuje vertical)
                </p>
                <p className="mb-2"><strong>Series:</strong> 3</p>
                <p className="mb-4"><strong>Repeticiones:</strong> 8-12</p>
                <p className="text-sm text-muted-foreground">
                  Posición V invertida, baja cabeza hacia suelo. Progresión hacia handstand push-ups.
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
            Consejos para Optimizar la Rutina
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Calentamiento obligatorio:</strong> 5-10 minutos de movilidad y activación antes de empezar.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Orden estratégico:</strong> Empieza con ejercicios más difíciles (dominadas, fondos) cuando estás fresco.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Progresión inteligente:</strong> Añade repeticiones primero, luego series, luego dificultad (variantes).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Descanso adecuado:</strong> Al menos 48h entre sesiones. Duerme 7-9 horas para recuperación.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Nutrición:</strong> Come suficiente proteína (1.6-2g/kg) y mantén superávit calórico para ganar masa.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <strong>Escucha tu cuerpo:</strong> Si un día estás muy fatigado, reduce volumen o toma día extra de descanso.
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
            ¿Listo para tu <span className="text-primary">Transformación</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Accede a programas personalizados con periodización, planificación de progresiones y coaching individual.
          </p>
          <Button size="lg" className="bg-gradient-primary">
            Ver Programas Personalizados
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RutinaFullBody;
