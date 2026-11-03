import { site } from "./site";
import { slideList } from "./slides";
import type { IHeroCase, INavLink } from "./content.type";
import type { TAvailableNavLink, THeroCaseLink } from "./navigation.type";

/** Nav links whose slide exists, so the nav never points at a section that isn't built yet. */
export function availableNavLinks(
  nav: readonly INavLink[],
  slides: readonly { id: string }[],
): TAvailableNavLink[] {
  return nav
    .filter((link) => slides.some((slide) => slide.id === link.slideId))
    .map((link) => ({ ...link, id: link.slideId, href: `#${link.slideId}` }));
}

/** Hero cases whose slide exists, with their hash: the same rule as the nav. */
export function availableHeroCases(
  cases: readonly IHeroCase[],
  slides: readonly { id: string }[],
): THeroCaseLink[] {
  return cases
    .filter((entry) => slides.some((slide) => slide.id === entry.slideId))
    .map((entry) => ({ ...entry, href: `#${entry.slideId}` }));
}

/**
 * The link that owns `slideId`: the one whose section contains it (a link without a section owns
 * only its own slide), keyed by the link's `slideId`. Null for slides outside every section.
 */
export function activeNavLink(nav: readonly INavLink[], slideId: string): string | null {
  const link = nav.find((entry) => (entry.section ?? [entry.slideId]).includes(slideId));
  return link?.slideId ?? null;
}

/** The site header's links, as rendered. */
export const navLinks = availableNavLinks(site.nav, slideList);

/** The hero's case links, as rendered. */
export const heroCaseLinks = availableHeroCases(site.heroCases, slideList);
