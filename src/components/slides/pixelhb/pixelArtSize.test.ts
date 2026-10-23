import { expect, test } from "vitest";
import { pixelArtSize } from "./PixelArt.style";
import { HEART, LOCKUP, COMPUTER } from "./pixelArt.data";
import { gridSize } from "./pixelGrid";
import type { TPixelGrid } from "./pixelGrid.type";

/** Tailwind's spacing unit in this repo: one step is 4 px. */
const UNIT_PX = 4;

const grids: Record<keyof typeof pixelArtSize, TPixelGrid> = {
  lockup: LOCKUP,
  drawing: COMPUTER,
  heart1x: HEART,
  heart2x: HEART,
  heart4x: HEART,
};

test("every size is a whole multiple of its grid on both axes, at every breakpoint", () => {
  for (const [name, classes] of Object.entries(pixelArtSize)) {
    const { width, height } = gridSize(grids[name as keyof typeof pixelArtSize]);
    const sizes = [...classes.matchAll(/(?:^|\s)(?:[a-z]+:)?([wh])-(\d+(?:\.\d+)?)(?=\s|$)/g)];
    expect(sizes.length, name).toBeGreaterThanOrEqual(2);
    for (const [, axis, steps] of sizes) {
      const px = Number(steps) * UNIT_PX;
      const cell = axis === "w" ? width : height;
      expect(px % cell, `${name}: ${axis}-${steps} = ${px}px of ${cell}`).toBe(0);
    }
  }
});
