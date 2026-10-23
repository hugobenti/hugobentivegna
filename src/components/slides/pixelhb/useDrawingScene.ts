import { pixelhbCase } from "@/content/cases";
import { usePlayback } from "../../deck/usePlayback";
import { drawingDuration, drawingOrder, drawnCount } from "./drawingTimeline";
import { COMPUTER } from "./pixelArt.data";
import { gridSize } from "./pixelGrid";

const { width, height } = gridSize(COMPUTER);
/** Outline first, then the case, the screen, its text in blue then grey (with the keys), and the light. */
const order = drawingOrder(COMPUTER, ["M", "m", "G", "r", "q", "Y"]);

/**
 * Cover drawing view model: on a transparent canvas the computer's pixels appear one after
 * another until the picture is done. Under 5 s, so there is no control; visitors who prefer
 * reduced motion, and the server render, get the finished drawing.
 */
export function useDrawingScene() {
  const { ref, elapsed } = usePlayback<HTMLDivElement>(drawingDuration);
  const drawn = drawnCount(elapsed, order.length);
  const cellState = Array.from({ length: width * height }, () => "off");
  for (const index of order.slice(0, drawn)) cellState[index] = "on";
  return { ref, grid: COMPUTER, cellState, label: pixelhbCase.drawing };
}
