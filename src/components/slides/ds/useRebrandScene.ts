import type { CSSProperties } from "react";
import { designSystemCase } from "@/content/cases";
import type { SceneAct } from "@/content/types";
import { cssVars } from "@/design-system/ui";
import { usePlayback } from "../../deck/usePlayback";
import {
  ACT1_MS,
  ACT2_MS,
  DEV_FINISH_MS,
  SYSTEM_RELEASE_MS,
  type SceneFrame,
  act1Frame,
  act2Frame,
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
  /** True only between the first and last frame, so nothing animates while waiting or holding. */
  playing: boolean;
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

/** The markup's view of one frame, `elapsed` ms into an act lasting `duration` ms. */
function sceneView(frame: SceneFrame, elapsed: number, duration: number): SceneView {
  const inAct2 = frame.act === "with";
  return {
    act: frame.act,
    label: rebrand.acts[frame.act].label,
    title: rebrand.acts[frame.act].title,
    developers: rebrand.developers[frame.act],
    count: `${frame.rebranded}/${frame.products.length}`,
    playing: elapsed > 0 && elapsed < duration,
    showDevelopers: !inAct2,
    system: {
      visible: inAct2,
      state: frame.system,
      status: frame.system === "released" ? rebrand.system.released : rebrand.versions.before,
      progress: fraction(elapsed, SYSTEM_RELEASE_MS),
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

/** One act's playback: it runs while that act's own scroll step crosses the centre line. */
function useAct(act: SceneAct) {
  const duration = act === "without" ? ACT1_MS : ACT2_MS;
  const { ref, elapsed } = usePlayback<HTMLDivElement>(duration);
  const frame = act === "without" ? act1Frame(elapsed) : act2Frame(elapsed);
  return { ref, view: sceneView(frame, elapsed, duration) };
}

/**
 * Rebrand scene view model: one entry per act, each played by its own scroll step. Visitors who
 * prefer reduced motion get each act at its end.
 */
export function useRebrandScene() {
  const without = useAct("without");
  const withSystem = useAct("with");
  return {
    withoutRef: without.ref,
    withRef: withSystem.ref,
    views: { without: without.view, with: withSystem.view },
  };
}
