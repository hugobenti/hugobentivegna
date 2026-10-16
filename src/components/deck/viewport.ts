/**
 * IntersectionObserver root margin that shrinks the viewport to its horizontal centre line.
 * Whatever crosses that line is "the one being looked at", whatever its height.
 */
export const CENTRE_LINE = "-50% 0px -50% 0px";

/** Root margin for "has been seen": the element's top has passed 85% of the viewport height. */
export const SEEN_LINE = "0px 0px -15% 0px";
