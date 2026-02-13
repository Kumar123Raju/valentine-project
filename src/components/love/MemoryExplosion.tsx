"use client";

import { motion } from 'framer-motion';
import { memories } from '@/lib/memories-data';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: (i: number) => ({
    x: Math.random() > 0.5 ? '150vw' : '-150vw',
    y: (Math.random() - 0.5) * 2 * 50 + 'vh',
    rotate: (Math.random() - 0.5) * 720,
    opacity: 0,
    filter: 'sepia(100%)',
  }),
  visible: (i: number) => ({
    x: (Math.random() - 0.5) * 50 + 'vw',
    y: (Math.random() - 0.5) * 40 + 'vh',
    rotate: (Math.random() - 0.5) * 60,
    opacity: 1,
    filter: 'sepia(0%)',
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 15,
      mass: 0.5,
      delay: i * 0.1,
    },
  }),
};

export function MemoryExplosion() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {memories.map((mem, i) => (
        <motion.div
          key={mem.id}
          className="absolute w-[15vw] h-auto aspect-[2/3] p-2 bg-white/80 shadow-2xl rounded-lg"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: i + 5,
          }}
          custom={i}
          variants={imageVariants}
        >
          <Image
            src={mem.imageUrl}
            alt="Memory"
            fill
            sizes="15vw"
            className="object-cover rounded-sm"
            data-ai-hint={mem.imageHint}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
