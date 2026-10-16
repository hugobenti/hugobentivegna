import { site } from "./site";
import { slideList } from "./slides";
import type { NavLink } from "./types";

export type AvailableNavLink = NavLink & { href: `#${string}` };

/** Nav links whose slide exists, so the nav never points at a section that isn't built yet. */
export function availableNavLinks(
  nav: readonly NavLink[],
  slides: readonly { id: string }[],
): AvailableNavLink[] {
  return nav
    .filter((link) => slides.some((slide) => slide.id === link.slideId))
    .map((link) => ({ ...link, href: `#${link.slideId}` }));
}

/** The hero's nav, as rendered. */
export const navLinks = availableNavLinks(site.nav, slideList);
