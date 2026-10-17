"use client";

import { designSystemCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { Button, ThemeSwitch, cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { tokenTraceSlide } from "./TokenTraceSlide.style";
import { useTokenTrace } from "./useTokenTrace";

const { trace } = designSystemCase;

/** Tokens you can follow: pick a component token and see it resolve, layer by layer. */
export function TokenTraceSlide() {
  const { picker, steps, variant } = useTokenTrace();
  return (
    <Slide slide={slides.dsTokens}>
      <div className={tokenTraceSlide.content}>
        <div>
          <p className={cx(deck.reveal, tokenTraceSlide.kicker)} style={stagger(0)}>
            {trace.kicker}
          </p>
          <h2 className={cx(deck.reveal, tokenTraceSlide.title)} style={stagger(1)}>
            {trace.title}
          </h2>
          <p className={cx(deck.reveal, tokenTraceSlide.body)} style={stagger(2)}>
            {trace.body}
          </p>
          <ThemeSwitch
            label={trace.pickerLabel}
            options={picker.options}
            value={picker.value}
            onChange={picker.onChange}
            className={cx(deck.reveal, tokenTraceSlide.picker)}
          />
        </div>

        <div className={deck.reveal} style={stagger(3)} aria-live="polite">
          <ol key={picker.value} aria-label={trace.chainLabel} className={tokenTraceSlide.chain}>
            {steps.map((step, index) => (
              <li
                key={step.name}
                className={cx(deck.enter, tokenTraceSlide.step)}
                style={stagger(index)}
              >
                <span className={tokenTraceSlide.swatch} style={step.swatch} aria-hidden="true" />
                <span className={tokenTraceSlide.stepText}>
                  <span className={tokenTraceSlide.layer}>{step.layer}</span>
                  <code className={tokenTraceSlide.name}>{step.name}</code>
                  <span className={tokenTraceSlide.meta}>
                    <code>{step.cssVar}</code>
                    <span>{step.resolved}</span>
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <div className={tokenTraceSlide.inUse}>
            <span className={tokenTraceSlide.inUseLabel}>{trace.inUse}</span>
            <Button variant={variant}>{trace.buttonLabel}</Button>
          </div>
        </div>
      </div>
    </Slide>
  );
}
