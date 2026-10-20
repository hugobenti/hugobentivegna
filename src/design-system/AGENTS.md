# Design system — rules for humans and AI agents

Everything under `src/design-system/` is a self-contained design system. The site consumes it; it never consumes the site.

## Boundary

- Never import `@/app`, `@/components`, `@/content` (or reach them with `../`). ESLint fails the build if you do.
- `tokens/` never imports `ui/`.
- Story data lives in the story file, not in `src/content`.

## Tokens (`tokens/`)

- Source of truth: DTCG JSON in `tokens/src/`. Run `pnpm tokens` to regenerate `tokens/generated/` (git-ignored).
- Layers: `primitive/` raw values → `semantic/midnight` purpose → `component/` usage. Themes in `themes/` only remap semantic tokens to primitives.
- **Add a token:** put raw values in `primitive/`, give it meaning in `semantic/` (with a `$description`), reference semantics from `component/`.
- **Add a theme:** add `themes/<name>.tokens.json`, add the name to `THEMES` in `build.mjs`, to `TThemeName` in `tokens.type.ts` and to `themes` in `index.ts`. The contrast test covers it automatically.
- Every theme must pass WCAG 2.2 AA (`contrast.test.ts`). Fix the token, never the test.

## Components (`ui/`)

- One folder per component:
  - `X.tsx`: presentation only; renders props and hook results
  - `useX.ts`: the component's behavior, when it has any (state, effects, browser APIs, timers)
  - `X.style.ts`: every class the component uses
  - `X.type.ts`: every type the component and its hook use (props, view models)
  - `X.stories.tsx`: every variant and state
  - `X.mdx`: the usage guide (template below)
  - `X.test.tsx`: only when the component has behavior; test through the component, as a user would
- Export it from `ui/index.ts`.
- **Focus:** every interactive element shows the focus ring from the `focus-ring` component tokens.
- **Semantics first:** native elements (`button`, `a`, `ol`, `figure`) before ARIA. Visible text or an accessible name on every control.
- **Motion:** respect `motion-reduce:` (opacity only).

## Component architecture

Each concern has its own kind of file. A component file never mixes them.

- **`X.tsx` is presentation only.** It maps props and hook results to markup: JSX, destructuring, `.map` over ready-made arrays, simple conditionals on given values (`status === "copied"`, `index > 0`), and `cx()` / `cssVars()` for classes and CSS variables. Nothing else: no helper functions, arithmetic, template formatting, array manipulation (`filter`, `sort`, `join`…), module-level data, effects, timers, observers or `window` / `document` / `navigator`. ESLint enforces each of these.
- **`useX.ts` is behavior and derived data.** State, effects, browser APIs, timers, and the view model the markup needs (`useTimelineAxis` → ticks, spans, dots, fill; `useCopyText` → status, message, copy). It never returns JSX. A generic behavior hook is named after what it does (`useCopyToClipboard`) and composed by the component's own hook.
- **Pure logic** that needs no React (`axisView`, `slidePositions`, `contrastRatio`, `availableNavLinks`) goes in a plain `.ts` module with its own unit test; hooks call it.
- **`X.data.ts`** holds static data a component renders (illustrative rows, positions, precomputed CSS variables). Site copy lives in `src/content`.
- **`X.type.ts` holds every type and interface**, next to the file that uses it (`Button.tsx` → `Button.type.ts`, `timelineScale.ts` → `timelineScale.type.ts`, site content → `src/content/content.type.ts`). Interfaces are named `IName`, type aliases `TName` (`IScaleEntry`, `TButtonProps`). Stories and tests are exempt from the file rule only: their local `type TStory = StoryObj<typeof meta>` stays in the story file. ESLint enforces both.

Reference implementations: `ui/Timeline/` (`TimelineAxis.tsx` + `useTimelineAxis.ts` + `timelineScale.ts`), `ui/CopyText/` (`CopyText.tsx` + `useCopyText.ts` + `useCopyToClipboard.ts`) and `src/components/deck/` (`Deck.tsx` + `useDeck.ts` + `slideState.ts`).

## Styling architecture

Markup and styling never share a file.

- **`X.style.ts` owns every class.** It exports one plain object per component: `base` for the classes every instance gets, one key per variant mapping each option to its classes, and named keys for other parts (`newTabHint`, `interactive`). No logic: values are plain strings, or `cx()` over strings and shared pieces (`focusRing`, `reveal`). A class list that fits on one line stays one string; a longer one, or one that reuses a shared piece, is `cx()` with one group per line (layout, color, states). `.join()` and template literals fail ESLint, so Tailwind always sees every class literally.
- **`X.tsx` owns structure and behavior.** It imports the object and composes classes with `cx()`: `cx(button.base, button.variant[variant], className)`. A class string in `className` (literal, template, or inside a call/conditional) fails ESLint.
- **Variants are declared once.** Prop types come from the style object (`variant?: keyof typeof button.variant`), so a variant can't exist in props without a style. Defaults live in the component's props (`variant = "primary"`).
- **Callers extend, never override.** A component accepts `className` and passes it last to `cx()`; use it for layout (margins, width), not to restyle internals.
- **Token-only utilities.** `bg-surface`, `text-muted`, `font-display`, `rounded-lg`; component tokens through typed arbitrary values, e.g. `bg-(color:--hb-button-primary-bg)`. Never raw hex; Tailwind defaults don't exist here.
- **Stories** take layout and sample-content classes from `ui/story.style.ts`; the Storybook canvas from `.storybook/preview.style.ts`.

```ts
// Button.style.ts
export const button = {
  base: cx(
    "inline-flex items-center rounded-(--hb-button-radius) …",
    "disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ),
  variant: { primary: "bg-(color:--hb-button-primary-bg) …", ghost: "text-fg hover:bg-raised" },
  size: { md: "h-10 px-5 text-small", lg: "h-12 px-7 text-body" },
};
```

```ts
// Button.type.ts
import type { ReactNode } from "react";
import type { button } from "./Button.style";

export type TButtonProps = {
  variant?: keyof typeof button.variant;
  size?: keyof typeof button.size;
  className?: string;
  children: ReactNode;
};
```

```tsx
// Button.tsx
export function Button({ variant = "primary", size = "md", className, children }: TButtonProps) {
  return (
    <button className={cx(button.base, button.variant[variant], button.size[size], className)}>
      {children}
    </button>
  );
}
```

## Usage guide template (`X.mdx`)

```mdx
import { Meta, Canvas, Controls } from "@storybook/addon-docs/blocks";
import * as Stories from "./X.stories";

<Meta of={Stories} />

# X

One sentence: what it is.

<Canvas of={Stories.Default} />
<Controls />

## Use when

## Don't use when

## Accessibility

## Do / Don't
```
