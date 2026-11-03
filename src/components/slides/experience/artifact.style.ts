import { cx } from "@/design-system/ui";

/**
 * Shared look of the Experience artifacts: a small app window that "plays" when its chapter is
 * in focus. The root carries `group` + `data-active`; children react with group-data variants.
 *
 * From lg each window sits beside a chapter that has a whole screen to itself, so it scales with
 * the screen's height instead of leaving it empty:
 * - `--artifact-grow` is how much taller the viewport is than 720px (0 at or below it, capped).
 *   Charts, tiles, card previews and gaps start at their md size and add a share of it.
 * - From 800px tall (`lg:[@media(min-height:50rem)]:`) type, padding and controls step up a size.
 */
export const artifact = {
  frame: cx(
    "group hidden overflow-hidden rounded-lg border border-line bg-surface shadow-card md:block",
    "lg:[--artifact-grow:clamp(0rem,calc(100svh-45rem),22.5rem)]",
  ),
  chrome: cx(
    "flex items-center gap-3 border-b border-line px-4 py-3",
    "lg:[@media(min-height:50rem)]:px-5 lg:[@media(min-height:50rem)]:py-3.5",
  ),
  dots: "flex gap-1.5",
  dot: "size-2.5 rounded-pill bg-line lg:[@media(min-height:50rem)]:size-3",
  title: "font-mono text-label text-subtle lg:[@media(min-height:50rem)]:text-small",
  body: cx(
    "flex flex-col gap-5 p-5 lg:[@media(min-height:50rem)]:p-6",
    "lg:gap-[clamp(--spacing(5),calc(--spacing(5)+var(--artifact-grow)*0.06),--spacing(10))]",
  ),
  /** Small uppercase caption above a group inside the window. */
  caption: "font-mono text-label text-subtle uppercase",
  /** Base transition for anything that animates in; --i staggers it. */
  appear: cx(
    "transition-[opacity,transform,translate,rotate,width,stroke-dashoffset] duration-(--hb-duration-slow) ease-out",
    "[transition-delay:calc(var(--i,0)*90ms)] motion-reduce:transition-none",
  ),
  /** Faded and nudged down until the window is active. */
  rise: "translate-y-2 opacity-0 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100",
};
