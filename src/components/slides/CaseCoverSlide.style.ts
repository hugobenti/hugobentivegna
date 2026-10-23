export const caseCoverSlide = {
  slide: "overflow-hidden",
  /**
   * The glow token, drawn inside the slide's own box: the gradient fades out before any edge,
   * so it never shows a hard line where two slides meet.
   */
  glow: "pointer-events-none absolute inset-0 bg-[radial-gradient(40%_45%_at_75%_45%,var(--hb-color-glow),transparent)]",
  content: "relative mx-auto w-full max-w-6xl",
  kicker: "font-mono text-label text-subtle uppercase",
  title: "mt-6 max-w-4xl font-display text-h1 font-extrabold text-balance text-fg",
  body: "mt-6 max-w-2xl text-body text-muted",
  meta: "mt-12 grid gap-6 sm:grid-cols-3 sm:gap-10",
  metaLabel: "font-mono text-label text-subtle uppercase",
  metaValue: "mt-2 text-body text-fg",
  chapters: "mt-12 flex flex-wrap gap-3",
  chapter: "rounded-pill border border-line px-4 py-2 font-mono text-small text-muted",
  chapterNumber: "mr-2 text-accent",
};
