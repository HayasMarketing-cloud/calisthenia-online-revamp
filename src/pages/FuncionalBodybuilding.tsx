import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle, Dumbbell, Target, Heart, Clock, Users, MapPin, Calendar, Gift, ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import logoEntrenaVive from "@/assets/logo-entrena-vive.png";
import nicolasPhoto from "@/assets/nicolas-reyero.jpg";
import carlosPhoto from "@/assets/carlos-plaza.jpg";
const GOOGLE_FORM_URL = "https://forms.gle/ufV4WedTdPFqm87T9";
const EVENT_DATE = new Date("2026-01-17T10:00:00+01:00");
const FuncionalBodybuilding = () => {
  const scrollToForm = () => {
    window.open(GOOGLE_FORM_URL, "_blank");
  };
  return <>
      <Helmet>
        <title>Funcional Bodybuilding para Hombres +30 | Taller Presencial Madrid - 17 Enero</title>
        <meta name="description" content="Taller presencial para combinar gimnasio y calistenia de forma inteligente. Entrena fuerza, músculo y salud sin destrozar tu cuerpo. 17 de enero en Centro ENTRENA Y VIVE, Madrid." />
        <meta name="keywords" content="funcional bodybuilding, taller presencial Madrid, entrenamiento +30, calistenia gimnasio, fuerza sostenible" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-secondary via-secondary to-secondary/95 text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Logo ENTRENA Y VIVE */}
              <img src={logoEntrenaVive} alt="Centro Deportivo ENTRENA Y VIVE" className="h-16 md:h-20 mx-auto mb-3 object-contain" />
              
              {/* Dirección debajo del logo */}
              <div className="flex items-center justify-center gap-2 text-white/80 mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm md:text-base">C/ Bahía de Almería 7, Madrid</span>
              </div>
              
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 text-sm md:text-base px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Taller Presencial · 2 horas · 17 Enero 2026  
              </Badge>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Funcional Bodybuilding <span className="text-primary">+30</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
                Entrena fuerza, músculo y salud sin destrozar tu cuerpo
              </p>
              
              <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Un taller presencial para que aprendas a combinar gimnasio y calistenia de forma inteligente. Si quieres verte fuerte, moverte mejor y rendir al máximo con el paso del tiempo, este espacio es para ti.
              </p>

              {/* Countdown Timer */}
              <div className="mb-8">
                <p className="text-sm text-white/60 mb-4 uppercase tracking-wider">El taller comienza en:</p>
                <CountdownTimer targetDate={EVENT_DATE} />
              </div>

              <Button size="lg" onClick={scrollToForm} className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
                Reservar plaza 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Para Quién Es Section */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
              ¿Es este taller para ti?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Para quién SÍ */}
              <div className="bg-background rounded-2xl p-6 md:p-8 border-2 border-green-500/30 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600">Para ti SI...</h3>
                </div>
                <ul className="space-y-4">
                  {["Si tienes más de 30 años", "Entrenas o has entrenado fuerza (gimnasio, calistenia o ambos)", "Buscas ganar músculo sin dolor, sin lesiones y sin perder movilidad", "Quieres un método sostenible, no competir ni vivir para entrenar"].map((item, index) => <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>)}
                </ul>
              </div>

              {/* Para quién NO */}
              <div className="bg-background rounded-2xl p-6 md:p-8 border-2 border-red-500/30 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-500/20 p-3 rounded-full">
                    <X className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-red-600">NO es para ti si...</h3>
                </div>
                <ul className="space-y-4">
                  {["Buscas competir en culturismo o cross", "Quieres rutinas milagro de 20 minutos", "Solo te interesa el postureo fitness"].map((item, index) => <li key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* El Problema Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                A partir de los 30, muchos hombres{" "}
                <span className="text-primary">entrenan más y progresan menos</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {[{
              icon: AlertTriangle,
              title: "Cargado y rígido",
              description: "Entrenas duro, pero estás cada vez más cargado o rígido"
            }, {
              icon: AlertTriangle,
              title: "Molestias recurrentes",
              description: "Tienes molestias recurrentes en hombros, espalda o rodillas"
            }, {
              icon: AlertTriangle,
              title: "Sin base sólida",
              description: "Saltas de rutina en rutina sin una base sólida"
            }].map((item, index) => <div key={index} className="bg-muted rounded-xl p-6 text-center">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>)}
            </div>

            <p className="text-center text-lg md:text-xl font-medium text-foreground/80 max-w-2xl mx-auto">
              El problema no es el método, sino <span className="text-primary font-bold">cómo se está usando</span>
            </p>
          </div>
        </section>

        {/* La Solución Section */}
        <section className="py-16 md:py-20 bg-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                La solución: <span className="text-primary">Funcional Bodybuilding</span>
              </h2>
              <p className="text-lg text-white/80">
                Un enfoque que combina lo mejor del entrenamiento de fuerza tradicional con principios funcionales
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[{
              icon: Dumbbell,
              title: "Masa muscular",
              description: "Mantener y desarrollar masa muscular de forma eficiente"
            }, {
              icon: Target,
              title: "Movilidad articular",
              description: "Mejorar movilidad y salud articular mientras ganas fuerza"
            }, {
              icon: Heart,
              title: "Sin castigo",
              description: "Entrenar fuerza sin castigar el cuerpo ni acumular lesiones"
            }, {
              icon: Clock,
              title: "A largo plazo",
              description: "Ser fuerte ahora... y dentro de 10 años"
            }].map((item, index) => <div key={index} className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
                  <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </div>)}
            </div>
          </div>
        </section>

        {/* Contenido del Taller Section */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
              ¿Qué aprenderás en el taller?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Tren Superior */}
              <div className="bg-background rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">💪</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Tren Superior</h3>
                <ul className="space-y-3">
                  {["Técnica real de empujes y tracciones", "Uso correcto de escápulas, hombros y core", "Progresiones de flexiones y dominadas", "Diferencias entre barra, mancuernas y peso corporal"].map((item, index) => <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>)}
                </ul>
              </div>

              {/* Tren Inferior */}
              <div className="bg-background rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🦵</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Tren Inferior</h3>
                <ul className="space-y-3">
                  {["Dominantes de rodilla y cadera bien ejecutados", "Protección de rodillas y espalda baja", "Progresiones con y sin material", "Control, estabilidad y fuerza útil"].map((item, index) => <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>)}
                </ul>
              </div>

              {/* Metodología */}
              <div className="bg-background rounded-2xl p-6 md:p-8 shadow-lg border border-border">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Metodología</h3>
                <ul className="space-y-3">
                  {["Cómo combinar calistenia y gimnasio sin conflicto", "Rangos de intensidad adecuados para tu edad", "Detalles técnicos que marcan la diferencia", "Planificación sostenible a largo plazo"].map((item, index) => <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Instructores Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
              Tus instructores
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Dos enfoques distintos, una misma visión: <span className="text-primary font-medium">entrenar mejor, no solo entrenar más</span>
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Carlos Plaza */}
              <div className="bg-muted rounded-2xl overflow-hidden shadow-lg">
                <div className="h-80 md:h-96 overflow-hidden">
                  <img src={carlosPhoto} alt="Carlos Plaza - Entrenador" className="w-full h-full object-cover object-center brightness-125" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Carlos Plaza</h3>
                  <p className="text-muted-foreground">
                    Entrenador especializado en hipertrofia y salud, con foco en técnica, 
                    progresión y sostenibilidad para hombres adultos.
                  </p>
                </div>
              </div>

              {/* Nicolás Reyero */}
              <div className="bg-muted rounded-2xl overflow-hidden shadow-lg">
                <div className="h-80 md:h-96 overflow-hidden">
                  <img src={nicolasPhoto} alt="Nicolás Reyero - Entrenador" className="w-full h-full object-cover object-center" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Nicolás Reyero</h3>
                  <p className="text-muted-foreground">
                    Entrenador de calistenia funcional, especialista en fuerza con peso corporal, 
                    control motor y transferencia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formato Section */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
              Formato del taller
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {[{
              icon: Users,
              label: "Presencial"
            }, {
              icon: Target,
              label: "Grupos reducidos"
            }, {
              icon: Dumbbell,
              label: "Teoría + Práctica"
            }, {
              icon: Clock,
              label: "Rotación por estaciones"
            }, {
              icon: Gift,
              label: "Resumen post-evento"
            }].map((item, index) => <div key={index} className="bg-background rounded-xl p-4 md:p-6 text-center shadow-sm border border-border">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{item.label}</p>
                </div>)}
            </div>
          </div>
        </section>

        {/* Ubicación Section */}
        <section className="py-16 md:py-20 bg-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <img src={logoEntrenaVive} alt="Centro Deportivo ENTRENA Y VIVE" className="h-20 md:h-24 mx-auto mb-8 object-contain" />
              
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Centro Deportivo ENTRENA Y VIVE
              </h2>
              
              {/* Dirección destacada */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-8 border border-white/20">
                <div className="flex items-center justify-center gap-3 text-xl md:text-2xl font-semibold">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                  <span>C/ Bahía de Almería 7, Madrid</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>17 de Enero 2026</span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-white/30 rounded-full" />
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>10:00h - 12:00h</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                ¿Listo para entrenar de forma inteligente?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Plazas limitadas. Reserva tu sitio ahora.
              </p>

              {/* Countdown Timer */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">Quedan:</p>
                <CountdownTimer targetDate={EVENT_DATE} />
              </div>

              
            </div>
          </div>
        </section>
      </div>
    </>;
};
export default FuncionalBodybuilding;