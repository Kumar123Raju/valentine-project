"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PhotoFinale } from './PhotoFinale';
import { useIsMobile } from '@/hooks/use-mobile';

export function ProposalSection() {
  const [isYes, setIsYes] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Changed to use top/left for positioning for more reliable rendering
  const [noPos, setNoPos] = useState({ top: '65%', left: '75%' });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNoInteraction = () => {
    if (!containerRef.current || !noButtonRef.current) return;
    
    const cWidth = window.innerWidth;
    const cHeight = window.innerHeight;
    const { width: bWidth, height: bHeight } = noButtonRef.current.getBoundingClientRect();
    
    // Ensure the button stays within the viewport with padding
    const newLeft = Math.random() * (cWidth - bWidth - 40) + 20;
    const newTop = Math.random() * (cHeight - bHeight - 40) + 20;
    
    setNoPos({ top: `${newTop}px`, left: `${newLeft}px` });
  };
  
  const handleYesClick = () => {
    setIsYes(true);
  };

  if (!isClient) {
    // Render nothing on the server to prevent hydration mismatches
    return null;
  }

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
            exit={{ opacity: 0, y: -100, transition: { duration: 0.5, ease: 'easeOut' } }}
            className="flex flex-col items-center justify-center fixed inset-0"
          >
            <h2 className="font-headline text-5xl md:text-7xl text-primary mb-40 drop-shadow-md z-10 text-center">
              Will you be my Valentine forever?
            </h2>

            <motion.div
              className="absolute z-20"
              style={{
                left: '50%',
                top: '50%',
                translateX: '-50%',
                translateY: '-50%',
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Button
                style={{
                  boxShadow: `0 0 40px 10px hsl(var(--accent) / 0.5)`,
                }}
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full z-10 h-auto text-4xl px-16 py-8"
                onClick={handleYesClick}
              >
                Yes!
              </Button>
            </motion.div>

            <motion.div
              ref={noButtonRef}
              className="absolute flex flex-col items-center z-30"
              // Animate top and left directly for more robust positioning
              animate={noPos}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              onMouseEnter={isMobile ? undefined : handleNoInteraction}
              onTouchStart={isMobile ? (e) => { e.preventDefault(); handleNoInteraction(); } : undefined}
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-8 py-6 rounded-full">
                No
              </Button>
              <motion.p 
                className="font-headline text-red-500 mt-4 text-lg drop-shadow-lg whitespace-nowrap"
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ textShadow: '0 0 10px rgba(255, 0, 0, 0.7)' }}
              >
                Dam hai to NO click krke dikhao! 😏
              </motion.p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
