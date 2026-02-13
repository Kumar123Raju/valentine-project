import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type StoryChapter = {
  id: string;
  day: number;
  title: string;
  question: string;
  image: ImagePlaceholder;
};

const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

export const storyChapters: StoryChapter[] = [
  {
    id: 'chapter-1',
    day: 1,
    title: 'Our First Adventure',
    question: "Do you remember the salty air that day? What was your favorite moment?",
    image: galleryImages[0],
  },
  {
    id: 'chapter-2',
    day: 2,
    title: 'That Spontaneous Trip',
    question: "We just decided to go. What's one word you'd use to describe this memory?",
    image: galleryImages[1],
  },
  {
    id: 'chapter-3',
    day: 3,
    title: 'Cozy Moments',
    question: "We could be anywhere, but here felt like home. What song does this picture remind you of?",
    image: galleryImages[2],
  },
  {
    id: 'chapter-4',
    day: 4,
    title: 'Golden Hour',
    question: "The world seemed to pause for us. If this sunset had a flavor, what would it be?",
    image: galleryImages[3],
  },
  {
    id: 'chapter-5',
    day: 5,
    title: 'The Path We Walk',
    question: "Every step with you is a journey I cherish. Where should our next adventure take us?",
    image: galleryImages[4],
  },
];
