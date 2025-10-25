/**
 * Sistema de curación manual de videos
 * 
 * Aquí puedes:
 * - Destacar videos específicos por zona
 * - Ocultar videos que no quieres mostrar
 * - Sobrescribir prioridad de videos manualmente
 */

// Videos destacados por zona (aparecerán primero)
export const featuredVideos = {
  espalda: [
    'bSYhg5i28kg', // Súper dominada
    'j1VaM6CNazM', // 10 dominadas
    'qa00fnGijEo', // 5 dominadas
  ],
  pecho: [
    // Agregar IDs de videos destacados de pecho
  ],
  brazos: [
    // Agregar IDs de videos destacados de brazos
  ],
  piernas: [
    // Agregar IDs de videos destacados de piernas
  ],
  core: [
    // Agregar IDs de videos destacados de core/abdominales
  ],
  hombros: [
    // Agregar IDs de videos destacados de hombros
  ],
  fullBody: [
    // Agregar IDs de videos destacados de full body
  ]
};

// Videos ocultos (no se mostrarán en ninguna galería)
export const hiddenVideos: string[] = [
  // Agregar IDs de videos que quieres ocultar
  // Ejemplo: 'VIDEO_ID_A_OCULTAR'
];

// Sobrescribir configuración de videos específicos
export const videoOverrides: Record<string, {
  priority?: number; // 1-5, mayor número = aparece primero
  featured?: boolean; // Marcar como destacado
}> = {
  // Ejemplo:
  // 'bSYhg5i28kg': {
  //   priority: 5,
  //   featured: true
  // }
};
