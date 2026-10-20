import { cx } from "../cx";
import { card } from "./Card.style";
import type { TCardProps } from "./Card.type";

/** Surface that groups related content. */
export function Card({
  as: Element = "div",
  interactive = false,
  className,
  children,
}: TCardProps) {
  return (
    <Element className={cx(card.base, interactive && card.interactive, className)}>
      {children}
    </Element>
  );
}
