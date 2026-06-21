import { lazy, Suspense } from "react";
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

// Eager: public landing + SEO routine pages (prerendered, share main chunk)
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
import CalisteniaMujeres from "./pages/CalisteniaMujeres";
import CallisteniaNivelAvanzado from "./pages/CallisteniaNivelAvanzado";
import Contacto from "./pages/Contacto";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import QueEsLaCalistenia from "./pages/blog/QueEsLaCalistenia";
import NotFound from "./pages/NotFound";

// Lazy: heavy / authenticated / rarely-visited routes
const BrandBook = lazy(() => import("./pages/BrandBook"));
const MediaLibrary = lazy(() => import("./pages/MediaLibrary"));
const SEODashboard = lazy(() => import("./pages/SEODashboard"));
const FuncionalBodybuilding = lazy(() => import("./pages/FuncionalBodybuilding"));
const LeadCapture = lazy(() => import("./pages/LeadCapture"));
const Coaching = lazy(() => import("./pages/Coaching"));
const Base = lazy(() => import("./pages/programas/Base"));

// Admin (pulls quill, editors, heavy panels)
const AdminHub = lazy(() => import("./pages/admin/AdminHub"));
const BlogEditor = lazy(() => import("./pages/admin/BlogEditor"));
const BlogManager = lazy(() => import("./pages/admin/BlogManager"));
const CoachPanel = lazy(() => import("./pages/admin/CoachPanel"));
const ExercisesManager = lazy(() => import("./pages/admin/ExercisesManager"));
const ProgramTemplates = lazy(() => import("./pages/admin/ProgramTemplates"));
const ProgramTemplateEditor = lazy(() => import("./pages/admin/ProgramTemplateEditor"));
const ProgramTemplateVersions = lazy(() => import("./pages/admin/ProgramTemplateVersions"));
const LeadsManager = lazy(() => import("./pages/admin/LeadsManager"));
const AdminVideoLibrary = lazy(() => import("./pages/admin/AdminVideoLibrary"));
const OnboardingManager = lazy(() => import("./pages/admin/OnboardingManager"));

// Alumni app (recharts, training UI)
const Onboarding = lazy(() => import("./pages/app/Onboarding"));
const Dashboard = lazy(() => import("./pages/app/Dashboard"));
const Training = lazy(() => import("./pages/app/Training"));
const Progress = lazy(() => import("./pages/app/Progress"));
const ProfilePage = lazy(() => import("./pages/app/Profile"));
const Agenda = lazy(() => import("./pages/app/Agenda"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
            {/* SEO Routes - Must be before other routes */}
            <Route path="/robots.txt" element={<DynamicRobotsTxt />} />
            <Route path="/sitemap.xml" element={<DynamicSitemap />} />

            <Route path="/" element={<Index />} />
            <Route path="/quien-soy/" element={<QuienSoy />} />
            <Route path="/programas/" element={<Programas />} />
            <Route path="/programas/base/" element={<Base />} />
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
            <Route path="/calistenia-mujeres/" element={<CalisteniaMujeres />} />
            <Route path="/calistenia-nivel-avanzado/" element={<CallisteniaNivelAvanzado />} />
            <Route path="/contacto/" element={<Contacto />} />
            <Route path="/blog/" element={<Blog />} />
            <Route path="/blog/:slug/" element={<BlogPost />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Admin Routes - Protected with authentication */}
            <Route path="/admin/" element={<ProtectedRoute requireAdmin><AdminHub /></ProtectedRoute>} />
            <Route path="/admin/exercises/" element={<ProtectedRoute requireAdmin><ExercisesManager /></ProtectedRoute>} />
            <Route path="/admin/programs/" element={<ProtectedRoute requireAdmin><ProgramTemplates /></ProtectedRoute>} />
            <Route path="/admin/programs/templates" element={<ProtectedRoute requireAdmin><ProgramTemplates /></ProtectedRoute>} />
            <Route path="/admin/programs/templates/:id" element={<ProtectedRoute requireAdmin><ProgramTemplateEditor /></ProtectedRoute>} />
            <Route path="/admin/programs/templates/:id/versions" element={<ProtectedRoute requireAdmin><ProgramTemplateVersions /></ProtectedRoute>} />
            <Route path="/admin/programs/:id" element={<ProtectedRoute requireAdmin><ProgramTemplateEditor /></ProtectedRoute>} />
            <Route path="/admin/programs/:id/versions" element={<ProtectedRoute requireAdmin><ProgramTemplateVersions /></ProtectedRoute>} />
            <Route path="/admin/leads/" element={<ProtectedRoute requireAdmin><LeadsManager /></ProtectedRoute>} />
            <Route path="/admin/coach/" element={<ProtectedRoute requireAdmin><CoachPanel /></ProtectedRoute>} />
            <Route path="/admin/onboarding/" element={<ProtectedRoute requireAdmin><OnboardingManager /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute requireAdmin><BlogManager /></ProtectedRoute>} />
            <Route path="/admin/blog/nuevo" element={<ProtectedRoute requireAdmin><BlogEditor /></ProtectedRoute>} />
            <Route path="/admin/blog/:id" element={<ProtectedRoute requireAdmin><BlogEditor /></ProtectedRoute>} />
            <Route path="/admin/seo-dashboard/" element={<ProtectedRoute requireAdmin><SEODashboard /></ProtectedRoute>} />
            <Route path="/admin/media-library/" element={<ProtectedRoute requireAdmin><MediaLibrary /></ProtectedRoute>} />
            <Route path="/admin/videos/" element={<ProtectedRoute requireAdmin><AdminVideoLibrary /></ProtectedRoute>} />
            <Route path="/admin/blog/" element={<ProtectedRoute requireAdmin><BlogManager /></ProtectedRoute>} />
            <Route path="/admin/blog/nuevo/" element={<ProtectedRoute requireAdmin><BlogEditor /></ProtectedRoute>} />
            <Route path="/admin/blog/editar/:id/" element={<ProtectedRoute requireAdmin><BlogEditor /></ProtectedRoute>} />

            <Route path="/blog/que-es-la-calistenia/" element={<QueEsLaCalistenia />} />
            <Route path="/brandbook/" element={<BrandBook />} />
            <Route path="/funcional-bodybuilding/" element={<FuncionalBodybuilding />} />
            <Route path="/empezar/" element={<LeadCapture />} />
            <Route path="/programa-cuerpo-atletico-en-casa/" element={<Coaching />} />
            <Route path="/coaching/" element={<Navigate to="/programa-cuerpo-atletico-en-casa/" replace />} />

            {/* App Routes - Client area (mobile-first) */}
            <Route path="/app/onboarding" element={<Onboarding />} />
            <Route path="/app" element={<AppRoute><AppLayout /></AppRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="training" element={<Training />} />
              <Route path="progress" element={<Progress />} />
              <Route path="agenda" element={<Agenda />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route index element={<Dashboard />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<><RedirectHandler /><NotFound /></>} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
