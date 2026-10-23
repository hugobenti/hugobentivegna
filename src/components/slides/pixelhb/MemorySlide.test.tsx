import { act, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { pixelhbCase } from "@/content/cases";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { TICK_MS } from "../../deck/usePlayback";
import {
  MEMORY_BARS_MS,
  MEMORY_DELAY_MS,
  MEMORY_ENTRY_MS,
  MEMORY_SIZE_MS,
  memoryDuration,
} from "./memoryTimeline";
import { MemorySlide } from "./MemorySlide";

const { memory, controls } = pixelhbCase;
const { storage, history } = memory;
const size = (index: number) => storage.sizes[index] as (typeof storage.sizes)[number];
const duration = memoryDuration(storage.sizes.length, history.stroke.length);

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
const readout = (container: HTMLElement) =>
  (container.querySelector("[data-readout]") as HTMLElement).textContent;
const bars = (container: HTMLElement) =>
  [...container.querySelectorAll("[data-bar]")].map((bar) => bar.getAttribute("data-on"));
const entries = (container: HTMLElement) =>
  [...container.querySelectorAll("[data-entry]")].map((entry) => entry.getAttribute("data-on"));
const painted = (container: HTMLElement) =>
  [...container.querySelectorAll('[data-cell][data-painted="true"]')].map((cell) =>
    Number(cell.getAttribute("data-cell")),
  );

beforeEach(() => {
  installFakeIntersectionObserver();
  stubReducedMotion(false);
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("every size, bar value, history entry and the footer is in the page before it plays", () => {
  render(<MemorySlide />);
  expect(screen.getByRole("heading", { name: memory.title })).toBeInTheDocument();
  expect(screen.getByText(memory.body)).toBeInTheDocument();
  for (const size of storage.sizes) {
    expect(screen.getByText(size.label, { selector: ".sr-only *" })).toBeInTheDocument();
    expect(screen.getByText(size.pixels, { selector: ".sr-only *" })).toBeInTheDocument();
  }
  for (const bar of storage.bars) {
    expect(screen.getByText(bar.label)).toBeInTheDocument();
    expect(screen.getByText(bar.value)).toBeInTheDocument();
  }
  expect(screen.getByRole("heading", { name: history.title })).toBeInTheDocument();
  expect(screen.getByText(history.body)).toBeInTheDocument();
  const list = within(screen.getByRole("list", { name: history.label })).getAllByRole("listitem");
  expect(list.map((item) => item.textContent)).toEqual(history.stroke.map((s) => s.entry));
  expect(screen.getByText(history.footer)).toBeInTheDocument();
});

test("the removed next-step note is not on the slide", () => {
  const { container } = render(<MemorySlide />);
  expect(container.textContent).not.toMatch(/redraw/i);
});

test("before the slide is reached nothing has played", () => {
  const { container } = render(<MemorySlide />);
  advance(duration);
  expect(bars(container)).toEqual(["false", "false"]);
  expect(entries(container)).toEqual(history.stroke.map(() => "false"));
  expect(painted(container)).toEqual([]);
});

test("once active the readout steps through the sizes, then the bars light", () => {
  const { container } = render(<MemorySlide />);
  const readoutOn = () =>
    (container.querySelector("[data-readout]") as HTMLElement).getAttribute("data-on");
  start();
  advance(MEMORY_DELAY_MS - TICK_MS);
  expect(readoutOn()).toBe("false");
  advance(TICK_MS);
  expect(readoutOn()).toBe("true");
  expect(readout(container)).toContain(size(0).label);
  expect(readout(container)).toContain(size(0).pixels);
  advance(MEMORY_SIZE_MS);
  expect(readout(container)).toContain(size(1).label);
  advance(2 * MEMORY_SIZE_MS);
  expect(readout(container)).toContain("1000 × 1000");
  expect(bars(container)).toEqual(["false", "false"]);
  advance(MEMORY_SIZE_MS);
  expect(bars(container)).toEqual(["true", "true"]);
});

test("the square and the bars scale from CSS variables, so no panel changes size", () => {
  const { container } = render(<MemorySlide />);
  start();
  advance(MEMORY_DELAY_MS);
  expect(
    (container.querySelector("[data-square]") as HTMLElement).style.getPropertyValue("--scale"),
  ).toBe(String(size(0).scale));
  advance(3 * MEMORY_SIZE_MS + MEMORY_SIZE_MS);
  const fills = [...container.querySelectorAll("[data-bar-fill]")] as HTMLElement[];
  expect(fills.map((fill) => fill.style.getPropertyValue("--share"))).toEqual(
    storage.bars.map((bar) => String(bar.share)),
  );
});

test("entries land one by one and paint the stroke's pixels", () => {
  const { container } = render(<MemorySlide />);
  start();
  advance(MEMORY_DELAY_MS + storage.sizes.length * MEMORY_SIZE_MS + MEMORY_BARS_MS);
  expect(entries(container)[0]).toBe("true");
  expect(painted(container)).toEqual([(history.stroke[0] as { index: number }).index]);
  advance(MEMORY_ENTRY_MS + TICK_MS);
  expect(painted(container)).toEqual(history.stroke.slice(0, 2).map((s) => s.index));
  advance(duration);
  expect(entries(container)).toEqual(history.stroke.map(() => "true"));
  expect(painted(container)).toEqual(history.stroke.map((s) => s.index));
  expect(screen.getByRole("button", { name: controls.replay })).toBeInTheDocument();
});

test("the control pauses the slide and resumes it", () => {
  const { container } = render(<MemorySlide />);
  start();
  advance(MEMORY_DELAY_MS);
  act(() => screen.getByRole("button", { name: controls.pause }).click());
  advance(duration);
  expect(readout(container)).toContain(size(0).label);
  act(() => screen.getByRole("button", { name: controls.play }).click());
  advance(duration);
  expect(entries(container)).toEqual(history.stroke.map(() => "true"));
});

test("with reduced motion the end state shows at once and there is nothing to control", () => {
  stubReducedMotion(true);
  const { container } = render(<MemorySlide />);
  expect(readout(container)).toContain("1000 × 1000");
  expect(bars(container)).toEqual(["true", "true"]);
  expect(entries(container)).toEqual(history.stroke.map(() => "true"));
  expect(screen.queryAllByRole("button")).toEqual([]);
});

test("without JavaScript the page shows the end state and no control that couldn't work", () => {
  const html = renderToString(<MemorySlide />);
  for (const label of Object.values(controls)) {
    expect(html).not.toMatch(new RegExp(`<button[^>]*>${label}</button>`));
  }
  expect(html).not.toContain('data-on="false"');
  expect(html).toContain(history.footer);
});
