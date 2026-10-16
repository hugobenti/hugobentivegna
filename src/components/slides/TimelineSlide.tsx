"use client";

import { experience } from "@/content/experience";
import { slides } from "@/content/slides";
import { TimelineAxis, TimelineChapter, cx } from "@/design-system/ui";
import { deck } from "../deck/Deck.style";
import { Slide } from "../deck/Slide";
import { useActiveStep } from "../deck/useActiveStep";
import { timelineSlide } from "./TimelineSlide.style";

/**
 * Experience: the axis stays pinned while each company is its own scroll step. The chapter
 * crossing the centre of the screen drives the axis. Every chapter is always in the page.
 */
export function TimelineSlide() {
  const { ref, activeIndex } = useActiveStep<HTMLOListElement>();
  return (
    <Slide slide={slides.timeline} className={deck.stepsSlide}>
      <div className={cx(deck.stepsHeader, timelineSlide.header)}>
        <div className={timelineSlide.inner}>
          <h2 className={timelineSlide.title}>{experience.title}</h2>
          <TimelineAxis
            entries={experience.entries}
            activeIndex={activeIndex}
            className={timelineSlide.axis}
          />
        </div>
      </div>
      <ol ref={ref}>
        {experience.entries.map((entry, index) => (
          <li key={entry.company} data-step={index} className={deck.step}>
            <TimelineChapter
              entry={entry}
              headingLevel={3}
              className={cx(deck.reveal, timelineSlide.chapter)}
            />
          </li>
        ))}
      </ol>
    </Slide>
  );
}
