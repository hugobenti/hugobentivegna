import type { TPixelFieldPlacement } from "./PixelField.type";

/** Decoration held back at 40%: it never takes a click and never moves. */
export const pixelField = {
  base: "pointer-events-none absolute opacity-40",
  /** Each placement stays clear of the fixed header (`--hb-site-header`). */
  placement: {
    "top-right": "top-(--hb-site-header) right-0",
    /** The top-right corner, mirrored on both axes. */
    "bottom-left": "bottom-0 left-0 -scale-100",
    "centre-right": "top-1/2 right-0 -translate-y-1/2",
  } satisfies Record<TPixelFieldPlacement, string>,
};
