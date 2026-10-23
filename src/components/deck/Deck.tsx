"use client";

import { site } from "@/content/site";
import { DotNav } from "@/design-system/ui";
import { deck } from "./Deck.style";
import type { TDeckProps } from "./Deck.type";
import { SiteHeader } from "./SiteHeader";
import { useDeck } from "./useDeck";
import "./deck.css";

/**
 * The slide deck: the sticky header (the page banner), the slides as the page's main content,
 * and a position dot per section. Behavior lives in useDeck.
 */
export function Deck({ slides, nav, children }: TDeckProps) {
  const { rootRef, dots, activeDot, activeSection, homeHref, goTo } = useDeck(slides, nav);
  return (
    <div ref={rootRef} className={deck.root}>
      <SiteHeader homeHref={homeHref} sections={nav} activeSection={activeSection} />
      <main>{children}</main>
      <DotNav
        items={dots}
        activeId={activeDot}
        onSelect={goTo}
        label={site.dotsLabel}
        className={deck.dots}
      />
    </div>
  );
}
