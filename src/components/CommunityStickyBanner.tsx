import { useState, useEffect } from "react";
import { X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMMUNITY_CONFIG } from "@/config/community";

const CommunityStickyBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si el banner fue cerrado previamente
    const dismissed = localStorage.getItem(COMMUNITY_CONFIG.stickyBanner.storageKey);
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      const daysPassed = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysPassed < COMMUNITY_CONFIG.stickyBanner.dismissDays) {
        return; // No mostrar si no han pasado los días configurados
      }
    }
    
    // Mostrar después de 2 segundos (dar tiempo a que cargue la página)
    setTimeout(() => setIsVisible(true), 2000);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(
      COMMUNITY_CONFIG.stickyBanner.storageKey,
      new Date().toISOString()
    );
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-accent to-primary text-white shadow-lg animate-fade-in">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Icono + Texto */}
          <div className="flex items-center gap-3 flex-1">
            <Users className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm md:text-base font-medium">
              <span className="hidden md:inline">{COMMUNITY_CONFIG.description.substring(0, 80)}...</span>
              <span className="md:hidden">Únete a nuestra comunidad de calistenia</span>
            </p>
          </div>
          
          {/* Botón CTA */}
          <Button
            variant="secondary"
            size="sm"
            className="flex-shrink-0 bg-white text-primary hover:bg-gray-100"
            onClick={() => {
              const openPopup = (window as any).openGHLPopup;
              if (typeof openPopup === 'function') {
                openPopup();
              }
            }}
          >
            Unirme
          </Button>
          
          {/* Botón cerrar */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
            aria-label="Cerrar banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityStickyBanner;
