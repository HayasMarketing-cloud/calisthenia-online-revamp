import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ExerciseCardProps {
  number: number;
  title: string;
  emoji: string;
  targetMuscles: string;
  sets?: number;
  reps?: string;
  time?: string;
  description: string;
  tips?: string[];
  variations?: string[];
}

const ExerciseCard = ({
  number,
  title,
  emoji,
  targetMuscles,
  sets,
  reps,
  time,
  description,
  tips,
  variations,
}: ExerciseCardProps) => {
  const getDifficultyColor = () => {
    return "bg-gradient-to-r from-primary to-accent";
  };

  return (
    <Card className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Number Badge */}
          <div
            className={`${getDifficultyColor()} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0`}
          >
            {number}
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Title and Emoji */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{emoji}</span>
              <h4 className="font-bold text-xl">{title}</h4>
            </div>

            {/* Target Muscles */}
            <div className="mb-3">
              <Badge variant="secondary" className="mb-2">
                🎯 {targetMuscles}
              </Badge>
            </div>

            {/* Sets, Reps, Time */}
            <div className="flex flex-wrap gap-3 mb-4">
              {sets && (
                <div className="bg-secondary/30 px-3 py-1 rounded-md text-sm">
                  <strong>Series:</strong> {sets}
                </div>
              )}
              {reps && (
                <div className="bg-secondary/30 px-3 py-1 rounded-md text-sm">
                  <strong>Reps:</strong> {reps}
                </div>
              )}
              {time && (
                <div className="bg-secondary/30 px-3 py-1 rounded-md text-sm">
                  <strong>Tiempo:</strong> {time}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-4">{description}</p>

            {/* Accordion for Tips and Variations */}
            {(tips || variations) && (
              <Accordion type="single" collapsible className="w-full">
                {tips && tips.length > 0 && (
                  <AccordionItem value="tips" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
                      💡 Consejos de Ejecución
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {variations && variations.length > 0 && (
                  <AccordionItem value="variations" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
                      🔄 Variaciones y Progresiones
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {variations.map((variation, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent">•</span>
                            <span>{variation}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
