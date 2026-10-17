import { designSystemCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { thesisSlide } from "./ThesisSlide.style";

const { thesis } = designSystemCase;

/** Opens the design-system case: the thesis, what drives it, and one line of context. */
export function ThesisSlide() {
  return (
    <Slide slide={slides.dsThesis} className={thesisSlide.slide}>
      <div className={thesisSlide.glow} aria-hidden="true" />
      <div className={thesisSlide.content}>
        <p className={cx(deck.reveal, thesisSlide.kicker)} style={stagger(0)}>
          {thesis.kicker}
        </p>
        <h2 className={cx(deck.reveal, thesisSlide.statement)} style={stagger(1)}>
          {thesis.statement}
        </h2>
        <ul className={cx(deck.reveal, thesisSlide.pillars)} style={stagger(2)}>
          {thesis.pillars.map((pillar) => (
            <li key={pillar.title} className={thesisSlide.pillar}>
              <h3 className={thesisSlide.pillarTitle}>{pillar.title}</h3>
              <p className={thesisSlide.pillarBody}>{pillar.body}</p>
            </li>
          ))}
        </ul>
        <p className={cx(deck.reveal, thesisSlide.context)} style={stagger(3)}>
          {thesis.context}
        </p>
      </div>
    </Slide>
  );
}
