/** Layout and specimen styles of the Foundations pages. Colors and sizes of the tokens themselves are set inline from the token's CSS variable, never here. */
export const foundation = {
  page: "flex flex-col gap-12",
  section: "flex flex-col gap-4",
  heading: "font-display text-h3 font-bold text-fg",
  note: "max-w-2xl text-small text-muted",
  grid: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
  card: "flex flex-col gap-3 rounded-lg border border-line bg-surface p-4",
  swatch: "h-16 rounded-md border border-line",
  name: "font-mono text-small text-fg",
  value: "font-mono text-label text-muted",
  description: "text-small text-muted",
  table: "w-full border-collapse text-left text-small",
  caption: "mb-3 text-left text-label text-subtle uppercase",
  headCell: "border-b border-line py-2 pr-4 text-label font-medium text-subtle uppercase",
  cell: "border-b border-line py-3 pr-4 align-top text-muted",
  cellName: "border-b border-line py-3 pr-4 align-top font-mono font-medium text-fg",
  cellCode: "border-b border-line py-3 pr-4 align-top font-mono text-label text-muted",
  /** Pair preview: text sample or filled chip of the foreground on the background. */
  sample:
    "inline-flex min-w-16 items-center justify-center rounded-sm border border-line px-3 py-1",
  chip: "inline-block h-6 w-16 rounded-sm border border-line",
  pass: "border-b border-line py-3 pr-4 align-top font-mono font-medium text-success",
  fail: "border-b border-line py-3 pr-4 align-top font-mono font-medium text-danger",
  /** Typography. */
  typeRow: "grid gap-2 border-b border-line py-6 md:grid-cols-[14rem_1fr] md:gap-8",
  typeMeta: "flex flex-col gap-1",
  specimen: "text-fg",
  /** Spacing and radius. */
  scaleRow: "flex items-center gap-4",
  scaleLabel: "w-40 shrink-0 font-mono text-small text-fg",
  spaceBar: "h-6 shrink-0 rounded-sm bg-accent",
  radiusBox: "size-24 border border-line bg-raised",
  radiusGrid: "flex flex-wrap gap-8",
  radiusItem: "flex flex-col items-start gap-3",
  /** Shadows. */
  shadowStage: "flex flex-wrap gap-12 rounded-lg bg-bg p-8",
  shadowBox:
    "flex h-28 w-48 items-center justify-center rounded-lg bg-surface text-small text-muted",
  /** Motion. */
  motionRow: "grid items-center gap-2 md:grid-cols-[14rem_1fr] md:gap-8",
  track: "relative h-6 rounded-pill bg-raised",
  dot: "absolute top-1/2 left-0 size-4 -translate-y-1/2 rounded-pill bg-accent transition-[left] data-[moved=true]:left-[calc(100%-1rem)] motion-reduce:transition-none",
  row: "flex flex-wrap items-center gap-6",
} as const;
