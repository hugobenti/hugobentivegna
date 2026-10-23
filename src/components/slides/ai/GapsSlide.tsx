"use client";

import { aiCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { PlaybackControl, cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { ChapterIntro } from "../ChapterIntro/ChapterIntro";
import { gapsSlide } from "./GapsSlide.style";
import { useGapsScene } from "./useGapsScene";

const { gaps } = aiCase;

/** Chapter 01 of the AI case: an agent checks what product expects against the spec and the code. */
export function GapsSlide() {
  const { ref, sources, caption, checks, control } = useGapsScene();
  return (
    <Slide slide={slides.aiGaps}>
      <div className={gapsSlide.content}>
        <div>
          <ChapterIntro kicker={gaps.kicker} title={gaps.title} body={gaps.body} />
        </div>

        <div
          ref={ref}

          className={cx(deck.reveal, gapsSlide.panel)}
          style={stagger(3)}
        >
          <div className={gapsSlide.header}>
            <p className={gapsSlide.feature}>{gaps.feature}</p>
            <p className={gapsSlide.illustration}>{gaps.illustration}</p>
          </div>
          <ul className={gapsSlide.sources}>
            {sources.map((source) => (
              <li
                key={source.label}
                data-source=""
                data-on={source.on}
                className={gapsSlide.source}
              >
                {source.label}
                {source.badge ? (
                  <span className={gapsSlide.sourceBadge}>{source.badge}</span>
                ) : null}
              </li>
            ))}
          </ul>
          <ul aria-label={gaps.checksLabel} className={gapsSlide.checks}>
            {checks.map((check) => (
              <li key={check.expectation} data-state={check.state} className={gapsSlide.check}>
                <span className={gapsSlide.checkTop}>
                  <span className={gapsSlide.expectation}>{check.expectation}</span>
                  <span className={gapsSlide.badge}>{check.badge}</span>
                </span>
                <span className={gapsSlide.reason}>{check.reason}</span>
              </li>
            ))}
          </ul>
          <div className={gapsSlide.footer}>
            <p className={gapsSlide.caption} aria-hidden="true">
              {caption}
            </p>
            <PlaybackControl {...control} className={gapsSlide.control} />
          </div>
          <p className={gapsSlide.summary}>{gaps.done}</p>
        </div>
      </div>
    </Slide>
  );
}
