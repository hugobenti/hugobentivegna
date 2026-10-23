import { pixelhbCase } from "@/content/cases";
import { usePlayback } from "../../deck/usePlayback";
import { exactCard, exactDuration, exactFillCount, exactFrame } from "./exactTimeline";
import type { TPixelArtSize } from "./PixelArt.type";
import { HEART } from "./pixelArt.data";
import { gridCells, gridSize } from "./pixelGrid";
import type { IExactSceneTool, TRingKey } from "./useExactScene.type";

const { exact, controls } = pixelhbCase;
const duration = exactDuration(exact.tools.length);
const fillIndex = exact.tools.findIndex((tool) => tool.demo === "fill");
const { width, height } = gridSize(HEART);
/** The cell the loupe is centred on: one of the heart's shade pixels, the second blue. */
const POINTER = { x: 9, y: 5 };
/** The fill demo's hearts: outline and shade drawn, the blue left for the bucket. */
const HEARTS = 3;
const cells = gridCells(HEART);
const patch = HEART.slice(POINTER.y - 2, POINTER.y + 3).map((row) =>
  row.slice(POINTER.x - 2, POINTER.x + 3),
);
const picked = HEART[POINTER.y]?.[POINTER.x] as TRingKey;
/** The color in hand before picking: the main blue, so the ring compares the two blues. */
const CURRENT: TRingKey = "r";
/** The heart at 1×, 2× and 4×: whole multiples of its 12 pixels. */
const zoomSizes: TPixelArtSize[] = ["heart1x", "heart2x", "heart4x"];

/**
 * Pixel-exact chapter view model: the four tool cards light in turn (a card stays lit once it
 * has had its turn), each fading in its demo. The fill demo fills three hearts' blue, in the
 * order of three bucket clicks, one heart each; the zoom, grid and loupe demos are static drawings.
 * All copy is rendered from the start and every demo's box is reserved, so only opacity changes.
 */
export function useExactScene() {
  const { ref, elapsed, paused, finished, controllable, toggle } =
    usePlayback<HTMLUListElement>(duration);
  const frame = exactFrame(elapsed, exact.tools.length);
  const filled = exactFillCount(frame, fillIndex, HEARTS);
  const fills = Array.from({ length: HEARTS }, (_, heart) => {
    const state = Array.from({ length: width * height }, () => "off");
    for (const cell of cells) if (cell.key !== "r" || heart < filled) state[cell.index] = "on";
    return state;
  });

  return {
    ref,
    tools: exact.tools.map((tool, index): IExactSceneTool => {
      const state = exactCard(frame, index);
      return { ...tool, on: state !== "idle", state };
    }),
    demos: {
      zoom: zoomSizes,
      heart: HEART,
      fills,
      loupe: {
        grid: patch,
        picked,
        current: CURRENT,
      },
    },
    control: {
      /** Only offered while it can act and something moves (not without JS or motion). */
      shown: controllable,
      label: finished ? controls.replay : paused ? controls.play : controls.pause,
      toggle,
    },
  };
}
