import type { ISceneView } from "./useRebrandScene.type";

export type TRebrandSceneProps = {
  view: ISceneView;
  /** `compact` keeps three products per row, for the side-by-side still acts. */
  layout: "wide" | "compact";
};
