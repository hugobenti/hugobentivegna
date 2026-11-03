import { cx } from "@/design-system/ui";

/** Header and chapters share one centred column, inside the slide's side padding. */
const column = "mx-auto w-full max-w-6xl";

export const timelineSlide = {
  /** Opaque, with a soft page-coloured edge below, so chapters disappear cleanly under it. */
  header: "bg-bg shadow-[0_1.5rem_1.5rem_var(--hb-color-bg)]",
  inner: column,
  title: "font-display text-h2 font-bold text-fg",
  axis: "mt-6",
  /** Chapter on the left, its artifact on the right from md up; the artifact widens at lg. */
  step: cx(
    column,
    "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-center md:gap-12",
    "lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:gap-16",
  ),
  /**
   * The chapter text steps up with the artifacts (from lg on screens 800px tall, see
   * experience/artifact.style): the summary becomes a lead and the groups get more air, so the
   * two columns balance. Targets the kit chapter's roles (ol), summary (p after it) and stack (ul).
   */
  chapter: cx(
    "lg:[@media(min-height:50rem)]:[&>ol]:mt-7",
    "lg:[@media(min-height:50rem)]:[&>ol+p]:mt-4 lg:[@media(min-height:50rem)]:[&>ol+p]:text-h3 lg:[@media(min-height:50rem)]:[&>ol+p]:text-balance",
    "lg:[@media(min-height:50rem)]:[&>ul]:mt-9",
  ),
};
