import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";
import { tokens } from "@/design-system/tokens";

/** Image metadata re-exported by app/opengraph-image.tsx. */
export const alt = `${site.name}, ${site.role}: ${site.headline.lead} ${site.headline.accent} ${site.headline.tail}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Midnight colors as plain values: the image renderer can't read CSS variables, so the card
 * takes them from the generated tokens instead of hard-coding them.
 */
function midnight(name: string): string {
  const token = tokens.find((t) => t.name === `color.${name}` && t.theme === "midnight");
  if (!token) throw new Error(`missing midnight token color.${name}`);
  return token.resolved;
}

export const ogPalette = {
  bg: midnight("bg"),
  fg: midnight("fg"),
  muted: midnight("muted"),
  subtle: midnight("subtle"),
  accent: midnight("accent"),
  glow: midnight("glow"),
};

const fontFile = (weight: 400 | 800) =>
  path.join(
    process.cwd(),
    "node_modules/@fontsource/inter-tight/files",
    `inter-tight-latin-${weight}-normal.woff`,
  );

/** Inter Tight, the site's display and body font, at the two weights the card uses. */
export async function ogFonts() {
  const [regular, extrabold] = await Promise.all([
    readFile(fontFile(400)),
    readFile(fontFile(800)),
  ]);
  return [
    { name: "Inter Tight", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Inter Tight", data: extrabold, weight: 800 as const, style: "normal" as const },
  ];
}
