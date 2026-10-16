# hugobentivegna

Hugo Bentivegna's portfolio — **"High-quality UI, built for the people who use it."** A full-screen, slide-based site built on its own design system: design tokens feed a hand-built UI kit, and the kit builds the site.

- Site: https://hugobentivegna.vercel.app
- Storybook: https://hugobentivegna-storybook.vercel.app

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Style Dictionary (DTCG tokens) · Storybook · Motion · Vitest + Testing Library · Vercel

## Repo map

```
src/design-system/tokens   design tokens → CSS variables + Tailwind theme
src/design-system/ui       UI kit: components, stories, usage guides, tests
src/app                    routes
src/components             site components (slide engine, slides)
src/content                site copy
```

The design system never imports site code; ESLint enforces that boundary.

## Run it

Requires Node 22 (`.nvmrc`) and pnpm via corepack (`corepack enable`).

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```
