import { dotNav } from "./DotNav.style";
import type { TDotNavProps } from "./DotNav.type";

/** Slide position dots: one labelled button per slide, the current one highlighted. */
export function DotNav({ items, activeId, onSelect, label = "Slides", className }: TDotNavProps) {
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
