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
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="redirects">Redirecciones</TabsTrigger>
            <TabsTrigger value="metatags">Meta Tags</TabsTrigger>
            <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
            <TabsTrigger value="analyzer">Analyzer</TabsTrigger>
            <TabsTrigger value="robots">Robots.txt</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default SEODashboard;
