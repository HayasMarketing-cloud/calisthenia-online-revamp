import { useEffect, useState } from 'react';
import { Download, Share, Plus, X, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type Platform = 'ios' | 'android' | 'other';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'pwa-install-dismissed-v1';

const detectPlatform = (): Platform => {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent.toLowerCase();
  const isIOS =
    /iphone|ipad|ipod/.test(ua) ||
    (navigator.platform === 'MacIntel' && (navigator as Navigator & { maxTouchPoints: number }).maxTouchPoints > 1);
  if (isIOS) return 'ios';
  if (/android/.test(ua)) return 'android';
  return 'other';
};

const isStandalone = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
};

const InstallPWAPrompt = () => {
  const [platform, setPlatform] = useState<Platform>('other');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;
    if (localStorage.getItem(DISMISS_KEY)) return;
    const p = detectPlatform();
    if (p === 'other') return;
    setPlatform(p);
    setShowBanner(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);

    const installedHandler = () => {
      setShowBanner(false);
      setOpen(false);
      localStorage.setItem(DISMISS_KEY, '1');
    };
    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setShowBanner(false);
  };

  const handleAndroidInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
        localStorage.setItem(DISMISS_KEY, '1');
      }
      setDeferredPrompt(null);
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="sticky top-0 z-40 bg-primary/10 border-b border-primary/20 backdrop-blur">
        <div className="max-w-lg mx-auto flex items-center gap-3 px-4 py-2.5">
          <Smartphone className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground leading-tight">
              Instala Calistenia en tu móvil
            </p>
            <p className="text-[11px] text-muted-foreground leading-tight">
              Acceso rápido desde tu pantalla de inicio
            </p>
          </div>
          <Button
            size="sm"
            variant="default"
            className="h-8 text-xs px-3"
            onClick={platform === 'android' ? handleAndroidInstall : () => setOpen(true)}
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Instalar
          </Button>
          <button
            onClick={dismiss}
            aria-label="Cerrar"
            className="text-muted-foreground hover:text-foreground p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {platform === 'ios' ? 'Instalar en iPhone / iPad' : 'Instalar en Android'}
            </DialogTitle>
            <DialogDescription>
              {platform === 'ios'
                ? 'Sigue estos pasos en Safari para añadir la app a tu pantalla de inicio.'
                : 'Sigue estos pasos en Chrome para instalar la app.'}
            </DialogDescription>
          </DialogHeader>

          {platform === 'ios' ? (
            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold text-xs">
                  1
                </span>
                <div className="flex-1">
                  Pulsa el botón <strong>Compartir</strong>{' '}
                  <Share className="inline h-4 w-4 mx-0.5 align-text-bottom" /> en la barra
                  inferior de Safari.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold text-xs">
                  2
                </span>
                <div className="flex-1">
                  Desplázate y elige{' '}
                  <strong>
                    Añadir a pantalla de inicio{' '}
                    <Plus className="inline h-4 w-4 mx-0.5 align-text-bottom" />
                  </strong>
                  .
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold text-xs">
                  3
                </span>
                <div className="flex-1">
                  Confirma con <strong>Añadir</strong>. El icono de Calistenia aparecerá en tu
                  pantalla de inicio.
                </div>
              </li>
            </ol>
          ) : (
            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold text-xs">
                  1
                </span>
                <div className="flex-1">
                  Abre el menú <strong>⋮</strong> en la esquina superior derecha de Chrome.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold text-xs">
                  2
                </span>
                <div className="flex-1">
                  Pulsa <strong>Instalar app</strong> o <strong>Añadir a pantalla de inicio</strong>.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold text-xs">
                  3
                </span>
                <div className="flex-1">
                  Confirma con <strong>Instalar</strong>. La app se añadirá como icono nativo.
                </div>
              </li>
            </ol>
          )}

          <Button variant="outline" onClick={dismiss} className="w-full mt-2">
            No volver a mostrar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InstallPWAPrompt;
