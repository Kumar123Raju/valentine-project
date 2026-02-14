"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { STORY_STEPS } from '@/lib/story-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Send, HeartPulse } from 'lucide-react';
import { StoryCard } from './PolaroidCard';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Typewriter } from './Typewriter';

type StorybookProps = {
  onComplete: () => void;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100vw' : '-100vw',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100vw' : '-100vw',
    opacity: 0,
  }),
};

export function Storybook({ onComplete }: StorybookProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const { toast } = useToast();

  const chapter = STORY_STEPS[page];

  // Reset state when page changes
  useEffect(() => {
    setMessage('');
    setMessageSent(false);
  }, [page]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      // Send message to server API for logging
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: chapter.question,
          answer: message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setMessageSent(true);
      toast({
        title: (
          <div className="flex items-center gap-2">
            <HeartPulse className="text-primary" />
            <span>Message Delivered!</span>
          </div>
        ),
        description: "Message delivered to Bachwa's heart",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const paginate = (newDirection: number) => {
    if (page + newDirection >= STORY_STEPS.length) {
      onComplete();
    } else {
      setPage([page + newDirection, newDirection]);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="md:w-[min(600px,80%)] md:h-[min(800px,90%)] md:bg-white/10 md:backdrop-blur-xl md:rounded-2xl md:border md:border-white/20 md:shadow-2xl flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="absolute w-full h-full flex flex-col items-center justify-center p-4"
          >
            <div className="w-[90vw] md:w-full max-w-lg mx-auto flex flex-col items-center text-center gap-6">
                <motion.h2 
                    className="font-headline text-4xl md:text-5xl text-primary mb-2 drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {chapter.title}
                </motion.h2>

                <StoryCard image={chapter.image} />
                
                <div className="w-full max-w-md">
                  <Typewriter text={chapter.question} className="text-foreground/90 text-lg mb-4" />
                  <Textarea
                    placeholder={chapter.placeholderText}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-white/10 dark:bg-black/20 placeholder:text-foreground/50 h-24 backdrop-blur-sm rounded-lg border-primary/30 focus:ring-accent"
                    disabled={messageSent}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!message || messageSent}
                    className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30"
                  >
                    <Send className="mr-2"/>
                    {messageSent ? 'Sent!' : 'Bachwa ko bhej do'}
                  </Button>
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {messageSent && (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute bottom-10 right-10 z-10"
            >
                <Button
                    onClick={() => paginate(1)}
                    className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30"
                >
                    <ArrowRight className="h-8 w-8" />
                </Button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
