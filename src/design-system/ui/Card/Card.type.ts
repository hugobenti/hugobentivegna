import type { ReactNode } from "react";

export type TCardProps = {
  /** Pick the element that matches the content: `article` for standalone content, `li` inside a list. */
  as?: "div" | "article" | "li";
  /** Adds hover and focus-within feedback when the card contains a link or button. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};
