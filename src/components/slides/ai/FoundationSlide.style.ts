import type { IExcerptLine } from "@/content/content.type";
import { cx } from "@/design-system/ui";

export const foundationSlide = {
  /** Copy on the left, the excerpts on the right from lg up (md is too narrow for both). */
  content:
    "mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-center lg:gap-16",
  kicker: "font-mono text-label text-subtle uppercase",
  title: "mt-6 font-display text-h2 font-extrabold text-balance text-fg",
  body: "mt-6 max-w-xl text-body text-muted",
  note: "mt-6 font-mono text-label text-subtle",

  demo: "flex flex-col gap-3",
  excerpts: "flex flex-col gap-3",
  /**
   * One excerpt. Unlit cards keep AA text (`muted`); the one in focus gets the accent outline
   * and full-strength text. Only colors change, so the stack never moves.
   */
  excerpt: cx(
    "group/excerpt rounded-md border border-line bg-surface px-4 py-3",
    "transition-[border-color,box-shadow] duration-(--hb-duration-slow)",
    "data-[on=true]:border-accent data-[on=true]:shadow-[0_0_0_4px_var(--hb-color-glow)]",
  ),
  header: "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 font-mono text-label",
  file: "text-muted",
  fileName: "text-accent",
  reader: "text-subtle",
  lines: cx(
    "mt-2 flex flex-col gap-0.5 text-small text-muted",
    "transition-colors duration-(--hb-duration-slow) group-data-[on=true]/excerpt:text-fg",
  ),
  /** Per line tone; `error` keeps its color whether or not the card is lit. */
  line: {
    plain: "",
    strong: "font-semibold",
    label: "font-mono text-label text-subtle",
    error: "font-mono text-label text-danger",
  } satisfies Record<NonNullable<IExcerptLine["tone"]> | "plain", string>,

  footer: "flex min-h-8 justify-end",
  control: "h-8 px-4 text-label",
};
