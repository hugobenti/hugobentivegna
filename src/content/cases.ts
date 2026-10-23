import type { IAiCase, IDesignSystemCase, IPixelhbCase } from "./content.type";

/** Design-system case: the real story, told without naming the company (spec 2026-10-17). */
export const designSystemCase: IDesignSystemCase = {
  cover: {
    kicker: "Case study · Design systems",
    title: "The design system behind a digital bank's 5+ products.",
    body: "How design and code became one system, and what happened when the brand changed.",
    meta: [
      { label: "When", value: "2022 – 2025" },
      { label: "My role", value: "Built it, then scaled it as front-end architect" },
      { label: "With", value: "The design team and product squads" },
    ],
    chapters: [
      { number: "01", label: "The problem" },
      { number: "02", label: "One system" },
      { number: "03", label: "The rebrand" },
    ],
  },
  problem: {
    kicker: "01 · The problem",
    title: "Figma had the screens. Code had copies.",
    body: "At a digital bank with 5+ products, the design team kept every screen in Figma. In code, each project rebuilt the same components, so every change had to be made once per product.",
  },
  decision: {
    kicker: "02 · One system, built together",
    title:
      "A well-documented design system is the source of truth that connects design and development.",
    body: "As the components matured in code, the Figma library matured with them. Colors and type kept the same names on both sides, and I was the engineering voice in design discussions.",
    tokensLabel: "Tokens the button is built from",
    groups: [
      { label: "Shape", tokens: [{ token: "button.radius" }] },
      { label: "Color", tokens: [{ token: "button.primary.bg" }, { token: "button.primary.fg" }] },
      {
        label: "Typography",
        tokens: [
          { token: "font.body", display: "Inter Tight" },
          { token: "font.size.small" },
          { token: "font.weight.medium" },
        ],
      },
    ],
    steps: [
      { part: "shape", caption: "Shape", tokens: ["button.radius"] },
      { part: "fill", caption: "Fill", tokens: ["button.primary.bg"] },
      { part: "label", caption: "Label", tokens: ["button.primary.fg"] },
      {
        part: "type",
        caption: "Type",
        tokens: ["font.body", "font.size.small", "font.weight.medium"],
      },
    ],
    buttonLabel: "Continue",
    done: "Every value is a named token, shared with Figma.",
  },
  rebrand: {
    kicker: "03 · The rebrand",
    title: "Then the brand changed, across 5+ products.",
    lead: "A dark theme had already tested the names. The rebrand was the real one.",
    closing: "The squads updated a version and fixed a few details in their page CSS.",
    acts: {
      without: {
        label: "Without a design system",
        title: "The same rebrand, done six times.",
        summary:
          "Without a design system, a developer on each product makes the same rebrand by hand.",
      },
      with: {
        label: "With the design system",
        title: "Done once. Every product follows.",
        summary:
          "With the design system, one developer changes it once, releases a new version, and every product updates.",
      },
    },
    developers: { without: "6 developers", with: "1 developer" },
    rebrandedLabel: "products rebranded",
    controls: { pause: "Pause", play: "Play", replay: "Replay" },
    system: {
      name: "design-system",
      released: "v2.0 released",
      missing: "No shared component library",
    },
    versions: { before: "v1.8", after: "v2.0" },
    products: ["Accounts", "Payments", "Cards", "Invest", "Exchange", "Loans"],
    product: { balanceLabel: "Balance", balance: "$ 12,480.00", action: "Continue" },
  },
};

/** AI case: how the IoT portal's front-end was set up for AI agents, company not named (spec 2026-10-19). */
export const aiCase: IAiCase = {
  cover: {
    kicker: "Case study · AI-assisted development",
    title: "A front-end built for two readers: engineers and AI agents.",
    body: "How I set up a new IoT portal so AI could help build it, fast and on-pattern.",
    meta: [
      { label: "When", value: "2025 – 2026" },
      { label: "My role", value: "Built the UI Kit foundation and the portal's pages" },
      { label: "With", value: "Product, backend teams and AI agents" },
    ],
    chapters: [
      { number: "01", label: "Find the gaps" },
      { number: "02", label: "Lay the foundation" },
      { number: "03", label: "Build on it" },
    ],
  },
  controls: { pause: "Pause", play: "Play", replay: "Replay" },
  gaps: {
    kicker: "01 · Find the gaps",
    title: "Before writing code, I asked what was missing.",
    body: "Through MCP, an AI agent read the product docs, the tech spec and the company's Git repositories. Checking the real code, not just the docs, showed exactly what each screen needed, what the API already did, and what was missing: endpoints, data, filters.",
    feature: "Feature · Devices",
    illustration: "Illustration",
    sources: [
      { label: "Product docs", reading: "Reading what product expects…" },
      { label: "Tech spec", reading: "Reading what the tech spec planned…" },
      {
        label: "Git repositories",
        badge: "MCP",
        reading: "Checking the code in the Git repositories…",
      },
    ],
    checksLabel: "What product expects for the Devices feature",
    checks: [
      {
        expectation: "A list of every device",
        result: "ready",
        badge: "Ready",
        reason: "Planned in the spec and served by the API.",
      },
      {
        expectation: "Filter by several statuses at once",
        result: "gap",
        badge: "Filter limit",
        reason: "The API accepts one status per request.",
      },
      {
        expectation: "Data used this month, per device",
        result: "gap",
        badge: "Data not planned",
        reason: "Product expects it; the tech spec never planned it.",
      },
      {
        expectation: "A history page for each device",
        result: "gap",
        badge: "Missing endpoint",
        reason: "The spec describes it; the code has no route for it yet.",
      },
    ],
    done: "Three gaps found before any code was written.",
  },
  foundation: {
    kicker: "02 · Lay the foundation",
    title: "Rules the agent reads, and rules it can't break.",
    body: "I documented the UI Kit for two readers: when to use each component, when not to, and how it stays accessible. AGENTS.md set the repository's conventions, and lint rules turned the important ones into errors.",
    note: "From this site's repository, built the same way.",
    excerptsLabel: "Excerpts from this site's repository",
    excerpts: [
      {
        file: "AGENTS.md",
        kind: "repository rules",
        reader: "read by the agent",
        source: "AGENTS.md",
        lines: [
          { text: "Every .tsx component is presentation only.", tone: "strong" },
          {
            text: "It renders props and what its hook returns: no logic, no data, no class strings.",
          },
        ],
      },
      {
        file: "Button.mdx",
        kind: "usage guide",
        reader: "read by the agent",
        source: "src/design-system/ui/Button/Button.mdx",
        lines: [
          { text: "Don't use when", tone: "label" },
          { text: "The text is part of a sentence: use a plain link." },
          {
            text: "You need more than one primary in the same view: demote the others to secondary or ghost.",
          },
        ],
      },
      {
        file: "pnpm lint",
        kind: "eslint.config.mjs",
        reader: "enforced on every change",
        source: "eslint.config.mjs",
        lines: [
          // Real output of today's rule on TimelineAxis.tsx as it was before commit e833f74.
          { text: "TimelineAxis.tsx", tone: "label", output: true },
          { text: "22:19 error", tone: "error", output: true },
          {
            text: "Components are presentation: derive values in a useX.ts hook or a .ts module, not in .tsx",
          },
          { text: "✖ 11 problems (11 errors, 0 warnings)", tone: "error", output: true },
        ],
      },
    ],
  },
  build: {
    kicker: "03 · Build on it",
    title: "Then page after page, on the same patterns.",
    body: "AI drafted each page from the kit and the documented patterns. I reviewed every change, and tests decided when a task was done. Speed and quality stopped pulling against each other.",
    closing: "This site was built the same way. The rules, docs and reviews are on GitHub.",
    repo: { label: "See the repository", href: "https://github.com/hugobenti/hugobentivegna" },
    review: {
      label: "PR #5 · TimelineAxis.tsx",
      stages: ["Draft", "Review", "Fix", "Rule", "Checks", "Merged"],
      // TimelineAxis.tsx before and after commit e833f74: the lines the hook replaced, verbatim
      // with one indent level removed.
      before: [
        "const scale = timelineScale(entries);",
        "const stateOf = (index: number): State =>",
        "  activeIndex === undefined || index < activeIndex",
        '    ? "past"',
        "    : index === activeIndex",
        '      ? "current"',
        '      : "future";',
        "const fill = activeIndex === undefined ? 100 : (scale.spans[activeIndex]?.to ?? 0);",
      ],
      after: "const { ticks, spans, dots, fill } = useTimelineAxis(entries, activeIndex);",
      removedLabel: "Removed:",
      addedLabel: "Added:",
      comment: {
        author: "Hugo · review",
        // Hugo's review feedback on PR #5, in the wording he approved on 2026-10-19.
        body: "Components should only render. Move this logic into a hook and keep it out of the .tsx.",
        resolved: "Resolved",
      },
      rule: {
        file: "+ eslint.config.mjs · logicRules",
        message:
          "Components are presentation: derive values in a useX.ts hook or a .ts module, not in .tsx",
      },
      checks: ["lint", "typecheck", "tests", "build"],
      /** Pending vs passed is shown by the mark, not only by color. Same width in mono. */
      checkMarks: { pending: "○", passed: "✓" },
      status: { open: "Open", merged: "Merged" },
    },
  },
};

/** PixelHB case: a pixel-art editor I designed and built (spec 2026-10-23). */
export const pixelhbCase: IPixelhbCase = {
  mark: "PixelHB",
  brand: {
    kicker: "01 · Signed in pixels",
    title: "One grid, every size.",
    body: "The mark is a pixel pencil with my initials, HB, stamped on it. It's real pixel art: the grids in the brand spec generate the logo, the favicon, the app icons and the social image.",
    rulesLabel: "Brand rules",
    rules: [
      "Whole-number scaling only",
      "Crisp edges, never smoothed",
      "Five pixels of clear space",
      "The pencil is never recolored",
    ],
    caption: "pencil · 33 × 7",
    assets: [
      { label: "Logo", size: "lockup2x", grid: "lockup" },
      { label: "Favicon · 16 px", size: "icon1x", grid: "icon" },
      { label: "Icon · 48 px", size: "icon3x", grid: "icon" },
    ],
    done: "Same pixels at every size.",
  },
  controls: { pause: "Pause", play: "Play", replay: "Replay" },
  memory: {
    kicker: "02 · A million pixels",
    title: "A million pixels in one megabyte.",
    body: "A 1000 × 1000 canvas holds a million pixels. Stored as hex color strings, one state of it takes about 16 MB. PixelHB stores each layer as a Uint8Array instead: one byte per pixel, an index into a palette of up to 256 colors.",
    storage: {
      label: "Storage",
      sizes: [
        { label: "16 × 16", pixels: "256 pixels", scale: 0.016 },
        { label: "64 × 64", pixels: "4,096 pixels", scale: 0.064 },
        { label: "256 × 256", pixels: "65,536 pixels", scale: 0.256 },
        { label: "1000 × 1000", pixels: "1,000,000 pixels", scale: 1 },
      ],
      bars: [
        { label: "Hex color strings", value: "≈ 16 MB", share: 1 },
        { label: "Palette indexes", value: "1 MB", share: 0.0625 },
      ],
    },
    history: {
      label: "Undo history",
      title: "Undo keeps changes, not copies.",
      body: "A stroke records only the pixels it changed: the layer, the pixel, the color before and after. A pixel painted twice in one stroke is one entry.",
      grid: 8,
      stroke: [
        { index: 18, entry: "pixel 18 · 3 → 7" },
        { index: 19, entry: "pixel 19 · 3 → 7" },
        { index: 27, entry: "pixel 27 · 3 → 7" },
        { index: 28, entry: "pixel 28 · 3 → 7" },
        { index: 36, entry: "pixel 36 · 0 → 7" },
        { index: 44, entry: "pixel 44 · 0 → 7" },
      ],
      footer: "A full copy per step would be 1 MB. This stroke: 6 entries.",
    },
  },
  cover: {
    kicker: "Case 03 · Personal project",
    title: "I needed a pixel-art editor, so I built one.",
    body: "PixelHB runs in the browser: layers, a reference image, your own palette, no account and no install. I designed the brand and the interface, and wrote the engine that keeps a million pixels light.",
    meta: [
      { label: "When", value: "2026" },
      { label: "My role", value: "Brand, design and code" },
      { label: "Built with", value: "Next.js, Canvas 2D, IndexedDB" },
    ],
    chapters: [
      { number: "01", label: "Signed in pixels" },
      { number: "02", label: "A million pixels" },
      { number: "03", label: "Pixel-exact" },
    ],
  },
};
