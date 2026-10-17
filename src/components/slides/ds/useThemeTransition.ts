import { useState } from "react";
import { flushSync } from "react-dom";

/**
 * Theme state whose changes animate with the View Transitions API: the browser snapshots the
 * old look, React commits the new theme synchronously inside the transition, and CSS animates
 * between the two. Without the API, or when the visitor prefers reduced motion, it just switches.
 */
export function useThemeTransition<T extends string>(initial: T) {
  const [theme, setTheme] = useState<T>(initial);

  const changeTheme = (next: T) => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (typeof document.startViewTransition !== "function" || reduceMotion) {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => flushSync(() => setTheme(next)));
  };

  return [theme, changeTheme] as const;
}
