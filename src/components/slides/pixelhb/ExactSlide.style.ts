import { cx } from "@/design-system/ui";
import { pixelBlue } from "./PixelArt.style";

export const exactSlide = {
  /** Copy, links and control on the left, the four tool cards on the right from lg up. */
  content:
    "mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-center lg:gap-10",
  links: "mt-6 flex flex-wrap gap-3",
  control: "mt-6",

  cards: "grid gap-3 sm:grid-cols-2",
  /** The lit card takes the accent border and glow; the colors fade, nothing resizes. */
  card: cx(
    "group flex flex-col gap-2 rounded-lg border border-line bg-surface p-4",
    "motion-safe:transition-[border-color,box-shadow] motion-safe:duration-(--hb-duration-slow)",
    "data-[state=current]:border-accent data-[state=current]:shadow-[0_0_0_4px_var(--hb-color-glow)]",
  ),
  name: cx(
    "text-body font-bold text-subtle",
    "group-data-[state=current]:text-fg group-data-[state=done]:text-fg",
    "motion-safe:transition-colors motion-safe:duration-(--hb-duration-slow)",
  ),
  toolBody: cx(
    "text-small text-subtle",
    "group-data-[state=current]:text-fg group-data-[state=done]:text-muted",
    "motion-safe:transition-colors motion-safe:duration-(--hb-duration-slow)",
  ),

  /** The demo's box is reserved from the start; only its drawing fades in. */
  demo: "relative mt-auto flex h-20 items-center rounded-sm border border-line bg-bg px-4",
  label: "absolute top-1 right-2 font-mono text-label text-subtle uppercase",
  art: cx(
    "flex items-end gap-3 opacity-0 data-[on=true]:opacity-100",
    "motion-safe:transition-opacity motion-safe:duration-(--hb-duration-slow)",
  ),

  /**
   * The heart at 6× under a pixel grid over its whole 12 × 12 canvas, like the editor's grid
   * toggle: a line every 6 px meets every cell edge, and the inset shadow closes the last edges.
   */
  gridBox: "relative",
  grid: cx(
    "absolute inset-0 shadow-[inset_-1px_-1px_0_var(--hb-color-line)]",
    "bg-[linear-gradient(to_right,var(--hb-color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--hb-color-line)_1px,transparent_1px)]",
    "bg-[size:6px_6px]",
  ),

  /** A round frame, 68 px: its 4 px ring around a 60 px lens that shows the 5 × 5 patch at 12 px a cell. */
  ring: "relative size-17 shrink-0 overflow-hidden rounded-pill",
  half: "absolute inset-x-0 h-1/2",
  halfTop: "top-0",
  halfBottom: "bottom-0",
  ringFill: { r: pixelBlue.r.bg, b: pixelBlue.b.bg },
  lens: "absolute inset-1 overflow-hidden rounded-pill bg-bg",
};
