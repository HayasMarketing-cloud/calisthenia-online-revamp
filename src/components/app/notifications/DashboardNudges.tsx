import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNudgesState } from '@/hooks/useNudgesState';
import { resolveActionRoute } from '@/lib/nudges/routes';
import type { Nudge } from '@/lib/nudges/selectDashboardNudges';

function NudgeCard({
  nudge,
  featured,
  onDismiss,
}: {
  nudge: Nudge;
  featured: boolean;
  onDismiss: () => void;
}) {
  return (
    <Card
      className={cn(
        'rounded-2xl border-border/60',
        featured && 'border-primary/40 bg-primary/5'
      )}
    >
      <CardContent className={cn('p-4 relative', featured && 'p-5')}>
        <button
          type="button"
          onClick={onDismiss}
          aria-label={`Ocultar: ${nudge.title}`}
          className="absolute top-2 right-2 h-7 w-7 inline-flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
        <p
          className={cn(
            'font-semibold text-foreground pr-7',
            featured ? 'text-base' : 'text-sm'
          )}
        >
          {nudge.title}
        </p>
        {nudge.body && (
          <p
            className={cn(
              'text-muted-foreground mt-1',
              featured ? 'text-sm' : 'text-xs'
            )}
          >
            {nudge.body}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <Button asChild size={featured ? 'default' : 'sm'}>
            <Link to={resolveActionRoute(nudge.primaryAction.route)}>
              {nudge.primaryAction.label}
            </Link>
          </Button>
          {nudge.secondaryAction && (
            <Button asChild variant="outline" size={featured ? 'default' : 'sm'}>
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
  if (!nudges.length) return null;

  const [featured, ...secondary] = nudges;
  return (
    <section aria-label="Sugerencias para ti" className="space-y-3">
      <NudgeCard nudge={featured} featured onDismiss={() => dismiss(featured.key)} />
      {secondary.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {secondary.map((n) => (
            <NudgeCard
              key={n.key}
              nudge={n}
              featured={false}
              onDismiss={() => dismiss(n.key)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default DashboardNudges;
