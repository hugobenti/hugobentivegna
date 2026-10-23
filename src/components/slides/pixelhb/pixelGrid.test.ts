import { expect, test } from "vitest";
import { pixelFill } from "./PixelArt.style";
import { beside, cellStates, gridCells, gridRuns, gridSize } from "./pixelGrid";
import { HEART, LOCKUP, COMPUTER, PENCIL, WORDMARK } from "./pixelArt.data";

test("the brand grids have the sizes the brand spec gives", () => {
  expect(gridSize(PENCIL)).toEqual({ width: 33, height: 7 });
  expect(gridSize(WORDMARK)).toEqual({ width: 37, height: 7 });
  expect(gridSize(LOCKUP)).toEqual({ width: 74, height: 7 });
  expect(gridSize(HEART)).toEqual({ width: 12, height: 12 });
  expect(gridSize(COMPUTER)).toEqual({ width: 16, height: 16 });
});

test("runs merge same-key neighbours in a row", () => {
  expect(gridRuns([".yyY"])).toEqual([
    { x: 1, y: 0, width: 2, key: "y" },
    { x: 3, y: 0, width: 1, key: "Y" },
  ]);
});

test("cells are row-major, skip empty pixels and carry their index", () => {
  expect(gridCells([".d"])).toEqual([{ x: 1, y: 0, key: "d", index: 1 }]);
});

test("a ragged grid is rejected", () => {
  expect(() => gridSize(["..", "."])).toThrow("ragged grid");
});

test("every key used by the grids has a fill", () => {
  const used = new Set([...PENCIL, ...WORDMARK, ...LOCKUP, ...HEART, ...COMPUTER].join(""));
  used.delete(".");
  for (const key of used) expect(pixelFill).toHaveProperty(key);
});

test("beside puts grids top-aligned with a gap and pads the shorter one", () => {
  expect(beside(["a"], ["b", "c"], 1)).toEqual(["a.b", "..c"]);
});

test("cellStates turns on only the listed cells", () => {
  expect(cellStates(4, [1, 3])).toEqual(["off", "on", "off", "on"]);
  expect(cellStates(2, [])).toEqual(["off", "off"]);
});
