import type { IPixelCell, IPixelRun, TCellState, TPixelGrid, TPixelKey } from "./pixelGrid.type";

const EMPTY = ".";

export function gridSize(grid: TPixelGrid): { width: number; height: number } {
  const width = grid[0]?.length ?? 0;
  if (grid.some((row) => row.length !== width)) throw new Error("ragged grid");
  return { width, height: grid.length };
}

/** Every filled pixel, row by row. */
export function gridCells(grid: TPixelGrid): IPixelCell[] {
  const { width } = gridSize(grid);
  const cells: IPixelCell[] = [];
  grid.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === EMPTY) continue;
      cells.push({ x, y, key: row[x] as TPixelKey, index: y * width + x });
    }
  });
  return cells;
}

/** `total` cell states, all `off` except the cells at `onIndices`. */
export function cellStates(total: number, onIndices: Iterable<number>): TCellState[] {
  const states = Array.from({ length: total }, (): TCellState => "off");
  for (const index of onIndices) states[index] = "on";
  return states;
}

/** Horizontal runs of one key: the fewest rects that draw the grid. */
export function gridRuns(grid: TPixelGrid): IPixelRun[] {
  gridSize(grid);
  const runs: IPixelRun[] = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === key) end++;
      if (key !== EMPTY) runs.push({ x, y, width: end - x, key: key as TPixelKey });
      x = end;
    }
  });
  return runs;
}

/** Two grids side by side, top-aligned, `gap` empty columns apart; the shorter one is padded. */
export function beside(left: TPixelGrid, right: TPixelGrid, gap: number): TPixelGrid {
  const leftWidth = gridSize(left).width;
  const rightWidth = gridSize(right).width;
  const height = Math.max(left.length, right.length);
  return Array.from({ length: height }, (_, y) => {
    const l = left[y] ?? EMPTY.repeat(leftWidth);
    const r = right[y] ?? EMPTY.repeat(rightWidth);
    return l + EMPTY.repeat(gap) + r;
  });
}
