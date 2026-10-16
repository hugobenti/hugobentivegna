import { focusRing } from "../focus.style";

export const copyText = {
  base: "relative inline-flex",
  /** The text itself is the control; dotted underline + icon say "this does something" without hover. */
  trigger: [
    "peer inline-flex cursor-copy items-center gap-2 rounded-sm font-mono text-fg",
    "underline decoration-line decoration-dotted underline-offset-4",
    "transition-colors duration-(--hb-duration-fast) ease-out hover:decoration-accent",
    focusRing,
  ].join(" "),
  icon: "size-[1em] shrink-0 text-subtle",
  /**
   * Hint above the text: shown on hover and keyboard focus, and kept visible while it reports
   * a result. Doubles as the live region and the trigger's accessible description.
   */
  hint: [
    "pointer-events-none absolute bottom-full left-0 mb-2 w-max max-w-80",
    "rounded-sm bg-raised px-2 py-1 font-sans text-label text-fg shadow-card",
    "opacity-0 transition-opacity duration-(--hb-duration-fast) ease-out",
    "peer-hover:opacity-100 peer-focus-visible:opacity-100",
    "data-[state=copied]:opacity-100 data-[state=copied]:text-accent data-[state=failed]:opacity-100",
  ].join(" "),
};
