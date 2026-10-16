import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const SITE_CODE_MESSAGE =
  "design-system must not depend on site code (src/app, src/components, src/content).";

const siteCodeImports = {
  group: [
    "@/app",
    "@/app/**",
    "@/components",
    "@/components/**",
    "@/content",
    "@/content/**",
    // From any file inside src/design-system/<area>/<Component>/, three levels up is src/.
    "../../../**",
  ],
  message: SITE_CODE_MESSAGE,
};

const CLASS_STRING_MESSAGE = "Class strings belong in the component's .style.ts file, not in .tsx.";
const classStringRules = [
  "JSXAttribute[name.name='className'] > Literal",
  "JSXAttribute[name.name='className'] > JSXExpressionContainer > Literal",
  "JSXAttribute[name.name='className'] > JSXExpressionContainer > TemplateLiteral",
  "Property[key.name='className'] > Literal",
  "Property[key.name='className'] > TemplateLiteral",
  "JSXAttribute[name.name='className'] CallExpression > Literal",
  "JSXAttribute[name.name='className'] LogicalExpression > Literal",
  "JSXAttribute[name.name='className'] ConditionalExpression > Literal",
].map((selector) => ({ selector, message: CLASS_STRING_MESSAGE }));

const BEHAVIOR_MESSAGE =
  "Components are presentation: move effects and browser APIs into a useX.ts hook next to the component.";
const presentationRules = [
  "ImportSpecifier[imported.name=/^use(Layout|Insertion)?Effect$/]",
  "MemberExpression[object.name=/^(window|document|navigator|history|location)$/]",
  "NewExpression[callee.name=/^(IntersectionObserver|ResizeObserver|MutationObserver)$/]",
  "CallExpression[callee.name=/^(setTimeout|setInterval|requestAnimationFrame)$/]",
].map((selector) => ({ selector, message: BEHAVIOR_MESSAGE }));

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // `const { a, ...rest } = props` is how components drop props they handle themselves.
      "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
    },
  },
  {
    // Architecture rule (AGENTS.md "Component architecture"): a .tsx component is presentation.
    // Classes come from X.style.ts; behavior (effects, browser APIs, observers) from a useX.ts hook.
    files: ["**/*.tsx"],
    rules: {
      "no-restricted-syntax": ["error", ...classStringRules, ...presentationRules],
    },
  },
  {
    // Stories, tests and the Storybook preview aren't components: they may set up browser state.
    files: ["**/*.stories.tsx", "**/*.test.tsx", ".storybook/**/*.tsx"],
    rules: {
      "no-restricted-syntax": ["error", ...classStringRules],
    },
  },
  {
    files: ["src/design-system/**/*.{ts,tsx,mts,mjs}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [siteCodeImports] }],
    },
  },
  {
    files: ["src/design-system/tokens/**/*.{ts,tsx,mts,mjs}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            siteCodeImports,
            {
              group: ["@/design-system/ui", "@/design-system/ui/**", "../ui", "../ui/**"],
              message: "tokens must not depend on the UI kit.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "storybook-static/**",
    "src/design-system/tokens/generated/**",
    ".superpowers/**",
  ]),
]);
