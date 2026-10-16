import type { Metadata } from "next";
import { site } from "./site";

/** Page metadata for the whole site, derived from the site content. */
export const siteMetadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: `${site.name} — ${site.role}`,
  description: `${site.headline.lead} ${site.headline.accent} ${site.headline.tail} ${site.supportLine.replaceAll(" · ", ", ")}.`,
};
