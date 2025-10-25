import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import entrenaParque from "@/assets/entrena-parque.jpg";
import { TreePine, CheckCircle } from "lucide-react";

const CalisteniaParque = () => {
  // Filtrar videos para entrenamiento en parque (con barras, paralelas, anillas)
  const videosParque = allVideos.filter(
    video => 
      video.material === "Barra dominadas" || 
      video.material === "Paralelas" ||
      video.material === "Anillas"
  ).sort((a, b) => b.vistas - a.vistas);

  return (
    <>
      <Helmet>
        <title>Calistenia en el Parque | Entrena al Aire Libre</title>
        <meta 
          name="description" 
          content="Aprovecha los parques de calistenia para entrenar al aire libre. Rutinas con barra, paralelas y equipamiento urbano para todos los niveles." 
        />
        <meta property="og:title" content="Calistenia en el Parque | Entrena al Aire Libre" />
        <meta property="og:description" content="Aprovecha los parques de calistenia para entrenar al aire libre con barra, paralelas y equipamiento urbano." />
        <link rel="canonical" href="https://calisthenia.online/calistenia-en-parque/" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${entrenaParque})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
            </div>
            
            <div className="relative z-10 container mx-auto px-4 text-center">
              <TreePine className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
                Calistenia en el Parque
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Aprovecha el aire libre y el equipamiento urbano para llevar tu entrenamiento al siguiente nivel.
              </p>
            </div>
          </section>

          {/* Beneficios */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Ventajas de Entrenar en el Parque
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Aire Libre</h3>
                  <p className="text-muted-foreground">
                    Entrena rodeado de naturaleza, mejorando tu salud mental y física
                  </p>
                </div>
                
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Equipamiento Completo</h3>
                  <p className="text-muted-foreground">
                    Barras, paralelas y estructuras para ejercicios avanzados
                  </p>
                </div>
                
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Comunidad</h3>
                  <p className="text-muted-foreground">
                    Conecta con otros atletas y mantente motivado
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Galería de Videos */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <VideoGallery 
                videos={videosParque.slice(0, 12)}
                title="Videos de Entrenamiento en Parque"
                showStats={true}
              />
            </div>
          </section>

          {/* Ejercicios con Barra */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Ejercicios Esenciales en Barra
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-xl mb-3">Dominadas (Pull-ups)</h3>
                  <p className="text-muted-foreground">
                    El ejercicio rey para desarrollar espalda, bíceps y agarre.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-xl mb-3">Muscle-ups</h3>
                  <p className="text-muted-foreground">
                    Combina fuerza de tirón y empuje en un movimiento explosivo.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-xl mb-3">Front Lever</h3>
                  <p className="text-muted-foreground">
                    Skill avanzado que requiere fuerza de core y espalda extrema.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-xl mb-3">Dips en Paralelas</h3>
                  <p className="text-muted-foreground">
                    Trabaja tríceps y pecho de forma intensa en paralelas.
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

export default CalisteniaParque;
