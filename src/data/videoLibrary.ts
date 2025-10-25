import { VideoMetadata, ZonaMuscular, Nivel, Material } from '@/types/video';
import { calculateEngagementScore, parseDuration } from '@/lib/videoUtils';

// Base de datos de videos parseados del CSV
// Solo incluye videos con etiquetas completas (Zona Muscular + Nivel)
const rawVideos = [
  {
    id: 'bSYhg5i28kg',
    titulo: 'CÓMO HACER LA SÚPER DOMINADA. PROGRESIÓN para MUSCLE UP. Ep 8',
    descripcion: 'Quieres dar el salto al siguiente nivel en tus dominadas? En este último episodio te enseño los mejores ejercicios de explosividad para mejorar tu fuerza de tirón y prepararte para la súper dominada, una progresión directa hacia el muscle up.',
    duracion: 'PT7M12S',
    durationSeconds: 432,
    vistas: 295,
    likes: 33,
    comentarios: 3,
    zonaMuscular: 'Espalda' as const,
    nivel: 'Avanzado' as const,
    material: 'Peso corporal' as const,
    engagementScore: 0
  },
  {
    id: 'j1VaM6CNazM',
    titulo: 'RUTINA DE CALISTENIA AVANZADA para SUPERAR LAS 10 DOMINADAS. Ep 7',
    descripcion: 'Enhorabuena, has llegado al último paso de la guía de dominadas. En este vídeo te comparto 2 entrenamientos específicos para superar las 10 dominadas estrictas, combinando fuerza, resistencia y técnica para exprimir tu verdadero potencial.',
    duracion: 'PT6M43S',
    durationSeconds: 403,
    vistas: 422,
    likes: 34,
    comentarios: 7,
    zonaMuscular: 'Espalda' as const,
    nivel: 'Avanzado' as const,
    material: 'Bandas elásticas' as const,
    engagementScore: 0
  },
  {
    id: 'qa00fnGijEo',
    titulo: 'LOGRA 5 DOMINADAS CON este MÉTODO DE CALISTENIA. Ep 6',
    descripcion: 'En este vídeo te enseño un entrenamiento completo para conseguir 5 dominadas estrictas, combinando trabajo de fuerza y resistencia con el método que uso en mis alumnos.',
    duracion: 'PT9M56S',
    durationSeconds: 596,
    vistas: 371,
    likes: 29,
    comentarios: 2,
    zonaMuscular: 'Espalda' as const,
    nivel: 'Avanzado' as const,
    material: 'Bandas elásticas' as const,
    engagementScore: 0
  },
  {
    id: 't1CnIjsz42E',
    titulo: 'NO HAGAS ESTOS 5 ERRORES en DOMINADAS ❌. Ep 5',
    descripcion: 'En este vídeo te explico los 5 errores más comunes en la dominada que están frenando tu progreso — y cómo corregirlos para ganar fuerza, control y técnica.',
    duracion: 'PT5M23S',
    durationSeconds: 323,
    vistas: 356,
    likes: 39,
    comentarios: 3,
    zonaMuscular: 'Espalda' as const,
    nivel: 'Avanzado' as const,
    material: 'Peso corporal' as const,
    engagementScore: 0
  },
  {
    id: '15T6TRnJ63Y',
    titulo: 'LA MEJOR RUTINA para TU PRIMERA DOMINADA SIN AYUDA. Ep 4',
    descripcion: '¿Todavía no consigues tu primera dominada? Este entrenamiento con bandas elásticas es perfecto si estás empezando y quieres ganar la fuerza necesaria para hacerlo sin ayuda.',
    duracion: 'PT5M52S',
    durationSeconds: 352,
    vistas: 277,
    likes: 25,
    comentarios: 2,
    zonaMuscular: 'Espalda' as const,
    nivel: 'Avanzado' as const,
    material: 'Bandas elásticas' as const,
    engagementScore: 0
  }
];

export const allVideos: VideoMetadata[] = rawVideos.map(video => ({
  ...video,
  engagementScore: calculateEngagementScore(video)
}));

// Estadísticas de la biblioteca
export const videoStats = {
  total: allVideos.length,
  porZona: {
    Espalda: allVideos.filter(v => v.zonaMuscular === 'Espalda').length,
    Pecho: allVideos.filter(v => v.zonaMuscular === 'Pecho').length,
    Brazos: allVideos.filter(v => v.zonaMuscular === 'Brazos').length,
    Piernas: allVideos.filter(v => v.zonaMuscular === 'Piernas').length,
    Core: allVideos.filter(v => v.zonaMuscular === 'Core').length,
    Hombros: allVideos.filter(v => v.zonaMuscular === 'Hombros').length,
    'Full Body': allVideos.filter(v => v.zonaMuscular === 'Full Body').length,
  },
  porNivel: {
    Principiante: allVideos.filter(v => v.nivel === 'Principiante').length,
    Intermedio: allVideos.filter(v => v.nivel === 'Intermedio').length,
    Avanzado: allVideos.filter(v => v.nivel === 'Avanzado').length,
  }
};
