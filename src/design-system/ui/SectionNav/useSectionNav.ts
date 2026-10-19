"use client";

import { useEffect, useRef } from "react";

/**
 * Keeps the active link in view when the row is wider than the screen (phones): the list
 * scrolls sideways to centre it. The page itself never scrolls.
 */
export function useSectionNav(activeId: string | null) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo?.({
      left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeId]);

  return { listRef };
}
