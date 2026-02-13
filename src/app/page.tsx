"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GlowingVault } from '@/components/love/AuthenticationScreen';
import { ProposalContent } from '@/components/love/ProposalContent';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Disable scrolling on the body
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };
  
  if (!isClient) {
    // Return a placeholder to avoid layout shifts and hydration errors
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-background" />
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="auth"
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <GlowingVault onUnlock={handleUnlock} />
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circIn" }}
          >
            <ProposalContent />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
