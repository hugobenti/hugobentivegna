"use client";

import { designSystemCase } from "@/content/cases";
import type { RebrandTheme } from "@/content/types";
import { slides } from "@/content/slides";
import { Button, Card, Tag, ThemeSwitch, cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import "./rebrand.css";
import { rebrandSlide } from "./RebrandSlide.style";
import { useThemeTransition } from "./useThemeTransition";

const { rebrand } = designSystemCase;
const { product } = rebrand;

/**
 * Live rebrand: the switch sets this slide's data-theme, so the semantic tokens take the new
 * theme's values and every kit component here follows, with no component changes.
 */
export function RebrandSlide() {
  const [theme, setTheme] = useThemeTransition<RebrandTheme>("midnight");
  return (
    <Slide slide={slides.dsRebrand} theme={theme} className={rebrandSlide.slide}>
      <div className={rebrandSlide.glow} aria-hidden="true" />
      <div className={rebrandSlide.content}>
        <div>
          <p className={cx(deck.reveal, rebrandSlide.kicker)} style={stagger(0)}>
            {rebrand.kicker}
          </p>
          <h2 className={cx(deck.reveal, rebrandSlide.title)} style={stagger(1)}>
            {rebrand.title}
          </h2>
          <p className={cx(deck.reveal, rebrandSlide.body)} style={stagger(2)}>
            {rebrand.body}
          </p>
          <ThemeSwitch
            label={rebrand.switchLabel}
            options={rebrand.options}
            value={theme}
            onChange={setTheme}
            className={cx(deck.reveal, rebrandSlide.switch)}
          />
          <p className={cx(deck.reveal, rebrandSlide.note)} style={stagger(3)}>
            {rebrand.note}
          </p>
        </div>

        <figure className={cx(deck.reveal, rebrandSlide.figure)} style={stagger(3)}>
          <div inert>
            <Card className={rebrandSlide.mock}>
              <div className={rebrandSlide.mockHeader}>
                <span className={rebrandSlide.brand}>{product.brand}</span>
                <Tag>{product.status}</Tag>
              </div>
              <p className={rebrandSlide.mockTitle}>{product.title}</p>
              <p className={rebrandSlide.mockBody}>{product.body}</p>
              <div className={rebrandSlide.track}>
                <div className={rebrandSlide.fill} />
              </div>
              <div className={rebrandSlide.tags}>
                {product.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <div className={rebrandSlide.actions}>
                <Button>{product.primaryAction}</Button>
                <Button variant="secondary">{product.secondaryAction}</Button>
              </div>
            </Card>
          </div>
          <figcaption className={rebrandSlide.caption}>{product.caption}</figcaption>
        </figure>
      </div>
    </Slide>
  );
}
