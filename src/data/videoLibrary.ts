import { VideoMetadata, ZonaMuscular, Nivel, Material } from '@/types/video';
import { calculateEngagementScore, parseDuration } from '@/lib/videoUtils';

// Raw video data parsed from CSV - Curated quality videos with complete tags
const rawVideos: Omit<VideoMetadata, 'engagementScore' | 'durationSeconds'>[] = [
  // === ESPALDA (BACK) VIDEOS ===
  { id: 'bSYhg5i28kg', titulo: 'CÓMO HACER LA SÚPER DOMINADA. PROGRESIÓN para MUSCLE UP. Ep 8', descripcion: 'Quieres dar el salto al siguiente nivel en tus dominadas? En este último episodio te enseño los mejores ejercicios de explosividad para mejorar tu fuerza de tirón', duracion: 'PT7M12S', vistas: 295, likes: 33, comentarios: 3, zonaMuscular: 'Espalda', nivel: 'Avanzado', material: 'Peso corporal' },
  { id: 'j1VaM6CNazM', titulo: 'RUTINA DE CALISTENIA AVANZADA para SUPERAR LAS 10 DOMINADAS. Ep 7', descripcion: 'En este vídeo te comparto 2 entrenamientos específicos para superar las 10 dominadas estrictas, combinando fuerza, resistencia y técnica', duracion: 'PT6M43S', vistas: 422, likes: 34, comentarios: 7, zonaMuscular: 'Espalda', nivel: 'Avanzado', material: 'Bandas elásticas' },
  { id: 'qa00fnGijEo', titulo: 'LOGRA 5 DOMINADAS CON este MÉTODO DE CALISTENIA. Ep 6', descripcion: 'En este vídeo te enseño un entrenamiento completo para conseguir 5 dominadas estrictas, combinando trabajo de fuerza y resistencia', duracion: 'PT9M56S', vistas: 371, likes: 29, comentarios: 2, zonaMuscular: 'Espalda', nivel: 'Avanzado', material: 'Bandas elásticas' },
  { id: 't1CnIjsz42E', titulo: 'NO HAGAS ESTOS 5 ERRORES en DOMINADAS ❌. Ep 5', descripcion: 'Te explico los 5 errores más comunes en la dominada que están frenando tu progreso y cómo corregirlos', duracion: 'PT5M23S', vistas: 356, likes: 39, comentarios: 3, zonaMuscular: 'Espalda', nivel: 'Avanzado', material: 'Peso corporal' },
  { id: '15T6TRnJ63Y', titulo: 'LA MEJOR RUTINA para TU PRIMERA DOMINADA SIN AYUDA. Ep 4', descripcion: 'Entrenamiento con bandas elásticas perfecto si estás empezando y quieres ganar la fuerza necesaria para hacerlo sin ayuda', duracion: 'PT5M52S', vistas: 277, likes: 25, comentarios: 2, zonaMuscular: 'Espalda', nivel: 'Intermedio', material: 'Bandas elásticas' },
  { id: 'jthRwQkCTlA', titulo: 'GANA SALUD MEJORANDO TU FUERZA DE AGARRE. Ep 3', descripcion: 'Cómo mejorar la fuerza de agarre y los diferentes tipos para ganar más control y rendimiento', duracion: 'PT6M30S', vistas: 399, likes: 28, comentarios: 0, zonaMuscular: 'Espalda', nivel: 'Avanzado', material: 'Peso corporal' },
  { id: 'WupvTaI9Zg0', titulo: 'HAZ DOMINADAS SIN LESIONARTE ASÍ👆', descripcion: 'Consejos clave para evitar lesiones en dominadas', duracion: 'PT31S', vistas: 40301, likes: 1164, comentarios: 8, zonaMuscular: 'Espalda', nivel: 'Intermedio', material: 'Peso corporal' },
  { id: 'joOoHh_P5RM', titulo: 'CÓMO HACER LA PRIMERA DOMINADA. Ep 1: Retracción Escapular', descripcion: 'Serie de 8 capítulos sobre las dominadas: técnica, ejercicios clave y errores comunes', duracion: 'PT5M28S', vistas: 608, likes: 60, comentarios: 10, zonaMuscular: 'Espalda', nivel: 'Principiante', material: 'Peso corporal' },
  { id: 'nj6C3Mwe_aI', titulo: 'NO SE TE DAN MAL LAS DOMINADAS❌', descripcion: 'Desmintiendo mitos sobre las dominadas', duracion: 'PT46S', vistas: 13576, likes: 715, comentarios: 6, zonaMuscular: 'Espalda', nivel: 'Intermedio', material: 'Peso corporal' },
  { id: 'Eb63YMXWhH8', titulo: 'ELIMINA EL DOLOR DE ESPALDA CON UN CORE FUERTE', descripcion: 'Fortalece tu core para prevenir dolor de espalda', duracion: 'PT48S', vistas: 7512, likes: 423, comentarios: 2, zonaMuscular: 'Espalda', nivel: 'Principiante', material: 'Peso corporal' },

  // === CORE / ABDOMINALES VIDEOS ===
  { id: 'MnbNx2x-RY8', titulo: 'CÓMO ENTRENAR ABDOMEN con CALISTENIA en 10 MINUTOS', descripcion: 'Rutina efectiva para fortalecer el core en solo 10 minutos sin material', duracion: 'PT9M44S', vistas: 1509, likes: 103, comentarios: 7, zonaMuscular: 'Core', nivel: 'Intermedio', material: 'Peso corporal' },
  { id: 'TW7Yf6G-Tbk', titulo: '5 PASOS PARA HACER EL PINO desde 0', descripcion: 'Progresión completa para lograr el pino aunque seas principiante total', duracion: 'PT8M54S', vistas: 875, likes: 89, comentarios: 4, zonaMuscular: 'Core', nivel: 'Principiante', material: 'Peso corporal' },
  { id: 'zKQf6IpTW-o', titulo: 'L-SIT SÓLIDA con 3 consejos ✅', descripcion: 'Tres consejos clave para dominar la L-sit', duracion: 'PT1M', vistas: 4993, likes: 343, comentarios: 2, zonaMuscular: 'Core', nivel: 'Intermedio', material: 'Peso corporal' },

  // === PECHO VIDEOS ===
  { id: 'Q6s7yUEA3N4', titulo: 'CÓMO HACER UN CALENTAMIENTO DE CALISTENIA y EVITAR LESIONES', descripcion: 'Calentamiento de cuerpo entero diseñado especialmente para la calistenia', duracion: 'PT10M5S', vistas: 1189, likes: 101, comentarios: 3, zonaMuscular: 'Pecho', nivel: 'Principiante', material: 'Peso corporal' },
  { id: 'q2sf_TqNTIQ', titulo: 'LOS 5 EJERCICIOS QUE NECESITAS para MEJORAR TU POSTURA HOY', descripcion: '5 ejercicios clave de movilidad y fuerza en menos de 10 minutos', duracion: 'PT6M43S', vistas: 1298, likes: 100, comentarios: 4, zonaMuscular: 'Pecho', nivel: 'Principiante', material: 'Peso corporal' },

  // === PIERNAS VIDEOS ===
  { id: 'RH7wEFKQ95M', titulo: 'CÓMO HACER LA PISTOL SQUAT. Progresión paso a paso', descripcion: 'Progresión completa para conseguir tu primera pistol squat de forma segura', duracion: 'PT10M34S', vistas: 750, likes: 59, comentarios: 7, zonaMuscular: 'Piernas', nivel: 'Avanzado', material: 'Peso corporal' },
  { id: 'LleBD7YMt9o', titulo: 'ENTRENAMIENTO DE GLÚTEOS con PESO CORPORAL y SIN MATERIAL', descripcion: 'Rutina perfecta para activar y trabajar tu tren inferior de forma efectiva', duracion: 'PT8M58S', vistas: 1114, likes: 77, comentarios: 7, zonaMuscular: 'Piernas', nivel: 'Intermedio', material: 'Peso corporal' },

  // === BRAZOS VIDEOS ===
  { id: 'QmNx-kydmn0', titulo: 'NO HAGAS LOS FONDOS❌ así', descripcion: 'Errores comunes en fondos y cómo corregirlos', duracion: 'PT34S', vistas: 29248, likes: 2007, comentarios: 6, zonaMuscular: 'Brazos', nivel: 'Intermedio', material: 'Peso corporal' },

  // === HOMBROS VIDEOS ===
  { id: 'GUJQMuINySc', titulo: 'TUS HOMBROS CRUJEN POR ESTO👆🥶🦴', descripcion: 'Por qué crujen tus hombros y cómo solucionarlo', duracion: 'PT45S', vistas: 15231, likes: 866, comentarios: 4, zonaMuscular: 'Hombros', nivel: 'Principiante', material: 'Peso corporal' },
  { id: 'kutBPGXZvZY', titulo: 'MEJORA TU POSTURA CON SOLO 5 EJERCICIOS!', descripcion: 'Ejercicios clave para mejorar tu postura', duracion: 'PT26S', vistas: 11378, likes: 689, comentarios: 1, zonaMuscular: 'Hombros', nivel: 'Principiante', material: 'Peso corporal' },

  // === FULL BODY / GENERAL VIDEOS ===
  { id: 'E4Qg0PVr4bk', titulo: 'CÓMO PASAR DE 0 A 1 DOMINADA. Ep 2', descripcion: 'Ejercicios clave para pasar de 0 a 1 dominada con plan claro y sencillo', duracion: 'PT3M54S', vistas: 403, likes: 38, comentarios: 3, zonaMuscular: 'Full Body', nivel: 'Principiante', material: 'Peso corporal' },
  { id: 'zV3RDyw8hXk', titulo: 'CÓMO ENTRENAR CALISTENIA SI TIENES POCO TIEMPO', descripcion: '3 métodos efectivos de calistenia para cambio físico aunque tengas poco tiempo', duracion: 'PT6M46S', vistas: 1003, likes: 87, comentarios: 3, zonaMuscular: 'Full Body', nivel: 'Intermedio', material: 'Peso corporal' },
  { id: '1ULLTMJijac', titulo: 'LOS 5 MEJORES EJERCICIOS para un CUERPO FUNCIONAL SIN gym', descripcion: 'Rutina de menos de 30 minutos para un cuerpo fuerte y funcional', duracion: 'PT4M7S', vistas: 694, likes: 58, comentarios: 8, zonaMuscular: 'Full Body', nivel: 'Principiante', material: 'Peso corporal' },
  { id: 'bnzRXd4rtZA', titulo: 'LOS 3 BÁSICOS GRANDES OLVIDADOS DE LA CALISTENIA', descripcion: 'Aspectos que marcan la diferencia en fuerza, control y resultados reales', duracion: 'PT6M3S', vistas: 1198, likes: 115, comentarios: 10, zonaMuscular: 'Full Body', nivel: 'Intermedio', material: 'Peso corporal' },
  { id: 'C03QUJkF2cI', titulo: '5 EJERCICIOS DE FUERZA EN CASA para PÉRDIDA DE GRASA', descripcion: '5 ejercicios de cuerpo entero con bandas para quemar grasa', duracion: 'PT7M46S', vistas: 485, likes: 49, comentarios: 0, zonaMuscular: 'Full Body', nivel: 'Intermedio', material: 'Bandas elásticas' },
  { id: 'IgREP_fkD_U', titulo: 'EL PROBLEMA DE DAVID GOGGINS', descripcion: 'Análisis crítico del enfoque de entrenamiento extremo', duracion: 'PT1M40S', vistas: 15836, likes: 1674, comentarios: 87, zonaMuscular: 'Full Body', nivel: 'Intermedio', material: 'Peso corporal' },
  { id: 'fziLncnoXeE', titulo: 'EL MEJOR MÉTODO DE ENTRENAMIENTO PARA PERSONAS CON SOBREPESO', descripcion: 'Cómo iniciar en la calistenia sin importar tu peso actual', duracion: 'PT6M12S', vistas: 1057, likes: 69, comentarios: 9, zonaMuscular: 'Full Body', nivel: 'Principiante', material: 'Peso corporal' },
  { id: 'zu-v9h7EAtM', titulo: '3 ERRORES QUE FRENAN TU GANANCIA DE FUERZA Y MÚSCULO', descripcion: '3 errores que frenan tu recuperación y progreso', duracion: 'PT4M11S', vistas: 622, likes: 51, comentarios: 2, zonaMuscular: 'Full Body', nivel: 'Intermedio', material: 'Peso corporal' },
  { id: 'gxaXUhc6FcI', titulo: 'NICK BARE, triatleta, familia y tiempo', descripcion: 'Equilibrio entre entrenamiento, familia y vida personal', duracion: 'PT50S', vistas: 3072, likes: 123, comentarios: 0, zonaMuscular: 'Full Body', nivel: 'Intermedio', material: 'Peso corporal' },
  { id: '5XPzH3AyONI', titulo: 'ESTE NO EL OBJETIVO DE LA CALISTENIA', descripcion: 'Reflexión sobre los verdaderos objetivos del entrenamiento', duracion: 'PT23S', vistas: 8011, likes: 295, comentarios: 13, zonaMuscular: 'Full Body', nivel: 'Principiante', material: 'Peso corporal' }
];

// Process videos: calculate engagement score and duration in seconds
export const allVideos: VideoMetadata[] = rawVideos.map(video => ({
  ...video,
  durationSeconds: parseDuration(video.duracion),
  engagementScore: calculateEngagementScore({
    ...video,
    durationSeconds: 0,
    engagementScore: 0
  })
}));

// Export statistics
export const videoStats = {
  total: allVideos.length,
  byZone: {
    Espalda: allVideos.filter(v => v.zonaMuscular === 'Espalda').length,
    Pecho: allVideos.filter(v => v.zonaMuscular === 'Pecho').length,
    Brazos: allVideos.filter(v => v.zonaMuscular === 'Brazos').length,
    Piernas: allVideos.filter(v => v.zonaMuscular === 'Piernas').length,
    Core: allVideos.filter(v => v.zonaMuscular === 'Core').length,
    Hombros: allVideos.filter(v => v.zonaMuscular === 'Hombros').length,
    'Full Body': allVideos.filter(v => v.zonaMuscular === 'Full Body').length,
  },
  byLevel: {
    Principiante: allVideos.filter(v => v.nivel === 'Principiante').length,
    Intermedio: allVideos.filter(v => v.nivel === 'Intermedio').length,
    Avanzado: allVideos.filter(v => v.nivel === 'Avanzado').length,
  }
};
