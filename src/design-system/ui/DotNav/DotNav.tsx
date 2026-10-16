import { dotNav } from "./DotNav.style";

export type DotNavItem = { id: string; label: string };

export type DotNavProps = {
  items: DotNavItem[];
  /** id of the slide currently in view. */
  activeId: string;
  /** Called with the id of the dot the visitor picked. Scrolling is the caller's job. */
  onSelect: (id: string) => void;
  /** Name of the navigation landmark. */
  label?: string;
  className?: string;
};

/** Slide position dots: one labelled button per slide, the current one highlighted. */
export function DotNav({ items, activeId, onSelect, label = "Slides", className }: DotNavProps) {
  return (
    <nav aria-label={label} className={className}>
      <ol className={dotNav.list}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={dotNav.button}
              aria-current={item.id === activeId ? "true" : undefined}
              title={item.label}
              onClick={() => onSelect(item.id)}
            >
              <span className={dotNav.dot} aria-hidden="true" />
              <span className={dotNav.label}>{item.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
