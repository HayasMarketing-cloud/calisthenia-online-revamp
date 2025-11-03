import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { useAllSEOPages } from "@/hooks/useSEOData";
import { seoConfig } from "@/config/seoConfig";
import { Progress } from "@/components/ui/progress";

const SEOStats = () => {
  const { data: pages, isLoading } = useAllSEOPages();

  if (isLoading) {
    return <div>Cargando estadísticas...</div>;
  }

  const totalPages = pages?.length || 0;
  const totalRedirects = seoConfig.redirects?.length || 0;

  // Calculate SEO score for each page
  const calculateSEOScore = (page: any) => {
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

  const pagesWithScores = pages?.map((page) => ({
    ...page,
    score: calculateSEOScore(page),
  })) || [];

  const completePages = pagesWithScores.filter((p) => p.score >= 80).length;
  const basicPages = pagesWithScores.filter(
    (p) => p.score >= 50 && p.score < 80
  ).length;
  const incompletePages = pagesWithScores.filter((p) => p.score < 50).length;

  const averageScore =
    pagesWithScores.reduce((sum, p) => sum + p.score, 0) / totalPages || 0;

  const stats = [
    {
      title: "Total de Páginas",
      value: totalPages,
      description: "Páginas con configuración SEO",
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      title: "Redirecciones Activas",
      value: totalRedirects,
      description: "Redirecciones 301 configuradas",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Salud SEO Global",
      value: `${Math.round(averageScore)}%`,
      description: "Puntuación media de todas las páginas",
      icon: averageScore >= 80 ? CheckCircle2 : averageScore >= 50 ? AlertCircle : XCircle,
      color:
        averageScore >= 80
          ? "text-green-600"
          : averageScore >= 50
          ? "text-yellow-600"
          : "text-red-600",
    },
    {
      title: "Estado de Optimización",
      value: `${completePages}/${totalPages}`,
      description: "Páginas completamente optimizadas",
      icon: CheckCircle2,
      color: "text-green-600",
    },
  ];

  // Detect issues
  const issues = pagesWithScores
    .filter((p) => p.score < 80)
    .map((page) => {
      const problems = [];
      if (!page.title) problems.push("Sin título");
      if (page.title && (page.title.length < 50 || page.title.length > 60)) {
        problems.push("Título no óptimo");
      }
      if (!page.description) problems.push("Sin descripción");
      if (
        page.description &&
        (page.description.length < 150 || page.description.length > 160)
      ) {
        problems.push("Descripción no óptima");
      }
      if (!page.h1) problems.push("Sin H1");
      if (!page.h2_primary) problems.push("Sin H2");
      if (!page.canonical) problems.push("Sin canonical");
      if (!page.keywords || page.keywords.length === 0) {
        problems.push("Sin keywords");
      }
      return { page: page.path, problems, score: page.score };
    });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Resumen SEO del Sitio</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-2 mb-6">
          <h3 className="text-lg font-semibold">Distribución de Calidad SEO</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="flex-1">Completas (80-100%)</span>
              <span className="font-medium">{completePages}</span>
            </div>
            <Progress
              value={(completePages / totalPages) * 100}
              className="h-2"
            />

            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="flex-1">Básicas (50-79%)</span>
              <span className="font-medium">{basicPages}</span>
            </div>
            <Progress value={(basicPages / totalPages) * 100} className="h-2" />

            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="flex-1">Incompletas (&lt;50%)</span>
              <span className="font-medium">{incompletePages}</span>
            </div>
            <Progress
              value={(incompletePages / totalPages) * 100}
              className="h-2"
            />
          </div>
        </div>
      </Card>

      {issues.length > 0 && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Problemas Detectados</h2>
          <p className="text-muted-foreground mb-4">
            Páginas que necesitan atención para mejorar su SEO
          </p>

          <div className="space-y-3">
            {issues.slice(0, 10).map((issue) => (
              <Card key={issue.page} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {issue.page}
                    </code>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {issue.problems.map((problem) => (
                        <span
                          key={problem}
                          className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded"
                        >
                          {problem}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm font-medium ${
                        issue.score >= 50 ? "text-yellow-600" : "text-red-600"
                      }`}
                    >
                      {Math.round(issue.score)}%
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {issues.length > 10 && (
            <p className="text-sm text-muted-foreground mt-4 text-center">
              ... y {issues.length - 10} páginas más con problemas
            </p>
          )}
        </Card>
      )}
    </div>
  );
};

export default SEOStats;
