import type { TPixelGrid } from "../slides/pixelhb/pixelGrid.type";

/**
 * The amber pixel spill, 28 × 22, drawn by hand in the one PixelHB amber (`Y`). It is densest in
 * the top-right corner (about 40% of the cells there) and thins out towards the left and bottom
 * edges; the left half stays empty, so the piece never reaches the middle of the screen.
 */
export const FIELD: TPixelGrid = [
  "..............YY...YY.Y.YYYY",
  "...............Y..Y.YYY.YYYY",
  "................YY..Y.YYYYYY",
  "...............YY..YYY..YY.Y",
  "..............Y.YY.YY.YYY.YY",
  "...............Y.Y...Y.YY.YY",
  "................Y..Y.YYY.Y..",
  "................Y...YY..Y.Y.",
  "...............Y..Y.....Y.YY",
  "......................Y..Y..",
  "................Y...Y..Y..YY",
  "..................Y......YY.",
  ".......................Y...Y",
  "....................Y.......",
  "............................",
  "..........................Y.",
  "............................",
  "...........................Y",
  "............................",
  "............................",
  "............................",
  "............................",
];
