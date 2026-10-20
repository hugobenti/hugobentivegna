import { periodLabel } from "./timelineScale";
import type { IScaleEntry } from "./timelineScale.type";

/** View model for TimelineChapter: the element and labels it renders, derived from its props. */
export function useTimelineChapter(entry: IScaleEntry, headingLevel: 2 | 3 | 4) {
  return {
    Heading: `h${headingLevel}` as const,
    period: periodLabel(entry),
    rolesLabel: `Roles at ${entry.company}`,
    stackLabel: `Stack at ${entry.company}`,
  };
}
