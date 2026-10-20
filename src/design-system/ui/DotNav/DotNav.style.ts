import { focusRing } from "../focus.style";
import { cx } from "../cx";

export const dotNav = {
  list: "flex flex-col items-center gap-1",
  /** 24×24 target (WCAG 2.2 target size) around a small visible dot. */
  button: cx("group grid size-6 cursor-pointer place-items-center rounded-pill", focusRing),
  dot: cx(
    // `subtle` keeps inactive dots ≥ 3:1 against the background (WCAG 1.4.11 non-text contrast).
    "block size-2 rounded-pill bg-subtle",
    "transition-[transform,background-color] duration-(--hb-duration-base) ease-out motion-reduce:transition-none",
    "group-hover:bg-fg",
    // Active state comes from aria-current, so markup and style can't disagree.
    "group-aria-[current=true]:scale-150 group-aria-[current=true]:bg-accent",
  ),
  label: "sr-only",
};
