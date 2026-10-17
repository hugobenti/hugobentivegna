import type { SceneAct } from "@/content/types";

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

export interface SceneFrame {
  act: SceneAct;
  products: { rebranded: boolean; developer: "working" | "done" }[];
  /** How many products show the new brand. */
  rebranded: number;
  system: "idle" | "working" | "released";
}

function frame(act: SceneAct, products: SceneFrame["products"], system: SceneFrame["system"]) {
  return {
    act,
    products,
    rebranded: products.filter((product) => product.rebranded).length,
    system,
  };
}

/** Act 1, `elapsed` ms in: a developer on every product makes the same rebrand by hand. */
export function act1Frame(elapsed: number): SceneFrame {
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
export function act2Frame(elapsed: number): SceneFrame {
  return frame(
    "with",
    DEV_FINISH_MS.map((_, index) => ({
      rebranded: elapsed >= WAVE_START_MS + index * WAVE_STEP_MS,
      developer: "done",
    })),
    elapsed < SYSTEM_RELEASE_MS ? "working" : "released",
  );
}
