import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoGallery from "@/components/VideoGallery";
import VideoWithStructure from "@/components/VideoWithStructure";
import QuickJumpBanner from "@/components/QuickJumpBanner";
import RoutineBreadcrumbs from "@/components/routine/RoutineBreadcrumbs";
import CommunityCTA from "@/components/CommunityCTA";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { allVideos } from "@/data/videoLibrary";
import entrenaCase from "@/assets/entrena-casa.jpg";
import { Home, CheckCircle, Target, Shield, Zap, Heart, Clock, TrendingUp, AlertCircle, Calendar, Activity, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import StructuredData from "@/components/seo/StructuredData";
import { useRoutineSchemas } from "@/hooks/useRoutineSchemas";
import { generateFAQSchema } from "@/lib/schemas";

export const faqs = [
  {
    question: "¿Cómo empezar a hacer calistenia en casa siendo principiante?",
    answer: "Para empezar calistenia en casa siendo principiante, dedica 3 días por semana a una rutina full body de 20-30 minutos centrada en cinco movimientos básicos sin material: sentadillas, flexiones (puedes apoyar las rodillas), zancadas, planchas y bird-dog. Empieza con 3 series de 8-12 repeticiones, prioriza la técnica antes que el volumen y descansa 48 horas entre sesiones para permitir la recuperación muscular."
  },
  {
    question: "¿Cuánto espacio necesito para una rutina de calistenia en casa?",
    answer: "Necesitas aproximadamente 2x2 metros de espacio libre para entrenar calistenia en casa sin restricciones. Esa superficie basta para hacer flexiones, sentadillas, planchas, zancadas y mountain climbers con seguridad. Asegúrate de que el suelo sea estable, esté bien ventilado y no haya muebles cerca que limiten los movimientos amplios."
  },
  {
    question: "¿Se puede ganar músculo haciendo calistenia en casa sin pesas?",
    answer: "Sí, la calistenia en casa permite ganar músculo sin pesas aplicando el principio de sobrecarga progresiva: aumenta repeticiones, reduce los descansos, controla el tempo (3 segundos bajando, 1 de pausa, 3 subiendo) y avanza hacia variaciones más exigentes (flexiones diamante, archer, pistol squat). Combinado con un superávit calórico de proteína suficiente (1,6-2 g/kg), el peso corporal es estímulo más que de sobra para hipertrofia."
  },
  {
    question: "¿Cuántos días a la semana hay que entrenar calistenia en casa?",
    answer: "La frecuencia ideal de entrenamiento de calistenia en casa depende del nivel: principiantes 3 días por semana en formato full body, intermedios 4-5 días con división tren superior/inferior, y avanzados 5-6 días con rutinas especializadas (empuje, tracción, piernas). Reserva siempre 1-2 días de descanso completo o activo (caminar, movilidad) para optimizar la recuperación y evitar el sobreentrenamiento."
  },
  {
    question: "¿Cuánto tiempo tarda la calistenia en casa en dar resultados?",
    answer: "Con calistenia en casa empezarás a notar mejoras de fuerza y energía en 2-3 semanas, y los cambios físicos visibles (más definición, mejor postura, hipertrofia inicial) aparecen entre la semana 4 y la 8 entrenando de forma constante 3-5 días por semana. Para resultados sostenidos a largo plazo la clave es la consistencia, una progresión gradual y una alimentación adecuada a tu objetivo."
  },
  {
    question: "¿Qué material necesito para entrenar calistenia en casa?",
    answer: "La calistenia en casa se puede practicar sin ningún material: solo necesitas tu peso corporal y un espacio de 2x2 metros. De forma opcional, una esterilla aporta comodidad en ejercicios de suelo, una silla resistente sirve para fondos de tríceps y elevaciones, y una toalla en la puerta permite añadir trabajo de tracción. Una barra de dominadas de marco es la única inversión que multiplica las opciones de ejercicios."
  },
  {
    question: "¿Es mejor entrenar calistenia en casa por la mañana o por la noche?",
    answer: "El mejor momento para entrenar calistenia en casa es aquel en el que puedas ser más constante. Entrenar por la mañana activa el metabolismo y mejora el foco para el día; hacerlo por la tarde-noche aprovecha que la temperatura corporal y la fuerza están en su pico fisiológico, lo que reduce el riesgo de lesión. Elige la franja que mejor encaje con tu rutina y mantenla en el tiempo."
  },
  {
    question: "¿Sirve la calistenia en casa para mujeres y para perder peso?",
    answer: "Sí, la calistenia en casa es ideal tanto para mujeres como para cualquier persona que quiera perder grasa y tonificar. Al combinar ejercicios de fuerza con peso corporal y circuitos de alta intensidad (HIIT con sentadillas, mountain climbers, burpees) elevas el gasto calórico, mantienes masa muscular y mejoras la composición corporal. Tres sesiones semanales de 30 minutos junto a un déficit calórico moderado son suficientes para ver resultados."
  }
];

const RutinaCasa = () => {
  const schemas = useRoutineSchemas({
    routineName: "Calistenia en Casa: Rutina Completa sin Equipamiento",
    routineDescription: "Rutina completa de calistenia en casa sin equipamiento. Ejercicios, planificación y técnicas para entrenar desde tu hogar.",
    videoId: "2PVk2wUY04k",
    videoTitle: "Rutina Calistenia en Casa - Entrenamiento Completo",
    videoDuration: "PT15M",
    uploadDate: "2024-01-15",
    totalTime: "PT40M",
    breadcrumbs: [
      { name: "Inicio", url: "https://calisthenia.online/" },
      { name: "Rutinas", url: "https://calisthenia.online/programas/" },
      { name: "Calistenia en Casa", url: "https://calisthenia.online/rutina-calistenia-en-casa/" }
    ],
    rating: {
      itemName: "Rutina Calistenia en Casa",
      ratingValue: 4.8,
      reviewCount: 389,
      bestRating: 5,
      worstRating: 1
    },
    steps: [
      { name: "Calentamiento", text: "Realiza 5-10 minutos de movilidad articular y activación muscular para preparar el cuerpo." },
      { name: "Ejercicios de empuje", text: "Ejecuta flexiones clásicas, diamante y pike push-ups para trabajar pecho, hombros y tríceps." },
      { name: "Ejercicios de tirón", text: "Realiza remos invertidos con mesa o toalla en puerta y curl de bíceps isométrico." },
      { name: "Tren inferior", text: "Incluye sentadillas, zancadas y puentes de glúteo para trabajar piernas y glúteos." },
      { name: "Core y enfriamiento", text: "Finaliza con planchas, mountain climbers y estiramientos completos durante 5-10 minutos." }
    ]
  });

  // Filtrar videos para entrenamiento en casa (excluir video principal)
  const mainVideoId = "2PVk2wUY04k";
  const videosEnCasa = allVideos
    .filter(
      video => 
        (video.material === "Sin equipamiento" || video.material === "Peso corporal") &&
        video.id !== mainVideoId
    )
    .sort((a, b) => b.vistas - a.vistas)
    .slice(0, 9);

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Lugar", href: "/programas/" },
    { label: "Calistenia en Casa", href: "/rutina-calistenia-en-casa/" }
  ];

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <Helmet>
        <title>Calistenia en Casa: Rutina Completa sin Equipamiento | Guía 2025</title>
        <meta 
          name="description" 
          content="Rutina completa de calistenia en casa sin equipamiento. Ejercicios, planificación y técnicas para entrenar desde tu hogar. Video guiado incluido." 
        />
        <meta name="keywords" content="calistenia para principiantes en casa, rutina calistenia en casa, entrenamiento funcional en casa, ejercicios peso corporal" />
        <meta property="og:title" content="Calistenia en Casa: Rutina Completa sin Equipamiento" />
        <meta property="og:description" content="Rutina completa de calistenia en casa sin equipamiento. Ejercicios efectivos con video guiado." />
        <link rel="canonical" href="https://calisthenia.online/rutina-calistenia-en-casa/" />
      </Helmet>

      <StructuredData data={[...schemas.allSchemas, faqSchema]} />

      <div className="min-h-screen flex flex-col">
        <Header />
        <CommunityStickyBanner />
        
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

          {/* Breadcrumbs */}
          <div className="container mx-auto px-4 pt-8">
            <RoutineBreadcrumbs items={breadcrumbItems} />
          </div>

          {/* Quick Jump Banner */}
          <div className="container mx-auto px-4 py-4">
            <QuickJumpBanner
              text="¿Quieres empezar a entrenar ya?"
              linkText="Ver Rutina Completa"
              href="#video-rutina"
              icon="🏠"
              variant="primary"
            />
          </div>

          {/* Por Qué Entrenar en Casa */}
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

          {/* ¿Qué es la Calistenia en Casa? */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                ¿Qué es la Calistenia para Principiantes en Casa?
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <Card className="border-primary/20 hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Target className="w-8 h-8 text-primary" />
                      Entrenamiento con Peso Corporal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                      La <strong>calistenia en casa</strong> es un método de entrenamiento que utiliza el propio peso del cuerpo como herramienta principal. 
                      Movimientos como flexiones, sentadillas y dominadas te permiten trabajar diversos grupos musculares de manera efectiva sin necesidad de equipos adicionales.
                    </p>
                    <p>
                      La eficacia de este entrenamiento radica en su capacidad para activar la musculatura y mejorar la funcionalidad del cuerpo. 
                      Puedes entrenar en cualquier espacio de tu hogar, desde tu habitación hasta el salón, solo necesitas aproximadamente 2 metros cuadrados.
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg mt-4">
                      <p className="text-sm font-semibold text-foreground mb-2">💡 Diferencia vs Gimnasio Tradicional:</p>
                      <p className="text-sm">
                        Mientras el gimnasio requiere máquinas y pesas, la calistenia convierte tu cuerpo en tu propia resistencia. 
                        Esto no solo ahorra dinero, sino que también desarrolla fuerza funcional más aplicable a movimientos del día a día.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Beneficios de la Calistenia en Casa */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Beneficios de la Rutina Calistenia en Casa
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <Card className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <Dumbbell className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>Desarrollo de Fuerza Funcional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Al trabajar con tu propio peso, desarrollas músculos de manera equilibrada y aumentas la fuerza aplicable a situaciones reales.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <Heart className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>Mejora Cardiovascular</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Los movimientos dinámicos elevan tu ritmo cardíaco, mejorando la salud cardiovascular y la capacidad pulmonar.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <Activity className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>Coordinación y Equilibrio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ejercicios que requieren balance promueven la conexión mente-cuerpo y mejoran tu estabilidad general.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <Shield className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>Prevención de Lesiones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Fortaleces músculos, tendones y ligamentos, creando una base sólida que reduce el riesgo de lesiones.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <Clock className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>Entrenamientos Eficientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Sesiones de 20-45 minutos son suficientes para obtener resultados, perfecto para agendas ocupadas.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <TrendingUp className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>Adaptable a Todos los Niveles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Desde principiantes hasta avanzados, cada ejercicio se puede modificar según tus capacidades.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Video Principal Estructurado */}
          <div id="video-rutina" className="relative -top-20"></div>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <VideoWithStructure
                videoId={mainVideoId}
                videoTitle="🎬 Entrena Conmigo: Rutina Completa en Casa"
                videoDescription="Sigue esta rutina guiada sin necesidad de material. Perfecta para empezar en calistenia desde tu hogar."
                nivel="Principiante"
                zonaMuscular="Full Body"
                material="Peso corporal"
                formato={{
                  calentamiento: {
                    ejercicios: 5,
                    intensidad: "Baja intensidad"
                  },
                  partePrincipal: {
                    series: 3,
                    descripcion: "Cada ejercicio con descanso controlado"
                  },
                  tempo: {
                    activo: "40 segundos",
                    descanso: "20 segundos"
                  }
                }}
                estimulos={[
                  "⚡ Fuerza funcional",
                  "💪 Resistencia muscular",
                  "🔥 Quema de calorías"
                ]}
                insights={[
                  "Solo necesitas 2 metros cuadrados de espacio",
                  "Ejercicios progresivos para todos los niveles",
                  "30 minutos de entrenamiento efectivo",
                  "Incluye calentamiento y estiramiento final"
                ]}
                detalles="Esta rutina trabaja todos los grupos musculares desde casa sin equipamiento. Ideal para quienes empiezan o buscan entrenar de forma efectiva en espacios reducidos."
              />
            </div>
          </section>

          {/* Preparación para el Entrenamiento Funcional en Casa */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Preparación para tu Entrenamiento Funcional en Casa
              </h2>
              
              <div className="max-w-5xl mx-auto space-y-8">
                <Card className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Zap className="w-8 h-8 text-primary" />
                      Calentamiento Obligatorio (5-10 minutos)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Un calentamiento adecuado incrementa la circulación sanguínea y eleva la temperatura muscular, reduciendo el riesgo de lesiones.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Movilidad Articular</h4>
                        <p className="text-sm text-muted-foreground">
                          Rotaciones de brazos, muñecas, caderas y tobillos para soltar las articulaciones
                        </p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Estiramientos Dinámicos</h4>
                        <p className="text-sm text-muted-foreground">
                          Lunges, giros de torso y elevaciones de rodillas
                        </p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Activación Cardiovascular</h4>
                        <p className="text-sm text-muted-foreground">
                          Marcha en el lugar o trote suave durante 3-5 minutos
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Home className="w-6 h-6 text-primary" />
                        Elección del Espacio
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        Necesitas un mínimo de <strong>2x2 metros</strong> de espacio libre de obstáculos para permitir movimientos amplios y seguros.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Superficie plana y estable</li>
                        <li>Buena ventilación</li>
                        <li>Iluminación adecuada</li>
                        <li>Sin muebles cerca</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-primary" />
                        Equipo Básico Opcional
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        Aunque no son necesarios, estos elementos pueden mejorar tu comodidad:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        <li><strong>Esterilla</strong>: comodidad en ejercicios de suelo</li>
                        <li><strong>Silla o banco</strong>: para fondos de tríceps</li>
                        <li><strong>Toalla</strong>: para higiene y soporte</li>
                        <li><strong>Botella de agua</strong>: hidratación constante</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Ejercicios Básicos de Calistenia en Casa */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Ejercicios Básicos de Calistenia en Casa
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="sentadillas" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🦵</span>
                        <span className="font-semibold text-lg">Sentadillas (Squats)</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">✅ Técnica Correcta:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>Pies a la altura de los hombros</li>
                          <li>Baja como si te sentaras en una silla</li>
                          <li>Rodillas alineadas con los pies (no las sobrepases)</li>
                          <li>Espalda recta durante todo el movimiento</li>
                          <li>Peso en los talones</li>
                        </ul>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">📊 Series Recomendadas:</h4>
                          <p className="text-sm text-muted-foreground">3-4 series × 12-15 repeticiones</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">💪 Músculos Trabajados:</h4>
                          <p className="text-sm text-muted-foreground">Piernas, glúteos, core</p>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">🔄 Variaciones:</h4>
                        <p className="text-sm text-muted-foreground">
                          Sentadilla sumo • Sentadilla búlgara • Sentadilla con salto • Sentadilla pistol (avanzado)
                        </p>
                      </div>
                      <div className="bg-destructive/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Errores Comunes:
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Rodillas hacia dentro • Espalda encorvada • Elevarse sobre las puntas de los pies
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="flexiones" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💪</span>
                        <span className="font-semibold text-lg">Flexiones (Push-ups)</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">✅ Técnica Correcta:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>Manos a la altura de los hombros</li>
                          <li>Cuerpo en línea recta desde cabeza hasta pies</li>
                          <li>Codos a 45° del cuerpo al bajar</li>
                          <li>Bajar hasta que el pecho casi toque el suelo</li>
                          <li>Subir extendiendo completamente los brazos</li>
                        </ul>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">📊 Series Recomendadas:</h4>
                          <p className="text-sm text-muted-foreground">3-4 series × 8-12 repeticiones</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">💪 Músculos Trabajados:</h4>
                          <p className="text-sm text-muted-foreground">Pecho, tríceps, hombros, core</p>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">🔄 Variaciones:</h4>
                        <p className="text-sm text-muted-foreground">
                          Flexiones inclinadas (principiantes) • Flexiones diamante • Flexiones declinadas • Flexiones archer (avanzado)
                        </p>
                      </div>
                      <div className="bg-destructive/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Errores Comunes:
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Caderas hundidas • Codos muy abiertos • Rango de movimiento incompleto
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="planchas" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🏋️</span>
                        <span className="font-semibold text-lg">Planchas (Planks)</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">✅ Posición Correcta:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>Apoyado en antebrazos y puntas de pies</li>
                          <li>Codos justo debajo de los hombros</li>
                          <li>Cuerpo en línea recta desde cabeza hasta talones</li>
                          <li>Core activado (ombligo hacia columna)</li>
                          <li>Mirada hacia el suelo</li>
                        </ul>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">📊 Series Recomendadas:</h4>
                          <p className="text-sm text-muted-foreground">3-4 series × 30-60 segundos</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">💪 Músculos Trabajados:</h4>
                          <p className="text-sm text-muted-foreground">Core completo, estabilizadores</p>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">🔄 Variaciones:</h4>
                        <p className="text-sm text-muted-foreground">
                          Plancha lateral • Plancha con tap shoulders • Plancha RKC (avanzado) • Plancha con elevación de pierna
                        </p>
                      </div>
                      <div className="bg-destructive/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Errores Comunes:
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Caderas hundidas o elevadas • Hombros adelantados • Aguantar la respiración
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="zancadas" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🚶</span>
                        <span className="font-semibold text-lg">Zancadas (Lunges)</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">✅ Ejecución Controlada:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>Paso adelante con una pierna</li>
                          <li>Rodilla delantera alineada con el tobillo</li>
                          <li>Rodilla trasera baja hacia el suelo (sin tocarlo)</li>
                          <li>Torso erguido durante todo el movimiento</li>
                          <li>Empujar con el talón delantero para volver</li>
                        </ul>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">📊 Series Recomendadas:</h4>
                          <p className="text-sm text-muted-foreground">3 series × 10-12 por pierna</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">💪 Músculos Trabajados:</h4>
                          <p className="text-sm text-muted-foreground">Piernas, glúteos, equilibrio</p>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">🔄 Variaciones:</h4>
                        <p className="text-sm text-muted-foreground">
                          Zancadas estáticas • Zancadas caminando • Zancadas inversas • Zancadas con salto (avanzado)
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mountain-climbers" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">⛰️</span>
                        <span className="font-semibold text-lg">Mountain Climbers</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">✅ Técnica Dinámica:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>Posición inicial de plancha alta</li>
                          <li>Llevar una rodilla hacia el pecho</li>
                          <li>Alternar rápidamente entre piernas</li>
                          <li>Mantener caderas bajas y estables</li>
                          <li>Respiración continua y controlada</li>
                        </ul>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">📊 Series Recomendadas:</h4>
                          <p className="text-sm text-muted-foreground">3 series × 30-40 segundos</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">💪 Músculos Trabajados:</h4>
                          <p className="text-sm text-muted-foreground">Core, cardio, estabilidad</p>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">🔄 Variaciones:</h4>
                        <p className="text-sm text-muted-foreground">
                          Mountain climbers lentos • Mountain climbers cruzados • Spiderman climbers
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="bird-dog" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🐕</span>
                        <span className="font-semibold text-lg">Bird-Dog</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">✅ Coordinación y Estabilidad:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>Posición en cuatro patas (cuadrupedia)</li>
                          <li>Extender brazo y pierna opuesta simultáneamente</li>
                          <li>Mantener espalda neutral (sin arquear)</li>
                          <li>Sostener la posición 2-3 segundos</li>
                          <li>Alternar lados de forma controlada</li>
                        </ul>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">📊 Series Recomendadas:</h4>
                          <p className="text-sm text-muted-foreground">3 series × 10-12 por lado</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">💪 Músculos Trabajados:</h4>
                          <p className="text-sm text-muted-foreground">Core, espalda baja, glúteos</p>
                        </div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">💡 Beneficios Clave:</h4>
                        <p className="text-sm text-muted-foreground">
                          Excelente para prevenir dolor lumbar y mejorar la postura. Ideal para principiantes.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>

          {/* Galería de Videos */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <VideoGallery 
                videos={videosEnCasa}
                title="Más Videos de Entrenamiento en Casa"
                showStats={true}
              />
            </div>
          </section>

          {/* CTA Comunidad */}
          <CommunityCTA />

          {/* Cómo Diseñar tu Rutina Semanal */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Cómo Diseñar tu Rutina Semanal en Casa
              </h2>
              
              <div className="max-w-5xl mx-auto space-y-8">
                <Card className="border-primary/20 hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Calendar className="w-8 h-8 text-primary" />
                      Planificación Según tu Nivel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-muted/50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-primary">Principiantes</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li><strong>Frecuencia:</strong> 3 días/semana</li>
                          <li><strong>Duración:</strong> 20-30 minutos</li>
                          <li><strong>Enfoque:</strong> Técnica y adaptación</li>
                          <li><strong>Descanso:</strong> 48h entre sesiones</li>
                        </ul>
                        <div className="mt-4 p-3 bg-background rounded text-xs">
                          <p className="font-semibold mb-1">Ejemplo semanal:</p>
                          <p>Lun: Full Body</p>
                          <p>Mié: Full Body</p>
                          <p>Vie: Full Body</p>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-primary">Intermedios</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li><strong>Frecuencia:</strong> 4-5 días/semana</li>
                          <li><strong>Duración:</strong> 30-45 minutos</li>
                          <li><strong>Enfoque:</strong> División muscular</li>
                          <li><strong>Descanso:</strong> 24-48h por grupo</li>
                        </ul>
                        <div className="mt-4 p-3 bg-background rounded text-xs">
                          <p className="font-semibold mb-1">Ejemplo semanal:</p>
                          <p>Lun: Tren Superior</p>
                          <p>Mar: Tren Inferior</p>
                          <p>Jue: Core + HIIT</p>
                          <p>Vie: Full Body</p>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 text-primary">Avanzados</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li><strong>Frecuencia:</strong> 5-6 días/semana</li>
                          <li><strong>Duración:</strong> 45-60 minutos</li>
                          <li><strong>Enfoque:</strong> Especialización</li>
                          <li><strong>Descanso:</strong> Activo o completo</li>
                        </ul>
                        <div className="mt-4 p-3 bg-background rounded text-xs">
                          <p className="font-semibold mb-1">Ejemplo semanal:</p>
                          <p>Lun: Empuje</p>
                          <p>Mar: Tracción</p>
                          <p>Mié: Piernas</p>
                          <p>Jue: Core + Skills</p>
                          <p>Vie: HIIT</p>
                          <p>Sáb: Full Body</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-primary" />
                      Estructura de una Sesión Efectiva
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="bg-primary text-primary-foreground font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-semibold mb-1">Calentamiento (5-10 min)</h4>
                          <p className="text-sm text-muted-foreground">Movilidad articular + estiramientos dinámicos + activación cardiovascular</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="bg-primary text-primary-foreground font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-semibold mb-1">Ejercicios Principales (20-40 min)</h4>
                          <p className="text-sm text-muted-foreground">4-6 ejercicios de calistenia enfocados en tu objetivo del día</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="bg-primary text-primary-foreground font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-semibold mb-1">Estiramiento (5 min)</h4>
                          <p className="text-sm text-muted-foreground">Estiramientos estáticos para los grupos musculares trabajados</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Progresión sin Equipamiento */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Progresión sin Equipamiento
              </h2>
              
              <div className="max-w-5xl mx-auto">
                <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                  Avanza en tus entrenamientos sin necesidad de pesas o máquinas. Estas estrategias te permitirán seguir desafiando tu cuerpo con solo tu peso corporal.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <TrendingUp className="w-10 h-10 text-primary mb-2" />
                      <CardTitle>Aumentar Repeticiones</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        Progresa gradualmente el volumen de entrenamiento para estimular el crecimiento muscular.
                      </p>
                      <div className="bg-muted/50 p-3 rounded text-sm">
                        <p className="font-semibold mb-1">Progresión típica:</p>
                        <p className="text-muted-foreground">8 reps → 12 reps → 15 reps → 20 reps</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <Clock className="w-10 h-10 text-primary mb-2" />
                      <CardTitle>Reducir Descansos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        Disminuye los tiempos de recuperación entre series para aumentar la intensidad.
                      </p>
                      <div className="bg-muted/50 p-3 rounded text-sm">
                        <p className="font-semibold mb-1">Progresión típica:</p>
                        <p className="text-muted-foreground">90s → 60s → 45s → 30s</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <Zap className="w-10 h-10 text-primary mb-2" />
                      <CardTitle>Variaciones Más Difíciles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        Evoluciona hacia versiones más exigentes de cada ejercicio.
                      </p>
                      <div className="bg-muted/50 p-3 rounded text-sm">
                        <p className="font-semibold mb-1">Ejemplo flexiones:</p>
                        <p className="text-muted-foreground">Inclinadas → Normales → Diamante → Archer → One-arm</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <Activity className="w-10 h-10 text-primary mb-2" />
                      <CardTitle>Tempo Lento (Control)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        Ralentiza la ejecución para incrementar el tiempo bajo tensión.
                      </p>
                      <div className="bg-muted/50 p-3 rounded text-sm">
                        <p className="font-semibold mb-1">Tempo 3-1-3:</p>
                        <p className="text-muted-foreground">3s bajar • 1s pausa • 3s subir</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-elegant transition-all duration-300 md:col-span-2">
                    <CardHeader>
                      <Target className="w-10 h-10 text-primary mb-2" />
                      <CardTitle>Combinar Ejercicios (Superseries & Circuitos)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        Agrupa ejercicios sin descanso para aumentar la densidad del entrenamiento.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-muted/50 p-3 rounded text-sm">
                          <p className="font-semibold mb-1">Ejemplo Superserie:</p>
                          <p className="text-muted-foreground">Flexiones + Dominadas (sin descanso entre ejercicios)</p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded text-sm">
                          <p className="font-semibold mb-1">Ejemplo Circuito:</p>
                          <p className="text-muted-foreground">Sentadillas → Flexiones → Planchas → Repeat x3</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Prevención de Lesiones */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Prevención de Lesiones y Cuidado Corporal
              </h2>
              
              <div className="max-w-5xl mx-auto space-y-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Shield className="w-8 h-8 text-primary" />
                      Escuchar al Cuerpo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Prestar atención a las señales que envía tu cuerpo es esencial para prevenir lesiones. 
                      El dolor es un indicador que no debe ignorarse.
                    </p>
                    <div className="bg-destructive/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Señales de Sobreentrenamiento:
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <li>• Fatiga constante y falta de energía</li>
                        <li>• Dificultad para dormir o insomnio</li>
                        <li>• Disminución del rendimiento físico</li>
                        <li>• Aumento de lesiones o dolores musculares</li>
                        <li>• Irritabilidad o cambios de humor</li>
                        <li>• Pérdida de motivación para entrenar</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-primary" />
                        Técnica Antes que Cantidad
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        Una ejecución perfecta con menos repeticiones es siempre mejor que muchas repeticiones con mala forma.
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                        <li>Domina el movimiento básico primero</li>
                        <li>Aumenta la dificultad gradualmente</li>
                        <li>Si pierdes la forma, detente y descansa</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Activity className="w-6 h-6 text-primary" />
                        Descanso Activo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        La recuperación es cuando el cuerpo se fortalece. Incluye días de descanso activo en tu rutina.
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                        <li>Caminatas suaves de 20-30 minutos</li>
                        <li>Sesiones de estiramientos o yoga</li>
                        <li>Movilidad articular ligera</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Target className="w-8 h-8 text-primary" />
                      Checklist de Postura Correcta
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-card p-4 rounded-lg border">
                        <h4 className="font-semibold mb-2">Sentadillas</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>✓ Rodillas alineadas con pies</li>
                          <li>✓ Peso en talones</li>
                          <li>✓ Espalda recta</li>
                          <li>✓ Mirada al frente</li>
                        </ul>
                      </div>
                      <div className="bg-card p-4 rounded-lg border">
                        <h4 className="font-semibold mb-2">Flexiones</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>✓ Cuerpo en línea recta</li>
                          <li>✓ Codos a 45°</li>
                          <li>✓ Core activado</li>
                          <li>✓ Rango completo</li>
                        </ul>
                      </div>
                      <div className="bg-card p-4 rounded-lg border">
                        <h4 className="font-semibold mb-2">Planchas</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>✓ Codos bajo hombros</li>
                          <li>✓ Caderas alineadas</li>
                          <li>✓ Glúteos activos</li>
                          <li>✓ Respiración continua</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Preguntas Frecuentes sobre <span className="text-primary">Calistenia en Casa</span>
              </h2>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="bg-background rounded-xl px-6 border border-primary/10 shadow-card hover:shadow-elegant transition-shadow"
                    >
                      <AccordionTrigger className="font-display font-bold text-left hover:text-primary hover:no-underline py-6 text-lg">
                        <span className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">
                            {index + 1}
                          </span>
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pl-11">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">
                      ¿Quieres un Plan Personalizado?
                    </CardTitle>
                    <CardDescription className="text-base">
                      Descubre nuestros programas de entrenamiento adaptados a tus objetivos y nivel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/programas">
                      <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-elegant">
                        Ver Programas de Entrenamiento
                      </button>
                    </Link>
                  </CardContent>
                </Card>
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
