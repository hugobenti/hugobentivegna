import { useState } from "react";
import { flushSync } from "react-dom";

/**
 * Theme state whose changes animate with the View Transitions API: the browser snapshots the
 * old look, React commits the new theme synchronously inside the transition, and CSS animates
 * between the two. Without the API, or when the visitor prefers reduced motion, it just switches.
 *
 * `selected` (what the control shows) updates at once; only `theme` (what the page paints) waits
 * for the transition. A controlled radio would otherwise snap back to the old value until then.
 */
export function useThemeTransition<T extends string>(initial: T) {
  const [selected, setSelected] = useState<T>(initial);
  const [theme, setTheme] = useState<T>(initial);

  const select = (next: T) => {
    setSelected(next);
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (typeof document.startViewTransition !== "function" || reduceMotion) {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => flushSync(() => setTheme(next)));
  };

  return { theme, selected, select };
}
