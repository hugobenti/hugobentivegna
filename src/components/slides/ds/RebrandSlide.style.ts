export const rebrandSlide = {
  /**
   * Paints its own background so the theme switch re-skins the whole slide. The transition name
   * lets rebrand.css animate just this slide when the theme changes.
   */
  slide: "overflow-hidden bg-bg [view-transition-name:hb-rebrand]",
  glow: "pointer-events-none absolute -top-1/4 -right-1/4 size-[60vmax] rounded-pill bg-[radial-gradient(circle,var(--hb-color-glow),transparent_60%)] blur-3xl",
  content:
    "relative mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-center md:gap-16",
  kicker: "font-mono text-label text-subtle uppercase",
  title: "mt-6 font-display text-h1 font-extrabold text-balance text-fg",
  body: "mt-6 max-w-xl text-body text-muted",
  switch: "mt-8",
  note: "mt-4 text-small text-subtle",
  figure: "flex flex-col gap-3",
  caption: "text-small text-subtle",
  mock: "flex flex-col gap-5 p-6 shadow-card",
  mockHeader: "flex items-center justify-between gap-4",
  brand: "font-display text-h3 font-extrabold text-accent",
  mockTitle: "font-display text-h3 font-bold text-fg",
  mockBody: "-mt-2 text-body text-muted",
  /** A decorative progress bar: the accent on a raised track. */
  track: "h-2 overflow-hidden rounded-pill bg-raised",
  fill: "h-full w-2/3 rounded-pill bg-accent",
  tags: "flex flex-wrap gap-2",
  actions: "flex flex-wrap gap-3",
};
