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

const LOGIC_MESSAGE =
  "Components are presentation: derive values in a useX.ts hook or a .ts module, not in .tsx.";
const logicRules = [
  // Helper functions, at module level or inside a component.
  "Program > FunctionDeclaration[id.name=/^[a-z]/]",
  "Program > ExportNamedDeclaration > FunctionDeclaration[id.name=/^[a-z]/]",
  "FunctionDeclaration FunctionDeclaration",
  "VariableDeclarator > :matches(ArrowFunctionExpression, FunctionExpression)",
  // Computation and formatting.
  "BinaryExpression[operator=/^[-+*\\/%]$/]",
  "ConditionalExpression > ConditionalExpression",
  "TemplateLiteral[expressions.length>0]",
  "NewExpression[callee.name=/^(Date|URL|Map|Set)$/]",
  "CallExpression[callee.property.name=/^(filter|reduce|sort|find|findIndex|some|every|flatMap|slice|splice|join|split|replace|replaceAll|toFixed|toLocaleString)$/]",
  // Plain function calls in markup; only the class/style helpers are allowed.
  "JSXExpressionContainer > CallExpression[callee.type='Identifier']:not([callee.name=/^(cx|cssVars|stagger)$/])",
].map((selector) => ({ selector, message: LOGIC_MESSAGE }));

const DATA_MESSAGE =
  "Data a component renders belongs in an X.data.ts module (or src/content), not in .tsx.";
const dataRules = [
  "Program > VariableDeclaration > VariableDeclarator > :matches(ArrayExpression, ObjectExpression, Literal, TemplateLiteral, CallExpression)",
  "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > :matches(ArrayExpression, ObjectExpression, Literal, TemplateLiteral, CallExpression)",
  "MemberExpression > ArrayExpression.object",
].map((selector) => ({ selector, message: DATA_MESSAGE }));

const STYLE_COMPOSE_MESSAGE =
  "Compose classes with cx() in .style.ts: no .join() or template literals, so there's one way to do it and Tailwind sees every class literally.";
const styleComposeRules = [
  "CallExpression[callee.property.name='join']",
  "TemplateLiteral[expressions.length>0]",
].map((selector) => ({ selector, message: STYLE_COMPOSE_MESSAGE }));

const TYPE_FILE_MESSAGE =
  "Types live in an X.type.ts file next to the file that uses them (AGENTS.md); stories and tests may keep local types.";
const typeFileRules = ["TSInterfaceDeclaration", "TSTypeAliasDeclaration"].map((selector) => ({
  selector,
  message: TYPE_FILE_MESSAGE,
}));

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // `const { a, ...rest } = props` is how components drop props they handle themselves.
      "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
      // Interfaces are IName, type aliases TName (AGENTS.md); the rest of the name is PascalCase.
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "interface", format: ["PascalCase"], prefix: ["I"] },
        { selector: "typeAlias", format: ["PascalCase"], prefix: ["T"] },
      ],
    },
  },
  {
    // Architecture rule (AGENTS.md "Component architecture"): a .tsx component is presentation.
    // Classes come from X.style.ts, data from X.data.ts / src/content, derived values and behavior
    // (effects, browser APIs, observers, formatting, computation) from a useX.ts hook.
    files: ["**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...classStringRules,
        ...presentationRules,
        ...logicRules,
        ...dataRules,
        ...typeFileRules,
      ],
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
    files: ["**/*.{ts,mts}"],
    ignores: ["**/*.type.ts", "**/*.test.ts", "**/*.d.ts"],
    rules: {
      "no-restricted-syntax": ["error", ...typeFileRules],
    },
  },
  {
    // Style files hold class strings composed with cx() (src/design-system/AGENTS.md "Styling architecture").
    files: ["**/*.style.ts"],
    // The share card is rendered by Satori from inline style objects, not classes.
    ignores: ["src/components/og/OgCard.style.ts"],
    rules: {
      "no-restricted-syntax": ["error", ...styleComposeRules, ...typeFileRules],
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
    ".next-verify/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "storybook-static/**",
    "src/design-system/tokens/generated/**",
    ".superpowers/**",
  ]),
]);
