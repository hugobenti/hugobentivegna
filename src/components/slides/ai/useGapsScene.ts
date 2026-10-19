import { aiCase } from "@/content/cases";
import type { GapCheck, GapResult } from "@/content/types";
import { usePlayback } from "../../deck/usePlayback";
import { gapsDuration, gapsFrame } from "./gapsTimeline";

const { gaps, controls } = aiCase;
const duration = gapsDuration(gaps.sources.length, gaps.checks.length);

export type CheckState = "idle" | "checking" | GapResult;

/**
 * Gap-check view model: once the slide is active the agent reads each source, then every
 * check lands its result. All copy is rendered from the start; only the states change.
 */
export function useGapsScene() {
  const { ref, elapsed, still, paused, finished, toggle } = usePlayback<HTMLDivElement>(duration);
  const frame = gapsFrame(elapsed, gaps.sources.length, gaps.checks.length);
  const stateOf = (check: GapCheck, index: number): CheckState => {
    if (index < frame.resolved) return check.result;
    return index < frame.shown ? "checking" : "idle";
  };
  const reading = frame.reading === null ? undefined : gaps.sources[frame.reading];

  return {
    ref,
    still,
    sources: gaps.sources.map((source, index) => ({ ...source, on: index < frame.sourcesLit })),
    /** What the agent is doing right now; visual only (the list carries the content). */
    caption: frame.done ? gaps.done : (reading?.reading ?? ""),
    checks: gaps.checks.map((check, index) => ({ ...check, state: stateOf(check, index) })),
    control: {
      label: finished ? controls.replay : paused ? controls.play : controls.pause,
      toggle,
    },
  };
}
