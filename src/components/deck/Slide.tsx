import type { ReactNode } from "react";
import type { SlideMeta } from "@/content/types";
import type { ThemeName } from "@/design-system/tokens";
import { cx } from "@/design-system/ui";
import { deck } from "./Deck.style";

type SlideProps = {
  slide: SlideMeta;
  /** Re-themes this slide only (e.g. the PixelCraft slide). */
  theme?: ThemeName;
  className?: string;
  children: ReactNode;
};

/** One full-viewport section of the deck; its id is the URL hash. */
export function Slide({ slide, theme, className, children }: SlideProps) {
  return (
    <section
      id={slide.id}
      data-slide=""
      aria-label={slide.label}
      data-theme={theme}
      className={cx(deck.slide, className)}
    >
      {children}
    </section>
  );
}
