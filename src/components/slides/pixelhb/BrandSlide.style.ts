import { cx } from "@/design-system/ui";

export const brandSlide = {
  /** Copy on the left, the drawing on the right from lg up. */
  content:
    "mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-center lg:gap-16",
  kicker: "font-mono text-label text-subtle uppercase",
  title: "mt-6 font-display text-h2 font-extrabold text-balance text-fg",
  body: "mt-6 max-w-xl text-body text-muted",
  rules: "mt-6 flex flex-col gap-2",
  rule: "flex items-center gap-3 text-small text-fg before:size-1.5 before:shrink-0 before:bg-accent before:content-['']",

  panel: "flex flex-col gap-6 rounded-lg border border-line bg-surface p-5",
  /** Two lines reserved: the closing line wraps on phones, and the panel must not grow. */
  caption: "min-h-[2lh] font-mono text-label text-subtle",
  stage: "flex justify-center overflow-hidden",
  /** The 33 × 7 pencil at 8×: one cell is 8 px, so the faint grid lines meet the pixel edges. */
  grid: cx(
    "h-14 w-66 shrink-0",
    "bg-[linear-gradient(to_right,var(--hb-color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--hb-color-line)_1px,transparent_1px)]",
    "bg-[size:8px_8px]",
  ),
  assets: "flex flex-wrap items-end justify-between gap-x-4 gap-y-4 border-t border-line pt-5",
  /** Each asset's space is reserved from the start; it only fades in. */
  asset: cx(
    "flex flex-col items-start gap-3 opacity-0",
    "motion-safe:transition-opacity motion-safe:duration-(--hb-duration-slow)",
    "data-[on=true]:opacity-100",
  ),
  assetLabel: "font-mono text-label text-muted",
  /** The outcome for screen readers; the caption above is visual only. */
  summary: "sr-only",
};
