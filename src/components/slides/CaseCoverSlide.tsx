import { cx } from "@/design-system/ui";
import { deck } from "../deck/Deck.style";
import { Slide } from "../deck/Slide";
import { stagger } from "../deck/stagger";
import { useCaseCover } from "./useCaseCover";
import { caseCoverSlide } from "./CaseCoverSlide.style";
import type { TCaseCoverSlideProps } from "./CaseCoverSlide.type";

/** Opens a case study: what it is, when, my role, and the chapters ahead. */
export function CaseCoverSlide({ slide, cover, mark, aside }: TCaseCoverSlideProps) {
  const { chapters } = useCaseCover(cover);
  return (
    <Slide slide={slide} className={caseCoverSlide.slide}>
      <div className={caseCoverSlide.glow} aria-hidden="true" />
      <div className={caseCoverSlide.content}>
        <div>
          {mark ? (
            <div className={cx(deck.reveal, caseCoverSlide.mark)} style={stagger(0)}>
              {mark}
            </div>
          ) : null}
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
            {chapters.map((chapter) => (
              <li key={chapter.number}>
                <a href={chapter.href} className={caseCoverSlide.chapter}>
                  <span className={caseCoverSlide.chapterNumber}>{chapter.number}</span>
                  {chapter.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
        {aside ? (
          <div data-aside="" className={cx(deck.reveal, caseCoverSlide.aside)} style={stagger(2)}>
            {aside}
          </div>
        ) : null}
      </div>
    </Slide>
  );
}
