"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingPetals } from './FloatingPetals';
import { Storybook } from './Storybook';
import { ProposalSection } from './ProposalSection';

const LofiTrackUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"; // Placeholder

export function ProposalContent() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [storyFinished, setStoryFinished] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(error => {
        console.warn("Audio autoplay was prevented. User interaction may be required to start music.", error);
      });
    }
  }, []);
  
  const handleStoryComplete = () => {
    setStoryFinished(true);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center"
    >
      <FloatingPetals />
      <AnimatePresence mode="wait">
        {!storyFinished ? (
          <motion.div
            key="storybook"
            className="w-full h-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Storybook onComplete={handleStoryComplete} />
          </motion.div>
        ) : (
          <motion.div 
            key="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0 }}
            className="w-full"
          >
            <ProposalSection />
          </motion.div>
        )}
      </AnimatePresence>
      
      <audio ref={audioRef} src={LofiTrackUrl} loop hidden />
    </motion.main>
  );
}
