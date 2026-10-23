import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { foundation as f } from "./foundations.style";
import { TokenTable } from "./TokenTable";
import { tokenNamed, tokensNamed, varOf } from "./tokenGroups";

const meta = { title: "Foundations/Spacing" } satisfies Meta;

export default meta;
type TStory = StoryObj<typeof meta>;

/** Utilities such as `p-4` or `gap-6` multiply the unit; these are the multiples the kit uses. */
const multiples = [1, 2, 3, 4, 6, 8, 12, 16];

export const Scale: TStory = {
  render: () => {
    const unit = Number.parseFloat(tokenNamed("space.unit").resolved);
    return (
      <ul className={f.page}>
        {multiples.map((multiple) => (
          <li key={multiple} className={f.scaleRow}>
            <span className={f.scaleLabel}>
              {multiple} × unit = {multiple * unit}px
            </span>
            <span
              className={f.spaceBar}
              style={{ width: `calc(${varOf("space.unit")} * ${multiple})` }}
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
    );
  },
};

/** Page-level spacing: fluid values that grow with the viewport. */
export const Layout: TStory = {
  render: () => <TokenTable caption="Spacing tokens" rows={tokensNamed("space.")} />,
};
