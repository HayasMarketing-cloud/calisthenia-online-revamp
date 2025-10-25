import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { getVideosByZone } from "@/lib/videoUtils";
import entrenaCase from "@/assets/entrena-casa.jpg";
import { Home, CheckCircle } from "lucide-react";

const RutinaCasa = () => {
  // Filtrar videos para entrenamiento en casa (sin equipamiento o peso corporal)
  const videosEnCasa = allVideos.filter(
    video => 
      video.material === "Sin equipamiento" || 
      video.material === "Peso corporal"
  ).sort((a, b) => b.vistas - a.vistas);

  return (
    <>
      <Helmet>
        <title>Rutina de Calistenia en Casa | Entrena sin Equipamiento</title>
        <meta 
          name="description" 
          content="Rutinas completas de calistenia para entrenar en casa sin equipamiento. Ejercicios efectivos con tu propio peso corporal desde cualquier lugar." 
        />
        <meta property="og:title" content="Rutina de Calistenia en Casa | Entrena sin Equipamiento" />
        <meta property="og:description" content="Rutinas completas de calistenia para entrenar en casa sin equipamiento. Ejercicios efectivos con tu propio peso corporal." />
        <link rel="canonical" href="https://calisthenia.online/rutina-calistenia-en-casa/" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${entrenaCase})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
            </div>
            
            <div className="relative z-10 container mx-auto px-4 text-center">
              <Home className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
                Rutina de Calistenia en Casa
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Entrena desde cualquier lugar sin necesidad de equipamiento. Tu cuerpo es tu gimnasio.
              </p>
            </div>
          </section>

          {/* Beneficios */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                ¿Por Qué Entrenar en Casa?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Sin Equipamiento</h3>
                  <p className="text-muted-foreground">
                    Solo necesitas tu peso corporal para entrenar efectivamente
                  </p>
                </div>
                
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Flexibilidad Total</h3>
                  <p className="text-muted-foreground">
                    Entrena cuando quieras, sin horarios ni desplazamientos
                  </p>
                </div>
                
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Ahorro Económico</h3>
                  <p className="text-muted-foreground">
                    Sin cuotas de gimnasio ni gastos en equipamiento caro
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Galería de Videos */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <VideoGallery 
                videos={videosEnCasa.slice(0, 12)}
                title="Videos de Entrenamiento en Casa"
                showStats={true}
              />
            </div>
          </section>

          {/* Ejercicios Recomendados */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Ejercicios Básicos para Casa
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-xl mb-3">Push-ups (Flexiones)</h3>
                  <p className="text-muted-foreground">
                    Trabaja pecho, hombros y tríceps. Perfectas para empezar.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-xl mb-3">Squats (Sentadillas)</h3>
                  <p className="text-muted-foreground">
                    Fortalece piernas y glúteos con el ejercicio rey para tren inferior.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-xl mb-3">Planks (Planchas)</h3>
                  <p className="text-muted-foreground">
                    Desarrolla un core fuerte y estable desde cero.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-xl mb-3">Lunges (Zancadas)</h3>
                  <p className="text-muted-foreground">
                    Mejora equilibrio y fuerza unilateral de piernas.
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

export default RutinaCasa;
