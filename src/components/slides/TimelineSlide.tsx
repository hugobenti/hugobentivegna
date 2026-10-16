"use client";

import type { ComponentType } from "react";
import { experience } from "@/content/experience";
import { slides } from "@/content/slides";
import type { ExperienceId } from "@/content/types";
import { TimelineAxis, TimelineChapter, cx } from "@/design-system/ui";
import { deck } from "../deck/Deck.style";
import { Slide } from "../deck/Slide";
import { useActiveStep } from "../deck/useActiveStep";
import type { ArtifactProps } from "./experience/ArtifactFrame";
import { ItauArtifact } from "./experience/ItauArtifact";
import { OneGlobalArtifact } from "./experience/OneGlobalArtifact";
import { OuribankArtifact } from "./experience/OuribankArtifact";
import { timelineSlide } from "./TimelineSlide.style";

/** The visual that sits beside each company's chapter. */
const artifacts: Record<ExperienceId, ComponentType<ArtifactProps>> = {
  itau: ItauArtifact,
  ouribank: OuribankArtifact,
  oneglobal: OneGlobalArtifact,
};

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
        {experience.entries.map((entry, index) => {
          const Artifact = artifacts[entry.id];
          return (
            <li key={entry.id} data-step={index} className={deck.step}>
              <div className={timelineSlide.step}>
                <TimelineChapter entry={entry} headingLevel={3} className={deck.reveal} />
                <Artifact active={index === activeIndex} className={deck.reveal} />
              </div>
            </li>
          );
        })}
      </ol>
    </Slide>
  );
}
