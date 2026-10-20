import type { ComponentType } from "react";
import type { TExperienceId } from "@/content/content.type";
import type { TArtifactProps } from "./ArtifactFrame.type";
import { ItauArtifact } from "./ItauArtifact";
import { OneGlobalArtifact } from "./OneGlobalArtifact";
import { OuribankArtifact } from "./OuribankArtifact";

/** The visual that sits beside each company's chapter. */
export const artifacts: Record<TExperienceId, ComponentType<TArtifactProps>> = {
  itau: ItauArtifact,
  ouribank: OuribankArtifact,
  oneglobal: OneGlobalArtifact,
};
