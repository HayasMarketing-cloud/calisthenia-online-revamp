import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { usePwaUpdate } from '@/hooks/use-pwa-update';

/**
 * Shows a sonner toast when a new app version is ready and lets the user
 * apply it. Mounted only inside the alumni area (AppLayout).
 */
const PWAUpdatePrompt = () => {
  const { needRefresh, offlineReady, applyUpdate } = usePwaUpdate();
  const shownRef = useRef(false);

  useEffect(() => {
    if (offlineReady) {
      toast.success('App lista para usar sin conexión', { duration: 3000 });
    }
  }, [offlineReady]);

  useEffect(() => {
    if (needRefresh && !shownRef.current) {
      shownRef.current = true;
      toast('Nueva versión disponible', {
        description: 'Actualiza para obtener las últimas mejoras.',
        duration: Infinity,
        action: {
          label: 'Actualizar',
          onClick: () => applyUpdate(),
        },
      });
    }
  }, [needRefresh, applyUpdate]);

  return null;
};

export default PWAUpdatePrompt;
