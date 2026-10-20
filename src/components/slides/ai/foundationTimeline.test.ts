import { expect, test } from "vitest";
import {
  FOUNDATION_DELAY_MS,
  FOUNDATION_STEP_MS,
  foundationDuration,
  foundationFrame,
} from "./foundationTimeline";

const COUNT = 3;

test("lights each excerpt for one step, after a short pause", () => {
  expect(foundationDuration(COUNT)).toBe(FOUNDATION_DELAY_MS + COUNT * FOUNDATION_STEP_MS);
});

test("nothing is lit before the first step", () => {
  expect(foundationFrame(0, COUNT)).toEqual({ current: null, all: false });
});

test("one excerpt at a time, in order", () => {
  expect(foundationFrame(FOUNDATION_DELAY_MS, COUNT)).toEqual({ current: 0, all: false });
  expect(foundationFrame(FOUNDATION_DELAY_MS + FOUNDATION_STEP_MS - 1, COUNT)).toEqual({
    current: 0,
    all: false,
  });
  expect(foundationFrame(FOUNDATION_DELAY_MS + 2 * FOUNDATION_STEP_MS, COUNT)).toEqual({
    current: 2,
    all: false,
  });
});

test("at the end every excerpt stays lit", () => {
  const end = foundationDuration(COUNT);
  expect(foundationFrame(end, COUNT)).toEqual({ current: null, all: true });
  expect(foundationFrame(end + 5000, COUNT)).toEqual({ current: null, all: true });
});
