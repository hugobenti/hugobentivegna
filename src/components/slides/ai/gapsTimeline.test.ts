import { expect, test } from "vitest";
import {
  GAPS_CHECK_MS,
  GAPS_DELAY_MS,
  GAPS_REVEAL_MS,
  GAPS_SOURCE_MS,
  gapsDuration,
  gapsFrame,
} from "./gapsTimeline";

const SOURCES = 3;
const CHECKS = 4;
const frame = (elapsed: number) => gapsFrame(elapsed, SOURCES, CHECKS);
const checksStart = GAPS_DELAY_MS + SOURCES * GAPS_SOURCE_MS;

test("plays the sources one by one, then each check, then holds", () => {
  expect(gapsDuration(SOURCES, CHECKS)).toBe(
    GAPS_DELAY_MS + SOURCES * GAPS_SOURCE_MS + CHECKS * GAPS_CHECK_MS,
  );
});

test("nothing is lit before the first beat", () => {
  expect(frame(0)).toEqual({ sourcesLit: 0, reading: null, shown: 0, resolved: 0, done: false });
});

test("each source lights up in turn while the agent reads it", () => {
  expect(frame(GAPS_DELAY_MS)).toMatchObject({ sourcesLit: 1, reading: 0, shown: 0 });
  expect(frame(GAPS_DELAY_MS + 2 * GAPS_SOURCE_MS)).toMatchObject({ sourcesLit: 3, reading: 2 });
});

test("a check appears, then its result lands a beat later", () => {
  expect(frame(checksStart)).toMatchObject({ sourcesLit: 3, reading: null, shown: 1, resolved: 0 });
  expect(frame(checksStart + GAPS_REVEAL_MS)).toMatchObject({ shown: 1, resolved: 1 });
  expect(frame(checksStart + GAPS_CHECK_MS)).toMatchObject({ shown: 2, resolved: 1 });
});

test("at the end every check has its result and it stays that way", () => {
  const end = gapsDuration(SOURCES, CHECKS);
  const final = { sourcesLit: 3, reading: null, shown: 4, resolved: 4, done: true };
  expect(frame(end)).toEqual(final);
  expect(frame(end + 10_000)).toEqual(final);
  expect(frame(end - 1)).toMatchObject({ resolved: 4, done: false });
});
