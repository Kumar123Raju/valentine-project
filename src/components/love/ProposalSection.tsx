"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Confetti } from './Confetti';
import { FloatingHearts } from './FloatingHearts';
import { MemoryExplosion } from './MemoryExplosion';
import { memories } from '@/lib/memories-data';

export function ProposalSection() {
  const [isYes, setIsYes] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [noCount, setNoCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const { innerWidth, innerHeight } = isClient ? window : { innerWidth: 0, innerHeight: 0 };
  
  const noButtonX = useMotionValue(innerWidth / 2 + 100);
  const noButtonY = useMotionValue(innerHeight / 2);
  const velocity = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useAnimationFrame((_, delta) => {
    if (!noButtonRef.current || isYes) return;

    const buttonRect = noButtonRef.current.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const dx = mousePos.current.x - buttonCenterX;
    const dy = mousePos.current.y - buttonCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Increased repulsion and speed for "High-Speed Evasion"
    const repulsionForce = 20000;
    
    if (distance < 200) { // Larger detection radius
      setNoCount(c => c + 1);
      const angle = Math.atan2(dy, dx);
      // More aggressive force calculation
      const force = -repulsionForce / (distance * distance + 1);
      velocity.current.x += Math.cos(angle) * force * 1.5;
      velocity.current.y += Math.sin(angle) * force * 1.5;
    }

    // Damping / Friction
    velocity.current.x *= 0.90; // Less friction for faster movement
    velocity.current.y *= 0.90;

    let newX = noButtonX.get() + velocity.current.x * (delta / 1000);
    let newY = noButtonY.get() + velocity.current.y * (delta / 1000);

    // Boundary checks to keep it on screen
    if (newX < buttonRect.width / 2) { newX = buttonRect.width / 2; velocity.current.x *= -1.1; }
    if (newX > innerWidth - buttonRect.width / 2) { newX = innerWidth - buttonRect.width / 2; velocity.current.x *= -1.1; }
    if (newY < buttonRect.height / 2) { newY = buttonRect.height / 2; velocity.current.y *= -1.1; }
    if (newY > innerHeight - buttonRect.height / 2) { newY = innerHeight - buttonRect.height / 2; velocity.current.y *= -1.1; }

    noButtonX.set(newX);
    noButtonY.set(newY);
  });

  const handleYesClick = () => {
    setIsYes(true);
  };
  
  const yesButtonScale = 1 + noCount * 0.08;

  if (!isClient) return null;

  return (
    <div ref={containerRef} className="w-full relative py-24 text-center min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      <AnimatePresence>
        {isYes && (
          <motion.div
            key="yes-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5, delay: 0.5 } }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center flex-col z-20 pointer-events-none"
          >
            <MemoryExplosion />
            <motion.div 
              className="absolute inset-0 bg-primary/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 2, delay: memories.length * 0.1 + 1 } }}
              style={{ filter: 'blur(100px)'}}
            />
            <motion.h2 
              className="font-headline text-5xl md:text-8xl text-white drop-shadow-lg animate-pulse"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1, delay: memories.length * 0.1 + 1.5, type: 'spring' } }}
            >
              I Love You Forever!
            </motion.h2>
            <Confetti />
            <FloatingHearts count={100} color="text-red-500" />
            <FloatingHearts count={100} color="text-pink-400" />
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
            <h2 className="font-headline text-5xl md:text-7xl text-primary mb-20 drop-shadow-md">
              Will you be my Valentine forever?
            </h2>
            <div className="fixed inset-0">
              <motion.div
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                animate={{ scale: yesButtonScale }}
                whileHover={{ scale: yesButtonScale * 1.1 }}
                whileTap={{ scale: yesButtonScale * 1.2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                <Button
                  style={{
                    fontSize: `${Math.min(24 + noCount, 60)}px`,
                    padding: `${Math.min(16 + noCount * 0.5, 40)}px ${Math.min(32 + noCount, 80)}px`,
                    boxShadow: `0 0 30px 5px hsl(var(--accent) / 0.7)`,
                  }}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full z-10 h-auto animate-pulse"
                  onClick={handleYesClick}
                >
                  Yes!
                </Button>
              </motion.div>

              <motion.button
                ref={noButtonRef}
                style={{ x: noButtonX, y: noButtonY, position: 'fixed', top: 0, left: 0, translateX: '-50%', translateY: '-50%' }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-8 py-6 rounded-full"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
