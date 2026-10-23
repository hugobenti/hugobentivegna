import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState, useSyncExternalStore } from "react";
import { Button } from "../ui/Button/Button";
import { foundation as f } from "./foundations.style";
import { TokenTable } from "./TokenTable";
import { tokensNamed, varOf } from "./tokenGroups";

const meta = { title: "Foundations/Motion" } satisfies Meta;

export default meta;
type TStory = StoryObj<typeof meta>;

const query = "(prefers-reduced-motion: reduce)";

function subscribe(notify: () => void) {
  const media = matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false,
  );
}

/** Rows that each move a dot with one token; every row uses the same Play button. */
function Demo({
  caption,
  rows,
}: {
  caption: string;
  rows: { name: string; value: string; description?: string; duration: string; ease: string }[];
}) {
  const [moved, setMoved] = useState(false);
  const reduced = useReducedMotion();
  return (
    <section className={f.section}>
      <h3 className={f.heading}>{caption}</h3>
      <div className={f.row}>
        <Button size="sm" variant="secondary" onClick={() => setMoved((current) => !current)}>
          Play
        </Button>
        <p className={f.note}>
          {reduced
            ? "Reduced motion is on: the dot jumps instead of moving, as it does on the site."
            : "Reduced motion is off. Turn it on in your system settings to see the dot jump instead."}
        </p>
      </div>
      <ul className={f.page}>
        {rows.map((row) => (
          <li key={row.name} className={f.motionRow}>
            <span className={f.typeMeta}>
              <span className={f.name}>{row.name}</span>
              <span className={f.value}>{row.value}</span>
              <span className={f.description}>{row.description}</span>
            </span>
            <span className={f.track} aria-hidden="true">
              <span
                className={f.dot}
                data-moved={moved}
                style={{ transitionDuration: row.duration, transitionTimingFunction: row.ease }}
              />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Durations, all with the default easing. */
export const Durations: TStory = {
  render: () => (
    <div className={f.page}>
      <Demo
        caption="Duration"
        rows={tokensNamed("duration.").map((token) => ({
          name: token.name,
          value: token.resolved,
          description: token.description,
          duration: `var(${token.cssVar})`,
          ease: varOf("ease.out"),
        }))}
      />
      <TokenTable caption="Duration tokens" rows={tokensNamed("duration.")} />
    </div>
  ),
};

/** Easings, all at the slow duration so the curve is easy to see. */
export const Easings: TStory = {
  render: () => (
    <div className={f.page}>
      <Demo
        caption="Easing"
        rows={tokensNamed("ease.").map((token) => ({
          name: token.name,
          value: token.resolved,
          description: token.description,
          duration: varOf("duration.slow"),
          ease: `var(${token.cssVar})`,
        }))}
      />
      <TokenTable caption="Easing tokens" rows={tokensNamed("ease.")} />
    </div>
  ),
};
