import { expect, test } from "vitest";
import { stepAt, stepsDuration } from "./stepTimeline";

test("the duration is the delay plus every step", () => {
  expect(stepsDuration(700, 2200, 3)).toBe(7300);
  expect(stepsDuration(500, 1000, 0)).toBe(500);
});

test("no step is current during the delay; steps then follow one after another", () => {
  expect(stepAt(0, 700, 1000, 3)).toBe(-1);
  expect(stepAt(699, 700, 1000, 3)).toBe(-1);
  expect(stepAt(700, 700, 1000, 3)).toBe(0);
  expect(stepAt(1699, 700, 1000, 3)).toBe(0);
  expect(stepAt(1700, 700, 1000, 3)).toBe(1);
});

test("once every step is over it stays at the count", () => {
  expect(stepAt(3700, 700, 1000, 3)).toBe(3);
  expect(stepAt(99999, 700, 1000, 3)).toBe(3);
});
