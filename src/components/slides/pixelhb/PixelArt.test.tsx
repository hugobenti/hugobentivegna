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

test("cell state marks each cell by its index and leaves other drawings alone", () => {
  const grid = ["y.y"];
  const { container, rerender } = render(
    <PixelArt grid={grid} label="Two" size="heart1x" cells cellState={["on", "off", "off"]} />,
  );
  const rects = [...container.querySelectorAll("rect")];
  expect(rects.map((rect) => rect.getAttribute("data-state"))).toEqual(["on", "off"]);
  expect(rects.map((rect) => rect.getAttribute("data-index"))).toEqual(["0", "2"]);
  rerender(<PixelArt grid={grid} label="Two" size="heart1x" cells />);
  expect(container.querySelector("rect")).not.toHaveAttribute("data-state");
});
