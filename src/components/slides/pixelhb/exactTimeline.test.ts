import { expect, test } from "vitest";
import {
  EXACT_DELAY_MS,
  EXACT_STEP_MS,
  exactCard,
  exactDuration,
  exactFillCount,
  exactFrame,
} from "./exactTimeline";

const CARDS = 4;
const frame = (elapsed: number) => exactFrame(elapsed, CARDS);

test("the slide runs 10.3 s: a delay and four 2.4 s cards", () => {
  expect(exactDuration(CARDS)).toBe(10300);
});

test("no card is lit before the delay", () => {
  expect(frame(0)).toEqual({ current: null, progress: 0, all: false });
  expect(frame(EXACT_DELAY_MS - 1)).toMatchObject({ current: null, all: false });
});

test("cards light one after another", () => {
  expect(frame(EXACT_DELAY_MS)).toEqual({ current: 0, progress: 0, all: false });
  expect(frame(EXACT_DELAY_MS + EXACT_STEP_MS / 2)).toMatchObject({ current: 0, progress: 0.5 });
  expect(frame(EXACT_DELAY_MS + EXACT_STEP_MS)).toMatchObject({ current: 1, progress: 0 });
  expect(frame(EXACT_DELAY_MS + 3 * EXACT_STEP_MS)).toMatchObject({ current: 3 });
});

test("at the end every card is lit and the slide holds", () => {
  const end = exactDuration(CARDS);
  expect(frame(end - 1)).toMatchObject({ current: 3, all: false });
  expect(frame(end)).toMatchObject({ current: null, all: true });
  expect(frame(end + 5000)).toMatchObject({ current: null, all: true });
});

test("a card is idle until reached, current while it plays, done after", () => {
  expect(exactCard(frame(0), 0)).toBe("idle");
  expect(exactCard(frame(EXACT_DELAY_MS + EXACT_STEP_MS), 0)).toBe("done");
  expect(exactCard(frame(EXACT_DELAY_MS + EXACT_STEP_MS), 1)).toBe("current");
  expect(exactCard(frame(EXACT_DELAY_MS + EXACT_STEP_MS), 2)).toBe("idle");
  expect(exactCard(frame(exactDuration(CARDS)), 3)).toBe("done");
});

test("the three hearts fill one after another, after a beat, and stay filled", () => {
  const start = EXACT_DELAY_MS + 2 * EXACT_STEP_MS;
  const counts = Array.from({ length: 25 }, (_, step) =>
    exactFillCount(frame(start + (step * EXACT_STEP_MS) / 24), 2, 3),
  );
  expect(exactFillCount(frame(start - 1), 2, 3)).toBe(0);
  expect(counts[0]).toBe(0);
  const steps = counts.slice(1).map((count, step) => count - (counts[step] ?? 0));
  expect(steps.every((change) => change === 0 || change === 1)).toBe(true);
  expect(new Set(counts)).toEqual(new Set([0, 1, 2, 3]));
  expect(exactFillCount(frame(exactDuration(CARDS)), 2, 3)).toBe(3);
});
