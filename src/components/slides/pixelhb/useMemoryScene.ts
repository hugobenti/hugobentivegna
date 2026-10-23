import { pixelhbCase } from "@/content/cases";
import { cssVars } from "@/design-system/ui";
import { usePlayback } from "../../deck/usePlayback";
import { memoryDuration, memoryFrame } from "./memoryTimeline";
import type {
  IMemorySceneBar,
  IMemorySceneCell,
  IMemorySceneEntry,
  TBarTone,
} from "./useMemoryScene.type";

const { memory, controls } = pixelhbCase;
const { storage, history } = memory;
const duration = memoryDuration(storage.sizes.length, history.stroke.length);
const tones: TBarTone[] = ["muted", "accent"];

/**
 * Storage and undo view model: the canvas readout steps through its sizes while the square
 * grows, the two bars fill, then the stroke's entries land one by one and paint the grid. All
 * copy is rendered from the start; the square and bars scale (no layout change) and the entries
 * fade inside rows that are already reserved.
 */
export function useMemoryScene() {
  const { ref, elapsed, paused, finished, controllable, toggle } =
    usePlayback<HTMLDivElement>(duration);
  const frame = memoryFrame(elapsed, storage.sizes.length, history.stroke.length);
  const size = storage.sizes[Math.max(frame.size, 0)];
  const painted = new Set(history.stroke.slice(0, frame.entries).map((step) => step.index));

  return {
    ref,
    size: { label: size?.label ?? "", pixels: size?.pixels ?? "", on: frame.size >= 0 },
    square: cssVars({ scale: frame.size < 0 ? 0 : (size?.scale ?? 0) }),
    bars: storage.bars.map((bar, index): IMemorySceneBar => ({
      label: bar.label,
      value: bar.value,
      tone: tones[index] ?? "accent",
      on: frame.bars,
      style: cssVars({ share: frame.bars ? bar.share : 0 }),
    })),
    grid: Array.from({ length: history.grid * history.grid }, (_, index): IMemorySceneCell => ({
      index,
      painted: painted.has(index),
    })),
    entries: history.stroke.map((step, index): IMemorySceneEntry => ({
      text: step.entry,
      on: index < frame.entries,
    })),
    control: {
      /** Only offered while it can act and something moves (not without JS or motion). */
      shown: controllable,
      label: finished ? controls.replay : paused ? controls.play : controls.pause,
      toggle,
    },
  };
}
