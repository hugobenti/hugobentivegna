import { Deck } from "@/components/deck/Deck";
import { ContactSlide } from "@/components/slides/ContactSlide";
import { RebrandSlide } from "@/components/slides/ds/RebrandSlide";
import { ThesisSlide } from "@/components/slides/ds/ThesisSlide";
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
        <ThesisSlide />
        <TokenTraceSlide />
        <RebrandSlide />
        <ContactSlide />
      </Deck>
    </main>
  );
}
