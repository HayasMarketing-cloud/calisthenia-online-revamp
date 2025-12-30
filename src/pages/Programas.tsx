import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Target, Search, CalendarDays, Video, MessageCircle, BarChart3, Utensils } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";

const Programas = () => {
  useEffect(() => {
    document.title = "Programas de Entrenamiento | Entrenador Personal de Calistenia - Nico Reyero";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Entrena con Nico Reyero, entrenador personal de calistenia certificado. Programas personalizados online y presencial en Madrid. Transforma tu cuerpo sin equipos.'
      );
    }
  }, []);

  // Load Go High Level form embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.calisthenia.online/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <CommunityStickyBanner />
      
      {/* Hero Principal */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="mb-4 bg-primary text-white hover:bg-accent">
              Entrenador Certificado FESWC
            </Badge>
            
            <h1 className="font-display font-bold text-4xl lg:text-6xl leading-tight">
              Tu <span className="text-primary">entrenador personal de calistenia</span>: Nico
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              ¿Buscas un <strong>entrenador de calistenia</strong> que entienda tu nivel, tus objetivos y tu contexto?
              <br/>
              Soy <strong>Nico Reyero</strong>, y llevo años ayudando a personas como tú a transformar su cuerpo y su mentalidad a través del entrenamiento con el peso corporal.
            </p>
            
            <p className="text-lg text-gray-600">
              Ya sea que entrenes en casa, en el parque o en el gimnasio, <strong>como tu entrenador personal de calistenia</strong> voy a diseñar un plan adaptado a ti, con seguimiento real y acompañamiento constante.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="bg-gradient-primary" onClick={() => document.getElementById('contacto-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Hablemos de Tus Objetivos
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('contacto-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Contactar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué entrenar con un entrenador especializado */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-4">
              Entrena con un <span className="text-primary">entrenador de calistenia</span> especializado
            </h2>
            
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              La calistenia no es solo hacer flexiones o dominadas. Es una metodología que, bien estructurada, puede llevarte a lograr:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">💪</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Más fuerza funcional</h3>
                    <p className="text-gray-600">Desarrolla fuerza real que usarás en tu día a día</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">🧘</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Mejor postura y movilidad</h3>
                    <p className="text-gray-600">Corrige desequilibrios y gana flexibilidad</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">🏆</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Físico atlético y equilibrado</h3>
                    <p className="text-gray-600">Sin depender de máquinas, solo con tu cuerpo</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">🧠</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Mentalidad disciplinada</h3>
                    <p className="text-gray-600">Mayor control corporal y mental</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <p className="text-center text-lg text-gray-700 mt-8 font-semibold">
              Y todo <span className="text-primary">sin depender de máquinas</span>. Solo con tu cuerpo, progresión y constancia.
            </p>
          </div>
        </div>
      </section>

      {/* Cómo son mis programas */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Cabecera */}
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-6">
              ¿Cómo son mis <span className="text-primary">programas de entrenamiento</span>?
            </h2>
            
            <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
              Soy Nico Reyero, entrenador personal especializado en calistenia. 
              Diseño cada plan combinando ciencia del entrenamiento, experiencia real 
              y una comunicación cercana y constante.
            </p>
            
            <div className="flex justify-center mb-10">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-sm md:text-base px-4 py-2.5 font-medium">
                <Target className="w-4 h-4 mr-2" />
                No uso plantillas. Trabajo contigo, adaptando cada paso a tus objetivos.
              </Badge>
            </div>
            
            {/* Subtítulo */}
            <h3 className="text-xl font-bold text-center mb-8 text-foreground">
              ¿Qué incluye cada programa?
            </h3>
            
            {/* Grid de tarjetas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Search,
                  title: "Evaluación inicial online",
                  description: "Analizo tu nivel actual, experiencia previa y metas para definir una base sólida desde la que empezar."
                },
                {
                  icon: CalendarDays,
                  title: "Rutinas personalizadas (nueva cada mes)",
                  description: "Planes mensuales ajustados a tu progreso, para entrenar en casa, parque o gimnasio, con el enfoque que necesitas en cada etapa."
                },
                {
                  icon: Video,
                  title: "Videos explicativos y correcciones",
                  description: "Te explico cómo ejecutar cada ejercicio, y si lo necesitas, corrijo tu técnica a través de vídeo."
                },
                {
                  icon: MessageCircle,
                  title: "Soporte directo por WhatsApp",
                  description: "Estamos en contacto constante. Puedes escribirme para resolver dudas, ajustar el plan o darte ese empujón extra."
                },
                {
                  icon: BarChart3,
                  title: "Seguimiento quincenal de avances",
                  description: "Cada dos semanas revisamos tus progresos y realizamos ajustes para mantenerte siempre avanzando."
                },
                {
                  icon: Utensils,
                  title: "Plan de nutrición personalizado",
                  description: "Incluyo una guía nutricional adaptada a tus objetivos (ganar masa, definir, rendir mejor), alineada con tu entrenamiento."
                }
              ].map((item, idx) => (
                <Card key={idx} className="p-6 bg-background border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programas de Precios - TEMPORALMENTE OCULTO */}
      {/* <section id="programas-pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display font-bold text-3xl lg:text-5xl mb-4">
              Elige Tu <span className="text-primary">Programa</span>
            </h2>
            <p className="text-lg text-gray-600">
              Planes diseñados para cada etapa de tu viaje en la calistenia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Iniciación</CardTitle>
                <CardDescription>Para empezar desde cero</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">49€<span className="text-base text-muted-foreground">/mes</span></div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Rutinas adaptadas a principiantes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Videos explicativos de cada ejercicio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Plan de progresión de 12 semanas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Soporte por email</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-primary" onClick={() => document.getElementById('contacto-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Empezar Ahora
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary shadow-elegant relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Más Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Avanzado</CardTitle>
                <CardDescription>Para dominar habilidades</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">99€<span className="text-base text-muted-forecaround">/mes</span></div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Todo lo del plan Iniciación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Entrenamientos para habilidades avanzadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Sesiones de coaching 1:1 mensuales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Acceso a comunidad privada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Plan nutricional personalizado</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-primary" onClick={() => document.getElementById('contacto-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Empezar Ahora
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Elite</CardTitle>
                <CardDescription>Transformación completa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">199€<span className="text-base text-muted-foreground">/mes</span></div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Todo lo del plan Avanzado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Coaching personalizado semanal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Análisis de progreso con vídeos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Soporte prioritario 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Acceso vitalicio a contenido exclusivo</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-primary" onClick={() => document.getElementById('contacto-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Empezar Ahora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Dónde puedes entrenar conmigo */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-12">
              ¿Dónde puedes <span className="text-primary">entrenar conmigo</span>?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-all hover:scale-105">
                <div className="text-5xl mb-4">🏡</div>
                <h3 className="font-bold text-lg mb-2">En Casa</h3>
                <p className="text-gray-600 text-sm">Mínima o ninguna herramienta necesaria</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-all hover:scale-105">
                <div className="text-5xl mb-4">🌳</div>
                <h3 className="font-bold text-lg mb-2">En el Parque</h3>
                <p className="text-gray-600 text-sm">Con barras o estructuras básicas</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-all hover:scale-105">
                <div className="text-5xl mb-4">💻</div>
                <h3 className="font-bold text-lg mb-2">Online 100%</h3>
                <p className="text-gray-600 text-sm">Personalizado desde donde estés</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-all hover:scale-105">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="font-bold text-lg mb-2">Madrid</h3>
                <p className="text-gray-600 text-sm">Sesiones presenciales puntuales</p>
              </Card>
            </div>
            
            <p className="text-center text-gray-700 mt-8 text-lg">
              Si estás en la capital, soy también <strong className="text-primary">entrenador calistenia Madrid</strong>, y ofrezco entrenamientos puntuales presenciales.
            </p>
          </div>
        </div>
      </section>

      {/* Para quién es esto */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-4">
              ¿Para quién es <span className="text-primary">esto</span>?
            </h2>
            
            <p className="text-lg text-gray-600 text-center mb-12">
              Mis programas están diseñados para personas que buscan transformación real
            </p>
            
            {/* Comprometidos - Card Destacada */}
            <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20 shadow-md hover:shadow-elegant transition-all">
              <div className="p-8 text-center">
                <h3 className="font-bold text-2xl mb-3">💯 Comprometidos</h3>
                <p className="text-gray-700 text-lg mb-4">
                  Que valoran tener un entrenador personal de calistenia que los motive y acompañe
                </p>
                <Badge variant="default" className="mt-2">Transversal a todos los niveles</Badge>
              </div>
            </Card>
            
            {/* Principiantes e Intermedios */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-8 border-l-4 border-l-primary hover:shadow-elegant transition-all">
                <h3 className="font-bold text-xl mb-3">🌱 Principiantes</h3>
                <p className="text-gray-700">
                  Que quieren empezar con buen pie y evitar errores comunes
                </p>
              </Card>
              
              <Card className="p-8 border-l-4 border-l-primary hover:shadow-elegant transition-all">
                <h3 className="font-bold text-xl mb-3">📈 Intermedios</h3>
                <p className="text-gray-700">
                  Que sienten que ya no progresan y necesitan un enfoque estructurado
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Mejorada */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-8 text-center">
              Preguntas <span className="text-primary">Frecuentes</span>
            </h2>
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>¿Puedo cambiar de plan en cualquier momento?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    ¡Por supuesto! Puedes actualizar tu plan cuando lo necesites. Los cambios se aplicarán en tu próximo ciclo de facturación. Mi objetivo es que el programa se adapte a tu evolución.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>¿Qué necesito para empezar?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Solo necesitas motivación y un espacio para entrenar. La mayoría de ejercicios se pueden hacer sin equipo o con elementos básicos como una barra de dominadas. Te guiaré paso a paso desde el primer día.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>¿Trabajas online o presencial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Principalmente trabajo como <strong className="text-primary">entrenador calistenia online</strong>, lo que me permite ayudar a personas de cualquier parte del mundo. Si estás en Madrid, también ofrezco sesiones presenciales puntuales para corrección de técnica.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>¿Hay garantía de devolución?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Sí, ofrezco garantía de devolución de 14 días si no estás satisfecho con el programa. Confío en mi metodología, pero entiendo que cada persona es diferente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Dual System with Go High Level */}
      <section id="contacto-form" className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl lg:text-5xl mb-4">
                ¿Listo para llevar tu entrenamiento <span className="text-primary">a otro nivel</span>?
              </h2>
              <p className="text-xl text-gray-700">
                Elige cómo prefieres dar el siguiente paso.
              </p>
            </div>

            <Tabs defaultValue="form" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 p-1 rounded-lg">
                <TabsTrigger 
                  value="form"
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  📋 Cuéntame tu Situación
                </TabsTrigger>
                <TabsTrigger 
                  value="booking"
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                >
                  📅 Agenda una Llamada
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form">
                <Card className="shadow-elegant hover:shadow-xl transition-shadow">
                  <CardContent className="p-4">
                    <iframe
                      src="https://link.calisthenia.online/widget/form/JYFtKJd7tgX86dXtbRhS"
                      style={{ width: '100%', height: '600px', border: 'none', borderRadius: '8px' }}
                      id="inline-JYFtKJd7tgX86dXtbRhS"
                      title="Formulario de contacto"
                      scrolling="no"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="booking">
                <Card className="shadow-elegant hover:shadow-xl transition-shadow">
                  <CardContent className="p-4">
                    <iframe
                      src="https://link.calisthenia.online/widget/booking/n86ogRPB92XX8JZK01H0"
                      style={{ width: '100%', height: '700px', border: 'none', borderRadius: '8px' }}
                      id="n86ogRPB92XX8JZK01H0_booking"
                      title="Agendar reunión"
                      scrolling="no"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center pt-8">
              <p className="text-sm text-gray-600 mb-4">O si lo prefieres:</p>
              <Button variant="outline" size="lg" className="w-full max-w-md mx-auto" asChild>
                <a href="https://wa.me/message/D3ZNQKWSUDUVJ1" target="_blank" rel="noopener noreferrer">
                  📱 Escríbeme por WhatsApp
                </a>
              </Button>
            </div>

            <p className="text-center text-gray-600 mt-8">
              <strong>Entrena con propósito. Entrena con guía.</strong>
              <br/>
              Entrena con un <strong className="text-primary">entrenador de calistenia</strong> que entienda tu proceso.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programas;
