/**
 * When each stage starts: Draft, Review, Fix, Rule, Checks, Merged. Whole playback ticks, so a
 * stage lands on the tick it names.
 */
export const REVIEW_STAGE_MS = [600, 2000, 4200, 6700, 8700, 10500] as const;
/** After the fix starts, the new line lands this much later (the old lines go red first). */
export const REVIEW_FIXED_MS = 900;
/** Time between two checks passing. */
export const REVIEW_CHECK_MS = 400;
/** The loop plays until it merges, then holds. */
export const REVIEW_MS = REVIEW_STAGE_MS[5];

export interface ReviewFrame {
  /** Index of the stage reached (-1 before the draft lands). */
  stage: number;
  /** The draft's lines are marked removed. */
  removed: boolean;
  /** The new line has landed and the comment is resolved. */
  fixed: boolean;
  checksPassed: number;
}

/** The review loop `elapsed` ms in, for `checks` checks. */
export function reviewFrame(elapsed: number, checks: number): ReviewFrame {
  const [, , fix, , checksStart] = REVIEW_STAGE_MS;
  const passed =
    elapsed < checksStart ? 0 : Math.floor((elapsed - checksStart) / REVIEW_CHECK_MS) + 1;
  return {
    stage: REVIEW_STAGE_MS.filter((start) => elapsed >= start).length - 1,
    removed: elapsed >= fix,
    fixed: elapsed >= fix + REVIEW_FIXED_MS,
    checksPassed: Math.min(passed, checks),
  };
}
