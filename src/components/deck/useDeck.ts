"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { activeNavLink } from "@/content/navigation";
import type { NavLink, SlideMeta } from "@/content/types";
import { hashForSlide, slidePositions } from "./slideState";
import { CENTRE_LINE, SEEN_LINE } from "./viewport";

// The active slide is the one crossing the viewport's centre line, so slides of any height
// (including multi-step ones) work.

/**
 * Slide-deck behavior: tracks the slide in view, keeps the URL hash and slide positions
 * (data-position / data-seen, read by deck.css) in sync, and scrolls to a chosen slide. Also
 * reports which header link owns the slide in view (`activeSection`).
 * Scrolling itself stays native; nothing here listens to wheel, touch or keys.
 */
export function useDeck(slides: readonly SlideMeta[], nav: readonly NavLink[]) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ids = useMemo(() => slides.map((slide) => slide.id), [slides]);
  // null until the observer has reported a slide, so the URL is never rewritten from a guess.
  const [activeId, setActiveId] = useState<string | null>(null);

  // The browser already scrolled to any #hash; the observers report what is actually visible.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const centre = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId((entry.target as HTMLElement).id);
        }
      },
      { rootMargin: CENTRE_LINE },
    );
    const seen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) (entry.target as HTMLElement).dataset.seen = "";
        }
      },
      { rootMargin: SEEN_LINE },
    );
    root.querySelectorAll<HTMLElement>("[data-slide]").forEach((section) => {
      centre.observe(section);
      seen.observe(section);
    });
    root.dataset.ready = "";
    return () => {
      centre.disconnect();
      seen.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !activeId) return;
    const positions = slidePositions(ids, activeId);
    root.querySelectorAll<HTMLElement>("[data-slide]").forEach((section) => {
      section.dataset.position = positions[section.id] ?? "after";
    });
    const { pathname, search } = window.location;
    history.replaceState(history.state, "", pathname + search + hashForSlide(activeId, ids));
  }, [activeId, ids]);

  const goTo = useCallback((id: string) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  const current = activeId ?? ids[0] ?? "";
  return {
    rootRef,
    activeId: current,
    activeSection: activeNavLink(nav, current),
    homeHref: `#${ids[0] ?? ""}`,
    goTo,
  };
}
