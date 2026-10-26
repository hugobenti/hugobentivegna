import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ITokenEntry } from "../tokens";
import { foundation as f } from "./foundations.style";
import { TokenTable } from "./TokenTable";
import { contrastRows, semanticColors, tokensNamed } from "./tokenGroups";

const meta = { title: "Foundations/Color" } satisfies Meta;

export default meta;
type TStory = StoryObj<typeof meta>;

function Swatches({ colors }: { colors: readonly ITokenEntry[] }) {
  return (
    <ul className={f.grid}>
      {colors.map((token) => (
        <li key={token.name} className={f.card}>
          <span
            className={f.swatch}
            style={{ backgroundColor: `var(${token.cssVar})` }}
            aria-hidden="true"
          />
          <span className={f.name}>{token.name}</span>
          <span className={f.value}>
            {token.resolved}
            {token.value === token.resolved ? "" : ` ← ${token.value}`}
          </span>
          <span className={f.description}>{token.description}</span>
        </li>
      ))}
    </ul>
  );
}

/** Semantic colors: the only ones components use, through utilities such as `bg-surface`. */
export const Semantic: TStory = {
  render: () => <Swatches colors={semanticColors()} />,
};

/** Primitive palette: raw values. Components never use these directly. */
export const Palette: TStory = {
  render: () => <Swatches colors={tokensNamed("palette.").filter((t) => t.type === "color")} />,
};

/** Component tokens that carry a color: where a semantic color is used. */
export const ComponentColors: TStory = {
  render: () => (
    <TokenTable
      caption="Component color tokens"
      rows={tokensNamed("").filter((t) => t.layer === "component" && t.type === "color")}
    />
  ),
};

/** The ratio of every tested pair, computed from the resolved token values. */
export const Contrast: TStory = {
  render: () => (
    <table className={f.table}>
      <caption className={f.caption}>WCAG 2.2 contrast of the tested pairs</caption>
      <thead>
        <tr>
          <th scope="col" className={f.headCell}>
            Pair
          </th>
          <th scope="col" className={f.headCell}>
            Preview
          </th>
          <th scope="col" className={f.headCell}>
            Ratio
          </th>
          <th scope="col" className={f.headCell}>
            Required
          </th>
          <th scope="col" className={f.headCell}>
            Result
          </th>
        </tr>
      </thead>
      <tbody>
        {contrastRows.map(({ fg, bg, ratio, minimum, isText, passes }) => (
          <tr key={`${fg.name}/${bg.name}`}>
            <th scope="row" className={f.cellName}>
              {fg.name} on {bg.name}
            </th>
            <td className={f.cell}>
              <span
                className={f.sample}
                style={{ color: `var(${fg.cssVar})`, backgroundColor: `var(${bg.cssVar})` }}
              >
                {isText ? (
                  "Aa"
                ) : (
                  <span
                    className={f.chip}
                    style={{ backgroundColor: `var(${fg.cssVar})` }}
                    aria-hidden="true"
                  />
                )}
              </span>
            </td>
            <td className={f.cellCode}>{ratio.toFixed(2)}:1</td>
            <td className={f.cellCode}>
              {minimum}:1 {isText ? "text" : "UI"}
            </td>
            <td className={passes ? f.pass : f.fail}>{passes ? "Pass" : "Fail"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
