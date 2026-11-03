import { slides } from "./slides";
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
      { number: "01", label: "The problem", slideId: slides.dsProblem.id },
      { number: "02", label: "One system", slideId: slides.dsDecision.id },
      { number: "03", label: "The rebrand", slideId: slides.dsRebrand.id },
    ],
  },
  problem: {
    kicker: "01 · The problem",
    title: "Figma had the screens. Code had copies.",
    body: "At a digital bank with 5+ products, design kept every screen in Figma. Each project re-coded the same components, so changes were made per product.",
  },
  decision: {
    kicker: "02 · One system, built together",
    title:
      "A well-documented design system is the source of truth that connects design and development.",
    body: "Components matured in code and the Figma library with them. Colors and type shared names on both sides; I was engineering's voice in design.",
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
    flagMarker: "▸",
    acts: {
      without: {
        label: "Without a design system",
        title: "The same rebrand, done once per product.",
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
    body: "How I set up a new IoT portal so AI could help build it, fast and following the same patterns.",
    meta: [
      { label: "When", value: "2025 – 2026" },
      { label: "My role", value: "Built the UI Kit foundation and the portal's pages" },
      { label: "With", value: "Product, backend teams and AI agents" },
    ],
    chapters: [
      { number: "01", label: "Find the gaps", slideId: slides.aiGaps.id },
      { number: "02", label: "Lay the foundation", slideId: slides.aiFoundation.id },
      { number: "03", label: "Build on it", slideId: slides.aiBuild.id },
    ],
  },
  gaps: {
    kicker: "01 · Find the gaps",
    title: "Before writing code, I asked what was missing.",
    body: "MCP, the standard way to connect AI to tools, let an agent read the docs, spec and code to find missing endpoints, data and filters.",
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
    body: "I documented the UI Kit for two readers: when to use each component, when not, how it stays accessible. AGENTS.md set conventions, enforced by lint.",
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
    body: "AI drafted each page from the kit and documented patterns. I reviewed every change; tests decided what was done. Speed and quality stopped competing.",
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
  drawing: "A retro computer drawn pixel by pixel in PixelHB colors",
  exact: {
    kicker: "01 · The editor",
    title: "Everything you need to draw pixel art, in the browser.",
    body: "Layers, reference image, undo, redo, up to 256 colors. Export PNG, or the file as JSON. Autosaves as you draw.",
    illustration: "Illustration",
    tools: [
      {
        name: "Zoom",
        body: "Zoom with the wheel, a pinch or the toolbar. Pixels stay crisp at every step.",
        demo: "zoom",
      },
      {
        name: "Grid",
        body: "Turn on the pixel grid to see exactly where every pixel sits.",
        demo: "grid",
      },
      {
        name: "Fill",
        body: "Fill a shape in one click with the paint bucket.",
        demo: "fill",
      },
      {
        name: "Color picker",
        body: "Hold Alt and drag to pick a color from the canvas. The loupe shows it next to your current color.",
        demo: "loupe",
      },
    ],
    live: { label: "Try it live", href: "https://pixelhb.vercel.app" },
    code: { label: "View code", href: "https://github.com/hugobenti/pixelHB" },
  },
  cover: {
    kicker: "Case 03 · Personal project",
    title: "PixelHB: a pixel-art editor, designed and built by Hugo Bentivegna.",
    body: "PixelHB runs in the browser: layers, a reference image, your own palette, no account and no install. I designed the brand and the interface, wrote the engine and shipped it live. It's built to handle large pixel illustrations.",
    meta: [
      { label: "When", value: "2026" },
      { label: "My role", value: "Product, brand, design and code" },
    ],
    chapters: [{ number: "01", label: "The editor", slideId: slides.pixelExact.id }],
  },
};
