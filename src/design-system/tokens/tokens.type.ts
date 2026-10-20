export type TThemeName = "midnight" | "pixel";

export type TTokenLayer = "primitive" | "semantic" | "component";

export interface ITokenEntry {
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
  layer: TTokenLayer;
  /** Theme a semantic value belongs to; null for primitives and component tokens. */
  theme: TThemeName | null;
  description?: string;
}
