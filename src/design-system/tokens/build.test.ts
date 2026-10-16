import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

const generatedDir = path.join(__dirname, "generated");

/** Body of the CSS block for a selector, e.g. '[data-theme="solar"]'. */
function block(css: string, selector: string): string {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`no block for ${selector}`);
  return css.slice(start, css.indexOf("}", start));
}

describe("tokens.css", () => {
  const css = readFileSync(path.join(generatedDir, "tokens.css"), "utf8");

  test("semantic tokens reference primitives instead of copying values", () => {
    expect(block(css, ":root")).toMatch(/--hb-color-bg:\s*var\(--hb-palette-/);
  });

  test.each(["midnight", "solar", "forest", "pixel"])(
    "the %s block re-declares component tokens so they resolve against its own colors",
    (theme) => {
      const body = block(css, `[data-theme="${theme}"]`);
      expect(body).toContain("--hb-color-accent:");
      expect(body).toContain("--hb-button-primary-bg: var(--hb-color-accent)");
      expect(body).toContain("--hb-shadow-glow:");
    },
  );

  test("the pixel theme swaps the display font and nothing else changes fonts", () => {
    expect(block(css, '[data-theme="pixel"]')).toContain(
      "--hb-font-display: var(--hb-font-family-pixel)",
    );
    expect(block(css, '[data-theme="solar"]')).toContain(
      "--hb-font-display: var(--hb-font-family-sans)",
    );
  });
});

describe("theme.css (Tailwind)", () => {
  const theme = readFileSync(path.join(generatedDir, "theme.css"), "utf8");

  test("utilities point at runtime variables, so [data-theme] restyles them", () => {
    expect(theme).toContain("@theme inline");
    expect(theme).toContain("--color-accent: var(--hb-color-accent)");
    expect(theme).toContain("--font-display: var(--hb-font-display)");
  });

  test("Tailwind's default palette is removed so only token colors exist", () => {
    expect(theme).toContain("--color-*: initial;");
  });
});
