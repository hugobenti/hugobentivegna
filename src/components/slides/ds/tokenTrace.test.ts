import { describe, expect, test } from "vitest";
import { tokens } from "@/design-system/tokens";
import { traceDuration, traceFrame, traceToken } from "./tokenTrace";

const names = (chain: readonly { name: string }[]) => chain.map((entry) => entry.name);

describe("traceToken", () => {
  test("follows a component token through its semantic role down to the palette", () => {
    const chain = traceToken(tokens, "button.primary.bg");
    expect(names(chain)).toEqual(["button.primary.bg", "color.accent", "palette.blue.400"]);
    expect(chain.map((entry) => entry.layer)).toEqual(["component", "semantic", "primitive"]);
    expect(chain[1]?.theme).toBe("midnight");
  });

  test("uses the theme's semantic value, so a rebrand lands on a different palette", () => {
    const chain = traceToken(tokens, "button.primary.bg", "solar");
    expect(names(chain)).toEqual(["button.primary.bg", "color.accent", "palette.solar.accent"]);
    expect(chain[1]?.theme).toBe("solar");
    // Every step resolves to the same color in that theme, including the shared component token.
    expect(chain.map((entry) => entry.resolved)).toEqual(["#ff9f43", "#ff9f43", "#ff9f43"]);
  });

  test("falls back to midnight for semantic tokens a theme doesn't override", () => {
    const chain = traceToken(tokens, "font.display", "solar");
    expect(names(chain)).toEqual(["font.display", "font.family.sans"]);
    expect(chain[0]?.theme).toBe("midnight");
  });

  test("a primitive traces to itself", () => {
    expect(names(traceToken(tokens, "palette.blue.400"))).toEqual(["palette.blue.400"]);
  });

  test("an unknown name returns an empty chain", () => {
    expect(traceToken(tokens, "button.tertiary.bg")).toEqual([]);
  });
});

describe("traceFrame", () => {
  test("starts on the first token with its palette step showing", () => {
    expect(traceFrame(0, 3)).toEqual({ option: 0, revealed: 1 });
  });

  test("reveals the chain one step at a time, palette first", () => {
    expect(traceFrame(700, 3)).toEqual({ option: 0, revealed: 3 });
  });

  test("moves to the next token and starts its chain over", () => {
    expect(traceFrame(1600, 3)).toEqual({ option: 1, revealed: 1 });
  });

  test("ends on the last token with its whole chain and the Button", () => {
    expect(traceFrame(traceDuration(3), 3)).toEqual({ option: 2, revealed: 4 });
    expect(traceFrame(99_999, 3)).toEqual({ option: 2, revealed: 4 });
  });

  test("finishes within 5 s, so it needs no pause control (WCAG 2.2.2)", () => {
    expect(traceDuration(3)).toBeLessThanOrEqual(5000);
  });
});
