import { Deck } from "@/components/deck/Deck";
import { ContactSlide } from "@/components/slides/ContactSlide";
import { ProblemSlide } from "@/components/slides/ds/ProblemSlide";
import { RebrandSlide } from "@/components/slides/ds/RebrandSlide";
import { TokenTraceSlide } from "@/components/slides/ds/TokenTraceSlide";
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
        <TokenTraceSlide />
        <RebrandSlide />
        <ContactSlide />
      </Deck>
    </main>
  );
}
