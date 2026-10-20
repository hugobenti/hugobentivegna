import type { ReactNode } from "react";
import type { ISlideMeta } from "@/content/content.type";
import type { TThemeName } from "@/design-system/tokens/tokens.type";

export type TSlideProps = {
  slide: ISlideMeta;
  /** Re-themes this slide only (e.g. the PixelCraft slide). */
  theme?: TThemeName;
  className?: string;
  children: ReactNode;
};
