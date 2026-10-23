"use client";

import { aiCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { PlaybackControl, cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { ChapterIntro } from "../ChapterIntro/ChapterIntro";
import { foundationSlide } from "./FoundationSlide.style";
import { useFoundationScene } from "./useFoundationScene";

const { foundation } = aiCase;

/** Chapter 02 of the AI case: the rules agents read, and the lint rules they can't break. */
export function FoundationSlide() {
  const { ref, excerpts, control } = useFoundationScene();
  return (
    <Slide slide={slides.aiFoundation}>
      <div className={foundationSlide.content}>
        <div>
          <ChapterIntro
            kicker={foundation.kicker}
            title={foundation.title}
            body={foundation.body}
          />
          <p className={cx(deck.reveal, foundationSlide.note)} style={stagger(3)}>
            {foundation.note}
          </p>
        </div>

        <div
          ref={ref}

          className={cx(deck.reveal, foundationSlide.demo)}
          style={stagger(3)}
        >
          <ul aria-label={foundation.excerptsLabel} className={foundationSlide.excerpts}>
            {excerpts.map((excerpt) => (
              <li key={excerpt.file} data-on={excerpt.on} className={foundationSlide.excerpt}>
                <p className={foundationSlide.header}>
                  <span className={foundationSlide.file}>
                    <span className={foundationSlide.fileName}>{excerpt.file}</span> ·{" "}
                    {excerpt.kind}
                  </span>
                  <span className={foundationSlide.reader}>{excerpt.reader}</span>
                </p>
                <div className={foundationSlide.lines}>
                  {excerpt.lines.map((line) => (
                    <p key={line.text} className={foundationSlide.line[line.tone]}>
                      {line.text}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className={foundationSlide.footer}>
            <PlaybackControl {...control} />
          </div>
        </div>
      </div>
    </Slide>
  );
}
