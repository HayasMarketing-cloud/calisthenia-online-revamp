import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface AppRouteProps {
  children: React.ReactNode;
}

const AppRoute = ({ children }: AppRouteProps) => {
  const { user, loading: authLoading } = useAuth();

  const { data: clientProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['client-profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('id')
        .eq('id', user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If no client profile exists, redirect to onboarding
  if (!clientProfile) {
    return <Navigate to="/app/onboarding" replace />;
  }

  return <>{children}</>;
};

export default AppRoute;
