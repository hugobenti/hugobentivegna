const progress =
  "transition-[background-color,transform,width] duration-(--hb-duration-slow) ease-out motion-reduce:transition-none";

export const timelineAxis = {
  /** Time-scaled axis; decorative (chapters carry the information), shown from md up. */
  base: "relative hidden h-16 md:block",
  tick: "absolute top-0 left-(--at) -translate-x-1/2 font-mono text-label text-subtle first:translate-x-0",
  track: "absolute inset-x-0 top-9 h-px bg-line",
  /** Accent line from the start of the axis to the end of the active entry. */
  fill: `absolute top-9 left-0 h-px w-(--fill) bg-accent ${progress}`,
  spans: "absolute inset-x-0 top-11",
  span: [
    "absolute h-1 left-(--from) w-[calc(var(--to)-var(--from))] rounded-pill",
    "data-[state=past]:bg-muted/40 data-[state=current]:bg-accent data-[state=future]:bg-line",
    progress,
  ].join(" "),
  dot: [
    "absolute top-9 left-(--at) size-3 -translate-1/2 rounded-pill ring-4 ring-bg",
    "data-[state=past]:bg-accent data-[state=current]:scale-125 data-[state=current]:bg-accent data-[state=future]:bg-line",
    progress,
  ].join(" "),
};

export const timelineChapter = {
  /** Side rule with a marker on small screens, where the axis is hidden. */
  base: [
    "relative border-l border-line pl-6 md:border-l-0 md:pl-0",
    "before:absolute before:top-1 before:-left-1.5 before:size-3 before:rounded-pill before:bg-accent md:before:hidden",
  ].join(" "),
  period: "font-mono text-label text-subtle uppercase",
  company: "mt-2 font-display text-h2 font-bold text-fg",
  chapter: "mt-2 text-h3 text-accent",
  roles: "mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-body text-fg",
  role: "flex items-center gap-2",
  roleArrow: "text-accent",
  summary: "mt-3 max-w-2xl text-body text-muted",
  stack: "mt-6 flex flex-wrap gap-2",
};
