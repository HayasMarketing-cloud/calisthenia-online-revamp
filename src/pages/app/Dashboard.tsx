import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  Loader2,
  Flame,
  ChevronRight,
  Calendar,
  Zap,
  Heart,
  Activity,
  Watch,
  Smartphone,
} from 'lucide-react';
import GoalsWidget from '@/components/app/GoalsWidget';
import PinnedGoalWidget from '@/components/app/PinnedGoalWidget';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 6) return 'Buenas noches';
  if (h < 13) return 'Buenos días';
  if (h < 21) return 'Buenas tardes';
  return 'Buenas noches';
};

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const weekRangeISO = () => {
  const d = new Date();
  const day = (d.getDay() + 6) % 7; // monday = 0
  const monday = new Date(d);
  monday.setDate(d.getDate() - day);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const iso = (x: Date) =>
    `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
  return { from: iso(monday), to: iso(sunday) };
};

const Dashboard = () => {
  const { user } = useAuth();

  // Display name
  const { data: displayName } = useQuery({
    queryKey: ['profile-name', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user!.id)
        .maybeSingle();
      return (data?.display_name || 'Atleta').toUpperCase();
    },
    enabled: !!user,
  });

  // Adherence (streak + 7d %)
  const { data: adherence } = useQuery({
    queryKey: ['client-adherence', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('client_adherence')
        .select('*')
        .eq('client_id', user!.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  // Today's plan: active program -> weeks -> day where scheduled_date = today
  const { data: todayPlan, isLoading: loadingPlan } = useQuery({
    queryKey: ['today-plan', user?.id],
    queryFn: async () => {
      const { data: prog } = await supabase
        .from('programs')
        .select('id')
        .eq('client_id', user!.id)
        .eq('status', 'active')
        .maybeSingle();
      if (!prog) return null;

      const { data: weeks } = await supabase
        .from('program_weeks')
        .select('id')
        .eq('program_id', prog.id);
      const weekIds = (weeks || []).map((w) => w.id);
      if (!weekIds.length) return null;

      const { data: day } = await supabase
        .from('program_days')
        .select('id, name, is_rest_day, notes')
        .in('week_id', weekIds)
        .eq('scheduled_date', todayISO())
        .maybeSingle();
      if (!day) return null;

      const { count } = await supabase
        .from('program_day_exercises')
        .select('id', { count: 'exact', head: true })
        .eq('day_id', day.id);

      const { data: session } = await supabase
        .from('workout_sessions')
        .select('id, status')
        .eq('client_id', user!.id)
        .eq('program_day_id', day.id)
        .order('started_at', { ascending: false })
        .maybeSingle();

      return {
        id: day.id,
        name: day.name || 'Sesión de hoy',
        isRest: !!day.is_rest_day,
        exerciseCount: count ?? 0,
        sessionStatus: session?.status as string | undefined,
      };
    },
    enabled: !!user,
  });

  // Weekly summary: programmed vs completed this week
  const { data: week } = useQuery({
    queryKey: ['week-summary', user?.id],
    queryFn: async () => {
      const { from, to } = weekRangeISO();
      const { data: prog } = await supabase
        .from('programs')
        .select('id')
        .eq('client_id', user!.id)
        .eq('status', 'active')
        .maybeSingle();
      if (!prog) return { programmed: 0, completed: 0 };

      const { data: weeks } = await supabase
        .from('program_weeks')
        .select('id')
        .eq('program_id', prog.id);
      const weekIds = (weeks || []).map((w) => w.id);

      const { data: days } = await supabase
        .from('program_days')
        .select('id, is_rest_day, scheduled_date')
        .in('week_id', weekIds.length ? weekIds : ['00000000-0000-0000-0000-000000000000'])
        .gte('scheduled_date', from)
        .lte('scheduled_date', to);

      const programmed = (days || []).filter((d) => !d.is_rest_day).length;
      const dayIds = (days || []).map((d) => d.id);

      const { count: completed } = await supabase
        .from('workout_sessions')
        .select('id', { count: 'exact', head: true })
        .eq('client_id', user!.id)
        .eq('status', 'completed')
        .in('program_day_id', dayIds.length ? dayIds : ['00000000-0000-0000-0000-000000000000']);

      return { programmed, completed: completed ?? 0 };
    },
    enabled: !!user,
  });

  const streak = adherence?.current_streak ?? 0;
  const longestStreak = adherence?.longest_streak ?? 0;
  const pct7d = adherence?.adherence_pct_7d ? Math.round(Number(adherence.adherence_pct_7d)) : 0;
  const programmed = week?.programmed ?? 0;
  const completed = week?.completed ?? 0;
  const weekPct = programmed > 0 ? Math.min(100, Math.round((completed / programmed) * 100)) : 0;

  // Donut math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (weekPct / 100) * circumference;

  return (
    <div className="min-h-screen">
      {/* Header with orange glow */}
      <header
        className="relative px-5 pt-8 pb-10 overflow-hidden"
        style={{
          background:
            'radial-gradient(80% 70% at 60% 0%, hsl(var(--primary) / 0.22), transparent 70%), hsl(var(--background))',
        }}
      >
        <div className="max-w-lg mx-auto">
          <Link to="/" aria-label="Calisthenia Online">
            <img
              src="/lovable-uploads/f3b95d09-dfd8-4644-9fcb-11a257a02133.png"
              alt="Calisthenia Online"
              className="h-12 w-auto"
              width={180}
              height={48}
            />
          </Link>
          <h1 className="mt-8 text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {greeting()}, <span className="font-extrabold">{displayName || 'ATLETA'}</span>
          </h1>
        </div>
      </header>

      <main className="px-5 pb-10 max-w-lg mx-auto space-y-8 -mt-2">
        {/* Plan de hoy */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Plan de hoy</h2>
            <Link
              to="/app/training"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Ver agenda
            </Link>
          </div>

          {loadingPlan ? (
            <Card>
              <CardContent className="p-6 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </CardContent>
            </Card>
          ) : todayPlan ? (
            <Link to="/app/training" className="block group">
              <Card className="rounded-2xl border-border/60 shadow-sm group-hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
                      todayPlan.isRest
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {todayPlan.isRest ? (
                      <Heart className="h-5 w-5" />
                    ) : (
                      <Zap className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{todayPlan.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {todayPlan.isRest
                        ? 'Día de descanso activo'
                        : `${todayPlan.exerciseCount} ejercicio${todayPlan.exerciseCount === 1 ? '' : 's'}`}
                      {todayPlan.sessionStatus === 'completed' && ' · Completado ✓'}
                      {todayPlan.sessionStatus === 'in_progress' && ' · En curso'}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ) : (
            <Card className="rounded-2xl border-dashed">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Hoy no tienes ninguna sesión asignada.
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Resumen semanal */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Resumen semanal</h2>

          <Card className="rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center gap-5">
                {/* Donut */}
                <div className="relative shrink-0">
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle
                      cx="55"
                      cy="55"
                      r={radius}
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="10"
                    />
                    <circle
                      cx="55"
                      cy="55"
                      r={radius}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      transform="rotate(-90 55 55)"
                      style={{ transition: 'stroke-dashoffset 600ms ease' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-foreground leading-none">
                      {completed}
                      <span className="text-base text-muted-foreground">/{programmed || '—'}</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                      Sesiones
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex-1 space-y-3 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Flame className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground leading-none">
                        {streak}
                        {longestStreak > streak && (
                          <span className="text-xs font-normal text-muted-foreground ml-1.5">
                            · récord {longestStreak}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">Racha actual</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground leading-none">{pct7d}%</p>
                      <p className="text-xs text-muted-foreground">Adherencia 7 días</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Objetivo destacado */}
        <PinnedGoalWidget />

        {/* Objetivos del alumno */}
        <GoalsWidget />

        {/* Conecta con otras aplicaciones */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Conecta con otras aplicaciones
          </h2>

          <Card className="rounded-2xl border-dashed">
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex -space-x-2 shrink-0">
                    <div className="h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center">
                      <Heart className="h-4 w-4 text-rose-500" />
                    </div>
                    <div className="h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center">
                      <Watch className="h-4 w-4 text-sky-500" />
                    </div>
                    <div className="h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center">
                      <Smartphone className="h-4 w-4 text-emerald-500" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      Apple Health · Google Fit · Garmin
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sincroniza pasos, frecuencia cardíaca y entrenamientos.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-muted text-muted-foreground shrink-0">
                  Próximamente
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
