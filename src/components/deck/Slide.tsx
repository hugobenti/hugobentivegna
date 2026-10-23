import { cx } from "@/design-system/ui";
import { deck } from "./Deck.style";
import type { TSlideProps } from "./Slide.type";

/** One full-viewport section of the deck; its id is the URL hash. */
export function Slide({ slide, className, children }: TSlideProps) {
  return (
    <section
      id={slide.id}
      data-slide=""
      aria-label={slide.label}
      className={cx(deck.slide, className)}
    >
      {children}
    </section>
  );
}
