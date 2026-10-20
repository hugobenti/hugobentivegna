import { expect, test } from "vitest";
import { axisView, periodLabel, timelineScale } from "./timelineScale";
import type { IScaleEntry } from "./timelineScale.type";

const entries: IScaleEntry[] = [
  {
    company: "A",
    start: "2020-01",
    end: "2022-05",
    roles: [
      { title: "Analyst", start: "2020-01" },
      { title: "Engineer", start: "2021-02" },
    ],
  },
  {
    company: "B",
    start: "2022-05",
    end: "2024-01",
    roles: [{ title: "Developer", start: "2022-05" }],
  },
];

test("the axis starts in January of the first year and ends at the last end date", () => {
  const scale = timelineScale(entries);
  expect(scale.spans[0]?.from).toBe(0);
  expect(scale.spans.at(-1)?.to).toBe(100);
});

test("one tick per year, placed at its January", () => {
  const { ticks } = timelineScale(entries);
  expect(ticks.map((tick) => tick.year)).toEqual([2020, 2021, 2022, 2023, 2024]);
  // 48 months on the axis: each January is 12 months (25%) after the last.
  expect(ticks.map((tick) => tick.at)).toEqual([0, 25, 50, 75, 100]);
});

test("company spans and role dots sit at their dates", () => {
  const { spans, roles } = timelineScale(entries);
  // A: Jan 2020 → May 2022 is 28 of 48 months.
  expect(spans[0]).toEqual({ company: "A", from: 0, to: (28 / 48) * 100 });
  expect(roles.map((role) => role.title)).toEqual(["Analyst", "Engineer", "Developer"]);
  expect(roles[1]?.at).toBeCloseTo((13 / 48) * 100);
  expect(roles[2]?.at).toBe(spans[1]?.from);
});

test("every role dot knows which entry it belongs to", () => {
  const { roles } = timelineScale(entries);
  expect(roles.map((role) => role.entry)).toEqual([0, 0, 1]);
});

test("period labels use years; a single-year entry shows one year", () => {
  expect(periodLabel({ start: "2020-01", end: "2022-05" })).toBe("2020–2022");
  expect(periodLabel({ start: "2025-11", end: "2025-12" })).toBe("2025");
});

test("the axis view marks entries before the active one as past and after it as future", () => {
  const view = axisView(entries, 1);
  expect(view.spans.map((span) => span.state)).toEqual(["past", "current"]);
  expect(axisView(entries, 0).spans.map((span) => span.state)).toEqual(["current", "future"]);
});

test("role dots take the state of the entry they belong to", () => {
  expect(axisView(entries, 0).dots.map((dot) => dot.state)).toEqual([
    "current",
    "current",
    "future",
  ]);
});

test("the line fills to the end of the active entry", () => {
  expect(axisView(entries, 0).fill).toBe(`${(28 / 48) * 100}%`);
  expect(axisView(entries, 1).fill).toBe("100%");
});

test("without an active entry the axis is static: everything past, fully filled", () => {
  const view = axisView(entries);
  expect(view.spans.map((span) => span.state)).toEqual(["past", "past"]);
  expect(view.fill).toBe("100%");
});

test("positions come out as CSS percentages and dots carry a readable title", () => {
  const view = axisView(entries);
  expect(view.ticks.map((tick) => tick.at)).toEqual(["0%", "25%", "50%", "75%", "100%"]);
  expect(view.spans[0]).toMatchObject({ from: "0%", to: `${(28 / 48) * 100}%` });
  expect(view.dots[1]).toMatchObject({ title: "Engineer · 2021-02", at: `${(13 / 48) * 100}%` });
});
