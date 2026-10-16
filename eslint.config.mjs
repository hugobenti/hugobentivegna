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
    // Architecture rule (AGENTS.md): markup and styling live in separate files.
    // .tsx files take classes only from X.style.ts; class strings here fail the build.
    files: ["**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...[
          "JSXAttribute[name.name='className'] > Literal",
          "JSXAttribute[name.name='className'] > JSXExpressionContainer > Literal",
          "JSXAttribute[name.name='className'] > JSXExpressionContainer > TemplateLiteral",
          "Property[key.name='className'] > Literal",
          "Property[key.name='className'] > TemplateLiteral",
          "JSXAttribute[name.name='className'] CallExpression > Literal",
          "JSXAttribute[name.name='className'] LogicalExpression > Literal",
          "JSXAttribute[name.name='className'] ConditionalExpression > Literal",
        ].map((selector) => ({
          selector,
          message: "Class strings belong in the component's .style.ts file, not in .tsx.",
        })),
      ],
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
