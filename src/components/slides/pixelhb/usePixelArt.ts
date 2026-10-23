import { useMemo } from "react";
import { cx } from "@/design-system/ui";
import { pixelArt, pixelFill } from "./PixelArt.style";
import type { IPixelRect } from "./PixelArt.type";
import { gridCells, gridRuns, gridSize } from "./pixelGrid";
import type { TCellState, TPixelGrid } from "./pixelGrid.type";

/** The svg view model: its viewBox and the rects that draw the grid (runs, or cells when asked). */
export function usePixelArt(grid: TPixelGrid, cells = false, cellState?: readonly TCellState[]) {
  return useMemo(() => {
    const { width, height } = gridSize(grid);
    const rects: IPixelRect[] = cells
      ? gridCells(grid).map((cell) => ({
          ...cell,
          id: `${cell.x}-${cell.y}`,
          width: 1,
          state: cellState?.[cell.index],
          className: cellState ? cx(pixelFill[cell.key], pixelArt.cell) : pixelFill[cell.key],
        }))
      : gridRuns(grid).map((run) => ({
          ...run,
          id: `${run.x}-${run.y}`,
          className: pixelFill[run.key],
        }));
    return { viewBox: `0 0 ${width} ${height}`, rects };
  }, [grid, cells, cellState]);
}
