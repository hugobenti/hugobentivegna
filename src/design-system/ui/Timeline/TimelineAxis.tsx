import { cssVars } from "../cssVars";
import { cx } from "../cx";
import { timelineAxis } from "./Timeline.style";
import { useTimelineAxis } from "./useTimelineAxis";
import type { TTimelineAxisProps } from "./TimelineAxis.type";

/** A time-scaled career axis: a tick per year, a span per company, a dot per role. Decorative. */
export function TimelineAxis({ entries, activeIndex, className }: TTimelineAxisProps) {
  const { ticks, spans, dots, fill } = useTimelineAxis(entries, activeIndex);
  return (
    <div className={cx(timelineAxis.base, className)} aria-hidden="true">
      {ticks.map((tick) => (
        <span key={tick.year} className={timelineAxis.tick} style={cssVars({ at: tick.at })}>
          {tick.year}
        </span>
      ))}
      <span className={timelineAxis.track} />
      <span className={timelineAxis.fill} style={cssVars({ fill })} />
      <span className={timelineAxis.spans}>
        {spans.map((span) => (
          <span
            key={span.company}
            data-state={span.state}
            className={timelineAxis.span}
            style={cssVars({ from: span.from, to: span.to })}
          />
        ))}
      </span>
      {dots.map((dot) => (
        <span
          key={dot.key}
          data-state={dot.state}
          className={timelineAxis.dot}
          style={cssVars({ at: dot.at })}
          title={dot.title}
        />
      ))}
    </div>
  );
}
