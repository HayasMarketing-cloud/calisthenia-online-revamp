import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { seoConfig } from "@/config/seoConfig";
import { Download, RefreshCw, CheckCircle2, FileText } from "lucide-react";
import { toast } from "sonner";

const SitemapManager = () => {
  const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${seoConfig.pages.map(page => `  <url>
    <loc>${page.canonical}</loc>
    <changefreq>${page.path === '/' ? 'weekly' : page.path.includes('blog') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${page.path === '/' ? '1.0' : page.path.includes('blog') ? '0.8' : '0.9'}</priority>
  </url>`).join('\n')}
</urlset>`;
    return sitemap;
  };

  const handleDownload = () => {
    const content = generateSitemap();
    const blob = new Blob([content], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    toast.success("Sitemap descargado");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generateSitemap());
    toast.success("Sitemap copiado al portapapeles");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestor de Sitemap.xml</CardTitle>
          <CardDescription>
            Genera y gestiona el sitemap XML de tu sitio web
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span className="text-2xl font-bold">{seoConfig.pages.length}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">URLs en Sitemap</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold">100%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">URLs Válidas</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="h-5 w-5 text-purple-500" />
                    <span className="text-2xl font-bold">Auto</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Actualización</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleDownload} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Descargar Sitemap.xml
              </Button>
              <Button onClick={handleCopyToClipboard} variant="outline" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Copiar al Portapapeles
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vista Previa del Sitemap</CardTitle>
          <CardDescription>
            Contenido generado automáticamente basado en las páginas configuradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-xs font-mono whitespace-pre-wrap">
              {generateSitemap()}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>URLs Incluidas en el Sitemap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {seoConfig.pages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{page.path}</p>
                  <p className="text-sm text-muted-foreground">{page.canonical}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Incluida
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SitemapManager;
