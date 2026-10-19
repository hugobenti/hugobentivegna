import { designSystemCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { problemSlide } from "./ProblemSlide.style";

const { problem } = designSystemCase;

/** Chapter 01 of the design-system case: one source of truth in design, copies in code. */
export function ProblemSlide() {
  return (
    <Slide slide={slides.dsProblem} className={problemSlide.slide}>
      <div className={problemSlide.glow} aria-hidden="true" />
      <div className={problemSlide.content}>
        <p className={cx(deck.reveal, problemSlide.kicker)} style={stagger(0)}>
          {problem.kicker}
        </p>
        <h2 className={cx(deck.reveal, problemSlide.title)} style={stagger(1)}>
          {problem.title}
        </h2>
        <p className={cx(deck.reveal, problemSlide.body)} style={stagger(2)}>
          {problem.body}
        </p>
      </div>
    </Slide>
  );
}
