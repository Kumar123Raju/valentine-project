"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FloatingHearts } from './FloatingHearts';
import { PhotoGallery } from './PhotoGallery';
import { ProposalSection } from './ProposalSection';

const LofiTrackUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"; // Placeholder

export function ProposalContent() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(error => {
        console.warn("Audio autoplay was prevented. User interaction may be required to start music.", error);
      });
    }
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center"
    >
      <FloatingHearts />
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-headline text-6xl md:text-8xl text-center text-primary leading-tight"
        >
          For My Dearest,<br/>My Valentine
        </motion.h1>
      </div>
      <PhotoGallery />
      <ProposalSection />
      
      <audio ref={audioRef} src={LofiTrackUrl} loop hidden />
    </motion.main>
  );
}
