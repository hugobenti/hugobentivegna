import { periodLabel, type ScaleEntry } from "./timelineScale";

/** View model for TimelineChapter: the element and labels it renders, derived from its props. */
export function useTimelineChapter(entry: ScaleEntry, headingLevel: 2 | 3 | 4) {
  return {
    Heading: `h${headingLevel}` as const,
    period: periodLabel(entry),
    rolesLabel: `Roles at ${entry.company}`,
    stackLabel: `Stack at ${entry.company}`,
  };
}
