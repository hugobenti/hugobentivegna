import type { CSSProperties } from "react";

/** Inline `--i` for an animated element: its position in the entrance order. */
export function stagger(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}
