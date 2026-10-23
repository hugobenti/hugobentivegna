"use client";

import { drawingDemo } from "./DrawingDemo.style";
import { PixelArt } from "./PixelArt";
import { useDrawingScene } from "./useDrawingScene";

/** The PixelHB cover's picture: a sprite drawing itself, pixel by pixel, on a transparent canvas. */
export function DrawingDemo() {
  const { ref, grid, cellState, label } = useDrawingScene();
  return (
    <div ref={ref} className={drawingDemo.frame}>
      <div className={drawingDemo.canvas}>
        <PixelArt grid={grid} label={label} size="drawing" cells cellState={cellState} />
      </div>
    </div>
  );
}
