import type { TSectionNavItem } from "./SectionNav.type";

/** One rendering of a link's label; `short` and `full` swap with the breakpoint. */
export interface ISectionNavText {
  label: string;
  variant: "only" | "short" | "full";
}

export interface ISectionNavLink extends TSectionNavItem {
  texts: ISectionNavText[];
}
