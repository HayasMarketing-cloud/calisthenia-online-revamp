import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Flame, TrendingUp, Zap, Wind } from "lucide-react";

type Week = {
  id: string;
  label: string;
  phase: string;
  rpe: string;
  goal: string;
  coachNote: string;
  exercises: { name: string; sets: string; reps: string; rest: string }[];
  Icon: typeof Flame;
};

const WEEKS: Week[] = [
  {
    id: "semana-1",
    label: "Semana 1",
    phase: "Adaptación",
    rpe: "RPE 6 / 10",
    goal: "Aprender la técnica y crear el hábito de entrenar 3 días sin material.",
    coachNote: "Prioriza la técnica sobre las repeticiones. Si una flexión completa te cuesta, apoya las rodillas.",
    Icon: Flame,
    exercises: [
      { name: "Sentadillas", sets: "3", reps: "10", rest: "60s" },
      { name: "Flexiones (rodillas si hace falta)", sets: "3", reps: "8", rest: "60s" },
      { name: "Remo invertido en mesa", sets: "3", reps: "8", rest: "75s" },
      { name: "Plancha frontal", sets: "3", reps: "30s", rest: "45s" },
    ],
  },
  {
    id: "semana-2",
    label: "Semana 2",
    phase: "Volumen",
    rpe: "RPE 7 / 10",
    goal: "Subir el volumen total: +2 reps por serie y añade un 4º día opcional.",
    coachNote: "Mantén el tempo controlado (3-1-3). Si subes reps pero pierdes técnica, baja a la cifra anterior.",
    Icon: TrendingUp,
    exercises: [
      { name: "Sentadillas", sets: "4", reps: "12", rest: "60s" },
      { name: "Flexiones", sets: "4", reps: "10", rest: "60s" },
      { name: "Remo invertido en mesa", sets: "4", reps: "10", rest: "60s" },
      { name: "Plancha frontal", sets: "3", reps: "40s", rest: "45s" },
    ],
  },
  {
    id: "semana-3",
    label: "Semana 3",
    phase: "Intensidad",
    rpe: "RPE 8 / 10",
    goal: "Subir intensidad: variantes más exigentes y menos descanso.",
    coachNote: "Acerca cada serie al fallo técnico (RIR 1-2). El descanso baja a 45-60s para forzar adaptación.",
    Icon: Zap,
    exercises: [
      { name: "Sentadilla búlgara (sin peso)", sets: "4", reps: "8/pierna", rest: "60s" },
      { name: "Flexiones diamante o pike push-ups", sets: "4", reps: "8", rest: "60s" },
      { name: "Remo invertido pies elevados", sets: "4", reps: "10", rest: "60s" },
      { name: "Plancha + mountain climbers", sets: "3", reps: "45s", rest: "45s" },
    ],
  },
  {
    id: "semana-4",
    label: "Semana 4",
    phase: "Deload + test",
    rpe: "RPE 5 / 10 + máximas",
    goal: "Recuperar y medir: 2 sesiones suaves + 1 test de máximas (flexiones y sentadillas en 1 minuto).",
    coachNote: "El deload no es opcional. Volver a entrenar fresco la próxima semana es lo que asegura progreso real.",
    Icon: Wind,
    exercises: [
      { name: "Sentadillas (técnica)", sets: "3", reps: "10", rest: "60s" },
      { name: "Flexiones (técnica)", sets: "3", reps: "8", rest: "60s" },
      { name: "Remo invertido", sets: "3", reps: "8", rest: "60s" },
      { name: "Test: máx. flexiones en 60s", sets: "1", reps: "AMRAP", rest: "—" },
    ],
  },
];

const WeeklyPlanTabs = () => {
  const planJsonLd = {
    "@context": "https://schema.org",
    "@type": "ExercisePlan",
    name: "Plan progresivo de calistenia en casa: 4 semanas",
    description: "Plan de 4 semanas para entrenar calistenia en casa sin material: adaptación, volumen, intensidad y deload.",
    activityFrequency: "3-4 días por semana",
    intensity: "Progresiva (RPE 6 → 8)",
    hasPart: WEEKS.map((w) => ({
      "@type": "ExercisePlan",
      name: `${w.label} · ${w.phase}`,
      description: w.goal,
      intensity: w.rpe,
      exerciseType: w.exercises.map((e) => e.name).join(", "),
      repetitions: w.exercises.map((e) => `${e.sets}x${e.reps}`).join(" · "),
      restPeriods: w.exercises.map((e) => e.rest).join(" / "),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(planJsonLd) }}
      />
      <Tabs defaultValue="semana-1" className="w-full max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-transparent p-0">
          {WEEKS.map((w) => {
            const Icon = w.Icon;
            return (
              <TabsTrigger
                key={w.id}
                value={w.id}
                className="flex flex-col items-start gap-1 p-4 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border rounded-xl"
              >
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-80">
                  <Icon className="w-3.5 h-3.5" />
                  {w.label}
                </span>
                <span className="font-display font-bold text-base">{w.phase}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {WEEKS.map((w) => (
          <TabsContent key={w.id} value={w.id} className="mt-6">
            <Card className="border-primary/20">
              <CardContent className="p-6 md:p-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                    {w.phase}
                  </Badge>
                  <Badge variant="outline">{w.rpe}</Badge>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Objetivo:</strong> {w.goal}
                </p>

                <div className="overflow-x-auto rounded-lg border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/60 hover:bg-muted/60">
                        <TableHead>Ejercicio</TableHead>
                        <TableHead className="text-center">Series</TableHead>
                        <TableHead className="text-center">Reps</TableHead>
                        <TableHead className="text-center">Descanso</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {w.exercises.map((ex) => (
                        <TableRow key={ex.name}>
                          <TableCell className="font-medium">{ex.name}</TableCell>
                          <TableCell className="text-center">{ex.sets}</TableCell>
                          <TableCell className="text-center">{ex.reps}</TableCell>
                          <TableCell className="text-center text-muted-foreground">{ex.rest}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-primary">Nota del coach:</strong> {w.coachNote}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default WeeklyPlanTabs;
