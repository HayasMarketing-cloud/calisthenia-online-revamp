import type { ActionRoute } from './routes';

export type NudgeKey =
  | 'today_session'
  | 'log_weight'
  | 'plan_tomorrow'
  | 'waiting_program'
  | 'streak';

export type NudgePriority = 'high' | 'medium' | 'low';

export interface NudgeSessionInfo {
  id: string;
  status?: 'pending' | 'in_progress' | 'completed';
  isRest: boolean;
}

export interface NudgeState {
  /** Fecha/hora actual ya convertida a Europe/Madrid (el hook se encarga). */
  nowMadrid: Date;
  hasActiveProgram: boolean;
  todaySession?: NudgeSessionInfo | null;
  tomorrowSession?: NudgeSessionInfo | null;
  /** Última fecha en la que el alumno registró baseline_metrics con weight_kg NOT NULL. */
  lastWeightLoggedAt?: Date | null;
  /** Fecha de fin de onboarding (en este proyecto = client_profiles.created_at). */
  onboardingCompletedAt?: Date | null;
  currentStreak: number;
  /** Último dismiss por nudge (los > 7 días pueden no incluirse). */
  dismissals: Partial<Record<NudgeKey, Date>>;
}

export interface Nudge {
  key: NudgeKey;
  priority: NudgePriority;
  title: string;
  body?: string;
  primaryAction: { label: string; route: ActionRoute };
  secondaryAction?: { label: string; route: ActionRoute };
}

const DAY_MS = 24 * 60 * 60 * 1000;
const DISMISS_HIDE_DAYS = 3;
const ONBOARDING_SILENCE_DAYS = 14;
const WEIGHT_TRIGGER_DAYS = 15;
const STREAK_MIN = 3;

const PRIORITY_RANK: Record<NudgePriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function daysBetween(a: Date, b: Date): number {
  return (a.getTime() - b.getTime()) / DAY_MS;
}

function isDismissed(state: NudgeState, key: NudgeKey): boolean {
  const d = state.dismissals[key];
  if (!d) return false;
  return daysBetween(state.nowMadrid, d) < DISMISS_HIDE_DAYS;
}

/**
 * Función pura: dado el estado, decide qué tarjetas de nudge mostrar en el dashboard.
 * Tope: 1 destacada + 2 secundarias = 3.
 */
export function selectDashboardNudges(state: NudgeState): Nudge[] {
  const candidates: Nudge[] = [];

  // --- waiting_program (high) — bloquea otros nudges si no hay programa.
  if (!state.hasActiveProgram) {
    if (!isDismissed(state, 'waiting_program')) {
      candidates.push({
        key: 'waiting_program',
        priority: 'high',
        title: 'Esperando tu programa',
        body: 'Aún no tienes un programa activo. Te avisaré en cuanto esté listo.',
        primaryAction: { label: 'Ver mi perfil', route: 'today_session' }, // placeholder neutro
        secondaryAction: {
          label: 'Mientras tanto, mira rutinas',
          route: 'public_routines',
        },
      });
    }
  } else {
    // --- Cascada Hoy → Mañana
    const todayPending =
      state.todaySession &&
      !state.todaySession.isRest &&
      state.todaySession.status !== 'completed';

    if (todayPending && !isDismissed(state, 'today_session')) {
      candidates.push({
        key: 'today_session',
        priority: 'high',
        title: 'Tu sesión de hoy te espera',
        body: 'Tienes una sesión programada para hoy.',
        primaryAction: { label: 'Empezar sesión', route: 'today_session' },
      });
    } else {
      // Sesión completada (o no hay hoy): mostrar plan_tomorrow a partir de las 18:00 Madrid
      const hour = state.nowMadrid.getHours();
      if (
        hour >= 18 &&
        state.tomorrowSession &&
        !state.tomorrowSession.isRest &&
        !isDismissed(state, 'plan_tomorrow')
      ) {
        candidates.push({
          key: 'plan_tomorrow',
          priority: 'medium',
          title: 'Mañana tienes sesión',
          body: 'Échale un vistazo para llegar con la cabeza puesta.',
          primaryAction: { label: 'Ver agenda', route: 'view_agenda' },
        });

      }
    }
  }

  // --- log_weight (medium): silencio post-onboarding + umbral 15d
  const onboardedDaysAgo = state.onboardingCompletedAt
    ? daysBetween(state.nowMadrid, state.onboardingCompletedAt)
    : Infinity;
  const weightDaysAgo = state.lastWeightLoggedAt
    ? daysBetween(state.nowMadrid, state.lastWeightLoggedAt)
    : Infinity;

  if (
    onboardedDaysAgo >= ONBOARDING_SILENCE_DAYS &&
    weightDaysAgo > WEIGHT_TRIGGER_DAYS &&
    !isDismissed(state, 'log_weight')
  ) {
    candidates.push({
      key: 'log_weight',
      priority: 'medium',
      title: 'Registra tu peso',
      body:
        weightDaysAgo === Infinity
          ? 'Anota tu peso para empezar a ver tu evolución.'
          : 'Hace un tiempo que no anotas tu peso.',
      primaryAction: { label: 'Registrar peso', route: 'log_weight' },
    });
  }

  // --- streak (low, opcional): mínimo 3 días
  if (state.currentStreak >= STREAK_MIN && !isDismissed(state, 'streak')) {
    candidates.push({
      key: 'streak',
      priority: 'low',
      title: `Llevas ${state.currentStreak} días seguidos`,
      body: 'No rompas la racha.',
      primaryAction: { label: 'Ver mi entreno', route: 'today_session' },
    });
  }

  // Orden por prioridad y tope 1+2
  candidates.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
  return candidates.slice(0, 3);
}
