import { cx } from "../cx";
import { Tag } from "../Tag/Tag";
import { timelineChapter } from "./Timeline.style";
import { useTimelineChapter } from "./useTimelineChapter";
import type { TTimelineChapterProps } from "./TimelineChapter.type";

/** One company's chapter: period, company, what it was about, roles held, summary and stack. */
export function TimelineChapter({ entry, headingLevel = 3, className }: TTimelineChapterProps) {
  const { Heading, period, rolesLabel, stackLabel } = useTimelineChapter(entry, headingLevel);
  return (
    <article className={cx(timelineChapter.base, className)}>
      <p className={timelineChapter.period}>{period}</p>
      <Heading className={timelineChapter.company}>{entry.company}</Heading>
      <p className={timelineChapter.chapter}>{entry.chapter}</p>
      <ol className={timelineChapter.roles} aria-label={rolesLabel}>
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
      <ul className={timelineChapter.stack} aria-label={stackLabel}>
        {entry.stack.map((technology) => (
          <li key={technology}>
            <Tag>{technology}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
