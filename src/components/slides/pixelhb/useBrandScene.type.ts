import type { IBrandAsset } from "@/content/content.type";
import type { TPixelGrid } from "./pixelGrid.type";

export interface IBrandSceneAsset extends Omit<IBrandAsset, "grid"> {
  /** The brand grid the asset draws. */
  grid: TPixelGrid;
  on: boolean;
}
