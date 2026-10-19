export const gapsSlide = {
  /** Copy on the left, the gap check on the right from lg up (md is too narrow for both). */
  content:
    "mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-center lg:gap-16",
  kicker: "font-mono text-label text-subtle uppercase",
  title: "mt-6 font-display text-h2 font-extrabold text-balance text-fg",
  body: "mt-6 max-w-xl text-body text-muted",

  panel: "flex flex-col gap-4 rounded-lg border border-line bg-surface p-5",
  header: "flex items-start justify-between gap-4",
  feature: "font-mono text-label text-subtle uppercase",
  illustration: "font-mono text-label text-subtle uppercase",
  sources: "flex flex-wrap gap-2",
  /** A source the agent reads; it lights up when read and stays lit. */
  source: [
    "flex items-center gap-1.5 rounded-pill border border-line px-3 py-1.5 text-small text-muted",
    "transition-[border-color,color,box-shadow] duration-(--hb-duration-slow)",
    "data-[on=true]:border-accent data-[on=true]:text-fg data-[on=true]:shadow-[0_0_0_4px_var(--hb-color-glow)]",
  ].join(" "),
  sourceBadge: "font-mono text-label text-accent",

  checks: "flex flex-col gap-2",
  /**
   * One expectation. Idle checks are dimmed with the `muted` text color (AA on every theme,
   * unlike a faded card); a landed result colors the outline. The height never changes: the
   * badge and the reason only fade in.
   */
  check: [
    "group/check rounded-md border border-line bg-bg px-4 py-3",
    "transition-[border-color] duration-(--hb-duration-slow)",
    "data-[state=ready]:border-success data-[state=gap]:border-warning",
  ].join(" "),
  /** The badge wraps under the expectation on narrow screens; it always takes its space. */
  checkTop: "flex flex-wrap items-center justify-between gap-x-3 gap-y-1",
  expectation: [
    "text-small font-medium text-fg transition-colors duration-(--hb-duration-slow)",
    "group-data-[state=idle]/check:text-muted",
  ].join(" "),
  /** Text badge naming the result, so the status never relies on color alone. */
  badge: [
    "shrink-0 rounded-pill border border-line px-2.5 py-0.5 font-mono text-label whitespace-nowrap",
    "opacity-0 transition-opacity duration-(--hb-duration-base)",
    "group-data-[state=ready]/check:border-success group-data-[state=ready]/check:text-success group-data-[state=ready]/check:opacity-100",
    "group-data-[state=gap]/check:border-warning group-data-[state=gap]/check:text-warning group-data-[state=gap]/check:opacity-100",
  ].join(" "),
  /** The reason's line is always reserved; it unrolls inside it, so nothing around it moves. */
  reason: [
    "mt-1 block text-small text-muted",
    "[clip-path:inset(0_0_100%_0)] opacity-0 transition-[clip-path,opacity] duration-(--hb-duration-slow)",
    "group-data-[state=ready]/check:[clip-path:inset(0)] group-data-[state=ready]/check:opacity-100",
    "group-data-[state=gap]/check:[clip-path:inset(0)] group-data-[state=gap]/check:opacity-100",
  ].join(" "),

  footer: "flex min-h-8 items-center justify-between gap-4",
  /** Two lines reserved: the closing line wraps on phones, and the panel must not grow. */
  caption: "min-h-[2lh] text-small text-muted",
  control: "h-8 shrink-0 px-4 text-label",
  /** The outcome for screen readers; the caption above is visual only. */
  summary: "sr-only",
};
