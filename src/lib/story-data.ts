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
    title: 'Our First Meet',
    question: "Do you remember the day we first met? What made that moment so special for you?",
    placeholderText: "I remember when you...",
    image: galleryImages[0],
  },
  {
    id: 'step-2',
    title: 'Your Beautiful Smile',
    question: "I was always trying to make you laugh with my silly antics. What made you eventually notice me?",
    placeholderText: "You made me feel...",
    image: galleryImages[1],
  },
  {
    id: 'step-3',
    title: 'Through the Pain',
    question: "There were moments when your silence hurt, but I never stopped loving you. Did you ever feel the depth of my love?",
    placeholderText: "I wanted you to know that...",
    image: galleryImages[2],
  },
  {
    id: 'step-4',
    title: 'Growing Closer',
    question: "That temple visit was when everything changed between us. Do you feel how close we became that day?",
    placeholderText: "At that moment, I felt...",
    image: galleryImages[3],
  },
  {
    id: 'step-5',
    title: 'smile together',
    question: "smile together, the whole world disappeared. How did that moment feel for you?",
    placeholderText: "It felt like...",
    image: galleryImages[4],
  },
];
