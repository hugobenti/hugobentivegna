import { Deck } from "@/components/deck/Deck";
import { HeroSlide } from "@/components/slides/HeroSlide";
import { TimelineSlide } from "@/components/slides/TimelineSlide";
import { slides } from "@/content/slides";

export default function Home() {
  return (
    <main>
      <Deck slides={Object.values(slides)}>
        <HeroSlide />
        <TimelineSlide />
      </Deck>
    </main>
  );
}
