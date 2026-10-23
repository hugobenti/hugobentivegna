import { site } from "@/content/site";
import { usePlayback } from "./usePlayback";

const { playback: labels } = site;

/**
 * `usePlayback` plus the pause control every long animation offers: `control` carries what a
 * `PlaybackControl` renders. The label names the next action: Replay once finished, Play while
 * paused, otherwise Pause. `shown` is false until the animation can act (no script, reduced motion).
 */
export function usePlaybackControl<T extends HTMLElement>(durationMs: number) {
  const { paused, finished, controllable, toggle, ...playback } = usePlayback<T>(durationMs);
  return {
    ...playback,
    paused,
    finished,
    control: {
      shown: controllable,
      label: finished ? labels.replay : paused ? labels.play : labels.pause,
      onToggle: toggle,
    },
  };
}
