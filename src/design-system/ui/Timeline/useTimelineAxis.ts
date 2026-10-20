import { useMemo } from "react";
import { axisView } from "./timelineScale";
import type { IScaleEntry } from "./timelineScale.type";

/** View model for TimelineAxis; recomputed only when the entries or the focus change. */
export function useTimelineAxis(entries: readonly IScaleEntry[], activeIndex?: number) {
  return useMemo(() => axisView(entries, activeIndex), [entries, activeIndex]);
}
