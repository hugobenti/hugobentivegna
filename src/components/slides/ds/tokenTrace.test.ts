import { describe, expect, test } from "vitest";
import { tokens } from "@/design-system/tokens";
import { traceToken } from "./tokenTrace";

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
    expect(chain[2]?.resolved).toBe("#ff9f43");
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
