import { contrastRatio, tokens } from "../tokens";

/** Every token whose dot path starts with `prefix`, in source order. */
export function tokensNamed(prefix: string) {
  return tokens.filter((token) => token.name.startsWith(prefix));
}

/** The token with exactly this dot path; a missing token is a bug in the page, so it throws. */
export function tokenNamed(name: string) {
  const token = tokens.find((candidate) => candidate.name === name);
  if (!token) throw new Error(`Unknown token "${name}"`);
  return token;
}

/** `var(--hb-…)` of a token, so specimens are drawn by the token itself. */
export function varOf(name: string): string {
  return `var(${tokenNamed(name).cssVar})`;
}

/** Last segment of a dot path: "font.size.h1" → "h1". */
export function lastSegment(name: string): string {
  return name.slice(name.lastIndexOf(".") + 1);
}

/** Opaque semantic colors only: `glow` has an alpha channel and has no contrast to measure. */
export function semanticColors() {
  return tokens.filter((token) => token.layer === "semantic" && token.type === "color");
}

/** Foreground, background and the WCAG minimum: the pairs `contrast.test.ts` enforces. */
const pairs = [
  ["fg", "bg", 4.5],
  ["fg", "surface", 4.5],
  ["muted", "bg", 4.5],
  ["muted", "surface", 4.5],
  ["subtle", "bg", 4.5],
  ["subtle", "surface", 4.5],
  ["on-accent", "accent", 4.5],
  ["success", "bg", 4.5],
  ["success", "surface", 4.5],
  ["warning", "bg", 4.5],
  ["warning", "surface", 4.5],
  ["danger", "bg", 4.5],
  ["danger", "surface", 4.5],
  ["accent", "bg", 3],
  ["focus", "bg", 3],
  ["focus", "surface", 3],
] as const;

/** The pairs with their real ratio, computed from the resolved token values. */
export const contrastRows = pairs.map(([foreground, background, minimum]) => {
  const fg = tokenNamed(`color.${foreground}`);
  const bg = tokenNamed(`color.${background}`);
  const ratio = contrastRatio(fg.resolved, bg.resolved);
  return { fg, bg, ratio, minimum, isText: minimum === 4.5, passes: ratio >= minimum };
});
