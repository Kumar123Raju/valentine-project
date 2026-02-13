"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PhotoFinale } from './PhotoFinale';
import { useIsMobile } from '@/hooks/use-mobile';

export function ProposalSection() {
  const [isYes, setIsYes] = useState(false);
  const [noButtonVisible, setNoButtonVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [noCount, setNoCount] = useState(0);
  const isMobile = useIsMobile();
  
  const noButtonX = useMotionValue(0);
  const noButtonY = useMotionValue(0);

  // Initialize position once client is available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      noButtonX.set(window.innerWidth / 2 + 100);
      noButtonY.set(window.innerHeight / 2);
    }
  }, []);


  const velocity = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useAnimationFrame((_, delta) => {
    if (!noButtonRef.current || isYes || isMobile) return;

    const buttonRect = noButtonRef.current.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const dx = mousePos.current.x - buttonCenterX;
    const dy = mousePos.current.y - buttonCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // High-Speed Evasion Physics
    const repulsionForce = 30000;
    
    if (distance < 200) { 
      setNoCount(c => c + 1);
      const angle = Math.atan2(dy, dx);
      const force = -repulsionForce / (distance * distance + 1);
      velocity.current.x += Math.cos(angle) * force * 1.5;
      velocity.current.y += Math.sin(angle) * force * 1.5;
    }

    // Damping / Friction
    velocity.current.x *= 0.88;
    velocity.current.y *= 0.88;

    let newX = noButtonX.get() + velocity.current.x * (delta / 1000);
    let newY = noButtonY.get() + velocity.current.y * (delta / 1000);

    const { innerWidth, innerHeight } = window;
    // Boundary checks
    if (newX < buttonRect.width / 2) { newX = buttonRect.width / 2; velocity.current.x *= -1.2; }
    if (newX > innerWidth - buttonRect.width / 2) { newX = innerWidth - buttonRect.width / 2; velocity.current.x *= -1.2; }
    if (newY < buttonRect.height / 2) { newY = buttonRect.height / 2; velocity.current.y *= -1.2; }
    if (newY > innerHeight - buttonRect.height / 2) { newY = innerHeight - buttonRect.height / 2; velocity.current.y *= -1.2; }

    noButtonX.set(newX);
    noButtonY.set(newY);
  });

  const handleYesClick = () => {
    setIsYes(true);
  };
  
  const yesButtonScale = 1 + noCount * 0.08;

  return (
    <div ref={containerRef} className="w-full relative py-24 text-center min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      <AnimatePresence>
        {isYes && <PhotoFinale />}
      </AnimatePresence>
      
      <AnimatePresence>
        {!isYes && (
          <motion.div
            key="question"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-headline text-5xl md:text-7xl text-primary mb-20 drop-shadow-md">
              Will you be my Valentine forever?
            </h2>
            <div className="fixed inset-0 flex items-center justify-center">
              <motion.div
                className="absolute"
                style={{
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                animate={{ scale: isMobile ? 1.2 : yesButtonScale }}
                whileHover={{ scale: isMobile ? 1.3 : yesButtonScale * 1.1 }}
                whileTap={{ scale: isMobile ? 1.4 : yesButtonScale * 1.2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                <Button
                  style={{
                    fontSize: `${Math.min(24 + noCount, 60)}px`,
                    padding: `${isMobile ? 24 : Math.min(16 + noCount * 0.5, 40)}px ${isMobile ? 48 : Math.min(32 + noCount, 80)}px`,
                    boxShadow: `0 0 40px 10px hsl(var(--accent) / 0.7)`,
                  }}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full z-10 h-auto animate-pulse"
                  onClick={handleYesClick}
                >
                  Yes!
                </Button>
              </motion.div>

              {noButtonVisible && (
                <motion.button
                  ref={noButtonRef}
                  style={isMobile ? {} : { x: noButtonX, y: noButtonY, position: 'fixed', top: 0, left: 0, translateX: '-50%', translateY: '-50%' }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-8 py-6 rounded-full absolute md:fixed"
                  onClick={() => { if(isMobile) setNoButtonVisible(false) }}
                  initial={isMobile ? { scale: 1, opacity: 1, y: 150 } : false}
                  animate={isMobile ? { scale: 1, opacity: 1 } : false}
                  exit={isMobile ? { scale: 0, opacity: 0, transition: { duration: 0.3 } } : false}
                >
                  No
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
