"use client";

import { useEffect, useRef, useState } from "react";
import { CENTRE_LINE } from "./viewport";

/**
 * For multi-step slides: reports which `[data-step="n"]` element inside `ref` is crossing the
 * centre of the screen. Starts at 0, so without JavaScript the first step is the focus and
 * every step's content is still in the page.
 */
export function useActiveStep<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActiveIndex(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: CENTRE_LINE },
    );
    root.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return { ref, activeIndex };
}
