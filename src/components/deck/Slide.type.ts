import type { ReactNode } from "react";
import type { ISlideMeta } from "@/content/content.type";

export type TSlideProps = {
  slide: ISlideMeta;
  className?: string;
  children: ReactNode;
};
