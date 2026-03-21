import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Flame, TrendingUp, Calendar } from 'lucide-react';

const statusLabels: Record<string, { text: string; emoji: string; color: string }> = {
  active: { text: 'Vas muy bien esta semana', emoji: '🟢', color: 'text-green-600' },
  at_risk: { text: 'Esta semana te echamos de menos', emoji: '🟡', color: 'text-yellow-600' },
  inactive: { text: 'Nico quiere saber cómo estás', emoji: '🔴', color: 'text-red-600' },
  new: { text: '¡Bienvenido! Empieza tu primera sesión', emoji: '⚪', color: 'text-muted-foreground' },
};

const Dashboard = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['client-profile-full', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('id', user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: adherence, isLoading } = useQuery({
    queryKey: ['client-adherence', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_adherence')
        .select('*')
        .eq('client_id', user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: displayName } = useQuery({
    queryKey: ['profile-name', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user!.id)
        .single();
      return data?.display_name || 'Atleta';
    },
    enabled: !!user,
  });

  const status = adherence?.status || 'new';
  const label = statusLabels[status] || statusLabels.new;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Hola, {displayName} 👋
        </h1>
        <p className={`text-sm mt-1 ${label.color}`}>
          {label.emoji} {label.text}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Flame className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{adherence?.current_streak || 0}</p>
              <p className="text-xs text-muted-foreground">Racha actual</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{adherence?.adherence_pct_7d ? `${Math.round(Number(adherence.adherence_pct_7d))}%` : '—'}</p>
              <p className="text-xs text-muted-foreground">Esta semana</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's training placeholder */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Entrenamiento de hoy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Tu programa se mostrará aquí cuando Nico te lo asigne.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
