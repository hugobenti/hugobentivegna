import { cx } from "../cx";
import { Tag } from "../Tag/Tag";
import { timelineChapter } from "./Timeline.style";
import { periodLabel, type ScaleEntry } from "./timelineScale";

export interface TimelineEntry extends ScaleEntry {
  /** One line on what this period was about, e.g. "Building the system others build on". */
  chapter: string;
  /** One line about the work. */
  summary: string;
  /** A few technologies that defined the period. */
  stack: string[];
}

export type TimelineChapterProps = {
  entry: TimelineEntry;
  /** Heading level of the company name, so the chapter fits the page outline. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

/** One company's chapter: period, company, what it was about, roles held, summary and stack. */
export function TimelineChapter({ entry, headingLevel = 3, className }: TimelineChapterProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article className={cx(timelineChapter.base, className)}>
      <p className={timelineChapter.period}>{periodLabel(entry)}</p>
      <Heading className={timelineChapter.company}>{entry.company}</Heading>
      <p className={timelineChapter.chapter}>{entry.chapter}</p>
      <ol className={timelineChapter.roles} aria-label={`Roles at ${entry.company}`}>
        {entry.roles.map((role, index) => (
          <li key={role.title} className={timelineChapter.role}>
            {index > 0 && (
              <span className={timelineChapter.roleArrow} aria-hidden="true">
                →
              </span>
            )}
            {role.title}
          </li>
        ))}
      </ol>
      <p className={timelineChapter.summary}>{entry.summary}</p>
      <ul className={timelineChapter.stack} aria-label={`Stack at ${entry.company}`}>
        {entry.stack.map((technology) => (
          <li key={technology}>
            <Tag>{technology}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
