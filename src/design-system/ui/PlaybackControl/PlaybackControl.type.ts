export type TPlaybackControlProps = {
  /** Offered only while it can act: `false` renders nothing (no script, or motion reduced). */
  shown?: boolean;
  /** The action the next press performs: "Pause", "Play" or "Replay". Also the accessible name. */
  label: string;
  onToggle: () => void;
  /** Layout only (margins, width, shrink). */
  className?: string;
};
