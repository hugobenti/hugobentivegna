import { act, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { pixelhbCase } from "@/content/cases";
import { site } from "@/content/site";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { focusables } from "@/test/focusables";
import { stubReducedMotion } from "@/test/reducedMotion";
import { EXACT_DELAY_MS, EXACT_STEP_MS, exactDuration } from "./exactTimeline";
import { ExactSlide } from "./ExactSlide";
import { pixelAccent, pixelArtSize } from "./PixelArt.style";
import { LOUPE_RADIUS } from "./useExactScene";

const { exact } = pixelhbCase;
const controls = site.playback;
const duration = exactDuration(exact.tools.length);

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const start = () => centreLineObserver().reportAll(true);
const lit = (container: HTMLElement) =>
  [...container.querySelectorAll("[data-card]")].map((card) => card.getAttribute("data-on"));
/** Per heart in the fill demo: is its amber filled ("full"), not at all ("empty"), or partly? */
const hearts = (container: HTMLElement) =>
  [...container.querySelectorAll('[data-demo="fill"] svg')].map((svg) => {
    const amber = [...svg.querySelectorAll('rect[data-key="r"]')];
    const on = amber.filter((rect) => rect.getAttribute("data-state") === "on").length;
    return on === 0 ? "empty" : on === amber.length ? "full" : "partial";
  });
/** The elements matching `selector` in the `name` demo that show: no box inside the demo is off. */
const shown = (container: HTMLElement, name: string, selector: string) => {
  const demo = container.querySelector(`[data-demo="${name}"]`) as HTMLElement;
  return [...demo.querySelectorAll(selector)].filter((element) => {
    const off = element.closest('[data-on="false"]');
    return !off || !demo.contains(off);
  });
};
/** How many of each demo's pieces show: zoom hearts, grid heart and lines, fill hearts, ring, lens. */
const pieces = (container: HTMLElement) => ({
  zoom: shown(container, "zoom", "svg").length,
  gridHeart: shown(container, "grid", "svg").length,
  gridLines: shown(container, "grid", "[data-grid]").length,
  fill: shown(container, "fill", "svg").length,
  ring: shown(container, "loupe", "[data-ring-top], [data-ring-bottom]").length,
  lens: shown(container, "loupe", "svg").length,
});
const FIRST_FRAME = { zoom: 1, gridHeart: 1, gridLines: 0, fill: 3, ring: 2, lens: 0 };
const LAST_FRAME = { zoom: 3, gridHeart: 1, gridLines: 1, fill: 3, ring: 2, lens: 1 };

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

test("under the links, the real editor: a screenshot described in words and marked as one", () => {
  render(<ExactSlide />);
  const shot = screen.getByRole("img", { name: exact.shot.alt });
  expect(shot.tagName).toBe("IMG");
  expect(shot.getAttribute("src")).toContain("pixelhb-editor.webp");
  const figure = shot.closest("figure") as HTMLElement;
  expect(within(figure).getByText(exact.shot.caption)).toBeInTheDocument();
  // It sits in the copy column, with the links, not among the illustrated tool cards.
  const column = screen.getByRole("link", { name: new RegExp(exact.live.label) }).closest("div")
    ?.parentElement as HTMLElement;
  expect(column).toContainElement(figure);
  expect(figure.closest("[data-panel]")).toBeNull();
});

test("at elapsed 0, every tool card shows its first frame", () => {
  const { container } = render(<ExactSlide />);
  // Before the slide is reached, and the moment it enters: no demo box is ever empty.
  expect(pieces(container)).toEqual(FIRST_FRAME);
  start();
  expect(pieces(container)).toEqual(FIRST_FRAME);
  // Zoom: the 1× heart. Grid: the heart, no grid. Fill: the outlined hearts. Loupe: the ring.
  expect(shown(container, "zoom", "svg")[0]).toHaveClass(pixelArtSize.heart1x);
  expect(hearts(container)).toEqual(["empty", "empty", "empty"]);
  for (const svg of shown(container, "fill", "svg")) {
    const outline = [...svg.querySelectorAll("rect")].filter(
      (rect) => rect.getAttribute("data-key") !== "r",
    );
    expect(outline.length).toBeGreaterThan(0);
    expect(outline.every((rect) => rect.getAttribute("data-state") === "on")).toBe(true);
  }
  // Each card completes its demo on its turn and keeps it.
  advance(EXACT_DELAY_MS);
  expect(pieces(container)).toMatchObject({ zoom: 3, gridLines: 0, lens: 0 });
  advance(duration);
  expect(pieces(container)).toEqual(LAST_FRAME);
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

test("the loupe picks the heart's second amber and compares it with the main amber", () => {
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
  const picked = centre?.getAttribute("data-key") as keyof typeof pixelAccent;
  expect(picked).toBe("b");
  // The ring's top half shows the picked pixel's color; the bottom half is the main amber in hand.
  expect(container.querySelector("[data-ring-top]")).toHaveClass(pixelAccent[picked].bg);
  expect(container.querySelector("[data-ring-bottom]")).toHaveClass(pixelAccent.r.bg);
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
  expect(pieces(container)).toEqual(LAST_FRAME);
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

test("the playback control is the last focusable element inside the panel", () => {
  const { container } = render(<ExactSlide />);
  start();
  const panel = container.querySelector("[data-panel]") as HTMLElement;
  expect(panel).not.toBeNull();
  const last = focusables(panel).at(-1);
  const control = within(panel).getByRole("button", { name: controls.pause });
  expect(last).toBe(control);
  const content = panel.querySelector("ul") as HTMLElement;
  expect(content.compareDocumentPosition(control) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  const column = container.querySelector("[data-panel]")?.previousElementSibling as HTMLElement;
  expect(column.contains(last ?? null)).toBe(false);
});
