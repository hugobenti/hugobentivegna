export const contactSlide = {
  slide: "overflow-clip",
  /** Same soft accent light as the hero, from the bottom-left this time. */
  glow: "pointer-events-none absolute -bottom-1/3 -left-1/4 size-[60vmax] rounded-pill bg-[radial-gradient(circle,var(--hb-color-glow),transparent_60%)] blur-3xl",
  /** One column below `lg`, so every row starts at the gutter; two columns from `lg`. */
  content:
    "relative mx-auto grid w-full max-w-6xl gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center",
  main: "min-w-0",
  title: "max-w-4xl font-display text-display font-extrabold text-fg",
  status: "mt-6 flex items-start gap-3 text-body text-fg",
  statusDot: "mt-2.5 size-2 shrink-0 rounded-pill bg-success",
  intro: "mt-4 max-w-xl text-body text-muted",
  primaryRow: "mt-8 flex flex-wrap items-center gap-x-6 gap-y-4",
  email: "text-h3",
  cvCard: "flex flex-col items-start gap-4",
  cvTitle: "font-display text-h3 font-bold text-fg",
  cvMeta: "-mt-2 text-small text-muted",
  footer:
    "relative mx-auto mt-10 flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-4 text-small text-subtle",
  footerLinks: "flex flex-wrap items-center gap-2",
};
