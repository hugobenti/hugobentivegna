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
  /** Vertical list of cards at a readable width. */
  cards: "flex max-w-sm flex-col gap-4",
  /** Labelled blocks of a state matrix: a caption above a row of examples. */
  matrix: "flex flex-col gap-8",
  caption: "mb-3 text-label text-subtle uppercase",
  /** A phone-width frame (375 px) that loads another story, so its `md:` breakpoint is not reached. */
  phone: "h-[32rem] w-[375px] max-w-full rounded-md border border-line",
  phoneShort: "h-32 w-[375px] max-w-full rounded-md border border-line",
  /** Space above a component whose hint pops up over it. */
  hintRoom: "pt-12",
  eyebrow: "text-label text-subtle uppercase",
  title: "mt-2 font-display text-h3 font-bold",
  body: "mt-3 text-small text-muted",
  footer: "mt-4 flex gap-2",
} as const;
