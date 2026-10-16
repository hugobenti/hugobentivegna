import { useMemo } from "react";
import { axisView, type ScaleEntry } from "./timelineScale";

/** View model for TimelineAxis; recomputed only when the entries or the focus change. */
export function useTimelineAxis(entries: readonly ScaleEntry[], activeIndex?: number) {
  return useMemo(() => axisView(entries, activeIndex), [entries, activeIndex]);
}
