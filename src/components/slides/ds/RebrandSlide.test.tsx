import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { designSystemCase } from "@/content/cases";
import { site } from "@/content/site";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { stubReducedMotion } from "@/test/reducedMotion";
import { RebrandSlide } from "./RebrandSlide";
import { ACT1_MS, ACT2_START_MS, DEV_FINISH_MS, SCENE_MS } from "./rebrandTimeline";

const { rebrand } = designSystemCase;

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const start = () => centreLineObserver().reportAll(true);
const rebranded = (container: HTMLElement) =>
  container.querySelectorAll('[data-rebranded="true"]').length;
const activeFlag = (container: HTMLElement) =>
  container.querySelector('[data-flag][data-active="true"]')?.textContent;

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
  const scene = container.querySelector("[inert]");
  expect(scene).toHaveAttribute("aria-hidden", "true");
  expect(screen.queryAllByRole("radio")).toEqual([]);
});

test("one slide plays act 1, then act 2, and flags which one is showing", () => {
  const { container } = render(<RebrandSlide />);
  start();
  expect(activeFlag(container)).toBe(rebrand.acts.without.label);
  advance(ACT1_MS);
  expect(rebranded(container)).toBe(6);
  advance(ACT2_START_MS - ACT1_MS);
  expect(activeFlag(container)).toBe(rebrand.acts.with.label);
  expect(rebranded(container)).toBe(0);
  advance(SCENE_MS);
  expect(rebranded(container)).toBe(6);
  expect(container).toHaveTextContent(rebrand.system.released);
});

test("the pause button stops the scene, and play resumes it", () => {
  const { container } = render(<RebrandSlide />);
  start();
  advance(1700);
  const before = rebranded(container);
  act(() => screen.getByRole("button", { name: site.playback.pause }).click());
  advance(3000);
  expect(rebranded(container)).toBe(before);
  expect(container.querySelectorAll('[data-playing="true"]')).toHaveLength(0);
  act(() => screen.getByRole("button", { name: site.playback.play }).click());
  // Resumes from 1.7 s, so act 1 ends after the remaining time, not a full act.
  advance(ACT1_MS - 1700);
  expect(rebranded(container)).toBe(6);
});

test("once finished, the button replays the scene from act 1", () => {
  const { container } = render(<RebrandSlide />);
  start();
  advance(SCENE_MS);
  act(() => screen.getByRole("button", { name: site.playback.replay }).click());
  expect(activeFlag(container)).toBe(rebrand.acts.without.label);
  expect(rebranded(container)).toBe(0);
});

test("the scene only animates while it plays, never while it waits or holds", () => {
  const { container } = render(<RebrandSlide />);
  const playing = () => container.querySelectorAll('[data-playing="true"]').length;
  expect(playing()).toBe(0);
  start();
  advance(1000);
  expect(playing()).toBe(1);
  advance(SCENE_MS);
  expect(playing()).toBe(0);
});

test("reduced motion shows both acts at their end, with nothing to pause", () => {
  stubReducedMotion(true);
  const { container } = render(<RebrandSlide />);
  expect(rebranded(container)).toBe(12);
  expect(container.querySelectorAll('[data-state="working"]')).toHaveLength(0);
  expect(screen.queryByRole("button", { name: site.playback.pause })).toBeNull();
});

test("the content has one product per developer timing", () => {
  expect(rebrand.products).toHaveLength(DEV_FINISH_MS.length);
});
