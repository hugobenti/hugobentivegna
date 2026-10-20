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
- **Every `.tsx` component is presentation only.** It renders props and what its hook returns: no logic, no data, no class strings. Derived values, formatting and behavior (state, effects, browser APIs, observers, timers) live in a `useX.ts` hook next to the component, built on pure `.ts` modules; static data it renders lives in `X.data.ts` or `src/content`; classes live in `X.style.ts`, composed with `cx()`. ESLint fails the build on helper functions, arithmetic, template formatting, array manipulation, module-level data, effects or browser APIs in a component file. Full rule and examples: `src/design-system/AGENTS.md` → "Component architecture". Applies to the kit, site components and `src/app` route files alike.
- **Types live in `X.type.ts`.** Every `interface` and `type` goes in a `.type.ts` file next to the file that uses it (`Button.tsx` → `Button.type.ts`; site content → `src/content/content.type.ts`); stories and tests may keep local types. Interfaces start with `I` (`ISlideMeta`), type aliases with `T` (`TButtonProps`). ESLint enforces both.
- **Token-only styling.** Style files use Tailwind utilities mapped to tokens (`bg-surface`, `text-muted`, `outline-focus`…). Tailwind's default palette and scales are removed, so raw colors can't be used.
- **Accessibility is a requirement:** semantic HTML, visible focus (`focus-visible`), WCAG 2.2 AA contrast (tested per theme), and `prefers-reduced-motion` honored (opacity fades only).
- **No scroll-jacking:** never `preventDefault` wheel, touch or keyboard scrolling.
- **Copy:** all text lives in `src/content`.

## Commands

| Command                | What it does                                             |
| ---------------------- | -------------------------------------------------------- |
| `pnpm dev`             | Next.js dev server                                       |
| `pnpm build`           | production build                                         |
| `pnpm lint`            | ESLint (boundary, component and style-file rules)        |
| `pnpm typecheck`       | route types + `tsc --noEmit`                             |
| `pnpm test`            | Vitest + Testing Library                                 |
| `pnpm storybook`       | Storybook at http://localhost:6006                       |
| `pnpm build-storybook` | static Storybook in `storybook-static/`                  |
| `pnpm tokens`          | regenerate design tokens (other scripts run it first)    |
| `pnpm format`          | Prettier; also sorts Tailwind classes, inside `cx()` too |

## Workflow

Never commit to `main`. Each stage of work gets its own branch (`feat/<name>`), stays small (≤ ~20 files) and lands through a pull request that Hugo reviews and merges; CI must be green. Write the failing test first for anything with logic; run lint, typecheck, test and build (and `build-storybook` for design-system changes) before asking for review. Design-system rules: `src/design-system/AGENTS.md`.

**Verifying a production build while Hugo works:** never delete or build into `.next` (his `next dev` and builds use it). Build and serve in isolation: `NEXT_DIST_DIR=.next-verify pnpm build`, then `NEXT_DIST_DIR=.next-verify pnpm start -p <port>` once the build has finished.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
