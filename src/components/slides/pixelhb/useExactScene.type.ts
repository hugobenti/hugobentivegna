import type { ITool } from "@/content/content.type";
import type { TExactCardState } from "./exactTimeline.type";
import type { TPixelArtSize } from "./PixelArt.type";
import type { TPixelGrid, TPixelKey } from "./pixelGrid.type";

/** The colors a loupe ring can show: the heart's two ambers. */
export type TRingKey = Extract<TPixelKey, "r" | "b">;

export interface IExactSceneTool extends ITool {
  /** The card has been reached: it stays lit once its turn has come. */
  on: boolean;
  state: TExactCardState;
}

/** One heart of the zoom demo: the 1× heart shows from the start, the others on the card's turn. */
export interface IZoomStep {
  size: TPixelArtSize;
  on: boolean;
}

export interface IExactLoupe {
  /** The 5 × 5 patch around the pointer, as a grid the drawing component can render. */
  grid: TPixelGrid;
  /** The color under the pointer: the ring's top half. */
  picked: TRingKey;
  /** The current drawing color: the ring's bottom half. */
  current: TRingKey;
  /** The lens over the patch: the ring shows from the start, the lens on the card's turn. */
  lens: boolean;
}
