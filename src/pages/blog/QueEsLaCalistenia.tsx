import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoutineBreadcrumbs from "@/components/routine/RoutineBreadcrumbs";
import VideoEmbed from "@/components/VideoEmbed";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const QueEsLaCalistenia = () => {
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog/" },
    { label: "Qué es la Calistenia", href: "/blog/que-es-la-calistenia/" },
  ];

  return (
    <>
      <Helmet>
        <title>Qué es la Calistenia | Guía Completa 2025 - Calistenia Online</title>
        <meta
          name="description"
          content="Descubre qué es la calistenia, sus beneficios, origen histórico y cómo empezar. Guía completa sobre el entrenamiento con peso corporal más efectivo."
        />
        <link rel="canonical" href="https://calisthenia.online/blog/que-es-la-calistenia/" />
        <meta property="og:title" content="Qué es la Calistenia | Guía Completa 2025" />
        <meta
          property="og:description"
          content="Descubre qué es la calistenia, sus beneficios, origen histórico y cómo empezar. Guía completa sobre el entrenamiento con peso corporal más efectivo."
        />
        <meta property="og:url" content="https://calisthenia.online/blog/que-es-la-calistenia/" />
        <meta property="og:type" content="article" />
        <meta name="keywords" content="calistenia, qué es la calistenia, entrenamiento con peso corporal, ejercicios calistenia, street workout" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <article className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <RoutineBreadcrumbs items={breadcrumbItems} />
            
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Qué es la Calistenia
              </h1>
              <p className="text-lg text-muted-foreground">
                Guía completa sobre el sistema de entrenamiento con peso corporal más efectivo
              </p>
            </header>

            <div className="prose prose-lg max-w-none">
              {/* Introducción */}
              <section className="mb-12">
                <p className="text-lg leading-relaxed text-foreground mb-6">
                  La calistenia es un sistema de entrenamiento físico basado en el uso del propio peso corporal 
                  para desarrollar fuerza, control y resistencia. Es una disciplina que combina ejercicios 
                  funcionales con movimientos que mejoran la coordinación, flexibilidad y potencia muscular.
                </p>
                <p className="text-lg leading-relaxed text-foreground">
                  A diferencia del entrenamiento con máquinas, la calistenia te permite entrenar en cualquier 
                  lugar, sin necesidad de equipamiento costoso. Solo necesitas tu cuerpo, determinación y 
                  constancia para transformar tu físico y mejorar tu salud.
                </p>
              </section>

              {/* Video */}
              <section className="mb-12 -mx-4">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-4 text-foreground px-4">
                    Descubre qué es la Calistenia
                  </h2>
                  <p className="text-lg text-foreground px-4 mb-6">
                    En esta entrevista para el canal VIDA TV, comparto los secretos de la calistenia 
                    y cómo puede transformar tu vida.
                  </p>
                </div>
                <VideoEmbed 
                  videoId="4D6AE8k779Q" 
                  title="Nico Reyero: El rey de la Calistenia comparte todos sus secretos"
                />
              </section>

              {/* Definición extendida */}
              <section className="mb-12">
                <p className="text-lg leading-relaxed text-foreground mb-6">
                  La <strong>calistenia</strong> es una <strong>disciplina de entrenamiento físico</strong> que 
                  utiliza el <strong>propio peso corporal</strong> para desarrollar <strong>fuerza</strong>, 
                  <strong>resistencia</strong>, <strong>coordinación</strong> y <strong>control</strong> 💪.
                </p>
                <p className="text-lg leading-relaxed text-foreground mb-6">
                  Esta práctica surgió en las <strong>calles de Brooklyn</strong>, influida por la 
                  <strong>cultura hip hop</strong>, como un <strong>fenómeno social</strong> que ayudó a 
                  muchas personas a <strong>reintegrarse en la sociedad</strong> a través del ejercicio.
                </p>
              </section>

              {/* Beneficios y características */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Características y Beneficios
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-foreground">
                      Ejercicios Progresivos
                    </h3>
                    <p className="text-lg leading-relaxed text-foreground">
                      Se basa en <strong>ejercicios básicos</strong> como <strong>flexiones</strong>, 
                      <strong>sentadillas</strong>, <strong>dominadas</strong> y <strong>abdominales</strong>, 
                      pero permite progresar hacia <strong>movimientos avanzados</strong> como el <strong>pino</strong>, 
                      la <strong>bandera humana</strong> o ejercicios <strong>con lastre</strong>.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-foreground">
                      Entrena en Cualquier Lugar
                    </h3>
                    <p className="text-lg leading-relaxed text-foreground">
                      Uno de sus grandes atractivos es que puede practicarse en <strong>parques</strong> o 
                      <strong>espacios al aire libre</strong> 🌳, sin necesidad de material costoso, 
                      lo que la hace <strong>accesible</strong> y fomenta la <strong>creación de comunidad</strong>.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-foreground">
                      Beneficios Físicos y Mentales
                    </h3>
                    <p className="text-lg leading-relaxed text-foreground mb-4">
                      La calistenia no solo mejora la <strong>condición física general</strong>, sino que 
                      también tiene <strong>beneficios psicológicos</strong>, al promover el 
                      <strong>compañerismo</strong>, el <strong>reto personal</strong> y el 
                      <strong>contacto con la naturaleza</strong> 🌞.
                    </p>
                    <p className="text-lg leading-relaxed text-foreground">
                      Es ideal para <strong>ganar masa muscular</strong>, <strong>acelerar el metabolismo</strong> 
                      y <strong>mejorar la salud ósea y articular</strong> 🦴.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-foreground">
                      Accesible para Todos
                    </h3>
                    <p className="text-lg leading-relaxed text-foreground">
                      Con una <strong>buena técnica</strong>, <strong>planificación</strong> y 
                      <strong>constancia</strong>, cualquier persona — <strong>incluso sin experiencia 
                      previa</strong>— puede iniciarse y avanzar. Es una <strong>alternativa eficaz</strong> 
                      para quienes buscan una <strong>rutina diferente</strong> al gimnasio tradicional.
                    </p>
                  </div>
                </div>
              </section>

              {/* Origen histórico */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  ¿De Dónde Viene la Calistenia?
                </h2>
                
                <p className="text-lg leading-relaxed text-foreground mb-6 italic">
                  De los guerreros espartanos al Street Workout: la evolución histórica de la calistenia 
                  como entrenamiento físico universal y accesible
                </p>

                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-foreground">
                    La <strong>calistenia</strong>, lejos de ser una moda reciente, tiene raíces profundas 
                    que se remontan a la <strong>Antigua Grecia y Roma</strong>, donde se valoraba un cuerpo 
                    <strong>fuerte y armonioso</strong> como parte esencial del desarrollo humano 🏺. 
                    Los <strong>soldados espartanos</strong> y <strong>gladiadores romanos</strong> utilizaban 
                    ejercicios con su propio peso —como <strong>flexiones</strong>, <strong>sentadillas</strong> 
                    o <strong>dominadas</strong>— para mejorar su condición física.
                  </p>

                  <p className="text-lg leading-relaxed text-foreground">
                    Aunque en la <strong>Edad Media</strong> decayó el entrenamiento estructurado, la calistenia 
                    siguió viva en prácticas <strong>militares</strong> y <strong>artes marciales</strong> ⚔️. 
                    Durante el <strong>Renacimiento</strong>, se revitalizó con el redescubrimiento de los 
                    <strong>ideales clásicos</strong>.
                  </p>

                  <p className="text-lg leading-relaxed text-foreground">
                    En el <strong>siglo XIX</strong>, se institucionalizó como parte de la 
                    <strong>educación física</strong> en Europa y EE.UU., destacando figuras como 
                    <strong>Friedrich Ludwig Jahn</strong> (padre de la gimnasia) y 
                    <strong>Catherine Beecher</strong>, quien promovió su práctica entre mujeres.
                  </p>

                  <p className="text-lg leading-relaxed text-foreground">
                    En el <strong>siglo XX</strong>, la calistenia permaneció en ámbitos militares y deportivos, 
                    pero en el <strong>siglo XXI renació como Street Workout</strong> 🏙️🔥, una corriente 
                    urbana que llevó estos entrenamientos a <strong>parques</strong> y <strong>redes sociales</strong>.
                  </p>

                  <p className="text-lg leading-relaxed text-foreground">
                    Hoy, la <strong>calistenia es un fenómeno global</strong> que combina 
                    <strong>historia, salud y comunidad</strong>, con un enfoque <strong>accesible, 
                    progresivo</strong> y cada vez más popular.
                  </p>
                </div>
              </section>

              {/* CTA */}
              <section className="bg-card border rounded-xl p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  ¿Listo para Empezar con la Calistenia?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Descubre rutinas diseñadas específicamente para principiantes y comienza tu transformación hoy
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/calistenia-principiantes/">
                    <Button size="lg" className="w-full sm:w-auto">
                      Guía para Principiantes
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/programas/">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Ver Todos los Programas
                    </Button>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default QueEsLaCalistenia;
