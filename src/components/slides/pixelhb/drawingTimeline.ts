import { gridCells } from "./pixelGrid";
import type { TPixelGrid, TPixelKey } from "./pixelGrid.type";

/** Pause before the first pixel lands. */
export const DRAWING_DELAY_MS = 500;
/** Time the whole drawing takes, first pixel to last. Kept under 5 s with the delay (no control). */
export const DRAWING_MS = 3800;

/** How long the drawing plays. */
export const drawingDuration = DRAWING_DELAY_MS + DRAWING_MS;

/**
 * The order an artist would draw `grid` in: every pixel of the first key in `keys`, row by row,
 * then the next key. Keys left out of `keys` are drawn last, in row order.
 */
export function drawingOrder(grid: TPixelGrid, keys: readonly TPixelKey[]): number[] {
  const cells = gridCells(grid);
  const rank = (key: TPixelKey) => {
    const at = keys.indexOf(key);
    return at === -1 ? keys.length : at;
  };
  return cells
    .map((cell, row) => ({ cell, row }))
    .sort((a, b) => rank(a.cell.key) - rank(b.cell.key) || a.row - b.row)
    .map(({ cell }) => cell.index);
}

/** How many of `total` pixels are drawn `elapsed` ms in. */
export function drawnCount(elapsed: number, total: number): number {
  if (elapsed <= DRAWING_DELAY_MS) return 0;
  const share = Math.min(1, (elapsed - DRAWING_DELAY_MS) / DRAWING_MS);
  return Math.ceil(share * total);
}
