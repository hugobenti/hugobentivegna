import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { site } from "@/content/site";
import {
  centreLineObserver,
  installFakeIntersectionObserver,
} from "@/test/fakeIntersectionObserver";
import { stubReducedMotion } from "@/test/reducedMotion";
import { PlaybackControl } from "@/design-system/ui";
import { usePlaybackControl } from "./usePlaybackControl";

const DURATION = 3000;

function Probe() {
  const { ref, control } = usePlaybackControl<HTMLDivElement>(DURATION);
  return (
    <div ref={ref}>
      <PlaybackControl {...control} />
    </div>
  );
}

const { pause, play, replay } = site.playback;

beforeEach(() => {
  installFakeIntersectionObserver();
  stubReducedMotion(false);
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

test("the label names the next action: Pause while playing, Play when paused, Replay at the end", () => {
  render(<Probe />);
  centreLineObserver().reportAll(true);
  act(() => vi.advanceTimersByTime(500));
  expect(screen.getByRole("button", { name: pause })).toBeInTheDocument();
  act(() => screen.getByRole("button", { name: pause }).click());
  expect(screen.getByRole("button", { name: play })).toBeInTheDocument();
  act(() => screen.getByRole("button", { name: play }).click());
  act(() => vi.advanceTimersByTime(DURATION));
  expect(screen.getByRole("button", { name: replay })).toBeInTheDocument();
});

test("offers no control when motion is reduced", () => {
  stubReducedMotion(true);
  render(<Probe />);
  expect(screen.queryByRole("button")).toBeNull();
});
