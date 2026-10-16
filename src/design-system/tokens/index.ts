import generated from "./generated/tokens.json";

export type ThemeName = "midnight" | "solar" | "forest" | "pixel";
export type TokenLayer = "primitive" | "semantic" | "component";

export interface TokenEntry {
  /** Dot path, e.g. "color.accent". */
  name: string;
  /** CSS custom property, e.g. "--hb-color-accent". */
  cssVar: string;
  /** DTCG $type. */
  type: string;
  /** Authored value, possibly a reference like "{palette.blue.400}". */
  value: string;
  /** Fully resolved value. */
  resolved: string;
  layer: TokenLayer;
  /** Theme a semantic value belongs to; null for primitives and component tokens. */
  theme: ThemeName | null;
  description?: string;
}

export const themes: readonly ThemeName[] = ["midnight", "solar", "forest", "pixel"];

export const tokens = generated as readonly TokenEntry[];

/** WCAG 2.x relative luminance of an opaque #rgb / #rrggbb color. */
function luminance(hex: string): number {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex);
  if (!match?.[1]) throw new Error(`contrastRatio needs an opaque hex color, got "${hex}"`);
  const digits = match[1].length === 3 ? [...match[1]].map((d) => d + d).join("") : match[1];
  const [r = 0, g = 0, b = 0] = [0, 2, 4].map((i) => {
    const channel = Number.parseInt(digits.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two opaque colors, from 1 (none) to 21 (black on white). */
export function contrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return ((lighter ?? 0) + 0.05) / ((darker ?? 0) + 0.05);
}
