import type { CSSProperties } from "react";
import { cx } from "../cx";
import { timeline } from "./Timeline.style";

export interface TimelineEntry {
  /** e.g. "2022–2025". */
  period: string;
  company: string;
  /** Roles held at the company, oldest first. Promotions show as steps of one entry. */
  roles: string[];
  /** One line about the work. */
  summary: string;
}

export type TimelineProps = {
  entries: TimelineEntry[];
  /** Heading level of each company name, so the timeline fits the page outline. */
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

/** Career timeline: one entry per company, oldest first. */
export function Timeline({ entries, headingLevel = 3, className }: TimelineProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <ol className={cx(timeline.base, className)}>
      {entries.map((entry, index) => (
        <li
          key={`${entry.company}-${entry.period}`}
          className={timeline.entry}
          // Lets the site stagger each entry's entrance.
          style={{ "--i": index } as CSSProperties}
        >
          <p className={timeline.period}>{entry.period}</p>
          <Heading className={timeline.company}>{entry.company}</Heading>
          <ol className={timeline.roles} aria-label={`Roles at ${entry.company}`}>
            {entry.roles.map((role, roleIndex) => (
              <li key={role} className={timeline.role}>
                {roleIndex > 0 && (
                  <span className={timeline.roleArrow} aria-hidden="true">
                    →
                  </span>
                )}
                {role}
              </li>
            ))}
          </ol>
          <p className={timeline.summary}>{entry.summary}</p>
        </li>
      ))}
    </ol>
  );
}
