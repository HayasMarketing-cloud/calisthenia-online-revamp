import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalHero from "@/components/PersonalHero";
import Timeline from "@/components/Timeline";
import Philosophy from "@/components/Philosophy";
import Certifications from "@/components/Certifications";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

  const methodologySteps = [
    {
      number: 1,
      title: "Evaluación Inicial Personalizada",
      description: "Análisis completo de tu nivel actual, objetivos y limitaciones para crear un plan 100% adaptado a ti."
    },
    {
      number: 2,
      title: "Planes Progresivos Adaptados",
      description: "Programas diseñados específicamente para tu nivel y evolución, con ajustes constantes según tu progreso."
    },
    {
      number: 3,
      title: "Seguimiento Continuo",
      description: "Revisiones periódicas y ajustes según tu progreso para asegurar que sigas avanzando hacia tus metas."
    },
    {
      number: 4,
      title: "Apoyo Comunitario",
      description: "Acceso a una comunidad de estudiantes y soporte constante para mantenerte motivado y resolver dudas."
    }
  ];

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <PersonalHero />
        
        {/* Timeline Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-4">
              Mi <span className="text-primary">Trayectoria</span>
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Desde mis inicios hasta convertir la calistenia en mi pasión y profesión
            </p>
            <Timeline />
          </div>
        </section>
        
        {/* Philosophy Section */}
        <section className="py-20 bg-secondary/5">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-4">
              Mi <span className="text-primary">Filosofía</span>
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Los pilares que guían mi trabajo y mi compromiso con cada estudiante
            </p>
            <Philosophy />
          </div>
        </section>
        
        {/* Certifications Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-4">
              Certificaciones <span className="text-primary">Profesionales</span>
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Formación continua para ofrecerte el mejor servicio
            </p>
            <Certifications />
          </div>
        </section>
        
        {/* Methodology Section */}
        <section className="py-20 bg-secondary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-4">
              Mi <span className="text-primary">Metodología</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Así trabajo para ayudarte a alcanzar tus objetivos
            </p>
            
            <div className="space-y-6">
              {methodologySteps.map((step) => (
                <Card key={step.number} className="p-6 hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">
              ¿Listo para Comenzar tu Transformación?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Únete a más de 500 estudiantes que ya están transformando sus vidas
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
