import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, User, RefreshCw, Download, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { usePwaUpdate } from '@/hooks/use-pwa-update';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const Profile = () => {
  const { user, signOut } = useAuth();
  const { checkForUpdate, applyUpdate, needRefresh } = usePwaUpdate();
  const [checking, setChecking] = useState(false);
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsStandalone(
      window.matchMedia('(display-mode: standalone)').matches ||
        // iOS
        (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  const { data: profile } = useQuery({
    queryKey: ['profile-full', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  const handleCheckUpdate = async () => {
    setChecking(true);
    await checkForUpdate();
    setTimeout(() => {
      setChecking(false);
      if (!needRefresh) {
        toast.success('Estás en la última versión');
      }
    }, 1200);
  };

  const handleInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === 'accepted') {
      toast.success('App instalada');
      setInstallEvent(null);
    }
  };

  const version = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'dev';

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{profile?.display_name || 'Atleta'}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Versión y actualizaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Versión instalada</span>
            <span className="font-mono text-foreground">{version}</span>
          </div>

          {needRefresh ? (
            <Button className="w-full" onClick={() => applyUpdate()}>
              <RefreshCw className="h-4 w-4 mr-2" /> Instalar nueva versión
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCheckUpdate}
              disabled={checking}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${checking ? 'animate-spin' : ''}`} />
              {checking ? 'Buscando…' : 'Buscar actualizaciones'}
            </Button>
          )}

          {isStandalone ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              App instalada en este dispositivo
            </div>
          ) : installEvent ? (
            <Button variant="secondary" className="w-full" onClick={handleInstall}>
              <Download className="h-4 w-4 mr-2" /> Instalar app
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground">
              En iPhone, abre esta página en Safari, pulsa Compartir y elige "Añadir a pantalla de inicio" para instalar la app.
            </p>
          )}
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full" onClick={signOut}>
        <LogOut className="h-4 w-4 mr-2" /> Cerrar sesión
      </Button>
    </div>
  );
};

export default Profile;
