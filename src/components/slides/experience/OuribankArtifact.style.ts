import { artifact } from "./artifact.style";
import { cx } from "@/design-system/ui";

/** Pieces start scattered (--x, --y, --r) and snap into place when the window is active. */
const snap = cx(
  "translate-x-(--x) translate-y-(--y) rotate-(--r) opacity-40",
  "group-data-[active=true]:translate-x-0 group-data-[active=true]:translate-y-0 group-data-[active=true]:rotate-0 group-data-[active=true]:opacity-100",
  artifact.appear,
  "duration-(--hb-duration-slide) ease-emphasized",
);

/** A bigger kit Button look-alike once the window steps up (see artifact.style). */
const buttonTall =
  "lg:[@media(min-height:50rem)]:px-5 lg:[@media(min-height:50rem)]:py-2 lg:[@media(min-height:50rem)]:text-small";

export const ouribankArtifact = {
  layer: "flex flex-col gap-2 lg:[@media(min-height:50rem)]:gap-3",
  row: "flex flex-wrap items-center gap-2 lg:[@media(min-height:50rem)]:gap-3",
  swatch: cx(
    "size-8 rounded-md ring-1 ring-line",
    "lg:size-[clamp(--spacing(8),calc(--spacing(8)+var(--artifact-grow)*0.04),--spacing(14))]",
    snap,
  ),
  swatchTone: {
    accent: "bg-accent",
    fg: "bg-fg",
    muted: "bg-muted",
    raised: "bg-raised",
    line: "bg-line",
  },
  /** Look-alikes of the kit's Button and Tag, drawn from the same component tokens. */
  piece: {
    primary: cx(
      "rounded-(--hb-button-radius) bg-(color:--hb-button-primary-bg) px-4 py-1.5 text-label font-medium text-(color:--hb-button-primary-fg)",
      buttonTall,
      snap,
    ),
    secondary: cx(
      "rounded-(--hb-button-radius) border border-(color:--hb-button-secondary-border) bg-(color:--hb-button-secondary-bg) px-4 py-1.5 text-label font-medium text-fg",
      buttonTall,
      snap,
    ),
    tag: cx(
      "rounded-pill border border-line px-3 py-1 font-mono text-label text-muted",
      "lg:[@media(min-height:50rem)]:px-4 lg:[@media(min-height:50rem)]:py-1.5",
      snap,
    ),
  },
  cards: "grid grid-cols-3 gap-2 lg:[@media(min-height:50rem)]:gap-3",
  card: cx(
    "flex flex-col gap-1.5 rounded-md border border-line bg-raised p-2.5",
    "lg:[@media(min-height:50rem)]:gap-2 lg:[@media(min-height:50rem)]:p-3",
    snap,
  ),
  /** The pattern's preview, shown from lg; it takes most of the window's growth. */
  cardMedia: cx(
    "hidden rounded-sm bg-line/60 lg:mb-1 lg:block",
    "lg:h-[clamp(--spacing(8),calc(--spacing(8)+var(--artifact-grow)*0.3),--spacing(40))]",
  ),
  cardTitle: "h-1.5 w-2/3 rounded-pill bg-fg/70 lg:[@media(min-height:50rem)]:h-2",
  cardLine: "h-1 w-full rounded-pill bg-muted/40 lg:[@media(min-height:50rem)]:h-1.5",
};
