"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { storyChapters, StoryChapter } from '@/lib/story-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flower2 } from 'lucide-react';

type StorybookProps = {
  onComplete: () => void;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export function Storybook({ onComplete }: StorybookProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [roseGiven, setRoseGiven] = useState(false);

  const chapter = storyChapters[page];

  const paginate = (newDirection: number) => {
    if (page + newDirection >= storyChapters.length) {
      onComplete();
    } else {
      setPage([page + newDirection, newDirection]);
    }
  };

  const handleGiveRose = () => {
    setRoseGiven(true);
  };
  
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background/50 backdrop-blur-sm">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
        >
          <ChapterContent chapter={chapter} onGiveRose={handleGiveRose} roseGiven={roseGiven}/>
        </motion.div>
      </AnimatePresence>
      
      {roseGiven && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed top-5 right-5 z-20 text-red-500"
        >
            <Flower2 className="w-12 h-12" />
        </motion.div>
      )}

      <Button
        onClick={() => paginate(1)}
        className="absolute bottom-10 right-10 z-10 rounded-full h-16 w-16 bg-primary hover:bg-primary/90"
      >
        <ArrowRight className="h-8 w-8" />
      </Button>
    </div>
  );
}

function ChapterContent({ chapter, onGiveRose, roseGiven }: { chapter: StoryChapter, onGiveRose: () => void, roseGiven: boolean }) {
    return (
        <div className="w-full max-w-md mx-auto flex flex-col items-center text-center">
            <motion.h2 
                className="font-headline text-4xl md:text-5xl text-primary mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {chapter.title}
            </motion.h2>

            <motion.div
                className="relative bg-white p-4 pb-12 shadow-xl rounded-sm w-[280px] md:w-[350px] my-8"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
            >
                <div className="relative w-full h-[320px] md:h-[400px] bg-gray-200">
                <Image
                    src={chapter.image.imageUrl}
                    alt={chapter.image.description}
                    fill
                    sizes="(max-width: 768px) 280px, 350px"
                    className="object-cover"
                    data-ai-hint={chapter.image.imageHint}
                />
                </div>
                <p className="font-headline text-center mt-4 text-lg text-gray-700">
                    {chapter.image.description}
                </p>
            </motion.div>

            <motion.p 
                className="text-lg md:text-xl text-foreground/80 italic mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                "{chapter.quote}"
            </motion.p>

            {chapter.isRoseDay && !roseGiven && (
                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                 >
                    <Button onClick={onGiveRose} className="bg-accent hover:bg-accent/90">
                        <Flower2 className="mr-2"/>
                        Give a Rose
                    </Button>
                 </motion.div>
            )}
        </div>
    )
}
