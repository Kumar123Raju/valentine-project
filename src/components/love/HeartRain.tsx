
"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function HeartRain() {
  const [hearts, setHearts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const heartElements = Array.from({ length: 50 }).map((_, i) => (
      <motion.span
        key={i}
        className="absolute text-red-500"
        style={{
          top: '-10%',
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 1.5 + 0.75}rem`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
        animate={{
          top: '110%',
        }}
        transition={{
          duration: Math.random() * 3 + 4,
          repeat: Infinity,
          repeatDelay: 1,
          ease: 'linear',
          delay: Math.random() * 5,
        }}
      >
        ❤️
      </motion.span>
    ));
    setHearts(heartElements);
  }, []);

  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
      {hearts}
    </div>
  );
}
