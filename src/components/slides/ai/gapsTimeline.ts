import { stepAt, stepsDuration } from "../../deck/stepTimeline";
import type { IGapsFrame } from "./gapsTimeline.type";

/** Pause before the first source lights up. */
export const GAPS_DELAY_MS = 900;
/** Time the agent spends reading each source. */
export const GAPS_SOURCE_MS = 1100;
/** Time each check holds the stage before the next one appears. */
export const GAPS_CHECK_MS = 1900;
/** A check's result lands this long after the check appears (a whole number of playback ticks). */
export const GAPS_REVEAL_MS = 500;

/** How long the gap check plays for `sources` sources and `checks` checks. */
export function gapsDuration(sources: number, checks: number): number {
  return stepsDuration(
    stepsDuration(GAPS_DELAY_MS, GAPS_SOURCE_MS, sources),
    GAPS_CHECK_MS,
    checks,
  );
}

/** The gap check `elapsed` ms in: the agent reads each source, then resolves each check. */
export function gapsFrame(elapsed: number, sources: number, checks: number): IGapsFrame {
  const reading = stepAt(elapsed, GAPS_DELAY_MS, GAPS_SOURCE_MS, sources);
  if (reading === -1) return { sourcesLit: 0, reading: null, shown: 0, resolved: 0, done: false };
  if (reading < sources) {
    return { sourcesLit: reading + 1, reading, shown: 0, resolved: 0, done: false };
  }
  const checksStart = stepsDuration(GAPS_DELAY_MS, GAPS_SOURCE_MS, sources);
  const current = stepAt(elapsed, checksStart, GAPS_CHECK_MS, checks);
  if (current === checks) {
    return { sourcesLit: sources, reading: null, shown: checks, resolved: checks, done: true };
  }
  const landed = elapsed - checksStart - current * GAPS_CHECK_MS >= GAPS_REVEAL_MS;
  return {
    sourcesLit: sources,
    reading: null,
    shown: current + 1,
    resolved: landed ? current + 1 : current,
    done: false,
  };
}
