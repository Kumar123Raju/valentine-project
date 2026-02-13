
"use client";

import { useState, useEffect } from 'react';

const PetalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 20 30" fill="currentColor" {...props}>
        <path d="M 10 0 C 0 10, 0 20, 10 30 C 20 20, 20 10, 10 0 Z" />
    </svg>
);


export function FloatingPetals() {
  const [petals, setPetals] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generatedPetals = Array.from({ length: 25 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animation: `float ${Math.random() * 10 + 10}s linear ${Math.random() * 10}s infinite`,
        transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`,
        opacity: Math.random() * 0.5 + 0.2,
      };
      const colors = ['text-primary', 'text-accent', 'text-secondary'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return <PetalIcon key={i} className={`absolute bottom-[-50px] ${color}`} style={style} />;
    });
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {petals}
    </div>
  );
}
