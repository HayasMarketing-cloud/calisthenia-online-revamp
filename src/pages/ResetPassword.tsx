import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [validSession, setValidSession] = useState<boolean | null>(null);

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event Supabase fires when the user lands here via the email link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
        setValidSession(true);
      }
    });

    // Also check if a session already exists (e.g. token already processed)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setValidSession(true);
      } else {
        // Give the listener a moment to process the URL hash
        setTimeout(() => {
          setValidSession((v) => (v === null ? false : v));
        }, 1500);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      toast.error('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Contraseña actualizada. Inicia sesión con tu nueva contraseña.');
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <>
      <Helmet>
        <title>Restablecer contraseña - Calistenia Training</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Restablecer contraseña</CardTitle>
              <CardDescription className="text-center">
                Introduce tu nueva contraseña.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {validSession === null && (
                <div className="text-center text-sm text-muted-foreground">
                  Verificando enlace...
                </div>
              )}

              {validSession === false && (
                <div className="text-center text-sm text-muted-foreground space-y-4">
                  <p>El enlace no es válido o ha caducado.</p>
                  <Button asChild className="w-full">
                    <Link to="/forgot-password">Solicitar un nuevo enlace</Link>
                  </Button>
                </div>
              )}

              {validSession === true && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Nueva contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirmar contraseña</Label>
                    <Input
                      id="confirm"
                      type="password"
                      placeholder="••••••••"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Actualizando...' : 'Actualizar contraseña'}
                  </Button>
                </form>
              )}
            </CardContent>

            <CardFooter className="flex justify-center text-sm">
              <Link to="/auth" className="text-primary hover:underline">
                Volver a iniciar sesión
              </Link>
            </CardFooter>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ResetPassword;
