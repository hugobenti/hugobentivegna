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

/**
 * Watch-only playback for a slide animation: `elapsed` runs from 0 to `durationMs` while the
 * element in `ref` crosses the viewport's centre line, holds at the end, and returns to 0 when
 * the element leaves, so coming back replays it. The server render and visitors who prefer
 * reduced motion get the end state (`still` marks the latter).
 */
export function usePlayback<T extends HTMLElement>(durationMs: number) {
  const ref = useRef<T>(null);
  const [elapsed, setElapsed] = useState(0);
  const [active, setActive] = useState(false);
  // false only while rendering on the server, so markup without JavaScript shows the end state.
  const hydrated = useSyncExternalStore(
    () => () => {},
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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setActive(entry.isIntersecting);
          if (!entry.isIntersecting) setElapsed(0);
        }
      },
      { rootMargin: CENTRE_LINE },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [still]);

  useEffect(() => {
    if (!active || still) return;
    let played = 0;
    const timer = setInterval(() => {
      played = Math.min(played + TICK_MS, durationMs);
      setElapsed(played);
      if (played === durationMs) clearInterval(timer);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [active, still, durationMs]);

  return { ref, elapsed: hydrated && !still ? elapsed : durationMs, still };
}
