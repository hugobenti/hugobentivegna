export type SlidePosition = "before" | "active" | "after";

/** Where every slide sits relative to the active one; drives enter/exit styling. */
export function slidePositions(
  ids: readonly string[],
  activeId: string,
): Record<string, SlidePosition> {
  const activeIndex = ids.indexOf(activeId);
  return Object.fromEntries(
    ids.map((id, index) => [
      id,
      index < activeIndex ? "before" : index === activeIndex ? "active" : "after",
    ]),
  );
}

/** URL hash for a slide: the first slide keeps a clean URL. */
export function hashForSlide(id: string, ids: readonly string[]): string {
  return id === ids[0] ? "" : `#${id}`;
}
