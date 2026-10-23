/** Layout and sample-content styles used only by stories. Components never import this file. */
export const story = {
  /** Horizontal row of examples. */
  row: "flex flex-wrap items-center gap-4",
  /** Row of small items such as tags. */
  list: "flex flex-wrap gap-2",
  /** Vertical stack of larger blocks. */
  stack: "flex flex-col gap-16",
  /** Keeps a sample card at a readable width. */
  narrow: "max-w-sm",
  /** A centred column with room around it, for copy that fills its parent. */
  column: "mx-auto max-w-xl p-8",
  /** Space above a component whose hint pops up over it. */
  hintRoom: "pt-12",
  eyebrow: "text-label text-subtle uppercase",
  title: "mt-2 font-display text-h3 font-bold",
  body: "mt-3 text-small text-muted",
  footer: "mt-4 flex gap-2",
} as const;
