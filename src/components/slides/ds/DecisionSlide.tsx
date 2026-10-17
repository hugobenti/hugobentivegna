"use client";

import { designSystemCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { Button, cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { decisionSlide } from "./DecisionSlide.style";
import { useTokenTrace } from "./useTokenTrace";

const { decision } = designSystemCase;

/** The decision: one system shared by design and code, shown by a token trace that plays itself. */
export function DecisionSlide() {
  const { ref, option, steps, button } = useTokenTrace();
  return (
    <Slide slide={slides.dsDecision}>
      <div ref={ref} data-playback="" className={decisionSlide.content}>
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

        <div className={deck.reveal} style={stagger(3)}>
          <p className={decisionSlide.tracing}>
            {decision.tracing} <span className={decisionSlide.tracingToken}>{option.label}</span>
          </p>
          <ol key={option.token} aria-label={decision.chainLabel} className={decisionSlide.chain}>
            {steps.map((step) => (
              <li key={step.name} data-shown={step.shown} className={decisionSlide.step}>
                <span className={decisionSlide.swatch} style={step.swatch} aria-hidden="true" />
                <span className={decisionSlide.stepText}>
                  <span className={decisionSlide.layer}>{step.layer}</span>
                  <code className={decisionSlide.name}>{step.name}</code>
                  <span className={decisionSlide.meta}>
                    <code>{step.cssVar}</code>
                    <span>{step.resolved}</span>
                  </span>
                </span>
                <span className={decisionSlide.arrow} aria-hidden="true">
                  ↓
                </span>
              </li>
            ))}
          </ol>
          <div data-shown={button.shown} className={decisionSlide.inUse}>
            <span className={decisionSlide.inUseLabel}>{decision.inUse}</span>
            <Button variant={button.variant} tabIndex={-1}>
              {decision.buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </Slide>
  );
}
