"use client";

import { designSystemCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { decisionSlide } from "./DecisionSlide.style";
import { useButtonBuild } from "./useButtonBuild";

const { decision } = designSystemCase;

/** The decision: one system shared by design and code, shown by tokens building a button. */
export function DecisionSlide() {
  const { ref, groups, parts, progress, caption } = useButtonBuild();
  return (
    <Slide slide={slides.dsDecision}>
      <div className={decisionSlide.content}>
        <div>
          <p className={cx(deck.reveal, decisionSlide.kicker)} style={stagger(0)}>
            {decision.kicker}
          </p>
          <h2 className={cx(deck.reveal, decisionSlide.title)} style={stagger(1)}>
            {decision.title}
          </h2>
          <p className={cx(deck.reveal, decisionSlide.body)} style={stagger(2)}>
            {decision.body}
          </p>
        </div>

        <div
          ref={ref}
          data-playback=""
          className={cx(deck.reveal, decisionSlide.demo)}
          style={stagger(3)}
        >
          <ul aria-label={decision.tokensLabel} className={decisionSlide.groups}>
            {groups.map((group) => (
              <li key={group.label}>
                <p className={decisionSlide.groupLabel}>{group.label}</p>
                <ul className={decisionSlide.tokens}>
                  {group.tokens.map((token) => (
                    <li key={token.name} data-state={token.state} className={decisionSlide.token}>
                      {token.swatch ? (
                        <span
                          className={decisionSlide.swatch}
                          style={token.swatch}
                          aria-hidden="true"
                        />
                      ) : null}
                      <code className={decisionSlide.tokenName}>{token.name}</code>
                      <span className={decisionSlide.tokenValue}>{token.value}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className={decisionSlide.stage}>
            <span data-preview="" {...parts} aria-hidden="true" className={decisionSlide.preview}>
              {decision.buttonLabel}
            </span>
            <span className={decisionSlide.progress} aria-hidden="true">
              {progress.map((step) => (
                <span key={step.part} data-on={step.on} className={decisionSlide.progressStep} />
              ))}
            </span>
            <p className={decisionSlide.caption}>{caption}</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
