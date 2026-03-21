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
  exercise: {
    id: string;
    name: string;
    description: string | null;
    youtube_video_id: string | null;
    muscle_groups: string[] | null;
    difficulty_level: string | null;
  };
}

export interface TodayTrainingData {
  programName: string;
  programId: string;
  dayId: string;
  dayName: string | null;
  dayNumber: number;
  weekNumber: number;
  isRestDay: boolean;
  exercises: TodayExercise[];
  existingSession: {
    id: string;
    status: string | null;
  } | null;
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
          id, day_number, name, is_rest_day, notes,
          program_weeks!inner(week_number, program_id)
        `)
        .eq('scheduled_date', todayStr)
        .eq('program_weeks.program_id', program.id)
        .maybeSingle();

      if (scheduledDay) {
        dayData = scheduledDay;
      } else {
        // Fallback: get all weeks to determine cycling position
        const { data: weeks } = await supabase
          .from('program_weeks')
          .select('id, week_number')
          .eq('program_id', program.id)
          .order('week_number');

        if (!weeks || weeks.length === 0) return null;

        // Get all days for the program
        const weekIds = weeks.map(w => w.id);
        const { data: allDays } = await supabase
          .from('program_days')
          .select(`
            id, day_number, name, is_rest_day, notes,
            program_weeks!inner(week_number, program_id)
          `)
          .in('week_id', weekIds)
          .order('day_number');

        if (!allDays || allDays.length === 0) return null;

        // Build flat list sorted by week then day
        const sortedDays = allDays.sort((a: any, b: any) => {
          const weekA = Array.isArray(a.program_weeks) ? a.program_weeks[0]?.week_number : a.program_weeks?.week_number;
          const weekB = Array.isArray(b.program_weeks) ? b.program_weeks[0]?.week_number : b.program_weeks?.week_number;
          if (weekA !== weekB) return weekA - weekB;
          return a.day_number - b.day_number;
        });

        // Cycle through days based on days since start
        const idx = daysSinceStart % sortedDays.length;
        dayData = sortedDays[Math.max(0, idx)];
      }

      if (!dayData) return null;

      const weekInfo = Array.isArray(dayData.program_weeks) ? dayData.program_weeks[0] : dayData.program_weeks;

      if (dayData.is_rest_day) {
        return {
          programName: program.name,
          programId: program.id,
          dayId: dayData.id,
          dayName: dayData.name,
          dayNumber: dayData.day_number,
          weekNumber: weekInfo?.week_number || 1,
          isRestDay: true,
          exercises: [],
          existingSession: null,
        };
      }

      // 4. Get exercises for today's day
      const { data: dayExercises, error: exErr } = await supabase
        .from('program_day_exercises')
        .select(`
          id, order_index, sets, reps, rest_seconds, notes, custom_youtube_video_id,
          exercises(id, name, description, youtube_video_id, muscle_groups, difficulty_level)
        `)
        .eq('day_id', dayData.id)
        .order('order_index');

      if (exErr) throw exErr;

      // 5. Check if there's already a session for today
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
        isRestDay: false,
        exercises: (dayExercises || []).map((de: any) => ({
          ...de,
          exercise: de.exercises,
        })),
        existingSession: existingSession || null,
      };
    },
    enabled: !!user,
  });
}
