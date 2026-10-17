import type { CSSProperties } from "react";
import { designSystemCase } from "@/content/cases";
import type { SceneAct } from "@/content/types";
import { cssVars } from "@/design-system/ui";
import { usePlayback } from "../../deck/usePlayback";
import {
  ACT2_START_MS,
  DEV_FINISH_MS,
  SCENE_MS,
  STILL_ELAPSED,
  SYSTEM_RELEASE_MS,
  type SceneFrame,
  sceneFrame,
} from "./rebrandTimeline";

const { rebrand } = designSystemCase;

export interface SceneProductView {
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

export interface SceneView {
  act: SceneAct;
  label: string;
  title: string;
  developers: string;
  /** "3/6": products rebranded out of all of them. */
  count: string;
  showDevelopers: boolean;
  system: {
    visible: boolean;
    state: SceneFrame["system"];
    status: string;
    progress: CSSProperties;
  };
  products: SceneProductView[];
}

const fraction = (value: number, total: number) =>
  cssVars({ progress: Math.min(1, Math.max(0, value / total)) });

/** The markup's view of one frame, `elapsed` ms into the scene. */
function sceneView(frame: SceneFrame, elapsed: number): SceneView {
  const inAct2 = frame.act === "with";
  return {
    act: frame.act,
    label: rebrand.acts[frame.act].label,
    title: rebrand.acts[frame.act].title,
    developers: rebrand.developers[frame.act],
    count: `${frame.rebranded}/${frame.products.length}`,
    showDevelopers: !inAct2,
    system: {
      visible: inAct2,
      state: frame.system,
      status: frame.system === "released" ? rebrand.system.released : rebrand.versions.before,
      progress: fraction(elapsed - ACT2_START_MS, SYSTEM_RELEASE_MS - ACT2_START_MS),
    },
    products: frame.products.map((product, index) => ({
      name: rebrand.products[index] ?? "",
      rebranded: product.rebranded,
      version: inAct2 && product.rebranded ? rebrand.versions.after : rebrand.versions.before,
      developer: product.developer,
      wired: inAct2 && product.rebranded,
      progress: fraction(elapsed, DEV_FINISH_MS[index] ?? 1),
    })),
  };
}

/**
 * Rebrand scene view model: plays act 1 then act 2 while the slide is active. Visitors who
 * prefer reduced motion get both acts at their end, side by side.
 */
export function useRebrandScene() {
  const { ref, elapsed, still } = usePlayback<HTMLDivElement>(SCENE_MS);
  const moments = still ? STILL_ELAPSED : [elapsed];
  const frames = moments.map((moment) => sceneView(sceneFrame(moment), moment));
  return { ref, still, frames };
}
