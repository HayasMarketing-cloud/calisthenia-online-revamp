import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      // Generic message — do not leak whether the email exists
      console.error('resetPasswordForEmail error:', error);
    }

    setSent(true);
    toast.success('Si el email existe, recibirás un enlace para restablecer tu contraseña.');
  };

  return (
    <>
      <Helmet>
        <title>Recuperar contraseña - Calistenia Training</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">¿Olvidaste tu contraseña?</CardTitle>
              <CardDescription className="text-center">
                Introduce tu email y te enviaremos un enlace para restablecerla.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {sent ? (
                <div className="text-center text-sm text-muted-foreground space-y-4">
                  <p>
                    Si existe una cuenta asociada a <strong>{email}</strong>, recibirás un email con
                    un enlace para restablecer tu contraseña.
                  </p>
                  <p>Revisa también la carpeta de spam.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
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

export default ForgotPassword;
