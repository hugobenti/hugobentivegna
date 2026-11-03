"use client";

import { useEffect, useRef, useState } from "react";
import { centredScrollLeft, overflowEdges } from "./sectionNavScroll";
import type { IOverflowEdges } from "./sectionNavScroll.type";
import type { TSectionNavItem } from "./SectionNav.type";
import type { ISectionNavLink } from "./useSectionNav.type";

const NO_OVERFLOW: IOverflowEdges = { start: false, end: false };

/**
 * Keeps the active link in view when the row is wider than the screen (phones): the list
 * scrolls sideways to centre it, and `overflow` says which ends hide links. The page itself
 * never scrolls. `links` is what to render per item: its label once, or a short and a full label
 * when the item has a `shortLabel` (the style shows one per breakpoint).
 */
export function useSectionNav(items: readonly TSectionNavItem[], activeId: string | null) {
  const listRef = useRef<HTMLUListElement>(null);
  const [overflow, setOverflow] = useState(NO_OVERFLOW);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      const next = overflowEdges(list.scrollLeft, list.scrollWidth, list.clientWidth);
      setOverflow((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
    };
    update();
    list.addEventListener("scroll", update, { passive: true });
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    observer?.observe(list);
    return () => {
      list.removeEventListener("scroll", update);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const listRect = list.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo?.({
      left: centredScrollLeft({
        listLeft: listRect.left,
        listWidth: listRect.width,
        scrollLeft: list.scrollLeft,
        scrollWidth: list.scrollWidth,
        linkLeft: linkRect.left,
        linkWidth: linkRect.width,
      }),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeId]);

  const links: ISectionNavLink[] = items.map((item) => ({
    ...item,
    texts: item.shortLabel
      ? [
          { label: item.shortLabel, variant: "short" },
          { label: item.label, variant: "full" },
        ]
      : [{ label: item.label, variant: "only" }],
  }));

  return { listRef, overflow, links };
}
