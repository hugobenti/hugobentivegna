import { beside } from "./pixelGrid";
import type { TPixelGrid } from "./pixelGrid.type";

/** Brand grids, copied from the PixelHB brand spec (docs/design/brand.md). One character = one pixel. */

/** The pencil, 33 × 7. */
export const PENCIL: TPixelGrid = [
  ".eeeemMmyyyyyyyyyyyyyyyyww.......",
  "efffemMmyyyysysyssyyyyyywwww.....",
  "eeeeemMmYYYYsYsYsYsYYYYYwwwwwq...",
  "eeeeemMmYYYYsssYssYYYYYYwwwwwGG.d",
  "eeeeemMmYYYYsYsYsYsYYYYYWWWWWG...",
  "EEEEEMMMoooososossooooooWWWW.....",
  ".EEEEMMMooooooooooooooooWW.......",
];

/** "PixelHB", 37 × 7: "Pixel" in ink (`i`), "HB" in the HB color (`h`). */
export const WORDMARK: TPixelGrid = [
  "iiii...i..............ii..h...h.hhhh.",
  "i...i..................i..h...h.h...h",
  "i...i.ii..i...i..iii...i..h...h.h...h",
  "iiii...i...i.i..i...i..i..hhhhh.hhhh.",
  "i......i....i...iiiii..i..h...h.h...h",
  "i......i...i.i..i......i..h...h.h...h",
  "i.....iii.i...i..iiii.iii.h...h.hhhh.",
];

/** Horizontal lockup: pencil, a gap of 4 pixels, wordmark (74 × 7). */
export const LOCKUP: TPixelGrid = beside(PENCIL, WORDMARK, 4);

/** The illustration sprite for the tools chapter, 12 × 12: `k` outline, `r` fill, `l` highlight. */
export const HEART: TPixelGrid = [
  "............",
  ".kkk....kkk.",
  "krrrk..krrrk",
  "krlrrkkrrrrk",
  "krlrrrrrrrrk",
  "krrrrrrrrrrk",
  ".krrrrrrrrk.",
  "..krrrrrrk..",
  "...krrrrk...",
  "....krrk....",
  ".....kk.....",
  "............",
];

/**
 * The cover's drawing, 16 × 16: a retro computer in the brand palette. A beige case with a
 * ridge outline (`m`, `M`), a dark screen (`G`) with a line of blue text, a grey one and a blue cursor (`r`, `q`),
 * an amber power light (`Y`), and a keyboard with grey keys (`q`).
 */
export const COMPUTER: TPixelGrid = [
  "................",
  ".MMMMMMMMMMMMMM.",
  ".MmmmmmmmmmmmmM.",
  ".MmGGGGGGGGGGmM.",
  ".MmGrrrGGGGGGmM.",
  ".MmGGGGGGGGGGmM.",
  ".MmGqqqqqGGGGmM.",
  ".MmGGGGGGGGGGmM.",
  ".MmGrGGGGGGGGmM.",
  ".MmmmmmmmmmmmmM.",
  ".MmmmmmmmmYYmmM.",
  ".MMMMMMMMMMMMMM.",
  "......MMMM......",
  "..MmmmmmmmmmmM..",
  "..MmqmqmqmqmmM..",
  "..MMMMMMMMMMMM..",
];
