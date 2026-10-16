/** Class hooks defined in deck.css, plus Tailwind layout for the engine's own UI. */
export const deck = {
  root: "deck",
  slide: "slide",
  /** A slide made of several full-viewport steps under a pinned header. */
  stepsSlide: "slide-steps",
  /** The pinned header of a multi-step slide. */
  stepsHeader: "steps-header",
  /** One full-viewport step of a multi-step slide; give it data-step="n". */
  step: "step",
  /** An element that animates with its slide (or step). */
  reveal: "reveal",
  /** Time-based entrance on first load. */
  enter: "enter",
  /** Dot navigation: vertically centred on the right, hidden where slides don't snap. */
  dots: "fixed top-1/2 right-3 z-10 hidden -translate-y-1/2 md:block [@media(max-height:559px)]:hidden",
};
