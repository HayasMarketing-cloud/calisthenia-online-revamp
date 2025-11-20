import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RedirectionsManager from "@/components/seo/RedirectionsManager";
import SitemapManager from "@/components/seo/SitemapManager";
import SitemapAnalyzer from "@/components/seo/SitemapAnalyzer";
import RobotsTxtEditor from "@/components/seo/RobotsTxtEditor";
import MetaTagsManager from "@/components/seo/MetaTagsManager";
import SEOStats from "@/components/seo/SEOStats";
import { Helmet } from "react-helmet-async";

const SEODashboard = () => {
  const [activeTab, setActiveTab] = useState("stats");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>SEO Dashboard - Calistenia Online</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">SEO Dashboard</h1>
          <p className="text-muted-foreground">
            Gestiona todas las configuraciones SEO de tu sitio en un solo lugar
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="redirects">Redirecciones</TabsTrigger>
            <TabsTrigger value="metatags">Meta Tags</TabsTrigger>
            <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
            <TabsTrigger value="analyzer">Analyzer</TabsTrigger>
            <TabsTrigger value="robots">Robots.txt</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="media">Biblioteca</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <SEOStats />
          </TabsContent>

          <TabsContent value="redirects">
            <RedirectionsManager />
          </TabsContent>

          <TabsContent value="metatags">
            <MetaTagsManager />
          </TabsContent>

          <TabsContent value="sitemap">
            <SitemapManager />
          </TabsContent>

          <TabsContent value="analyzer">
            <SitemapAnalyzer />
          </TabsContent>

          <TabsContent value="robots">
            <RobotsTxtEditor />
          </TabsContent>

          <TabsContent value="blog">
            <div className="bg-card border rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">Gestor de Blog</h2>
                <p className="text-muted-foreground">
                  Administra todos los artículos del blog
                </p>
              </div>
              <a 
                href="/admin/blog" 
                className="inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 hover:bg-accent transition-colors"
              >
                Abrir Gestor de Blog
              </a>
            </div>
          </TabsContent>

          <TabsContent value="media">
            <div className="bg-card border rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">Biblioteca de Medios</h2>
                <p className="text-muted-foreground">
                  Accede a la biblioteca completa de medios y componentes
                </p>
              </div>
              <a 
                href="/admin/media-library" 
                className="inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 hover:bg-accent transition-colors"
              >
                Abrir Biblioteca de Medios
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SEODashboard;
