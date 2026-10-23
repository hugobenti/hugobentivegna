import { cx } from "@/design-system/ui";
import { deck } from "../../deck/Deck.style";
import { stagger } from "../../deck/stagger";
import { chapterIntro } from "./ChapterIntro.style";
import type { TChapterIntroProps } from "./ChapterIntro.type";

/**
 * The opening copy of a chapter slide: kicker, title and body, entering one after another as
 * the slide comes into view. Place it first inside the slide's copy column; it renders three
 * siblings (no wrapper), so extra lines after it start at `stagger(3)`.
 */
export function ChapterIntro({ kicker, title, body }: TChapterIntroProps) {
  return (
    <>
      <p className={cx(deck.reveal, chapterIntro.kicker)} style={stagger(0)}>
        {kicker}
      </p>
      <h2 className={cx(deck.reveal, chapterIntro.title)} style={stagger(1)}>
        {title}
      </h2>
      <p className={cx(deck.reveal, chapterIntro.body)} style={stagger(2)}>
        {body}
      </p>
    </>
  );
}
