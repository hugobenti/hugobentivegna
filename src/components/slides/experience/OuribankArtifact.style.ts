import { artifact } from "./artifact.style";

/** Pieces start scattered (--x, --y, --r) and snap into place when the window is active. */
const snap = [
  "translate-x-(--x) translate-y-(--y) rotate-(--r) opacity-40",
  "group-data-[active=true]:translate-x-0 group-data-[active=true]:translate-y-0 group-data-[active=true]:rotate-0 group-data-[active=true]:opacity-100",
  artifact.appear,
  "duration-(--hb-duration-slide) ease-emphasized",
].join(" ");

export const ouribankArtifact = {
  layer: "flex flex-col gap-2",
  row: "flex flex-wrap items-center gap-2",
  swatch: `size-8 rounded-md ring-1 ring-line ${snap}`,
  swatchTone: {
    accent: "bg-accent",
    fg: "bg-fg",
    muted: "bg-muted",
    raised: "bg-raised",
    line: "bg-line",
  },
  /** Look-alikes of the kit's Button and Tag, drawn from the same component tokens. */
  piece: {
    primary: `rounded-(--hb-button-radius) bg-(color:--hb-button-primary-bg) px-4 py-1.5 text-label font-medium text-(color:--hb-button-primary-fg) ${snap}`,
    secondary: `rounded-(--hb-button-radius) border border-(color:--hb-button-secondary-border) bg-(color:--hb-button-secondary-bg) px-4 py-1.5 text-label font-medium text-fg ${snap}`,
    tag: `rounded-pill border border-line px-3 py-1 font-mono text-label text-muted ${snap}`,
  },
  cards: "grid grid-cols-3 gap-2",
  card: `flex flex-col gap-1.5 rounded-md border border-line bg-raised p-2.5 ${snap}`,
  cardTitle: "h-1.5 w-2/3 rounded-pill bg-fg/70",
  cardLine: "h-1 w-full rounded-pill bg-muted/40",
};
