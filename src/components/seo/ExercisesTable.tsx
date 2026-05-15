import { Helmet } from 'react-helmet-async';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, Youtube } from 'lucide-react';
import { usePublicExercises, type PublicExercise } from '@/hooks/usePublicExercises';

interface ExercisesTableProps {
  muscleGroup: string;
  caption?: string;
  /** Render <h3> headers per exercise (set false if the parent already does so) */
  renderHeadings?: boolean;
}

const difficultyLabel: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

const buildItemListSchema = (exercises: PublicExercise[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: exercises.map((ex, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    item: {
      '@type': 'ExerciseAction',
      name: ex.name,
      description: ex.seo_description ?? ex.description ?? undefined,
      ...(ex.youtube_video_id && {
        video: {
          '@type': 'VideoObject',
          name: ex.name,
          embedUrl: `https://www.youtube.com/embed/${ex.youtube_video_id}`,
        },
      }),
    },
  })),
});

const ExercisesTable = ({
  muscleGroup,
  caption = 'Tabla completa de ejercicios canónicos',
  renderHeadings = true,
}: ExercisesTableProps) => {
  const { data: exercises, isLoading, error } = usePublicExercises(muscleGroup);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !exercises || exercises.length === 0) {
    return null;
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(buildItemListSchema(exercises))}
        </script>
      </Helmet>

      {renderHeadings && (
        <div className="sr-only">
          {exercises.map((ex) => (
            <h3 key={`heading-${ex.id}`} id={ex.seo_slug ?? undefined}>
              {ex.name}
            </h3>
          ))}
        </div>
      )}

      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableCaption className="px-4">{caption}</TableCaption>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead scope="col">Ejercicio</TableHead>
              <TableHead scope="col" className="hidden md:table-cell">
                Músculos
              </TableHead>
              <TableHead scope="col" className="hidden sm:table-cell">
                Material
              </TableHead>
              <TableHead scope="col">Nivel</TableHead>
              <TableHead scope="col" className="text-right">
                Vídeo
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercises.map((ex) => (
              <TableRow key={ex.id}>
                <TableCell className="align-top">
                  <div className="font-semibold text-foreground">{ex.name}</div>
                  {ex.seo_description && (
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-md">
                      {ex.seo_description}
                    </p>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell align-top">
                  <div className="flex flex-wrap gap-1">
                    {(ex.muscle_groups ?? []).map((m) => (
                      <Badge key={m} variant="outline" className="text-[10px]">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell align-top text-xs text-muted-foreground">
                  {ex.equipment_needed && ex.equipment_needed.length > 0
                    ? ex.equipment_needed.join(', ')
                    : 'Sin material'}
                </TableCell>
                <TableCell className="align-top">
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    {difficultyLabel[ex.difficulty_level ?? 'beginner']}
                  </Badge>
                </TableCell>
                <TableCell className="text-right align-top">
                  {ex.youtube_video_id ? (
                    <a
                      href={`https://www.youtube.com/watch?v=${ex.youtube_video_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver vídeo de ${ex.name} en YouTube`}
                      className="inline-flex items-center gap-1 text-primary hover:underline text-xs"
                    >
                      <Youtube className="h-4 w-4" />
                      <span className="hidden sm:inline">Ver</span>
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ExercisesTable;
