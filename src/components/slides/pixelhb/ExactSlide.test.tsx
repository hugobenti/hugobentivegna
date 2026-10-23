import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { pixelhbCase } from "@/content/cases";
import { site } from "@/content/site";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { stubReducedMotion } from "@/test/reducedMotion";
import { EXACT_DELAY_MS, EXACT_STEP_MS, exactDuration } from "./exactTimeline";
import { ExactSlide } from "./ExactSlide";
import { pixelBlue } from "./PixelArt.style";
import { LOUPE_RADIUS } from "./useExactScene";

const { exact } = pixelhbCase;
const controls = site.playback;
const duration = exactDuration(exact.tools.length);

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const start = () => centreLineObserver().reportAll(true);
const lit = (container: HTMLElement) =>
  [...container.querySelectorAll("[data-card]")].map((card) => card.getAttribute("data-on"));
/** Per heart in the fill demo: is its blue filled ("full"), not at all ("empty"), or partly? */
const hearts = (container: HTMLElement) =>
  [...container.querySelectorAll('[data-demo="fill"] svg')].map((svg) => {
    const blue = [...svg.querySelectorAll('rect[data-key="r"]')];
    const on = blue.filter((rect) => rect.getAttribute("data-state") === "on").length;
    return on === 0 ? "empty" : on === blue.length ? "full" : "partial";
  });

beforeEach(() => {
  installFakeIntersectionObserver();
  stubReducedMotion(false);
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("the title, body, every tool and each demo's label are in the page before it plays", () => {
  render(<ExactSlide />);
  expect(screen.getByRole("heading", { name: exact.title })).toBeInTheDocument();
  expect(screen.getByText(exact.body)).toBeInTheDocument();
  for (const tool of exact.tools) {
    expect(screen.getByRole("heading", { name: tool.name })).toBeInTheDocument();
    expect(screen.getByText(tool.body)).toBeInTheDocument();
  }
  expect(screen.getAllByText(exact.illustration)).toHaveLength(exact.tools.length);
});

test("both links are there from the start and open in a new tab", () => {
  render(<ExactSlide />);
  for (const link of [exact.live, exact.code]) {
    const anchor = screen.getByRole("link", { name: new RegExp(link.label) });
    expect(anchor).toHaveAttribute("href", link.href);
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor.getAttribute("rel")).toContain("noopener");
  }
  expect(exact.live.href).toBe("https://pixelhb.vercel.app");
  expect(exact.code.href).toBe("https://github.com/hugobenti/pixelHB");
});

test("before the slide is reached no card is lit and the fill is empty", () => {
  const { container } = render(<ExactSlide />);
  advance(duration);
  expect(lit(container)).toEqual(["false", "false", "false", "false"]);
  expect(hearts(container)).toEqual(["empty", "empty", "empty"]);
});

test("once active the cards light in order, one per beat, and stay lit", () => {
  const { container } = render(<ExactSlide />);
  start();
  advance(EXACT_DELAY_MS);
  expect(lit(container)).toEqual(["true", "false", "false", "false"]);
  const states = () =>
    [...container.querySelectorAll("[data-card]")].map((card) => card.getAttribute("data-state"));
  expect(states()).toEqual(["current", "idle", "idle", "idle"]);
  advance(EXACT_STEP_MS);
  expect(lit(container)).toEqual(["true", "true", "false", "false"]);
  expect(states()).toEqual(["done", "current", "idle", "idle"]);
  advance(2 * EXACT_STEP_MS);
  expect(lit(container)).toEqual(["true", "true", "true", "true"]);
});

test("the fill fills three hearts one after another, each whole in one go", () => {
  const { container } = render(<ExactSlide />);
  start();
  advance(EXACT_DELAY_MS + 2 * EXACT_STEP_MS);
  const seen = [hearts(container)];
  for (let step = 0; step < 24; step++) {
    advance(EXACT_STEP_MS / 24);
    seen.push(hearts(container));
  }
  expect(seen.flat()).not.toContain("partial");
  expect(seen[0]).toEqual(["empty", "empty", "empty"]);
  const distinct = [...new Set(seen.map((state) => state.join()))];
  expect(distinct).toEqual([
    "empty,empty,empty",
    "full,empty,empty",
    "full,full,empty",
    "full,full,full",
  ]);
  for (const svg of container.querySelectorAll('[data-demo="fill"] svg')) {
    const shade = [...svg.querySelectorAll('rect[data-key="b"]')];
    expect(shade.length).toBeGreaterThan(0);
    expect(shade.every((rect) => rect.getAttribute("data-state") === "on")).toBe(true);
  }
});

test("at the end every card is lit, the whole fill shows and the control offers a replay", () => {
  const { container } = render(<ExactSlide />);
  start();
  advance(duration);
  expect(lit(container)).toEqual(["true", "true", "true", "true"]);
  expect(hearts(container)).toEqual(["full", "full", "full"]);
  expect(screen.getByRole("button", { name: controls.replay })).toBeInTheDocument();
});

test("the loupe picks the heart's second blue and compares it with the main blue", () => {
  const { container } = render(<ExactSlide />);
  const patch = container.querySelector('[data-demo="loupe"] svg') as SVGElement;
  const side = 2 * LOUPE_RADIUS + 1;
  expect(patch.getAttribute("viewBox")).toBe(`0 0 ${side} ${side}`);
  const centre = [...patch.querySelectorAll("rect")].find(
    (rect) =>
      Number(rect.getAttribute("y")) === LOUPE_RADIUS &&
      Number(rect.getAttribute("x")) <= LOUPE_RADIUS &&
      Number(rect.getAttribute("x")) + Number(rect.getAttribute("width")) > LOUPE_RADIUS,
  );
  const picked = centre?.getAttribute("data-key") as keyof typeof pixelBlue;
  expect(picked).toBe("b");
  // The ring's top half shows the picked pixel's color; the bottom half is the main blue in hand.
  expect(container.querySelector("[data-ring-top]")).toHaveClass(pixelBlue[picked].bg);
  expect(container.querySelector("[data-ring-bottom]")).toHaveClass(pixelBlue.r.bg);
});

test("the control pauses the slide and resumes it", () => {
  const { container } = render(<ExactSlide />);
  start();
  advance(EXACT_DELAY_MS);
  act(() => screen.getByRole("button", { name: controls.pause }).click());
  advance(duration);
  expect(lit(container)).toEqual(["true", "false", "false", "false"]);
  act(() => screen.getByRole("button", { name: controls.play }).click());
  advance(duration);
  expect(lit(container)).toEqual(["true", "true", "true", "true"]);
});

test("with reduced motion the end state shows at once and there is no control", () => {
  stubReducedMotion(true);
  const { container } = render(<ExactSlide />);
  expect(lit(container)).toEqual(["true", "true", "true", "true"]);
  expect(hearts(container)).toEqual(["full", "full", "full"]);
  expect(screen.queryByRole("button")).toBeNull();
  expect(screen.getAllByRole("link")).toHaveLength(2);
});

test("without JavaScript the page shows the end state and no control that couldn't work", () => {
  const html = renderToString(<ExactSlide />);
  for (const label of Object.values(controls)) {
    expect(html).not.toMatch(new RegExp(`<button[^>]*>${label}</button>`));
  }
  expect(html).not.toContain('data-on="false"');
  expect(html).toContain(exact.live.href);
});
