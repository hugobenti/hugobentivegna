import { pixelhbCase } from "@/content/cases";
import type { ITool } from "@/content/content.type";
import { usePlaybackControl } from "../../deck/usePlaybackControl";
import { exactCard, exactDuration, exactFillCount, exactFrame } from "./exactTimeline";
import type { TPixelArtSize } from "./PixelArt.type";
import { HEART } from "./pixelArt.data";
import { cellStates, gridCells, gridSize } from "./pixelGrid";
import type { TPixelKey } from "./pixelGrid.type";
import type { IExactLoupe, IExactSceneTool, IZoomStep, TRingKey } from "./useExactScene.type";

const { exact } = pixelhbCase;
const duration = exactDuration(exact.tools.length);
const fillIndex = exact.tools.findIndex((tool) => tool.demo === "fill");
const { width, height } = gridSize(HEART);
/** The cell the loupe is centred on: one of the heart's shade pixels, the second amber. */
const POINTER = { x: 9, y: 5 };
/** The loupe shows the pointer's cell and this many cells around it: a 5 × 5 patch. */
export const LOUPE_RADIUS = 2;
/** The key the bucket fills: the heart's main amber (its outline and shade are already drawn). */
const FILL_KEY: TPixelKey = "r";
/** The fill demo's hearts: outline and shade drawn, the amber left for the bucket. */
const HEARTS = 3;
const cells = gridCells(HEART);
const patch = HEART.slice(POINTER.y - LOUPE_RADIUS, POINTER.y + LOUPE_RADIUS + 1).map((row) =>
  row.slice(POINTER.x - LOUPE_RADIUS, POINTER.x + LOUPE_RADIUS + 1),
);
const picked = HEART[POINTER.y]?.[POINTER.x] as TRingKey;
/** The color in hand before picking: the fill's main amber, so the ring compares the two ambers. */
const CURRENT: TRingKey = "r";
/** The heart at 1×, 2× and 4×: whole multiples of its 12 pixels. */
const zoomSizes: TPixelArtSize[] = ["heart1x", "heart2x", "heart4x"];

/**
 * Pixel-exact chapter view model: the four tool cards light in turn (a card stays lit once it
 * has had its turn). Every demo shows its first frame from the start, so no box is ever empty:
 * zoom the 1× heart, grid the heart, fill the outlined hearts, the loupe its ring. On its card's
 * turn the rest fades in: the 2× and 4× hearts, the grid lines, three bucket clicks that fill the
 * hearts' amber one heart each, and the loupe's lens. All copy is rendered from the start and
 * every demo's box is reserved, so only opacity changes.
 */
export function useExactScene() {
  const { ref, elapsed, control } = usePlaybackControl<HTMLUListElement>(duration);
  const frame = exactFrame(elapsed, exact.tools.length);
  const filled = exactFillCount(frame, fillIndex, HEARTS);
  const fills = Array.from({ length: HEARTS }, (_, heart) =>
    cellStates(
      width * height,
      cells.filter((cell) => cell.key !== FILL_KEY || heart < filled).map((cell) => cell.index),
    ),
  );

  const tools = exact.tools.map((tool, index): IExactSceneTool => {
    const state = exactCard(frame, index);
    return { ...tool, on: state !== "idle", state };
  });
  const turned = (demo: ITool["demo"]) => tools.some((tool) => tool.demo === demo && tool.on);

  return {
    ref,
    tools,
    demos: {
      zoom: zoomSizes.map((size, index): IZoomStep => ({
        size,
        on: index === 0 || turned("zoom"),
      })),
      heart: HEART,
      /** The grid lines over the heart; the heart itself shows from the start. */
      grid: turned("grid"),
      fills,
      loupe: {
        grid: patch,
        picked,
        current: CURRENT,
        lens: turned("loupe"),
      } satisfies IExactLoupe,
    },
    control,
  };
}
