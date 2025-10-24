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
import { Separator } from "@/components/ui/separator";
import VideoEmbed from "@/components/VideoEmbed";
import ExerciseCard from "@/components/routine/ExerciseCard";
import RoutineBreadcrumbs from "@/components/routine/RoutineBreadcrumbs";
import fullBodyImg from "@/assets/calisthenia-full-body.webp";

const RutinaFullBody = () => {
  return (
    <>
      <Helmet>
        <title>Rutina Full Body Calistenia: Ejercicios y Beneficios Esenciales</title>
        <meta 
          name="description" 
          content="Rutina full body de calistenia completa. Aprende ejercicios, beneficios, planificación y progresión para entrenar todo el cuerpo 3x/semana. Video guiado incluido." 
        />
        <meta 
          name="keywords" 
          content="rutina full body calistenia, ejercicios cuerpo completo, entrenamiento 3 días semana, calistenia en casa, beneficios full body" 
        />
        <link rel="canonical" href="https://calisthenia.online/rutina-full-body" />
        
        <meta property="og:title" content="Rutina Full Body Calistenia Completa" />
        <meta property="og:description" content="Entrena todo tu cuerpo con calistenia. Ejercicios, planificación y video guiado completo." />
        <meta property="og:image" content="https://calisthenia.online/assets/calisthenia-full-body.webp" />
        <meta property="og:url" content="https://calisthenia.online/rutina-full-body" />
        <meta property="og:type" content="article" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ExercisePlan",
            "name": "Rutina Full Body Calistenia",
            "description": "Plan completo de entrenamiento full body con calistenia",
            "activityFrequency": "3 times per week",
            "exerciseType": "Calisthenics",
            "video": {
              "@type": "VideoObject",
              "name": "Rutina Full Body Calistenia Completa",
              "embedUrl": "https://www.youtube.com/embed/PmkNJ7fQhPY"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-background">
        <div className="container mx-auto px-4">
          <RoutineBreadcrumbs 
            items={[
              { label: "Inicio", href: "/" },
              { label: "Programas", href: "/programas" },
              { label: "Rutina Full Body", href: "/rutina-full-body" }
            ]}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <div>
              <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6">
                Rutina <span className="text-primary">Full Body</span> Calistenia ⚡
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="secondary">💪 Todos los Niveles</Badge>
                <Badge variant="secondary">⏱️ 30-60 min</Badge>
                <Badge variant="secondary">🔄 3x/semana</Badge>
                <Badge variant="secondary">📍 Casa/Parque</Badge>
              </div>
              
              <p className="text-xl text-muted-foreground mb-8">
                La rutina full body en calistenia es un enfoque de entrenamiento que trabaja todos los grupos musculares en una sola sesión. Desarrolla fuerza, resistencia y equilibrio muscular usando únicamente tu peso corporal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <a href="#video-principal">Ver Video Completo</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/programas">Ver Programas</Link>
                </Button>
              </div>
            </div>
            
            <div>
              <img 
                src={fullBodyImg} 
                alt="Persona realizando ejercicios de calistenia full body: dominadas, fondos y sentadillas al aire libre" 
                className="rounded-xl shadow-elegant"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fundamentos */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Fundamentos de la Calistenia Full Body
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            La calistenia full body se centra en el uso del propio peso corporal para trabajar todos los músculos en una misma sesión.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">¿Qué es una rutina full body en calistenia?</h3>
                <p className="text-muted-foreground mb-4">
                  Este enfoque de entrenamiento abarca ejercicios que implican el esfuerzo de múltiples grupos musculares, optimizando el tiempo y el rendimiento. En lugar de dividir los entrenamientos por áreas específicas, la rutina full body busca integrar diferentes movimientos en sesiones compactas.
                </p>
                <p className="text-muted-foreground">
                  Así, es posible lograr un trabajo más completo y armónico en el cuerpo, favoreciendo el desarrollo funcional y la capacidad aeróbica.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4 text-center">
            Ventajas de Entrenar el Cuerpo Completo
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Entrenar todos los grupos musculares en una única sesión presenta múltiples beneficios
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { emoji: "⚡", title: "Eficiencia de Tiempo", text: "Las sesiones son más cortas sin sacrificar la efectividad del entrenamiento. Ideal para agendas ocupadas." },
              { emoji: "💪", title: "Desarrollo Equilibrado", text: "Se evita el sobreentrenamiento de ciertas áreas, promoviendo un desarrollo muscular más armónico." },
              { emoji: "🔄", title: "Mayor Frecuencia", text: "Permite realizar entrenamientos con mayor regularidad, facilitando el avance continuo." },
              { emoji: "🎯", title: "Ajustes según Objetivos", text: "Las rutinas pueden adaptarse fácilmente a diferentes niveles de habilidad y metas personales." },
              { emoji: "🔥", title: "Quema de Calorías", text: "Al implicar grandes grupos musculares, se favorece la quema calórica y mejora la composición corporal." },
              { emoji: "🏃", title: "Desarrollo Funcional", text: "Mejora la coordinación, resistencia corporal y capacidad aeróbica de forma integral." }
            ].map((benefit, i) => (
              <Card key={i} className="hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{benefit.emoji}</div>
                  <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Principal */}
      <section id="video-principal" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
              🎬 Sigue la Rutina Full Body Completa
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entrena conmigo siguiendo este video guiado. Incluye calentamiento y todos los ejercicios principales.
            </p>
          </div>
          
          <VideoEmbed 
            videoId="PmkNJ7fQhPY" 
            title="Rutina Full Body Calistenia Completa | Entrena Todo el Cuerpo"
          />
        </div>
      </section>

      {/* Estructura del Video */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Estructura de la Rutina
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-6 text-center">Formato del Entrenamiento</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔥</div>
                    <p className="text-sm text-muted-foreground mb-1">Calentamiento</p>
                    <p className="text-xl font-bold">5 ejercicios</p>
                    <p className="text-sm text-muted-foreground">Baja intensidad</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">💪</div>
                    <p className="text-sm text-muted-foreground mb-1">Parte Principal</p>
                    <p className="text-xl font-bold">3 series</p>
                    <p className="text-sm text-muted-foreground">Por ejercicio</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">⏱️</div>
                    <p className="text-sm text-muted-foreground mb-1">Tempo</p>
                    <p className="text-xl font-bold">30s / 30s</p>
                    <p className="text-sm text-muted-foreground">Activo / Descanso</p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h4 className="font-bold text-lg mb-4">🧠 Estímulos Trabajados:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['⚡ Fuerza', '💪 Resistencia muscular', '❤️ Activación cardiovascular'].map((e, i) => (
                    <div key={i} className="flex items-center gap-3 bg-background/50 p-3 rounded-lg">
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-12 text-center">
            Preguntas Frecuentes sobre Full Body
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-background rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  ¿Cuántas veces a la semana se debe entrenar?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>Principiantes: 2-3x/semana • Intermedios: 3-4x/semana • Avanzados: 4-6x/semana</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-background rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  ¿Puedo hacer full body si soy principiante?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sí, es excelente para principiantes. Permite aprender ejercicios fundamentales con alta frecuencia y requiere menos días de entrenamiento.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">💪⚡🔥</div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl mb-6">
              ¿Listo para tu <span className="text-primary">Transformación</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Lleva tu entrenamiento al siguiente nivel con programas personalizados y seguimiento profesional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/programas">Ver Programas Premium</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/quien-soy">Conocer al Entrenador</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RutinaFullBody;
