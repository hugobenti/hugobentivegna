"use client";

import { pixelhbCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { Button, cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { exactSlide } from "./ExactSlide.style";
import { PixelArt } from "./PixelArt";
import { useExactScene } from "./useExactScene";

const { exact } = pixelhbCase;

/** Chapter 01 of the PixelHB case: four tools lit one at a time, each with a small demo. */
export function ExactSlide() {
  const { ref, tools, demos, control } = useExactScene();
  return (
    <Slide slide={slides.pixelExact}>
      <div className={exactSlide.content}>
        <div>
          <p className={cx(deck.reveal, exactSlide.kicker)} style={stagger(0)}>
            {exact.kicker}
          </p>
          <h2 className={cx(deck.reveal, exactSlide.title)} style={stagger(1)}>
            {exact.title}
          </h2>
          <p className={cx(deck.reveal, exactSlide.body)} style={stagger(2)}>
            {exact.body}
          </p>
          <div className={cx(deck.reveal, exactSlide.links)} style={stagger(3)}>
            <Button href={exact.live.href} external>
              {exact.live.label}
            </Button>
            <Button variant="secondary" href={exact.code.href} external>
              {exact.code.label}
            </Button>
          </div>
          {control.shown ? (
            <Button variant="secondary" className={exactSlide.control} onClick={control.toggle}>
              {control.label}
            </Button>
          ) : null}
        </div>

        <ul
          ref={ref}
          data-playback=""
          className={cx(deck.reveal, exactSlide.cards)}
          style={stagger(4)}
        >
          {tools.map((tool) => (
            <li
              key={tool.name}
              data-card=""
              data-on={tool.on}
              data-state={tool.state}
              className={exactSlide.card}
            >
              <h3 className={exactSlide.name}>{tool.name}</h3>
              <p className={exactSlide.toolBody}>{tool.body}</p>
              <div data-demo={tool.demo} aria-hidden="true" className={exactSlide.demo}>
                <span className={exactSlide.label}>{exact.illustration}</span>
                <div data-on={tool.on} className={exactSlide.art}>
                  {tool.demo === "zoom"
                    ? demos.zoom.map((size) => (
                        <PixelArt
                          key={size}
                          grid={demos.heart}
                          label={exact.illustration}
                          size={size}
                        />
                      ))
                    : null}
                  {tool.demo === "grid" ? (
                    <div className={exactSlide.gridBox}>
                      <PixelArt grid={demos.heart} label={exact.illustration} size="heart6x" />
                      <div data-grid="" className={exactSlide.grid} />
                    </div>
                  ) : null}
                  {tool.demo === "fill"
                    ? demos.fills.map((cellState, heart) => (
                        <PixelArt
                          key={heart}
                          grid={demos.heart}
                          label={exact.illustration}
                          size="heart4x"
                          cells
                          cellState={cellState}
                        />
                      ))
                    : null}
                  {tool.demo === "loupe" ? (
                    <div className={exactSlide.ring}>
                      <div
                        data-ring-top=""
                        className={cx(
                          exactSlide.half,
                          exactSlide.halfTop,
                          exactSlide.ringFill[demos.loupe.picked],
                        )}
                      />
                      <div
                        data-ring-bottom=""
                        className={cx(
                          exactSlide.half,
                          exactSlide.halfBottom,
                          exactSlide.ringFill[demos.loupe.current],
                        )}
                      />
                      <div className={exactSlide.lens}>
                        <PixelArt grid={demos.loupe.grid} label={exact.illustration} size="loupe" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Slide>
  );
}
