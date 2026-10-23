import { pixelhbCase } from "@/content/cases";
import { usePlayback } from "../../deck/usePlayback";
import { brandDuration, brandFrame } from "./brandTimeline";
import { LOCKUP, PENCIL, SQUARE_ICON } from "./pixelArt.data";
import { gridCells, gridSize } from "./pixelGrid";
import type { IBrandSceneAsset } from "./useBrandScene.type";

const { brand } = pixelhbCase;
const { width, height } = gridSize(PENCIL);
const cells = gridCells(PENCIL);
const grids = { lockup: LOCKUP, icon: SQUARE_ICON };
const duration = brandDuration(width, brand.assets.length);

/**
 * Brand slide view model: the pencil draws itself column by column, the drawn pixel lands
 * last, then the same grid shows at three sizes. All copy is rendered from the start; only
 * the pixel and asset states change. Under 5 s, so there is no control.
 */
export function useBrandScene() {
  const { ref, elapsed } = usePlayback<HTMLDivElement>(duration);
  const frame = brandFrame(elapsed, width, brand.assets.length);
  const cellState = Array.from({ length: width * height }, () => "off");
  for (const cell of cells) {
    const drawn = cell.key === "d" ? frame.dot : cell.x < frame.columns;
    if (drawn) cellState[cell.index] = "on";
  }

  return {
    ref,
    cellState,
    assets: brand.assets.map((asset, index): IBrandSceneAsset => ({
      ...asset,
      grid: grids[asset.grid],
      on: index < frame.assets,
    })),
    /** Visual only; the done line is also in the page for screen readers. */
    caption: frame.done ? brand.done : brand.caption,
  };
}
