import { site } from "@/content/site";
import { SectionNav, type SectionNavItem } from "@/design-system/ui";
import { siteHeader } from "./SiteHeader.style";

type SiteHeaderProps = {
  /** Where the monogram leads: the first slide. */
  homeHref: string;
  sections: readonly SectionNavItem[];
  /** id of the section in view, or null on slides outside every section. */
  activeSection: string | null;
};

/** The sticky top bar on every slide: the monogram, then the sections with the active one marked. */
export function SiteHeader({ homeHref, sections, activeSection }: SiteHeaderProps) {
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
