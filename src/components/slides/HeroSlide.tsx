import { heroCaseLinks } from "@/content/navigation";
import { site } from "@/content/site";
import { slides } from "@/content/slides";
import { cx } from "@/design-system/ui";
import { deck } from "../deck/Deck.style";
import { Slide } from "../deck/Slide";
import { stagger } from "../deck/stagger";
import { availability } from "./Availability.style";
import { hero } from "./HeroSlide.style";

export function HeroSlide() {
  return (
    <Slide slide={slides.hero} className={hero.slide}>
      <div className={hero.glow} aria-hidden="true" />

      <div className={hero.content}>
        <h1 className={cx(deck.enter, hero.headline)} style={stagger(1)}>
          <span className={hero.line}>{site.headline.lead}</span>
          <span className={hero.accent}>{site.headline.accent}</span>
          <span className={hero.line}>{site.headline.tail}</span>
        </h1>
        <p className={cx(deck.enter, hero.intro)} style={stagger(2)}>
          {site.intro}
        </p>
        <p className={cx(deck.enter, availability.line, hero.availability)} style={stagger(3)}>
          <span className={availability.dot} aria-hidden="true" />
          {site.availability}
        </p>
        <ol className={cx(deck.enter, hero.cases)} style={stagger(4)}>
          {heroCaseLinks.map((entry) => (
            <li key={entry.slideId}>
              <a href={entry.href} className={hero.caseLink}>
                <span className={hero.caseNumber}>{entry.number}</span>
                <span className={hero.caseLabel}>{entry.label}</span>
                <span className={hero.caseOutcome}>{entry.outcome}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </Slide>
  );
}
