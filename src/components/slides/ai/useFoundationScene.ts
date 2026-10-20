import { aiCase } from "@/content/cases";
import type { ExcerptLine } from "@/content/types";
import { usePlayback } from "../../deck/usePlayback";
import { foundationDuration, foundationFrame } from "./foundationTimeline";

const { foundation, controls } = aiCase;
const count = foundation.excerpts.length;
const duration = foundationDuration(count);

/** A line as rendered: lines without a tone are `plain`. */
export interface ShownLine {
  text: string;
  tone: NonNullable<ExcerptLine["tone"]> | "plain";
}

/**
 * Foundation view model: once the slide is active each excerpt is lit in turn, then all of
 * them stay lit. Every excerpt is rendered from the start; only `on` changes.
 */
export function useFoundationScene() {
  const { ref, elapsed, paused, finished, controllable, toggle } =
    usePlayback<HTMLDivElement>(duration);
  const frame = foundationFrame(elapsed, count);
  return {
    ref,
    excerpts: foundation.excerpts.map((excerpt, index) => ({
      ...excerpt,
      lines: excerpt.lines.map((line): ShownLine => ({
        text: line.text,
        tone: line.tone ?? "plain",
      })),
      on: frame.all || frame.current === index,
    })),
    control: {
      /** Only offered while it can act and something moves (not without JS or motion). */
      shown: controllable,
      label: finished ? controls.replay : paused ? controls.play : controls.pause,
      toggle,
    },
  };
}
