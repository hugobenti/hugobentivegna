import type { CSSProperties } from "react";

export interface IBuildToken {
  name: string;
  value: string;
  /** Paints color tokens with their own variable; undefined for other types. */
  swatch?: CSSProperties;
  /** `current` while its step is landing, `applied` once it has. */
  state: "idle" | "current" | "applied";
}
