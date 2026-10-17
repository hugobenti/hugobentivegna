import { Deck } from "@/components/deck/Deck";
import { ContactSlide } from "@/components/slides/ContactSlide";
import { DecisionSlide } from "@/components/slides/ds/DecisionSlide";
import { ProblemSlide } from "@/components/slides/ds/ProblemSlide";
import { RebrandSlide } from "@/components/slides/ds/RebrandSlide";
import { HeroSlide } from "@/components/slides/HeroSlide";
import { TimelineSlide } from "@/components/slides/TimelineSlide";
import { slideList } from "@/content/slides";

export default function Home() {
  return (
    <main>
      <Deck slides={slideList}>
        <HeroSlide />
        <TimelineSlide />
        <ProblemSlide />
        <DecisionSlide />
        <RebrandSlide />
        <ContactSlide />
      </Deck>
    </main>
  );
}
