import type { IMemoryFrame } from "./memoryTimeline.type";

/** Pause before the first canvas size shows. */
export const MEMORY_DELAY_MS = 600;
/** Time each canvas size holds the readout before the next one. */
export const MEMORY_SIZE_MS = 900;
/** Time the storage bars take to fill, after the last size. */
export const MEMORY_BARS_MS = 1200;
/** Time between one history entry and the next. */
export const MEMORY_ENTRY_MS = 350;

/** How long the slide plays for `sizes` canvas sizes and a stroke of `entries` entries. */
export function memoryDuration(sizes: number, entries: number): number {
  return MEMORY_DELAY_MS + sizes * MEMORY_SIZE_MS + MEMORY_BARS_MS + entries * MEMORY_ENTRY_MS;
}

/** The slide `elapsed` ms in: the canvas sizes in turn, then the bars, then the history entries. */
export function memoryFrame(elapsed: number, sizes: number, entries: number): IMemoryFrame {
  if (elapsed >= memoryDuration(sizes, entries)) {
    return { size: sizes - 1, bars: true, entries, done: true };
  }
  if (elapsed < MEMORY_DELAY_MS) return { size: -1, bars: false, entries: 0, done: false };
  const barsStart = MEMORY_DELAY_MS + sizes * MEMORY_SIZE_MS;
  if (elapsed < barsStart) {
    const size = Math.floor((elapsed - MEMORY_DELAY_MS) / MEMORY_SIZE_MS);
    return { size, bars: false, entries: 0, done: false };
  }
  const entriesStart = barsStart + MEMORY_BARS_MS;
  if (elapsed < entriesStart) return { size: sizes - 1, bars: true, entries: 0, done: false };
  const landed = Math.floor((elapsed - entriesStart) / MEMORY_ENTRY_MS) + 1;
  return { size: sizes - 1, bars: true, entries: Math.min(landed, entries), done: false };
}
