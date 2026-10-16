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
- **Add a theme:** add `themes/<name>.tokens.json`, add the name to `THEMES` in `build.mjs` and to `ThemeName`/`themes` in `index.ts`. The contrast test covers it automatically.
- Every theme must pass WCAG 2.2 AA (`contrast.test.ts`). Fix the token, never the test.

## Components (`ui/`)

- One folder per component:
  - `X.tsx`: presentation only; renders props and hook results
  - `useX.ts`: the component's behavior, when it has any (state, effects, browser APIs, timers)
  - `X.style.ts`: every class the component uses
  - `X.stories.tsx`: every variant and state
  - `X.mdx`: the usage guide (template below)
  - `X.test.tsx`: only when the component has behavior; test through the component, as a user would
- Export it from `ui/index.ts`.
- **Focus:** every interactive element shows the focus ring from the `focus-ring` component tokens.
- **Semantics first:** native elements (`button`, `a`, `ol`, `figure`) before ARIA. Visible text or an accessible name on every control.
- **Motion:** respect `motion-reduce:` (opacity only).

## Component architecture

Three concerns, three files. A component file never mixes them.

- **`X.tsx` is presentation.** It maps props and hook results to markup. Allowed: `useId`, `useState` for trivial display-only state, and calling its own hook. Not allowed: `useEffect`, observers, timers, `window` / `document` / `navigator`, data fetching, class strings.
- **`useX.ts` is behavior.** State machines, effects, browser APIs, timers and refs that drive them. It returns what the markup needs (`{ status, copy, textRef }`, `{ rootRef, activeId, goTo }`) and never returns JSX. Named after what it does (`useCopyToClipboard`), not after the component, when it could serve more than one.
- **Pure logic** that needs no React (`slidePositions`, `contrastRatio`) goes in a plain `.ts` module with its own unit test.

Reference implementations: `ui/CopyText/` (`CopyText.tsx` + `useCopyToClipboard.ts`) and `src/components/deck/` (`Deck.tsx` + `useDeck.ts` + `slideState.ts`).

## Styling architecture

Markup and styling never share a file.

- **`X.style.ts` owns every class.** It exports one plain object per component: `base` for the classes every instance gets, one key per variant mapping each option to its classes, and named keys for other parts (`newTabHint`, `interactive`). No helpers, no logic.
- **`X.tsx` owns structure and behavior.** It imports the object and composes classes with `cx()`: `cx(button.base, button.variant[variant], className)`. A class string in `className` (literal, template, or inside a call/conditional) fails ESLint.
- **Variants are declared once.** Prop types come from the style object (`variant?: keyof typeof button.variant`), so a variant can't exist in props without a style. Defaults live in the component's props (`variant = "primary"`).
- **Callers extend, never override.** A component accepts `className` and passes it last to `cx()`; use it for layout (margins, width), not to restyle internals.
- **Token-only utilities.** `bg-surface`, `text-muted`, `font-display`, `rounded-lg`; component tokens through typed arbitrary values, e.g. `bg-(color:--hb-button-primary-bg)`. Never raw hex; Tailwind defaults don't exist here.
- **Stories** take layout and sample-content classes from `ui/story.style.ts`; the Storybook canvas from `.storybook/preview.style.ts`.

```ts
// Button.style.ts
export const button = {
  base: "inline-flex items-center rounded-(--hb-button-radius) …",
  variant: { primary: "bg-(color:--hb-button-primary-bg) …", ghost: "text-fg hover:bg-raised" },
  size: { md: "h-10 px-5 text-small", lg: "h-12 px-7 text-body" },
};
```

```tsx
// Button.tsx
type ButtonProps = {
  variant?: keyof typeof button.variant;
  size?: keyof typeof button.size;
  className?: string;
  children: ReactNode;
};
export function Button({ variant = "primary", size = "md", className, children }: ButtonProps) {
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
