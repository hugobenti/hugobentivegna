import { focusRingWithin } from "../focus.style";

export const themeSwitch = {
  base: "inline-flex flex-wrap gap-1 rounded-pill border border-line bg-surface p-1",
  legend: "sr-only",
  option: [
    "cursor-pointer rounded-pill px-4 py-2 text-small font-medium text-muted",
    "transition-colors duration-(--hb-duration-fast) ease-out motion-reduce:transition-none",
    "hover:text-fg",
    // Selected look comes from the radio's own state, so markup and style can't disagree.
    "has-checked:bg-accent has-checked:text-on-accent",
    focusRingWithin,
  ].join(" "),
  /** Visually hidden but still focusable: the browser keeps native radio keyboard behavior. */
  input: "sr-only",
};
