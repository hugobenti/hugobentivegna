"use client";

import { pixelhbCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { Button, cx, PlaybackControl } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { ChapterIntro } from "../ChapterIntro/ChapterIntro";
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
          <ChapterIntro kicker={exact.kicker} title={exact.title} body={exact.body} />
          <div className={cx(deck.reveal, exactSlide.links)} style={stagger(3)}>
            <Button href={exact.live.href} external>
              {exact.live.label}
            </Button>
            <Button variant="secondary" href={exact.code.href} external>
              {exact.code.label}
            </Button>
          </div>
          <PlaybackControl {...control} className={exactSlide.control} />
        </div>

        <ul ref={ref} className={cx(deck.reveal, exactSlide.cards)} style={stagger(4)}>
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
