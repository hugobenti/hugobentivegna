import type { TSceneAct } from "@/content/content.type";
import type { ISceneFrame } from "./rebrandTimeline.type";

/** Act 1: when each product's own developer finishes the rebrand, one entry per product. */
export const DEV_FINISH_MS = [2000, 3000, 1600, 3800, 2500, 3400] as const;
/** Act 1 plays this long, holding its end state after the last developer finishes. */
export const ACT1_MS = 4500;
/** Act 2: the design system releases the new version. */
export const SYSTEM_RELEASE_MS = 1800;
/** The first product picks up the release; the rest follow WAVE_STEP_MS apart. */
export const WAVE_START_MS = 2100;
export const WAVE_STEP_MS = 200;
/** Act 2 plays this long, holding its end state after the wave. */
export const ACT2_MS = 4500;
/** On one slide, act 2 starts after act 1's end has held for a beat. */
export const ACT2_START_MS = ACT1_MS + 700;
/** Both acts, back to back. Longer than 5 s, so the slide offers a pause (WCAG 2.2.2). */
export const SCENE_MS = ACT2_START_MS + ACT2_MS;

function frame(act: TSceneAct, products: ISceneFrame["products"], system: ISceneFrame["system"]) {
  return {
    act,
    products,
    rebranded: products.filter((product) => product.rebranded).length,
    system,
  };
}

/** Act 1, `elapsed` ms in: a developer on every product makes the same rebrand by hand. */
export function act1Frame(elapsed: number): ISceneFrame {
  return frame(
    "without",
    DEV_FINISH_MS.map((finish) => ({
      rebranded: elapsed >= finish,
      developer: elapsed >= finish ? "done" : "working",
    })),
    "idle",
  );
}

/** Act 2, `elapsed` ms in: one developer changes the system, then every product follows. */
export function act2Frame(elapsed: number): ISceneFrame {
  return frame(
    "with",
    DEV_FINISH_MS.map((_, index) => ({
      rebranded: elapsed >= WAVE_START_MS + index * WAVE_STEP_MS,
      developer: "done",
    })),
    elapsed < SYSTEM_RELEASE_MS ? "working" : "released",
  );
}

/** The whole scene, `elapsed` ms in: act 1, a short hold, then act 2 from its own start. */
export function sceneFrame(elapsed: number): ISceneFrame {
  return elapsed < ACT2_START_MS ? act1Frame(elapsed) : act2Frame(elapsed - ACT2_START_MS);
}
