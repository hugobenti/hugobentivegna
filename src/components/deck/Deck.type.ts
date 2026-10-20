import type { ReactNode } from "react";
import type { TAvailableNavLink } from "@/content/navigation.type";
import type { ISlideMeta } from "@/content/content.type";

export type TDeckProps = {
  slides: readonly ISlideMeta[];
  /** The header's section links; the one owning the slide in view is marked. */
  nav: readonly TAvailableNavLink[];
  children: ReactNode;
};
