"use client";

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PolaroidCard } from './PolaroidCard';

const rotations = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[3deg]', 'rotate-[-3deg]', 'rotate-[2deg]'];

export function PhotoGallery() {
  const images = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

  return (
    <section className="w-full py-20 bg-white/10">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-5xl md:text-6xl text-center text-primary mb-16">
          Our Moments
        </h2>
        <div className="flex gap-8 md:gap-16 items-center overflow-x-auto py-8 px-4 -mx-4 scrollbar-hide">
          {images.map((image, index) => (
            <PolaroidCard 
              key={image.id}
              image={image} 
              className={rotations[index % rotations.length]}
            />
          ))}
           <div className="flex-shrink-0 w-1"></div>
        </div>
      </div>
    </section>
  );
}
