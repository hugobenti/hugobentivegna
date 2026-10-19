import { Deck } from "@/components/deck/Deck";
import { ContactSlide } from "@/components/slides/ContactSlide";
import { CaseCoverSlide } from "@/components/slides/ds/CaseCoverSlide";
import { DecisionSlide } from "@/components/slides/ds/DecisionSlide";
import { ProblemSlide } from "@/components/slides/ds/ProblemSlide";
import { RebrandSlide } from "@/components/slides/ds/RebrandSlide";
import { HeroSlide } from "@/components/slides/HeroSlide";
import { TimelineSlide } from "@/components/slides/TimelineSlide";
import { navLinks } from "@/content/navigation";
import { slideList } from "@/content/slides";

export default function Home() {
  return (
    <Deck slides={slideList} nav={navLinks}>
      <HeroSlide />
      <TimelineSlide />
      <CaseCoverSlide />
      <ProblemSlide />
      <DecisionSlide />
      <RebrandSlide />
      <ContactSlide />
    </Deck>
  );
}
