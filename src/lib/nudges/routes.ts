// Catálogo cerrado de rutas accionables para nudges y notificaciones.
// No usar texto libre: añadir aquí cualquier nueva ruta antes de usarla.

export type ActionRoute =
  | 'today_session' // /app/training
  | 'log_weight' // /app/progress
  | 'view_reviews' // /app/progress
  | 'public_routines'; // /rutinas/

export const ACTION_ROUTE_LABELS: Record<ActionRoute, string> = {
  today_session: 'Ver sesión',
  log_weight: 'Registrar peso',
  view_reviews: 'Ver revisión',
  public_routines: 'Mientras tanto, mira rutinas',
};

export function resolveActionRoute(
  route: ActionRoute,
  _payload?: Record<string, unknown> | null
): string {
  switch (route) {
    case 'today_session':
      return '/app/training';
    case 'log_weight':
      return '/app/progress';
    case 'view_reviews':
      // En la beta no hay deep-link a revisión individual; va a la lista.
      return '/app/progress';
    case 'public_routines':
      return '/rutinas/';
  }
}
