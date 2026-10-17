import { expect, test } from "vitest";
import { BUILD_DELAY_MS, BUILD_STEP_MS, buildDuration, buildFrame } from "./buttonBuild";

test("nothing is applied before the first step lands", () => {
  expect(buildFrame(0, 4)).toBe(0);
  expect(buildFrame(BUILD_DELAY_MS - 1, 4)).toBe(0);
});

test("steps apply one at a time, in order", () => {
  expect(buildFrame(BUILD_DELAY_MS, 4)).toBe(1);
  expect(buildFrame(BUILD_DELAY_MS + BUILD_STEP_MS, 4)).toBe(2);
  expect(buildFrame(BUILD_DELAY_MS + 2 * BUILD_STEP_MS - 1, 4)).toBe(2);
});

test("ends with every step applied and holds there", () => {
  expect(buildFrame(buildDuration(4), 4)).toBe(4);
  expect(buildFrame(99_999, 4)).toBe(4);
});

test("the build finishes within 5 s, so it needs no pause control (WCAG 2.2.2)", () => {
  expect(buildDuration(4)).toBeLessThanOrEqual(5000);
});
