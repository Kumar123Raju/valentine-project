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
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };
  
  if (!isClient) {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-background" />
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="auth"
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <GlowingVault onUnlock={handleUnlock} />
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <ProposalContent />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
