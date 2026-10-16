/**
 * Shared look of the Experience artifacts: a small app window that "plays" when its chapter is
 * in focus. The root carries `group` + `data-active`; children react with group-data variants.
 */
export const artifact = {
  frame:
    "group hidden overflow-hidden rounded-lg border border-line bg-surface shadow-card md:block",
  chrome: "flex items-center gap-3 border-b border-line px-4 py-3",
  dots: "flex gap-1.5",
  dot: "size-2.5 rounded-pill bg-line",
  title: "font-mono text-label text-subtle",
  body: "flex flex-col gap-5 p-5",
  /** Small uppercase caption above a group inside the window. */
  caption: "font-mono text-label text-subtle uppercase",
  /** Base transition for anything that animates in; --i staggers it. */
  appear: [
    "transition-[opacity,transform,translate,rotate,width,stroke-dashoffset] duration-(--hb-duration-slow) ease-out",
    "[transition-delay:calc(var(--i,0)*90ms)] motion-reduce:transition-none",
  ].join(" "),
  /** Faded and nudged down until the window is active. */
  rise: "translate-y-2 opacity-0 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100",
};
