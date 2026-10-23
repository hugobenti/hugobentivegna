/** The classes every chapter slide's opening copy shares. */
export const chapterIntro = {
  kicker: "font-mono text-label text-subtle uppercase",
  title: "mt-6 font-display text-h2 font-extrabold text-balance text-fg",
  body: "mt-6 max-w-xl text-body text-muted",
};

/** The two-column layout chapter slides share: copy on the left, the demo on the right. */
export const chapterLayout = {
  /** Copy beside the demo from lg up (md is too narrow for both). */
  columns:
    "mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-center lg:gap-16",
};
