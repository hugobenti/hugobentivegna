/** Pause before the first excerpt lights up. */
export const FOUNDATION_DELAY_MS = 700;
/** Time each excerpt stays in focus before the next one. */
export const FOUNDATION_STEP_MS = 2200;

export interface FoundationFrame {
  /** The excerpt in focus, or null before the first one and once all are lit. */
  current: number | null;
  /** Every excerpt lit: the end state. */
  all: boolean;
}

/** How long the foundation plays for `count` excerpts. */
export function foundationDuration(count: number): number {
  return FOUNDATION_DELAY_MS + count * FOUNDATION_STEP_MS;
}

/** The foundation `elapsed` ms in: each excerpt in focus for one step, then all of them. */
export function foundationFrame(elapsed: number, count: number): FoundationFrame {
  if (elapsed >= foundationDuration(count)) return { current: null, all: true };
  if (elapsed < FOUNDATION_DELAY_MS) return { current: null, all: false };
  return { current: Math.floor((elapsed - FOUNDATION_DELAY_MS) / FOUNDATION_STEP_MS), all: false };
}
