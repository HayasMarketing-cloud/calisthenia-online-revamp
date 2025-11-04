import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import { RedirectHandler } from "./components/seo/RedirectHandler";
import DynamicRobotsTxt from "./components/seo/DynamicRobotsTxt";
import DynamicSitemap from "./components/seo/DynamicSitemap";
import Index from "./pages/Index";
import QuienSoy from "./pages/QuienSoy";
import Programas from "./pages/Programas";
import RutinaBrazos from "./pages/RutinaBrazos";
import RutinaEspalda from "./pages/RutinaEspalda";
import RutinaAbdominales from "./pages/RutinaAbdominales";
import RutinaCore from "./pages/RutinaCore";
import RutinaPiernas from "./pages/RutinaPiernas";
import RutinaPecho from "./pages/RutinaPecho";
import RutinaFullBody from "./pages/RutinaFullBody";
import RutinaHombro from "./pages/RutinaHombro";
import RutinaCasa from "./pages/RutinaCasa";
import CalisteniaParque from "./pages/CalisteniaParque";
import CalisteniaPrincipiantes from "./pages/CalisteniaPrincipiantes";
import CallisteniaNivelAvanzado from "./pages/CallisteniaNivelAvanzado";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
import QueEsLaCalistenia from "./pages/blog/QueEsLaCalistenia";
import NotFound from "./pages/NotFound";
import SEODashboard from "./pages/SEODashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
          {/* SEO Routes - Must be before other routes */}
          <Route path="/robots.txt" element={<DynamicRobotsTxt />} />
          <Route path="/sitemap.xml" element={<DynamicSitemap />} />
          
          <Route path="/" element={<Index />} />
          <Route path="/quien-soy/" element={<QuienSoy />} />
          <Route path="/programas/" element={<Programas />} />
          <Route path="/rutina-brazos-calistenia/" element={<RutinaBrazos />} />
          <Route path="/rutina-espalda-calistenia/" element={<RutinaEspalda />} />
          <Route path="/rutina-abdominales-calistenia/" element={<RutinaAbdominales />} />
          <Route path="/rutina-core-calistenia/" element={<RutinaCore />} />
          <Route path="/rutina-piernas-calistenia/" element={<RutinaPiernas />} />
          <Route path="/rutina-pecho-calistenia/" element={<RutinaPecho />} />
          <Route path="/rutinas-de-hombro-calistenia/" element={<RutinaHombro />} />
          <Route path="/rutina-full-body/" element={<RutinaFullBody />} />
          <Route path="/rutina-calistenia-en-casa/" element={<RutinaCasa />} />
          <Route path="/calistenia-en-parque/" element={<CalisteniaParque />} />
          <Route path="/calistenia-principiantes/" element={<CalisteniaPrincipiantes />} />
          <Route path="/calistenia-nivel-avanzado/" element={<CallisteniaNivelAvanzado />} />
          <Route path="/contacto/" element={<Contacto />} />
          <Route path="/blog/" element={<Blog />} />
          <Route path="/blog/que-es-la-calistenia/" element={<QueEsLaCalistenia />} />
          <Route path="/admin/seo-dashboard/" element={<SEODashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<><RedirectHandler /><NotFound /></>} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
