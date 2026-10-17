import { describe, expect, test } from "vitest";
import {
  ACT2_START_MS,
  DEV_FINISH_MS,
  SCENE_MS,
  SYSTEM_RELEASE_MS,
  WAVE_START_MS,
  WAVE_STEP_MS,
  sceneFrame,
} from "./rebrandTimeline";

const rebrandedIndexes = (elapsed: number) =>
  sceneFrame(elapsed)
    .products.map((product, index) => (product.rebranded ? index : -1))
    .filter((index) => index >= 0);

describe("act 1: without a design system", () => {
  test("starts with every developer working and nothing rebranded", () => {
    const frame = sceneFrame(0);
    expect(frame.act).toBe("without");
    expect(frame.rebranded).toBe(0);
    expect(frame.products.map((product) => product.developer)).toEqual(Array(6).fill("working"));
    expect(frame.system).toBe("idle");
  });

  test("each product is rebranded only when its own developer finishes", () => {
    expect(rebrandedIndexes(1300)).toEqual([0, 2, 4]);
    expect(sceneFrame(1300).rebranded).toBe(3);
    expect(sceneFrame(1300).products[1]?.developer).toBe("working");
  });

  test("ends with all six rebranded, one developer each", () => {
    expect(sceneFrame(ACT2_START_MS - 1).rebranded).toBe(6);
  });
});

describe("act 2: with the design system", () => {
  test("starts over: the products reset while one developer works on the system", () => {
    const frame = sceneFrame(ACT2_START_MS);
    expect(frame.act).toBe("with");
    expect(frame.rebranded).toBe(0);
    expect(frame.system).toBe("working");
  });

  test("the release lands before any product changes", () => {
    expect(sceneFrame(SYSTEM_RELEASE_MS).system).toBe("released");
    expect(sceneFrame(SYSTEM_RELEASE_MS).rebranded).toBe(0);
  });

  test("then every product follows in a quick wave, in order", () => {
    expect(rebrandedIndexes(WAVE_START_MS + WAVE_STEP_MS)).toEqual([0, 1]);
  });

  test("ends released with all six rebranded", () => {
    expect(sceneFrame(SCENE_MS)).toMatchObject({ act: "with", system: "released", rebranded: 6 });
  });
});

describe("timing", () => {
  test("every act-1 developer finishes before act 2 starts", () => {
    expect(Math.max(...DEV_FINISH_MS)).toBeLessThan(ACT2_START_MS);
  });

  test("the wave finishes before the scene ends", () => {
    expect(WAVE_START_MS + (DEV_FINISH_MS.length - 1) * WAVE_STEP_MS).toBeLessThan(SCENE_MS);
  });

  test("the whole scene runs within 5 s, so it needs no pause control (WCAG 2.2.2)", () => {
    expect(SCENE_MS).toBeLessThanOrEqual(5000);
  });
});
