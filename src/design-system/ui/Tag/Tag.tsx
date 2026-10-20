import { cx } from "../cx";
import { tag } from "./Tag.style";
import type { TTagProps } from "./Tag.type";

/** Small, non-interactive label: a technology, a category, a status. */
export function Tag({ children, className }: TTagProps) {
  return <span className={cx(tag.base, className)}>{children}</span>;
}
