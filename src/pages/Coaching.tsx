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
import { Check, Lock, Play, Sparkles, Star, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// === CONFIGURACIÓN (afinable después) ===
const GHL_FORM_URL =
  "https://link.calisthenia.online/widget/form/JYFtKJd7tgX86dXtbRhS";
const GHL_FORM_ID = "JYFtKJd7tgX86dXtbRhS";

// TODO: sustituir por el ID real del vídeo de YouTube no listado
const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ";

// TODO: confirmar número de WhatsApp para esta campaña
const WHATSAPP_PHONE = "34645079692";

const buildWhatsAppUrl = (planName: string, price: string) => {
  const text = encodeURIComponent(
    `Hola Carlos y Nico, acabo de ver el vídeo de la formación y me interesa el plan ${planName} (${price}). ¿Podemos hablar?`
  );
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`;
};

// Icono WhatsApp (verde #25D366 en hover, según design system del proyecto)
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Persistencia en sessionStorage para no volver a pedir el formulario en la misma sesión
const UNLOCK_KEY = "coaching_video_unlocked";

const plans = [
  {
    name: "Grupal",
    price: "197€",
    cadence: "/ mes",
    description:
      "Entrena con la comunidad, plan estructurado y seguimiento semanal en grupo.",
    features: [
      "Programa mensual de calistenia + movilidad",
      "Sesiones grupales en directo (Zoom)",
      "Comunidad privada de WhatsApp",
      "Revisión de técnica por vídeo",
      "Plan nutricional general",
    ],
    cta: "Quiero el plan Grupal",
    highlight: false,
  },
  {
    name: "Personalizado",
    price: "397€",
    cadence: "/ mes",
    description:
      "Plan 100% adaptado a ti, con seguimiento individual de Carlos y Nico.",
    features: [
      "Programa diseñado a medida (fuerza + movilidad)",
      "Plan nutricional personalizado",
      "Revisión semanal 1 a 1",
      "Soporte directo por WhatsApp con tus coaches",
      "Ajustes mensuales según progreso",
    ],
    cta: "Quiero el plan Personalizado",
    highlight: true,
    badge: "Más popular",
  },
  {
    name: "VIP",
    price: "797€",
    cadence: "/ mes",
    description:
      "Acompañamiento premium con sesiones 1 a 1 en directo y prioridad total.",
    features: [
      "Todo lo del plan Personalizado",
      "Sesiones 1 a 1 en directo cada semana",
      "Acceso prioritario por WhatsApp (respuesta en horas)",
      "Análisis biomecánico y de movilidad detallado",
      "Acompañamiento nutricional avanzado",
    ],
    cta: "Quiero el plan VIP",
    highlight: false,
  },
];

const faqs = [
  {
    q: "¿Qué nivel necesito para empezar?",
    a: "Ninguno previo. Adaptamos el plan a tu nivel actual, ya sea que estés empezando o que ya entrenes con regularidad.",
  },
  {
    q: "¿Cuánto tiempo a la semana necesito?",
    a: "Con 3 a 4 sesiones de 45-60 minutos a la semana es suficiente para ver progresos sólidos.",
  },
  {
    q: "¿Necesito material o gimnasio?",
    a: "No es imprescindible. La mayoría de los planes funcionan en casa o en un parque con barra. Si tienes material, lo aprovechamos.",
  },
  {
    q: "¿Qué diferencia hay entre los 3 planes?",
    a: "El Grupal es el más asequible y trabajas con la comunidad. El Personalizado incluye seguimiento individual semanal. El VIP añade sesiones 1 a 1 en directo y prioridad máxima.",
  },
  {
    q: "¿Cómo se hace el pago?",
    a: "Por fuera de la web. Tras hablar contigo por WhatsApp y confirmar el plan que mejor encaja, te enviamos el método de pago que te resulte más cómodo.",
  },
  {
    q: "¿Qué pasa si una semana no puedo entrenar?",
    a: "Sin problema. Reorganizamos el plan contigo. La constancia importa más que la perfección, y eso lo gestionamos juntos.",
  },
];

const Coaching = () => {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  // Restaurar estado si ya envió el formulario en esta sesión
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(UNLOCK_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  // Escuchar el evento postMessage del iframe de GHL al enviarse el formulario
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // GHL emite mensajes desde su dominio
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

      // GHL suele enviar eventos como "form-submit-success" o type "FORM_SUBMITTED"
      if (
        lower.includes("form-submit") ||
        lower.includes("form_submit") ||
        lower.includes("submitted") ||
        lower.includes("success")
      ) {
        unlockVideo();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const unlockVideo = () => {
    sessionStorage.setItem(UNLOCK_KEY, "1");
    setUnlocked(true);
    // Hacer scroll al vídeo tras un pequeño delay
    setTimeout(() => {
      videoSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Coaching de calistenia con Carlos y Nico | Formación gratuita</title>
        <meta
          name="description"
          content="Accede gratis a la formación de Carlos y Nico sobre calistenia, fuerza y movilidad. Descubre los planes de coaching para transformar tu cuerpo."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* HERO + GATE */}
        <section
          ref={formSectionRef}
          className="relative py-16 md:py-24 px-4 bg-gradient-to-br from-secondary via-secondary to-primary/20"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Lado izquierdo: copy */}
              <div className="text-white space-y-6">
                <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Formación gratuita
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Transforma tu cuerpo con{" "}
                  <span className="text-primary">calistenia real</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  Carlos y Nico te enseñan, en un vídeo gratuito, el método con el
                  que sus alumnos consiguen fuerza, movilidad y resultados sostenibles
                  sin pasarse el día en el gimnasio.
                </p>

                <ul className="space-y-3 pt-2">
                  {[
                    "El error nº1 que frena tu progreso en calistenia",
                    "Cómo combinar fuerza y movilidad sin lesionarte",
                    "El sistema que usamos con nuestros alumnos de coaching",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-100">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 pt-2 text-sm text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" />
                    <span>+500 alumnos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span>Valoración 4.9/5</span>
                  </div>
                </div>
              </div>

              {/* Lado derecho: formulario o vídeo desbloqueado */}
              <div>
                {!unlocked ? (
                  <Card className="border-2 border-primary/20 shadow-2xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-primary text-white text-center py-3 px-4">
                        <p className="font-semibold flex items-center justify-center gap-2">
                          <Lock className="w-4 h-4" />
                          Déjanos tus datos para ver el vídeo gratis
                        </p>
                      </div>
                      <div className="bg-white" style={{ minHeight: "520px" }}>
                        <iframe
                          src={GHL_FORM_URL}
                          style={{
                            width: "100%",
                            height: "520px",
                            border: "none",
                            borderRadius: "0 0 6px 6px",
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
                          title="Formulario para acceder al vídeo gratuito"
                        />
                      </div>
                      <div className="bg-muted/50 px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={unlockVideo}
                          className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
                        >
                          Ya he enviado el formulario, mostrar el vídeo
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-2 border-primary/30 shadow-2xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-primary text-white text-center py-3 px-4">
                        <p className="font-semibold flex items-center justify-center gap-2">
                          <Play className="w-4 h-4 fill-white" />
                          ¡Vídeo desbloqueado! Disfruta la formación
                        </p>
                      </div>
                      <div className="aspect-video bg-black">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&autoplay=1`}
                          title="Formación gratuita de calistenia con Carlos y Nico"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Ancla para scroll al desbloquear */}
        <div ref={videoSectionRef} />

        {/* PARA QUIÉN ES */}
        <section className="py-16 md:py-20 px-4 bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                ¿Es esta formación para ti?
              </h2>
              <p className="text-muted-foreground text-lg">
                Lee con sinceridad antes de decidir.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-primary">Sí, si...</h3>
                  <ul className="space-y-2.5 text-foreground">
                    {[
                      "Quieres ganar fuerza real con tu propio peso",
                      "Buscas un método sostenible, no una dieta milagro",
                      "Estás dispuesto/a a entrenar 3-4 días por semana",
                      "Valoras tener un coach que te guíe paso a paso",
                    ].map((i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2 border-muted">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-muted-foreground">No, si...</h3>
                  <ul className="space-y-2.5 text-foreground">
                    {[
                      "Buscas resultados sin esfuerzo en 7 días",
                      "No tienes intención de seguir un plan",
                      "Esperas que entrenemos por ti",
                      "Solo quieres rutinas sueltas sin contexto",
                    ].map((i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 shrink-0 mt-0.5 text-muted-foreground">×</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* COACHES */}
        <section className="py-16 md:py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Conoce a tus coaches
              </h2>
              <p className="text-muted-foreground text-lg">
                Dos enfoques complementarios. Un solo objetivo: tu progreso.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "Carlos",
                  role: "Coach de fuerza y calistenia",
                  bio: "Especialista en progresiones de fuerza con peso corporal. Ha guiado a cientos de alumnos desde su primera flexión hasta dominar movimientos avanzados.",
                },
                {
                  name: "Nico",
                  role: "Coach de movilidad y nutrición",
                  bio: "Combina movilidad funcional y nutrición práctica para que entrenes mejor, te recuperes más rápido y mantengas resultados a largo plazo.",
                },
              ].map((c) => (
                <Card key={c.name} className="border-2">
                  <CardContent className="p-6 space-y-3">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                      {c.name[0]}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{c.name}</h3>
                    <p className="text-primary font-semibold">{c.role}</p>
                    <p className="text-muted-foreground leading-relaxed">{c.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PLANES */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                Elige tu plan
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Tres formas de entrenar con nosotros
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Cada plan está pensado para un nivel de acompañamiento distinto.
                Hablamos contigo por WhatsApp para ayudarte a elegir el que mejor encaja.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col border-2 transition-all ${
                    plan.highlight
                      ? "border-primary shadow-2xl md:scale-105 bg-gradient-to-b from-primary/5 to-background"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-white hover:bg-primary px-3 py-1">
                        ⭐ {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col flex-1 space-y-5 pt-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 min-h-[3rem]">
                        {plan.description}
                      </p>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">{plan.cadence}</span>
                    </div>
                    <ul className="space-y-2.5 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      size="lg"
                      variant={plan.highlight ? "default" : "outline"}
                      className="w-full group"
                    >
                      <a
                        href={buildWhatsAppUrl(plan.name, plan.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon className="mr-2 w-5 h-5 transition-colors group-hover:text-[#25D366]" />
                        {plan.cta}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              💳 Los pagos se gestionan por fuera de la web. Te explicamos todo por WhatsApp sin compromiso.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 px-4 bg-muted/30">
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

        {/* CTA FINAL */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-secondary to-primary/30">
          <div className="container mx-auto max-w-3xl text-center text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              ¿Listo/a para dar el siguiente paso?
            </h2>
            <p className="text-lg text-gray-200">
              {unlocked
                ? "Ya has visto la formación. Ahora elige el plan que mejor encaje contigo y hablemos."
                : "Empieza por ver el vídeo gratuito y, si te encaja, hablamos de los planes de coaching."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              {!unlocked && (
                <Button size="lg" onClick={scrollToForm}>
                  Ver el vídeo gratis
                </Button>
              )}
              <Button
                asChild
                size="lg"
                variant={unlocked ? "default" : "outline"}
                className={
                  unlocked
                    ? ""
                    : "bg-white/10 border-white text-white hover:bg-white hover:text-secondary"
                }
              >
                <a
                  href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(
                    "Hola Carlos y Nico, quiero más información sobre los planes de coaching."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <WhatsAppIcon className="mr-2 w-5 h-5 transition-colors group-hover:text-[#25D366]" />
                  Hablar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Coaching;
