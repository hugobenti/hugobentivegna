"use client";

import { designSystemCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { Button, cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { RebrandScene } from "./RebrandScene";
import { rebrandSlide } from "./RebrandSlide.style";
import { useRebrandScene } from "./useRebrandScene";

const { rebrand } = designSystemCase;

/**
 * The test: the rebrand. One scene plays the same rebrand without, then with, a design system;
 * a flag shows which act is on screen, and the one control pauses or replays it.
 */
export function RebrandSlide() {
  const { ref, still, views, playing, flags, control } = useRebrandScene();
  return (
    <Slide slide={slides.dsRebrand} className={rebrandSlide.slide}>
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
          <div data-playing={playing} className={rebrandSlide.panel}>
            {still ? null : (
              <div className={rebrandSlide.bar}>
                <p className={rebrandSlide.flags} aria-hidden="true">
                  {flags.map((flag) => (
                    <span
                      key={flag.act}
                      data-flag=""
                      data-active={flag.active}
                      className={rebrandSlide.flag}
                    >
                      {flag.label}
                    </span>
                  ))}
                </p>
                <Button
                  variant="secondary"
                  className={rebrandSlide.control}
                  onClick={control.toggle}
                >
                  {control.label}
                </Button>
              </div>
            )}
            <div
              inert
              aria-hidden="true"
              className={still ? rebrandSlide.acts.still : rebrandSlide.acts.playing}
            >
              {views.map((view) => (
                <RebrandScene key={view.act} view={view} layout={still ? "compact" : "wide"} />
              ))}
            </div>
          </div>
        </div>

        <p className={cx(deck.reveal, rebrandSlide.closing)} style={stagger(4)}>
          {rebrand.closing}
        </p>
      </div>
    </Slide>
  );
}
