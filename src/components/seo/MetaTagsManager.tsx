import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Edit,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useAllSEOPages, useUpdateSEOPage, SEOPage } from "@/hooks/useSEOData";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useSEOAnalysis } from "@/hooks/useSEOAnalysis";
import SEOAISuggestions from "./SEOAISuggestions";

const MetaTagsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPage, setEditingPage] = useState<SEOPage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [analyzingPath, setAnalyzingPath] = useState<string | null>(null);

  const { data: pages, isLoading } = useAllSEOPages();
  const updateMutation = useUpdateSEOPage();
  const { toast } = useToast();
  const { analyzePage, isAnalyzing, suggestions, clearSuggestions } = useSEOAnalysis();

  const filteredPages = pages?.filter(
    (page) =>
      page.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateSEOScore = (page: SEOPage) => {
    let score = 0;
    const checks = [
      { condition: !!page.title, weight: 20 },
      {
        condition: page.title && page.title.length >= 50 && page.title.length <= 60,
        weight: 10,
      },
      { condition: !!page.description, weight: 20 },
      {
        condition:
          page.description &&
          page.description.length >= 150 &&
          page.description.length <= 160,
        weight: 10,
      },
      { condition: !!page.h1, weight: 15 },
      { condition: !!page.h2_primary, weight: 10 },
      { condition: !!page.h2_secondary_1, weight: 5 },
      { condition: !!page.canonical, weight: 5 },
      { condition: !!page.keywords && page.keywords.length > 0, weight: 5 },
    ];

    checks.forEach((check) => {
      if (check.condition) score += check.weight;
    });

    return score;
  };

  const getStatusBadge = (page: SEOPage) => {
    const score = calculateSEOScore(page);

    if (score >= 80) {
      return (
        <Badge variant="default" className="gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Completo ({score}%)
        </Badge>
      );
    } else if (score >= 50) {
      return (
        <Badge variant="secondary" className="gap-1">
          <AlertCircle className="w-3 h-3" />
          Básico ({score}%)
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="w-3 h-3" />
          Incompleto ({score}%)
        </Badge>
      );
    }
  };

  const handleEdit = (page: SEOPage) => {
    setEditingPage({
      ...page,
      keywords: page.keywords || [],
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingPage) return;

    try {
      await updateMutation.mutateAsync(editingPage);
      toast({
        title: "SEO actualizado",
        description: "Los cambios se han guardado correctamente.",
      });
      setIsDialogOpen(false);
      setEditingPage(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios.",
        variant: "destructive",
      });
    }
  };

  const handleKeywordChange = (value: string) => {
    if (!editingPage) return;
    const keywords = value.split(",").map((k) => k.trim()).filter(Boolean);
    setEditingPage({ ...editingPage, keywords });
  };

  const handleAnalyzeWithAI = async (page: SEOPage) => {
    setAnalyzingPath(page.path);
    setEditingPage({
      ...page,
      keywords: page.keywords || [],
    });
    setIsDialogOpen(true);

    try {
      // Generate a simple content summary for analysis
      const content = `
        Ruta: ${page.path}
        Título actual: ${page.title || 'Sin título'}
        Descripción actual: ${page.description || 'Sin descripción'}
        H1 actual: ${page.h1 || 'Sin H1'}
        Tipo de página: ${page.path.includes('rutina') ? 'Rutina de ejercicios' : 'Página general'}
        ${page.path.includes('brazos') ? 'Enfocada en ejercicios de brazos' : ''}
        ${page.path.includes('piernas') ? 'Enfocada en ejercicios de piernas' : ''}
        ${page.path.includes('abdomen') ? 'Enfocada en ejercicios de abdomen' : ''}
        ${page.path.includes('espalda') ? 'Enfocada en ejercicios de espalda' : ''}
        ${page.path.includes('pecho') ? 'Enfocada en ejercicios de pecho' : ''}
        ${page.path.includes('full-body') ? 'Enfocada en ejercicios de cuerpo completo' : ''}
        ${page.path.includes('principiantes') ? 'Dirigida a principiantes en calistenia' : ''}
        ${page.path.includes('avanzado') ? 'Dirigida a nivel avanzado en calistenia' : ''}
        ${page.path.includes('parque') ? 'Ejercicios para hacer en el parque' : ''}
        ${page.path.includes('casa') ? 'Ejercicios para hacer en casa' : ''}
      `;

      await analyzePage(page.path, content);
      
      toast({
        title: "Análisis completado",
        description: "La IA ha generado sugerencias de optimización SEO.",
      });
    } catch (error) {
      console.error('Error analyzing page:', error);
      // Toast error already shown by the hook
    } finally {
      setAnalyzingPath(null);
    }
  };

  const handleApplySuggestion = (field: string, value: string | string[]) => {
    if (!editingPage) return;
    setEditingPage({ ...editingPage, [field]: value });
  };

  const handleApplyAllSuggestions = () => {
    if (!editingPage || !suggestions) return;
    
    setEditingPage({
      ...editingPage,
      title: suggestions.title,
      description: suggestions.description,
      h1: suggestions.h1,
      h2_primary: suggestions.h2_primary,
      h2_secondary_1: suggestions.h2_secondary_1,
      h2_secondary_2: suggestions.h2_secondary_2,
      keywords: suggestions.keywords,
    });

    clearSuggestions();
    
    toast({
      title: "Sugerencias aplicadas",
      description: "Todas las sugerencias de la IA se han aplicado. Recuerda guardar los cambios.",
    });
  };

  const handleDiscardSuggestions = () => {
    clearSuggestions();
    toast({
      title: "Sugerencias descartadas",
      description: "Las sugerencias de la IA han sido descartadas.",
    });
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Gestión de Meta Tags</h2>
            <p className="text-muted-foreground">
              Edita los meta tags, títulos y descripciones SEO de cada página
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por ruta o título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3">
            {filteredPages?.map((page) => {
              const score = calculateSEOScore(page);

              return (
                <Card key={page.path} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {page.path}
                        </code>
                        {getStatusBadge(page)}
                        <a
                          href={page.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <Progress value={score} className="h-2" />

                      <div className="text-sm space-y-1">
                        <div>
                          <span className="font-medium">Título:</span>{" "}
                          {page.title || "Sin definir"}{" "}
                          {page.title && (
                            <span
                              className={
                                page.title.length >= 50 && page.title.length <= 60
                                  ? "text-green-600"
                                  : "text-orange-600"
                              }
                            >
                              ({page.title.length} chars)
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Descripción:</span>{" "}
                          {page.description || "Sin definir"}{" "}
                          {page.description && (
                            <span
                              className={
                                page.description.length >= 150 &&
                                page.description.length <= 160
                                  ? "text-green-600"
                                  : "text-orange-600"
                              }
                            >
                              ({page.description.length} chars)
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">H1:</span>{" "}
                          {page.h1 || "Sin definir"}
                        </div>
                        {page.h2_primary && (
                          <div>
                            <span className="font-medium">H2 Principal:</span>{" "}
                            {page.h2_primary}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleAnalyzeWithAI(page)}
                        disabled={isAnalyzing && analyzingPath === page.path}
                      >
                        {isAnalyzing && analyzingPath === page.path ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analizando...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Analizar con IA
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(page)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar SEO de {editingPage?.path}</DialogTitle>
            <DialogDescription>
              Configura los meta tags y contenido SEO de esta página
            </DialogDescription>
          </DialogHeader>

          {editingPage && (
            <div className="space-y-4">
              {suggestions && (
                <SEOAISuggestions
                  suggestions={suggestions}
                  currentData={editingPage}
                  onApply={handleApplySuggestion}
                  onApplyAll={handleApplyAllSuggestions}
                  onDiscard={handleDiscardSuggestions}
                />
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Título (50-60 caracteres óptimo)</Label>
                <Input
                  id="title"
                  value={editingPage.title || ""}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, title: e.target.value })
                  }
                  placeholder="Título de la página"
                />
                <span
                  className={`text-sm ${
                    editingPage.title &&
                    editingPage.title.length >= 50 &&
                    editingPage.title.length <= 60
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {editingPage.title?.length || 0} caracteres
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Meta Description (150-160 caracteres óptimo)
                </Label>
                <Textarea
                  id="description"
                  value={editingPage.description || ""}
                  onChange={(e) =>
                    setEditingPage({
                      ...editingPage,
                      description: e.target.value,
                    })
                  }
                  placeholder="Descripción breve para motores de búsqueda"
                  rows={3}
                />
                <span
                  className={`text-sm ${
                    editingPage.description &&
                    editingPage.description.length >= 150 &&
                    editingPage.description.length <= 160
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {editingPage.description?.length || 0} caracteres
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="h1">H1 (Título principal)</Label>
                <Input
                  id="h1"
                  value={editingPage.h1 || ""}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, h1: e.target.value })
                  }
                  placeholder="Título H1 de la página"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="h2_primary">H2 Principal</Label>
                <Input
                  id="h2_primary"
                  value={editingPage.h2_primary || ""}
                  onChange={(e) =>
                    setEditingPage({
                      ...editingPage,
                      h2_primary: e.target.value,
                    })
                  }
                  placeholder="Primer subtítulo H2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="h2_secondary_1">H2 Secundario 1</Label>
                <Input
                  id="h2_secondary_1"
                  value={editingPage.h2_secondary_1 || ""}
                  onChange={(e) =>
                    setEditingPage({
                      ...editingPage,
                      h2_secondary_1: e.target.value,
                    })
                  }
                  placeholder="Segundo subtítulo H2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="h2_secondary_2">H2 Secundario 2</Label>
                <Input
                  id="h2_secondary_2"
                  value={editingPage.h2_secondary_2 || ""}
                  onChange={(e) =>
                    setEditingPage({
                      ...editingPage,
                      h2_secondary_2: e.target.value,
                    })
                  }
                  placeholder="Tercer subtítulo H2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">
                  Keywords (separadas por comas)
                </Label>
                <Input
                  id="keywords"
                  value={editingPage.keywords?.join(", ") || ""}
                  onChange={(e) => handleKeywordChange(e.target.value)}
                  placeholder="calistenia, ejercicios, entrenamiento"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonical">URL Canónica</Label>
                <Input
                  id="canonical"
                  value={editingPage.canonical || ""}
                  onChange={(e) =>
                    setEditingPage({
                      ...editingPage,
                      canonical: e.target.value,
                    })
                  }
                  placeholder="https://calisteniaonline.com/ruta"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="og_image">Open Graph Image URL</Label>
                <Input
                  id="og_image"
                  value={editingPage.og_image || ""}
                  onChange={(e) =>
                    setEditingPage({
                      ...editingPage,
                      og_image: e.target.value,
                    })
                  }
                  placeholder="https://calisteniaonline.com/imagen.jpg"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={updateMutation.isPending}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MetaTagsManager;
