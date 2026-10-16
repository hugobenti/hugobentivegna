import { expect, test } from "vitest";
import { periodLabel, timelineScale, type ScaleEntry } from "./timelineScale";

const entries: ScaleEntry[] = [
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
