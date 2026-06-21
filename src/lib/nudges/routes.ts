// Catálogo cerrado de rutas accionables para nudges y notificaciones.
// No usar texto libre: añadir aquí cualquier nueva ruta antes de usarla.

export type ActionRoute =
  | 'today_session' // /app/training
  | 'log_weight' // abre modal (no es ruta navegable real, pero se mantiene en el catálogo)
  | 'view_reviews' // legacy (sin uso tras retirar cards de notas/técnica)
  | 'view_agenda' // /app/agenda
  | 'public_routines'; // /rutinas/

export const ACTION_ROUTE_LABELS: Record<ActionRoute, string> = {
  today_session: 'Ver sesión',
  log_weight: 'Registrar peso',
  view_reviews: 'Ver revisión',
  view_agenda: 'Ver agenda',
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
      // Se intercepta en el componente (abre modal). Fallback navegable:
      return '/app/progress';
    case 'view_reviews':
      return '/app/progress';
    case 'view_agenda':
      return '/app/agenda';
    case 'public_routines':
      return '/rutinas/';
  }
}
