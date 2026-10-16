import type { Decorator, Preview } from "@storybook/nextjs-vite";
import { themes as storybookThemes } from "storybook/theming";
import { fontVariables } from "../src/app/fonts";
import { themes } from "../src/design-system/tokens";
import "../src/app/globals.css";
import { storyCanvas } from "./preview.style";

// Font tokens (--hb-font-family-*) are declared on :root and reference the next/font variables,
// so those variables must live on <html> too, exactly as in src/app/layout.tsx.
document.documentElement.classList.add(...fontVariables.split(" "));

/** Renders every story inside the selected design-system theme, like a slide would. */
const withTheme: Decorator = (Story, context) => (
  <div data-theme={context.globals.theme} className={storyCanvas}>
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Design-system theme",
      toolbar: { title: "Theme", icon: "paintbrush", items: [...themes], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "midnight" },
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    docs: { theme: storybookThemes.dark },
    a11y: { test: "error" },
    controls: { expanded: true },
  },
};

export default preview;
