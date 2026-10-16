/** Layout and sample-content styles used only by stories. Components never import this file. */
export const story = {
  /** Horizontal row of examples. */
  row: "flex flex-wrap items-center gap-4",
  /** Row of small items such as tags. */
  list: "flex flex-wrap gap-2",
  /** Keeps a sample card at a readable width. */
  narrow: "max-w-sm",
  /** Space above a component whose hint pops up over it. */
  hintRoom: "pt-12",
  eyebrow: "text-label text-subtle uppercase",
  title: "mt-2 font-display text-h3 font-bold",
  body: "mt-3 text-small text-muted",
  footer: "mt-4 flex gap-2",
} as const;
