import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalHero from "@/components/PersonalHero";
import Certifications from "@/components/Certifications";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import VideoEmbed from "@/components/VideoEmbed";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";

const QuienSoy = () => {
  useEffect(() => {
    // SEO Meta tags
    document.title = "Quién Soy - Nicolás Reyero | Entrenador de Calistenia Online";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Conoce la historia de Nicolás Reyero, entrenador certificado con más de 5 años transformando vidas mediante calistenia. Descubre su metodología y filosofía de entrenamiento.'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Conoce la historia de Nicolás Reyero, entrenador certificado con más de 5 años transformando vidas mediante calistenia. Descubre su metodología y filosofía de entrenamiento.';
      document.head.appendChild(meta);
    }
    
    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 
      'entrenador calistenia, nicolás reyero, historia personal entrenador, certificación calistenia, calistenia online'
    );
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Quién Soy - Nicolás Reyero | Calistenia Online' },
      { property: 'og:description', content: 'Conoce la historia y metodología de Nicolás Reyero, entrenador profesional de calistenia' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:url', content: 'https://calisthenia.online/quien-soy/' }
    ];
    
    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://calisthenia.online/quien-soy/');
  }, []);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nicolás Reyero",
    "jobTitle": "Entrenador Personal de Calistenia",
    "description": "Entrenador certificado especializado en calistenia y entrenamiento funcional con más de 5 años de experiencia",
    "url": "https://calisthenia.online/quien-soy/",
    "knowsAbout": ["Calistenia", "Entrenamiento Funcional", "Street Workout", "Biomecánica"],
    "alumniOf": "Certificación en Entrenamiento Funcional",
    "award": "Especialista en Calistenia Avanzada"
  };


  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <Header />
      <CommunityStickyBanner />
      
      <main>
        {/* Hero Section */}
        <PersonalHero />
        
        {/* Historia Personal: Transformación */}
        <section className="py-20 bg-secondary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-6">
              Cómo la calistenia cambió mi cuerpo y la <span className="text-primary">confianza en mí mismo</span>
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Desde pequeño, siempre fui delgado e introvertido. Pasaba horas jugando videojuegos y compartiendo mis partidas online, pero con el tiempo empecé a sentir que me faltaba algo. No me gustaba mi físico y sentía que los demás no me tomaban en serio. Esa sensación de inseguridad me acompañaba en mi día a día.
              </p>
              
              <p className="text-lg leading-relaxed">
                Un día, decidí cambiar. Descubrí la calistenia, un entrenamiento basado en el propio peso corporal, y me enganchó desde el primer momento. No tenía experiencia ni un plan claro, pero cada sesión era un reto. Poco a poco, mi cuerpo empezó a cambiar. Gané fuerza, mejoré mi postura y, sobre todo, empecé a sentirme más seguro de mí mismo.
              </p>
              
              <p className="text-lg leading-relaxed">
                Con el tiempo, me di cuenta de que la Calistenia no solo me ayudaba físicamente, sino que también estaba transformando mi mentalidad. Además de entrenar, empecé a compartir mis entrenamientos y progresos en redes sociales. Al ver que mi historia inspiraba a otros, supe que quería dedicarme a esto.
              </p>
              
              <p className="text-lg leading-relaxed font-semibold text-primary">
                En el siguiente vídeo puedes ver mi transformación desde los 15 a los 19 años.
              </p>
            </div>
          </div>
        </section>
        
        {/* Video: Transformación Física */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <VideoEmbed 
              videoId="WLlCsJeKXhA" 
              title="Transformación física de Nicolás Reyero - Calistenia (15 a 19 años)"
            />
          </div>
        </section>
        
        {/* Certifications Section */}
        <section className="py-20 bg-secondary/5">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-4">
              Certificación <span className="text-primary">Profesional</span>
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Avalado por la federación oficial española
            </p>
            <Certifications />
          </div>
        </section>
        
        {/* Presentación del Proyecto */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-6">
              Te presento <span className="text-primary">Calistenia Online</span>
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Hoy, después de años de entrenamiento y aprendizaje, soy entrenador personal especializado en Calistenia o Street Workout, <span className="font-semibold">certificado por la Federación Española de Street Workout y Calistenia (FESWC)</span>.
              </p>
              
              <p className="text-lg leading-relaxed">
                También tengo mi faceta de creador de contenido. Actualmente administro mi canal de YouTube y mi cuenta de Instagram donde comparto rutinas y consejos con una comunidad que crece cada día, donde miles de personas se inspiran y entrenan para mejorar su estilo de vida.
              </p>
              
              <p className="text-lg leading-relaxed">
                Calisthenia Online no fue una idea repentina, sino el resultado de años de trabajo, aprendizaje y el deseo de ayudar a más personas a transformar su cuerpo y su mentalidad. Vi la necesidad de un espacio más estructurado para guiar a quienes quieren entrenar con eficacia y constancia, y así nació esta plataforma a inicios de 2025.
              </p>
              
              <p className="text-lg leading-relaxed">
                Quiero que <span className="font-semibold text-primary">Calisthenia Online</span> sea una plataforma educativa, diseñada para que cualquier persona, sin importar el nivel, pueda empezar a entrenar Calistenia de forma efectiva y alcanzar sus objetivos. Y también inspirar a otros entrenadores que como yo, un día decidieron comenzar su camino en esta disciplina.
              </p>
            </div>
          </div>
        </section>
        
        {/* Video: Presentación Calistenia Online */}
        <section className="py-16 bg-secondary/5">
          <div className="container mx-auto px-4">
            <VideoEmbed 
              videoId="xF5HbjQFXlk" 
              title="Presentación del proyecto Calistenia Online"
            />
          </div>
        </section>
        
        {/* Misión Personal */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-6">
              Tengo una <span className="text-primary">Misión</span>
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6 mb-12">
              <p className="text-lg leading-relaxed">
                Ahora que ya conoces mi historia quiero contarte cuál es mi misión.
              </p>
              
              <p className="text-lg leading-relaxed">
                Desde el primer día que empecé a entrenar, entendí que la Calistenia es mucho más que ejercicio. Es una herramienta para ganar confianza, superar barreras y descubrir hasta dónde puedes llegar.
              </p>
              
              <p className="text-lg leading-relaxed">
                Cuando empecé a compartir mi proceso en redes sociales, no imaginaba el impacto que podía tener. Ver cómo mis entrenamientos y consejos ayudaban a otros a mejorar su físico, su autoestima y su disciplina me hizo darme cuenta de algo: este camino no es solo mío, es de todos los que buscan superarse.
              </p>
              
              <p className="text-xl font-semibold text-gray-900 mt-8 mb-6">
                Por eso, mi compromiso contigo es claro:
              </p>
            </div>
            
            {/* Cards de Compromisos */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Contenido útil y accesible</h3>
                    <p className="text-gray-600">
                      Desde rutinas para principiantes hasta entrenamientos avanzados, quiero que cualquier persona, sin importar su nivel o recursos, pueda empezar en la calistenia con una guía clara.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Respondo y apoyo</h3>
                    <p className="text-gray-600">
                      Intento estar presente en los comentarios, responder dudas y motivar a quienes se esfuerzan cada día. No eres solo un seguidor, eres parte de una comunidad que se apoya y crece junta.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Innovación constante</h3>
                    <p className="text-gray-600">
                      No me conformo con lo que ya sé. Me sigo formando en nuevas metodologías, nutrición y entrenamiento para ofrecer contenido actualizado y efectivo. Si yo mejoro, tú mejoras conmigo.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Más que estética</h3>
                    <p className="text-gray-600">
                      No busco solo resultados físicos. Quiero que quienes siguen mis vídeos entiendan que la Calistenia transforma tu cuerpo, pero también tu mentalidad, tu disciplina y tu confianza en ti mismo.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-all md:col-span-2">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Calisthenia Online: Un espacio para todos</h3>
                    <p className="text-gray-600">
                      Mi plataforma no es solo un lugar con entrenamientos, es un espacio educativo donde cualquiera puede aprender, mejorar y conectar con su propio cuerpo.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Cierre motivacional */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center">
              <p className="text-lg leading-relaxed text-gray-800 mb-4">
                No soy un entrenador que solo sube vídeos. Estoy aquí para acompañarte en tu proceso, como alguien que también empezó desde cero y que sabe lo que es luchar por un cambio.
              </p>
              <p className="text-xl font-bold text-primary">
                Si entrenas con mis rutinas, si comentas mis vídeos o si simplemente te motivas con mi historia, ya formas parte de esta comunidad. Y mi compromiso es seguir aquí, ayudándote a superarte cada día. 🚀💪
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">
              ¿Listo para Formar Parte de Esta Comunidad?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Miles de personas ya están transformando sus vidas. Ahora es tu turno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => window.location.href = '/#entrenamientos'}
                className="min-h-[44px]"
              >
                Ver Programas de Entrenamiento
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary min-h-[44px]"
                onClick={() => window.location.href = 'mailto:info@calisthenia.online'}
              >
                Contactar Ahora
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuienSoy;
