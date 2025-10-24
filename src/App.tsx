import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuienSoy from "./pages/QuienSoy";
import Programas from "./pages/Programas";
import RutinaBrazos from "./pages/RutinaBrazos";
import RutinaEspalda from "./pages/RutinaEspalda";
import RutinaAbdominales from "./pages/RutinaAbdominales";
import RutinaPiernas from "./pages/RutinaPiernas";
import RutinaPecho from "./pages/RutinaPecho";
import RutinaFullBody from "./pages/RutinaFullBody";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quien-soy" element={<QuienSoy />} />
          <Route path="/programas" element={<Programas />} />
          <Route path="/rutina-brazos-calistenia" element={<RutinaBrazos />} />
          <Route path="/rutina-espalda-calistenia" element={<RutinaEspalda />} />
          <Route path="/rutina-abdominales-calistenia" element={<RutinaAbdominales />} />
          <Route path="/rutina-piernas-calistenia" element={<RutinaPiernas />} />
          <Route path="/rutina-pecho-calistenia" element={<RutinaPecho />} />
          <Route path="/rutina-full-body" element={<RutinaFullBody />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
