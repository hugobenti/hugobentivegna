import type { TPixelKey } from "./pixelGrid.type";

/**
 * The heart's two blues as both utilities, so the fill a pixel is drawn with and the background
 * of the loupe ring that shows it come from one place (classes stay literal for Tailwind).
 */
export const pixelBlue = {
  r: { fill: "fill-accent", bg: "bg-accent" },
  b: { fill: "fill-(--hb-palette-blue-700)", bg: "bg-(--hb-palette-blue-700)" },
};

/** Brand keys are fixed pencil colors; `i`/`d` follow the text color, `h` is the brand amber. */
export const pixelFill: Record<TPixelKey, string> = {
  y: "fill-(--hb-palette-pixelhb-amber-light)",
  Y: "fill-(--hb-palette-pixelhb-amber)",
  o: "fill-(--hb-palette-pixelhb-amber-shade)",
  w: "fill-(--hb-palette-pixelhb-wood)",
  W: "fill-(--hb-palette-pixelhb-wood-shade)",
  G: "fill-(--hb-palette-pixelhb-graphite)",
  q: "fill-(--hb-palette-pixelhb-graphite-shine)",
  s: "fill-(--hb-palette-pixelhb-stamp)",
  m: "fill-(--hb-palette-pixelhb-ferrule)",
  M: "fill-(--hb-palette-pixelhb-ferrule-ridge)",
  e: "fill-(--hb-palette-pixelhb-eraser)",
  f: "fill-(--hb-palette-pixelhb-eraser-shine)",
  E: "fill-(--hb-palette-pixelhb-eraser-shade)",
  d: "fill-fg",
  i: "fill-fg",
  k: "fill-fg",
  h: "fill-(--hb-palette-pixelhb-amber)",
  r: pixelBlue.r.fill,
  b: pixelBlue.b.fill,
};

/** Whole-number scales only: the spacing unit is 4 px, so each size is a whole multiple of its grid. */
export const pixelArtSize = {
  lockup: "h-3.5 w-37 sm:h-7 sm:w-74",
  /** The cover's 16 × 16 drawing: 8 px a pixel, 12 px from 640 px up. */
  drawing: "h-32 w-32 sm:h-48 sm:w-48",
  heart1x: "h-3 w-3",
  heart2x: "h-6 w-6",
  heart4x: "h-12 w-12",
  /** The grid demo: 6 px a pixel, so its 1 px lines leave the pixels readable. */
  heart6x: "h-18 w-18",
  loupe: "h-15 w-15",
};

export const pixelArt = {
  base: "block shrink-0",
  /** A cell with a state is hidden until it is "on"; opacity only, so the box never moves. */
  cell: "data-[state=off]:opacity-0 data-[state=on]:opacity-100 motion-safe:transition-opacity",
};
