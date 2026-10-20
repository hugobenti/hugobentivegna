export type TDotNavItem = { id: string; label: string };

export type TDotNavProps = {
  items: readonly TDotNavItem[];
  /** id of the slide currently in view. */
  activeId: string;
  /** Called with the id of the dot the visitor picked. Scrolling is the caller's job. */
  onSelect: (id: string) => void;
  /** Name of the navigation landmark. */
  label?: string;
  className?: string;
};
