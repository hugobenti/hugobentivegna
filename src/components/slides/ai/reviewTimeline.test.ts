import { expect, test } from "vitest";
import {
  REVIEW_CHECK_MS,
  REVIEW_FIXED_MS,
  REVIEW_MS,
  REVIEW_STAGE_MS,
  reviewFrame,
} from "./reviewTimeline";

const CHECKS = 4;
const [draft, review, fix, rule, checks, merged] = REVIEW_STAGE_MS;
const frame = (elapsed: number) => reviewFrame(elapsed, CHECKS);

test("six stages, in order, ending on merged", () => {
  expect(REVIEW_STAGE_MS).toHaveLength(6);
  expect([...REVIEW_STAGE_MS].sort((a, b) => a - b)).toEqual([...REVIEW_STAGE_MS]);
  expect(REVIEW_MS).toBe(merged);
});

test("before the draft lands, no stage is reached", () => {
  expect(frame(0)).toEqual({ stage: -1, removed: false, fixed: false, checksPassed: 0 });
});

test("draft, then the review comment", () => {
  expect(frame(draft)).toMatchObject({ stage: 0, removed: false });
  expect(frame(review)).toMatchObject({ stage: 1, removed: false, fixed: false });
});

test("the fix marks the old lines removed, then the new line lands", () => {
  expect(frame(fix)).toMatchObject({ stage: 2, removed: true, fixed: false });
  expect(frame(fix + REVIEW_FIXED_MS)).toMatchObject({ stage: 2, removed: true, fixed: true });
  expect(frame(rule)).toMatchObject({ stage: 3, fixed: true, checksPassed: 0 });
});

test("checks pass one by one, and never more than there are", () => {
  expect(frame(checks)).toMatchObject({ stage: 4, checksPassed: 1 });
  expect(frame(checks + REVIEW_CHECK_MS)).toMatchObject({ checksPassed: 2 });
  expect(frame(checks + 10 * REVIEW_CHECK_MS)).toMatchObject({ checksPassed: CHECKS });
});

test("merged at the end, and it holds", () => {
  const end = { stage: 5, removed: true, fixed: true, checksPassed: CHECKS };
  expect(frame(merged)).toEqual(end);
  expect(frame(merged + 5000)).toEqual(end);
});

test("every check passes before the merge", () => {
  expect(checks + (CHECKS - 1) * REVIEW_CHECK_MS).toBeLessThan(merged);
});
