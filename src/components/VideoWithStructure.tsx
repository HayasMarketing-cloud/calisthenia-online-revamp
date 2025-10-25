interface VideoWithStructureProps {
  id?: string;
  // Video data
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  insights?: string[];
  
  // Badges
  nivel?: string;
  zonaMuscular?: string;
  material?: string;
  
  // Formato del entrenamiento
  formato: {
    calentamiento: {
      ejercicios: number;
      intensidad: string;
    };
    partePrincipal: {
      series: number;
      descripcion: string;
    };
    tempo: {
      activo: string;
      descanso: string;
    };
  };
  
  // Estímulos trabajados
  estimulos: string[];
  
  // Descripción adicional (opcional)
  detalles?: string;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const VideoWithStructure = ({
  id,
  videoId,
  videoTitle,
  videoDescription,
  insights,
  nivel,
  zonaMuscular,
  material,
  formato,
  estimulos,
  detalles
}: VideoWithStructureProps) => {
  return (
    <section id={id} className="py-16 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{videoTitle}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {videoDescription}
          </p>
        </div>

        {/* Main Grid: Video + Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {/* Left Column: Video & Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Embed */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-elegant" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            {/* Insights */}
            {insights && insights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">✨ Puntos Clave del Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span className="text-muted-foreground">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Additional Details */}
            {detalles && (
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">{detalles}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column: Structure & Metadata */}
          <div className="lg:col-span-2 space-y-6">
            {/* Badges */}
            {(nivel || zonaMuscular || material) && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {nivel && (
                      <Badge variant="secondary" className="text-sm py-1.5 px-3">
                        📊 {nivel}
                      </Badge>
                    )}
                    {zonaMuscular && (
                      <Badge variant="secondary" className="text-sm py-1.5 px-3">
                        💪 {zonaMuscular}
                      </Badge>
                    )}
                    {material && (
                      <Badge variant="secondary" className="text-sm py-1.5 px-3">
                        🏠 {material}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Estructura de la Rutina */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-xl">📋 Estructura de la Rutina</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calentamiento */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔥</span>
                    <h4 className="font-bold">Calentamiento</h4>
                  </div>
                  <div className="pl-9 space-y-1 text-sm text-muted-foreground">
                    <p>• {formato.calentamiento.ejercicios} ejercicios</p>
                    <p>• {formato.calentamiento.intensidad}</p>
                  </div>
                </div>

                <Separator />

                {/* Parte Principal */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💪</span>
                    <h4 className="font-bold">Parte Principal</h4>
                  </div>
                  <div className="pl-9 space-y-1 text-sm text-muted-foreground">
                    <p>• {formato.partePrincipal.series} series</p>
                    <p>• {formato.partePrincipal.descripcion}</p>
                  </div>
                </div>

                <Separator />

                {/* Tempo */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⏱️</span>
                    <h4 className="font-bold">Tempo</h4>
                  </div>
                  <div className="pl-9 space-y-1 text-sm text-muted-foreground">
                    <p>• Activo: {formato.tempo.activo}</p>
                    <p>• Descanso: {formato.tempo.descanso}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estímulos */}
            {estimulos && estimulos.length > 0 && (
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl">🧠 Estímulos Trabajados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {estimulos.map((estimulo, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="font-medium">{estimulo}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoWithStructure;
