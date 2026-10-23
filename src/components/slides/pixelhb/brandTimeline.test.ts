import { expect, test } from "vitest";
import {
  BRAND_ASSET_MS,
  BRAND_COLUMN_MS,
  BRAND_DELAY_MS,
  BRAND_DOT_MS,
  brandDuration,
  brandFrame,
} from "./brandTimeline";

const COLUMNS = 33;
const ASSETS = 3;
const frame = (elapsed: number) => brandFrame(elapsed, COLUMNS, ASSETS);
const columnsEnd = BRAND_DELAY_MS + COLUMNS * BRAND_COLUMN_MS;
const dotEnd = columnsEnd + BRAND_DOT_MS;

test("the pencil, the drawn pixel and three assets take 4 330 ms", () => {
  expect(brandDuration(COLUMNS, ASSETS)).toBe(4330);
});

test("nothing is drawn before the delay", () => {
  expect(frame(0)).toEqual({ columns: 0, dot: false, assets: 0, done: false });
  expect(frame(BRAND_DELAY_MS - 1).columns).toBe(0);
});

test("one column every 60 ms, left to right", () => {
  expect(frame(BRAND_DELAY_MS).columns).toBe(1);
  expect(frame(BRAND_DELAY_MS + BRAND_COLUMN_MS).columns).toBe(2);
  expect(frame(columnsEnd - 1).columns).toBe(COLUMNS);
});

test("the drawn pixel lands only after the last column's beat", () => {
  expect(frame(dotEnd - 1).dot).toBe(false);
  expect(frame(dotEnd)).toMatchObject({ columns: COLUMNS, dot: true, assets: 1 });
});

test("then each asset appears in turn", () => {
  expect(frame(dotEnd + BRAND_ASSET_MS).assets).toBe(2);
  expect(frame(dotEnd + 2 * BRAND_ASSET_MS - 1).assets).toBe(2);
  expect(frame(dotEnd + 2 * BRAND_ASSET_MS).assets).toBe(3);
});

test("it holds the end state", () => {
  const end = { columns: COLUMNS, dot: true, assets: ASSETS, done: true };
  expect(frame(brandDuration(COLUMNS, ASSETS))).toEqual(end);
  expect(frame(brandDuration(COLUMNS, ASSETS) + 5000)).toEqual(end);
});
