/** Pause before the first step lands, so the empty button reads as the starting point. */
export const BUILD_DELAY_MS = 400;
/** Time each step holds the stage before the next one lands. */
export const BUILD_STEP_MS = 1150;

/** How long building a button from `stepCount` token steps plays. */
export function buildDuration(stepCount: number): number {
  return BUILD_DELAY_MS + stepCount * BUILD_STEP_MS;
}

/** How many token steps have been applied to the button `elapsed` ms in (0 to `stepCount`). */
export function buildFrame(elapsed: number, stepCount: number): number {
  if (elapsed < BUILD_DELAY_MS) return 0;
  return Math.min(stepCount, 1 + Math.floor((elapsed - BUILD_DELAY_MS) / BUILD_STEP_MS));
}
