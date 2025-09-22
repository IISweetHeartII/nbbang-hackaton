'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiProps {
  show: boolean;
}

export function Confetti({ show }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    emoji: string;
  }>>([]);

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][
          Math.floor(Math.random() * 6)
        ],
        emoji: ['🎉', '✨', '🎊', '💰', '🏆', '🥳'][Math.floor(Math.random() * 6)]
      }));
      setParticles(newParticles);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl"
          initial={{
            x: `${particle.x}vw`,
            y: '-10vh',
            opacity: 0,
            scale: 0.5,
            rotate: 0
          }}
          animate={{
            x: `${particle.x + (Math.random() - 0.5) * 20}vw`,
            y: '110vh',
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 1, 0.8],
            rotate: 360 * 3
          }}
          transition={{
            duration: 3,
            ease: 'easeOut',
            delay: particle.id * 0.1
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  );
}