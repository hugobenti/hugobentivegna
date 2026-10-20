import type { IScaleEntry } from "./timelineScale.type";

export type TTimelineAxisProps = {
  /** Oldest first. */
  entries: readonly IScaleEntry[];
  /**
   * Entry currently in focus: the line fills up to its end, earlier entries read as past and
   * later ones as future. Leave it out for a static axis with everything filled.
   */
  activeIndex?: number;
  className?: string;
};
