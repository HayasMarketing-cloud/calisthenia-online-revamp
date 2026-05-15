import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type PublicExercise = {
  id: string;
  name: string;
  description: string | null;
  seo_slug: string | null;
  primary_keyword: string | null;
  aliases: string[] | null;
  seo_description: string | null;
  monthly_volume: number | null;
  muscle_groups: string[] | null;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced' | null;
  equipment_needed: string[] | null;
  youtube_video_id: string | null;
  public_order: number | null;
};

/**
 * Hook público (sin auth) que devuelve la lista canónica de ejercicios marcados
 * como is_public_seo=true para un grupo muscular concreto. Fuente única para
 * todas las páginas SEO de rutinas.
 */
export function usePublicExercises(muscleGroup: string) {
  return useQuery<PublicExercise[]>({
    queryKey: ['public-exercises', muscleGroup],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exercises')
        .select(
          'id,name,description,seo_slug,primary_keyword,aliases,seo_description,monthly_volume,muscle_groups,difficulty_level,equipment_needed,youtube_video_id,public_order',
        )
        .eq('is_public_seo', true)
        .eq('is_active', true)
        .contains('muscle_groups', [muscleGroup])
        .order('public_order', { ascending: true, nullsFirst: false });
      if (error) throw error;
      return (data ?? []) as PublicExercise[];
    },
    staleTime: 1000 * 60 * 10,
  });
}
