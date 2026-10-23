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

/** The pencil seen from its tip, 16 × 16: favicon, app icons. */
export const SQUARE_ICON: TPixelGrid = [
  "................",
  ".....yyyyYY.....",
  "....yyyyyYYY....",
  "...yyywwwwYYY...",
  "..yyywwwwwwYYY..",
  ".yyywwwwwwwwYYY.",
  ".YYwwwqqGGwwwYY.",
  ".YYwwwqGGGwwwYY.",
  ".YYwwwGGGGWWWYY.",
  ".YYwwwGGGGWWWYY.",
  ".ooowwwWWWWWooo.",
  "..ooowwWWWWooo..",
  "...ooowWWWooo...",
  "....oooooooo....",
  ".....oooooo.....",
  "................",
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
