import { expect, test } from "vitest";
import {
  MEMORY_BARS_MS,
  MEMORY_DELAY_MS,
  MEMORY_ENTRY_MS,
  MEMORY_SIZE_MS,
  memoryDuration,
  memoryFrame,
} from "./memoryTimeline";

const SIZES = 4;
const ENTRIES = 6;
const frame = (elapsed: number) => memoryFrame(elapsed, SIZES, ENTRIES);
const barsStart = MEMORY_DELAY_MS + SIZES * MEMORY_SIZE_MS;
const entriesStart = barsStart + MEMORY_BARS_MS;

test("the slide runs 7.5 s: delay, four sizes, the bars, six entries", () => {
  expect(memoryDuration(SIZES, ENTRIES)).toBe(7500);
});

test("nothing shows before the first beat", () => {
  expect(frame(0)).toEqual({ size: -1, bars: false, entries: 0, done: false });
  expect(frame(MEMORY_DELAY_MS - 1)).toMatchObject({ size: -1 });
});

test("the canvas steps through each size", () => {
  expect(frame(MEMORY_DELAY_MS)).toMatchObject({ size: 0, bars: false });
  expect(frame(MEMORY_DELAY_MS + MEMORY_SIZE_MS)).toMatchObject({ size: 1 });
  expect(frame(MEMORY_DELAY_MS + 3 * MEMORY_SIZE_MS)).toMatchObject({ size: 3, bars: false });
  expect(frame(barsStart - 1)).toMatchObject({ size: 3, bars: false });
});

test("the bars light once the last size has had its time, and stay lit", () => {
  expect(frame(barsStart)).toMatchObject({ size: 3, bars: true, entries: 0 });
  expect(frame(entriesStart - 1)).toMatchObject({ bars: true, entries: 0 });
});

test("one history entry lands per beat", () => {
  expect(frame(entriesStart)).toMatchObject({ entries: 1, done: false });
  expect(frame(entriesStart + MEMORY_ENTRY_MS)).toMatchObject({ entries: 2 });
  expect(frame(entriesStart + 5 * MEMORY_ENTRY_MS)).toMatchObject({ entries: 6, done: false });
});

test("at the end everything shows and it stays that way", () => {
  const end = memoryDuration(SIZES, ENTRIES);
  const final = { size: 3, bars: true, entries: 6, done: true };
  expect(frame(end)).toEqual(final);
  expect(frame(end + 10_000)).toEqual(final);
  expect(frame(end - 1)).toMatchObject({ entries: 6, done: false });
});
