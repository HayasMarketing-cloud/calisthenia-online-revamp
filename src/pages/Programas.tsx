import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import nicolasImage from "@/assets/nicolas-reyero.jpg";

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
              <Button size="lg" variant="outline" onClick={() => document.getElementById('programas-pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                Ver Programas
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
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-center mb-12">
              ¿Cómo son mis <span className="text-primary">programas de entrenamiento</span>?
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Imagen de Nico */}
              <div className="relative">
                <img 
                  src={nicolasImage} 
                  alt="Nico Reyero - Entrenador personal de calistenia"
                  className="rounded-2xl shadow-elegant w-full h-auto object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl shadow-lg">
                  <p className="font-bold text-2xl">+500</p>
                  <p className="text-sm">Alumnos transformados</p>
                </div>
              </div>
              
              {/* Contenido */}
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Como <strong>entrenador personal de calistenia</strong>, mi enfoque combina ciencia del entrenamiento, experiencia práctica y cercanía.
                </p>
                
                <p className="text-xl font-semibold text-gray-900">
                  No trabajo con plantillas. <span className="text-primary">Trabajo contigo</span>.
                </p>
                
                <div className="space-y-4 mt-8">
                  <h3 className="font-bold text-xl mb-4">🔹 ¿Qué incluye cada programa?</h3>
                  
                  {[
                    "Evaluación inicial online (estado físico, experiencia, objetivos)",
                    "Rutinas personalizadas por fases (4 semanas cada una)",
                    "Videos explicativos y correcciones por vídeo",
                    "Acceso directo a soporte (por mensaje o llamada)",
                    "Revisión semanal de progresos",
                    "Acceso opcional a comunidad privada"
                  ].map((item, idx) => (
                    <div className="flex items-start gap-3" key={idx}>
                      <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programas de Precios */}
      <section id="programas-pricing" className="py-20 bg-background">
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
            {/* Programa Básico */}
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

            {/* Programa Intermedio */}
            <Card className="border-2 border-primary shadow-elegant relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Más Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Avanzado</CardTitle>
                <CardDescription>Para dominar habilidades</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">99€<span className="text-base text-muted-foreground">/mes</span></div>
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

            {/* Programa Premium */}
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
      </section>

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
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-8 border-l-4 border-l-primary hover:shadow-elegant transition-all">
                <h3 className="font-bold text-xl mb-3">🌱 Principiantes</h3>
                <p className="text-gray-700">Que quieren empezar con buen pie y evitar errores comunes</p>
              </Card>
              
              <Card className="p-8 border-l-4 border-l-primary hover:shadow-elegant transition-all">
                <h3 className="font-bold text-xl mb-3">📈 Intermedios</h3>
                <p className="text-gray-700">Que sienten que ya no progresan y necesitan un enfoque estructurado</p>
              </Card>
              
              <Card className="p-8 border-l-4 border-l-primary hover:shadow-elegant transition-all">
                <h3 className="font-bold text-xl mb-3">🚀 Avanzados</h3>
                <p className="text-gray-700">Que quieren dominar skills como el muscle-up, planche o pino</p>
              </Card>
              
              <Card className="p-8 border-l-4 border-l-primary hover:shadow-elegant transition-all">
                <h3 className="font-bold text-xl mb-3">💯 Comprometidos</h3>
                <p className="text-gray-700">Que valoran tener un entrenador personal de calistenia que los motive y acompañe</p>
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

      {/* CTA Final con Formulario */}
      <section id="contacto-form" className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl lg:text-5xl mb-4">
                ¿Listo para llevar tu entrenamiento <span className="text-primary">a otro nivel</span>?
              </h2>
              <p className="text-xl text-gray-700">
                Rellena este breve formulario y hablemos sobre tus objetivos. 
                <br/>
                <strong className="text-primary">En Calisthenia.online no estás solo</strong>.
              </p>
            </div>
            
            <Card className="p-8 shadow-elegant">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Funcionalidad de envío pendiente de implementar'); }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Nombre</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">¿Cuál es tu nivel actual?</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white">
                    <option>Principiante (nunca he entrenado calistenia)</option>
                    <option>Intermedio (entreno hace meses/1-2 años)</option>
                    <option>Avanzado (dominio de skills básicos)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">¿Cuál es tu objetivo principal?</label>
                  <textarea 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    rows={4}
                    placeholder="Ej: Quiero ganar fuerza, mejorar mi físico, aprender muscle-up..."
                    required
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full bg-gradient-primary text-lg py-6">
                  Enviar Solicitud
                </Button>
                
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600 mb-4">O si lo prefieres:</p>
                  <Button type="button" variant="outline" size="lg" className="w-full">
                    📱 Escríbeme por WhatsApp
                  </Button>
                </div>
              </form>
            </Card>
            
            <p className="text-center text-gray-600 mt-8 text-sm">
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
