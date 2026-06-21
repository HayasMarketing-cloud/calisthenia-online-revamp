import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BedDouble, Dumbbell, CheckCircle2, Play, Loader2 } from 'lucide-react';
import { format, parseISO, addDays, isToday, isTomorrow } from 'date-fns';
import { es } from 'date-fns/locale';

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const Agenda = () => {
  const { user } = useAuth();
  const [startDate] = useState(() => new Date());
  const endDate = addDays(startDate, 6);
  const fromISO = ymd(startDate);
  const toISO = ymd(endDate);

  const { data, isLoading } = useQuery({
    queryKey: ['agenda-7d', user?.id, fromISO],
    enabled: !!user,
    queryFn: async () => {
      const { data: prog } = await supabase
        .from('programs')
        .select('id, name')
        .eq('client_id', user!.id)
        .eq('status', 'active')
        .maybeSingle();
      if (!prog) return { program: null, days: [] };

      const { data: weeks } = await supabase
        .from('program_weeks')
        .select('id')
        .eq('program_id', prog.id);
      const weekIds = (weeks || []).map((w) => w.id);
      if (!weekIds.length) return { program: prog, days: [] };

      const { data: days } = await supabase
        .from('program_days')
        .select('id, name, is_rest_day, scheduled_date, notes')
        .in('week_id', weekIds)
        .gte('scheduled_date', fromISO)
        .lte('scheduled_date', toISO)
        .order('scheduled_date', { ascending: true });

      const dayIds = (days || []).map((d) => d.id);
      const sessionsByDay: Record<string, string> = {};
      if (dayIds.length) {
        const { data: sessions } = await supabase
          .from('workout_sessions')
          .select('program_day_id, status')
          .eq('client_id', user!.id)
          .in('program_day_id', dayIds);
        (sessions || []).forEach((s) => {
          if (s.program_day_id) sessionsByDay[s.program_day_id] = s.status as string;
        });
      }

      return { program: prog, days: days || [], sessionsByDay };
    },
  });

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link to="/app/dashboard" aria-label="Volver">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Mi agenda</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Próximos 7 días{data?.program ? ` · ${data.program.name}` : ''}
      </p>

      {isLoading ? (
        <Card>
          <CardContent className="p-8 flex justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </CardContent>
        </Card>
      ) : !data?.program ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Aún no tienes un programa activo. Tu coach te lo asignará pronto.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {Array.from({ length: 7 }).map((_, i) => {
            const date = addDays(startDate, i);
            const iso = ymd(date);
            const day = data.days.find((d) => d.scheduled_date === iso);
            const status = day ? data.sessionsByDay?.[day.id] : undefined;

            const dayLabel = isToday(date)
              ? 'Hoy'
              : isTomorrow(date)
                ? 'Mañana'
                : format(date, "EEEE", { locale: es });
            const dateLabel = format(date, "d 'de' MMMM", { locale: es });

            const isRest = day?.is_rest_day;
            const completed = status === 'completed';
            const inProgress = status === 'in_progress';

            return (
              <Card
                key={iso}
                className={`rounded-2xl ${isToday(date) ? 'border-primary/40' : 'border-border/60'}`}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                      !day
                        ? 'bg-muted text-muted-foreground'
                        : isRest
                          ? 'bg-muted text-muted-foreground'
                          : completed
                            ? 'bg-primary/15 text-primary'
                            : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {!day ? (
                      <span className="text-xs">—</span>
                    ) : isRest ? (
                      <BedDouble className="h-4 w-4" />
                    ) : completed ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : inProgress ? (
                      <Play className="h-4 w-4" />
                    ) : (
                      <Dumbbell className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground capitalize">{dayLabel}</p>
                      <span className="text-xs text-muted-foreground">{dateLabel}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {!day
                        ? 'Sin sesión asignada'
                        : isRest
                          ? 'Descanso'
                          : day.name || 'Sesión'}
                      {completed && ' · Completada ✓'}
                      {inProgress && ' · En curso'}
                    </p>
                  </div>
                  {isToday(date) && day && !isRest && !completed && (
                    <Button asChild size="sm" className="shrink-0">
                      <Link to="/app/training">Empezar</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Agenda;
