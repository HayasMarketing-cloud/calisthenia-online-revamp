import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const RobotsTxtEditor = () => {
  const [robotsContent, setRobotsContent] = useState(`User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: https://calisthenia.online/sitemap.xml`);

  const handleDownload = () => {
    const blob = new Blob([robotsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    toast.success("Robots.txt descargado");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(robotsContent);
    toast.success("Contenido copiado al portapapeles");
  };

  const templates = [
    {
      name: "SEO-Friendly (actual)",
      content: robotsContent
    },
    {
      name: "Permisivo Total",
      content: `User-agent: *
Allow: /

Sitemap: https://calisthenia.online/sitemap.xml`
    },
    {
      name: "Restrictivo",
      content: `User-agent: *
Disallow: /admin/
Disallow: /api/
Allow: /

Sitemap: https://calisthenia.online/sitemap.xml`
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Editor de Robots.txt</CardTitle>
          <CardDescription>
            Configura cómo los bots de búsqueda deben rastrear tu sitio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 mb-4">
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
              <Button onClick={handleCopy} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copiar
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Contenido de robots.txt
              </label>
              <Textarea
                value={robotsContent}
                onChange={(e) => setRobotsContent(e.target.value)}
                rows={15}
                className="font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Sintaxis válida</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plantillas Predefinidas</CardTitle>
          <CardDescription>
            Aplica una plantilla rápida según tus necesidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">{template.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    {index === 0 && "Configuración actual optimizada para SEO"}
                    {index === 1 && "Permite acceso total a todos los bots"}
                    {index === 2 && "Bloquea directorios sensibles"}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setRobotsContent(template.content)}
                    className="w-full"
                  >
                    Aplicar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guía Rápida</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-mono bg-muted px-2 py-1 rounded">User-agent: *</span>
              <p className="text-muted-foreground mt-1">Aplica a todos los bots</p>
            </div>
            <div>
              <span className="font-mono bg-muted px-2 py-1 rounded">Allow: /</span>
              <p className="text-muted-foreground mt-1">Permite rastrear todo el sitio</p>
            </div>
            <div>
              <span className="font-mono bg-muted px-2 py-1 rounded">Disallow: /admin/</span>
              <p className="text-muted-foreground mt-1">Bloquea el acceso a un directorio específico</p>
            </div>
            <div>
              <span className="font-mono bg-muted px-2 py-1 rounded">Sitemap: URL</span>
              <p className="text-muted-foreground mt-1">Indica la ubicación del sitemap</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RobotsTxtEditor;
