import type { ComponentType } from "react";
import type { ExperienceId } from "@/content/types";
import type { ArtifactProps } from "./ArtifactFrame";
import { ItauArtifact } from "./ItauArtifact";
import { OneGlobalArtifact } from "./OneGlobalArtifact";
import { OuribankArtifact } from "./OuribankArtifact";

/** The visual that sits beside each company's chapter. */
export const artifacts: Record<ExperienceId, ComponentType<ArtifactProps>> = {
  itau: ItauArtifact,
  ouribank: OuribankArtifact,
  oneglobal: OneGlobalArtifact,
};
