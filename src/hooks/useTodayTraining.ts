import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface TodayExercise {
  id: string;
  order_index: number;
  sets: number | null;
  reps: string | null;
  rest_seconds: number | null;
  notes: string | null;
  custom_youtube_video_id: string | null;
  isOverrideAdded?: boolean;
  exercise: {
    id: string;
    name: string;
    description: string | null;
    youtube_video_id: string | null;
    muscle_groups: string[] | null;
    difficulty_level: string | null;
  };
}

export interface TodayRunningWorkout {
  id: string;
  name: string;
  total_duration_min: number | null;
  total_distance_km: number | null;
  notes: string | null;
  steps: import('@/lib/runningWorkout').RunningStep[];
}

export interface TodayTrainingData {
  programName: string;
  programId: string;
  dayId: string;
  dayName: string | null;
  dayNumber: number;
  weekNumber: number;
  isRestDay: boolean;
  sessionType: 'strength' | 'running' | 'mobility' | 'mixed';
  exercises: TodayExercise[];
  runningWorkout: TodayRunningWorkout | null;
  existingSession: {
    id: string;
    status: string | null;
  } | null;
  overrideNote: string | null;
  overrideReason: string | null;
  skippedByOverride: boolean;
}

export function useTodayTraining() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['today-training', user?.id],
    queryFn: async (): Promise<TodayTrainingData | null> => {
      // 1. Get user's active program
      const { data: program, error: progErr } = await supabase
        .from('programs')
        .select('id, name, start_date')
        .eq('client_id', user!.id)
        .eq('status', 'active')
        .maybeSingle();

      if (progErr) throw progErr;
      if (!program) return null;

      // 2. Calculate which day of the program we're on
      const startDate = new Date(program.start_date || new Date());
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

      // 3. Try scheduled_date first
      let dayData: any = null;

      const todayStr = today.toISOString().split('T')[0];
      const { data: scheduledDay } = await supabase
        .from('program_days')
        .select(`
          id, day_number, name, is_rest_day, session_type, notes,
          program_weeks!inner(week_number, program_id)
        `)
        .eq('scheduled_date', todayStr)
        .eq('program_weeks.program_id', program.id)
        .maybeSingle();

      if (scheduledDay) {
        dayData = scheduledDay;
      } else {
        const { data: weeks } = await supabase
          .from('program_weeks')
          .select('id, week_number')
          .eq('program_id', program.id)
          .order('week_number');

        if (!weeks || weeks.length === 0) return null;

        const weekIds = weeks.map(w => w.id);
        const { data: allDays } = await supabase
          .from('program_days')
          .select(`
            id, day_number, name, is_rest_day, session_type, notes,
            program_weeks!inner(week_number, program_id)
          `)
          .in('week_id', weekIds)
          .order('day_number');

        if (!allDays || allDays.length === 0) return null;

        const sortedDays = allDays.sort((a: any, b: any) => {
          const weekA = Array.isArray(a.program_weeks) ? a.program_weeks[0]?.week_number : a.program_weeks?.week_number;
          const weekB = Array.isArray(b.program_weeks) ? b.program_weeks[0]?.week_number : b.program_weeks?.week_number;
          if (weekA !== weekB) return weekA - weekB;
          return a.day_number - b.day_number;
        });

        const idx = daysSinceStart % sortedDays.length;
        dayData = sortedDays[Math.max(0, idx)];
      }

      if (!dayData) return null;

      const weekInfo = Array.isArray(dayData.program_weeks) ? dayData.program_weeks[0] : dayData.program_weeks;

      // 4. Load active, non-expired overrides for this day & client
      const nowIso = new Date().toISOString();
      const { data: overridesRaw } = await supabase
        .from('program_day_overrides')
        .select('*')
        .eq('client_id', user!.id)
        .eq('program_day_id', dayData.id)
        .eq('is_active', true)
        .order('applied_at', { ascending: true });
      const overrides = (overridesRaw || []).filter(o => !o.expires_at || o.expires_at > nowIso);

      let isRestDay = !!dayData.is_rest_day;
      let overrideNote: string | null = null;
      let overrideReason: string | null = null;
      let skippedByOverride = false;

      const sessionType: 'strength' | 'running' | 'mobility' | 'mixed' = dayData.session_type || 'strength';

      // 5. Get exercises for today's day (only if not rest, and not a pure running session)
      let exercises: TodayExercise[] = [];
      if (!isRestDay && sessionType !== 'running') {
        const { data: dayExercises, error: exErr } = await supabase
          .from('program_day_exercises')
          .select(`
            id, order_index, sets, reps, rest_seconds, notes, custom_youtube_video_id,
            exercises(id, name, description, youtube_video_id, muscle_groups, difficulty_level)
          `)
          .eq('day_id', dayData.id)
          .order('order_index');
        if (exErr) throw exErr;
        exercises = (dayExercises || []).map((de: any) => ({
          ...de,
          exercise: de.exercises,
        }));
      }

      // 5b. Running workout if applicable
      let runningWorkout: TodayRunningWorkout | null = null;
      if (!isRestDay && sessionType === 'running') {
        const { data: rw } = await supabase
          .from('running_workouts')
          .select('*')
          .eq('program_day_id', dayData.id)
          .maybeSingle();
        if (rw) {
          const { data: steps } = await supabase
            .from('running_workout_steps')
            .select('*')
            .eq('workout_id', rw.id)
            .order('order_index');
          runningWorkout = {
            id: rw.id,
            name: rw.name,
            total_duration_min: rw.total_duration_min,
            total_distance_km: rw.total_distance_km != null ? Number(rw.total_distance_km) : null,
            notes: rw.notes,
            steps: (steps || []) as TodayRunningWorkout['steps'],
          };
        }
      }

      // 6. Apply overrides in order
      if (overrides.length) {
        // Fetch any referenced exercise from catalog (for swap/add)
        const refIds = new Set<string>();
        overrides.forEach(o => {
          const p: any = o.payload_jsonb || {};
          if (p.to_exercise_id) refIds.add(p.to_exercise_id);
          if (o.override_type === 'add_exercise' && p.exercise_id) refIds.add(p.exercise_id);
        });
        let catalog: Record<string, any> = {};
        if (refIds.size) {
          const { data: cat } = await supabase
            .from('exercises')
            .select('id, name, description, youtube_video_id, muscle_groups, difficulty_level')
            .in('id', Array.from(refIds));
          (cat || []).forEach(c => { catalog[c.id] = c; });
        }

        for (const o of overrides) {
          const p: any = o.payload_jsonb || {};
          switch (o.override_type) {
            case 'skip_day':
              isRestDay = true;
              skippedByOverride = true;
              exercises = [];
              overrideReason = p.reason || o.reason || 'Día reasignado por tu coach';
              break;
            case 'custom_note':
              overrideNote = (overrideNote ? overrideNote + ' · ' : '') + (p.note || '');
              break;
            case 'swap_exercise':
              exercises = exercises.map(ex => {
                if (ex.exercise.id !== p.from_exercise_id) return ex;
                const target = catalog[p.to_exercise_id];
                if (!target) return ex;
                return {
                  ...ex,
                  sets: p.sets ?? ex.sets,
                  reps: p.reps ?? ex.reps,
                  rest_seconds: p.rest_seconds ?? ex.rest_seconds,
                  exercise: target,
                };
              });
              break;
            case 'change_sets_reps':
              exercises = exercises.map(ex => {
                if (ex.exercise.id !== p.exercise_id) return ex;
                return {
                  ...ex,
                  sets: p.sets ?? ex.sets,
                  reps: p.reps ?? ex.reps,
                  rest_seconds: p.rest_seconds ?? ex.rest_seconds,
                };
              });
              break;
            case 'remove_exercise':
              exercises = exercises.filter(ex => ex.exercise.id !== p.exercise_id);
              break;
            case 'add_exercise': {
              const target = catalog[p.exercise_id];
              if (target) {
                exercises.push({
                  id: `override-${o.id}`,
                  order_index: exercises.length,
                  sets: p.sets ?? 3,
                  reps: p.reps ?? '10',
                  rest_seconds: p.rest_seconds ?? 60,
                  notes: o.reason || null,
                  custom_youtube_video_id: null,
                  isOverrideAdded: true,
                  exercise: target,
                });
              }
              break;
            }
          }
        }
      }

      // 7. Check existing session for today
      const { data: existingSession } = await supabase
        .from('workout_sessions')
        .select('id, status')
        .eq('client_id', user!.id)
        .eq('program_day_id', dayData.id)
        .gte('started_at', todayStr)
        .maybeSingle();

      return {
        programName: program.name,
        programId: program.id,
        dayId: dayData.id,
        dayName: dayData.name,
        dayNumber: dayData.day_number,
        weekNumber: weekInfo?.week_number || 1,
        isRestDay,
        exercises,
        existingSession: existingSession || null,
        overrideNote,
        overrideReason,
        skippedByOverride,
      };
    },
    enabled: !!user,
  });
}
