import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import { ArrowRight, Gift, Zap } from "lucide-react";

type FuncionalBodybuildingFinalCTAProps = {
  targetDate: Date;
  onReserve: () => void;
};

export default function FuncionalBodybuildingFinalCTA({
  targetDate,
  onReserve,
}: FuncionalBodybuildingFinalCTAProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            ¿Listo para entrenar de forma inteligente?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Plazas limitadas. Reserva tu sitio ahora.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            <div className="bg-background rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Precio especial
                </span>
              </div>
              <div className="text-4xl font-extrabold tracking-tight text-foreground">
                SOLO 10€
              </div>
            </div>

            <div className="bg-secondary/10 rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Plazas limitadas
                </span>
              </div>
              <p className="text-sm text-foreground/80">
                Por estricto orden de reserva.
              </p>
              <p className="text-sm font-medium text-foreground">
                ¡Reserva la tuya antes de que se agoten!
              </p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
              El taller comienza en:
            </p>
            <CountdownTimer targetDate={targetDate} />
          </div>

          <Button
            size="lg"
            onClick={onReserve}
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Reservar mi plaza
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
