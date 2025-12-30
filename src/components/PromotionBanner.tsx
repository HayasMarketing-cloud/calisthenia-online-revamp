import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Sparkles, Timer } from "lucide-react";

// Icono de WhatsApp (no disponible en Lucide)
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Configuración fácil de editar para futuras promociones
const PROMOTION_CONFIG = {
  // Fechas de activación automática (zona horaria Madrid)
  startDate: "2025-01-10T00:00:00",
  endDate: "2025-02-01T00:00:00",
  forceShow: true, // Cambiar a false para ocultar hasta la fecha de inicio
  badge: "🎁 OFERTA LIMITADA",
  title: "Empieza el año transformando tu cuerpo",
  subtitle: "Aprovecha esta promoción exclusiva antes de que termine",
  deadline: "Válido hasta el 31 de enero",
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
    text: "Quiero aprovechar mi oferta",
    url: "https://api.whatsapp.com/send?phone=34645079692&text=%C2%A1Quiero%20aprovechar%20esta%20oferta%20de%203%20%2B1%20o%206%20%2B%202!",
  },
  urgencyText: "Plazas limitadas · Solo hasta el 31 de enero",
};

const PromotionBanner = () => {
  // Verificar si la promoción está activa según las fechas (zona horaria Madrid)
  const now = new Date();
  const start = new Date(PROMOTION_CONFIG.startDate);
  const end = new Date(PROMOTION_CONFIG.endDate);
  
  const isActive = PROMOTION_CONFIG.forceShow || (now >= start && now < end);
  
  if (!isActive) return null;

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
            asChild
            className="group bg-white text-primary hover:bg-white/90 hover:text-primary font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <a href={PROMOTION_CONFIG.cta.url} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="mr-2 w-5 h-5 transition-colors group-hover:text-[#25D366]" />
              {PROMOTION_CONFIG.cta.text}
            </a>
          </Button>

          {/* Deadline badge */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
              <Timer className="w-4 h-4 mr-2" />
              {PROMOTION_CONFIG.deadline}
            </Badge>
          </div>

          {/* Urgency text */}
          <p className="text-white/70 text-sm mt-4">
            {PROMOTION_CONFIG.urgencyText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
