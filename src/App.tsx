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
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AppRoute from "./components/app/AppRoute";
import AppLayout from "./components/app/AppLayout";
import Onboarding from "./pages/app/Onboarding";
import Dashboard from "./pages/app/Dashboard";
import Training from "./pages/app/Training";
import Progress from "./pages/app/Progress";
import ProfilePage from "./pages/app/Profile";
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
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/admin/BlogEditor";
import BlogManager from "./pages/admin/BlogManager";
import CoachPanel from "./pages/admin/CoachPanel";
import AdminHub from "./pages/admin/AdminHub";
import ExercisesManager from "./pages/admin/ExercisesManager";
import ProgramTemplates from "./pages/admin/ProgramTemplates";
import ProgramTemplateEditor from "./pages/admin/ProgramTemplateEditor";
import LeadsManager from "./pages/admin/LeadsManager";
import Auth from "./pages/Auth";
import QueEsLaCalistenia from "./pages/blog/QueEsLaCalistenia";
import NotFound from "./pages/NotFound";
import SEODashboard from "./pages/SEODashboard";
import BrandBook from "./pages/BrandBook";
import MediaLibrary from "./pages/MediaLibrary";
import FuncionalBodybuilding from "./pages/FuncionalBodybuilding";
import LeadCapture from "./pages/LeadCapture";
import Coaching from "./pages/Coaching";

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
            <Route path="/blog/:slug/" element={<BlogPost />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin Routes - Protected with authentication */}
            <Route path="/admin/" element={<ProtectedRoute requireAdmin><AdminHub /></ProtectedRoute>} />
            <Route path="/admin/exercises/" element={<ProtectedRoute requireAdmin><ExercisesManager /></ProtectedRoute>} />
            <Route path="/admin/programs/" element={<ProtectedRoute requireAdmin><ProgramTemplates /></ProtectedRoute>} />
            <Route path="/admin/programs/:id" element={<ProtectedRoute requireAdmin><ProgramTemplateEditor /></ProtectedRoute>} />
            <Route path="/admin/leads/" element={<ProtectedRoute requireAdmin><LeadsManager /></ProtectedRoute>} />
            <Route path="/admin/coach/" element={<ProtectedRoute requireAdmin><CoachPanel /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute requireAdmin><BlogManager /></ProtectedRoute>} />
            <Route path="/admin/blog/nuevo" element={<ProtectedRoute requireAdmin><BlogEditor /></ProtectedRoute>} />
            <Route path="/admin/blog/:id" element={<ProtectedRoute requireAdmin><BlogEditor /></ProtectedRoute>} />
            <Route path="/admin/seo-dashboard/" element={<ProtectedRoute requireAdmin><SEODashboard /></ProtectedRoute>} />
            <Route path="/admin/media-library/" element={<ProtectedRoute requireAdmin><MediaLibrary /></ProtectedRoute>} />
            <Route path="/admin/blog/" element={<ProtectedRoute requireAdmin><BlogManager /></ProtectedRoute>} />
            <Route path="/admin/blog/nuevo/" element={<ProtectedRoute requireAdmin><BlogEditor /></ProtectedRoute>} />
            <Route path="/admin/blog/editar/:id/" element={<ProtectedRoute requireAdmin><BlogEditor /></ProtectedRoute>} />
            
          <Route path="/blog/que-es-la-calistenia/" element={<QueEsLaCalistenia />} />
          <Route path="/brandbook/" element={<BrandBook />} />
          <Route path="/funcional-bodybuilding/" element={<FuncionalBodybuilding />} />
          <Route path="/empezar/" element={<LeadCapture />} />
          <Route path="/coaching/" element={<Coaching />} />
          
          {/* App Routes - Client area (mobile-first) */}
          <Route path="/app/onboarding" element={<Onboarding />} />
          <Route path="/app" element={<AppRoute><AppLayout /></AppRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="training" element={<Training />} />
            <Route path="progress" element={<Progress />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route index element={<Dashboard />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<><RedirectHandler /><NotFound /></>} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
