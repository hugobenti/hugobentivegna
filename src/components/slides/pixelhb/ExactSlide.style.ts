import { cx } from "@/design-system/ui";
import { pixelAccent } from "./PixelArt.style";

export const exactSlide = {
  /** Copy, links and the editor screenshot on the left, the four tool cards on the right from lg up. */
  content:
    "mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-center lg:gap-10",
  links: "mt-6 flex flex-wrap gap-3",
  /**
   * The real editor under the links; its caption answers the cards' "Illustration" labels. On
   * desktops under 800 px tall it shrinks to 12rem, so the slide still fits the screen (1280 × 720);
   * under 720 px tall (short laptops, e.g. 1366 × 768 less the browser chrome) it is hidden.
   */
  shot: cx(
    "mt-8 flex max-w-md flex-col gap-2",
    "lg:[@media(max-height:719px)]:hidden lg:[@media(max-height:799px)]:max-w-48",
  ),
  shotImage: "h-auto w-full rounded-md border border-line shadow-card",
  shotCaption: "font-mono text-label text-subtle uppercase",

  /** The four-tool grid and, under it, the playback control. */
  panel: "flex flex-col gap-3",
  cards: "grid gap-3 sm:grid-cols-2",
  /** The lit card takes the highlight tint; the colors fade, nothing resizes. */
  card: cx(
    "group flex flex-col gap-2 rounded-lg border border-line bg-surface p-4",
    "motion-safe:transition-colors motion-safe:duration-(--hb-duration-slow)",
    "data-[state=current]:bg-highlight data-[state=current]:text-fg",
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

  /** The demo's box is reserved from the start, with its first frame drawn in it. */
  demo: "relative mt-auto flex h-20 items-center rounded-sm border border-line bg-bg px-4",
  label: "absolute top-1 right-2 font-mono text-label text-subtle uppercase",
  art: "flex items-end gap-3",
  /** A piece of a demo that fades in on its card's turn; the first frame around it never moves. */
  piece: cx(
    "opacity-0 data-[on=true]:opacity-100",
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
  ringFill: { r: pixelAccent.r.bg, b: pixelAccent.b.bg },
  lens: "absolute inset-1 overflow-hidden rounded-pill bg-bg",
};
