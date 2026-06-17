// Helpers for running workouts (paces, durations, formatting)

export type StepType = 'warmup' | 'work' | 'recovery' | 'cooldown' | 'repeat';
export type DurationType = 'time' | 'distance' | 'open';
export type TargetType = 'pace' | 'heart_rate' | 'rpe' | 'none';

export interface RunningStep {
  id: string;
  workout_id: string;
  parent_step_id: string | null;
  order_index: number;
  step_type: StepType;
  repeat_count: number | null;
  duration_type: DurationType;
  duration_value: number | null; // seconds or meters
  target_type: TargetType;
  target_low: number | null;
  target_high: number | null;
  notes: string | null;
}

export const STEP_LABELS: Record<StepType, string> = {
  warmup: 'Calentamiento',
  work: 'Trabajo / Serie',
  recovery: 'Recuperación',
  cooldown: 'Vuelta a la calma',
  repeat: 'Bloque repetido',
};

// "4:10" (min:sec per km) <-> seconds
export function paceToSeconds(input: string): number | null {
  if (!input) return null;
  const m = input.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const min = parseInt(m[1], 10);
  const sec = parseInt(m[2], 10);
  if (sec >= 60) return null;
  return min * 60 + sec;
}

export function secondsToPace(sec: number | null | undefined): string {
  if (sec == null) return '—';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatDuration(step: Pick<RunningStep, 'duration_type' | 'duration_value'>): string {
  if (step.duration_type === 'open' || step.duration_value == null) return 'Abierto';
  if (step.duration_type === 'time') {
    const v = step.duration_value;
    if (v >= 60) {
      const m = Math.floor(v / 60);
      const s = v % 60;
      return s ? `${m}'${s.toString().padStart(2, '0')}"` : `${m}'`;
    }
    return `${v}"`;
  }
  // distance in meters
  const m = step.duration_value;
  return m >= 1000 ? `${(m / 1000).toLocaleString('es-ES', { maximumFractionDigits: 2 })} km` : `${m} m`;
}

export function formatTarget(step: Pick<RunningStep, 'target_type' | 'target_low' | 'target_high'>): string {
  if (step.target_type === 'none' || step.target_low == null) return '';
  if (step.target_type === 'pace') {
    const lo = secondsToPace(step.target_low);
    const hi = step.target_high && step.target_high !== step.target_low ? secondsToPace(step.target_high) : null;
    return hi ? `${lo}–${hi}/km` : `${lo}/km`;
  }
  if (step.target_type === 'heart_rate') {
    const hi = step.target_high && step.target_high !== step.target_low ? `–${step.target_high}` : '';
    return `${step.target_low}${hi} ppm`;
  }
  if (step.target_type === 'rpe') {
    const hi = step.target_high && step.target_high !== step.target_low ? `–${step.target_high}` : '';
    return `RPE ${step.target_low}${hi}`;
  }
  return '';
}

export function summarizeStep(step: RunningStep): string {
  const prefix = step.repeat_count && step.repeat_count > 1 ? `${step.repeat_count} × ` : '';
  const dur = formatDuration(step);
  const tgt = formatTarget(step);
  return `${prefix}${dur}${tgt ? ` @ ${tgt}` : ''}`;
}
