/** Keyboard focus ring for every interactive element, from the focus-ring component tokens. */
export const focusRing =
  "focus-visible:outline-(length:--hb-focus-ring-width) focus-visible:outline-offset-(length:--hb-focus-ring-offset) focus-visible:outline-(color:--hb-focus-ring-color)";

/** Same ring on a wrapper whose (visually hidden) input has keyboard focus, e.g. a radio's label. */
export const focusRingWithin =
  "has-focus-visible:outline-(length:--hb-focus-ring-width) has-focus-visible:outline-offset-(length:--hb-focus-ring-offset) has-focus-visible:outline-(color:--hb-focus-ring-color)";
