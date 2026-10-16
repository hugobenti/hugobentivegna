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
