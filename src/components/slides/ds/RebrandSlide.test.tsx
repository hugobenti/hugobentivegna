import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { designSystemCase } from "@/content/cases";
import {
  FakeIntersectionObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { RebrandSlide } from "./RebrandSlide";
import { ACT1_MS, ACT2_MS, DEV_FINISH_MS } from "./rebrandTimeline";

const { rebrand } = designSystemCase;

function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("reduce"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
}

/** Reports a step's scene crossing (or leaving) the centre line, through its own observer. */
function reportStep(step: number, visible: boolean) {
  const selector = `[data-step="${step}"] [data-playback]`;
  const observer = FakeIntersectionObserver.instances.find((instance) =>
    instance.observed.some((element) => element.matches(selector)),
  );
  if (!observer) throw new Error(`no observer for step ${step}`);
  observer.report(selector, visible);
}

const rebrandedIn = (container: HTMLElement, act: "without" | "with") =>
  container.querySelectorAll(`[data-act="${act}"] [data-rebranded="true"]`).length;

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
    expect(screen.getByText(text)).toBeInTheDocument();
  }
  expect(screen.getByText(rebrand.acts.without.summary)).toBeInTheDocument();
  expect(screen.getByText(rebrand.acts.with.summary)).toBeInTheDocument();
  const scenes = container.querySelectorAll("[inert]");
  expect(scenes).toHaveLength(2);
  scenes.forEach((scene) => expect(scene).toHaveAttribute("aria-hidden", "true"));
  expect(screen.queryAllByRole("radio")).toEqual([]);
});

test("each act plays only while its own step is on screen", () => {
  const { container } = render(<RebrandSlide />);
  reportStep(0, true);
  act(() => vi.advanceTimersByTime(ACT1_MS));
  expect(rebrandedIn(container, "without")).toBe(6);
  expect(rebrandedIn(container, "with")).toBe(0);

  reportStep(0, false);
  reportStep(1, true);
  act(() => vi.advanceTimersByTime(ACT2_MS));
  expect(rebrandedIn(container, "with")).toBe(6);
  expect(container).toHaveTextContent(rebrand.system.released);
  // Act 1 is still on screen above, so it keeps its end state.
  expect(rebrandedIn(container, "without")).toBe(6);
});

test("an act only animates while it plays, never while it waits or holds", () => {
  const { container } = render(<RebrandSlide />);
  const playing = () => container.querySelectorAll('[data-playing="true"]').length;
  expect(playing()).toBe(0);
  reportStep(0, true);
  act(() => vi.advanceTimersByTime(1000));
  expect(playing()).toBe(1);
  act(() => vi.advanceTimersByTime(ACT1_MS));
  expect(playing()).toBe(0);
});

test("reduced motion shows each act at its end", () => {
  stubReducedMotion(true);
  const { container } = render(<RebrandSlide />);
  expect(rebrandedIn(container, "without")).toBe(6);
  expect(rebrandedIn(container, "with")).toBe(6);
  expect(container.querySelectorAll('[data-state="working"]')).toHaveLength(0);
});

test("the content has one product per developer timing", () => {
  expect(rebrand.products).toHaveLength(DEV_FINISH_MS.length);
});
