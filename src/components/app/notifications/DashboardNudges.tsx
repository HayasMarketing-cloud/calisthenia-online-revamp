import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNudgesState } from '@/hooks/useNudgesState';
import { resolveActionRoute } from '@/lib/nudges/routes';
import type { Nudge, NudgeKey } from '@/lib/nudges/selectDashboardNudges';
import WeightLogDialog from '@/components/app/WeightLogDialog';

// Variantes visuales por tipo de nudge:
// - "promo": negro + naranja (CTA fuerte). Reservado para waiting_program y otros promos.
// - "habit": fondo suave con borde primario y texto sobre fondo (mantiene tono cercano).
type NudgeVariant = 'promo' | 'habit';

const PROMO_KEYS: NudgeKey[] = ['waiting_program'];

function variantFor(key: NudgeKey): NudgeVariant {
  return PROMO_KEYS.includes(key) ? 'promo' : 'habit';
}

function NudgeCard({
  nudge,
  featured,
  onDismiss,
  onAction,
}: {
  nudge: Nudge;
  featured: boolean;
  onDismiss: () => void;
  onAction: (n: Nudge) => boolean; // returns true if handled (skip nav)
}) {
  const variant = variantFor(nudge.key);
  const isPromo = variant === 'promo';

  const cardClass = cn(
    'rounded-2xl',
    isPromo
      ? 'bg-black text-white border-transparent shadow-md'
      : 'border-primary/30 bg-primary/5 text-foreground'
  );

  const titleClass = cn(
    'font-semibold pr-7',
    featured ? 'text-base' : 'text-sm',
    isPromo ? 'text-white' : 'text-foreground'
  );

  const bodyClass = cn(
    'mt-1',
    featured ? 'text-sm' : 'text-xs',
    isPromo ? 'text-white/80' : 'text-muted-foreground'
  );

  const dismissBtnClass = cn(
    'absolute top-2 right-2 h-7 w-7 inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring',
    isPromo
      ? 'text-white/70 hover:bg-white/10 hover:text-white'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
  );

  const primaryBtn = (
    <Button
      asChild
      size={featured ? 'default' : 'sm'}
      className={cn(isPromo && 'bg-primary text-primary-foreground hover:bg-primary/90')}
    >
      <Link
        to={resolveActionRoute(nudge.primaryAction.route)}
        onClick={(e) => {
          if (onAction(nudge)) e.preventDefault();
        }}
      >
        {nudge.primaryAction.label}
      </Link>
    </Button>
  );


  return (
    <Card className={cardClass}>
      <CardContent className={cn('p-4 relative', featured && 'p-5')}>
        <button
          type="button"
          onClick={onDismiss}
          aria-label={`Ocultar: ${nudge.title}`}
          className={dismissBtnClass}
        >
          <X className="h-4 w-4" />
        </button>
        <p className={titleClass}>{nudge.title}</p>
        {nudge.body && <p className={bodyClass}>{nudge.body}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          {primaryBtn}
          {nudge.secondaryAction && (
            <Button
              asChild
              variant="outline"
              size={featured ? 'default' : 'sm'}
              className={cn(
                isPromo &&
                  'bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white'
              )}
            >
              <Link to={resolveActionRoute(nudge.secondaryAction.route)}>
                {nudge.secondaryAction.label}
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardNudges() {
  const { nudges, dismiss } = useNudgesState();
  const [weightOpen, setWeightOpen] = useState(false);

  if (!nudges.length) return null;

  // Intercepta log_weight para abrir modal en lugar de navegar.
  const handleAction = (n: Nudge): boolean => {
    if (n.primaryAction.route === 'log_weight') {
      setWeightOpen(true);
      return true;
    }
    return false;
  };

  const [featured, ...secondary] = nudges;
  return (
    <section aria-label="Sugerencias para ti" className="space-y-3">
      <NudgeCard
        nudge={featured}
        featured
        onDismiss={() => dismiss(featured.key)}
        onAction={handleAction}
      />
      {secondary.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {secondary.map((n) => (
            <NudgeCard
              key={n.key}
              nudge={n}
              featured={false}
              onDismiss={() => dismiss(n.key)}
              onAction={handleAction}
            />
          ))}
        </div>
      )}
      <WeightLogDialog open={weightOpen} onClose={() => setWeightOpen(false)} />
    </section>
  );
}

export default DashboardNudges;
