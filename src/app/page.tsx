import { Deck } from "@/components/deck/Deck";
import { GapsSlide } from "@/components/slides/ai/GapsSlide";
import { CaseCoverSlide } from "@/components/slides/CaseCoverSlide";
import { ContactSlide } from "@/components/slides/ContactSlide";
import { DecisionSlide } from "@/components/slides/ds/DecisionSlide";
import { ProblemSlide } from "@/components/slides/ds/ProblemSlide";
import { RebrandSlide } from "@/components/slides/ds/RebrandSlide";
import { HeroSlide } from "@/components/slides/HeroSlide";
import { TimelineSlide } from "@/components/slides/TimelineSlide";
import { aiCase, designSystemCase } from "@/content/cases";
import { navLinks } from "@/content/navigation";
import { slideList, slides } from "@/content/slides";

export default function Home() {
  return (
    <Deck slides={slideList} nav={navLinks}>
      <HeroSlide />
      <TimelineSlide />
      <CaseCoverSlide slide={slides.dsCover} cover={designSystemCase.cover} />
      <ProblemSlide />
      <DecisionSlide />
      <RebrandSlide />
      <CaseCoverSlide slide={slides.aiCover} cover={aiCase.cover} />
      <GapsSlide />
      <ContactSlide />
    </Deck>
  );
}
