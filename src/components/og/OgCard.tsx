import { site } from "@/content/site";
import { ogCard } from "./OgCard.style";

/** The link-preview card: the hero, flattened to 1200 × 630 for LinkedIn, Slack and email. */
export function OgCard() {
  return (
    <div style={ogCard.root}>
      <div style={ogCard.top}>
        <span style={ogCard.monogram}>HB</span>
        <span style={ogCard.url}>{site.domain}</span>
      </div>
      <div style={ogCard.body}>
        <span style={ogCard.kicker}>{site.kicker}</span>
        <div style={ogCard.headline}>
          <span>{site.headline.lead}</span>
          <span style={ogCard.accent}>{site.headline.accent}</span>
          <span>{site.headline.tail}</span>
        </div>
        <span style={ogCard.support}>{site.supportLine}</span>
      </div>
    </div>
  );
}
