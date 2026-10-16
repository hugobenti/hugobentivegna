export const button = {
  base: [
    "inline-flex items-center justify-center gap-2 rounded-(--hb-button-radius) font-medium whitespace-nowrap",
    "transition-[background-color,border-color,filter] duration-(--hb-duration-fast) ease-out",
    "focus-visible:outline-(length:--hb-focus-ring-width) focus-visible:outline-offset-(length:--hb-focus-ring-offset) focus-visible:outline-(color:--hb-focus-ring-color)",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  /** Visual weight. One `primary` per view; `secondary` beside it; `ghost` for low emphasis. */
  variant: {
    primary:
      "bg-(color:--hb-button-primary-bg) text-(color:--hb-button-primary-fg) hover:brightness-110",
    secondary:
      "border border-(color:--hb-button-secondary-border) bg-(color:--hb-button-secondary-bg) text-(color:--hb-button-secondary-fg) hover:border-muted",
    ghost: "text-fg hover:bg-raised",
  },
  size: {
    md: "h-10 px-5 text-small",
    lg: "h-12 px-7 text-body",
  },
  /** Visually hidden text that tells screen-reader users a link opens a new tab. */
  newTabHint: "sr-only",
};
