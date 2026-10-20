import { describe, expect, test } from "vitest";
import { contrastRatio, themes, tokens } from "./index";
import type { TThemeName } from "./tokens.type";

/** Resolved semantic colors for a theme; tokens a theme doesn't override fall back to midnight. */
function semanticColors(theme: TThemeName): Record<string, string> {
  const colors: Record<string, string> = {};
  for (const source of ["midnight", theme] as const) {
    for (const t of tokens) {
      if (t.layer === "semantic" && t.type === "color" && t.theme === source) {
        colors[t.name.replace(/^color\./, "")] = t.resolved;
      }
    }
  }
  return colors;
}

function ratio(colors: Record<string, string>, fg: string, bg: string): number {
  const a = colors[fg];
  const b = colors[bg];
  if (!a || !b) throw new Error(`missing semantic color: ${!a ? fg : bg}`);
  return contrastRatio(a, b);
}

describe("contrastRatio", () => {
  test("matches WCAG reference values", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
    expect(contrastRatio("#777777", "#ffffff")).toBeCloseTo(4.48, 2);
    expect(contrastRatio("#fff", "#000")).toBeCloseTo(21, 1);
  });

  test("is symmetric", () => {
    expect(contrastRatio("#5aa2ff", "#0a0a0d")).toBeCloseTo(
      contrastRatio("#0a0a0d", "#5aa2ff"),
      10,
    );
  });

  test("rejects values it cannot judge", () => {
    expect(() => contrastRatio("#408cff59", "#000")).toThrow(/opaque hex/);
    expect(() => contrastRatio("blue", "#000")).toThrow(/opaque hex/);
  });
});

describe.each(themes)("%s theme meets WCAG 2.2 AA", (theme) => {
  const c = semanticColors(theme);

  test.each([
    ["fg", "bg"],
    ["fg", "surface"],
    ["muted", "bg"],
    ["muted", "surface"],
    ["subtle", "bg"],
    ["subtle", "surface"],
  ])("text %s on %s ≥ 4.5:1", (fg, bg) => {
    expect(ratio(c, fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  test("text on an accent fill ≥ 4.5:1", () => {
    expect(ratio(c, "on-accent", "accent")).toBeGreaterThanOrEqual(4.5);
  });

  test.each([
    ["success", "bg"],
    ["success", "surface"],
    ["warning", "bg"],
    ["warning", "surface"],
    ["danger", "bg"],
    ["danger", "surface"],
  ])("status text %s on %s ≥ 4.5:1", (fg, bg) => {
    expect(ratio(c, fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  test.each([
    ["accent", "bg"],
    ["focus", "bg"],
    ["focus", "surface"],
  ])("UI %s on %s ≥ 3:1", (fg, bg) => {
    expect(ratio(c, fg, bg)).toBeGreaterThanOrEqual(3);
  });
});

describe("rebrand scene brands meet WCAG 2.2 AA on the mock product screens", () => {
  const primitive = (name: string) => {
    const token = tokens.find((t) => t.layer === "primitive" && t.name === name);
    if (!token) throw new Error(`missing primitive: ${name}`);
    return token.resolved;
  };

  test.each(["palette.bank.before", "palette.bank.after"])("%s", (brand) => {
    // White labels on the brand header and buttons.
    expect(contrastRatio(primitive("palette.ink.50"), primitive(brand))).toBeGreaterThanOrEqual(
      4.5,
    );
    // A brand fill must read against the dark mock surface.
    expect(contrastRatio(primitive(brand), primitive("palette.ink.900"))).toBeGreaterThanOrEqual(3);
  });
});
