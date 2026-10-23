import { act, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { pixelhbCase } from "@/content/cases";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { TICK_MS } from "../../deck/usePlayback";
import { BRAND_COLUMN_MS, BRAND_DELAY_MS, BRAND_DOT_MS, brandDuration } from "./brandTimeline";
import { BrandSlide } from "./BrandSlide";
import { PENCIL } from "./pixelArt.data";
import { gridSize } from "./pixelGrid";

const { brand } = pixelhbCase;
const { width } = gridSize(PENCIL);
const duration = brandDuration(width, brand.assets.length);

function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("reduce"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
}

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const start = () => centreLineObserver().report("[data-playback]", true);
const pencil = (container: HTMLElement) =>
  [...container.querySelectorAll('svg[viewBox="0 0 33 7"] rect')] as SVGRectElement[];
const column = (container: HTMLElement, x: number) =>
  pencil(container).filter((rect) => Number(rect.getAttribute("x")) === x);
const states = (rects: SVGRectElement[]) => rects.map((rect) => rect.getAttribute("data-state"));
const drawnPixel = (container: HTMLElement) =>
  pencil(container).find((rect) => rect.getAttribute("data-key") === "d") as SVGRectElement;
const shownAssets = (container: HTMLElement) =>
  container.querySelectorAll('[data-asset][data-on="true"]').length;

beforeEach(() => {
  installFakeIntersectionObserver();
  stubReducedMotion(false);
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("copy, rules and asset labels are in the page before it plays", () => {
  render(<BrandSlide />);
  expect(screen.getByRole("heading", { name: brand.title })).toBeInTheDocument();
  expect(screen.getByText(brand.body)).toBeInTheDocument();
  const rules = within(screen.getByRole("list", { name: brand.rulesLabel })).getAllByRole(
    "listitem",
  );
  expect(rules.map((rule) => rule.textContent)).toEqual(brand.rules);
  for (const asset of brand.assets) expect(screen.getByText(asset.label)).toBeInTheDocument();
});

test("before the slide is reached every pencil cell is off", () => {
  const { container } = render(<BrandSlide />);
  advance(duration);
  const cells = pencil(container);
  expect(cells.length).toBeGreaterThan(0);
  expect(new Set(states(cells))).toEqual(new Set(["off"]));
  expect(shownAssets(container)).toBe(0);
});

test("once active the pencil draws column by column, and the drawn pixel lands last", () => {
  const { container } = render(<BrandSlide />);
  start();
  advance(BRAND_DELAY_MS);
  expect(new Set(states(column(container, 0)))).toEqual(new Set(["on"]));
  expect(new Set(states(column(container, 1)))).toEqual(new Set(["off"]));
  advance((width - 1) * BRAND_COLUMN_MS);
  expect(column(container, 29)).not.toHaveLength(0);
  expect(new Set(states(column(container, 29)))).toEqual(new Set(["on"]));
  expect(drawnPixel(container)).toHaveAttribute("data-state", "off");
  advance(BRAND_COLUMN_MS + BRAND_DOT_MS + TICK_MS);
  expect(drawnPixel(container)).toHaveAttribute("data-state", "on");
});

test("at the end every cell is on, every asset shows and there is no control", () => {
  const { container } = render(<BrandSlide />);
  start();
  advance(duration + 1000);
  expect(new Set(states(pencil(container)))).toEqual(new Set(["on"]));
  expect(shownAssets(container)).toBe(brand.assets.length);
  expect(screen.queryAllByRole("button")).toEqual([]);
  expect(screen.getByText(brand.done, { selector: ".sr-only" })).toBeInTheDocument();
});

test("with reduced motion everything is on from the start", () => {
  stubReducedMotion(true);
  const { container } = render(<BrandSlide />);
  expect(new Set(states(pencil(container)))).toEqual(new Set(["on"]));
  expect(shownAssets(container)).toBe(brand.assets.length);
  expect(screen.queryAllByRole("button")).toEqual([]);
});

test("without JavaScript the page shows the finished mark", () => {
  const html = renderToString(<BrandSlide />);
  expect(html).not.toContain('data-state="off"');
  expect(html).not.toContain('data-on="false"');
  expect(html).toContain(brand.done);
});
