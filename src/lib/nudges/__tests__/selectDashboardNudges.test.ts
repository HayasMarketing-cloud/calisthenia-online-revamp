import { describe, it, expect } from 'vitest';
import { selectDashboardNudges, type NudgeState } from '../selectDashboardNudges';

const DAY = 24 * 60 * 60 * 1000;

// Fija una "hora Madrid" a las 12:00 del día base
const baseNow = new Date('2026-06-20T12:00:00');

function makeState(overrides: Partial<NudgeState> = {}): NudgeState {
  return {
    nowMadrid: baseNow,
    hasActiveProgram: true,
    todaySession: null,
    tomorrowSession: null,
    lastWeightLoggedAt: new Date(baseNow.getTime() - 1 * DAY),
    onboardingCompletedAt: new Date(baseNow.getTime() - 60 * DAY),
    currentStreak: 0,
    dismissals: {},
    ...overrides,
  };
}

describe('selectDashboardNudges', () => {
  it('sin programa → waiting_program destacada con CTA a rutinas públicas', () => {
    const r = selectDashboardNudges(makeState({ hasActiveProgram: false }));
    expect(r[0]?.key).toBe('waiting_program');
    expect(r[0]?.secondaryAction?.route).toBe('public_routines');
  });

  it('sesión pendiente hoy → today_session destacada', () => {
    const r = selectDashboardNudges(
      makeState({ todaySession: { id: 's1', isRest: false, status: 'pending' } })
    );
    expect(r[0]?.key).toBe('today_session');
    expect(r[0]?.priority).toBe('high');
  });

  it('sesión completada y 17:59 Madrid → no plan_tomorrow', () => {
    const now = new Date('2026-06-20T17:59:00');
    const r = selectDashboardNudges(
      makeState({
        nowMadrid: now,
        todaySession: { id: 's1', isRest: false, status: 'completed' },
        tomorrowSession: { id: 's2', isRest: false },
      })
    );
    expect(r.find((n) => n.key === 'plan_tomorrow')).toBeUndefined();
  });

  it('sesión completada y 18:01 Madrid → plan_tomorrow destacada con "Echar un vistazo"', () => {
    const now = new Date('2026-06-20T18:01:00');
    const r = selectDashboardNudges(
      makeState({
        nowMadrid: now,
        todaySession: { id: 's1', isRest: false, status: 'completed' },
        tomorrowSession: { id: 's2', isRest: false },
      })
    );
    const t = r.find((n) => n.key === 'plan_tomorrow');
    expect(t).toBeDefined();
    expect(t?.primaryAction.label).toBe('Echar un vistazo');
    expect(t?.primaryAction.route).toBe('today_session');
  });

  it('onboarding hace 5d y sin peso → no log_weight', () => {
    const r = selectDashboardNudges(
      makeState({
        onboardingCompletedAt: new Date(baseNow.getTime() - 5 * DAY),
        lastWeightLoggedAt: null,
      })
    );
    expect(r.find((n) => n.key === 'log_weight')).toBeUndefined();
  });

  it('onboarding 30d + peso hace 10d → no log_weight (< 15d)', () => {
    const r = selectDashboardNudges(
      makeState({
        onboardingCompletedAt: new Date(baseNow.getTime() - 30 * DAY),
        lastWeightLoggedAt: new Date(baseNow.getTime() - 10 * DAY),
      })
    );
    expect(r.find((n) => n.key === 'log_weight')).toBeUndefined();
  });

  it('onboarding 30d + peso hace 16d → log_weight aparece', () => {
    const r = selectDashboardNudges(
      makeState({
        onboardingCompletedAt: new Date(baseNow.getTime() - 30 * DAY),
        lastWeightLoggedAt: new Date(baseNow.getTime() - 16 * DAY),
      })
    );
    expect(r.find((n) => n.key === 'log_weight')).toBeDefined();
  });

  it('onboarding 30d + weight_kg antiguo > 15d (aunque registró cintura/cadera hace poco) → log_weight aparece', () => {
    // lastWeightLoggedAt se ancla a la última fila con weight_kg NOT NULL; el hook se
    // encarga. Aquí simulamos peso antiguo aunque haya métricas recientes.
    const r = selectDashboardNudges(
      makeState({
        onboardingCompletedAt: new Date(baseNow.getTime() - 30 * DAY),
        lastWeightLoggedAt: new Date(baseNow.getTime() - 20 * DAY),
      })
    );
    expect(r.find((n) => n.key === 'log_weight')).toBeDefined();
  });

  it('racha 2 → no streak; racha 3 → streak', () => {
    expect(
      selectDashboardNudges(makeState({ currentStreak: 2 })).find((n) => n.key === 'streak')
    ).toBeUndefined();
    expect(
      selectDashboardNudges(makeState({ currentStreak: 3 })).find((n) => n.key === 'streak')
    ).toBeDefined();
  });

  it('dismiss hace 2d → oculto; hace 4d → reaparece', () => {
    const stateBase = makeState({
      todaySession: { id: 's1', isRest: false, status: 'pending' },
    });
    const hidden = selectDashboardNudges({
      ...stateBase,
      dismissals: { today_session: new Date(baseNow.getTime() - 2 * DAY) },
    });
    expect(hidden.find((n) => n.key === 'today_session')).toBeUndefined();

    const back = selectDashboardNudges({
      ...stateBase,
      dismissals: { today_session: new Date(baseNow.getTime() - 4 * DAY) },
    });
    expect(back.find((n) => n.key === 'today_session')).toBeDefined();
  });

  it('más de 3 candidatos → exactamente 3, respetando prioridad', () => {
    const r = selectDashboardNudges(
      makeState({
        hasActiveProgram: true,
        todaySession: { id: 's1', isRest: false, status: 'pending' }, // high
        onboardingCompletedAt: new Date(baseNow.getTime() - 30 * DAY),
        lastWeightLoggedAt: new Date(baseNow.getTime() - 20 * DAY), // medium log_weight
        currentStreak: 5, // low streak
        // forzar también plan_tomorrow simulando >=18h
        nowMadrid: new Date('2026-06-20T19:00:00'),
        tomorrowSession: { id: 's2', isRest: false },
      })
    );
    expect(r.length).toBe(3);
    expect(r[0].priority).toBe('high');
    // El low (streak) debe estar al final o quedar fuera
    expect(r.map((n) => n.priority)).toEqual(['high', 'medium', 'low']);
  });
});
