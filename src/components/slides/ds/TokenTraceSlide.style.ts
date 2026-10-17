export const tokenTraceSlide = {
  /** Copy and picker on the left, the chain on the right from md up. */
  content:
    "mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] md:items-center md:gap-16",
  kicker: "font-mono text-label text-subtle uppercase",
  title: "mt-6 font-display text-h1 font-extrabold text-balance text-fg",
  body: "mt-6 max-w-xl text-body text-muted",
  picker: "mt-8",
  chain: "flex flex-col gap-8",
  /** One layer of the chain; an arrow in the gap below points to the next layer. */
  step: [
    "relative flex items-center gap-4 rounded-md border border-line bg-surface p-4",
    "not-last:after:absolute not-last:after:top-full not-last:after:left-9 not-last:after:mt-1",
    "not-last:after:text-small not-last:after:text-subtle not-last:after:content-['↓']",
  ].join(" "),
  /** `subtle` outline (3:1 on the surface) so near-black values still read as a swatch. */
  swatch: "size-10 shrink-0 rounded-sm border border-subtle",
  stepText: "flex min-w-0 flex-col gap-1",
  layer: "font-mono text-label text-subtle uppercase",
  name: "font-mono text-small font-medium text-fg",
  meta: "flex flex-wrap gap-x-3 font-mono text-label text-muted",
  inUse:
    "mt-8 flex items-center justify-between gap-4 rounded-md border border-dashed border-line p-4",
  inUseLabel: "font-mono text-label text-subtle uppercase",
};
