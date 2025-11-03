import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { seoConfig } from "@/config/seoConfig";
import { BarChart3, Link2, FileText, CheckCircle2, AlertCircle } from "lucide-react";

const SEOStats = () => {
  const totalPages = seoConfig.pages.length;
  const totalRedirects = seoConfig.redirects.length;
  
  const pagesWithCompleteMetaTags = seoConfig.pages.filter(
    page => page.title && page.description && page.h1 && page.h2s.length > 0
  ).length;
  
  const completionPercentage = Math.round((pagesWithCompleteMetaTags / totalPages) * 100);

  const stats = [
    {
      title: "Total de Páginas",
      value: totalPages,
      description: "Páginas indexables en el sitio",
      icon: FileText,
      color: "text-blue-500"
    },
    {
      title: "Redirecciones Activas",
      value: totalRedirects,
      description: "Redirecciones 301 configuradas",
      icon: Link2,
      color: "text-purple-500"
    },
    {
      title: "SEO Completo",
      value: `${completionPercentage}%`,
      description: `${pagesWithCompleteMetaTags} de ${totalPages} páginas`,
      icon: completionPercentage === 100 ? CheckCircle2 : AlertCircle,
      color: completionPercentage === 100 ? "text-green-500" : "text-orange-500"
    },
    {
      title: "Optimización",
      value: completionPercentage >= 80 ? "Excelente" : completionPercentage >= 60 ? "Buena" : "Mejorar",
      description: "Estado general del SEO",
      icon: BarChart3,
      color: completionPercentage >= 80 ? "text-green-500" : completionPercentage >= 60 ? "text-yellow-500" : "text-red-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen de Páginas por Estado SEO</CardTitle>
          <CardDescription>
            Detalle del estado de optimización de cada página
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {seoConfig.pages.map((page, index) => {
              const hasComplete = page.title && page.description && page.h1 && page.h2s.length > 0;
              const hasBasic = page.title && page.description;
              
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{page.path}</p>
                    <p className="text-sm text-muted-foreground">{page.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasComplete ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        Completo
                      </span>
                    ) : hasBasic ? (
                      <span className="flex items-center gap-1 text-orange-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        Básico
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        Incompleto
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOStats;
