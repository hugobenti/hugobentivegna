import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { foundation as f } from "./foundations.style";
import { TokenTable } from "./TokenTable";
import { tokensNamed } from "./tokenGroups";

const meta = { title: "Foundations/Shadow" } satisfies Meta;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Elevation: TStory = {
  render: () => (
    <div className={f.page}>
      <div className={f.shadowStage}>
        {tokensNamed("shadow.").map((token) => (
          <div
            key={token.name}
            className={f.shadowBox}
            style={{ boxShadow: `var(${token.cssVar})` }}
          >
            {token.name}
          </div>
        ))}
      </div>
      <TokenTable caption="Shadow tokens" rows={tokensNamed("shadow.")} />
    </div>
  ),
};
