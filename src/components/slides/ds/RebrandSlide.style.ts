/** A thin track whose fill grows with `--progress` (0–1). */
const track = "block h-1 overflow-hidden rounded-pill bg-raised";
const fill =
  "block h-full origin-left scale-x-(--progress) rounded-pill bg-accent transition-[scale] duration-100 ease-linear";

/** Header and acts share one centred column, inside the slide's side padding. */
const column = "mx-auto w-full max-w-6xl";

export const rebrandSlide = {
  /** Opaque, with a soft page-coloured edge below, so the acts disappear cleanly under it. */
  header: "bg-bg shadow-[0_1.5rem_1.5rem_var(--hb-color-bg)]",
  inner: column,
  kicker: "font-mono text-label text-subtle uppercase",
  title: "mt-4 font-display text-h2 font-extrabold text-balance text-fg",
  lead: "mt-4 max-w-2xl text-body text-muted",
  act: column,
  closing: "mt-6 max-w-2xl text-body text-fg",
  summary: "sr-only",
};

export const rebrandScene = {
  panel: "flex flex-col gap-5 rounded-lg border border-line bg-surface p-5 md:p-6",
  header: "flex flex-wrap items-end justify-between gap-4",
  actLabel: "font-mono text-label text-subtle uppercase",
  actTitle: "mt-1 font-display text-h3 font-bold text-fg",
  counters: "flex gap-6",
  counter: "flex flex-col",
  count: "font-display text-h3 font-extrabold text-fg tabular-nums",
  counterLabel: "font-mono text-label text-subtle",

  /** Act 2: the design system, one developer, and its release. */
  system:
    "group/system mx-auto flex w-full max-w-sm items-center gap-3 rounded-md border border-line bg-raised px-4 py-3 transition-[border-color] duration-(--hb-duration-base) data-[state=released]:border-accent",
  systemText: "flex min-w-0 flex-1 flex-col gap-2",
  systemName: "font-mono text-small text-fg",
  systemStatus:
    "font-mono text-label text-subtle transition-colors group-data-[state=released]/system:text-accent",
  /**
   * Connectors from the system down to each product; they light up as the release lands. Only
   * drawn where the products sit in one row under the system.
   */
  wires: "-mt-5 hidden h-5 grid-cols-6 gap-3 lg:grid",
  wire: "mx-auto block h-full w-0.5 origin-top scale-y-0 bg-accent transition-[scale] duration-(--hb-duration-base) data-[lit=true]:scale-y-100",

  /** Two per row on phones so names and amounts stay readable. */
  products: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
  /**
   * A made-up product screen with its own mini theme: it re-declares the kit's button tokens
   * from the bank palette, so the real Button inside follows the rebrand like any product would.
   */
  product: [
    "group/product overflow-hidden rounded-md border border-line bg-bg",
    "[--hb-button-primary-bg:var(--hb-palette-bank-before)] [--hb-button-primary-fg:var(--hb-palette-ink-50)] [--hb-button-radius:var(--hb-radius-sm)]",
    "data-[rebranded=true]:[--hb-button-primary-bg:var(--hb-palette-bank-after)] data-[rebranded=true]:[--hb-button-radius:var(--hb-radius-pill)]",
  ].join(" "),
  productBar:
    "flex items-center justify-between gap-2 bg-(color:--hb-button-primary-bg) px-3 py-2 text-(color:--hb-button-primary-fg) transition-colors duration-(--hb-duration-slow)",
  /** The brand's type changes with the rebrand too: heavier and wider. */
  productName:
    "truncate text-label font-medium tracking-normal transition-[font-weight,letter-spacing] duration-(--hb-duration-slow) group-data-[rebranded=true]/product:font-extrabold group-data-[rebranded=true]/product:tracking-wider",
  productVersion: "font-mono text-small opacity-80",
  productBody: "flex flex-col gap-2 p-3",
  balanceLabel: "text-small text-subtle",
  balance: "truncate text-small font-bold text-fg tabular-nums",
  line: "block h-1.5 rounded-pill bg-raised",
  lineShort: "block h-1.5 w-3/5 rounded-pill bg-raised",
  action: "mt-1 h-8 w-full px-2 text-label",

  /** Act 1: the product's own developer, with their progress on this rebrand. */
  developer: "group/dev flex items-center gap-3 border-t border-line px-3 py-2",
  /** Dim while working (pulsing without reduced motion), bright once done. */
  avatar:
    "size-7 shrink-0 text-line group-data-[state=done]/dev:text-subtle group-data-[state=working]/dev:motion-safe:animate-pulse",
  systemAvatar:
    "size-8 shrink-0 text-subtle group-data-[state=working]/system:motion-safe:animate-pulse md:size-10",
  avatarHead: "fill-current",
  avatarLaptop: "fill-raised stroke-subtle",
  track: `${track} flex-1`,
  fill,
  systemTrack: `${track} w-full`,
};
