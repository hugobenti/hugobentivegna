import { cx } from "@/design-system/ui";

/** Header and chapters share one centred column, inside the slide's side padding. */
const column = "mx-auto w-full max-w-6xl";

export const timelineSlide = {
  /** Opaque, with a soft page-coloured edge below, so chapters disappear cleanly under it. */
  header: "bg-bg shadow-[0_1.5rem_1.5rem_var(--hb-color-bg)]",
  inner: column,
  title: "font-display text-h2 font-bold text-fg",
  axis: "mt-6",
  /** Chapter on the left, its artifact on the right from md up. */
  step: cx(
    column,
    "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-center md:gap-12",
  ),
};
