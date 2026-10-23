import { stepAt, stepsDuration } from "../../deck/stepTimeline";
import type { IFoundationFrame } from "./foundationTimeline.type";

/** Pause before the first excerpt lights up. */
export const FOUNDATION_DELAY_MS = 700;
/** Time each excerpt stays in focus before the next one. */
export const FOUNDATION_STEP_MS = 2200;

/** How long the foundation plays for `count` excerpts. */
export function foundationDuration(count: number): number {
  return stepsDuration(FOUNDATION_DELAY_MS, FOUNDATION_STEP_MS, count);
}

/** The foundation `elapsed` ms in: each excerpt in focus for one step, then all of them. */
export function foundationFrame(elapsed: number, count: number): IFoundationFrame {
  const step = stepAt(elapsed, FOUNDATION_DELAY_MS, FOUNDATION_STEP_MS, count);
  if (step === count) return { current: null, all: true };
  return { current: step === -1 ? null : step, all: false };
}
