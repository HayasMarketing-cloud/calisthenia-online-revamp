import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatear números grandes a formato compacto
 * Ejemplos: 10500 → "10.5K", 1200000 → "1.2M"
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Convertir duración ISO 8601 a formato legible
 * Ejemplos: "PT12M34S" → "12:34", "PT1H5M30S" → "1:05:30"
 */
export function formatDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Obtener fecha relativa en español
 * Ejemplo: "2024-01-15T10:00:00Z" → "Hace 5 días"
 */
export function getRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { 
    addSuffix: true, 
    locale: es 
  });
}
