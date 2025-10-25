import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoGallery from "@/components/VideoGallery";
import { allVideos } from "@/data/videoLibrary";
import { User, CheckCircle, TrendingUp } from "lucide-react";

const CalisteniaPrincipiantes = () => {
  // Filtrar videos para principiantes
  const videosPrincipiantes = allVideos
    .filter(video => video.nivel === "Principiante")
    .sort((a, b) => b.vistas - a.vistas);

  return (
    <>
      <Helmet>
        <title>Calistenia para Principiantes | Empieza desde Cero</title>
        <meta 
          name="description" 
          content="Guía completa de calistenia para principiantes. Aprende los ejercicios básicos, progresiones y rutinas para empezar desde cero tu entrenamiento." 
        />
        <meta property="og:title" content="Calistenia para Principiantes | Empieza desde Cero" />
        <meta property="og:description" content="Guía completa de calistenia para principiantes con ejercicios básicos y progresiones desde cero." />
        <link rel="canonical" href="https://calisthenia.online/calistenia-principiantes/" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="py-24 bg-gradient-to-b from-primary/10 to-background">
            <div className="container mx-auto px-4 text-center">
              <User className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
                Calistenia para Principiantes
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Empieza tu viaje en la calistenia desde cero. Aprende las bases y progresa de forma segura.
              </p>
            </div>
          </section>

          {/* Por Qué Empezar */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Tu Primer Paso en la Calistenia
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Sin Experiencia Previa</h3>
                  <p className="text-muted-foreground">
                    No necesitas conocimientos previos, empezamos desde lo más básico
                  </p>
                </div>
                
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Progresión Segura</h3>
                  <p className="text-muted-foreground">
                    Aprende la técnica correcta para evitar lesiones y maximizar resultados
                  </p>
                </div>
                
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Resultados Visibles</h3>
                  <p className="text-muted-foreground">
                    Verás mejoras en fuerza y físico desde las primeras semanas
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Galería de Videos */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <VideoGallery 
                videos={videosPrincipiantes.slice(0, 12)}
                title="Videos para Principiantes"
                showStats={true}
              />
            </div>
          </section>

          {/* Progresiones Básicas */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Ejercicios Básicos para Empezar
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-card p-6 rounded-lg border">
                  <TrendingUp className="w-8 h-8 mb-3 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Flexiones Inclinadas</h3>
                  <p className="text-muted-foreground mb-3">
                    Comienza con flexiones contra la pared o en superficie elevada.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Progresión:</strong> Pared → Mesa → Suelo
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <TrendingUp className="w-8 h-8 mb-3 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Sentadillas Asistidas</h3>
                  <p className="text-muted-foreground mb-3">
                    Aprende el patrón de movimiento con soporte si es necesario.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Progresión:</strong> Con apoyo → Libre → Profundas
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <TrendingUp className="w-8 h-8 mb-3 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Planchas</h3>
                  <p className="text-muted-foreground mb-3">
                    Desarrolla core desde posiciones estáticas controladas.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Progresión:</strong> Rodillas → Completa → Lateral
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <TrendingUp className="w-8 h-8 mb-3 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">Dominadas Asistidas</h3>
                  <p className="text-muted-foreground mb-3">
                    Usa banda elástica o salta para trabajar la fase excéntrica.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Progresión:</strong> Banda → Negativas → Completa
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Consejos */}
          <section className="py-16 bg-primary/5">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-8">
                Consejos para Empezar
              </h2>
              
              <div className="space-y-4">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-2">✅ Sé Constante</h3>
                  <p className="text-muted-foreground">
                    Entrena 3-4 veces por semana. La regularidad es más importante que la intensidad al principio.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-2">✅ Técnica Primero</h3>
                  <p className="text-muted-foreground">
                    Prioriza la forma correcta sobre el número de repeticiones. Evitarás lesiones y progresarás más rápido.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-2">✅ Descansa Bien</h3>
                  <p className="text-muted-foreground">
                    El músculo crece durante el descanso. Duerme 7-8 horas y deja días de recuperación.
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

export default CalisteniaPrincipiantes;
