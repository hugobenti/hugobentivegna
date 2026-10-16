import { navLinks } from "@/content/navigation";
import { site } from "@/content/site";
import { slides } from "@/content/slides";
import { cx } from "@/design-system/ui";
import { deck } from "../deck/Deck.style";
import { Slide } from "../deck/Slide";
import { stagger } from "../deck/stagger";
import { hero } from "./HeroSlide.style";

export function HeroSlide() {
  return (
    <Slide slide={slides.hero} className={hero.slide}>
      <div className={hero.glow} aria-hidden="true" />

      <header className={cx(deck.enter, hero.topBar)} style={stagger(0)}>
        <span className={hero.monogram} aria-hidden="true">
          HB
        </span>
        <nav aria-label="Primary">
          <ul className={hero.navList}>
            {navLinks.map((link) => (
              <li key={link.slideId}>
                <a href={link.href} className={hero.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className={hero.content}>
        <p className={cx(deck.enter, hero.kicker)} style={stagger(1)}>
          {site.kicker}
        </p>
        <h1 className={cx(deck.enter, hero.headline)} style={stagger(2)}>
          <span className={hero.line}>{site.headline.lead}</span>
          <span className={hero.accent}>{site.headline.accent}</span>
          <span className={hero.line}>{site.headline.tail}</span>
        </h1>
        <p className={cx(deck.enter, hero.support)} style={stagger(3)}>
          {site.supportLine}
        </p>
      </div>

      <p className={cx(deck.enter, hero.cue)} style={stagger(5)} aria-hidden="true">
        Scroll ↓
      </p>
    </Slide>
  );
}
