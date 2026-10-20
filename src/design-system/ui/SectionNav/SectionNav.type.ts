export type TSectionNavItem = { id: string; label: string; href: string };

export type TSectionNavProps = {
  items: readonly TSectionNavItem[];
  /** id of the section the visitor is in, or null when they're in none (e.g. the intro). */
  activeId: string | null;
  /** Name of the navigation landmark. */
  label?: string;
  className?: string;
};
