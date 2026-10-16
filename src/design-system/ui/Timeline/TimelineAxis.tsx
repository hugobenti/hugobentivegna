import { cx } from "../cx";
import { cssVars } from "./cssVars";
import { timelineAxis } from "./Timeline.style";
import { timelineScale, type ScaleEntry } from "./timelineScale";

export type TimelineAxisProps = {
  /** Oldest first. */
  entries: readonly ScaleEntry[];
  /**
   * Entry currently in focus: the line fills up to its end, earlier entries read as past and
   * later ones as future. Leave it out for a static axis with everything filled.
   */
  activeIndex?: number;
  className?: string;
};

type State = "past" | "current" | "future";

/** A time-scaled career axis: a tick per year, a span per company, a dot per role. Decorative. */
export function TimelineAxis({ entries, activeIndex, className }: TimelineAxisProps) {
  const scale = timelineScale(entries);
  const stateOf = (index: number): State =>
    activeIndex === undefined || index < activeIndex
      ? "past"
      : index === activeIndex
        ? "current"
        : "future";
  const fill = activeIndex === undefined ? 100 : (scale.spans[activeIndex]?.to ?? 0);

  return (
    <div className={cx(timelineAxis.base, className)} aria-hidden="true">
      {scale.ticks.map((tick) => (
        <span key={tick.year} className={timelineAxis.tick} style={cssVars({ at: `${tick.at}%` })}>
          {tick.year}
        </span>
      ))}
      <span className={timelineAxis.track} />
      <span className={timelineAxis.fill} style={cssVars({ fill: `${fill}%` })} />
      <span className={timelineAxis.spans}>
        {scale.spans.map((span, index) => (
          <span
            key={span.company}
            data-state={stateOf(index)}
            className={timelineAxis.span}
            style={cssVars({ from: `${span.from}%`, to: `${span.to}%` })}
          />
        ))}
      </span>
      {scale.roles.map((role) => (
        <span
          key={`${role.title}-${role.start}`}
          data-state={stateOf(role.entry)}
          className={timelineAxis.dot}
          style={cssVars({ at: `${role.at}%` })}
          title={`${role.title} · ${role.start}`}
        />
      ))}
    </div>
  );
}
