import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ArrowRight, Sparkles } from "lucide-react";
import { SEOSuggestions } from "@/hooks/useSEOAnalysis";

interface SEOAISuggestionsProps {
  suggestions: SEOSuggestions;
  currentData: {
    title?: string;
    description?: string;
    h1?: string;
    h2_primary?: string;
    h2_secondary_1?: string;
    h2_secondary_2?: string;
    keywords?: string[];
  };
  onApply: (field: string, value: string | string[]) => void;
  onApplyAll: () => void;
  onDiscard: () => void;
}

const SEOAISuggestions = ({
  suggestions,
  currentData,
  onApply,
  onApplyAll,
  onDiscard,
}: SEOAISuggestionsProps) => {
  const getCharCount = (text: string | undefined) => text?.length || 0;
  
  const getQualityColor = (current: number, suggested: number, optimal: { min: number; max: number }) => {
    const currentInRange = current >= optimal.min && current <= optimal.max;
    const suggestedInRange = suggested >= optimal.min && suggested <= optimal.max;
    
    if (suggestedInRange && !currentInRange) return "text-green-600";
    if (suggestedInRange) return "text-green-600";
    return "text-yellow-600";
  };

  const renderComparison = (
    label: string,
    currentValue: string | undefined,
    suggestedValue: string,
    fieldKey: string,
    optimal?: { min: number; max: number }
  ) => {
    const currentLength = getCharCount(currentValue);
    const suggestedLength = getCharCount(suggestedValue);
    const hasImprovement = currentValue !== suggestedValue;

    return (
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold flex items-center gap-2">
            {label}
            {hasImprovement && <Sparkles className="h-4 w-4 text-primary" />}
          </h4>
          {optimal && (
            <Badge variant="outline" className="text-xs">
              Óptimo: {optimal.min}-{optimal.max} chars
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          {/* Current Value */}
          <div className="p-3 bg-muted/50 rounded-md">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-xs font-medium text-muted-foreground">ACTUAL</span>
              <Badge variant="secondary" className="text-xs">
                {currentLength} chars
              </Badge>
            </div>
            <p className="text-sm">{currentValue || "Sin definir"}</p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>

          {/* Suggested Value */}
          <div className="p-3 bg-primary/5 border-2 border-primary/20 rounded-md">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-xs font-medium text-primary">SUGERIDO POR IA</span>
              <Badge 
                variant="default" 
                className={optimal ? getQualityColor(currentLength, suggestedLength, optimal) : ""}
              >
                {suggestedLength} chars
              </Badge>
            </div>
            <p className="text-sm font-medium">{suggestedValue}</p>
          </div>
        </div>

        {hasImprovement && (
          <Button
            onClick={() => onApply(fieldKey, suggestedValue)}
            size="sm"
            className="w-full"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Aplicar esta sugerencia
          </Button>
        )}
      </Card>
    );
  };

  const renderKeywordsComparison = () => {
    const currentKeywords = currentData.keywords || [];
    const suggestedKeywords = suggestions.keywords || [];
    const hasImprovement = JSON.stringify(currentKeywords.sort()) !== JSON.stringify(suggestedKeywords.sort());

    return (
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold flex items-center gap-2">
            Keywords
            {hasImprovement && <Sparkles className="h-4 w-4 text-primary" />}
          </h4>
          <Badge variant="outline" className="text-xs">
            Óptimo: 5-7 keywords
          </Badge>
        </div>

        <div className="space-y-2">
          {/* Current Keywords */}
          <div className="p-3 bg-muted/50 rounded-md">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-medium text-muted-foreground">ACTUALES</span>
              <Badge variant="secondary" className="text-xs">
                {currentKeywords.length} keywords
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {currentKeywords.length > 0 ? (
                currentKeywords.map((keyword, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">Sin keywords definidas</span>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>

          {/* Suggested Keywords */}
          <div className="p-3 bg-primary/5 border-2 border-primary/20 rounded-md">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-medium text-primary">SUGERIDAS POR IA</span>
              <Badge variant="default" className="text-xs">
                {suggestedKeywords.length} keywords
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {suggestedKeywords.map((keyword, idx) => (
                <Badge key={idx} variant="default" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {hasImprovement && (
          <Button
            onClick={() => onApply('keywords', suggestedKeywords)}
            size="sm"
            className="w-full"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Aplicar estas keywords
          </Button>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Sugerencias de IA</h3>
        </div>
        <div className="flex gap-2">
          <Button onClick={onApplyAll} size="sm" variant="default">
            <CheckCircle className="h-4 w-4 mr-2" />
            Aplicar todas
          </Button>
          <Button onClick={onDiscard} size="sm" variant="outline">
            <XCircle className="h-4 w-4 mr-2" />
            Descartar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {renderComparison("Title", currentData.title, suggestions.title, "title", { min: 50, max: 60 })}
        {renderComparison("Meta Description", currentData.description, suggestions.description, "description", { min: 150, max: 160 })}
        {renderComparison("H1", currentData.h1, suggestions.h1, "h1", { min: 20, max: 60 })}
        {renderComparison("H2 Primary", currentData.h2_primary, suggestions.h2_primary, "h2_primary")}
        {renderComparison("H2 Secondary 1", currentData.h2_secondary_1, suggestions.h2_secondary_1, "h2_secondary_1")}
        {renderComparison("H2 Secondary 2", currentData.h2_secondary_2, suggestions.h2_secondary_2, "h2_secondary_2")}
      </div>

      {renderKeywordsComparison()}
    </div>
  );
};

export default SEOAISuggestions;
