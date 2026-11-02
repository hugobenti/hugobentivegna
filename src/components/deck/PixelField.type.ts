/** Where the spill sits: a corner, the opposite corner mirrored, or halfway down the right edge. */
export type TPixelFieldPlacement = "top-right" | "bottom-left" | "centre-right";

export type TPixelFieldProps = {
  placement: TPixelFieldPlacement;
  className?: string;
};
