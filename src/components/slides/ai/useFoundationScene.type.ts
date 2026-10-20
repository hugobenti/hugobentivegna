import type { IExcerptLine } from "@/content/content.type";

/** A line as rendered: lines without a tone are `plain`. */
export interface IShownLine {
  text: string;
  tone: NonNullable<IExcerptLine["tone"]> | "plain";
}
