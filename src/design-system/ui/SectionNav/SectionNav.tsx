import { sectionNav } from "./SectionNav.style";
import { useSectionNav } from "./useSectionNav";
import type { TSectionNavProps } from "./SectionNav.type";

/**
 * In-page section links for a sticky header: the active one is bold, inside accent brackets.
 * On narrow screens the row scrolls sideways, keeps the active link centred, fades the edge that
 * hides links and swaps long labels for their `shortLabel`.
 */
export function SectionNav({ items, activeId, label = "Sections", className }: TSectionNavProps) {
  const { listRef, overflow, links } = useSectionNav(items, activeId);
  return (
    <nav aria-label={label} className={className}>
      <ul
        ref={listRef}
        className={sectionNav.list}
        data-overflow-start={overflow.start ? "" : undefined}
        data-overflow-end={overflow.end ? "" : undefined}
      >
        {links.map((item) => (
          <li key={item.id} className={sectionNav.item}>
            <a
              href={item.href}
              aria-current={item.id === activeId ? "location" : undefined}
              className={sectionNav.link}
            >
              <span className={sectionNav.bracket} aria-hidden="true">
                [
              </span>
              {item.texts.map((text) => (
                <span key={text.variant} className={sectionNav.text[text.variant]}>
                  <span className={sectionNav.label}>{text.label}</span>
                  <span className={sectionNav.sizer} aria-hidden="true">
                    {text.label}
                  </span>
                </span>
              ))}
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
