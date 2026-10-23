import type { ITool } from "@/content/content.type";
import type { TExactCardState } from "./exactTimeline.type";
import type { TPixelGrid, TPixelKey } from "./pixelGrid.type";

/** The colors a loupe ring can show: the heart's two blues. */
export type TRingKey = Extract<TPixelKey, "r" | "b">;

export interface IExactSceneTool extends ITool {
  /** The card has been reached: it stays lit once its turn has come. */
  on: boolean;
  state: TExactCardState;
}

export interface IExactLoupe {
  /** The 5 × 5 patch around the pointer, as a grid the drawing component can render. */
  grid: TPixelGrid;
  /** The color under the pointer: the ring's top half. */
  picked: TRingKey;
  /** The current drawing color: the ring's bottom half. */
  current: TRingKey;
}
