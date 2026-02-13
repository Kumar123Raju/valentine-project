import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type StoryChapter = {
  id: string;
  day: number;
  title: string;
  quote: string;
  image: ImagePlaceholder;
  isRoseDay?: boolean;
};

const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

export const storyChapters: StoryChapter[] = [
  {
    id: 'chapter-1',
    day: 1,
    title: 'Day 1: Where it all began',
    quote: "Our story began with a simple hello, but in my heart, I knew it was the start of forever.",
    image: galleryImages[0],
  },
  {
    id: 'chapter-2',
    day: 2,
    title: 'Day 2: Our first coffee',
    quote: "That first coffee was just an excuse. I just wanted to hear you laugh a little longer.",
    image: galleryImages[1],
  },
  {
    id: 'chapter-3',
    day: 3,
    title: 'Day 3: Rose Day',
    quote: "A single rose for the one who planted a garden in my soul.",
    image: galleryImages[2],
    isRoseDay: true,
  },
  {
    id: 'chapter-4',
    day: 4,
    title: 'Day 4: Sunset Whispers',
    quote: "Watching the sunset is beautiful, but watching it with you is everything.",
    image: galleryImages[3],
  },
  {
    id: 'chapter-5',
    day: 5,
    title: 'Day 5: Adventures Together',
    quote: "Here's to all the places we've been, and all the places we'll go. As long as I'm with you, I'm home.",
    image: galleryImages[4],
  },
];
