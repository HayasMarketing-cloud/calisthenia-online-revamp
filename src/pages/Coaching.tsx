import { useEffect, useRef, useState } from "react";
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
import { ArrowRight, Check, MessageCircle, PhoneCall, Sparkles, Star, Target, Users, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import nicolasPhoto from "@/assets/nicolas-reyero.jpg";
import carlosPhoto from "@/assets/carlos-plaza.jpg";
import raulPhoto from "@/assets/testimonial-raul.jpg";
import charliePhoto from "@/assets/testimonial-charlie.jpg";

// === CONFIGURACIÓN (afinable después) ===
const GHL_FORM_URL =
  "https://link.calisthenia.online/widget/form/JYFtKJd7tgX86dXtbRhS";
const GHL_FORM_ID = "JYFtKJd7tgX86dXtbRhS";

// Vídeo del canal de Nico para esta campaña
const YOUTUBE_VIDEO_ID = "fzk_o2qyXDY";

// TODO: confirmar número de WhatsApp para esta campaña
const WHATSAPP_PHONE = "34645079692";

const buildWhatsAppUrl = (
  message = "Hola Carlos y Nico, he visto el vídeo de la formación y me gustaría reservar una llamada para ver si encajo con vuestro coaching."
) => {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
};

// Icono WhatsApp (verde #25D366 en hover, según design system del proyecto)
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Persistencia en sessionStorage para no volver a pedir el formulario en la misma sesión
const UNLOCK_KEY = "coaching_pricing_unlocked";

const howItWorks = [
  {
    icon: PhoneCall,
    title: "1. Reservas tu llamada gratuita",
    text: "20 minutos por WhatsApp o videollamada. Nos cuentas tu situación, tu nivel y tus objetivos.",
  },
  {
    icon: Target,
    title: "2. Diagnóstico + plan a medida",
    text: "Carlos y Nico analizan tu caso y te proponen el formato de coaching que mejor encaja contigo.",
  },
  {
    icon: Sparkles,
    title: "3. Empiezas a entrenar con seguimiento real",
    text: "Programa personalizado, revisiones de técnica y soporte directo para que avances sin lesionarte.",
  },
];

const includedFeatures = [
  "Programa 100% adaptado a tu nivel y agenda",
  "Revisiones de técnica por vídeo",
  "WhatsApp directo con tus coaches",
  "Plan nutricional práctico",
  "Comunidad privada de alumnos",
  "Ajustes mensuales según tu progreso",
];

const faqs = [
  {
    q: "¿Funciona si trabajo sentado todo el día?",
    a: "Sí, está pensado precisamente para eso. Combinamos fuerza, movilidad y trabajo postural para revertir lo que el teletrabajo le hace a tu cuerpo: rigidez, dolor de espalda y pérdida de masa muscular.",
  },
  {
    q: "¿Cuánto tiempo a la semana necesito?",
    a: "Con 3 a 4 sesiones de 45-60 minutos a la semana es suficiente para ver progresos sólidos. Diseñamos el plan para que encaje en tu agenda real, no en una ideal.",
  },
  {
    q: "¿Necesito material o gimnasio?",
    a: "No es imprescindible. La mayoría de los planes funcionan en casa o en un parque con barra. Si tienes material, lo aprovechamos.",
  },
  {
    q: "¿Cuánto cuesta el coaching?",
    a: "Tenemos varios formatos según tu objetivo, disponibilidad y nivel: desde acompañamiento grupal hasta coaching premium 1 a 1. Lo vemos juntos en la llamada gratuita para recomendarte el que de verdad encaja contigo, sin que pagues por algo que no necesitas.",
  },
  {
    q: "¿Cómo se hace el pago?",
    a: "Por fuera de la web. Tras la llamada y confirmar el formato que mejor encaja, te enviamos el método de pago que te resulte más cómodo.",
  },
  {
    q: "¿Qué pasa si una semana no puedo entrenar?",
    a: "Sin problema. Reorganizamos el plan contigo. La constancia importa más que la perfección, y eso lo gestionamos juntos.",
  },
];

const Coaching = () => {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const ctaFinalRef = useRef<HTMLDivElement>(null);
  const unlockSentinelRef = useRef<HTMLDivElement>(null);

  // Restaurar estado si ya envió el formulario en esta sesión
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(UNLOCK_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  const unlockPlans = () => {
    sessionStorage.setItem(UNLOCK_KEY, "1");
    setUnlocked((prev) => prev || true);
  };

  // Desbloqueo automático por scroll: cuando el usuario pasa por debajo del vídeo
  useEffect(() => {
    if (unlocked) return;
    const target = unlockSentinelRef.current;
    if (!target || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            unlockPlans();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [unlocked]);

  // Listener postMessage del form GHL como vía alternativa de desbloqueo
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        typeof event.origin === "string" &&
        !event.origin.includes("leadconnectorhq") &&
        !event.origin.includes("calisthenia.online") &&
        !event.origin.includes("msgsndr")
      ) {
        return;
      }

      const data = event.data;
      if (!data) return;

      const dataStr = typeof data === "string" ? data : JSON.stringify(data);
      const lower = dataStr.toLowerCase();

      if (
        lower.includes("form-submit") ||
        lower.includes("form_submit") ||
        lower.includes("submitted") ||
        lower.includes("success")
      ) {
        unlockPlans();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const scrollToCta = () => {
    ctaFinalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Coaching de calistenia para teletrabajadores | Carlos & Nico</title>
        <meta
          name="description"
          content="Coaching online de calistenia, fuerza y movilidad pensado para teletrabajadores. Mira el vídeo gratis y descubre los planes con Carlos y Nico."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* HERO oscuro estilo FBB */}
        <section className="relative bg-gradient-to-br from-secondary via-secondary to-secondary/95 text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 px-4 py-2 text-sm md:text-base">
                <Sparkles className="w-4 h-4 mr-2" />
                Formación gratuita en vídeo
              </Badge>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Tu cuerpo no está diseñado para estar todo el día{" "}
                <span className="text-primary">sentado</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto">
                Recupera fuerza, movilidad y energía con entrenamientos de 30 minutos
                en casa, adaptados a tu ritmo y nivel. Carlos y Nico te enseñan el
                sistema que usan para ayudar a personas ocupadas a volver a sentirse
                fuertes, ágiles y sin molestias en solo 90 días.
              </p>

              <ul className="space-y-3 text-left max-w-xl mx-auto pt-2">
                {[
                  "El mayor error que te hace estancarte",
                  "Cómo entrenar sin dolores ni sobrecargas",
                  "El método que seguimos con nuestros alumnos",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/90">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-center gap-6 pt-4 text-sm text-white/70">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" />
                  <span>+500 alumnos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span>Valoración 4.9/5</span>
                </div>
              </div>

              <p className="pt-2 text-base md:text-lg font-semibold text-white">
                👉 Te mostramos nuestro método en este vídeo
              </p>

              <div className="pt-4">
                <Button size="lg" onClick={scrollToCta} className="text-base px-8 rounded-full">
                  Reservar llamada con el equipo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* VÍDEO ABIERTO */}
        <section className="py-12 md:py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-6">
              <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
                Vídeo gratuito
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Mira la formación completa
              </h2>
              <p className="text-muted-foreground mt-2">
                Tómate los próximos minutos para verlo. Después podrás acceder a los planes.
              </p>
            </div>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl shadow-elegant border-0 bg-black"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                title="Formación gratuita de calistenia con Carlos y Nico"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
          {/* Sentinela: cuando entra en viewport, desbloquea automáticamente */}
          <div ref={unlockSentinelRef} aria-hidden className="h-px w-full" />
        </section>
        <section className="py-16 md:py-20 px-4 bg-muted">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
              ¿Es este coaching para ti?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-background rounded-2xl p-6 md:p-8 border-2 border-green-500/30 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600">Para ti SÍ...</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Pasas muchas horas sentado/a frente al ordenador",
                    "Quieres ganar fuerza real sin vivir en el gimnasio",
                    "Buscas un método sostenible que se adapte a tu agenda",
                    "Valoras tener un coach que te guíe paso a paso",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-background rounded-2xl p-6 md:p-8 border-2 border-red-500/30 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-500/20 p-3 rounded-full">
                    <X className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-red-600">NO es para ti si...</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Buscas resultados sin esfuerzo en 7 días",
                    "No tienes intención de seguir un plan",
                    "Esperas que entrenemos por ti",
                    "Solo quieres rutinas sueltas sin contexto",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* COACHES (formato FBB) */}
        <section className="py-16 md:py-20 px-4 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
              Tus coaches
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Dos enfoques distintos, una misma visión:{" "}
              <span className="text-primary font-medium">
                entrenar mejor, no solo entrenar más
              </span>
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Carlos Plaza */}
              <div className="bg-muted rounded-2xl overflow-hidden shadow-lg">
                <div className="h-80 md:h-96 overflow-hidden">
                  <img
                    src={carlosPhoto}
                    alt="Carlos Plaza - Coach de fuerza y calistenia"
                    className="w-full h-full object-cover object-center brightness-125"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Carlos Plaza</h3>
                  <p className="text-muted-foreground">
                    Coach especializado en fuerza, hipertrofia y progresiones de
                    calistenia. Enfocado en técnica, sostenibilidad y resultados a
                    largo plazo.
                  </p>
                </div>
              </div>

              {/* Nicolás Reyero */}
              <div className="bg-muted rounded-2xl overflow-hidden shadow-lg">
                <div className="h-80 md:h-96 overflow-hidden">
                  <img
                    src={nicolasPhoto}
                    alt="Nicolás Reyero - Coach de calistenia y movilidad"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Nicolás Reyero</h3>
                  <p className="text-muted-foreground">
                    Coach de calistenia funcional y movilidad. Especialista en fuerza
                    con peso corporal, control motor y nutrición práctica para
                    teletrabajadores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENIDO DESBLOQUEADO (auto por scroll bajo el vídeo) */}
        {unlocked && (
          <>
            {/* CÓMO TRABAJAMOS CONTIGO */}
            <section className="py-16 md:py-24 px-4 bg-background">
              <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-12">
                  <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                    Cómo trabajamos contigo
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Tres pasos para empezar a entrenar con nosotros
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Sin formularios largos ni compromisos. Una conversación honesta para
                    ver si encajamos.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {howItWorks.map((step) => {
                    const Icon = step.icon;
                    return (
                      <Card
                        key={step.title}
                        className="border-2 border-border hover:border-primary/40 transition-all"
                      >
                        <CardContent className="p-6 space-y-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.text}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* QUÉ INCLUYE */}
            <section className="py-16 md:py-20 px-4 bg-muted/40">
              <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Qué incluye trabajar con nosotros
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Coaching real, no una app más. Carlos y Nico contigo en cada paso.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {includedFeatures.map((f) => (
                    <div
                      key={f}
                      className="flex items-start gap-3 bg-background rounded-xl p-5 border-2 border-border"
                    >
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TESTIMONIOS — Team Calisthenia */}
            <section className="py-16 md:py-20 px-4 bg-primary">
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
                  Team Calisthenia
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Raúl Mollá",
                      location: "Alicante",
                      quote:
                        "Empecé desde 0 y muy tieso, ahora no me levanto con dolores y hago 10 dominadas fáciles.",
                      initials: "RM",
                      image: raulPhoto,
                    },
                    {
                      name: "Charlie",
                      location: "Madrid",
                      quote:
                        "Necesitaba una guía para aumentar mi fuerza, movilidad y habilidades de calistenia.",
                      initials: "C",
                      image: charliePhoto,
                    },
                    {
                      name: "Isabel",
                      location: "Cataluña",
                      quote:
                        "Estoy súper contenta y motivada, tengo menos dolores y más fuerza en mis articulaciones.",
                      initials: "I",
                    },
                  ].map((t) => (
                    <Card key={t.name} className="bg-background border-0 shadow-xl">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-4">
                          {t.image ? (
                            <img
                              src={t.image}
                              alt={`Foto de ${t.name}, alumno de Calisthenia Online`}
                              loading="lazy"
                              className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-primary/20"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                              {t.initials}
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-primary leading-tight">
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

            {/* GARANTÍA */}
            <section className="py-12 md:py-16 px-4 bg-muted/30">
              <div className="container mx-auto max-w-3xl text-center">
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                  Nuestra garantía
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Si en 14 días no ves encaje, te devolvemos el dinero
                </h2>
                <p className="text-muted-foreground text-lg">
                  Queremos alumnos comprometidos, no atrapados. Si tras dos semanas sientes
                  que el método no es para ti, te devolvemos íntegro lo que hayas pagado.
                  Sin preguntas raras.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="py-16 md:py-20 px-4 bg-background">
              <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Preguntas frecuentes
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

            {/* CTA FINAL — único punto de conversión: WhatsApp */}
            <section
              ref={ctaFinalRef}
              className="py-20 md:py-28 px-4 bg-gradient-to-br from-secondary via-secondary to-primary/30"
            >
              <div className="container mx-auto max-w-3xl text-center text-white space-y-6">
                <Badge className="bg-primary text-white hover:bg-primary px-4 py-2">
                  Llamada gratuita · Sin compromiso
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Reserva tu llamada con el equipo de Calisthenia Online
                </h2>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                  20 minutos por WhatsApp para conocer tu caso y ver si encajamos. Si
                  sí, te proponemos el formato de coaching que mejor te va. Si no,
                  te orientamos igualmente.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="group bg-[#25D366] hover:bg-[#1ebe5d] text-white text-base px-8 h-14 rounded-full shadow-2xl"
                  >
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="mr-2 w-6 h-6" />
                      Reservar llamada por WhatsApp
                    </a>
                  </Button>
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="text-sm text-white/80 hover:text-white underline transition-colors"
                  >
                    ¿Prefieres que te llamemos? Déjanos tus datos
                  </button>
                </div>
                <p className="text-sm text-white/70 pt-2">
                  Respondemos en menos de 24h en horario laboral.
                </p>
              </div>
            </section>

            {/* FORMULARIO OPCIONAL (alternativa a WhatsApp) */}
            <section
              ref={formSectionRef}
              className="py-16 md:py-20 px-4 bg-muted/40"
            >
              <div className="container mx-auto max-w-2xl">
                <div className="text-center mb-6">
                  <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Alternativa al WhatsApp
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    ¿Prefieres que te contactemos nosotros?
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Déjanos tus datos y te escribimos para reservar la llamada.
                  </p>
                </div>
                <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-white" style={{ minHeight: "520px" }}>
                      <iframe
                        src={GHL_FORM_URL}
                        style={{
                          width: "100%",
                          height: "520px",
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
                        data-form-name="Formulario coaching"
                        data-height="500"
                        data-layout-iframe-id={`inline-${GHL_FORM_ID}`}
                        data-form-id={GHL_FORM_ID}
                        title="Formulario para reservar una llamada de coaching"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Coaching;
