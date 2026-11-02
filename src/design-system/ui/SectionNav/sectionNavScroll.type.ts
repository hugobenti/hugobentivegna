/** Geometry of the link row and one link: viewport px from `getBoundingClientRect`, plus the list's scroll state. */
export interface IScrollMetrics {
  listLeft: number;
  listWidth: number;
  scrollLeft: number;
  scrollWidth: number;
  linkLeft: number;
  linkWidth: number;
}

/** Which ends of the row have links scrolled out of view. */
export interface IOverflowEdges {
  start: boolean;
  end: boolean;
}
