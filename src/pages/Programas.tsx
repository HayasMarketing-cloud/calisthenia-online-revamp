import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Programas = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-4xl lg:text-6xl mb-6 text-center">
            Programas de <span className="text-primary">Entrenamiento</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center">
            Planes personalizados diseñados para llevar tu calistenia al siguiente nivel
          </p>
        </div>
      </section>

      {/* Programas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Programa Básico */}
            <Card className="border-2 hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Iniciación</CardTitle>
                <CardDescription>Para empezar desde cero</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">49€<span className="text-base text-muted-foreground">/mes</span></div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Rutinas adaptadas a principiantes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Videos explicativos de cada ejercicio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Plan de progresión de 12 semanas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Soporte por email</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-primary">Empezar Ahora</Button>
              </CardContent>
            </Card>

            {/* Programa Intermedio */}
            <Card className="border-2 border-primary shadow-elegant relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Más Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Avanzado</CardTitle>
                <CardDescription>Para dominar habilidades</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">99€<span className="text-base text-muted-foreground">/mes</span></div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Todo lo del plan Iniciación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Entrenamientos para habilidades avanzadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Sesiones de coaching 1:1 mensuales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Acceso a comunidad privada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Plan nutricional personalizado</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-primary">Empezar Ahora</Button>
              </CardContent>
            </Card>

            {/* Programa Premium */}
            <Card className="border-2 hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Elite</CardTitle>
                <CardDescription>Transformación completa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">199€<span className="text-base text-muted-foreground">/mes</span></div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Todo lo del plan Avanzado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Coaching personalizado semanal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Análisis de progreso con vídeos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Soporte prioritario 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Acceso vitalicio a contenido exclusivo</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-primary">Empezar Ahora</Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Programas */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-8 text-center">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>¿Puedo cambiar de plan en cualquier momento?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán en tu próximo ciclo de facturación.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>¿Qué necesito para empezar?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Solo necesitas motivación y un espacio para entrenar. La mayoría de ejercicios se pueden hacer sin equipo o con elementos básicos como una barra de dominadas.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>¿Hay garantía de devolución?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ofrecemos garantía de devolución de 14 días si no estás satisfecho con el programa.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programas;
