import type { IExactFrame, TExactCardState } from "./exactTimeline.type";

/** Pause before the first card lights. */
export const EXACT_DELAY_MS = 700;
/** Time each card holds the spotlight. */
export const EXACT_STEP_MS = 2400;
/** The share of its card's time the fills take; the rest holds the result. */
const FILL_SHARE = 0.85;

/** How long the slide plays for `cards` cards. */
export function exactDuration(cards: number): number {
  return EXACT_DELAY_MS + cards * EXACT_STEP_MS;
}

/** The slide `elapsed` ms in: nothing, then each card in turn, then all of them lit. */
export function exactFrame(elapsed: number, cards: number): IExactFrame {
  if (elapsed >= exactDuration(cards)) return { current: null, progress: 1, all: true };
  if (elapsed < EXACT_DELAY_MS) return { current: null, progress: 0, all: false };
  const into = elapsed - EXACT_DELAY_MS;
  const current = Math.floor(into / EXACT_STEP_MS);
  return { current, progress: (into - current * EXACT_STEP_MS) / EXACT_STEP_MS, all: false };
}

/** Where card `index` is in the frame. */
export function exactCard(frame: IExactFrame, index: number): TExactCardState {
  if (frame.all) return "done";
  if (frame.current === null) return "idle";
  if (index === frame.current) return "current";
  return index < frame.current ? "done" : "idle";
}

/**
 * How many of the fill demo's `shapes` card `index` has filled by this frame. Each shape fills in
 * one go, like a bucket click; the clicks are evenly spaced and the first comes after a beat.
 */
export function exactFillCount(frame: IExactFrame, index: number, shapes: number): number {
  const state = exactCard(frame, index);
  if (state === "done") return shapes;
  if (state === "idle") return 0;
  return Math.min(shapes, Math.floor(Math.min(1, frame.progress / FILL_SHARE) * (shapes + 1)));
}
