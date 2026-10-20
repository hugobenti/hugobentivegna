import type {
  TYearMonth,
  IScaleEntry,
  ITimelineScale,
  TAxisState,
  IAxisView,
} from "./timelineScale.type";

function monthIndex(date: TYearMonth): number {
  const [year = 0, month = 1] = date.split("-").map(Number);
  return year * 12 + (month - 1);
}

/**
 * Maps a career onto a time-scaled axis: it starts in January of the first year and ends at the
 * last end date, with one tick per January in between. Entries are expected oldest first.
 */
export function timelineScale(entries: readonly IScaleEntry[]): ITimelineScale {
  const first = entries[0];
  const last = entries.at(-1);
  if (!first || !last) return { ticks: [], spans: [], roles: [] };

  const firstYear = Number(first.start.slice(0, 4));
  const origin = firstYear * 12;
  const length = Math.max(1, monthIndex(last.end) - origin);
  const at = (date: TYearMonth) => ((monthIndex(date) - origin) / length) * 100;

  const lastYear = Number(last.end.slice(0, 4));
  return {
    ticks: Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i).map(
      (year) => ({
        year,
        at: at(`${year}-01`),
      }),
    ),
    spans: entries.map((entry) => ({
      company: entry.company,
      from: at(entry.start),
      to: at(entry.end),
    })),
    roles: entries.flatMap((entry, index) =>
      entry.roles.map((role) => ({
        title: role.title,
        start: role.start,
        at: at(role.start),
        entry: index,
      })),
    ),
  };
}

/** "2020–2022", or a single year when an entry starts and ends in the same year. */
export function periodLabel(entry: { start: TYearMonth; end: TYearMonth }): string {
  const start = entry.start.slice(0, 4);
  const end = entry.end.slice(0, 4);
  return start === end ? start : `${start}–${end}`;
}

/**
 * The axis as it should look with `activeIndex` in focus: earlier entries past, later ones
 * future, the line filled to the active entry's end. Without `activeIndex` it is static.
 */
export function axisView(entries: readonly IScaleEntry[], activeIndex?: number): IAxisView {
  const scale = timelineScale(entries);
  const percent = (value: number) => `${value}%`;
  const stateOf = (index: number): TAxisState => {
    if (activeIndex === undefined || index < activeIndex) return "past";
    return index === activeIndex ? "current" : "future";
  };
  return {
    ticks: scale.ticks.map((tick) => ({ year: tick.year, at: percent(tick.at) })),
    spans: scale.spans.map((span, index) => ({
      company: span.company,
      state: stateOf(index),
      from: percent(span.from),
      to: percent(span.to),
    })),
    dots: scale.roles.map((role) => ({
      key: `${role.title}-${role.start}`,
      title: `${role.title} · ${role.start}`,
      state: stateOf(role.entry),
      at: percent(role.at),
    })),
    fill: percent(activeIndex === undefined ? 100 : (scale.spans[activeIndex]?.to ?? 0)),
  };
}
