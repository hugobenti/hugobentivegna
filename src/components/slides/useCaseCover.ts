import type { ICaseCover } from "@/content/content.type";

/** The cover's chapters, each with the hash link to the slide it opens. */
export function useCaseCover(cover: ICaseCover) {
  return {
    chapters: cover.chapters.map((chapter) => ({
      ...chapter,
      href: `#${chapter.slideId}`,
    })),
  };
}
