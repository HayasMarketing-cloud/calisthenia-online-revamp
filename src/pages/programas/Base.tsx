import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  PhoneCall,
  Smartphone,
  TrendingUp,
  Video,
  ClipboardCheck,
  Home,
  Trees,
  Dumbbell,
  Activity,
  Zap,
  HeartPulse,
  Sparkles,
  ArrowDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/seo/StructuredData";
import {
  generateCourseSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/schemas";
import nicolasPhoto from "@/assets/nicolas-reyero.jpg";
import raulPhoto from "@/assets/testimonial-raul.jpg";
import charliePhoto from "@/assets/testimonial-charlie.jpg";
import isabelPhoto from "@/assets/testimonial-isabel.png";

// === CONFIG ===
// Formulario GHL (mismo flujo que Coaching; cambia el ID aquí si BASE tiene uno propio)
const GHL_FORM_ID = "sbWhGZBx1i4npEeAZgKy";
const GHL_FORM_URL = `https://link.calisthenia.online/widget/form/${GHL_FORM_ID}`;
const GHL_FORM_NAME = "Formulario lead Programa BASE";

const WHATSAPP_PHONE = "34645079692";
const buildWhatsAppUrl = (
  message = "Hola Nico, me interesa el Programa BASE de calistenia y me gustaría reservar una llamada de onboarding para valorar mi situación."
) => `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const heroBullets = [
  "Entrena desde casa, parque o donde quieras",
  "Adaptado a tu punto de partida real",
  "Sin experiencia previa necesaria",
  "Seguimiento personalizado por Nico",
  "Revisión técnica por WhatsApp",
  "Sesiones de 30-45 minutos",
];

const audiences = [
  { icon: Activity, label: "Personas +30 años" },
  { icon: Smartphone, label: "Sedentarios y teletrabajadores" },
  { icon: HeartPulse, label: "Personas con sobrepeso" },
  { icon: Sparkles, label: "Que nunca han entrenado" },
  { icon: Zap, label: "Con poca movilidad o molestias" },
  { icon: Dumbbell, label: "Quieren empezar sin lesionarse" },
  { icon: TrendingUp, label: "Buscan hábitos sostenibles" },
];

const problems = [
  "Rigidez corporal",
  "Falta de energía",
  "Dolor de espalda o cuello",
  "Sedentarismo",
  "Sobrepeso",
  "Pérdida de fuerza",
  "Falta de hábito",
  "Baja movilidad",
];

const transformationFrom = ["Cansancio", "Rigidez", "Poca fuerza", "Mala condición física"];
const transformationTo = ["Mayor movilidad", "Mejor postura", "Más energía", "Capacidad funcional"];

const pillars = [
  "Movilidad articular",
  "Fuerza funcional",
  "Resistencia",
  "Estabilidad",
  "Control corporal",
];

const howItWorks = [
  {
    icon: ClipboardCheck,
    title: "1. Evaluamos tu punto de partida",
    text: "Formulario inicial, llamada de onboarding y, opcionalmente, fotos o vídeos para analizar tu nivel, movilidad y condición física.",
  },
  {
    icon: Smartphone,
    title: "2. Accedes a tu área privada",
    text: "Plan personalizado dentro de la app: calendario, ejercicios del día, vídeos explicativos y seguimiento de tu progreso.",
  },
  {
    icon: TrendingUp,
    title: "3. Entrenas y adaptamos el programa",
    text: "Revisamos tu evolución cada semana y ajustamos el plan mensualmente según tu rendimiento y sensaciones.",
  },
  {
    icon: Video,
    title: "4. Revisamos tu técnica por WhatsApp",
    text: "Envías vídeos de tus ejercicios y recibes correcciones personalizadas para moverte mejor y evitar lesiones.",
  },
];

const included = [
  "Programa personalizado de 12 semanas",
  "3-4 sesiones semanales de 30-45 min",
  "Área privada de entrenamiento",
  "Vídeos explicativos de cada ejercicio",
  "Calendario completo de sesiones",
  "Seguimiento del progreso",
  "Adaptación mensual del programa",
  "Revisión técnica semanal por WhatsApp",
  "Evaluación inicial y onboarding",
  "Soporte y acompañamiento personalizado",
];

const forYouIf = [
  "Quieres empezar a entrenar desde cero",
  "Llevas mucho tiempo sin moverte",
  "Te notas rígido o con molestias leves",
  "Quieres mejorar sin lesionarte",
  "Buscas un plan adaptado a tu situación real",
  "Te cuesta mantener constancia tú solo",
  "Quieres entrenar desde casa o al aire libre",
  "Necesitas una guía clara y seguimiento humano",
];

const youWillGet = [
  "Mejorar movilidad y flexibilidad",
  "Ganar fuerza funcional real",
  "Reducir la rigidez corporal",
  "Mejorar tu postura",
  "Más energía en tu día a día",
  "Crear una rutina sostenible",
  "Sentirte más ágil y capaz",
  "Recuperar confianza entrenando",
];

const faqs = [
  {
    q: "¿Necesito experiencia previa?",
    a: "No. BASE está diseñado precisamente para personas que quieren empezar desde cero o llevan mucho tiempo sin entrenar.",
  },
  {
    q: "¿Puedo entrenar desde casa?",
    a: "Sí. El programa funciona perfectamente en casa, al aire libre o en gimnasio.",
  },
  {
    q: "¿Necesito material?",
    a: "La mayoría de ejercicios pueden hacerse sin material o utilizando únicamente bandas elásticas.",
  },
  {
    q: "¿Cómo funciona el seguimiento?",
    a: "Tienes seguimiento personalizado durante todo el programa y revisión técnica mediante vídeos enviados por WhatsApp.",
  },
  {
    q: "¿Cuánto duran las sesiones?",
    a: "Entre 30 y 45 minutos, 3-4 días por semana. Compatible con cualquier agenda.",
  },
  {
    q: "¿Cómo sé si BASE es para mí?",
    a: "En la llamada inicial de onboarding valoramos tu situación, objetivos y nivel para confirmar si BASE es el programa adecuado para ti.",
  },
  {
    q: "¿Qué ocurre después de las 12 semanas?",
    a: "Muchas personas renuevan o avanzan al programa CONTROL para volver a entrenar con más volumen, y posteriormente a ELITE si buscan rendimiento.",
  },
];

const Base = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  // Cargar script de embed de GHL
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.calisthenia.online/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const scrollToCta = () =>
    ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const canonical = "https://calisthenia.online/programas/base/";

  const courseSchema = {
    ...generateCourseSchema({
      name: "Programa BASE - Iniciación a la calistenia (12 semanas)",
      description:
        "Programa de iniciación a la calistenia online de 12 semanas para personas sedentarias, +30, sin experiencia previa o que quieren empezar a entrenar sin lesionarse. Incluye evaluación inicial, área privada, seguimiento personalizado y revisión técnica por WhatsApp.",
      provider: "Calistenia Online",
      providerUrl: "https://calisthenia.online",
      url: canonical,
      courseMode: "online",
      educationalLevel: "Principiante",
      image: "https://calisthenia.online/lovable-uploads/f3b95d09-dfd8-4644-9fcb-11a257a02133.png",
      hasCourseInstance: {
        courseMode: "Online",
        instructor: "Nicolás Reyero",
        courseWorkload: "2-3 horas/semana",
      },
      syllabusSections: [
        { name: "Evaluación inicial y onboarding", description: "Análisis de nivel, movilidad, objetivos y condición física", position: 1 },
        { name: "Movilidad y activación", description: "Recuperar amplitud articular y reducir rigidez", position: 2 },
        { name: "Fuerza funcional progresiva", description: "Construir base de fuerza con peso corporal", position: 3 },
        { name: "Resistencia y estabilidad", description: "Mejorar condición física y control corporal", position: 4 },
        { name: "Hábitos sostenibles", description: "Construir una rutina realista y mantenible a largo plazo", position: 5 },
      ],
    }),
    audience: {
      "@type": "EducationalAudience",
      audienceType: "Adultos +30 sedentarios o sin experiencia previa",
    },
  };

  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: "https://calisthenia.online/" },
    { name: "Programas", url: "https://calisthenia.online/programas/" },
    { name: "BASE", url: canonical },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Programa de Calistenia desde Cero | Iniciación +30 Online</title>
        <meta
          name="description"
          content="Programa BASE: 12 semanas de calistenia desde cero online para mayores de 30, sedentarios o sin experiencia. Recupera movilidad y fuerza funcional con Nico."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Programa de Calistenia desde Cero | Iniciación +30 Online" />
        <meta
          property="og:description"
          content="Cómo empezar calistenia con un plan de 12 semanas online para sedentarios y mayores de 30. Movilidad articular, fuerza funcional y seguimiento personalizado."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
      </Helmet>

      <StructuredData data={[courseSchema, faqSchema, breadcrumbSchema]} />

      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <nav
          aria-label="Migas de pan"
          className="container mx-auto px-4 pt-24 pb-2 text-sm text-muted-foreground"
        >
          <ol className="flex items-center flex-wrap gap-1">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Inicio
              </Link>
            </li>
            <ChevronRight className="w-4 h-4" />
            <li>
              <Link to="/programas/" className="hover:text-primary transition-colors">
                Programas
              </Link>
            </li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground font-medium">BASE</li>
          </ol>
        </nav>

        {/* HERO */}
        <section className="relative bg-gradient-to-br from-secondary via-secondary to-secondary/95 text-white pt-10 pb-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 px-4 py-2 text-sm md:text-base">
                <Sparkles className="w-4 h-4 mr-2" />
                PROGRAMA BASE · 12 semanas · Online
              </Badge>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Programa de calistenia desde cero para{" "}
                <span className="text-primary">volver a moverte con fuerza</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Programa de iniciación a la calistenia online para personas +30,
                sedentarias o sin experiencia previa. Recupera movilidad, gana
                fuerza funcional y construye hábitos sostenibles con seguimiento
                personalizado.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto text-left pt-2">
                {heroBullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-white/90">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button
                  size="lg"
                  onClick={scrollToCta}
                  className="text-base px-8 rounded-full"
                >
                  <PhoneCall className="mr-2 h-5 w-5" />
                  Reservar llamada de onboarding
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-base px-8 rounded-full bg-transparent border-white/40 text-white hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors"
                >
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="mr-2 h-5 w-5" />
                    Hablar por WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* PARA QUIÉN ES */}
        <section className="py-16 md:py-20 px-4 bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
                Para quién es
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Para quién es este programa de iniciación a la calistenia
              </h2>
              <p className="text-muted-foreground text-lg mt-3 max-w-2xl mx-auto">
                Si te identificas con alguno de estos perfiles, este programa es tu
                punto de partida ideal.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {audiences.map(({ icon: Icon, label }) => (
                <Card
                  key={label}
                  className="border-2 hover:border-primary/40 transition-colors"
                >
                  <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLEMAS QUE RESUELVE */}
        <section className="py-16 md:py-20 px-4 bg-muted/40">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Cómo empezar calistenia si llevas años sin entrenar
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Sentirte rígido, cansado o fuera de forma no tiene por qué ser tu
              normalidad.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {problems.map((p) => (
                <span
                  key={p}
                  className="px-4 py-2 rounded-full bg-background border-2 border-border text-foreground font-medium text-sm md:text-base"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSFORMACIÓN */}
        <section className="py-16 md:py-20 px-4 bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Recupera movilidad articular y fuerza desde el primer día
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                En 12 semanas tu cuerpo cambia de aquí a aquí.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <Card className="border-2 border-destructive/30 bg-destructive/5">
                <CardContent className="p-6 md:p-8">
                  <p className="text-sm uppercase tracking-wider text-destructive font-bold mb-4">
                    Hoy
                  </p>
                  <ul className="space-y-3">
                    {transformationFrom.map((t) => (
                      <li key={t} className="flex items-center gap-3 text-foreground/80">
                        <span className="w-2 h-2 rounded-full bg-destructive shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="hidden md:flex justify-center">
                <ArrowRight className="w-10 h-10 text-primary" />
              </div>
              <div className="flex md:hidden justify-center -my-2">
                <ArrowDown className="w-8 h-8 text-primary" />
              </div>

              <Card className="border-2 border-primary/40 bg-primary/5 md:col-start-2 md:row-start-1">
                <CardContent className="p-6 md:p-8">
                  <p className="text-sm uppercase tracking-wider text-primary font-bold mb-4">
                    En 12 semanas
                  </p>
                  <ul className="space-y-3">
                    {transformationTo.map((t) => (
                      <li key={t} className="flex items-center gap-3 text-foreground/90 font-medium">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* QUÉ ES BASE */}
        <section className="py-16 md:py-20 px-4 bg-muted/40">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
                Qué es BASE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Calistenia funcional para sedentarios y mayores de 30
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                BASE es el programa inicial de Calisthenia Online. Trabajamos de
                forma progresiva los cinco pilares de una buena condición física:
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {pillars.map((p, i) => (
                <div
                  key={p}
                  className="bg-background border-2 border-border rounded-xl p-4 text-center"
                >
                  <p className="text-xs text-primary font-bold mb-1">0{i + 1}</p>
                  <p className="font-semibold text-foreground text-sm">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
                Cómo funciona
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Cómo funciona el plan de calistenia de 12 semanas
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {howItWorks.map((step) => {
                const Icon = step.icon;
                return (
                  <Card
                    key={step.title}
                    className="border-2 hover:border-primary/40 transition-colors"
                  >
                    <CardContent className="p-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.text}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* EVALUACIÓN INICIAL — bloque destacado */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-2 border-primary/40 shadow-elegant">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <ClipboardCheck className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <Badge className="bg-primary/15 text-primary hover:bg-primary/25">
                      Evaluación inicial incluida
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      Empezamos desde tu situación real
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      Antes de empezar realizamos una evaluación inicial para
                      adaptar el programa desde el primer día. Analizamos:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {["Tu nivel actual", "Tus objetivos", "Tu experiencia previa", "Tu movilidad", "Tu condición física"].map((i) => (
                        <li key={i} className="flex items-start gap-2 text-foreground">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        La evaluación se realiza mediante <strong>formulario inicial</strong>,
                        <strong> llamada de onboarding</strong> y, opcionalmente,
                        <strong> fotos o vídeos</strong> para analizar mejor tu punto de partida.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* QUÉ INCLUYE */}
        <section className="py-16 md:py-20 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Qué incluye el programa BASE
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Todo lo que necesitas para empezar bien y mantenerte constante.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {included.map((f) => (
                <div
                  key={f}
                  className="flex items-start gap-3 bg-muted/40 rounded-xl p-5 border-2 border-border"
                >
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MATERIAL NECESARIO */}
        <section className="py-16 md:py-20 px-4 bg-muted/40">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Entrenamiento funcional para principiantes en casa, parque o gimnasio
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              BASE está diseñado para que puedas entrenar en cualquier lugar. La
              mayoría de ejercicios se hacen sin material o con bandas elásticas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Home, title: "Desde casa", text: "Sin equipamiento o con bandas elásticas" },
                { icon: Trees, title: "Al aire libre", text: "Parque, barras o calistenia urbana" },
                { icon: Dumbbell, title: "En gimnasio", text: "Adaptamos según tu equipamiento" },
              ].map(({ icon: Icon, title, text }) => (
                <Card key={title} className="border-2">
                  <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{title}</h3>
                    <p className="text-muted-foreground text-sm">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PARA TI SI / VAS A CONSEGUIR */}
        <section className="py-16 md:py-20 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5">
                    Este programa es para ti si…
                  </h3>
                  <ul className="space-y-3">
                    {forYouIf.map((i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/40 bg-primary/5">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5">
                    Lo que vas a conseguir
                  </h3>
                  <ul className="space-y-3">
                    {youWillGet.map((i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90">
                        <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="py-16 md:py-20 px-4 bg-primary">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-primary-foreground mb-12">
              Personas como tú ya lo han hecho
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Raúl Mollá",
                  location: "Alicante",
                  quote:
                    "Empecé desde 0 y muy tieso, ahora no me levanto con dolores y hago 10 dominadas fáciles.",
                  image: raulPhoto,
                },
                {
                  name: "Charlie",
                  location: "Madrid",
                  quote:
                    "Necesitaba una guía para aumentar mi fuerza, movilidad y habilidades de calistenia.",
                  image: charliePhoto,
                },
                {
                  name: "Isabel",
                  location: "Cataluña",
                  quote:
                    "Estoy súper contenta y motivada, tengo menos dolores y más fuerza en mis articulaciones.",
                  image: isabelPhoto,
                },
              ].map((t) => (
                <Card key={t.name} className="bg-background border-0 shadow-xl">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={t.image}
                        alt={`Foto de ${t.name}, alumno de Calisthenia Online`}
                        loading="lazy"
                        className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-primary/20"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-primary leading-tight">
                          {t.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{t.location}</p>
                      </div>
                    </div>
                    <p className="text-foreground/90 leading-relaxed">
                      <span className="text-primary text-2xl font-bold leading-none mr-1">
                        ”
                      </span>
                      {t.quote}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE NICO */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 items-center">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={nicolasPhoto}
                  alt="Nicolás Reyero, coach de Calisthenia Online"
                  className="w-full h-full object-cover aspect-[3/4]"
                />
              </div>
              <div className="space-y-5">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  Tu coach
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Entrena acompañado por Nico Reyero
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Detrás de Calisthenia Online está Nico Reyero, entrenador
                  especializado en entrenamiento funcional y calistenia.
                </p>
                <p className="text-foreground text-lg leading-relaxed">
                  El objetivo no es solo que entrenes más, sino ayudarte a{" "}
                  <strong>moverte mejor, ganar fuerza real, mejorar tu condición física</strong>{" "}
                  y construir hábitos sostenibles a largo plazo.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Durante el programa tendrás seguimiento personalizado y
                  adaptación continua para que el entrenamiento evolucione contigo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTINUIDAD */}
        <section className="py-16 md:py-20 px-4 bg-muted/40">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Esto no termina en 12 semanas
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Muchas personas continúan entrenando después de BASE porque
                encuentran una rutina sostenible y quieren seguir evolucionando.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 hover:border-primary/40 transition-colors">
                <CardContent className="p-6 md:p-8 space-y-3">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    Siguiente paso
                  </Badge>
                  <h3 className="text-2xl font-bold text-foreground">CONTROL</h3>
                  <p className="text-muted-foreground">
                    Para personas que ya tienen una base y quieren volver a entrenar
                    con más volumen y progresión continua.
                  </p>
                  <Link
                    to="/programas/"
                    className="inline-flex items-center text-primary font-semibold hover:underline pt-2"
                  >
                    Ver programas
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-primary/40 transition-colors">
                <CardContent className="p-6 md:p-8 space-y-3">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    Avanzado
                  </Badge>
                  <h3 className="text-2xl font-bold text-foreground">ELITE</h3>
                  <p className="text-muted-foreground">
                    Para quienes buscan rendimiento, habilidades avanzadas de
                    calistenia y entrenamiento de alto nivel.
                  </p>
                  <Link
                    to="/programas/"
                    className="inline-flex items-center text-primary font-semibold hover:underline pt-2"
                  >
                    Ver programas
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 px-4 bg-background">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Preguntas frecuentes sobre el programa de iniciación
              </h2>
              <p className="text-muted-foreground text-lg">
                Si te queda alguna duda, escríbenos por WhatsApp.
              </p>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border-2 rounded-lg px-5"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA FINAL */}
        <section
          ref={ctaRef}
          className="py-20 md:py-28 px-4 bg-gradient-to-br from-secondary via-secondary to-primary/30"
        >
          <div className="container mx-auto max-w-2xl text-center text-white space-y-6">
            <Badge className="bg-primary text-primary-foreground hover:bg-primary px-4 py-2">
              Llamada gratuita · Sin compromiso
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Empieza a construir una versión más fuerte y móvil de ti mismo
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Reserva una llamada de onboarding para valorar tu situación y
              descubrir si BASE es el programa adecuado para ti.
            </p>

            <Card className="border-2 border-white/20 shadow-2xl overflow-hidden mt-4">
              <CardContent className="p-0">
                <div className="bg-white" style={{ minHeight: "560px" }}>
                  <iframe
                    src={GHL_FORM_URL}
                    style={{
                      width: "100%",
                      height: "560px",
                      border: "none",
                      borderRadius: "6px",
                    }}
                    id={`inline-${GHL_FORM_ID}`}
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name={GHL_FORM_NAME}
                    data-height="551"
                    data-layout-iframe-id={`inline-${GHL_FORM_ID}`}
                    data-form-id={GHL_FORM_ID}
                    title={GHL_FORM_NAME}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 rounded-full bg-transparent border-white/40 text-white hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors"
              >
                <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-2 h-5 w-5" />
                  Prefiero WhatsApp
                </a>
              </Button>
            </div>
            <p className="text-sm text-white/70 pt-2">
              Respondemos en menos de 24h en horario laboral.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Base;
