"use client";

import { designSystemCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { RebrandScene } from "./RebrandScene";
import { rebrandSlide } from "./RebrandSlide.style";
import { useRebrandScene } from "./useRebrandScene";

const { rebrand } = designSystemCase;

/**
 * The test: the rebrand. The header stays pinned while each act is its own scroll step, and
 * each act plays while its step is on screen: first without a design system, then with one.
 */
export function RebrandSlide() {
  const { withoutRef, withRef, views } = useRebrandScene();
  return (
    <Slide slide={slides.dsRebrand} className={deck.stepsSlide}>
      <div className={cx(deck.stepsHeader, rebrandSlide.header)}>
        <div className={rebrandSlide.inner}>
          <p className={rebrandSlide.kicker}>{rebrand.kicker}</p>
          <h2 className={rebrandSlide.title}>{rebrand.title}</h2>
          <p className={rebrandSlide.lead}>{rebrand.lead}</p>
        </div>
      </div>
      <ol>
        <li data-step={0} className={deck.step}>
          <div ref={withoutRef} data-playback="" className={cx(deck.reveal, rebrandSlide.act)}>
            <p className={rebrandSlide.summary}>{rebrand.acts.without.summary}</p>
            <div inert aria-hidden="true">
              <RebrandScene view={views.without} />
            </div>
          </div>
        </li>
        <li data-step={1} className={deck.step}>
          <div ref={withRef} data-playback="" className={cx(deck.reveal, rebrandSlide.act)}>
            <p className={rebrandSlide.summary}>{rebrand.acts.with.summary}</p>
            <div inert aria-hidden="true">
              <RebrandScene view={views.with} />
            </div>
            <p className={rebrandSlide.closing}>{rebrand.closing}</p>
          </div>
        </li>
      </ol>
    </Slide>
  );
}
