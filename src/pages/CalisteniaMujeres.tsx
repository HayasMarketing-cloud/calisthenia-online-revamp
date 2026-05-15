import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoEmbed from "@/components/VideoEmbed";
import QuickJumpBanner from "@/components/QuickJumpBanner";
import RoutineBreadcrumbs from "@/components/routine/RoutineBreadcrumbs";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import StructuredData from "@/components/seo/StructuredData";
import StickyTOC from "@/components/seo/StickyTOC";
import TrialCTA from "@/components/seo/TrialCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRoutineSchemas } from "@/hooks/useRoutineSchemas";
import { generateFAQSchema } from "@/lib/schemas";
import { Sparkles, Heart, Shield, TrendingUp, CheckCircle, AlertCircle, Calendar, Target, Flame, Users } from "lucide-react";

const TOC_ITEMS = [
  { id: "que-es", label: "Qué es" },
  { id: "beneficios", label: "Beneficios" },
  { id: "mitos", label: "Mitos" },
  { id: "video-rutina", label: "Vídeo guiado" },
  { id: "rutina-casa", label: "Rutina en casa" },
  { id: "plan-4-semanas", label: "Plan 4 semanas" },
  { id: "ciclo", label: "Ciclo menstrual" },
  { id: "errores", label: "Errores comunes" },
  { id: "faq", label: "FAQ" },
];

const WEEKS_PLAN = [
  {
    id: "semana-1",
    label: "Semana 1",
    phase: "Adaptación y técnica",
    rpe: "RPE 6 / 10",
    goal: "Aprender la técnica básica y crear el hábito de 3 sesiones full body sin material.",
    coachNote: "Prioriza técnica sobre repeticiones. Si una flexión completa te cuesta, apoya rodillas y baja en 3 segundos.",
    exercises: [
      { name: "Sentadillas al aire", sets: "3", reps: "10", rest: "60s" },
      { name: "Flexiones de rodillas", sets: "3", reps: "6", rest: "60s" },
      { name: "Puente de glúteo", sets: "3", reps: "12", rest: "45s" },
      { name: "Remo invertido (mesa)", sets: "3", reps: "8", rest: "75s" },
      { name: "Plancha frontal", sets: "3", reps: "20s", rest: "45s" },
      { name: "Bird-dog", sets: "3", reps: "8/lado", rest: "45s" },
    ],
  },
  {
    id: "semana-2",
    label: "Semana 2",
    phase: "Volumen base",
    rpe: "RPE 7 / 10",
    goal: "Subir volumen total: más series y nuevos patrones (zancadas + hollow).",
    coachNote: "Mantén tempo 3-1-2 (3s bajando, 1s pausa, 2s subiendo). Si pierdes técnica, vuelve a las reps anteriores.",
    exercises: [
      { name: "Sentadillas al aire", sets: "4", reps: "12", rest: "60s" },
      { name: "Flexiones de rodillas", sets: "4", reps: "8", rest: "60s" },
      { name: "Zancadas estáticas", sets: "3", reps: "10/pierna", rest: "60s" },
      { name: "Puente de glúteo", sets: "4", reps: "15", rest: "45s" },
      { name: "Remo invertido (mesa)", sets: "4", reps: "10", rest: "60s" },
      { name: "Plancha frontal", sets: "3", reps: "30s", rest: "45s" },
      { name: "Hollow hold", sets: "3", reps: "15s", rest: "45s" },
    ],
  },
  {
    id: "semana-3",
    label: "Semana 3",
    phase: "Intensidad y progresión",
    rpe: "RPE 8 / 10",
    goal: "Variantes más exigentes y menos descanso para forzar adaptación.",
    coachNote: "Acerca cada serie al fallo técnico (RIR 1-2). Si llevas regla, baja una serie de cada ejercicio.",
    exercises: [
      { name: "Sentadilla búlgara asistida", sets: "4", reps: "8/pierna", rest: "60s" },
      { name: "Flexiones completas (negativas si hace falta)", sets: "4", reps: "6-8", rest: "60s" },
      { name: "Hip thrust a una pierna", sets: "3", reps: "10/pierna", rest: "60s" },
      { name: "Remo invertido pies elevados", sets: "4", reps: "10", rest: "60s" },
      { name: "Plancha lateral", sets: "3", reps: "25s/lado", rest: "45s" },
      { name: "Zancada caminando", sets: "3", reps: "12/pierna", rest: "60s" },
      { name: "Mountain climbers", sets: "3", reps: "30s", rest: "30s" },
    ],
  },
  {
    id: "semana-4",
    label: "Semana 4",
    phase: "Consolidación + test",
    rpe: "RPE 7 + máximas",
    goal: "Asentar progreso y medir: 2 sesiones suaves + 1 test final para comparar con la semana 1.",
    coachNote: "El test es la foto fija de tus ganancias. Anota cada cifra: vas a sorprenderte de cuánto has crecido en 4 semanas.",
    exercises: [
      { name: "Sentadillas al aire", sets: "4", reps: "10", rest: "60s" },
      { name: "Flexiones (rodillas o completas)", sets: "4", reps: "10", rest: "60s" },
      { name: "Hip thrust", sets: "4", reps: "10", rest: "60s" },
      { name: "Remo invertido", sets: "4", reps: "10", rest: "60s" },
      { name: "Burpees suaves", sets: "3", reps: "8", rest: "60s" },
      { name: "Plancha (máximo)", sets: "1", reps: "AMRAP", rest: "—" },
      { name: "Test: máx. flexiones + sentadillas en 60s", sets: "1", reps: "AMRAP", rest: "—" },
    ],
  },
];

const faqs = [
  {
    question: "¿La calistenia para mujeres pone el cuerpo musculoso?",
    answer: "No. La calistenia para mujeres tonifica y define sin generar volumen excesivo porque la mujer tiene niveles de testosterona muy bajos comparados con el hombre, lo que limita de forma natural la hipertrofia. Lo habitual con calistenia es ganar fuerza, mejorar la postura y conseguir un cuerpo atlético, marcado y funcional, no voluminoso.",
  },
  {
    question: "¿Cómo empezar calistenia para mujeres siendo principiante?",
    answer: "Para empezar calistenia siendo mujer principiante entrena 3 días por semana, full body, 25-30 minutos por sesión y sin material. Empieza por sentadillas, flexiones de rodillas, zancadas, plancha y bird-dog en 3 series de 8-12 repeticiones, deja 48 horas entre sesiones y prioriza la técnica antes que las repeticiones. En 4 semanas tendrás una base sólida para progresar a flexiones completas y dominadas asistidas.",
  },
  {
    question: "¿Es buena la calistenia para mujeres para perder peso?",
    answer: "Sí. La calistenia es muy efectiva para que las mujeres pierdan peso porque combina trabajo de fuerza con peso corporal y circuitos de alta intensidad (HIIT) que disparan el gasto calórico durante y después de la sesión. Tres entrenos semanales de 30 minutos junto a un déficit calórico moderado y 1,6-2 g de proteína por kilo de peso corporal son suficientes para reducir grasa manteniendo la masa muscular.",
  },
  {
    question: "¿Calistenia para mujeres en casa sin material funciona igual que en el gimnasio?",
    answer: "Sí, la calistenia en casa para mujeres funciona igual de bien que en el gimnasio si aplicas sobrecarga progresiva. Variando tempo (3 segundos bajando, 1 de pausa, 3 subiendo), reduciendo descansos y avanzando a versiones más exigentes (flexiones diamante, sentadillas búlgaras, pistol squat asistida) puedes desarrollar fuerza y tonificar sin necesidad de máquinas, solo con tu peso corporal.",
  },
  {
    question: "¿Cuánto tarda la calistenia en dar resultados visibles en mujeres?",
    answer: "La calistenia para mujeres da los primeros resultados de fuerza, energía y postura en 2-3 semanas. Los cambios físicos visibles (más definición en brazos, glúteos y abdomen) suelen aparecer entre la semana 4 y la 8 entrenando 3-5 días por semana de forma constante y combinándolo con buena alimentación. La clave es la continuidad y la progresión gradual, no entrenar más fuerte un día y abandonar.",
  },
  {
    question: "¿Se puede entrenar calistenia con la regla?",
    answer: "Sí, se puede y se recomienda entrenar calistenia durante el ciclo menstrual, adaptando la intensidad a cada fase. En la fase folicular y la ovulación tu fuerza está en pico, ideal para entrenos exigentes; en la fase lútea y los primeros días de regla baja la intensidad, prioriza movilidad, core suave y técnica. Escucha tu cuerpo: el entrenamiento ligero suele aliviar molestias menstruales.",
  },
  {
    question: "¿Necesito material para calistenia para mujeres en casa?",
    answer: "No necesitas material para empezar calistenia en casa: tu peso corporal y 2x2 metros bastan. Como inversión opcional, una barra de dominadas de marco multiplica los ejercicios de tracción (clave para postura y espalda), una esterilla aporta confort en suelo y unas gomas elásticas asisten dominadas y añaden resistencia a sentadillas y glúteos sin dañar articulaciones.",
  },
  {
    question: "¿Cuántos días a la semana entrenar calistenia siendo mujer?",
    answer: "Entrena calistenia 3 días por semana si eres principiante, 4-5 días si eres intermedia y 5-6 días si eres avanzada. La división recomendada para principiantes es full body 3 veces por semana; en intermedio puedes alternar tren superior y tren inferior; en avanzado, dividir empuje, tracción y piernas. Reserva siempre 1-2 días de descanso completo o activo para permitir la recuperación hormonal y muscular.",
  },
  {
    question: "¿Puedo hacer calistenia durante el embarazo o el postparto?",
    answer: "Durante el embarazo puedes hacer calistenia adaptada (sentadillas, remo invertido, plancha lateral, movilidad y respiración) siempre con luz verde médica y evitando ejercicios en supino prolongado a partir del segundo trimestre. En el postparto, espera a la revisión de suelo pélvico (8-12 semanas en parto vaginal, más en cesárea) antes de retomar core directo o impactos. Empieza por respiración hipopresiva, glúteo suave y caminar, y progresa de forma gradual con un profesional.",
  },
  {
    question: "¿La calistenia tonifica piernas y glúteos sin ponerlos voluminosos?",
    answer: "Sí. Las sentadillas, zancadas, hip thrust y sentadilla búlgara con peso corporal son los mejores ejercicios para tonificar piernas y glúteos sin volumen excesivo. Trabajas en rangos de 10-15 repeticiones con tempo controlado, lo que activa la musculatura en su rango completo y genera un efecto de definición y firmeza, no de hipertrofia masiva.",
  },
  {
    question: "¿Es normal sentir más cansancio entrenando con la regla?",
    answer: "Sí, es normal. En los primeros días de menstruación bajan los niveles de estrógeno y progesterona, lo que reduce la energía y aumenta la sensación de fatiga. No es debilidad: es fisiología. Bajar una serie por ejercicio, aumentar descansos y priorizar movilidad suave esos días te permite seguir entrenando sin frustrarte y respetando tu cuerpo.",
  },
];

const CalisteniaMujeres = () => {
  const schemas = useRoutineSchemas({
    routineName: "Calistenia para Mujeres: Rutina y Guía Completa en Casa",
    routineDescription:
      "Guía completa de calistenia para mujeres: beneficios reales, mitos desmontados, rutina en casa sin material, plan progresivo de 4 semanas y adaptación al ciclo menstrual.",
    videoId: "pwjUl5FQLCg",
    videoTitle: "Calistenia para Mujeres - Empezar en Casa Sin Material",
    videoDuration: "PT13M27S",
    uploadDate: "2024-02-10T09:00:00+01:00",
    totalTime: "PT30M",
    breadcrumbs: [
      { name: "Inicio", url: "https://calisthenia.online/" },
      { name: "Rutinas", url: "https://calisthenia.online/programas/" },
      { name: "Calistenia para Mujeres", url: "https://calisthenia.online/calistenia-mujeres/" },
    ],
    rating: {
      itemName: "Calistenia para Mujeres",
      ratingValue: 4.9,
      reviewCount: 217,
      bestRating: 5,
      worstRating: 1,
    },
    steps: [
      { name: "Calentamiento", text: "5-10 minutos de movilidad articular y activación de glúteos y core para preparar el cuerpo." },
      { name: "Tren inferior", text: "Sentadillas, zancadas y puente de glúteo: 3 series de 12 repeticiones cada uno." },
      { name: "Empuje", text: "Flexiones de rodillas o completas según nivel: 3 series de 8-12 repeticiones." },
      { name: "Tirón y postura", text: "Remo invertido en mesa o toalla en puerta: 3 series de 8-10 repeticiones." },
      { name: "Core", text: "Plancha frontal y bird-dog: 3 series de 30 segundos / 10 repeticiones por lado." },
      { name: "Estiramiento", text: "5 minutos de estiramientos suaves de cuádriceps, isquios, glúteos y espalda baja." },
    ],
  });

  const faqSchema = generateFAQSchema(faqs);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Calistenia para Mujeres: Guía y Rutina en Casa",
    description:
      "Guía completa de calistenia para mujeres: beneficios reales, mitos desmontados, rutina en casa sin material, plan progresivo de 4 semanas y adaptación al ciclo menstrual.",
    image: [
      "https://img.youtube.com/vi/pwjUl5FQLCg/maxresdefault.jpg",
      "https://img.youtube.com/vi/pwjUl5FQLCg/hqdefault.jpg",
    ],
    datePublished: "2024-02-10T09:00:00+01:00",
    dateModified: new Date().toISOString(),
    inLanguage: "es-ES",
    author: {
      "@type": "Person",
      name: "Coach Calisthenia Online",
      url: "https://calisthenia.online/",
    },
    publisher: {
      "@type": "Organization",
      name: "Calisthenia Online",
      logo: {
        "@type": "ImageObject",
        url: "https://calisthenia.online/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://calisthenia.online/calistenia-mujeres/",
    },
    articleSection: "Calistenia para mujeres",
    keywords:
      "calistenia para mujeres, calistenia mujer, rutina calistenia mujer, calistenia en casa mujer, calistenia mujeres principiantes",
  };

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Lugar", href: "/programas/" },
    { label: "Calistenia para Mujeres", href: "/calistenia-mujeres/" },
  ];

  return (
    <>
      <Helmet>
        <title>Calistenia para Mujeres: Guía y Rutina en Casa</title>
        <meta
          name="description"
          content="Calistenia para mujeres: guía completa, beneficios reales, mitos desmontados, rutina en casa sin material y plan progresivo de 4 semanas explicado por un coach."
        />
        <meta
          name="keywords"
          content="calistenia para mujeres, calistenia mujeres, calistenia mujer, calistenia en casa mujer, calistenia para mujeres principiantes, rutina calistenia mujer"
        />
        <meta property="og:title" content="Calistenia para Mujeres: Guía y Rutina en Casa" />
        <meta
          property="og:description"
          content="Beneficios, mitos, rutina en casa sin material y plan de 4 semanas de calistenia para mujeres."
        />
        <meta property="og:url" content="https://calisthenia.online/calistenia-mujeres/" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://calisthenia.online/calistenia-mujeres/" />
      </Helmet>

      <StructuredData data={[articleSchema, ...schemas.allSchemas, faqSchema]} />

      <div className="min-h-screen flex flex-col">
        <Header />
        <CommunityStickyBanner />

        <main className="flex-1">
          <StickyTOC items={TOC_ITEMS} />

          {/* Hero */}
          <section className="py-16 md:py-20 bg-gradient-to-br from-pink-50 via-background to-purple-50 dark:from-pink-950/20 dark:via-background dark:to-purple-950/20">
            <div className="container mx-auto px-4">
              <RoutineBreadcrumbs items={breadcrumbItems} />
              <div className="max-w-4xl mx-auto text-center mt-6">
                <Badge className="mb-4 bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/20 hover:bg-pink-500/20">
                  Guía completa para mujeres
                </Badge>
                <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
                  Calistenia para <span className="text-primary">Mujeres</span>: Guía y Rutina en Casa
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Tonifica, gana fuerza real y mejora tu postura entrenando con tu propio peso corporal. Sin gimnasio, sin máquinas y sin el miedo a "ponerse musculosa". Te enseño beneficios, mitos, rutina y plan progresivo de 4 semanas.
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-8">
            <QuickJumpBanner
              text="¿Lista para tu primera sesión?"
              linkText="Ir a la rutina en casa"
              href="#rutina-casa"
              icon="✨"
              variant="primary"
            />
          </div>

          {/* Qué es */}
          <section id="que-es" className="py-12 md:py-16 bg-background scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 text-center">
                  Qué es la <span className="text-primary">calistenia para mujeres</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  La calistenia para mujeres es la misma disciplina que practica cualquier otra persona: entrenar fuerza, control y resistencia usando el <strong>propio peso corporal</strong>, en casa o en un parque, sin necesidad de pesas ni máquinas. La diferencia no está en los ejercicios, sino en cómo se programa la progresión y en qué objetivos se priorizan: <strong>tonificar, mejorar postura, ganar fuerza funcional</strong> y construir un cuerpo atlético sin obsesionarse con la báscula.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Si estás dando tus primeros pasos te recomiendo empezar por la <Link to="/calistenia-principiantes/" className="text-primary hover:underline font-medium underline-offset-4">guía de calistenia para principiantes</Link> y, en paralelo, seguir esta página para entender cómo adaptar el entrenamiento a tu cuerpo y a tu ciclo. Si ya entrenas en casa, la <Link to="/rutina-calistenia-en-casa/" className="text-primary hover:underline font-medium underline-offset-4">rutina de calistenia en casa</Link> es el complemento perfecto.
                </p>
              </div>
            </div>
          </section>

          {/* Beneficios */}
          <section id="beneficios" className="py-12 md:py-16 bg-muted/40 scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-center">
                  Beneficios reales de la calistenia para mujeres
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                  Más allá de la estética, la calistenia te aporta beneficios funcionales que cambian cómo te sientes en tu día a día.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-elegant transition-shadow">
                    <CardContent className="p-6">
                      <Sparkles className="w-10 h-10 text-pink-500 mb-3" />
                      <h3 className="font-bold text-lg mb-2">Tonificación sin volumen</h3>
                      <p className="text-sm text-muted-foreground">
                        Defines brazos, glúteos y abdomen sin ganar masa excesiva, gracias a la sobrecarga progresiva con peso corporal.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-elegant transition-shadow">
                    <CardContent className="p-6">
                      <Shield className="w-10 h-10 text-primary mb-3" />
                      <h3 className="font-bold text-lg mb-2">Salud ósea y articular</h3>
                      <p className="text-sm text-muted-foreground">
                        El trabajo de fuerza con peso corporal aumenta la densidad ósea, clave para prevenir osteoporosis a partir de los 30.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-elegant transition-shadow">
                    <CardContent className="p-6">
                      <Heart className="w-10 h-10 text-red-500 mb-3" />
                      <h3 className="font-bold text-lg mb-2">Salud cardiovascular</h3>
                      <p className="text-sm text-muted-foreground">
                        Los circuitos elevan pulsaciones y mejoran la capacidad aeróbica sin necesidad de horas de cardio.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-elegant transition-shadow">
                    <CardContent className="p-6">
                      <TrendingUp className="w-10 h-10 text-green-500 mb-3" />
                      <h3 className="font-bold text-lg mb-2">Postura y core fuerte</h3>
                      <p className="text-sm text-muted-foreground">
                        Trabajar tracción y <Link to="/rutina-core-calistenia/" className="text-primary hover:underline font-medium underline-offset-4">core</Link> alivia dolores de espalda y mejora la postura en pocas semanas.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-elegant transition-shadow">
                    <CardContent className="p-6">
                      <Flame className="w-10 h-10 text-orange-500 mb-3" />
                      <h3 className="font-bold text-lg mb-2">Pérdida de grasa</h3>
                      <p className="text-sm text-muted-foreground">
                        Combinar fuerza y HIIT mantiene tu masa muscular mientras pierdes grasa, evitando el efecto rebote.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-elegant transition-shadow">
                    <CardContent className="p-6">
                      <Users className="w-10 h-10 text-purple-500 mb-3" />
                      <h3 className="font-bold text-lg mb-2">Confianza y autonomía</h3>
                      <p className="text-sm text-muted-foreground">
                        Hacer tu primera dominada o tu primera flexión completa cambia cómo te ves a ti misma. Cuesta. Y compensa.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Mitos */}
          <section id="mitos" className="py-12 md:py-16 bg-background scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-center">
                  Mitos sobre la calistenia para mujeres
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                  Desmontamos los miedos más habituales que frenan a muchas mujeres antes de empezar.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      mito: "\"Me voy a poner musculosa como un hombre\"",
                      verdad: "Falso. La testosterona femenina es 10-20 veces menor que la masculina, lo que limita de forma natural la hipertrofia. Conseguirás un cuerpo tonificado y atlético, no voluminoso. Para llegar a un físico claramente musculado haría falta entrenamiento extremo durante años (y normalmente, ayuda farmacológica).",
                    },
                    {
                      mito: "\"Necesito hacer pesas para tonificar\"",
                      verdad: "Falso. Tu peso corporal aplicado correctamente con sobrecarga progresiva (más reps, menos descanso, variantes más exigentes) genera el mismo estímulo de hipertrofia y fuerza que las pesas para una mujer no avanzada.",
                    },
                    {
                      mito: "\"La calistenia es solo para hombres jóvenes y atléticos\"",
                      verdad: "Falso. La calistenia se adapta a cualquier nivel y edad: existen progresiones de cada ejercicio que parten desde lo más básico (flexiones de pared, sentadillas a silla) hasta lo más avanzado.",
                    },
                    {
                      mito: "\"Si entreno fuerte se me retira la regla\"",
                      verdad: "Solo ocurre en casos de sobreentrenamiento severo combinado con déficit calórico extremo (la llamada tríada de la atleta). Entrenar 3-5 días con calistenia y comer suficiente no provoca amenorrea.",
                    },
                    {
                      mito: "\"El cardio es mejor para perder peso que la calistenia\"",
                      verdad: "Falso. La calistenia con circuitos eleva el gasto calórico igual o más que el cardio tradicional y, además, conserva masa muscular, lo que mantiene tu metabolismo alto a largo plazo.",
                    },
                  ].map((item, i) => (
                    <Card key={i} className="border-l-4 border-pink-500">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3 mb-3">
                          <AlertCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-0.5" />
                          <h3 className="font-bold text-lg">{item.mito}</h3>
                        </div>
                        <div className="flex items-start gap-3 ml-9">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground">{item.verdad}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Vídeo guiado */}
          <section id="video-rutina" className="py-12 md:py-16 bg-muted/40 scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-center">
                  Vídeo guiado: empieza calistenia desde casa
                </h2>
                <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Una sesión completa para mujeres principiantes, sin material y explicada paso a paso.
                </p>
                <VideoEmbed
                  videoId="pwjUl5FQLCg"
                  title="Calistenia para Mujeres - Empezar en Casa Sin Material"
                />
              </div>
            </div>
          </section>

          {/* Rutina en casa */}
          <section id="rutina-casa" className="py-12 md:py-16 bg-background scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-center">
                  Rutina de calistenia para mujeres en casa
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                  Una sesión full body de 30 minutos, sin material, perfecta como punto de partida. Repítela 3 veces por semana en días alternos.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: "Calentamiento", detail: "5 min: rotaciones de cadera, círculos de brazos, sentadillas suaves y bird-dog lento." },
                    { name: "Sentadillas", detail: "3 series de 12 repeticiones · descanso 45s · técnica antes que velocidad." },
                    { name: "Flexiones de rodillas", detail: "3 series de 8-10 repeticiones · descanso 60s · cuando bajes con control, pasa a flexiones completas." },
                    { name: "Puente de glúteo", detail: "3 series de 12 repeticiones · aprieta glúteo arriba 2 segundos." },
                    { name: "Remo invertido (mesa o toalla en puerta)", detail: "3 series de 8 repeticiones · clave para postura y espalda." },
                    { name: "Zancadas alternas", detail: "3 series de 10 por pierna · descanso 60s · puedes dar paso adelante o atrás." },
                    { name: "Plancha frontal", detail: "3 series de 30-45 segundos · cadera neutra, abdomen apretado." },
                    { name: "Bird-dog", detail: "3 series de 10 repeticiones por lado · estabiliza core y zona lumbar." },
                    { name: "Estiramiento", detail: "5 min: cuádriceps, isquios, glúteos, espalda baja y pecho." },
                  ].map((b, i) => (
                    <Card key={i} className="hover:shadow-elegant transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                            {i + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1">{b.name}</h3>
                            <p className="text-sm text-muted-foreground">{b.detail}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <p className="text-center text-muted-foreground mt-10 max-w-3xl mx-auto">
                  Si quieres trabajar zonas concretas más a fondo, combina esta rutina con la <Link to="/rutina-piernas-calistenia/" className="text-primary hover:underline font-medium underline-offset-4">rutina de piernas con calistenia</Link>, la <Link to="/rutina-core-calistenia/" className="text-primary hover:underline font-medium underline-offset-4">rutina de core</Link> o la <Link to="/rutina-espalda-calistenia/" className="text-primary hover:underline font-medium underline-offset-4">rutina de espalda con calistenia</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Plan 4 semanas */}
          <section id="plan-4-semanas" className="py-12 md:py-16 bg-muted/40 scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10 max-w-3xl mx-auto">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    Plan progresivo · 4 semanas
                  </span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
                    Plan de calistenia para mujeres: <span className="text-primary">progresión 4 semanas</span>
                  </h2>
                  <p className="text-muted-foreground">
                    De adaptación a intensidad y deload. Un mes completo para construir base, ganar tono y medir tu progreso real.
                  </p>
                </div>

                <Card className="border-primary/10 bg-background/60 mb-6">
                  <CardContent className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-bold mb-1">Frecuencia</p>
                      <p className="text-muted-foreground">3 días/semana (lun · mié · vie)</p>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Duración</p>
                      <p className="text-muted-foreground">25-35 min por sesión</p>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Tempo</p>
                      <p className="text-muted-foreground">3-1-2 (bajada-pausa-subida)</p>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Calentamiento</p>
                      <p className="text-muted-foreground">5 min movilidad + activación</p>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="semana-1" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-transparent p-0">
                    {WEEKS_PLAN.map((w) => (
                      <TabsTrigger
                        key={w.id}
                        value={w.id}
                        className="flex flex-col items-start gap-1 p-4 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border rounded-xl"
                      >
                        <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                          {w.label}
                        </span>
                        <span className="font-display font-bold text-base text-left">{w.phase}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {WEEKS_PLAN.map((w) => (
                    <TabsContent key={w.id} value={w.id} className="mt-6">
                      <Card className="border-primary/20">
                        <CardContent className="p-6 md:p-8 space-y-5">
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                              {w.phase}
                            </Badge>
                            <Badge variant="outline">{w.rpe}</Badge>
                          </div>
                          <p className="text-base text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Objetivo:</strong> {w.goal}
                          </p>
                          <div className="overflow-x-auto rounded-lg border border-border">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/60 hover:bg-muted/60">
                                  <TableHead>Ejercicio</TableHead>
                                  <TableHead className="text-center">Series</TableHead>
                                  <TableHead className="text-center">Reps</TableHead>
                                  <TableHead className="text-center">Descanso</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {w.exercises.map((ex) => (
                                  <TableRow key={ex.name}>
                                    <TableCell className="font-medium">{ex.name}</TableCell>
                                    <TableCell className="text-center">{ex.sets}</TableCell>
                                    <TableCell className="text-center">{ex.reps}</TableCell>
                                    <TableCell className="text-center text-muted-foreground">{ex.rest}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                            <p className="text-sm text-muted-foreground">
                              <strong className="text-primary">Nota del coach:</strong> {w.coachNote}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="max-w-4xl mx-auto mt-10">
                  <TrialCTA variant="inline" utmMedium="calistenia-mujeres-plan" />
                </div>
              </div>
            </div>
          </section>

          {/* Ciclo menstrual */}
          <section id="ciclo" className="py-12 md:py-16 bg-background scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-center">
                  Calistenia y ciclo menstrual
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                  Adaptar la intensidad a las fases del ciclo no es opcional: es lo que separa entrenar bien de quemarte.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      fase: "Fase menstrual (días 1-5)",
                      reco: "Intensidad baja. Prioriza movilidad, core suave, estiramientos y caminar. Si te sientes con energía, una sesión ligera puede aliviar molestias.",
                    },
                    {
                      fase: "Fase folicular (días 6-13)",
                      reco: "Intensidad alta. Tu fuerza está en pico: aprovecha para retos, progresar repeticiones y atacar variantes más exigentes (flexiones diamante, pistol asistida).",
                    },
                    {
                      fase: "Ovulación (días 14-15)",
                      reco: "Pico máximo de fuerza. Ideal para tu sesión más exigente de la semana o para intentar tu primera dominada.",
                    },
                    {
                      fase: "Fase lútea (días 16-28)",
                      reco: "Intensidad descendente. Mantén el volumen pero baja la intensidad y aumenta descansos. Prioriza técnica y core.",
                    },
                  ].map((f, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <Target className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-bold text-lg mb-1">{f.fase}</h3>
                            <p className="text-sm text-muted-foreground">{f.reco}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Errores comunes */}
          <section id="errores" className="py-12 md:py-16 bg-muted/40 scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-center">
                  Errores comunes que frenan tu progreso
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                  Los tropiezos más habituales que veo en mujeres que empiezan calistenia. Detéctalos y ahorra meses de estancamiento.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { t: "Hacer solo cardio y abandonar la fuerza", d: "El cardio sin fuerza acelera la pérdida de músculo. Sin músculo no hay tono y el metabolismo se ralentiza." },
                    { t: "Comer demasiado poco", d: "Un déficit excesivo frena el progreso, baja la energía y altera el ciclo. Calcula 1,6-2g de proteína por kilo y mantén un déficit moderado." },
                    { t: "Esperar resultados en 7 días", d: "Los cambios visibles aparecen entre la semana 4 y 8. Antes ya notarás fuerza y energía: agárrate a esa señal." },
                    { t: "No registrar repeticiones ni series", d: "Sin medir no progresas. Anota cada sesión: repeticiones, descanso y sensación. La sobrecarga progresiva es la clave de todo." },
                    { t: "Saltarse el trabajo de tracción", d: "Sin remos invertidos ni dominadas asistidas, la postura se resiente y la espalda se queda débil. Tracción cada semana, sí o sí." },
                    { t: "No descansar lo suficiente", d: "Más no es mejor. Sin 1-2 días de descanso completo o activo, no recuperas y aumentan lesiones y fatiga hormonal." },
                    { t: "Saltarse el calentamiento", d: "5 minutos de movilidad articular y activación de glúteos previenen lesiones y mejoran la calidad de cada serie. No es opcional." },
                    { t: "Obsesionarse con la báscula", d: "El peso fluctúa por agua, ciclo y glucógeno. Mide cintura, fotos mensuales y repeticiones: son indicadores mucho más fiables del progreso." },
                    { t: "Compararte con entrenamientos masculinos", d: "La fuerza relativa, recuperación y respuesta hormonal son distintas. Sigue una progresión adaptada a ti, no copies rutinas pensadas para hombres." },
                    { t: "Ignorar el ciclo menstrual", d: "Entrenar igual los 28 días te lleva al estancamiento. Adapta intensidad y volumen a cada fase para rendir mejor sin quemarte." },
                  ].map((e, i) => (
                    <Card key={i} className="border-l-4 border-destructive">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2 flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                          {e.t}
                        </h3>
                        <p className="text-sm text-muted-foreground ml-7">{e.d}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <p className="text-center text-muted-foreground mt-10 max-w-3xl mx-auto">
                  Si quieres una progresión guiada paso a paso, descubre nuestros <Link to="/programas/" className="text-primary hover:underline font-medium underline-offset-4">programas de calistenia</Link> o, cuando domines lo básico, da el salto a la <Link to="/calistenia-nivel-avanzado/" className="text-primary hover:underline font-medium underline-offset-4">calistenia de nivel avanzado</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-12 md:py-16 bg-background scroll-mt-24">
            <div className="container mx-auto px-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
                Preguntas frecuentes sobre <span className="text-primary">calistenia para mujeres</span>
              </h2>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-4">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg px-6 border">
                      <AccordionTrigger className="hover:no-underline text-left">
                        <span className="font-bold">{f.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {f.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CalisteniaMujeres;
