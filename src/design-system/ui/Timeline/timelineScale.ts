/** A month as "YYYY-MM". */
export type YearMonth = `${number}-${number}`;

export interface ScaleRole {
  title: string;
  start: YearMonth;
}

export interface ScaleEntry {
  company: string;
  start: YearMonth;
  end: YearMonth;
  roles: ScaleRole[];
}

/** Positions on the axis, as percentages from its left edge. */
export interface TimelineScale {
  ticks: { year: number; at: number }[];
  spans: { company: string; from: number; to: number }[];
  /** `entry` is the index of the entry (company) the role belongs to. */
  roles: { title: string; start: YearMonth; at: number; entry: number }[];
}

function monthIndex(date: YearMonth): number {
  const [year = 0, month = 1] = date.split("-").map(Number);
  return year * 12 + (month - 1);
}

/**
 * Maps a career onto a time-scaled axis: it starts in January of the first year and ends at the
 * last end date, with one tick per January in between. Entries are expected oldest first.
 */
export function timelineScale(entries: readonly ScaleEntry[]): TimelineScale {
  const first = entries[0];
  const last = entries.at(-1);
  if (!first || !last) return { ticks: [], spans: [], roles: [] };

  const firstYear = Number(first.start.slice(0, 4));
  const origin = firstYear * 12;
  const length = Math.max(1, monthIndex(last.end) - origin);
  const at = (date: YearMonth) => ((monthIndex(date) - origin) / length) * 100;

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
export function periodLabel(entry: { start: YearMonth; end: YearMonth }): string {
  const start = entry.start.slice(0, 4);
  const end = entry.end.slice(0, 4);
  return start === end ? start : `${start}–${end}`;
}
