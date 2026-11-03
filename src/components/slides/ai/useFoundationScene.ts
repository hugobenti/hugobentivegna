import { aiCase } from "@/content/cases";
import { usePlaybackControl } from "../../deck/usePlaybackControl";
import { foundationDuration, foundationFrame } from "./foundationTimeline";
import type { IShownLine } from "./useFoundationScene.type";

const { foundation } = aiCase;
const count = foundation.excerpts.length;
const duration = foundationDuration(count);

/**
 * Foundation view model: once the slide is active each excerpt is highlighted in turn (`on`);
 * those already passed, and all of them at the end, are `read`. Every excerpt is rendered from
 * the start; only `on` and `read` change.
 */
export function useFoundationScene() {
  const { ref, elapsed, control } = usePlaybackControl<HTMLDivElement>(duration);
  const frame = foundationFrame(elapsed, count);
  return {
    ref,
    excerpts: foundation.excerpts.map((excerpt, index) => ({
      ...excerpt,
      lines: excerpt.lines.map((line): IShownLine => ({
        text: line.text,
        tone: line.tone ?? "plain",
      })),
      on: frame.current === index,
      read: frame.all || (frame.current !== null && index < frame.current),
    })),
    control,
  };
}
