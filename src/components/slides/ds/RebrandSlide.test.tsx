import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { designSystemCase } from "@/content/cases";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { RebrandSlide } from "./RebrandSlide";
import { DEV_FINISH_MS, SCENE_MS } from "./rebrandTimeline";

const { rebrand } = designSystemCase;

function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("reduce"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
}

const products = (container: HTMLElement, rebranded: boolean) =>
  container.querySelectorAll(`[data-rebranded="${rebranded}"]`);

beforeEach(() => {
  installFakeIntersectionObserver();
  stubReducedMotion(false);
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("the outcome is readable without watching the scene", () => {
  const { container } = render(<RebrandSlide />);
  for (const text of [rebrand.title, rebrand.lead, rebrand.closing]) {
    expect(screen.getByText(text)).toBeVisible();
  }
  expect(screen.getByText(rebrand.acts.without.summary)).toBeInTheDocument();
  expect(screen.getByText(rebrand.acts.with.summary)).toBeInTheDocument();
  const scene = container.querySelector("[inert]");
  expect(scene).toHaveAttribute("aria-hidden", "true");
  expect(scene).toContainElement(container.querySelector("[data-rebranded]") as HTMLElement);
  expect(screen.queryAllByRole("radio")).toEqual([]);
});

test("once active, act 1 gives way to act 2 and every product ends rebranded", () => {
  const { container } = render(<RebrandSlide />);
  centreLineObserver().report("[data-playback]", true);
  expect(products(container, false)).toHaveLength(6);
  expect(container).toHaveTextContent(rebrand.developers.without);
  act(() => vi.advanceTimersByTime(SCENE_MS));
  expect(products(container, true)).toHaveLength(6);
  expect(container).toHaveTextContent(rebrand.developers.with);
  expect(container).toHaveTextContent(rebrand.system.released);
});

test("reduced motion shows both acts at their end, side by side", () => {
  stubReducedMotion(true);
  const { container } = render(<RebrandSlide />);
  expect(container).toHaveTextContent(rebrand.acts.without.title);
  expect(container).toHaveTextContent(rebrand.acts.with.title);
  expect(products(container, true)).toHaveLength(12);
  expect(container.querySelectorAll('[data-state="working"]')).toHaveLength(0);
});

test("the content has one product per developer timing", () => {
  expect(rebrand.products).toHaveLength(DEV_FINISH_MS.length);
});
