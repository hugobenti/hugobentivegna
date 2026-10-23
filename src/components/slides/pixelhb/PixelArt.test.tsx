import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { LOCKUP } from "./pixelArt.data";
import { PixelArt } from "./PixelArt";
import { gridCells } from "./pixelGrid";

test("draws the grid as one named, crisp svg", () => {
  render(<PixelArt grid={LOCKUP} label="PixelHB" size="lockup" />);
  const svg = screen.getByRole("img", { name: "PixelHB" });
  expect(svg).toHaveAttribute("viewBox", "0 0 74 7");
  expect(svg).toHaveAttribute("shape-rendering", "crispEdges");
});

test("colors come from classes, never a raw fill attribute", () => {
  const { container } = render(<PixelArt grid={LOCKUP} label="PixelHB" size="lockup" />);
  const rects = container.querySelectorAll("rect");
  expect(rects.length).toBeGreaterThan(0);
  for (const rect of rects) expect(rect).not.toHaveAttribute("fill");
});

test("cells mode draws one rect per pixel", () => {
  const { container } = render(<PixelArt grid={LOCKUP} label="PixelHB" size="lockup" cells />);
  expect(container.querySelectorAll("rect")).toHaveLength(gridCells(LOCKUP).length);
});
