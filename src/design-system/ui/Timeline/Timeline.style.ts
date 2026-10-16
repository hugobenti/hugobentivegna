export const timeline = {
  /** Stacked on small screens, one column per entry from md up. */
  base: "grid gap-10 md:auto-cols-fr md:grid-flow-col md:gap-8",
  entry: [
    "relative border-l border-line pl-6 md:border-t md:border-l-0 md:pt-8 md:pl-0",
    // Marker dot on the line: left edge when stacked, top edge when in a row.
    "before:absolute before:top-1 before:-left-1.5 before:size-3 before:rounded-pill before:bg-accent",
    "md:before:-top-1.5 md:before:left-0",
  ].join(" "),
  period: "font-mono text-label text-subtle uppercase",
  company: "mt-2 font-display text-h3 font-bold text-fg",
  roles: "mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-fg",
  role: "flex items-center gap-2",
  roleArrow: "text-accent",
  summary: "mt-3 text-small text-muted",
};
