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
- **Components are presentation; behavior lives in hooks; styling lives in style files.** A `.tsx` component renders props and hook results: no `useEffect`, observers, timers or browser APIs in it, and no class strings. Behavior (state, effects, `window`/`document`/`navigator`, observers, timers) lives in a `useX.ts` hook next to the component; classes live in a plain object in `X.style.ts`, composed with `cx()`. Stories use `story.style.ts`. ESLint fails the build on a class string in `className` inside `.tsx`. Full rule and examples: `src/design-system/AGENTS.md` → "Component architecture". This applies to site components (`src/components`) too.
- **Token-only styling.** Style files use Tailwind utilities mapped to tokens (`bg-surface`, `text-muted`, `outline-focus`…). Tailwind's default palette and scales are removed, so raw colors can't be used.
- **Accessibility is a requirement:** semantic HTML, visible focus (`focus-visible`), WCAG 2.2 AA contrast (tested per theme), and `prefers-reduced-motion` honored (opacity fades only).
- **No scroll-jacking:** never `preventDefault` wheel, touch or keyboard scrolling.
- **Copy:** all text lives in `src/content`. Never use "vibe coding", "10× with AI" or hype wording; no 1global UI Kit adoption metrics; never show a phone number.

## Commands

| Command                | What it does                                          |
| ---------------------- | ----------------------------------------------------- |
| `pnpm dev`             | Next.js dev server                                    |
| `pnpm build`           | production build                                      |
| `pnpm lint`            | ESLint (includes the boundary rule)                   |
| `pnpm typecheck`       | route types + `tsc --noEmit`                          |
| `pnpm test`            | Vitest + Testing Library                              |
| `pnpm storybook`       | Storybook at http://localhost:6006                    |
| `pnpm build-storybook` | static Storybook in `storybook-static/`               |
| `pnpm tokens`          | regenerate design tokens (other scripts run it first) |
| `pnpm format`          | Prettier                                              |

## Workflow

Never commit to `main`. Each stage of work gets its own branch (`feat/<name>`), stays small (≤ ~20 files) and lands through a pull request that Hugo reviews and merges; CI must be green. Write the failing test first for anything with logic; run lint, typecheck, test and build (and `build-storybook` for design-system changes) before asking for review. Design-system rules: `src/design-system/AGENTS.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
