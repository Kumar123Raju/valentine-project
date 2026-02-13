"use client";

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Storybook } from './Storybook';
import { ProposalSection } from './ProposalSection';
import { FloatingPetals } from './FloatingPetals';

export function ProposalContent() {
  const [storyFinished, setStoryFinished] = useState(false);

  const handleStoryComplete = () => {
    setStoryFinished(true);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center min-h-screen w-full relative"
    >
      <div className="absolute inset-0 mesh-gradient -z-10" />
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!storyFinished ? (
          <motion.div
            key="storybook"
            className="w-full min-h-screen flex items-center justify-center"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Storybook onComplete={handleStoryComplete} />
          </motion.div>
        ) : (
          <motion.div 
            key="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="w-full min-h-screen"
          >
            <ProposalSection />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
