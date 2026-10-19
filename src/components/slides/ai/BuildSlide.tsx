"use client";

import { aiCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { Button, cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { buildSlide } from "./BuildSlide.style";
import { useReviewLoop } from "./useReviewLoop";

const { build } = aiCase;
const { review } = build;

/** Chapter 03 of the AI case: a real change from this repository, reviewed, ruled and merged. */
export function BuildSlide() {
  const { ref, progress, stages, checks, status, merged, control } = useReviewLoop();
  return (
    <Slide slide={slides.aiBuild}>
      <div className={buildSlide.content}>
        <div>
          <p className={cx(deck.reveal, buildSlide.kicker)} style={stagger(0)}>
            {build.kicker}
          </p>
          <h2 className={cx(deck.reveal, buildSlide.title)} style={stagger(1)}>
            {build.title}
          </h2>
          <p className={cx(deck.reveal, buildSlide.body)} style={stagger(2)}>
            {build.body}
          </p>
          <p className={cx(deck.reveal, buildSlide.closing)} style={stagger(3)}>
            {build.closing}
          </p>
          <div className={cx(deck.reveal, buildSlide.repo)} style={stagger(4)}>
            <Button variant="secondary" href={build.repo.href} external>
              {build.repo.label}
            </Button>
          </div>
        </div>

        <div
          ref={ref}
          data-playback=""
          {...progress}
          className={cx(deck.reveal, buildSlide.panel)}
          style={stagger(3)}
        >
          <p className={buildSlide.header}>
            <span>{review.label}</span>
            <span aria-hidden="true" data-merged={merged} className={buildSlide.status}>
              {status.map((entry) => (
                <span key={entry.label} data-shown={entry.shown} className={buildSlide.statusLabel}>
                  {entry.label}
                </span>
              ))}
            </span>
            <span className={buildSlide.srLabel}>{review.status.merged}</span>
          </p>
          <p className={buildSlide.stages} aria-hidden="true">
            {stages.map((stage) => (
              <span key={stage.label} data-on={stage.on} className={buildSlide.stage}>
                {stage.label}
              </span>
            ))}
          </p>

          <div className={buildSlide.diff}>
            <div className={buildSlide.lines}>
              {review.before.map((line) => (
                <p key={line} className={buildSlide.removed}>
                  <span className={buildSlide.srLabel}>{review.removedLabel}</span>
                  <span aria-hidden="true" className={cx(buildSlide.sign, buildSlide.removedSign)}>
                    -
                  </span>
                  <code className={buildSlide.code}>{line}</code>
                </p>
              ))}
              <p className={buildSlide.added}>
                <span className={buildSlide.srLabel}>{review.addedLabel}</span>
                <span aria-hidden="true" className={buildSlide.sign}>
                  +
                </span>
                <code className={buildSlide.code}>{review.after}</code>
              </p>
            </div>

            <div className={buildSlide.comment}>
              <p className={buildSlide.commentHeader}>
                <span>{review.comment.author}</span>
                <span className={buildSlide.resolved}>{review.comment.resolved}</span>
              </p>
              <p className={buildSlide.commentBody}>{review.comment.body}</p>
            </div>

            <div className={buildSlide.rule}>
              <p className={buildSlide.ruleFile}>{review.rule.file}</p>
              <p className={buildSlide.ruleMessage}>{review.rule.message}</p>
            </div>
          </div>

          <div className={buildSlide.footer}>
            <ul className={buildSlide.checks}>
              {checks.map((check) => (
                <li
                  key={check.label}
                  data-check=""
                  data-passed={check.passed}
                  className={buildSlide.check}
                >
                  ✓ {check.label}
                </li>
              ))}
            </ul>
            {control.shown ? (
              <Button variant="secondary" className={buildSlide.control} onClick={control.toggle}>
                {control.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Slide>
  );
}
