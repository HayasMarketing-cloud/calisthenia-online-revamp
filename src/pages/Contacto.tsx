import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import { Mail, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Contacto = () => {
  useEffect(() => {
    // Cargar el script del formulario de Go High Level
    const script = document.createElement('script');
    script.src = 'https://link.calisthenia.online/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpiar el script cuando el componente se desmonte
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contacto | Calistenia Online - Nicolás Reyero</title>
        <meta 
          name="description" 
          content="¿Tienes dudas sobre los programas de entrenamiento? Ponte en contacto con Nicolás Reyero. Respondo personalmente todas tus consultas sobre calistenia y entrenamiento funcional." 
        />
        <meta name="keywords" content="contacto calistenia, consulta entrenamiento, asesoría calistenia, nicolás reyero contacto" />
        <link rel="canonical" href="https://calisthenia.online/contacto" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contacto | Calistenia Online - Nicolás Reyero" />
        <meta property="og:description" content="Ponte en contacto conmigo para resolver tus dudas sobre programas de entrenamiento de calistenia." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://calisthenia.online/contacto" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contacto | Calistenia Online" />
        <meta name="twitter:description" content="Ponte en contacto para resolver tus dudas sobre entrenamiento de calistenia." />
      </Helmet>

      <Header />
      <CommunityStickyBanner />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
              Hablemos de Tus{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Objetivos
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              ¿Tienes dudas sobre qué programa es mejor para ti? ¿Quieres saber cómo empezar tu transformación física? 
              Completa el formulario y te responderé personalmente.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Email */}
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  Email
                </h3>
                <a 
                  href="mailto:info@calisthenia.online" 
                  className="text-primary hover:text-accent transition-colors"
                >
                  info@calisthenia.online
                </a>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  Tiempo de Respuesta
                </h3>
                <p className="text-gray-600">
                  24-48 horas hábiles
                </p>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  Soporte Personalizado
                </h3>
                <p className="text-gray-600">
                  Respuestas detalladas a tus dudas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-gray-900">
                Envíame tu Consulta
              </h2>
              <p className="text-gray-700">
                Completa el formulario y me pondré en contacto contigo lo antes posible
              </p>
            </div>

            {/* Formulario Go High Level */}
            <Card className="border-2 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-white rounded-lg" style={{ minHeight: '500px' }}>
                  <iframe
                    src="https://link.calisthenia.online/widget/form/JYFtKJd7tgX86dXtbRhS"
                    style={{ width: '100%', height: '500px', border: 'none', borderRadius: '3px' }}
                    id="inline-JYFtKJd7tgX86dXtbRhS" 
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Formulario lead español"
                    data-height="482"
                    data-layout-iframe-id="inline-JYFtKJd7tgX86dXtbRhS"
                    data-form-id="JYFtKJd7tgX86dXtbRhS"
                    title="Formulario de contacto"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
