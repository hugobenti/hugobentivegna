import type { CaseCover, SlideMeta } from "@/content/types";
import { cx } from "@/design-system/ui";
import { deck } from "../deck/Deck.style";
import { Slide } from "../deck/Slide";
import { stagger } from "../deck/stagger";
import { caseCoverSlide } from "./CaseCoverSlide.style";

type CaseCoverSlideProps = {
  slide: SlideMeta;
  cover: CaseCover;
};

/** Opens a case study: what it is, when, my role, and the chapters ahead. */
export function CaseCoverSlide({ slide, cover }: CaseCoverSlideProps) {
  return (
    <Slide slide={slide} className={caseCoverSlide.slide}>
      <div className={caseCoverSlide.glow} aria-hidden="true" />
      <div className={caseCoverSlide.content}>
        <p className={cx(deck.reveal, caseCoverSlide.kicker)} style={stagger(0)}>
          {cover.kicker}
        </p>
        <h2 className={cx(deck.reveal, caseCoverSlide.title)} style={stagger(1)}>
          {cover.title}
        </h2>
        <p className={cx(deck.reveal, caseCoverSlide.body)} style={stagger(2)}>
          {cover.body}
        </p>
        <dl className={cx(deck.reveal, caseCoverSlide.meta)} style={stagger(3)}>
          {cover.meta.map((item) => (
            <div key={item.label}>
              <dt className={caseCoverSlide.metaLabel}>{item.label}</dt>
              <dd className={caseCoverSlide.metaValue}>{item.value}</dd>
            </div>
          ))}
        </dl>
        <ol className={cx(deck.reveal, caseCoverSlide.chapters)} style={stagger(4)}>
          {cover.chapters.map((chapter) => (
            <li key={chapter.number} className={caseCoverSlide.chapter}>
              <span className={caseCoverSlide.chapterNumber}>{chapter.number}</span>
              {chapter.label}
            </li>
          ))}
        </ol>
      </div>
    </Slide>
  );
}
