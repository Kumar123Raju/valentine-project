"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const confettiColors = [
  'bg-primary',
  'bg-accent',
  'bg-pink-400',
  'bg-rose-400',
  'bg-red-500',
];

export function Confetti() {
  const [confettiPieces, setConfettiPieces] = useState<JSX.Element[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient) return;

    const generatedPieces = Array.from({ length: 300 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animation: `confetti-fall ${Math.random() * 4 + 3}s ease-out ${Math.random() * 3}s forwards`,
      };
      const dimensions = Math.random() * 0.6 + 0.3;
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];

      return (
        <div
          key={i}
          className={cn('absolute top-0 opacity-0', color)}
          style={{
            ...style,
            width: `${dimensions}rem`,
            height: `${dimensions / 1.5}rem`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      );
    });
    setConfettiPieces(generatedPieces);
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {confettiPieces}
    </div>
  );
}
