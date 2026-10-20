import type { CSSProperties } from "react";
import type { TSceneAct } from "@/content/content.type";
import type { ISceneFrame } from "./rebrandTimeline.type";

export interface ISceneProductView {
  name: string;
  rebranded: boolean;
  /** The design-system version the product shows (it only moves in act 2). */
  version: string;
  developer: "working" | "done";
  /** Act 2: the connector from the design system to this product is lit. */
  wired: boolean;
  /** `--progress` (0–1) for its developer's progress bar. */
  progress: CSSProperties;
}

export interface ISceneView {
  act: TSceneAct;
  label: string;
  title: string;
  developers: string;
  /** "3/6": products rebranded out of all of them. */
  count: string;
  showDevelopers: boolean;
  system: {
    visible: boolean;
    state: ISceneFrame["system"];
    status: string;
    progress: CSSProperties;
  };
  products: ISceneProductView[];
}
