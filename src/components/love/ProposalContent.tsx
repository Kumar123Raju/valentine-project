"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      className="flex flex-col items-center min-h-screen w-full relative"
    >
      <div className="absolute inset-0 mesh-gradient -z-10" />

      <AnimatePresence mode="wait">
        {!storyFinished ? (
          <motion.div
            key="storybook"
            className="w-full min-h-screen flex items-center justify-center"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <Storybook onComplete={handleStoryComplete} />
          </motion.div>
        ) : (
          <motion.div 
            key="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full min-h-screen"
          >
            <ProposalSection />
          </motion.div>
        )}
      </AnimatePresence>
      
      <audio ref={audioRef} src={LofiTrackUrl} loop hidden />
    </motion.main>
  );
}
