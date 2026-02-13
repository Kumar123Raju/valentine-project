"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

type PolaroidCardProps = {
  image: ImagePlaceholder;
  className?: string;
};

export function PolaroidCard({ image, className }: PolaroidCardProps) {
  return (
    <motion.div
      className={cn(
        'relative bg-white p-4 pb-12 shadow-xl rounded-sm flex-shrink-0 w-[280px] md:w-[320px]',
        className
      )}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative w-full h-[320px] md:h-[360px] bg-gray-200">
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          sizes="(max-width: 768px) 280px, 320px"
          className="object-cover"
          data-ai-hint={image.imageHint}
        />
      </div>
      <p className="font-headline text-center mt-4 text-lg text-gray-700">
        {image.description}
      </p>
    </motion.div>
  );
}
