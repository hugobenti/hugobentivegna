import type { TSectionNavItem } from "@/design-system/ui";
export type TSiteHeaderProps = {
  /** Where the monogram leads: the first slide. */
  homeHref: string;
  sections: readonly TSectionNavItem[];
  /** id of the section in view, or null on slides outside every section. */
  activeSection: string | null;
};
