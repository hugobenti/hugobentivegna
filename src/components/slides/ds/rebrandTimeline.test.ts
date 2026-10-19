import { describe, expect, test } from "vitest";
import {
  ACT1_MS,
  ACT2_MS,
  ACT2_START_MS,
  DEV_FINISH_MS,
  SCENE_MS,
  SYSTEM_RELEASE_MS,
  type SceneFrame,
  WAVE_START_MS,
  WAVE_STEP_MS,
  act1Frame,
  act2Frame,
  sceneFrame,
} from "./rebrandTimeline";

const rebrandedIndexes = (frame: SceneFrame) =>
  frame.products.map((product, index) => (product.rebranded ? index : -1)).filter((i) => i >= 0);

describe("act 1: without a design system", () => {
  test("starts with every developer working and nothing rebranded", () => {
    const frame = act1Frame(0);
    expect(frame.act).toBe("without");
    expect(frame.rebranded).toBe(0);
    expect(frame.products.map((product) => product.developer)).toEqual(Array(6).fill("working"));
    expect(frame.system).toBe("idle");
  });

  test("each product is rebranded only when its own developer finishes", () => {
    const frame = act1Frame(2600);
    expect(rebrandedIndexes(frame)).toEqual([0, 2, 4]);
    expect(frame.products[1]?.developer).toBe("working");
  });

  test("ends with all six rebranded, one developer each", () => {
    expect(act1Frame(ACT1_MS).rebranded).toBe(6);
  });
});

describe("act 2: with the design system", () => {
  test("starts with one developer working on the system and nothing rebranded", () => {
    const frame = act2Frame(0);
    expect(frame.act).toBe("with");
    expect(frame.rebranded).toBe(0);
    expect(frame.system).toBe("working");
  });

  test("the release lands before any product changes", () => {
    expect(act2Frame(SYSTEM_RELEASE_MS)).toMatchObject({ system: "released", rebranded: 0 });
  });

  test("then every product follows in a wave, in order", () => {
    expect(rebrandedIndexes(act2Frame(WAVE_START_MS + WAVE_STEP_MS))).toEqual([0, 1]);
  });

  test("ends released with all six rebranded", () => {
    expect(act2Frame(ACT2_MS)).toMatchObject({ system: "released", rebranded: 6 });
  });
});

describe("timing", () => {
  test("every act-1 developer finishes before the act ends", () => {
    expect(Math.max(...DEV_FINISH_MS)).toBeLessThan(ACT1_MS);
  });

  test("the wave finishes before act 2 ends", () => {
    expect(WAVE_START_MS + (DEV_FINISH_MS.length - 1) * WAVE_STEP_MS).toBeLessThan(ACT2_MS);
  });

  test("act 1's end holds for a beat before act 2 starts", () => {
    expect(ACT2_START_MS).toBeGreaterThan(ACT1_MS);
  });
});

describe("sceneFrame: both acts on one slide", () => {
  test("plays act 1 first", () => {
    expect(sceneFrame(0)).toEqual(act1Frame(0));
    expect(sceneFrame(ACT1_MS)).toMatchObject({ act: "without", rebranded: 6 });
  });

  test("then starts act 2 from its own beginning", () => {
    expect(sceneFrame(ACT2_START_MS)).toEqual(act2Frame(0));
    expect(sceneFrame(ACT2_START_MS + WAVE_START_MS)).toEqual(act2Frame(WAVE_START_MS));
  });

  test("ends on act 2's end state", () => {
    expect(sceneFrame(SCENE_MS)).toEqual(act2Frame(ACT2_MS));
  });
});
