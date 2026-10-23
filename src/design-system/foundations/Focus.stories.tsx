import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../ui/Button/Button";
import { focusRing, focusRingWithin } from "../ui/focus.style";
import { foundation as f } from "./foundations.style";
import { TokenTable } from "./TokenTable";
import { contrastRows, tokensNamed, varOf } from "./tokenGroups";

const meta = { title: "Foundations/Focus" } satisfies Meta;

export default meta;
type TStory = StoryObj<typeof meta>;

/** Press Tab: every interactive element shows the same ring. */
export const Live: TStory = {
  render: () => (
    <div className={f.page}>
      <div className={f.row}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <a className={f.demoLink} href="#focus">
          A plain link
        </a>
      </div>
      <p className={f.note}>
        Click the area first, then press Tab. The ring only appears for keyboard focus, not for
        mouse clicks.
      </p>
    </div>
  ),
};

/** The same ring drawn without focus, from the three focus-ring tokens. */
export const Anatomy: TStory = {
  render: () => (
    <div className={f.page}>
      <span
        className={f.forcedRing}
        style={{
          outlineStyle: "solid",
          outlineWidth: varOf("focus-ring.width"),
          outlineOffset: varOf("focus-ring.offset"),
          outlineColor: varOf("focus-ring.color"),
        }}
      >
        Focused element
      </span>
      <TokenTable caption="Focus ring tokens" rows={tokensNamed("focus-ring.")} />
    </div>
  ),
};

/** The ring is 3:1 or better against the surfaces it appears on. */
export const Contrast: TStory = {
  render: () => (
    <ul className={f.page}>
      {contrastRows
        .filter(({ fg }) => fg.name === "color.focus")
        .map(({ bg, ratio, minimum }) => (
          <li key={bg.name} className={f.name}>
            focus on {bg.name}: {ratio.toFixed(2)}:1 (needs {minimum}:1)
          </li>
        ))}
    </ul>
  ),
};

/** The utilities components use: import them, never rewrite the ring. */
export const Utilities: TStory = {
  render: () => (
    <div className={f.page}>
      <div className={f.section}>
        <h3 className={f.heading}>focusRing</h3>
        <pre className={f.code} tabIndex={0}>
          {focusRing}
        </pre>
      </div>
      <div className={f.section}>
        <h3 className={f.heading}>focusRingWithin</h3>
        <p className={f.note}>
          The same ring on a wrapper whose visually hidden input has keyboard focus, such as a
          radio&apos;s label.
        </p>
        <pre className={f.code} tabIndex={0}>
          {focusRingWithin}
        </pre>
      </div>
    </div>
  ),
};
