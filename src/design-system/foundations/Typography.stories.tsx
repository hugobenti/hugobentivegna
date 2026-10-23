import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { foundation as f } from "./foundations.style";
import { TokenTable } from "./TokenTable";
import { lastSegment, tokenNamed, tokensNamed, varOf } from "./tokenGroups";

const meta = { title: "Foundations/Typography" } satisfies Meta;

export default meta;
type TStory = StoryObj<typeof meta>;

const sample = "Design systems, built from zero";

/** Semantic font roles, each drawn with its own token. */
export const Families: TStory = {
  render: () => (
    <div className={f.page}>
      <ul className={f.grid}>
        {["font.display", "font.body", "font.code"].map((name) => {
          const token = tokenNamed(name);
          return (
            <li key={name} className={f.card}>
              <span className={f.name}>{token.name}</span>
              <span
                className={f.specimen}
                style={{ fontFamily: varOf(name), fontSize: varOf("font.size.h3") }}
              >
                {sample}
              </span>
              <span className={f.value}>{token.resolved}</span>
              <span className={f.description}>{token.description}</span>
            </li>
          );
        })}
      </ul>
      <TokenTable caption="Font families" rows={tokensNamed("font.family.")} />
    </div>
  ),
};

/** Weights, each line set with its own weight token. */
export const Weights: TStory = {
  render: () => (
    <ul className={f.page}>
      {tokensNamed("font.weight.").map((token) => (
        <li key={token.name} className={f.typeRow}>
          <span className={f.typeMeta}>
            <span className={f.name}>{token.name}</span>
            <span className={f.value}>{token.resolved}</span>
          </span>
          <span
            className={f.specimen}
            style={{ fontWeight: `var(${token.cssVar})`, fontSize: varOf("font.size.h3") }}
          >
            {sample}
          </span>
        </li>
      ))}
    </ul>
  ),
};

/** The type scale: size, line height and letter spacing come from three tokens per step. */
export const Scale: TStory = {
  render: () => (
    <ul>
      {tokensNamed("font.size.").map((size) => {
        const step = lastSegment(size.name);
        const lineHeight = tokenNamed(`line-height.${step}`);
        const letterSpacing = tokenNamed(`letter-spacing.${step}`);
        return (
          <li key={step} className={f.typeRow}>
            <span className={f.typeMeta}>
              <span className={f.name}>{step}</span>
              <span className={f.value}>size {size.resolved}</span>
              <span className={f.value}>line height {lineHeight.resolved}</span>
              <span className={f.value}>tracking {letterSpacing.resolved}</span>
            </span>
            <span
              className={f.specimen}
              style={{
                fontFamily: varOf(step === "label" ? "font.code" : "font.display"),
                fontWeight: varOf("font.weight.bold"),
                fontSize: `var(${size.cssVar})`,
                lineHeight: `var(${lineHeight.cssVar})`,
                letterSpacing: `var(${letterSpacing.cssVar})`,
              }}
            >
              {sample}
            </span>
          </li>
        );
      })}
    </ul>
  ),
};
