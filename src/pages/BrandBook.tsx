import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ColorCard } from "@/components/brandbook/ColorCard";
import { TypographyExample } from "@/components/brandbook/TypographyExample";
import { GradientPreview } from "@/components/brandbook/GradientPreview";
import { ShadowPreview } from "@/components/brandbook/ShadowPreview";
import { ComponentShowcase } from "@/components/brandbook/ComponentShowcase";
import { IconographySection } from "@/components/brandbook/IconographySection";

const BrandBook = () => {
  const colors = [
    {
      name: "Primary",
      hex: "#EB6424",
      hsl: "16 82% 54%",
      tailwind: "bg-primary",
      usage: "Color principal de la marca. Usado en botones primarios, enlaces y elementos destacados."
    },
    {
      name: "Accent",
      hex: "#D7541F",
      tailwind: "bg-accent",
      hsl: "14 69% 49%",
      usage: "Color de acento. Usado para hover states y elementos secundarios destacados."
    },
    {
      name: "Secondary",
      hex: "#141414",
      hsl: "0 0% 8%",
      tailwind: "bg-secondary",
      usage: "Color secundario oscuro. Usado en footers, headers oscuros y fondos alternativos."
    },
    {
      name: "Background",
      hex: "#FFFFFF",
      hsl: "0 0% 100%",
      tailwind: "bg-background",
      usage: "Color de fondo principal de la aplicación."
    },
    {
      name: "Foreground",
      hex: "#000000",
      hsl: "0 0% 0%",
      tailwind: "text-foreground",
      usage: "Color de texto principal sobre fondos claros."
    },
    {
      name: "Muted",
      hex: "#F5F5F5",
      hsl: "0 0% 96%",
      tailwind: "bg-muted",
      usage: "Color para fondos sutiles, áreas desactivadas y elementos secundarios."
    },
    {
      name: "Card",
      hex: "#FAFAFA",
      hsl: "0 0% 98%",
      tailwind: "bg-card",
      usage: "Color de fondo para tarjetas y contenedores elevados."
    },
    {
      name: "Destructive",
      hex: "#E74C3C",
      hsl: "6 78% 57%",
      tailwind: "bg-destructive",
      usage: "Color para acciones destructivas, errores y alertas importantes."
    }
  ];

  const typography = [
    {
      level: "H1",
      size: "36px / 2.25rem",
      tailwindClass: "text-4xl font-bold",
      example: "Título Principal de Página"
    },
    {
      level: "H2",
      size: "30px / 1.875rem",
      tailwindClass: "text-3xl font-bold",
      example: "Subtítulo de Sección"
    },
    {
      level: "H3",
      size: "24px / 1.5rem",
      tailwindClass: "text-2xl font-bold",
      example: "Encabezado de Subsección"
    },
    {
      level: "Body",
      size: "16px / 1rem",
      tailwindClass: "text-base",
      example: "Este es el texto del cuerpo principal. Se utiliza para párrafos, descripciones y contenido general."
    },
    {
      level: "Small",
      size: "14px / 0.875rem",
      tailwindClass: "text-sm",
      example: "Texto pequeño para notas al pie, metadatos y texto secundario."
    }
  ];

  const gradients = [
    {
      name: "Primary Gradient",
      cssClass: "bg-gradient-primary",
      cssValue: "linear-gradient(135deg, hsl(16 82% 54%), hsl(14 69% 49%))",
      description: "Gradiente principal de naranja vibrante"
    },
    {
      name: "Hero Gradient",
      cssClass: "bg-gradient-hero",
      cssValue: "linear-gradient(135deg, hsl(16 82% 54%), hsl(0 0% 8%))",
      description: "Gradiente para secciones hero con transición a oscuro"
    },
    {
      name: "Card Gradient",
      cssClass: "bg-gradient-card",
      cssValue: "linear-gradient(180deg, hsl(0 0% 100%), hsl(0 0% 98%))",
      description: "Gradiente sutil para tarjetas y contenedores"
    }
  ];

  const shadows = [
    {
      name: "Elegant Shadow",
      cssClass: "shadow-elegant",
      cssValue: "0 10px 30px -10px hsl(16 82% 54% / 0.3)",
      description: "Sombra elegante con tono primary para elementos destacados"
    },
    {
      name: "Card Shadow",
      cssClass: "shadow-card",
      cssValue: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      description: "Sombra estándar para tarjetas y contenedores elevados"
    }
  ];

  return (
    <>
      <Helmet>
        <title>BrandBook - Identidad Visual | Calistenia</title>
        <meta
          name="description"
          content="Guía completa de identidad visual con colores corporativos, tipografías y elementos de diseño del sistema de calistenia."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-background">
          {/* Hero Section */}
          <section className="bg-gradient-hero text-white py-20">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">BrandBook</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Guía completa de identidad visual: colores, tipografías y elementos de diseño
              </p>
            </div>
          </section>

          {/* Colors Section */}
          <section className="py-16 container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Paleta de Colores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {colors.map((color) => (
                <ColorCard key={color.name} {...color} />
              ))}
            </div>
          </section>

          {/* Typography Section */}
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4">Tipografía</h2>
              <p className="text-muted-foreground mb-8">
                Familia: <strong>Montserrat</strong> - Weights: 400 (Regular), 700 (Bold)
              </p>
              <div className="space-y-4">
                {typography.map((typo) => (
                  <TypographyExample key={typo.level} {...typo} />
                ))}
              </div>
            </div>
          </section>

          {/* Gradients Section */}
          <section className="py-16 container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Gradientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gradients.map((gradient) => (
                <GradientPreview key={gradient.name} {...gradient} />
              ))}
            </div>
          </section>

          {/* Shadows Section */}
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Sombras</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shadows.map((shadow) => (
                  <ShadowPreview key={shadow.name} {...shadow} />
                ))}
              </div>
            </div>
          </section>

          {/* Border Radius Section */}
          <section className="py-16 container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Border Radius</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary h-32 rounded-lg mb-4" />
                <h3 className="font-bold">Large (lg)</h3>
                <code className="text-sm bg-muted px-2 py-1 rounded">0.5rem / 8px</code>
              </div>
              <div className="text-center">
                <div className="bg-primary h-32 rounded-md mb-4" />
                <h3 className="font-bold">Medium (md)</h3>
                <code className="text-sm bg-muted px-2 py-1 rounded">0.375rem / 6px</code>
              </div>
              <div className="text-center">
                <div className="bg-primary h-32 rounded-sm mb-4" />
                <h3 className="font-bold">Small (sm)</h3>
                <code className="text-sm bg-muted px-2 py-1 rounded">0.25rem / 4px</code>
              </div>
            </div>
          </section>

          {/* UI Components Section */}
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Componentes UI</h2>
              <ComponentShowcase />
            </div>
          </section>

          {/* Iconography Section */}
          <section className="py-16 container mx-auto px-4">
            <IconographySection />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BrandBook;
