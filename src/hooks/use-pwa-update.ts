import { useEffect, useState, useCallback } from 'react';

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
    import('virtual:pwa-register')
      .then(({ registerSW }) => {
        if (cancelled) return;
        const fn = registerSW({
          immediate: true,
          onNeedRefresh: () => setNeedRefresh(true),
          onOfflineReady: () => setOfflineReady(true),
        });
        setUpdateSW(() => fn);
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
