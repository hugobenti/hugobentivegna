export const decisionSlide = {
  /** Copy on the left, the button build on the right from md up. */
  content:
    "mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] md:items-center md:gap-16",
  kicker: "font-mono text-label text-subtle uppercase",
  title: "mt-6 font-display text-h2 font-extrabold text-balance text-fg",
  body: "mt-6 max-w-xl text-body text-muted",

  demo: "flex flex-col gap-8 rounded-lg border border-line bg-surface p-6",
  groups: "flex flex-col gap-5",
  groupLabel: "mb-2 font-mono text-label text-subtle uppercase",
  tokens: "flex flex-wrap gap-2",
  /** A token chip; it lights up while its step lands and stays lit once applied. */
  token: [
    "flex items-center gap-2 rounded-md border border-line bg-raised px-3 py-2 font-mono text-label text-muted",
    "transition-[border-color,color,box-shadow] duration-(--hb-duration-slow)",
    "data-[state=applied]:border-subtle data-[state=applied]:text-fg",
    "data-[state=current]:border-accent data-[state=current]:text-fg data-[state=current]:shadow-[0_0_0_4px_var(--hb-color-glow)]",
  ].join(" "),
  swatch: "size-4 shrink-0 rounded-sm border border-subtle",
  tokenName: "text-fg",
  tokenValue: "text-subtle",

  stage: "flex flex-col items-center gap-4 border-t border-line pt-8",
  /**
   * The button being built. It starts as a dashed outline; each step adds what its tokens
   * style, through the same component tokens the kit Button reads.
   */
  preview: [
    "inline-grid h-10 min-w-44 place-items-center rounded-sm border border-dashed border-line px-5 font-mono text-small font-normal text-transparent",
    "transition-[border-radius,background-color,border-color,color,font-weight] duration-(--hb-duration-slow) ease-out",
    "data-[shape=true]:rounded-(--hb-button-radius) data-[shape=true]:border-subtle",
    "data-[fill=true]:border-transparent data-[fill=true]:bg-(color:--hb-button-primary-bg)",
    "data-[label=true]:text-(color:--hb-button-primary-fg)",
    "data-[type=true]:font-sans data-[type=true]:font-medium",
  ].join(" "),
  progress: "flex gap-2",
  progressStep:
    "h-1 w-7 rounded-pill bg-raised transition-colors duration-(--hb-duration-base) data-[on=true]:bg-accent",
  caption: "min-h-10 text-center font-mono text-label text-muted",
};
