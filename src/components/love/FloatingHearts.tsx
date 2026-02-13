"use client";

import { useState, useEffect } from 'react';

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

type FloatingHeartsProps = {
  count?: number;
  color?: string;
}

export function FloatingHearts({ count = 50, color = 'text-red-500' }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<JSX.Element[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const generatedHearts = Array.from({ length: count }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animation: `float ${Math.random() * 8 + 7}s linear ${Math.random() * 10}s infinite`,
        width: `${Math.random() * 40 + 20}px`,
        height: `${Math.random() * 40 + 20}px`,
        opacity: Math.random() * 0.8 + 0.2,
      };
      return <HeartIcon key={i} className={`absolute bottom-[-50px] ${color} opacity-50`} style={style} />;
    });
    setHearts(generatedHearts);
  }, [count, color, isClient]);

  if (!isClient) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 overflow-hidden pointer-events-none">
      {hearts}
    </div>
  );
}
