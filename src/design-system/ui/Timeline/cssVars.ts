import type { CSSProperties } from "react";

/** Passes computed values to a style file as CSS custom properties: { at: "40%" } → --at: 40%. */
export function cssVars(values: Record<string, string | number>): CSSProperties {
  return Object.fromEntries(Object.entries(values).map(([name, value]) => [`--${name}`, value]));
}
