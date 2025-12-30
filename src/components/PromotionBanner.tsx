import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Sparkles, Timer, ArrowRight } from "lucide-react";

// Configuración fácil de editar para futuras promociones
const PROMOTION_CONFIG = {
  isActive: true, // Cambiar a false para ocultar la promoción
  badge: "🎁 OFERTA LIMITADA",
  title: "Empieza el año transformando tu cuerpo",
  subtitle: "Aprovecha esta promoción exclusiva antes de que termine",
  offers: [
    {
      title: "Plan 3 Meses",
      bonus: "+1 MES GRATIS",
      description: "4 meses por el precio de 3",
      highlight: false,
    },
    {
      title: "Plan 6 Meses", 
      bonus: "+2 MESES GRATIS",
      description: "8 meses por el precio de 6",
      highlight: true,
    },
  ],
  cta: {
    text: "Aprovecha la oferta",
    action: () => document.getElementById('contacto-form')?.scrollIntoView({ behavior: 'smooth' }),
  },
  urgencyText: "Plazas limitadas · Oferta válida hasta agotar cupos",
};

const PromotionBanner = () => {
  if (!PROMOTION_CONFIG.isActive) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-4 py-2 animate-pulse">
            <Sparkles className="w-4 h-4 mr-2" />
            {PROMOTION_CONFIG.badge}
          </Badge>

          {/* Title */}
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-white mb-4">
            {PROMOTION_CONFIG.title}
          </h2>

          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            {PROMOTION_CONFIG.subtitle}
          </p>

          {/* Offer Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-3xl mx-auto">
            {PROMOTION_CONFIG.offers.map((offer, index) => (
              <Card 
                key={index}
                className={`p-6 relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                  offer.highlight 
                    ? 'bg-white border-4 border-accent shadow-2xl' 
                    : 'bg-white/95 border-2 border-white/50'
                }`}
              >
                
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    offer.highlight ? 'bg-accent/20' : 'bg-primary/10'
                  }`}>
                    <Gift className={`w-8 h-8 ${offer.highlight ? 'text-accent' : 'text-primary'}`} />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-xl text-foreground mb-2">
                      {offer.title}
                    </h3>
                    <div className={`font-display font-bold text-2xl lg:text-3xl mb-2 ${
                      offer.highlight ? 'text-accent' : 'text-primary'
                    }`}>
                      {offer.bonus}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {offer.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <Button 
            size="lg" 
            onClick={PROMOTION_CONFIG.cta.action}
            className="bg-white text-primary hover:bg-white/90 hover:text-primary font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            {PROMOTION_CONFIG.cta.text}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Urgency text */}
          <div className="flex items-center justify-center gap-2 mt-6 text-white/70 text-sm">
            <Timer className="w-4 h-4" />
            <span>{PROMOTION_CONFIG.urgencyText}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
