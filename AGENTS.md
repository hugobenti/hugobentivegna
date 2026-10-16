# AGENTS.md

Guide for AI coding agents (and humans) working in this repo. Read it before changing anything.

## What this is

Hugo Bentivegna's portfolio: a slide-based Next.js site built on its own design system.

## Repo map

```
src/design-system/tokens   DTCG design tokens → Style Dictionary → CSS variables + Tailwind @theme
src/design-system/ui       the hand-built UI kit (components, stories, usage guides, tests)
src/app                    Next.js routes
src/components             site components (slide engine, slides, sequences)
src/content                all site copy, typed
.storybook                 Storybook config (documents src/design-system)
```

Dependencies flow one way: **tokens → ui → site**.

## Rules

- **Boundary:** nothing under `src/design-system/` may import `src/app`, `src/components` or `src/content`; `tokens` may not import `ui`. ESLint enforces it and CI fails on a violation. Do not disable the rule; move the code instead.
- **No third-party UI kit.** Build components in `src/design-system/ui`.
- **Token-only styling.** Components use Tailwind utilities mapped to tokens (`bg-surface`, `text-muted`, `ring-focus`…). No raw hex values in components.
- **Accessibility is a requirement:** semantic HTML, visible focus (`focus-visible`), WCAG 2.2 AA contrast (tested per theme), and `prefers-reduced-motion` honored (opacity fades only).
- **No scroll-jacking:** never `preventDefault` wheel, touch or keyboard scrolling.
- **Copy:** all text lives in `src/content`. Never use "vibe coding", "10× with AI" or hype wording; no 1global UI Kit adoption metrics; never show a phone number.

## Commands

| Command          | What it does                        |
| ---------------- | ----------------------------------- |
| `pnpm dev`       | Next.js dev server                  |
| `pnpm build`     | production build                    |
| `pnpm lint`      | ESLint (includes the boundary rule) |
| `pnpm typecheck` | route types + `tsc --noEmit`        |
| `pnpm test`      | Vitest + Testing Library            |
| `pnpm format`    | Prettier                            |

## Workflow

Work in small stages (≤ ~20 files). Every stage is reviewed by Hugo before it is committed and pushed. Write the failing test first for anything with logic; run lint, typecheck, test and build before asking for review.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
