import { Badge } from "@/components/ui/badge";
import RoutineBreadcrumbs from "./RoutineBreadcrumbs";

interface RoutineHeroProps {
  breadcrumbs: Array<{ label: string; href: string }>;
  title: string;
  titleHighlight: string;
  emoji?: string;
  description: string;
  nivel?: string;
  duracion?: string;
  lugar?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const RoutineHero = ({
  breadcrumbs,
  title,
  titleHighlight,
  emoji = "",
  description,
  nivel,
  duracion,
  lugar,
  gradientFrom = "from-primary/10",
  gradientTo = "to-background"
}: RoutineHeroProps) => {
  return (
    <section className={`pt-24 pb-16 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
      <div className="container mx-auto px-4">
        <RoutineBreadcrumbs items={breadcrumbs} />
        
        <div className="max-w-4xl mx-auto mt-8">
          <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6 text-center">
            {title} <span className="text-primary">{titleHighlight}</span> {emoji}
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {nivel && <Badge variant="secondary">💪 {nivel}</Badge>}
            {duracion && <Badge variant="secondary">⏱️ {duracion}</Badge>}
            {lugar && <Badge variant="secondary">📍 {lugar}</Badge>}
          </div>
          
          <p className="text-xl text-muted-foreground text-center">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoutineHero;
