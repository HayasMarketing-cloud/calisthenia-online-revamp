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
import { Home, CheckCircle, Target, Shield, Zap, Heart, Clock, TrendingUp, AlertCircle, Calendar, Activity, Dumbbell, Wallet, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import StructuredData from "@/components/seo/StructuredData";
import { useRoutineSchemas } from "@/hooks/useRoutineSchemas";
import { generateFAQSchema, generateExercisePlanSchema } from "@/lib/schemas";

export const faqs = [
  {
    question: "¿Cómo empezar a hacer calistenia en casa siendo principiante?",
    answer: "Para empezar calistenia en casa como principiante entrena 3 días por semana, full body, 25 minutos por sesión, con 5 ejercicios básicos sin material. Los movimientos clave son sentadillas, flexiones (puedes apoyar las rodillas), zancadas, planchas y bird-dog: 3 series de 8-12 repeticiones cada uno, priorizando la técnica antes que el volumen y descansando 48 horas entre sesiones para permitir la recuperación muscular."
  },
  {
    question: "¿Cuánto espacio necesito para una rutina de calistenia en casa?",
    answer: "Para una rutina de calistenia en casa necesitas 2x2 metros de espacio libre: suficiente para flexiones, sentadillas, planchas, zancadas y mountain climbers. Asegúrate de que el suelo sea estable, esté bien ventilado y no haya muebles cerca que limiten los movimientos amplios; un pasillo despejado o el salón cumplen perfectamente."
  },
  {
    question: "¿Se puede ganar músculo haciendo calistenia en casa sin pesas?",
    answer: "Sí, se puede ganar músculo con calistenia en casa sin pesas aplicando sobrecarga progresiva: más repeticiones, menos descanso y variaciones más exigentes. La clave es controlar el tempo (3 segundos bajando, 1 de pausa, 3 subiendo) y avanzar hacia flexiones diamante, archer o pistol squat. Con un superávit calórico moderado y 1,6-2 g de proteína por kilo, el peso corporal basta para hipertrofia."
  },
  {
    question: "¿Cuántos días a la semana hay que entrenar calistenia en casa?",
    answer: "Entrena calistenia en casa 3 días por semana si eres principiante, 4-5 días si eres intermedio y 5-6 días si eres avanzado. Los principiantes hacen full body, los intermedios dividen tren superior/inferior y los avanzados aplican rutinas especializadas (empuje, tracción, piernas). Reserva siempre 1-2 días de descanso completo o activo para optimizar la recuperación y evitar el sobreentrenamiento."
  },
  {
    question: "¿Cuánto tiempo tarda la calistenia en casa en dar resultados?",
    answer: "La calistenia en casa da los primeros resultados de fuerza y energía en 2-3 semanas, y los cambios físicos visibles aparecen entre la semana 4 y la 8. Verás más definición, mejor postura e hipertrofia inicial entrenando de forma constante 3-5 días por semana. La clave para resultados sostenidos es la consistencia, una progresión gradual y una alimentación adecuada a tu objetivo."
  },
  {
    question: "¿Qué material necesito para entrenar calistenia en casa?",
    answer: "Para entrenar calistenia en casa no necesitas ningún material: solo tu peso corporal y 2x2 metros de espacio. De forma opcional, una esterilla aporta comodidad en ejercicios de suelo, una silla resistente sirve para fondos de tríceps y una toalla en la puerta permite trabajo de tracción. La única inversión que multiplica las opciones es una barra de dominadas de marco."
  },
  {
    question: "¿Es mejor entrenar calistenia en casa por la mañana o por la noche?",
    answer: "El mejor momento para entrenar calistenia en casa es aquel en el que puedas ser constante; mañana y tarde-noche tienen ventajas distintas. Por la mañana activas el metabolismo y mejoras el foco para el día; por la tarde-noche, la temperatura corporal y la fuerza están en su pico fisiológico y el riesgo de lesión es menor. Elige la franja que mejor encaje con tu rutina y mantenla en el tiempo."
  },
  {
    question: "¿Sirve la calistenia en casa para mujeres y para perder peso?",
    answer: "Sí, la calistenia en casa es ideal para mujeres y para perder peso porque combina fuerza con peso corporal y circuitos de alta intensidad. Con HIIT de sentadillas, mountain climbers y burpees elevas el gasto calórico, mantienes masa muscular y mejoras la composición corporal. Tres sesiones semanales de 30 minutos junto a un déficit calórico moderado son suficientes para ver resultados."
  },
  {
    question: "¿Qué rutina de calistenia en casa para principiantes seguir las primeras 4 semanas?",
    answer: "La mejor rutina de calistenia en casa para principiantes en 4 semanas son 3 sesiones full body (lunes, miércoles, viernes) de 25-30 minutos. Cada sesión incluye 5 ejercicios: 3 series de 10 sentadillas, 3x8 flexiones (apoyando rodillas si hace falta), 3x10 zancadas por pierna, 3x30 segundos de plancha y 3x10 bird-dog por lado. Suma 2 repeticiones cada semana y, en la cuarta, pasa a flexiones completas."
  },
  {
    question: "¿Qué plan de calistenia en casa seguir para ganar masa muscular?",
    answer: "Para ganar masa muscular con calistenia en casa entrena de 3 a 5 días por semana con división empuje/tracción/piernas y core, 4 series de 6-12 repeticiones cerca del fallo. Programa flexiones diamante y pike push-ups para pecho y hombros, remos invertidos en mesa o toalla para espalda, sentadillas búlgaras y zancadas para piernas, y planchas para core. "
  }
];

const RutinaCasa = () => {
  const schemas = useRoutineSchemas({
    routineName: "Calistenia en Casa: Rutina Completa sin Equipamiento",
    routineDescription: "Rutina completa de calistenia en casa sin equipamiento. Ejercicios, planificación y técnicas para entrenar desde tu hogar.",
    videoId: "2PVk2wUY04k",
    videoTitle: "Rutina Calistenia en Casa - Entrenamiento Completo",
    videoDuration: "PT15M",
    uploadDate: "2024-01-15T09:00:00+01:00",
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

  const exercisePlanSchema = generateExercisePlanSchema({
    name: "Tabla Calistenia en Casa: Plan Semanal Sin Equipamiento",
    description: "Tabla y plan semanal de calistenia en casa con 5 sesiones (empuje, piernas, tracción, core+HIIT y full body) y 2 días de descanso. Sin equipamiento, adaptable a principiantes, intermedios y avanzados.",
    url: "https://calisthenia.online/rutina-calistenia-en-casa/",
    image: "https://calisthenia.online/assets/calisthenia-casa.webp",
    activityFrequency: "5 días por semana",
    workload: "PT40M",
    intensity: "Moderada-Alta",
    restPeriods: "60-90 segundos entre series; miércoles y domingo descanso completo",
    audience: "Principiantes a avanzados",
    sessions: [
      {
        day: "Lunes",
        focus: "Empuje (pecho, hombros, tríceps)",
        exercises: [
          { name: "Flexiones clásicas", sets: 4, reps: "8-12", rest: "60s" },
          { name: "Pike push-ups", sets: 3, reps: "8-10", rest: "75s" },
          { name: "Flexiones diamante", sets: 3, reps: "6-10", rest: "75s" },
          { name: "Fondos en silla", sets: 3, reps: "10-12", rest: "60s" }
        ]
      },
      {
        day: "Martes",
        focus: "Piernas y glúteos",
        exercises: [
          { name: "Sentadillas", sets: 4, reps: "15-20", rest: "60s" },
          { name: "Zancadas alternas", sets: 3, reps: "10/pierna", rest: "60s" },
          { name: "Sentadilla búlgara", sets: 3, reps: "8/pierna", rest: "75s" },
          { name: "Puente de glúteo", sets: 3, reps: "15", rest: "45s" }
        ]
      },
      {
        day: "Jueves",
        focus: "Tracción (espalda y bíceps)",
        exercises: [
          { name: "Remo invertido en mesa", sets: 4, reps: "8-12", rest: "75s" },
          { name: "Remo con toalla en puerta", sets: 3, reps: "10-12", rest: "60s" },
          { name: "Curl bíceps isométrico con toalla", sets: 3, reps: "30s", rest: "45s" },
          { name: "Superman", sets: 3, reps: "12-15", rest: "45s" }
        ]
      },
      {
        day: "Viernes",
        focus: "Core y HIIT",
        exercises: [
          { name: "Plancha frontal", sets: 3, reps: "45-60s", rest: "45s" },
          { name: "Mountain climbers", sets: 4, reps: "30s", rest: "30s" },
          { name: "Crunch bicicleta", sets: 3, reps: "20", rest: "45s" },
          { name: "Burpees", sets: 4, reps: "10", rest: "45s" }
        ]
      },
      {
        day: "Sábado",
        focus: "Full body",
        exercises: [
          { name: "Flexiones", sets: 3, reps: "10-12", rest: "60s" },
          { name: "Sentadillas con salto", sets: 3, reps: "12", rest: "60s" },
          { name: "Remo invertido", sets: 3, reps: "8-10", rest: "60s" },
          { name: "Plancha lateral", sets: 3, reps: "30s/lado", rest: "45s" }
        ]
      }
    ]
  });

  return (
    <>
      <Helmet>
        <title>Calistenia en Casa: Rutina y Ejercicios para Principiantes 2025</title>
        <meta 
          name="description" 
          content="Rutina de calistenia en casa para principiantes: tabla semanal, plan 4 semanas y 8 ejercicios sin equipamiento explicados paso a paso por un coach certificado." 
        />
        <meta name="keywords" content="calistenia en casa, rutina calistenia en casa, ejercicios calistenia en casa, calistenia en casa principiantes, tabla calistenia en casa, plan calistenia en casa" />
        <meta property="og:title" content="Calistenia en Casa: Rutina y Ejercicios para Principiantes" />
        <meta property="og:description" content="Tabla semanal, plan 4 semanas y 8 ejercicios de calistenia en casa explicados paso a paso. Sin equipamiento." />
        <link rel="canonical" href="https://calisthenia.online/rutina-calistenia-en-casa/" />
      </Helmet>

      <StructuredData data={[...schemas.allSchemas, faqSchema, exercisePlanSchema]} />

      <div className="min-h-screen flex flex-col">
        <Header />
        <CommunityStickyBanner />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="relative min-h-[600px] lg:min-h-[80vh] flex items-center overflow-hidden">
            <img
              src={entrenaCase}
              alt="Atleta entrenando calistenia en casa sin equipamiento"
              width={1600}
              height={900}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/30 md:via-secondary/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 py-20 md:py-28">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 md:mb-8 bg-primary/10 border border-primary/30 rounded-full backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-primary uppercase">
                    Rutina en casa · Sin material
                  </span>
                </div>

                <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 md:mb-8 tracking-tight">
                  Rutina de calistenia <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">en casa</span>
                </h1>

                <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mb-10 md:mb-12">
                  Entrena desde cualquier lugar sin material. Tu cuerpo es tu gimnasio: rutinas, ejercicios y planificación semanal para empezar hoy mismo.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Button size="lg" asChild className="text-lg px-8 py-6 rounded-xl font-bold shadow-xl">
                    <a href="#video-rutina">
                      Ver rutina completa
                      <ArrowRight className="ml-2" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 rounded-xl font-bold bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10">
                    <a href="#planificacion">
                      Encuentra tu nivel
                      <ChevronDown className="ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
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
          <section id="que-es" className="py-20 md:py-24 bg-muted/30 scroll-mt-24">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Qué es la calistenia en <span className="text-primary">casa</span> y por qué funciona
              </h2>

              <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 items-start mb-16">
                <div className="lg:col-span-3 space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <div className="inline-flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-display font-bold text-xl text-foreground">Entrenamiento con peso corporal</span>
                  </div>
                  <p>
                    La <strong className="text-foreground">calistenia en casa</strong> es un método de entrenamiento que utiliza el propio peso del cuerpo como herramienta principal.
                    Movimientos como flexiones, sentadillas y dominadas te permiten trabajar diversos grupos musculares sin necesidad de equipos adicionales.
                  </p>
                  <p>
                    Su eficacia radica en activar la musculatura y mejorar la funcionalidad del cuerpo.
                    Puedes entrenar en cualquier espacio de tu hogar: solo necesitas aproximadamente 2 metros cuadrados.
                  </p>
                </div>
                <aside className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6">
                  <p className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Diferencia vs gimnasio</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Mientras el gimnasio requiere máquinas y pesas, la calistenia convierte tu cuerpo en tu propia resistencia.
                    Esto no solo ahorra dinero, sino que desarrolla <strong className="text-foreground">fuerza funcional</strong> más aplicable a movimientos del día a día.
                  </p>
                </aside>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { Icon: Home, title: "Sin equipamiento", text: "Solo necesitas tu peso corporal para entrenar de forma efectiva." },
                  { Icon: Clock, title: "Flexibilidad total", text: "Entrena cuando quieras, sin horarios ni desplazamientos." },
                  { Icon: Wallet, title: "Ahorro económico", text: "Sin cuotas de gimnasio ni gastos en equipamiento caro." },
                ].map(({ Icon, title, text }) => (
                  <div key={title} className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{title}</h3>
                    <p className="text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Beneficios de la Calistenia en Casa */}
          <section id="beneficios" className="py-20 md:py-24 bg-muted/30 scroll-mt-24">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Beneficios de entrenar calistenia en <span className="text-primary">casa</span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                  { Icon: Dumbbell, title: "Desarrollo de Fuerza Funcional", text: "Al trabajar con tu propio peso, desarrollas músculos de manera equilibrada y aumentas la fuerza aplicable a situaciones reales." },
                  { Icon: Heart, title: "Mejora Cardiovascular", text: "Los movimientos dinámicos elevan tu ritmo cardíaco, mejorando la salud cardiovascular y la capacidad pulmonar." },
                  { Icon: Activity, title: "Coordinación y Equilibrio", text: "Ejercicios que requieren balance promueven la conexión mente-cuerpo y mejoran tu estabilidad general." },
                  { Icon: Shield, title: "Prevención de Lesiones", text: "Fortaleces músculos, tendones y ligamentos, creando una base sólida que reduce el riesgo de lesiones." },
                  { Icon: Clock, title: "Entrenamientos Eficientes", text: "Sesiones de 20-45 minutos son suficientes para obtener resultados, perfecto para agendas ocupadas." },
                  { Icon: TrendingUp, title: "Adaptable a Todos los Niveles", text: "Desde principiantes hasta avanzados, cada ejercicio se puede modificar según tus capacidades." },
                ].map(({ Icon, title, text }) => (
                  <Card key={title} className="hover:-translate-y-1 hover:shadow-elegant hover:border-primary/30 transition-all duration-300">
                    <CardHeader className="gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Video Principal Estructurado */}
          <div id="video-rutina" className="relative -top-20"></div>
          <section className="py-20 md:py-24">
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
          <section id="calentamiento" className="py-20 md:py-24 bg-muted/30 scroll-mt-24">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Calentamiento y prevención de <span className="text-primary">lesiones</span>
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
                        Elección del espacio
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        Necesitas un mínimo de <strong>2x2 metros</strong> libre de obstáculos para realizar movimientos amplios y seguros.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Superficie plana y estable</li>
                        <li>Buena ventilación e iluminación</li>
                        <li>Sin muebles cerca</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-primary" />
                        Equipo básico opcional
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        No son necesarios, pero mejoran tu comodidad:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        <li><strong>Esterilla</strong>: comodidad en ejercicios de suelo</li>
                        <li><strong>Silla o banco</strong>: para fondos de tríceps</li>
                        <li><strong>Toalla</strong>: higiene y soporte para remos invertidos</li>
                        <li><strong>Botella de agua</strong>: hidratación constante</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Shield className="w-8 h-8 text-primary" />
                      Escuchar al cuerpo y prevenir lesiones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Prestar atención a las señales que envía tu cuerpo es esencial para prevenir lesiones. El dolor es un indicador que no debe ignorarse.
                    </p>
                    <div className="bg-destructive/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Señales de sobreentrenamiento
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <li>• Fatiga constante y falta de energía</li>
                        <li>• Insomnio o mala calidad del sueño</li>
                        <li>• Caída del rendimiento físico</li>
                        <li>• Dolores musculares persistentes</li>
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
                        Técnica antes que cantidad
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        Una ejecución perfecta con menos repeticiones es siempre mejor que muchas con mala forma.
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
                        Descanso activo y recuperación
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
              </div>
            </div>
          </section>

          {/* Ejercicios Básicos de Calistenia en Casa */}
          <section id="ejercicios" className="py-20 md:py-24 scroll-mt-24">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Ejercicios de calistenia en casa para <span className="text-primary">principiantes</span>
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="sentadillas" className="border rounded-lg px-6 bg-card">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🦵</span>
                        <h3 className="font-semibold text-lg m-0">Sentadillas (squats) en casa</h3>
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
                        <h3 className="font-semibold text-lg m-0">Flexiones (push-ups) sin material</h3>
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
                        <h3 className="font-semibold text-lg m-0">Plancha (plank) y variantes</h3>
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
                        <h3 className="font-semibold text-lg m-0">Zancadas (lunges) en espacio reducido</h3>
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
                        <h3 className="font-semibold text-lg m-0">Mountain climbers para core y cardio</h3>
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
                        <h3 className="font-semibold text-lg m-0">Bird-dog para estabilidad lumbar</h3>
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
          <section id="videos" className="py-20 md:py-24 bg-muted/30 scroll-mt-24">
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

          {/* Tabla Rutina Semanal Detallada */}
          <section id="tabla-rutina" className="py-20 md:py-24 scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    Plan semanal listo para usar
                  </span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                    Tabla de rutina de calistenia en <span className="text-primary">casa</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Plan completo de 5 días con ejercicios, series, repeticiones y descansos. Sin material y adaptable a cualquier nivel.
                  </p>
                </div>

                <Card className="border-primary/20 shadow-elegant overflow-hidden">
                  <CardContent className="p-0">
                    <Table>
                      <TableCaption className="mb-4 px-4">
                        Rutina de calistenia en casa · 5 sesiones/semana · ajusta repeticiones a tu nivel
                      </TableCaption>
                      <TableHeader>
                        <TableRow className="bg-muted/60 hover:bg-muted/60">
                          <TableHead className="font-bold text-foreground">Día</TableHead>
                          <TableHead className="font-bold text-foreground">Enfoque</TableHead>
                          <TableHead className="font-bold text-foreground">Ejercicio</TableHead>
                          <TableHead className="font-bold text-foreground text-center">Series</TableHead>
                          <TableHead className="font-bold text-foreground text-center">Reps</TableHead>
                          <TableHead className="font-bold text-foreground text-center">Descanso</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* LUNES - EMPUJE */}
                        <TableRow>
                          <TableCell rowSpan={4} className="font-bold align-top bg-primary/5">
                            <div>Lunes</div>
                            <Badge variant="secondary" className="mt-2 text-xs">Empuje</Badge>
                          </TableCell>
                          <TableCell rowSpan={4} className="align-top text-sm text-muted-foreground">Pecho, hombros y tríceps</TableCell>
                          <TableCell className="font-medium">Flexiones estándar</TableCell>
                          <TableCell className="text-center">4</TableCell>
                          <TableCell className="text-center">8-15</TableCell>
                          <TableCell className="text-center">60-90 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Pike push-ups</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">6-12</TableCell>
                          <TableCell className="text-center">90 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Flexiones diamante</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">6-10</TableCell>
                          <TableCell className="text-center">60 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Fondos en silla</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">8-12</TableCell>
                          <TableCell className="text-center">60 s</TableCell>
                        </TableRow>

                        {/* MARTES - PIERNAS */}
                        <TableRow>
                          <TableCell rowSpan={4} className="font-bold align-top bg-primary/5">
                            <div>Martes</div>
                            <Badge variant="secondary" className="mt-2 text-xs">Piernas</Badge>
                          </TableCell>
                          <TableCell rowSpan={4} className="align-top text-sm text-muted-foreground">Cuádriceps, glúteos y femoral</TableCell>
                          <TableCell className="font-medium">Sentadillas</TableCell>
                          <TableCell className="text-center">4</TableCell>
                          <TableCell className="text-center">15-25</TableCell>
                          <TableCell className="text-center">60 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Sentadilla búlgara</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">10-12 / pierna</TableCell>
                          <TableCell className="text-center">90 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Zancadas alternas</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">12 / pierna</TableCell>
                          <TableCell className="text-center">60 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Puente de glúteos</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">15-20</TableCell>
                          <TableCell className="text-center">45 s</TableCell>
                        </TableRow>

                        {/* MIÉRCOLES - DESCANSO */}
                        <TableRow className="bg-muted/30">
                          <TableCell className="font-bold bg-primary/5">
                            <div>Miércoles</div>
                            <Badge variant="outline" className="mt-2 text-xs">Descanso</Badge>
                          </TableCell>
                          <TableCell colSpan={5} className="text-sm text-muted-foreground italic">
                            Descanso activo: caminata 30-45 min, movilidad o estiramientos suaves.
                          </TableCell>
                        </TableRow>

                        {/* JUEVES - TRACCIÓN */}
                        <TableRow>
                          <TableCell rowSpan={4} className="font-bold align-top bg-primary/5">
                            <div>Jueves</div>
                            <Badge variant="secondary" className="mt-2 text-xs">Tracción</Badge>
                          </TableCell>
                          <TableCell rowSpan={4} className="align-top text-sm text-muted-foreground">Espalda y bíceps</TableCell>
                          <TableCell className="font-medium">Remo invertido en mesa</TableCell>
                          <TableCell className="text-center">4</TableCell>
                          <TableCell className="text-center">8-12</TableCell>
                          <TableCell className="text-center">90 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Remo con toalla en puerta</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">10-15</TableCell>
                          <TableCell className="text-center">60 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Superman</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">12-15</TableCell>
                          <TableCell className="text-center">45 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Curl isométrico con toalla</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">20-30 s</TableCell>
                          <TableCell className="text-center">60 s</TableCell>
                        </TableRow>

                        {/* VIERNES - CORE + HIIT */}
                        <TableRow>
                          <TableCell rowSpan={4} className="font-bold align-top bg-primary/5">
                            <div>Viernes</div>
                            <Badge variant="secondary" className="mt-2 text-xs">Core + HIIT</Badge>
                          </TableCell>
                          <TableCell rowSpan={4} className="align-top text-sm text-muted-foreground">Abdomen, oblicuos y cardio</TableCell>
                          <TableCell className="font-medium">Plancha frontal</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">30-60 s</TableCell>
                          <TableCell className="text-center">45 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Mountain climbers</TableCell>
                          <TableCell className="text-center">4</TableCell>
                          <TableCell className="text-center">30 s</TableCell>
                          <TableCell className="text-center">30 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Bicicleta abdominal</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">20 / lado</TableCell>
                          <TableCell className="text-center">45 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Burpees</TableCell>
                          <TableCell className="text-center">4</TableCell>
                          <TableCell className="text-center">10-15</TableCell>
                          <TableCell className="text-center">60 s</TableCell>
                        </TableRow>

                        {/* SÁBADO - FULL BODY */}
                        <TableRow>
                          <TableCell rowSpan={4} className="font-bold align-top bg-primary/5">
                            <div>Sábado</div>
                            <Badge variant="secondary" className="mt-2 text-xs">Full Body</Badge>
                          </TableCell>
                          <TableCell rowSpan={4} className="align-top text-sm text-muted-foreground">Sesión global de refuerzo</TableCell>
                          <TableCell className="font-medium">Flexiones</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">10-15</TableCell>
                          <TableCell className="text-center">60 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Sentadillas con salto</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">12-15</TableCell>
                          <TableCell className="text-center">60 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Remo invertido</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">10-12</TableCell>
                          <TableCell className="text-center">60 s</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Plancha lateral</TableCell>
                          <TableCell className="text-center">3</TableCell>
                          <TableCell className="text-center">30 s / lado</TableCell>
                          <TableCell className="text-center">45 s</TableCell>
                        </TableRow>

                        {/* DOMINGO */}
                        <TableRow className="bg-muted/30">
                          <TableCell className="font-bold bg-primary/5">
                            <div>Domingo</div>
                            <Badge variant="outline" className="mt-2 text-xs">Descanso</Badge>
                          </TableCell>
                          <TableCell colSpan={5} className="text-sm text-muted-foreground italic">
                            Descanso completo. Hidrátate, duerme 7-9 h y prepara la semana.
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Principiantes</p>
                    <p className="text-sm text-muted-foreground">Haz 2-3 series del rango bajo de reps y descansa 90-120 s.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Intermedios</p>
                    <p className="text-sm text-muted-foreground">Sigue la tabla tal cual y progresa subiendo reps cada semana.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Avanzados</p>
                    <p className="text-sm text-muted-foreground">Añade variantes a una mano, tempo lento o reduce descanso a 30-45 s.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cómo Diseñar tu Rutina Semanal */}
          <section id="planificacion" className="py-20 md:py-24 bg-muted/30 scroll-mt-24">

            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Plan de calistenia en casa: cómo organizar tu <span className="text-primary">semana</span>
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
          <section id="progresion" className="py-20 md:py-24 scroll-mt-24">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Progresión en calistenia en casa sin <span className="text-primary">equipamiento</span>
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

          {/* FAQ Section */}
          <section id="faq" className="py-20 md:py-24 bg-muted/30 scroll-mt-24">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Preguntas frecuentes sobre <span className="text-primary">calistenia en casa</span>
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
          <section id="cta-trial" className="py-20 md:py-24 scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-secondary to-primary/30 p-10 md:p-16 text-center shadow-elegant">
                  <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-primary/10 border border-primary/30 rounded-full backdrop-blur-sm">
                      <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-primary uppercase">
                        Plan personalizado
                      </span>
                    </div>
                    <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4 leading-tight">
                      ¿Quieres un plan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">100% adaptado</span> a ti?
                    </h2>
                    <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                      Descubre nuestros programas de entrenamiento adaptados a tus objetivos y nivel.
                    </p>
                    <Button size="lg" asChild className="text-lg px-8 py-6 rounded-xl font-bold shadow-xl">
                      <Link to="/programas/">
                        Ver programas de entrenamiento
                        <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                  </div>
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
