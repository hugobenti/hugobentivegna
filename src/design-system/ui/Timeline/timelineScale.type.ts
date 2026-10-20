/** A month as "YYYY-MM". */
export type TYearMonth = `${number}-${number}`;

export interface IScaleRole {
  title: string;
  start: TYearMonth;
}

export interface IScaleEntry {
  company: string;
  start: TYearMonth;
  end: TYearMonth;
  roles: IScaleRole[];
}

/** Positions on the axis, as percentages from its left edge. */
export interface ITimelineScale {
  ticks: { year: number; at: number }[];
  spans: { company: string; from: number; to: number }[];
  /** `entry` is the index of the entry (company) the role belongs to. */
  roles: { title: string; start: TYearMonth; at: number; entry: number }[];
}

export type TAxisState = "past" | "current" | "future";

/** Everything TimelineAxis renders, with positions already formatted as CSS percentages. */
export interface IAxisView {
  ticks: { year: number; at: string }[];
  spans: { company: string; state: TAxisState; from: string; to: string }[];
  dots: { key: string; title: string; state: TAxisState; at: string }[];
  /** How far the accent line runs. */
  fill: string;
}
