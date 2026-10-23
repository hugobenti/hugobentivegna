import { stepAt, stepsDuration } from "../../deck/stepTimeline";

/** Pause before the first step lands, so the empty button reads as the starting point. */
export const BUILD_DELAY_MS = 400;
/** Time each step holds the stage before the next one lands. */
export const BUILD_STEP_MS = 1150;

/** How long building a button from `stepCount` token steps plays. */
export function buildDuration(stepCount: number): number {
  return stepsDuration(BUILD_DELAY_MS, BUILD_STEP_MS, stepCount);
}

/** How many token steps have been applied to the button `elapsed` ms in (0 to `stepCount`). */
export function buildFrame(elapsed: number, stepCount: number): number {
  return Math.min(stepCount, stepAt(elapsed, BUILD_DELAY_MS, BUILD_STEP_MS, stepCount) + 1);
}
