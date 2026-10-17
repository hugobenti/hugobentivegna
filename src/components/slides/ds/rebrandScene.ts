import type { SceneAct } from "@/content/types";

/** Act 1: when each product's own developer finishes the rebrand, one entry per product. */
export const DEV_FINISH_MS = [1000, 1500, 800, 1900, 1250, 1700] as const;
/** Act 2 starts: the products reset and one developer works on the design system. */
export const ACT2_START_MS = 2300;
/** The design system releases the new version. */
export const SYSTEM_RELEASE_MS = 3300;
/** The first product picks up the release; the rest follow WAVE_STEP_MS apart. */
export const WAVE_START_MS = 3500;
export const WAVE_STEP_MS = 120;
/** The whole scene, holding its end state after the wave. */
export const SCENE_MS = 5000;

export interface SceneFrame {
  act: SceneAct;
  products: { rebranded: boolean; developer: "working" | "done" }[];
  /** How many products show the new brand. */
  rebranded: number;
  system: "idle" | "working" | "released";
}

/** What the rebrand scene shows `elapsed` ms after it starts playing. */
export function sceneFrame(elapsed: number): SceneFrame {
  const act: SceneAct = elapsed < ACT2_START_MS ? "without" : "with";
  const products = DEV_FINISH_MS.map((finish, index) => {
    const rebranded =
      act === "without" ? elapsed >= finish : elapsed >= WAVE_START_MS + index * WAVE_STEP_MS;
    const developer: "working" | "done" =
      act === "without" && elapsed < finish ? "working" : "done";
    return { rebranded, developer };
  });
  const system = act === "without" ? "idle" : elapsed < SYSTEM_RELEASE_MS ? "working" : "released";
  return {
    act,
    products,
    rebranded: products.filter((product) => product.rebranded).length,
    system,
  };
}

/** The end of each act, shown side by side when the visitor prefers reduced motion. */
export const STILL_FRAMES: readonly SceneFrame[] = [
  sceneFrame(ACT2_START_MS - 1),
  sceneFrame(SCENE_MS),
];
