import { aiCase } from "@/content/cases";
import { usePlaybackControl } from "../../deck/usePlaybackControl";
import { REVIEW_MS, reviewFrame } from "./reviewTimeline";

const { build } = aiCase;
const { review } = build;

/**
 * Review-loop view model: once the slide is active a real change goes draft → review → fix →
 * rule → checks → merged. Every line, the comment, the rule and the checks are rendered from
 * the start; the panel's data attributes say how far the loop has got.
 */
export function useReviewLoop() {
  const { ref, elapsed, control } = usePlaybackControl<HTMLDivElement>(REVIEW_MS);
  const frame = reviewFrame(elapsed, review.checks.length);
  const merged = frame.stage >= 5;
  return {
    ref,
    /** How far the loop has got, as data attributes on the panel. */
    progress: {
      "data-stage": frame.stage,
      "data-commented": frame.stage >= 1,
      "data-removed": frame.removed,
      "data-fixed": frame.fixed,
      "data-ruled": frame.stage >= 3,
    },
    stages: review.stages.map((label, index) => ({ label, on: index <= frame.stage })),
    checks: review.checks.map((label, index) => {
      const passed = index < frame.checksPassed;
      return { label, passed, mark: passed ? review.checkMarks.passed : review.checkMarks.pending };
    }),
    /** Visual only (screen readers get the merged status as text): both labels, one shown. */
    status: [
      { label: review.status.open, shown: !merged },
      { label: review.status.merged, shown: merged },
    ],
    merged,
    control,
  };
}
