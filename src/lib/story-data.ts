import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type StoryStep = {
  id: string;
  title: string;
  question: string;
  placeholderText: string;
  image: ImagePlaceholder;
};

const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

export const STORY_STEPS: StoryStep[] = [
  {
    id: 'step-1',
    title: 'Our First Adventure',
    question: "Do you remember the salty air that day? What was your favorite moment?",
    placeholderText: "I loved the way you smiled...",
    image: galleryImages[0],
  },
  {
    id: 'step-2',
    title: 'That Spontaneous Trip',
    question: "We just decided to go. What's one word you'd use to describe this memory?",
    placeholderText: "It felt so...",
    image: galleryImages[1],
  },
  {
    id: 'step-3',
    title: 'Cozy Moments',
    question: "We could be anywhere, but here felt like home. What song does this picture remind you of?",
    placeholderText: "It makes me think of...",
    image: galleryImages[2],
  },
  {
    id: 'step-4',
    title: 'Golden Hour',
    question: "The world seemed to pause for us. If this sunset had a flavor, what would it be?",
    placeholderText: "It would taste like...",
    image: galleryImages[3],
  },
  {
    id: 'step-5',
    title: 'The Path We Walk',
    question: "Every step with you is a journey I cherish. Where should our next adventure take us?",
    placeholderText: "Let's go to...",
    image: galleryImages[4],
  },
];
