/** Pause before the first source lights up. */
export const GAPS_DELAY_MS = 900;
/** Time the agent spends reading each source. */
export const GAPS_SOURCE_MS = 1100;
/** Time each check holds the stage before the next one appears. */
export const GAPS_CHECK_MS = 1900;
/** A check's result lands this long after the check appears (a whole number of playback ticks). */
export const GAPS_REVEAL_MS = 500;

export interface GapsFrame {
  /** How many sources are lit (they stay lit once read). */
  sourcesLit: number;
  /** The source being read right now, or null outside the reading phase. */
  reading: number | null;
  /** How many checks have appeared. */
  shown: number;
  /** How many checks show their result. */
  resolved: number;
  done: boolean;
}

/** How long the gap check plays for `sources` sources and `checks` checks. */
export function gapsDuration(sources: number, checks: number): number {
  return GAPS_DELAY_MS + sources * GAPS_SOURCE_MS + checks * GAPS_CHECK_MS;
}

/** The gap check `elapsed` ms in: the agent reads each source, then resolves each check. */
export function gapsFrame(elapsed: number, sources: number, checks: number): GapsFrame {
  if (elapsed >= gapsDuration(sources, checks)) {
    return { sourcesLit: sources, reading: null, shown: checks, resolved: checks, done: true };
  }
  if (elapsed < GAPS_DELAY_MS) {
    return { sourcesLit: 0, reading: null, shown: 0, resolved: 0, done: false };
  }
  const checksStart = GAPS_DELAY_MS + sources * GAPS_SOURCE_MS;
  if (elapsed < checksStart) {
    const reading = Math.floor((elapsed - GAPS_DELAY_MS) / GAPS_SOURCE_MS);
    return { sourcesLit: reading + 1, reading, shown: 0, resolved: 0, done: false };
  }
  const intoChecks = elapsed - checksStart;
  const current = Math.floor(intoChecks / GAPS_CHECK_MS);
  const landed = intoChecks - current * GAPS_CHECK_MS >= GAPS_REVEAL_MS;
  return {
    sourcesLit: sources,
    reading: null,
    shown: current + 1,
    resolved: landed ? current + 1 : current,
    done: false,
  };
}
