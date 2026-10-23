import { describe, expect, test } from "vitest";
import { tokens } from "@/design-system/tokens";
import { traceToken } from "./tokenTrace";

const names = (chain: readonly { name: string }[]) => chain.map((entry) => entry.name);

describe("traceToken", () => {
  test("follows a component token through its semantic role down to the palette", () => {
    const chain = traceToken(tokens, "button.primary.bg");
    expect(names(chain)).toEqual(["button.primary.bg", "color.accent", "palette.blue.400"]);
    expect(chain.map((entry) => entry.layer)).toEqual(["component", "semantic", "primitive"]);
  });

  test("a primitive traces to itself", () => {
    expect(names(traceToken(tokens, "palette.blue.400"))).toEqual(["palette.blue.400"]);
  });

  test("an unknown name returns an empty chain", () => {
    expect(traceToken(tokens, "button.tertiary.bg")).toEqual([]);
  });
});
