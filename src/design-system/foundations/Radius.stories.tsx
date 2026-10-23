import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { foundation as f } from "./foundations.style";
import { TokenTable } from "./TokenTable";
import { tokensNamed } from "./tokenGroups";

const meta = { title: "Foundations/Radius" } satisfies Meta;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Scale: TStory = {
  render: () => (
    <ul className={f.radiusGrid}>
      {tokensNamed("radius.").map((token) => (
        <li key={token.name} className={f.radiusItem}>
          <span
            className={f.radiusBox}
            style={{ borderRadius: `var(${token.cssVar})` }}
            aria-hidden="true"
          />
          <span className={f.name}>{token.name}</span>
          <span className={f.value}>{token.resolved}</span>
        </li>
      ))}
    </ul>
  ),
};

/** Where components apply a radius. */
export const ComponentRadius: TStory = {
  render: () => (
    <TokenTable
      caption="Component radius tokens"
      rows={tokensNamed("").filter((t) => t.layer === "component" && t.name.endsWith(".radius"))}
    />
  ),
};
