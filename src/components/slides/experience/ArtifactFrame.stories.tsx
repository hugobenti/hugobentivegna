import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { cx } from "@/design-system/ui";
import { stagger } from "../../deck/stagger";
import { story } from "../../story.style";
import { ArtifactFrame } from "./ArtifactFrame";
import { artifact } from "./artifact.style";

const meta = {
  title: "Site/ArtifactFrame",
  component: ArtifactFrame,
  args: {
    title: "monitoring.portal",
    active: true,
    className: story.frameShown,
    children: (
      <>
        <p className={artifact.caption}>Services</p>
        <p className={cx(artifact.appear, artifact.rise, story.artifactRow)} style={stagger(0)}>
          Checkout is healthy
        </p>
        <div className={cx(artifact.appear, artifact.rise, story.artifactBar)} style={stagger(1)} />
        <p className={cx(artifact.appear, artifact.rise, story.artifactRow)} style={stagger(2)}>
          Two alerts resolved today
        </p>
      </>
    ),
  },
  argTypes: {
    title: { description: "Text in the window's title bar." },
    active: {
      description: "True while the artifact's chapter is in focus; the contents animate in.",
    },
    className: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof ArtifactFrame>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const Inactive: TStory = { args: { active: false } };
