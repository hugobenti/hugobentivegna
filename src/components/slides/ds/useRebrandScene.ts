import { designSystemCase } from "@/content/cases";
import { cssVars } from "@/design-system/ui";
import { usePlayback } from "../../deck/usePlayback";
import {
  ACT2_START_MS,
  DEV_FINISH_MS,
  SCENE_MS,
  SYSTEM_RELEASE_MS,
  act1Frame,
  act2Frame,
  sceneFrame,
} from "./rebrandTimeline";
import type { ISceneFrame } from "./rebrandTimeline.type";
import type { ISceneView } from "./useRebrandScene.type";

const { rebrand } = designSystemCase;
const fraction = (value: number, total: number) =>
  cssVars({ progress: Math.min(1, Math.max(0, value / total)) });

/** The markup's view of one frame, `elapsed` ms into its own act. */
function sceneView(frame: ISceneFrame, elapsed: number): ISceneView {
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

/** Both acts at their end, side by side, for visitors who prefer reduced motion. */
const STILL_VIEWS = [
  sceneView(act1Frame(SCENE_MS), SCENE_MS),
  sceneView(act2Frame(SCENE_MS), SCENE_MS),
];

/**
 * Rebrand scene view model: act 1 then act 2 on one slide, flagged WITHOUT / WITH, with the one
 * control the scene needs because it runs longer than 5 s.
 */
export function useRebrandScene() {
  const { ref, elapsed, still, paused, finished, toggle } = usePlayback<HTMLDivElement>(SCENE_MS);
  const frame = sceneFrame(elapsed);
  const actElapsed = frame.act === "with" ? elapsed - ACT2_START_MS : elapsed;
  return {
    ref,
    still,
    views: still ? STILL_VIEWS : [sceneView(frame, actElapsed)],
    /** Nothing animates while the scene waits, holds at the end, or is paused. */
    playing: elapsed > 0 && !finished && !paused,
    flags: (["without", "with"] as const).map((act) => ({
      act,
      label: rebrand.acts[act].label,
      active: !still && frame.act === act,
    })),
    control: {
      label: finished
        ? rebrand.controls.replay
        : paused
          ? rebrand.controls.play
          : rebrand.controls.pause,
      toggle,
    },
  };
}
