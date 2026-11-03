import type { IHeroCase, INavLink } from "./content.type";

/** A link whose slide exists, ready to render: `id` is its slide id, `href` that slide's hash. */
export type TAvailableNavLink = INavLink & { id: string; href: `#${string}` };

/** A hero case whose slide exists, with that slide's hash. */
export type THeroCaseLink = IHeroCase & { href: `#${string}` };
