"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthenticationScreen } from '@/components/love/AuthenticationScreen';
import { ProposalContent } from '@/components/love/ProposalContent';
import { FloatingPetals } from '@/components/love/FloatingPetals';

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
    // Return a simple loader or null to avoid hydration mismatch on server
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-background" />
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="auth"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <FloatingPetals />
            <AuthenticationScreen onUnlock={handleUnlock} />
          </motion.div>
        ) : (
          <motion.div key="content">
            <ProposalContent />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
