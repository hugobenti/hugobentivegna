import { cx, focusRing } from "@/design-system/ui";

export const hero = {
  slide: "overflow-hidden",
  /** Soft accent light behind the headline, from the glow token. */
  glow: "pointer-events-none absolute -top-1/3 -right-1/4 size-[70vmax] rounded-pill bg-[radial-gradient(circle,var(--hb-color-glow),transparent_60%)] blur-3xl",
  content: "relative mx-auto w-full max-w-6xl",
  headline: "font-display text-display font-extrabold text-fg",
  line: "block",
  accent: "block text-accent",
  intro: "mt-6 max-w-2xl text-body text-muted",
  /** The cases, the proof behind the headline: three columns from lg up, stacked below. */
  cases: "mt-10 grid gap-6 lg:grid-cols-3 lg:gap-10",
  caseLink: cx(
    "group block h-full rounded-sm border-t border-line pt-4 transition-colors duration-(--hb-duration-fast) ease-out hover:border-accent",
    focusRing,
  ),
  caseNumber: "block font-mono text-small text-accent",
  caseLabel: "mt-1 block text-body font-bold text-fg group-hover:underline",
  caseOutcome: "mt-1 block text-small text-muted",
};
