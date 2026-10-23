"use client";

import { pixelhbCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { Button, cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { memorySlide } from "./MemorySlide.style";
import { useMemoryScene } from "./useMemoryScene";

const { memory } = pixelhbCase;
const { storage, history: undo } = memory;

/** Chapter 02 of the PixelHB case: what a million pixels cost to store, and what undo keeps. */
export function MemorySlide() {
  const { ref, size, square, bars, grid, entries, control } = useMemoryScene();
  return (
    <Slide slide={slides.pixelMemory}>
      <div className={memorySlide.content}>
        <div>
          <p className={cx(deck.reveal, memorySlide.kicker)} style={stagger(0)}>
            {memory.kicker}
          </p>
          <h2 className={cx(deck.reveal, memorySlide.title)} style={stagger(1)}>
            {memory.title}
          </h2>
          <p className={cx(deck.reveal, memorySlide.body)} style={stagger(2)}>
            {memory.body}
          </p>
          {control.shown ? (
            <Button variant="secondary" className={memorySlide.control} onClick={control.toggle}>
              {control.label}
            </Button>
          ) : null}
        </div>

        <div
          ref={ref}
          data-playback=""
          className={cx(deck.reveal, memorySlide.panels)}
          style={stagger(3)}
        >
          <section aria-label={storage.label} className={memorySlide.panel}>
            <p className={memorySlide.label}>{storage.label}</p>
            <div className={memorySlide.store}>
              <div className={memorySlide.squareBox} aria-hidden="true">
                <div data-square="" className={memorySlide.square} style={square} />
              </div>
              <div
                data-readout=""
                data-on={size.on}
                aria-hidden="true"
                className={memorySlide.readout}
              >
                <p className={memorySlide.size}>{size.label}</p>
                <p className={memorySlide.pixels}>{size.pixels}</p>
              </div>
              <ul className={memorySlide.sizes}>
                {storage.sizes.map((canvas) => (
                  <li key={canvas.label}>
                    <span>{canvas.label}</span> <span>{canvas.pixels}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className={memorySlide.bars}>
              {bars.map((bar) => (
                <li key={bar.label} data-bar="" data-on={bar.on}>
                  <p className={memorySlide.barLabel}>
                    <span>{bar.label}</span>
                    <span className={memorySlide.barValue}>{bar.value}</span>
                  </p>
                  <div className={memorySlide.track} aria-hidden="true">
                    <div
                      data-bar-fill=""
                      className={cx(memorySlide.fill, memorySlide.tone[bar.tone])}
                      style={bar.style}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label={undo.label} className={memorySlide.panel}>
            <p className={memorySlide.label}>{undo.label}</p>
            <h3 className={memorySlide.historyTitle}>{undo.title}</h3>
            <p className={memorySlide.historyBody}>{undo.body}</p>
            <div className={memorySlide.history}>
              <div className={memorySlide.grid} aria-hidden="true">
                {grid.map((cell) => (
                  <i
                    key={cell.index}
                    data-cell={cell.index}
                    data-painted={cell.painted}
                    className={memorySlide.cell}
                  />
                ))}
              </div>
              <ul aria-label={undo.label} className={memorySlide.entries}>
                {entries.map((entry) => (
                  <li
                    key={entry.text}
                    data-entry=""
                    data-on={entry.on}
                    className={memorySlide.entry}
                  >
                    {entry.text}
                  </li>
                ))}
              </ul>
            </div>
            <p className={memorySlide.footer}>{undo.footer}</p>
          </section>
        </div>
      </div>
    </Slide>
  );
}
