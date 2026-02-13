"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const confettiColors = [
  'bg-primary',
  'bg-accent',
  'bg-pink-400',
  'bg-red-400',
  'bg-yellow-400',
];

export function Confetti() {
  const [confettiPieces, setConfettiPieces] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const generatedPieces = Array.from({ length: 150 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animation: `confetti-fall ${Math.random() * 3 + 2}s ease-out ${Math.random() * 2}s forwards`,
      };
      const dimensions = Math.random() * 0.5 + 0.25;
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];

      return (
        <div
          key={i}
          className={cn('absolute top-0 opacity-0', color)}
          style={{
            ...style,
            width: `${dimensions}rem`,
            height: `${dimensions / 2}rem`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      );
    });
    setConfettiPieces(generatedPieces);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {confettiPieces}
    </div>
  );
}
