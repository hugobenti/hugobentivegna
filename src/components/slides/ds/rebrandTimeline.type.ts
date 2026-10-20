import type { TSceneAct } from "@/content/content.type";

export interface ISceneFrame {
  act: TSceneAct;
  products: { rebranded: boolean; developer: "working" | "done" }[];
  /** How many products show the new brand. */
  rebranded: number;
  system: "idle" | "working" | "released";
}
