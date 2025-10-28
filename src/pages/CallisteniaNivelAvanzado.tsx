import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { Users, Zap, Target } from "lucide-react";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";

const CallisteniaNivelAvanzado = () => {
  // Filtrar videos para nivel intermedio y avanzado
  const videosAvanzados = allVideos
    .filter(video => video.nivel === "Intermedio" || video.nivel === "Avanzado")
    .sort((a, b) => b.vistas - a.vistas);

  return (
    <>
      <Helmet>
        <title>Calistenia Nivel Avanzado | Ejercicios Intermedios y Skills</title>
        <meta 
          name="description" 
          content="Lleva tu calistenia al siguiente nivel con ejercicios avanzados, skills y progresiones para atletas intermedios. Muscle-ups, front lever, planche y más." 
        />
        <meta property="og:title" content="Calistenia Nivel Avanzado | Ejercicios Intermedios y Skills" />
        <meta property="og:description" content="Ejercicios avanzados de calistenia, skills y progresiones para atletas intermedios. Muscle-ups, front lever, planche." />
        <link rel="canonical" href="https://calisthenia.online/calistenia-nivel-avanzado/" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <CommunityStickyBanner />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="py-24 bg-gradient-to-b from-primary/10 to-background">
            <div className="container mx-auto px-4 text-center">
              <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
                Calistenia Nivel Avanzado
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Domina skills avanzados y lleva tu entrenamiento al máximo nivel con ejercicios de alta intensidad.
              </p>
            </div>
          </section>

          {/* Características Nivel Avanzado */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Qué Significa Nivel Avanzado
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Skills Complejos</h3>
                  <p className="text-muted-foreground">
                    Muscle-ups, front lever, planche y otros movimientos que requieren años de práctica
                  </p>
                </div>
                
                <div className="text-center">
                  <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Alta Intensidad</h3>
                  <p className="text-muted-foreground">
                    Entrena con lastres, ejercicios explosivos y rangos de movimiento extremos
                  </p>
                </div>
                
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Control Total</h3>
                  <p className="text-muted-foreground">
                    Dominio completo del cuerpo en posiciones y movimientos desafiantes
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Galería de Videos */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <VideoGallery 
                videos={videosAvanzados.slice(0, 12)}
                title="Videos de Nivel Avanzado"
                showStats={true}
              />
            </div>
          </section>

          {/* Skills Avanzados */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Skills y Ejercicios Avanzados
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-card p-6 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-xl">Muscle-Up</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Combinación explosiva de dominada y fondo en un solo movimiento.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Requisitos:</strong> 15+ dominadas limpias, explosividad
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-xl">Front Lever</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Mantén tu cuerpo horizontal en barra con fuerza de espalda y core.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Requisitos:</strong> Core fuerte, espalda desarrollada
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-xl">Planche</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    El rey de los skills de empuje. Cuerpo horizontal sostenido con los brazos.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Requisitos:</strong> Hombros muy fuertes, años de práctica
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-xl">One Arm Pull-up</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Dominada con un solo brazo. La prueba definitiva de fuerza de tirón.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Requisitos:</strong> 20+ dominadas, trabajo específico
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Consejos Avanzados */}
          <section className="py-16 bg-primary/5">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-8">
                Claves para Progresar
              </h2>
              
              <div className="space-y-4">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-2">🎯 Paciencia y Constancia</h3>
                  <p className="text-muted-foreground">
                    Los skills avanzados requieren meses o años. Celebra pequeñas mejoras y mantén la motivación.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-2">🎯 Entrena Específico</h3>
                  <p className="text-muted-foreground">
                    Para dominar un skill, dedica tiempo específico a sus progresiones y ejercicios auxiliares.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-2">🎯 Recuperación Óptima</h3>
                  <p className="text-muted-foreground">
                    El entrenamiento de alta intensidad requiere recuperación adecuada. Escucha a tu cuerpo.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-2">🎯 Movilidad y Flexibilidad</h3>
                  <p className="text-muted-foreground">
                    Mantén un trabajo constante de movilidad para prevenir lesiones y mejorar rangos de movimiento.
                  </p>
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
