"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { storyChapters, StoryChapter } from '@/lib/story-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flower2 } from 'lucide-react';
import { StoryCard } from './PolaroidCard';

type StorybookProps = {
  onComplete: () => void;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 0.8,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    scale: 0.8,
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
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
          }}
          className="absolute w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
        >
          <div className="w-full max-w-md mx-auto flex flex-col items-center text-center">
              <motion.h2 
                  className="font-headline text-4xl md:text-5xl text-primary mb-8 drop-shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
              >
                  {chapter.title}
              </motion.h2>

              <StoryCard image={chapter.image} quote={chapter.quote} />

              {chapter.isRoseDay && !roseGiven && (
                   <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5, type: 'spring' }}
                      className="mt-8"
                   >
                      <Button onClick={handleGiveRose} className="bg-accent hover:bg-accent/90 shadow-lg shadow-accent/30">
                          <Flower2 className="mr-2"/>
                          Give a Rose
                      </Button>
                   </motion.div>
              )}
          </div>
        </motion.div>
      </AnimatePresence>
      
      {roseGiven && (
        <motion.div 
          initial={{ scale: 0, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="fixed top-5 right-5 z-20 text-red-400 drop-shadow-lg"
        >
            <Flower2 className="w-12 h-12" />
        </motion.div>
      )}

      <Button
        onClick={() => paginate(1)}
        className="absolute bottom-10 right-10 z-10 rounded-full h-16 w-16 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30"
      >
        <ArrowRight className="h-8 w-8" />
      </Button>
    </div>
  );
}
