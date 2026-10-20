import type { IScaleEntry } from "./timelineScale.type";

export interface ITimelineEntry extends IScaleEntry {
  /** One line on what this period was about, e.g. "Building the system others build on". */
  chapter: string;
  /** One line about the work. */
  summary: string;
  /** A few technologies that defined the period. */
  stack: string[];
}

export type TTimelineChapterProps = {
  entry: ITimelineEntry;
  /** Heading level of the company name, so the chapter fits the page outline. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
};
