import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Footprints, Flame, Timer, Snowflake, Repeat } from 'lucide-react';
import { RunningStep, STEP_LABELS, summarizeStep } from '@/lib/runningWorkout';

interface Workout {
  id: string;
  name: string;
  total_duration_min: number | null;
  total_distance_km: number | null;
  notes: string | null;
}

interface Props {
  workout: Workout;
  steps: RunningStep[];
}

const stepIcon = (type: RunningStep['step_type']) => {
  switch (type) {
    case 'warmup': return <Flame className="h-4 w-4 text-orange-500" />;
    case 'cooldown': return <Snowflake className="h-4 w-4 text-blue-500" />;
    case 'work': return <Footprints className="h-4 w-4 text-primary" />;
    case 'recovery': return <Timer className="h-4 w-4 text-muted-foreground" />;
    case 'repeat': return <Repeat className="h-4 w-4 text-primary" />;
  }
};

export default function RunningWorkoutView({ workout, steps }: Props) {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Footprints className="h-5 w-5 text-primary" />
            {workout.name}
          </h2>
          <div className="flex items-center gap-2">
            {workout.total_distance_km != null && (
              <Badge variant="outline">{workout.total_distance_km} km</Badge>
            )}
            {workout.total_duration_min != null && (
              <Badge variant="outline">{workout.total_duration_min}'</Badge>
            )}
          </div>
        </div>

        {steps.length === 0 ? (
          <p className="text-sm text-muted-foreground">Tu coach todavía no ha añadido bloques a esta sesión.</p>
        ) : (
          <ol className="space-y-2">
            {steps.map((s, i) => (
              <li key={s.id} className="flex items-start gap-3 rounded-lg border bg-card p-3">
                <span className="text-xs text-muted-foreground pt-0.5 w-5 text-right">{i + 1}.</span>
                <div className="flex-shrink-0 pt-0.5">{stepIcon(s.step_type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">{STEP_LABELS[s.step_type]}</Badge>
                    <span className="font-semibold text-sm">{summarizeStep(s)}</span>
                  </div>
                  {s.notes && <p className="text-xs text-muted-foreground mt-1">{s.notes}</p>}
                </div>
              </li>
            ))}
          </ol>
        )}

        {workout.notes && (
          <div className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm">
            <span className="font-medium">Notas: </span>
            <span className="text-muted-foreground">{workout.notes}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
