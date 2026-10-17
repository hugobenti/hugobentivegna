"use client";

import { designSystemCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { RebrandScene } from "./RebrandScene";
import { rebrandSlide } from "./RebrandSlide.style";
import { useRebrandScene } from "./useRebrandScene";

const { rebrand } = designSystemCase;

/**
 * The test: the rebrand. The copy carries the outcome from the start; the scene replays it,
 * first without a design system, then with one.
 */
export function RebrandSlide() {
  const { ref, still, frames } = useRebrandScene();
  return (
    <Slide slide={slides.dsRebrand} className={rebrandSlide.slide}>
      <div className={rebrandSlide.glow} aria-hidden="true" />
      <div className={rebrandSlide.content}>
        <div>
          <p className={cx(deck.reveal, rebrandSlide.kicker)} style={stagger(0)}>
            {rebrand.kicker}
          </p>
          <h2 className={cx(deck.reveal, rebrandSlide.title)} style={stagger(1)}>
            {rebrand.title}
          </h2>
          <p className={cx(deck.reveal, rebrandSlide.lead)} style={stagger(2)}>
            {rebrand.lead}
          </p>
        </div>

        <div ref={ref} data-playback="" className={deck.reveal} style={stagger(3)}>
          <ul className={rebrandSlide.summaries}>
            <li>{rebrand.acts.without.summary}</li>
            <li>{rebrand.acts.with.summary}</li>
          </ul>
          <div
            inert
            aria-hidden="true"
            className={still ? rebrandSlide.frames.still : rebrandSlide.frames.playing}
          >
            {frames.map((view) => (
              <RebrandScene key={view.act} view={view} layout={still ? "compact" : "wide"} />
            ))}
          </div>
          <p className={rebrandSlide.closing}>{rebrand.closing}</p>
        </div>
      </div>
    </Slide>
  );
}
