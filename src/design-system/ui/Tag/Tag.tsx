import type { ReactNode } from "react";
import { cx } from "../cx";
import { tag } from "./Tag.style";

export type TagProps = {
  children: ReactNode;
  className?: string;
};

/** Small, non-interactive label: a technology, a category, a status. */
export function Tag({ children, className }: TagProps) {
  return <span className={cx(tag.base, className)}>{children}</span>;
}
