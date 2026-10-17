// Builds the design tokens: DTCG JSON in ./src → ./generated/{tokens.css, theme.css, tokens.json}.
// Run with `pnpm tokens`. Output is git-ignored; every script that needs it runs this first.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import StyleDictionary from "style-dictionary";
import { formattedVariables } from "style-dictionary/utils";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = (glob) => path.posix.join(here.split(path.sep).join("/"), "src", glob);
const outDir = path.join(here, "generated");

const PREFIX = "hb";
const THEMES = ["pixel"];
const TRANSFORMS = ["name/kebab", "fontFamily/css", "cubicBezier/css", "shadow/css/shorthand"];

/** @param {{ filePath: string }} token */
function layerOf(token) {
  if (token.filePath.includes("/primitive/")) return "primitive";
  if (token.filePath.includes("/component/")) return "component";
  return "semantic";
}

// Theme blocks omit primitives (declared once on :root, identical everywhere) but still reference
// them. Resolve references against the unfiltered tree so those var() references are expected,
// not flagged; any other warning (collisions, broken references) still fails the build.
const cssBlock = ({ dictionary, options }) =>
  `${options.selector} {\n${formattedVariables({
    format: "css",
    dictionary: { ...dictionary, tokens: dictionary.unfilteredTokens ?? dictionary.tokens },
    outputReferences: true,
    usesDtcg: true,
  })}\n}\n`;

/**
 * One Style Dictionary per theme. Midnight is the base; a theme layers its overrides on top.
 * Every [data-theme] block re-declares all semantic and component tokens, because a custom
 * property that references another (var(--hb-color-accent)) is resolved where it is declared.
 */
function dictionaryFor(theme) {
  const files =
    theme === "midnight"
      ? [
          { destination: "root.css", format: "hb/css-block", options: { selector: ":root" } },
          {
            destination: "midnight.css",
            format: "hb/css-block",
            filter: (token) => layerOf(token) !== "primitive",
            options: { selector: '[data-theme="midnight"]' },
          },
        ]
      : [
          {
            destination: `${theme}.css`,
            format: "hb/css-block",
            filter: (token) => layerOf(token) !== "primitive",
            options: { selector: `[data-theme="${theme}"]` },
          },
        ];

  return new StyleDictionary({
    include:
      theme === "midnight"
        ? [src("primitive/*.tokens.json")]
        : [src("primitive/*.tokens.json"), src("semantic/midnight.tokens.json")],
    source:
      theme === "midnight"
        ? [src("semantic/midnight.tokens.json"), src("component/*.tokens.json")]
        : [src("component/*.tokens.json"), src(`themes/${theme}.tokens.json`)],
    hooks: { formats: { "hb/css-block": cssBlock } },
    log: { verbosity: "default", warnings: "error" },
    platforms: { css: { prefix: PREFIX, transforms: TRANSFORMS, files } },
  });
}

/** Flat list of every token for the /system page and the contrast tests. */
function toEntries(tokens, theme) {
  return tokens.map((token) => ({
    name: token.path.join("."),
    cssVar: `--${token.name}`,
    type: token.$type,
    value:
      typeof token.original.$value === "string"
        ? token.original.$value
        : JSON.stringify(token.original.$value),
    resolved: typeof token.$value === "string" ? token.$value : JSON.stringify(token.$value),
    layer: layerOf(token),
    theme: layerOf(token) === "semantic" ? theme : null,
    ...(token.$description ? { description: token.$description } : {}),
  }));
}

/** Tailwind v4 theme: utilities point at the runtime variables so [data-theme] restyles them. */
function tailwindTheme(tokens) {
  const has = (cssVar) => tokens.some((t) => `--${t.name}` === cssVar);
  const lines = [
    "  /* Only design tokens are available: Tailwind's default palette, fonts and scales are removed. */",
    "  --color-*: initial;",
    "  --font-*: initial;",
    "  --text-*: initial;",
    "  --radius-*: initial;",
    "  --shadow-*: initial;",
    "  --ease-*: initial;",
    "",
  ];
  for (const t of tokens) {
    const [group, key] = t.path;
    if (group === "color" && t.path.length === 2) lines.push(`  --color-${key}: var(--${t.name});`);
  }
  lines.push(
    "",
    `  --font-sans: var(--${PREFIX}-font-body);`,
    `  --font-display: var(--${PREFIX}-font-display);`,
    `  --font-mono: var(--${PREFIX}-font-code);`,
    `  --font-pixel: var(--${PREFIX}-font-family-pixel);`,
    "",
  );
  for (const t of tokens) {
    const [group, sub, key] = t.path;
    if (group !== "font" || sub !== "size") continue;
    lines.push(`  --text-${key}: var(--${t.name});`);
    for (const [suffix, source] of [
      ["line-height", "line-height"],
      ["letter-spacing", "letter-spacing"],
    ]) {
      const cssVar = `--${PREFIX}-${source}-${key}`;
      if (has(cssVar)) lines.push(`  --text-${key}--${suffix}: var(${cssVar});`);
    }
  }
  lines.push("");
  for (const t of tokens) {
    const [group, key] = t.path;
    if (t.path.length !== 2) continue;
    if (group === "radius") lines.push(`  --radius-${key}: var(--${t.name});`);
    if (group === "shadow") lines.push(`  --shadow-${key}: var(--${t.name});`);
    if (group === "ease") lines.push(`  --ease-${key}: var(--${t.name});`);
  }
  lines.push(
    "",
    `  --spacing: var(--${PREFIX}-space-unit);`,
    `  --spacing-gutter: var(--${PREFIX}-space-gutter);`,
    `  --spacing-section: var(--${PREFIX}-space-section);`,
  );
  return `/* Generated by build.mjs. Do not edit. */\n@theme inline {\n${lines.join("\n")}\n}\n`;
}

async function build() {
  const blocks = [];
  const entries = [];
  let baseTokens = [];

  for (const theme of ["midnight", ...THEMES]) {
    const sd = dictionaryFor(theme);
    const outputs = await sd.formatPlatform("css");
    blocks.push(...outputs.map((o) => o.output));

    const { allTokens } = await sd.getPlatformTokens("css");
    if (theme === "midnight") {
      baseTokens = allTokens;
      entries.push(...toEntries(allTokens, "midnight"));
    } else {
      entries.push(
        ...toEntries(
          allTokens.filter((t) => t.isSource && layerOf(t) === "semantic"),
          theme,
        ),
      );
    }
  }

  await mkdir(outDir, { recursive: true });
  await writeFile(
    path.join(outDir, "tokens.css"),
    `/* Generated by build.mjs. Do not edit. */\n${blocks.join("\n")}`,
  );
  await writeFile(path.join(outDir, "theme.css"), tailwindTheme(baseTokens));
  await writeFile(path.join(outDir, "tokens.json"), `${JSON.stringify(entries, null, 2)}\n`);
  console.log(`tokens: ${entries.length} entries, themes: midnight, ${THEMES.join(", ")}`);
}

await build();
