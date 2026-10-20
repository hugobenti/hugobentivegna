import { sectionNav } from "./SectionNav.style";
import { useSectionNav } from "./useSectionNav";
import type { TSectionNavProps } from "./SectionNav.type";

/**
 * In-page section links for a sticky header: the active one is bold, inside accent brackets.
 * On narrow screens the row scrolls sideways and keeps the active link in view.
 */
export function SectionNav({ items, activeId, label = "Sections", className }: TSectionNavProps) {
  const { listRef } = useSectionNav(activeId);
  return (
    <nav aria-label={label} className={className}>
      <ul ref={listRef} className={sectionNav.list}>
        {items.map((item) => (
          <li key={item.id} className={sectionNav.item}>
            <a
              href={item.href}
              aria-current={item.id === activeId ? "location" : undefined}
              className={sectionNav.link}
            >
              <span className={sectionNav.bracket} aria-hidden="true">
                [
              </span>
              <span className={sectionNav.text}>
                <span className={sectionNav.label}>{item.label}</span>
                <span className={sectionNav.sizer} aria-hidden="true">
                  {item.label}
                </span>
              </span>
              <span className={sectionNav.bracket} aria-hidden="true">
                ]
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
