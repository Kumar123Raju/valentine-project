"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Confetti } from './Confetti';
import { FloatingHearts } from './FloatingHearts';

export function ProposalSection() {
  const [isYes, setIsYes] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: '50%', left: 'calc(50% + 100px)' });
  const containerRef = useRef<HTMLElement>(null);
  const [noCount, setNoCount] = useState(0);
  
  const yesButtonSize = Math.min(20 + noCount * 2, 60);

  const moveNoButton = () => {
    setNoCount(prev => prev + 1);
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newTop = Math.random() * (containerRect.height - 60);
    const newLeft = Math.random() * (containerRect.width - 120);
    setNoPosition({ top: `${newTop}px`, left: `${newLeft}px` });
  };

  const handleYesClick = () => {
    setIsYes(true);
  };
  
  return (
    <section ref={containerRef} className="w-full relative py-24 text-center min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      <AnimatePresence>
        {isYes && (
          <motion.div
            key="yes-message"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center flex-col"
          >
            <h2 className="font-headline text-5xl md:text-7xl text-primary animate-pulse">
              I Love You More!
            </h2>
            <Confetti />
            <FloatingHearts count={50} color="text-red-500" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!isYes && (
          <motion.div
            key="question"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-headline text-5xl md:text-7xl text-primary mb-12">
              Will you be my Valentine forever?
            </h2>
            <div className="relative w-[300px] h-[100px] flex items-center justify-center">
              <motion.div
                className="absolute"
                style={{ left: 'calc(50% - 150px)' }}
                animate={{ scale: 1 + noCount * 0.1 }}
                whileHover={{ scale: 1.1 + noCount * 0.1 }}
                whileTap={{ scale: 1.2 + noCount * 0.1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                <Button
                  style={{ fontSize: `${yesButtonSize}px`, padding: `${yesButtonSize/2}px ${yesButtonSize}px`}}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full z-10 h-auto"
                  onClick={handleYesClick}
                >
                  Yes!
                </Button>
              </motion.div>

              <motion.div
                className="absolute"
                style={{ top: noPosition.top, left: noPosition.left }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                onHoverStart={moveNoButton}
              >
                <Button
                  size="lg"
                  variant="destructive"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-8 py-6 rounded-full"
                >
                  No
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
