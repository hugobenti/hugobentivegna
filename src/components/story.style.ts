/** Layout and sample-content styles used only by the stories under src/components. Components never import this file. */
export const story = {
  /** A centred column with room around it, for copy that fills its parent. */
  column: "mx-auto max-w-xl p-8",
  /** Keeps a sample at a phone's width. */
  narrow: "max-w-xs",
  /** Vertical stack of examples. */
  stack: "flex flex-col gap-8",
  /** Row of examples, each with a caption. */
  row: "flex flex-wrap items-end gap-8",
  /** One example and its caption. */
  item: "flex flex-col items-start gap-3",
  caption: "font-mono text-label text-subtle uppercase",
  /**
   * A stage for the fixed site header. The transform makes the stage the header's containing
   * block, so `fixed` pins it to the stage instead of the page; the variable is the one deck.css
   * sets on `.deck`.
   */
  headerStage:
    "relative h-24 transform-gpu overflow-hidden rounded-lg border border-line [--hb-site-header:3.5rem]",
  /** A stage for a slide: positioned, so the slide's absolute glow stays inside it. */
  slideStage: "relative isolate overflow-hidden rounded-lg border border-line p-8 sm:p-12",
  /** The share card is 1200 × 630; the viewport shows it at half size. */
  ogViewport: "h-[315px] w-[600px] overflow-hidden rounded-lg border border-line",
  ogScaled: "h-[630px] w-[1200px] origin-top-left scale-50",
  /** Shows an artifact window even below `md`, where it is hidden on the site. */
  frameShown: "block! max-w-md",
  /** A line of sample text inside an artifact window. */
  artifactRow: "text-small text-muted",
  /** A bar standing for content inside an artifact window. */
  artifactBar: "h-2 w-2/3 rounded-pill bg-line",
} as const;
