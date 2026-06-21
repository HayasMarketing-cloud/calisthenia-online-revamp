import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Dumbbell, Play, CheckCircle2, BedDouble } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTodayTraining } from '@/hooks/useTodayTraining';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import TrainingExerciseCard from '@/components/app/TrainingExerciseCard';
import RunningWorkoutView from '@/components/app/RunningWorkoutView';
import SessionCheckinDialog from '@/components/app/SessionCheckinDialog';

const Training = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: today, isLoading, error } = useTodayTraining();

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [showCheckin, setShowCheckin] = useState(false);
  const [starting, setStarting] = useState(false);

  const isSessionActive = !!sessionId || today?.existingSession?.status === 'in_progress';
  const activeSessionId = sessionId || today?.existingSession?.id;
  const isCompleted = today?.existingSession?.status === 'completed';

  const progress = useMemo(() => {
    if (!today?.exercises.length) return 0;
    return Math.round((completedExercises.size / today.exercises.length) * 100);
  }, [completedExercises.size, today?.exercises.length]);

  const handleStartSession = useCallback(async () => {
    if (!user || !today) return;
    setStarting(true);
    try {
      const { data, error } = await supabase
        .from('workout_sessions')
        .insert({
          client_id: user.id,
          program_day_id: today.dayId,
          status: 'in_progress',
        })
        .select('id')
        .single();
      if (error) throw error;
      setSessionId(data.id);
      toast({ title: '¡Sesión iniciada! 🏋️', description: 'Marca los ejercicios a medida que los completes.' });
    } catch {
      toast({ title: 'Error al iniciar sesión', variant: 'destructive' });
    } finally {
      setStarting(false);
    }
  }, [user, today]);

  const handleToggleExercise = useCallback(async (exerciseId: string) => {
    const sid = activeSessionId;
    if (!sid) return;

    setCompletedExercises(prev => {
      const next = new Set(prev);
      if (next.has(exerciseId)) {
        next.delete(exerciseId);
      } else {
        next.add(exerciseId);
      }
      return next;
    });

    // Log to DB (fire and forget) — skip synthetic exercises added by overrides
    const isNowCompleted = !completedExercises.has(exerciseId);
    const item = today?.exercises.find(e => e.id === exerciseId);
    if (isNowCompleted && item && !item.isOverrideAdded && !exerciseId.startsWith('override-')) {
      await supabase.from('session_exercise_logs').insert({
        session_id: sid,
        program_day_exercise_id: exerciseId,
        sets_completed: item?.sets || null,
        reps_completed: item?.reps || null,
        completed: true,
      });
    }
  }, [activeSessionId, completedExercises, today]);

  const handleFinishSession = useCallback(() => {
    setShowCheckin(true);
  }, []);

  const handleCheckinSubmit = useCallback(async (data: import('@/components/app/SessionCheckinDialog').CheckinPayload) => {
    const sid = activeSessionId;
    if (!sid) return;

    const endedAt = new Date();

    // Obtener started_at para calcular duración real
    const { data: sessionRow } = await supabase
      .from('workout_sessions')
      .select('started_at')
      .eq('id', sid)
      .maybeSingle();

    let durationMinutes: number | null = null;
    if (sessionRow?.started_at) {
      const startMs = new Date(sessionRow.started_at).getTime();
      const diffMin = Math.max(0, Math.round((endedAt.getTime() - startMs) / 60000));
      durationMinutes = diffMin > 0 ? diffMin : null;
    }

    // Update session status
    await supabase
      .from('workout_sessions')
      .update({ status: 'completed', completed_at: endedAt.toISOString() })
      .eq('id', sid);

    // Insert check-in (duración calculada automáticamente)
    await supabase.from('session_checkins').insert({
      session_id: sid,
      completed_workout: true,
      difficulty_rating: data.difficulty,
      comment: data.comment || null,
      session_feeling: data.session_feeling,
      duration_minutes_real: durationMinutes,
    });


    // Recalculate adherence
    await supabase.rpc('recalculate_adherence', { p_client_id: user!.id });

    // Leer racha actualizada para celebración
    const { data: adh } = await supabase
      .from('client_adherence')
      .select('current_streak, longest_streak')
      .eq('client_id', user!.id)
      .maybeSingle();

    setShowCheckin(false);
    queryClient.invalidateQueries({ queryKey: ['today-training'] });
    queryClient.invalidateQueries({ queryKey: ['client-adherence'] });
    queryClient.invalidateQueries({ queryKey: ['client-milestones'] });

    const streak = adh?.current_streak ?? 0;
    const isRecord = adh && adh.current_streak >= (adh.longest_streak ?? 0) && streak > 1;
    let description = 'Tu progreso ha sido registrado.';
    if (streak >= 2) description = `¡Racha de ${streak} días${isRecord ? ' — nuevo récord 🏆' : ' 🔥'}!`;
    toast({ title: '¡Sesión completada! 🎉', description });
  }, [activeSessionId, user, queryClient]);

  // Loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // No active program
  if (!today) {
    return (
      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Mi Entrenamiento</h1>
        <Card>
          <CardContent className="p-8 text-center">
            <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Aún no tienes un programa activo. Nico te lo asignará pronto.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Rest day (incluye skipped por override)
  if (today.isRestDay) {
    return (
      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Mi Entrenamiento</h1>
        <Card>
          <CardContent className="p-8 text-center">
            <BedDouble className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">
              {today.skippedByOverride ? 'Día reasignado 🛌' : 'Día de descanso 😴'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {today.skippedByOverride
                ? (today.overrideReason || 'Tu coach ha marcado hoy como descanso.')
                : 'Hoy toca recuperar. Hidrátate, estira y descansa para volver más fuerte mañana.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Session completed
  if (isCompleted) {
    return (
      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Mi Entrenamiento</h1>
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">¡Sesión completada! 🎉</h2>
            <p className="text-sm text-muted-foreground">
              Buen trabajo hoy. Mañana te espera una nueva sesión.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isRunning = today.sessionType === 'running';

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mi Entrenamiento</h1>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="text-xs">
            Semana {today.weekNumber}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {today.dayName || `Día ${today.dayNumber}`}
          </Badge>
          {isRunning && <Badge className="text-xs">Carrera</Badge>}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{today.programName}</p>
      </div>

      {today.overrideNote && (
        <div className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-foreground">
          <span className="font-medium">Nota de tu coach: </span>
          <span className="text-muted-foreground">{today.overrideNote}</span>
        </div>
      )}

      {isRunning ? (
        <>
          {today.runningWorkout ? (
            <RunningWorkoutView workout={today.runningWorkout} steps={today.runningWorkout.steps} />
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground">Tu coach todavía no ha definido la sesión de carrera de hoy.</p>
              </CardContent>
            </Card>
          )}
          <Button
            onClick={isSessionActive ? handleFinishSession : handleStartSession}
            disabled={starting}
            size="lg"
            className="w-full gap-2"
          >
            {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : isSessionActive ? <CheckCircle2 className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isSessionActive ? 'Marcar como completada' : 'Empezar sesión'}
          </Button>
        </>
      ) : (
        <>
          {/* Progress bar (only when session is active) */}
          {isSessionActive && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{completedExercises.size}/{today.exercises.length} ejercicios</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Start button or exercise list */}
          {!isSessionActive ? (
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <Dumbbell className="h-10 w-10 text-primary mx-auto" />
                <div>
                  <p className="font-semibold">{today.exercises.length} ejercicios hoy</p>
                  <p className="text-sm text-muted-foreground">
                    {today.dayName || `Día ${today.dayNumber}`} · Semana {today.weekNumber}
                  </p>
                </div>
                <Button onClick={handleStartSession} disabled={starting} size="lg" className="w-full gap-2">
                  {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                  Empezar sesión
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-3">
                {today.exercises.map((item, i) => (
                  <TrainingExerciseCard
                    key={item.id}
                    item={item}
                    index={i}
                    completed={completedExercises.has(item.id)}
                    onToggle={handleToggleExercise}
                  />
                ))}
              </div>

              <Button
                onClick={handleFinishSession}
                size="lg"
                className="w-full gap-2"
                variant={progress === 100 ? 'default' : 'outline'}
              >
                <CheckCircle2 className="h-4 w-4" />
                Terminar sesión
              </Button>
            </>
          )}
        </>
      )}

      {/* Check-in dialog */}
      <SessionCheckinDialog
        open={showCheckin}
        onClose={() => setShowCheckin(false)}
        onSubmit={handleCheckinSubmit}
      />
    </div>
  );
};

export default Training;
