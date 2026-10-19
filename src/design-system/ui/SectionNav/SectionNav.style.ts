import { focusRing } from "../focus.style";

// The active link's look comes from aria-current="location", so what's announced and what's
// shown can't disagree.
export const sectionNav = {
  /**
   * One row; on narrow screens it scrolls sideways with no visible scrollbar. A scrolling box
   * clips on every side, so the padding keeps each link's focus ring (offset + width) inside it.
   */
  list: "flex items-center gap-1 overflow-x-auto p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  item: "shrink-0",
  link: [
    "group flex items-center gap-1 rounded-sm px-2 py-2 text-small whitespace-nowrap text-muted",
    "transition-colors duration-(--hb-duration-fast) hover:text-fg aria-[current=location]:text-fg",
    focusRing,
  ].join(" "),
  /** Always in the layout, shown only on the active link, so nothing shifts when it changes. */
  bracket: "invisible font-mono text-accent group-aria-[current=location]:visible",
  /** Stacks the label over an invisible bold copy, so turning bold never changes the width. */
  text: "grid",
  label: "[grid-area:1/1] group-aria-[current=location]:font-bold",
  sizer: "invisible [grid-area:1/1] font-bold",
};
