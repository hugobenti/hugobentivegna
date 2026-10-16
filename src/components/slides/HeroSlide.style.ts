import { focusRing } from "@/design-system/ui";

export const hero = {
  slide: "overflow-hidden",
  /** Soft accent light behind the headline, from the theme's glow token. */
  glow: "pointer-events-none absolute -top-1/3 -right-1/4 size-[70vmax] rounded-pill bg-[radial-gradient(circle,var(--hb-color-glow),transparent_60%)] blur-3xl",
  topBar: "absolute inset-x-0 top-0 flex items-center justify-between px-gutter py-6",
  monogram: "font-display text-body font-extrabold text-fg",
  navList: "flex gap-6",
  navLink: [
    "rounded-sm text-small text-muted transition-colors duration-(--hb-duration-fast) hover:text-fg",
    focusRing,
  ].join(" "),
  content: "relative max-w-5xl",
  kicker: "font-mono text-label text-subtle uppercase",
  headline: "mt-6 font-display text-display font-extrabold text-fg",
  line: "block",
  accent: "block text-accent",
  support: "mt-8 text-body text-muted",
  cue: "absolute bottom-8 left-gutter font-mono text-label text-subtle uppercase",
};
