import { aiCase } from "@/content/cases";
import { usePlayback } from "../../deck/usePlayback";
import { foundationDuration, foundationFrame } from "./foundationTimeline";
import type { IShownLine } from "./useFoundationScene.type";

const { foundation, controls } = aiCase;
const count = foundation.excerpts.length;
const duration = foundationDuration(count);

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
      lines: excerpt.lines.map((line): IShownLine => ({
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
