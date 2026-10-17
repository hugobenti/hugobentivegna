"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CENTRE_LINE } from "./viewport";

/** How often a playing animation advances; CSS transitions smooth the steps in between. */
export const TICK_MS = 100;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia?.(REDUCED_MOTION);
  query?.addEventListener("change", onChange);
  return () => query?.removeEventListener("change", onChange);
}

function subscribeToNothing() {
  return () => {};
}

/**
 * Slide-animation playback: `elapsed` runs towards `durationMs` while the element in `ref`
 * crosses the viewport's centre line, pauses when it moves off that line, and holds at the end.
 * Once the element leaves the screen it returns to 0, so coming back replays it. `toggle`
 * pauses and resumes, or replays once finished: the control WCAG 2.2.2 asks for when an
 * animation runs longer than 5 s. The server render and visitors who prefer reduced motion get
 * the end state (`still` marks the latter).
 */
export function usePlayback<T extends HTMLElement>(durationMs: number) {
  const ref = useRef<T>(null);
  const [elapsed, setElapsed] = useState(0);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  // Bumped by a replay, so the timer starts again after it stopped at the end.
  const [run, setRun] = useState(0);
  // Read by the timer, so a tick that lands after the element moved away changes nothing.
  const playing = useRef({ active: false, paused: false, elapsed: 0 });
  // false only while rendering on the server, so markup without JavaScript shows the end state.
  const hydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const still = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia?.(REDUCED_MOTION).matches ?? false,
    () => false,
  );

  useEffect(() => {
    const element = ref.current;
    if (still || !element) return;
    const centre = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          playing.current.active = entry.isIntersecting;
          setActive(entry.isIntersecting);
        }
      },
      { rootMargin: CENTRE_LINE },
    );
    const onScreen = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) continue;
        playing.current = { active: false, paused: false, elapsed: 0 };
        setActive(false);
        setPaused(false);
        setElapsed(0);
      }
    });
    centre.observe(element);
    onScreen.observe(element);
    return () => {
      centre.disconnect();
      onScreen.disconnect();
    };
  }, [still]);

  useEffect(() => {
    if (!active || still) return;
    const timer = setInterval(() => {
      if (!playing.current.active || playing.current.paused) return;
      const next = Math.min(playing.current.elapsed + TICK_MS, durationMs);
      playing.current.elapsed = next;
      setElapsed(next);
      if (next === durationMs) clearInterval(timer);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [active, still, durationMs, run]);

  const toggle = () => {
    if (playing.current.elapsed >= durationMs) {
      playing.current = { ...playing.current, paused: false, elapsed: 0 };
      setPaused(false);
      setElapsed(0);
      setRun((count) => count + 1);
      return;
    }
    playing.current.paused = !playing.current.paused;
    setPaused(playing.current.paused);
  };

  const shown = hydrated && !still ? elapsed : durationMs;
  return { ref, elapsed: shown, still, paused, finished: shown >= durationMs, toggle };
}
