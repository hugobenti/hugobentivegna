import type { pixelArtSize } from "./PixelArt.style";
import type { TPixelGrid, TPixelKey } from "./pixelGrid.type";

export type TPixelArtSize = keyof typeof pixelArtSize;

export type TPixelArtProps = {
  grid: TPixelGrid;
  /** The accessible name of the drawing. */
  label: string;
  size: TPixelArtSize;
  className?: string;
  /** One rect per pixel (with `data-index`) instead of one per run. */
  cells?: boolean;
};

export interface IPixelRect {
  /** Unique within one drawing: the position. */
  id: string;
  key: TPixelKey;
  x: number;
  y: number;
  width: number;
  /** Cell index (`y * width + x`); set only in cells mode. */
  index?: number;
  className: string;
}
