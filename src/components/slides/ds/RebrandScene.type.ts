import type { ISceneView } from "./useRebrandScene.type";

export type TRebrandSceneProps = {
  view: ISceneView;
  /** `compact` keeps two products per row below `sm` and three from `sm` up, for the side-by-side still acts. */
  layout: "wide" | "compact";
};
