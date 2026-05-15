import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

interface TrialCTAProps {
  utmMedium?: string;
  variant?: "full" | "inline";
}

const TRIAL_HREF = (medium: string) =>
  `/auth?next=/app/onboarding&utm_source=rutina-casa&utm_medium=${medium}`;

const TrialCTA = ({ utmMedium = "cta-trial", variant = "full" }: TrialCTAProps) => {
  if (variant === "inline") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-background p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 shadow-card">
        <div className="flex-1">
          <p className="font-display font-bold text-base md:text-lg leading-snug">
            ¿Quieres esta tabla adaptada a tu nivel?
          </p>
          <p className="text-sm text-muted-foreground">
            Prueba 7 días el área privada gratis · Sin tarjeta · Cancela cuando quieras.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0 font-bold">
          <Link to={TRIAL_HREF(utmMedium)}>
            Empezar prueba gratis
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    );
  }

  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Prueba gratuita 7 días · Plan personalizado de calistenia",
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: "https://calisthenia.online/auth",
    category: "Subscription",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-secondary to-primary/30 p-8 md:p-14 text-center shadow-elegant">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 bg-primary/10 border border-primary/30 rounded-full backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-primary uppercase">
                Sin tarjeta · Cancela cuando quieras
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4 leading-tight">
              Empieza tu plan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                personalizado gratis
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-6">
              7 días de acceso al área privada: rutina adaptada a tu nivel, seguimiento de tu progreso y vídeos paso a paso del coach.
            </p>

            <ul className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8 text-left">
              {[
                "Rutina adaptada a tu nivel",
                "Seguimiento de progreso semanal",
                "Vídeos paso a paso del coach",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-gray-200 bg-white/5 border border-white/10 rounded-lg p-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Button size="lg" asChild className="text-base md:text-lg px-8 py-6 rounded-xl font-bold shadow-xl">
                <Link to={TRIAL_HREF(utmMedium)}>
                  Empezar prueba gratuita
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base md:text-lg px-8 py-6 rounded-xl font-bold bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10"
              >
                <Link to="/auth">Ya tengo cuenta</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrialCTA;
