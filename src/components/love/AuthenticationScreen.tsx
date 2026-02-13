"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';

const SECRET_NAME = 'Sweetheart'; // Case-insensitive check

type AuthenticationScreenProps = {
  onUnlock: () => void;
};

export function AuthenticationScreen({ onUnlock }: AuthenticationScreenProps) {
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
        title: "Not quite...",
        description: "That's not the secret name I know you by.",
      });
    }
  };

  const formVariants = {
    normal: { x: 0 },
    error: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-lg shadow-2xl border border-white/30"
        variants={formVariants}
        animate={error ? 'error' : 'normal'}
      >
        <h1 className="font-headline text-4xl text-center text-primary mb-2">LoveBloom</h1>
        <p className="text-center text-foreground/80 mb-8">A story waiting to unfold.</p>
        <div className="space-y-6">
          <Input
            type="password"
            placeholder="What's the secret name?"
            value={secretName}
            onChange={(e) => setSecretName(e.target.value)}
            className="text-center bg-transparent placeholder:text-foreground/50 h-12 text-lg"
          />
          <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/80 animate-pulse">
            <Heart className="mr-2 h-5 w-5 fill-primary-foreground" />
            Unlock Our Story
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
