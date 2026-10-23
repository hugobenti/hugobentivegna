/** How long a pause of `delayMs` followed by `count` steps of `stepMs` each takes. */
export function stepsDuration(delayMs: number, stepMs: number, count: number): number {
  return delayMs + count * stepMs;
}

/**
 * The step `elapsedMs` falls in: -1 during the delay, then 0 for the first step, up to
 * `count - 1` for the last, and `count` once every step is over.
 */
export function stepAt(elapsedMs: number, delayMs: number, stepMs: number, count: number): number {
  if (elapsedMs < delayMs) return -1;
  return Math.min(count, Math.floor((elapsedMs - delayMs) / stepMs));
}
