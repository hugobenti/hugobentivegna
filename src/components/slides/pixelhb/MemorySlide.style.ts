import { cx } from "@/design-system/ui";

export const memorySlide = {
  /** Copy on the left, the two panels on the right from lg up. */
  content:
    "mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-center lg:gap-16",
  kicker: "font-mono text-label text-subtle uppercase",
  title: "mt-6 font-display text-h2 font-extrabold text-balance text-fg",
  body: "mt-6 max-w-xl text-body text-muted",
  control: "mt-6 h-8 px-4 text-label",

  panels: "flex flex-col gap-3",
  panel: "flex flex-col gap-3 rounded-lg border border-line bg-surface p-4",
  label: "font-mono text-label text-subtle uppercase",

  store: "flex items-center gap-5",
  /** The square's box is reserved at its largest size; the square only scales inside it. */
  squareBox: "size-24 shrink-0 rounded-sm border border-dashed border-line p-1",
  square: cx(
    "size-full origin-bottom-left scale-(--scale) bg-accent shadow-[0_0_0_3px_var(--hb-color-glow)]",
    "motion-safe:transition-[scale] motion-safe:duration-500",
  ),
  /** Room for the widest size and its pixel count, so the readout never reflows. */
  readout: cx(
    "min-h-16 opacity-0 data-[on=true]:opacity-100",
    "motion-safe:transition-opacity motion-safe:duration-(--hb-duration-base)",
  ),
  size: "font-mono text-h4 text-fg",
  pixels: "mt-1 font-mono text-small text-muted",

  bars: "flex flex-col gap-3",
  barLabel: "mb-1.5 flex items-baseline justify-between gap-4 text-small text-fg",
  barValue: "font-mono text-label text-fg",
  track: "h-2.5 overflow-hidden rounded-pill bg-raised",
  /** The fill is always full width and scales from its left edge, so no layout moves. */
  fill: cx(
    "h-full origin-left scale-x-(--share)",
    "motion-safe:transition-[scale] motion-safe:duration-1200 motion-safe:ease-out",
  ),
  tone: { muted: "bg-muted", accent: "bg-accent" },

  historyTitle: "text-body font-bold text-fg",
  historyBody: "text-small text-muted",
  history: "flex flex-wrap gap-5",
  grid: "grid shrink-0 grid-cols-8 content-start gap-0.5",
  cell: cx(
    "size-4 rounded-sm bg-raised",
    "motion-safe:transition-colors motion-safe:duration-(--hb-duration-base)",
    "data-[painted=true]:bg-accent",
  ),
  /** Every entry's row is reserved from the start; it only fades in. */
  entries: "flex min-w-40 flex-1 flex-col gap-1",
  entry: cx(
    "flex h-5 items-center rounded-sm border border-line px-2 font-mono text-label text-muted opacity-0",
    "motion-safe:transition-opacity motion-safe:duration-(--hb-duration-base)",
    "data-[on=true]:opacity-100",
  ),
  footer: "text-small text-muted",
  /** The canvas sizes for screen readers; the readout above steps through them visually. */
  sizes: "sr-only",
};
