import type { IOverflowEdges, IScrollMetrics } from "./sectionNavScroll.type";

const TOLERANCE = 1;

/**
 * The `scrollLeft` that centres a link in its list. The link's place inside the scrolled content
 * comes from bounding rects, not `offsetLeft`, which is measured from the nearest positioned
 * ancestor (the page header) and so also counts everything left of the list. Clamped to the
 * scrollable range.
 */
export function centredScrollLeft(m: IScrollMetrics): number {
  const linkStart = m.linkLeft - m.listLeft + m.scrollLeft;
  const centred = linkStart - (m.listWidth - m.linkWidth) / 2;
  return Math.min(Math.max(centred, 0), Math.max(m.scrollWidth - m.listWidth, 0));
}

/** Which edges of the row hide links, with 1 px of tolerance for fractional scroll positions. */
export function overflowEdges(
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number,
): IOverflowEdges {
  return {
    start: scrollLeft > TOLERANCE,
    end: scrollLeft + clientWidth < scrollWidth - TOLERANCE,
  };
}
