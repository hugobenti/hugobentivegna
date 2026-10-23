import type { ReactNode } from "react";
import type { ICaseCover, ISlideMeta } from "@/content/content.type";

export type TCaseCoverSlideProps = {
  slide: ISlideMeta;
  cover: ICaseCover;
  /** An optional logo shown above the kicker. */
  mark?: ReactNode;
};
