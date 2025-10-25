import { VideoMetadata, ZonaMuscular, Nivel, Material } from '@/types/video';

/**
 * Calcula el engagement score de un video
 * Fórmula: (likes * 10 + comentarios * 5 + vistas) / 1000
 */
export function calculateEngagementScore(video: VideoMetadata): number {
  return (video.likes * 10 + video.comentarios * 5 + video.vistas) / 1000;
}

/**
 * Convierte duración ISO 8601 (PT7M12S) a segundos
 */
export function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Formatea duración en segundos a formato legible (7:12)
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formatea número de vistas de forma compacta (10.2K, 1.5M)
 */
export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

/**
 * Filtra videos con criterios de calidad mínimos
 * - Debe tener zona muscular y nivel definidos
 * - Mínimo de engagement (vistas, likes)
 */
export function getQualityVideos(
  videos: VideoMetadata[],
  options?: {
    minVistas?: number;
    minLikes?: number;
  }
): VideoMetadata[] {
  const { minVistas = 100, minLikes = 5 } = options || {};
  
  return videos.filter(v => 
    v.zonaMuscular && 
    v.nivel && 
    v.vistas >= minVistas && 
    v.likes >= minLikes
  );
}

/**
 * Obtiene videos por zona muscular con filtros opcionales
 */
export function getVideosByZone(
  videos: VideoMetadata[],
  zona: ZonaMuscular,
  options?: {
    limit?: number;
    sortBy?: 'vistas' | 'likes' | 'engagement';
    nivel?: Nivel;
    material?: Material;
    minVistas?: number;
  }
): VideoMetadata[] {
  const { 
    limit = 6, 
    sortBy = 'engagement',
    nivel,
    material,
    minVistas = 100
  } = options || {};
  
  // Filtrar por zona
  let filtered = videos.filter(v => 
    v.zonaMuscular === zona &&
    v.vistas >= minVistas
  );
  
  // Aplicar filtros opcionales
  if (nivel) {
    filtered = filtered.filter(v => v.nivel === nivel);
  }
  
  if (material) {
    filtered = filtered.filter(v => v.material === material);
  }
  
  // Ordenar según criterio
  switch (sortBy) {
    case 'vistas':
      filtered.sort((a, b) => b.vistas - a.vistas);
      break;
    case 'likes':
      filtered.sort((a, b) => b.likes - a.likes);
      break;
    case 'engagement':
    default:
      filtered.sort((a, b) => b.engagementScore - a.engagementScore);
  }
  
  return filtered.slice(0, limit);
}

/**
 * Busca videos por texto en título o descripción
 */
export function searchVideos(
  videos: VideoMetadata[],
  query: string,
  limit = 12
): VideoMetadata[] {
  const lowerQuery = query.toLowerCase();
  
  return videos
    .filter(v => 
      v.titulo.toLowerCase().includes(lowerQuery) ||
      v.descripcion.toLowerCase().includes(lowerQuery)
    )
    .sort((a, b) => b.engagementScore - a.engagementScore)
    .slice(0, limit);
}

/**
 * Obtiene videos por IDs específicos
 */
export function getVideosByIds(
  videos: VideoMetadata[],
  ids: string[]
): VideoMetadata[] {
  return ids
    .map(id => videos.find(v => v.id === id))
    .filter((v): v is VideoMetadata => v !== undefined);
}
