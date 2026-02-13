"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';

const SECRET_NAME = 'Sweetheart'; // Case-insensitive check

type GlowingVaultProps = {
  onUnlock: () => void;
};

export function GlowingVault({ onUnlock }: GlowingVaultProps) {
  const [secretName, setSecretName] = useState('');
  const [error, setError] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretName.trim().toLowerCase() === SECRET_NAME.toLowerCase()) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 300);
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "That's not the secret key to my heart.",
      });
    }
  };

  const formVariants = {
    normal: { scale: 1, filter: 'hue-rotate(0deg)' },
    error: { 
      x: [-8, 8, -8, 8, 0], 
      scale: [1, 1.02, 1, 1.02, 1],
      filter: 'hue-rotate(45deg)',
      transition: { duration: 0.4 } 
    },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
       <motion.div
         className="absolute inset-0 mesh-gradient -z-10"
        />
      <motion.div
        variants={formVariants}
        animate={error ? 'error' : 'normal'}
        className="relative"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <motion.form
          onSubmit={handleSubmit}
          className="relative w-80 h-80 md:w-96 md:h-96 p-8 rounded-full bg-background/80 backdrop-blur-2xl shadow-2xl border border-primary/20 flex flex-col items-center justify-center gap-6"
        >
          <h1 className="font-headline text-5xl text-center text-primary drop-shadow-lg">LoveBloom</h1>
          <p className="text-center text-foreground/80 -mt-4">Unlock with the secret name.</p>
            <Input
              type="password"
              placeholder="Enter the secret name"
              value={secretName}
              onChange={(e) => setSecretName(e.target.value)}
              className="text-center bg-white/10 dark:bg-black/20 placeholder:text-foreground/50 h-12 text-lg backdrop-blur-sm rounded-full border-primary/30 focus:ring-accent"
            />
            <Button type="submit" size="icon" className="w-16 h-16 text-lg bg-primary hover:bg-accent rounded-full text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-accent/50 hover:scale-110 active:scale-100">
              <Heart className="w-7 h-7 fill-current" />
            </Button>
        </motion.form>
      </motion.div>
    </div>
  );
}
