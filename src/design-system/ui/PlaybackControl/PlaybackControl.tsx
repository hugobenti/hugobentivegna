import { Button } from "../Button/Button";
import type { TPlaybackControlProps } from "./PlaybackControl.type";

/**
 * The pause, play and replay button for an animation that runs longer than 5 s (WCAG 2.2.2).
 * Renders nothing while `shown` is false, so markup without a working animation has no dead button.
 */
export function PlaybackControl({
  shown = true,
  label,
  onToggle,
  className,
}: TPlaybackControlProps) {
  if (!shown) return null;
  return (
    <Button variant="secondary" size="sm" className={className} onClick={onToggle}>
      {label}
    </Button>
  );
}
