import { useEffect, useState, useCallback } from 'react';

type RegisterFn = (
  options?: { immediate?: boolean; onRegisteredSW?: (url: string, reg?: ServiceWorkerRegistration) => void }
) => Promise<((reload?: boolean) => Promise<void>) | undefined>;

/**
 * PWA update hook. Detects when a new service worker is waiting and exposes
 * a function to activate it. Safe to call in non-PWA / preview environments
 * (it simply becomes a no-op).
 */
export function usePwaUpdate() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [updateSW, setUpdateSW] = useState<((reload?: boolean) => Promise<void>) | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Dynamic import so this hook never breaks SSR / non-PWA builds.
    import('virtual:pwa-register')
      .then(({ registerSW }: { registerSW: RegisterFn }) => {
        const update = registerSW({
          immediate: true,
          onRegisteredSW: () => {
            // no-op
          },
        });
        update.then((fn) => {
          if (!cancelled && fn) setUpdateSW(() => fn);
        });
        // Also listen for the controllerchange event as fallback
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            // controller changed — new SW is active
          });
        }
        // virtual:pwa-register triggers these via events on window
        const onNeedRefresh = () => setNeedRefresh(true);
        const onOfflineReady = () => setOfflineReady(true);
        window.addEventListener('pwa:need-refresh', onNeedRefresh);
        window.addEventListener('pwa:offline-ready', onOfflineReady);
        return () => {
          window.removeEventListener('pwa:need-refresh', onNeedRefresh);
          window.removeEventListener('pwa:offline-ready', onOfflineReady);
        };
      })
      .catch(() => {
        // PWA not available (dev / preview) — silently ignore.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const applyUpdate = useCallback(async () => {
    if (updateSW) {
      await updateSW(true);
    } else {
      window.location.reload();
    }
  }, [updateSW]);

  const checkForUpdate = useCallback(async () => {
    if (!('serviceWorker' in navigator)) return false;
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.update()));
      return true;
    } catch {
      return false;
    }
  }, []);

  return { needRefresh, offlineReady, applyUpdate, checkForUpdate };
}
