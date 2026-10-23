import { cx } from "@/design-system/ui";

/** A thin track whose fill grows with `--progress` (0–1). */
const track = "block h-1 overflow-hidden rounded-pill bg-raised";
const fill =
  "block h-full origin-left scale-x-(--progress) rounded-pill bg-accent transition-[scale] duration-100 ease-linear";

export const rebrandSlide = {
  slide: "overflow-hidden",
  content: "relative mx-auto flex w-full max-w-6xl flex-col gap-6",
  kicker: "font-mono text-label text-subtle uppercase",
  title: "mt-4 font-display text-h2 font-extrabold text-balance text-fg",
  lead: "mt-4 max-w-2xl text-body text-muted",
  closing: "mt-4 max-w-2xl text-body text-fg",
  summaries: "sr-only",
  /**
   * The scene's frame. Pulses inside only run while `data-playing` is true. Tighter on short
   * screens (≤ 760px tall) so the slide still fits one viewport.
   */
  panel:
    "group/panel flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 [@media(max-height:760px)]:gap-3 [@media(max-height:760px)]:p-4",
  bar: "flex flex-wrap items-center justify-between gap-3",
  flags: "flex flex-wrap gap-2",
  /** WITHOUT / WITH: the act on screen is highlighted. */
  flag: "rounded-pill border border-line px-3 py-1.5 font-mono text-label text-subtle uppercase transition-colors duration-(--hb-duration-base) data-[active=true]:border-accent data-[active=true]:bg-accent data-[active=true]:text-on-accent",
  /** One act while playing; both acts' end states side by side under reduced motion. */
  acts: {
    playing: "grid",
    still: "grid gap-8 lg:grid-cols-2",
  },
};

export const rebrandScene = {
  act: "flex flex-col gap-4 [@media(max-height:760px)]:gap-3",
  header: "flex flex-wrap items-end justify-between gap-4",
  actLabel: "font-mono text-label text-subtle uppercase",
  actTitle: "mt-1 font-display text-h3 font-bold text-fg",
  counters: "flex gap-6",
  counter: "flex flex-col",
  count: "font-display text-h3 font-extrabold text-fg tabular-nums",
  counterLabel: "font-mono text-label text-subtle",

  /**
   * Act 2: the design system, one developer, and its release. Act 1 shows `noSystem` in the same
   * place and height, so the scene keeps its size when the acts switch.
   */
  system:
    "group/system mx-auto flex h-12 w-full max-w-sm items-center gap-3 rounded-md border border-line bg-raised px-4 transition-[border-color] duration-(--hb-duration-base) data-[state=released]:border-accent",
  noSystem:
    "mx-auto flex h-12 w-full max-w-sm items-center justify-center rounded-md border border-dashed border-line px-4 font-mono text-label text-subtle",
  systemText: "flex min-w-0 flex-1 flex-col gap-2",
  systemName: "font-mono text-small text-fg",
  /**
   * The status stacks the current label over an invisible copy of the longest one, so its width
   * never changes and the progress track beside it keeps its length when "released" appears.
   */
  systemStatus:
    "grid shrink-0 justify-items-end font-mono text-label text-subtle transition-colors group-data-[state=released]/system:text-accent",
  statusText: "[grid-area:1/1]",
  statusSizer: "invisible [grid-area:1/1]",
  /**
   * Connectors from the system down to each product; they light up as the release lands. Only
   * drawn where the products sit in one row under the system.
   */
  wires: {
    wide: "-mt-4 hidden h-4 grid-cols-6 gap-3 lg:grid data-[visible=false]:invisible",
    compact: "hidden",
  },
  wire: "mx-auto block h-full w-0.5 origin-top scale-y-0 bg-accent transition-[scale] duration-(--hb-duration-base) data-[lit=true]:scale-y-100",

  /**
   * Two per row on phones so names and amounts stay readable. The side-by-side still acts show
   * the first three products each, so both fit one screen.
   */
  products: {
    wide: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
    compact: "grid grid-cols-3 gap-3 [&>li:nth-child(n+4)]:hidden",
  },
  /**
   * A made-up product screen with its own mini theme: it re-declares the kit's button tokens
   * from the bank palette, so the real Button inside follows the rebrand like any product would.
   */
  product: cx(
    "group/product overflow-hidden rounded-md border border-line bg-bg",
    "[--hb-button-primary-bg:var(--hb-palette-bank-before)] [--hb-button-primary-fg:var(--hb-palette-ink-50)] [--hb-button-radius:var(--hb-radius-sm)]",
    "data-[rebranded=true]:[--hb-button-primary-bg:var(--hb-palette-bank-after)] data-[rebranded=true]:[--hb-button-radius:var(--hb-radius-pill)]",
  ),
  productBar:
    "flex items-center justify-between gap-2 bg-(color:--hb-button-primary-bg) px-3 py-2 text-(color:--hb-button-primary-fg) transition-colors duration-(--hb-duration-slow)",
  /** The brand's type changes with the rebrand too: heavier and wider. */
  productName:
    "truncate text-label font-medium tracking-normal transition-[font-weight,letter-spacing] duration-(--hb-duration-slow) group-data-[rebranded=true]/product:font-extrabold group-data-[rebranded=true]/product:tracking-wider",
  productVersion: "font-mono text-small",
  productBody: "flex flex-col gap-2 p-3",
  /** The mock "Balance" caption is decoration; short screens drop it to keep the slide in view. */
  balanceLabel: "text-small text-subtle [@media(max-height:760px)]:hidden",
  balance: "truncate text-small font-bold text-fg tabular-nums",
  action: "mt-1 h-8 w-full px-2 text-label",

  /** Act 1: the product's own developer and their progress; kept but invisible in act 2. */
  developer:
    "group/dev flex items-center gap-3 border-t border-line px-3 py-1.5 data-[visible=false]:invisible",
  /** Dim while working (pulsing without reduced motion), bright once done. */
  avatar:
    "size-6 shrink-0 text-line group-data-[state=done]/dev:text-subtle group-data-[playing=true]/panel:group-data-[state=working]/dev:motion-safe:animate-pulse",
  systemAvatar:
    "size-7 shrink-0 text-subtle group-data-[playing=true]/panel:group-data-[state=working]/system:motion-safe:animate-pulse",
  track: cx(track, "flex-1"),
  fill,
  systemTrack: cx(track, "w-full"),
};
