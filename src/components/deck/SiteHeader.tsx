import { site } from "@/content/site";
import { SectionNav } from "@/design-system/ui";
import { siteHeader } from "./SiteHeader.style";
import type { TSiteHeaderProps } from "./SiteHeader.type";

/** The sticky top bar on every slide: the monogram, then the sections with the active one marked. */
export function SiteHeader({ homeHref, sections, activeSection }: TSiteHeaderProps) {
  return (
    <header className={siteHeader.bar}>
      <a href={homeHref} aria-label={site.homeLabel} className={siteHeader.monogram}>
        {site.monogram}
      </a>
      <SectionNav
        items={sections}
        activeId={activeSection}
        label={site.navLabel}
        className={siteHeader.nav}
      />
    </header>
  );
}
