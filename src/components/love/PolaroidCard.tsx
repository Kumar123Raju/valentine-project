"use client";

import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Typewriter } from './Typewriter';

type StoryCardProps = {
  image: ImagePlaceholder;
  className?: string;
  quote: string;
};

export function StoryCard({ image, className, quote }: StoryCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);
  
  const shineX = useTransform(x, [-150, 150], [0, 100]);
  const shineY = useTransform(y, [-150, 150], [0, 100]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative bg-card/80 backdrop-blur-md p-4 pb-12 shadow-2xl shadow-primary/20 rounded-lg flex-shrink-0 w-[300px] md:w-[380px]',
        className
      )}
    >
      <div className="relative w-full h-[340px] md:h-[420px] bg-muted/50 rounded-md overflow-hidden">
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          sizes="(max-width: 768px) 300px, 380px"
          className="object-cover"
          data-ai-hint={image.imageHint}
          priority
        />
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.4), transparent 40%)`
          }}
        />
      </div>
      <div className="font-headline text-center mt-4 text-lg text-card-foreground">
        <Typewriter text={`"${quote}"`} delay={0.8} />
      </div>
      <p className="font-body text-center mt-3 text-sm text-card-foreground/70">
        {image.description}
      </p>
    </motion.div>
  );
}
