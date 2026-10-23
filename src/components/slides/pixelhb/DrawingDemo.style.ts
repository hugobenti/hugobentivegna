export const drawingDemo = {
  /** A canvas frame like the editor's: a border, padding, and the drawing on top of the checks. */
  frame: "rounded-lg border border-line bg-surface p-4 sm:p-6",
  /**
   * The transparency checkerboard editors draw under empty pixels. Each tile is a quarter of the
   * drawing and holds 2 × 2 checks, so one check covers exactly 2 × 2 drawing pixels.
   */
  canvas:
    "bg-[conic-gradient(var(--hb-color-raised)_25%,var(--hb-color-bg)_0_50%,var(--hb-color-raised)_0_75%,var(--hb-color-bg)_0)] bg-[size:25%_25%]",
};
