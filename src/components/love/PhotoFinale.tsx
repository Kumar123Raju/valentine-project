
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FINAL_MEMORIES } from '@/lib/memories-data';
import Image from 'next/image';
import { HeartRain } from './HeartRain';
import { useIsMobile } from '@/hooks/use-mobile';

export function PhotoFinale() {
  const [stage, setStage] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 200),    // BG clears
      setTimeout(() => setStage(2), 1000),   // Rain
      setTimeout(() => setStage(3), 2500),   // Sides
      setTimeout(() => setStage(4), 4000),   // Center Burst
      setTimeout(() => setStage(5), 6000),   // Final Text
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const rainPhotos = FINAL_MEMORIES.slice(0, 5);
  const sidePhotos = FINAL_MEMORIES.slice(5, 10);
  const centerPhotos = FINAL_MEMORIES.slice(10);

  const getPhotoSize = () => isMobile ? { w: '28vw', a: 2 / 3 } : { w: '18vw', a: 2 / 3 };
  const size = getPhotoSize();

  const photoBaseStyle = `absolute p-2 bg-card/80 backdrop-blur-md shadow-2xl rounded-lg`;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Stage 1: Background Wipe */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            initial={{ backdropFilter: 'blur(12px)', background: 'hsla(var(--background) / 0.5)' }}
            animate={{ backdropFilter: 'blur(0px)', background: 'hsla(var(--primary) / 0.1)' }}
            transition={{ duration: 1.5, ease: 'easeIn' }}
            className="absolute inset-0 z-0"
          />
        )}
      </AnimatePresence>

      {/* Stage 2: The Rain */}
      <AnimatePresence>
        {stage >= 2 && rainPhotos.map((mem, i) => (
          <motion.div
            key={`rain-${mem.id}`}
            initial={{ y: '-100vh', x: `${10 + i * 18}vw`, opacity: 0, rotate: (Math.random() - 0.5) * 60 }}
            animate={{ y: `${5 + (i % 2) * 10}vh`, opacity: 1, transition: { type: 'spring', stiffness: 50, damping: 12, bounce: 0.5, delay: i * 0.15 } }}
            className={photoBaseStyle}
            style={{ width: size.w, aspectRatio: size.a, zIndex: i + 1 }}
          >
            <Image src={mem.imageUrl} alt="Memory" fill sizes={size.w} className="object-cover rounded-sm" data-ai-hint={mem.imageHint} />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Stage 3: The Sides */}
      <AnimatePresence>
        {stage >= 3 && sidePhotos.map((mem, i) => (
          <motion.div
            key={`side-${mem.id}`}
            initial={{ x: i % 2 === 0 ? '-100vw' : '100vw', opacity: 0, y: `${20 + i * 12}vh`, rotate: (Math.random() - 0.5) * 40 }}
            animate={{ x: i % 2 === 0 ? '5vw' : '77vw', opacity: 1, transition: { type: 'spring', stiffness: 50, damping: 15, delay: i * 0.15 } }}
            className={photoBaseStyle}
            style={{ width: size.w, aspectRatio: size.a, zIndex: rainPhotos.length + i + 1 }}
          >
            <Image src={mem.imageUrl} alt="Memory" fill sizes={size.w} className="object-cover rounded-sm" data-ai-hint={mem.imageHint} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Stage 4: The Center Burst */}
       <AnimatePresence>
        {stage >= 4 && centerPhotos.map((mem, i) => {
            const pos = isMobile
            ? [{ x: '35vw', y: '30vh' }, { x: '35vw', y: '55vh' }, {x: '2vw', y: '40vh'}, {x: '68vw', y: '40vh'}, { x: '35vw', y: '80vh' }]
            : [{ x: '41vw', y: '35vh' }, { x: '25vw', y: '50vh' }, { x: '57vw', y: '50vh' }, { x: '41vw', y: '65vh' }, { x: '41vw', y: '5vh' }];
           return (
            <motion.div
                key={`center-${mem.id}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15, delay: i * 0.15 } }}
                className={photoBaseStyle}
                style={{ width: size.w, aspectRatio: size.a, zIndex: rainPhotos.length + sidePhotos.length + i + 1, ...pos[i % pos.length] }}
            >
                <Image src={mem.imageUrl} alt="Memory" fill sizes={size.w} className="object-cover rounded-sm" data-ai-hint={mem.imageHint} />
            </motion.div>
           )
        })}
      </AnimatePresence>

      {/* Stage 5: Final Reveal */}
      <AnimatePresence>
        {stage >= 5 && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25, delay: 0.5 } }}
              className="absolute inset-0 flex items-center justify-center z-50"
            >
              <div className="relative p-8 md:p-12 text-center bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl">
                <h2 className="font-headline text-5xl md:text-7xl text-white drop-shadow-2xl">
                  I LOVE YOU TOO! ❤️
                </h2>
              </div>
            </motion.div>
            <HeartRain />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
