"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FINAL_MEMORIES } from '@/lib/memories-data';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export function PhotoFinale() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),   // BG clears
      setTimeout(() => setStage(2), 1500),  // Rain
      setTimeout(() => setStage(3), 3500),  // Circle
      setTimeout(() => setStage(4), 5500),  // Grid
      setTimeout(() => setStage(5), 7000),  // Final Text
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const polaroidRain = FINAL_MEMORIES.slice(0, 5);
  const circleGallery = FINAL_MEMORIES.slice(5, 10);
  const gridFill = FINAL_MEMORIES.slice(10);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            initial={{ backdropFilter: 'blur(12px)', background: 'hsla(var(--background) / 0.5)' }}
            animate={{ backdropFilter: 'blur(0px)', background: 'hsla(var(--primary) / 0.1)' }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          />
        )}
      </AnimatePresence>

      {/* Stage 2: Polaroid Rain */}
      <AnimatePresence>
        {stage >= 2 && polaroidRain.map((mem, i) => (
          <motion.div
            key={`rain-${mem.id}`}
            initial={{ y: '-100vh', x: `${20 + i * 16}vw`, opacity: 0, rotate: (Math.random() - 0.5) * 60 }}
            animate={{ y: `${10 + (i % 2) * 15}vh`, opacity: 1, transition: { type: 'spring', stiffness: 50, damping: 15, delay: i * 0.2 } }}
            className="absolute w-[18vw] h-auto aspect-[2/3] p-2 bg-card/80 backdrop-blur-md shadow-2xl rounded-lg z-10"
          >
            <Image src={mem.imageUrl} alt="Memory" fill sizes="18vw" className="object-cover rounded-sm" data-ai-hint={mem.imageHint} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Stage 3: Circle Gallery */}
      <AnimatePresence>
        {stage >= 3 && circleGallery.map((mem, i) => {
          const angle = (i / circleGallery.length) * 2 * Math.PI;
          const radius = 25; // vw/vh units
          return (
            <motion.div
              key={`circle-${mem.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: `calc(50vw - 9vw + ${radius * Math.cos(angle)}vw)`,
                y: `calc(50vh - 13.5vh + ${radius * Math.sin(angle)}vh)`,
                rotate: (Math.random() - 0.5) * 30,
                transition: { type: 'spring', stiffness: 80, damping: 12, delay: i * 0.2 }
              }}
              className="absolute w-[18vw] h-auto aspect-[2/3] p-2 bg-card/80 backdrop-blur-md shadow-2xl rounded-lg z-20"
            >
              <Image src={mem.imageUrl} alt="Memory" fill sizes="18vw" className="object-cover rounded-sm" data-ai-hint={mem.imageHint} />
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Stage 4: Grid Fill */}
      <AnimatePresence>
        {stage >= 4 && gridFill.map((mem, i) => {
          const positions = [
            { top: '5vh', left: '5vw' }, { top: '65vh', left: '80vw' },
            { top: '70vh', left: '5vw' }, { top: '5vh', left: '80vw' },
            { top: '35vh', left: '-2vw' }, { top: '35vh', right: '-2vw' }
          ];
          return (
            <motion.div
              key={`grid-${mem.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20, delay: i * 0.25 } }}
              className="absolute w-[18vw] h-auto aspect-[2/3] p-2 bg-card/80 backdrop-blur-md shadow-2xl rounded-lg z-30"
              style={positions[i % positions.length]}
            >
              <Image src={mem.imageUrl} alt="Memory" fill sizes="18vw" className="object-cover rounded-sm" data-ai-hint={mem.imageHint} />
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Stage 5: Final Overlay */}
      <AnimatePresence>
        {stage >= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 2 } }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none"
          >
            <Heart className="w-48 h-48 text-red-500/80 drop-shadow-lg" fill="currentColor" />
            <motion.h2
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { type: 'spring', delay: 0.5 } }}
              className="font-headline text-5xl md:text-7xl text-white -mt-24 drop-shadow-2xl"
            >
              I Love You Too!
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
