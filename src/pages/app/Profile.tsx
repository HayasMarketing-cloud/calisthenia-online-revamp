import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();

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

      <Button variant="outline" className="w-full" onClick={signOut}>
        <LogOut className="h-4 w-4 mr-2" /> Cerrar sesión
      </Button>
    </div>
  );
};

export default Profile;
