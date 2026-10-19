import { site } from "./site";
import { slideList } from "./slides";
import type { NavLink } from "./types";

/** A link whose slide exists, ready to render: `id` is its slide id, `href` that slide's hash. */
export type AvailableNavLink = NavLink & { id: string; href: `#${string}` };

/** Nav links whose slide exists, so the nav never points at a section that isn't built yet. */
export function availableNavLinks(
  nav: readonly NavLink[],
  slides: readonly { id: string }[],
): AvailableNavLink[] {
  return nav
    .filter((link) => slides.some((slide) => slide.id === link.slideId))
    .map((link) => ({ ...link, id: link.slideId, href: `#${link.slideId}` }));
}

/**
 * The link that owns `slideId`: the one whose section contains it (a link without a section owns
 * only its own slide), keyed by the link's `slideId`. Null for slides outside every section.
 */
export function activeNavLink(nav: readonly NavLink[], slideId: string): string | null {
  const link = nav.find((entry) => (entry.section ?? [entry.slideId]).includes(slideId));
  return link?.slideId ?? null;
}

/** The site header's links, as rendered. */
export const navLinks = availableNavLinks(site.nav, slideList);
