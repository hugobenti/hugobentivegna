import type { StorybookConfig } from "@storybook/nextjs-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: [
    "../src/design-system/**/*.mdx",
    "../src/design-system/**/*.stories.@(ts|tsx)",
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    {
      // MDX 3 has no GitHub-flavored markdown by default: without this, `| … |` tables render as text.
      name: "@storybook/addon-docs",
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
    "@storybook/addon-a11y",
  ],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  core: { disableTelemetry: true },
};

export default config;
