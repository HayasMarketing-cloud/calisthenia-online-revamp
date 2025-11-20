import { useAllSEOPages } from "@/hooks/useSEOData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  TrendingUp,
  FileText,
  Clock,
  Target,
  AlertCircle
} from "lucide-react";

interface AnalysisResult {
  url: string;
  category: string;
  priority: number;
  changefreq: string;
  issues: string[];
  recommendations: string[];
}

const SitemapAnalyzer = () => {
  const { data: pages, isLoading } = useAllSEOPages();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sitemap Analyzer</CardTitle>
          <CardDescription>Cargando análisis...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Análisis automático de URLs
  const analyzePages = (): AnalysisResult[] => {
    if (!pages) return [];

    return pages.map(page => {
      const issues: string[] = [];
      const recommendations: string[] = [];
      
      // Determinar categoría
      let category = "general";
      let suggestedPriority = 0.5;
      let suggestedChangefreq = "monthly";

      if (page.path === "/") {
        category = "home";
        suggestedPriority = 1.0;
        suggestedChangefreq = "weekly";
      } else if (page.path.includes("/rutina-")) {
        category = "rutina";
        suggestedPriority = 0.9;
        suggestedChangefreq = "weekly";
      } else if (page.path.includes("/blog/")) {
        category = "blog";
        suggestedPriority = 0.8;
        suggestedChangefreq = "monthly";
      } else if (page.path.includes("/calistenia-")) {
        category = "guía";
        suggestedPriority = 0.85;
        suggestedChangefreq = "monthly";
      } else if (page.path === "/contacto/" || page.path === "/quien-soy/") {
        category = "institucional";
        suggestedPriority = 0.6;
        suggestedChangefreq = "yearly";
      }

      // Validaciones
      if (!page.title || page.title.length < 30) {
        issues.push("Título muy corto o inexistente");
      }
      if (!page.description || page.description.length < 120) {
        issues.push("Meta description muy corta o inexistente");
      }
      if (!page.canonical) {
        issues.push("Canonical URL no definido");
      }
      if (!page.h1) {
        issues.push("H1 no definido");
      }

      // Recomendaciones
      if (category === "rutina" && suggestedPriority !== 0.9) {
        recommendations.push(`Ajustar prioridad a 0.9 (actual: ${suggestedPriority})`);
      }
      if (category === "home" && suggestedChangefreq !== "weekly") {
        recommendations.push("Cambiar changefreq a 'weekly' para homepage");
      }
      if (!page.og_image) {
        recommendations.push("Agregar OG:image para mejor compartición en redes");
      }
      if (!page.keywords || page.keywords.length === 0) {
        recommendations.push("Agregar keywords relevantes");
      }

      return {
        url: page.canonical || `https://calisthenia.online${page.path}`,
        category,
        priority: suggestedPriority,
        changefreq: suggestedChangefreq,
        issues,
        recommendations
      };
    });
  };

  const analysis = analyzePages();
  
  // Métricas globales
  const totalPages = analysis.length;
  const pagesWithIssues = analysis.filter(a => a.issues.length > 0).length;
  const criticalIssues = analysis.reduce((sum, a) => sum + a.issues.length, 0);
  const healthScore = Math.round(((totalPages - pagesWithIssues) / totalPages) * 100);

  // Categorías
  const categories = Array.from(new Set(analysis.map(a => a.category)));
  const categoryStats = categories.map(cat => ({
    name: cat,
    count: analysis.filter(a => a.category === cat).length
  }));

  // Issues críticos
  const criticalPages = analysis
    .filter(a => a.issues.length > 0)
    .sort((a, b) => b.issues.length - a.issues.length)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                URLs Totales
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalPages}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Health Score
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{healthScore}%</div>
            <Progress value={healthScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Issues Detectados
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{criticalIssues}</div>
            <p className="text-xs text-muted-foreground mt-2">
              En {pagesWithIssues} páginas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Categorías
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Categorías */}
      <Card>
        <CardHeader>
          <CardTitle>Distribución por Categoría</CardTitle>
          <CardDescription>
            Clasificación automática de URLs según su propósito
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryStats.map(stat => (
              <div key={stat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="capitalize">
                    {stat.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {stat.count} página{stat.count !== 1 ? "s" : ""}
                  </span>
                </div>
                <Progress 
                  value={(stat.count / totalPages) * 100} 
                  className="w-32"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Crawl Budget Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recomendaciones de Crawl Budget
          </CardTitle>
          <CardDescription>
            Optimiza cómo Google rastrea tu sitio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              <strong>Prioridad Alta (1.0-0.9):</strong> {analysis.filter(a => a.priority >= 0.9).length} páginas
              <br />
              <span className="text-xs text-muted-foreground">
                Home y páginas de rutinas principales
              </span>
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Prioridad Media (0.8-0.7):</strong> {analysis.filter(a => a.priority >= 0.7 && a.priority < 0.9).length} páginas
              <br />
              <span className="text-xs text-muted-foreground">
                Blog posts y guías temáticas
              </span>
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Prioridad Baja (&lt;0.7):</strong> {analysis.filter(a => a.priority < 0.7).length} páginas
              <br />
              <span className="text-xs text-muted-foreground">
                Páginas institucionales y de soporte
              </span>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Issues Críticos */}
      {criticalPages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              Issues Críticos Detectados
            </CardTitle>
            <CardDescription>
              Páginas que requieren atención inmediata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalPages.map((page, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{page.url}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {page.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Priority: {page.priority}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="destructive" className="ml-2">
                      {page.issues.length} issue{page.issues.length !== 1 ? "s" : ""}
                    </Badge>
                  </div>

                  {page.issues.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-medium text-destructive">Issues:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {page.issues.map((issue, i) => (
                          <li key={i} className="text-xs text-muted-foreground">
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {page.recommendations.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-medium text-primary">Recomendaciones:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {page.recommendations.map((rec, i) => (
                          <li key={i} className="text-xs text-muted-foreground">
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resumen Final */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del Análisis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {healthScore >= 80 ? (
            <Alert>
              <CheckCircle2 className="h-4 w-4 text-success" />
              <AlertDescription>
                <strong>Excelente:</strong> Tu sitemap está bien optimizado. 
                {criticalIssues > 0 && ` Solo ${criticalIssues} issue${criticalIssues !== 1 ? "s" : ""} menor${criticalIssues !== 1 ? "es" : ""} detectado${criticalIssues !== 1 ? "s" : ""}.`}
              </AlertDescription>
            </Alert>
          ) : healthScore >= 60 ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Mejorable:</strong> Hay {criticalIssues} issues que deberías revisar para optimizar tu crawl budget.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Crítico:</strong> {criticalIssues} issues detectados. Tu sitemap necesita atención urgente.
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              💡 <strong>Tip:</strong> Prioriza corregir issues en páginas de alta prioridad (rutinas y home) primero.
            </p>
            <p>
              🔍 <strong>Siguiente paso:</strong> Usa la pestaña "Meta Tags" para editar los metadatos de las páginas con issues.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SitemapAnalyzer;
