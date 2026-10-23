"use client";

import { pixelhbCase } from "@/content/cases";
import { slides } from "@/content/slides";
import { cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { Slide } from "../../deck/Slide";
import { stagger } from "../../deck/stagger";
import { brandSlide } from "./BrandSlide.style";
import { PixelArt } from "./PixelArt";
import { PENCIL } from "./pixelArt.data";
import { useBrandScene } from "./useBrandScene";

const { brand } = pixelhbCase;

/** Chapter 01 of the PixelHB case: the logo pencil draws itself, then shows at three sizes. */
export function BrandSlide() {
  const { ref, cellState, assets, caption } = useBrandScene();
  return (
    <Slide slide={slides.pixelBrand}>
      <div className={brandSlide.content}>
        <div>
          <p className={cx(deck.reveal, brandSlide.kicker)} style={stagger(0)}>
            {brand.kicker}
          </p>
          <h2 className={cx(deck.reveal, brandSlide.title)} style={stagger(1)}>
            {brand.title}
          </h2>
          <p className={cx(deck.reveal, brandSlide.body)} style={stagger(2)}>
            {brand.body}
          </p>
          <ul
            aria-label={brand.rulesLabel}
            className={cx(deck.reveal, brandSlide.rules)}
            style={stagger(3)}
          >
            {brand.rules.map((rule) => (
              <li key={rule} className={brandSlide.rule}>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={ref}
          data-playback=""
          className={cx(deck.reveal, brandSlide.panel)}
          style={stagger(4)}
        >
          <p className={brandSlide.caption} aria-hidden="true">
            {caption}
          </p>
          <div className={brandSlide.stage}>
            <div className={brandSlide.grid}>
              <PixelArt
                grid={PENCIL}
                label={brand.caption}
                size="pencil8x"
                cells
                cellState={cellState}
              />
            </div>
          </div>
          <ul className={brandSlide.assets}>
            {assets.map((asset) => (
              <li key={asset.label} data-asset="" data-on={asset.on} className={brandSlide.asset}>
                <PixelArt grid={asset.grid} label={asset.label} size={asset.size} />
                <span className={brandSlide.assetLabel}>{asset.label}</span>
              </li>
            ))}
          </ul>
          <p className={brandSlide.summary}>{brand.done}</p>
        </div>
      </div>
    </Slide>
  );
}
