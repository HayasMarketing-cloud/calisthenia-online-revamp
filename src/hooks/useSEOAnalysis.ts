import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { extractPageContent, hasEnoughContent } from '@/lib/seoContentExtractor';

export interface SEOSuggestions {
  title: string;
  description: string;
  h1: string;
  h2_primary: string;
  h2_secondary_1: string;
  h2_secondary_2: string;
  keywords: string[];
}

export interface SEOAnalysisResult {
  suggestions: SEOSuggestions;
  analyzedAt: Date;
}

export function useSEOAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<SEOSuggestions | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Analyzes a specific page path by extracting content from the DOM
   * or by providing content directly
   */
  const analyzePage = async (path: string, providedContent?: string) => {
    setIsAnalyzing(true);
    setError(null);
    setSuggestions(null);

    try {
      let content: string;

      if (providedContent) {
        content = providedContent;
      } else {
        // Extract content from current page DOM
        const extracted = extractPageContent(2000);
        
        if (!hasEnoughContent(extracted)) {
          throw new Error('La página no tiene suficiente contenido para analizar');
        }
        
        content = extracted.fullText;
      }

      console.log(`Analyzing SEO for path: ${path}`);
      console.log(`Content length: ${content.length} characters`);

      // Call the edge function
      const { data, error: functionError } = await supabase.functions.invoke('analyze-seo', {
        body: { content, path }
      });

      if (functionError) {
        console.error('Edge function error:', functionError);
        throw new Error(functionError.message || 'Error al analizar el SEO');
      }

      if (!data || !data.suggestions) {
        throw new Error('No se recibieron sugerencias del análisis');
      }

      const result: SEOSuggestions = data.suggestions;
      
      // Validate suggestions
      if (!result.title || !result.description || !result.h1) {
        throw new Error('Las sugerencias recibidas están incompletas');
      }

      setSuggestions(result);
      console.log('SEO analysis completed successfully');
      
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('SEO Analysis error:', err);
      setError(errorMessage);
      
      // Handle specific error types
      if (errorMessage.includes('429') || errorMessage.includes('Rate limit')) {
        toast.error('Límite de peticiones alcanzado. Intenta de nuevo en unos minutos.');
      } else if (errorMessage.includes('402') || errorMessage.includes('Payment')) {
        toast.error('Fondos insuficientes. Añade créditos en Settings → Workspace → Usage.');
      } else {
        toast.error(`Error en el análisis: ${errorMessage}`);
      }
      
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Clears the current analysis results
   */
  const clearSuggestions = () => {
    setSuggestions(null);
    setError(null);
  };

  return {
    analyzePage,
    isAnalyzing,
    suggestions,
    error,
    clearSuggestions
  };
}
