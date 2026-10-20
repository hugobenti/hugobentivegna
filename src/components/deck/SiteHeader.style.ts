import { cx, focusRing } from "@/design-system/ui";

export const siteHeader = {
  /**
   * Fixed over every slide, above the dots. Its height is deck.css's --hb-site-header, which
   * slides and multi-step headers keep their content clear of.
   */
  bar: "fixed inset-x-0 top-0 z-20 flex h-(--hb-site-header) items-center gap-4 border-b border-line bg-bg/85 px-gutter backdrop-blur-md",
  monogram: cx("shrink-0 rounded-sm font-display text-body font-extrabold text-fg", focusRing),
  /** Takes the remaining width, so on phones the links scroll inside it. */
  nav: "min-w-0 flex-1",
};
