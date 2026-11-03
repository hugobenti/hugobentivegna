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
    "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-stretch md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)]",
    /* At least 62% of the room under the axis, so a chapter fills its stop. */
    "md:min-h-[calc((100svh-var(--steps-header))*0.62)]",
  ),
};

/** Text column and artifact both fill the chapter block; the text is centred in it. */
export const timelineChapterFill = "md:flex md:flex-col md:justify-center";
