import { Deck } from "@/components/deck/Deck";
import { HeroSlide } from "@/components/slides/HeroSlide";
import { TimelineSlide } from "@/components/slides/TimelineSlide";
import { slideList } from "@/content/slides";

export default function Home() {
  return (
    <main>
      <Deck slides={slideList}>
        <HeroSlide />
        <TimelineSlide />
      </Deck>
    </main>
  );
}
