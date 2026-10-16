import type { ReactNode } from "react";
import { cx } from "../cx";
import { card } from "./Card.style";

export type CardProps = {
  /** Pick the element that matches the content: `article` for standalone content, `li` inside a list. */
  as?: "div" | "article" | "li";
  /** Adds hover and focus-within feedback when the card contains a link or button. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};

/** Surface that groups related content. */
export function Card({ as: Element = "div", interactive = false, className, children }: CardProps) {
  return (
    <Element className={cx(card.base, interactive && card.interactive, className)}>
      {children}
    </Element>
  );
}
