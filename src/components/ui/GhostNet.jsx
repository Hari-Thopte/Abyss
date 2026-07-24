import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

export const GhostNet = React.memo(() => {
  const [isTrapped, setIsTrapped] = useState(false);
  const { scrollProgress, setGhostNetEscaped, hasEscapedGhostNet } = useAppStore();

  useEffect(() => {
    if (scrollProgress > 0.45 && scrollProgress < 0.55 && !hasEscapedGhostNet) {
      setIsTrapped(true);
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        setIsTrapped(false);
        setGhostNetEscaped();
        document.body.style.overflow = 'auto';
      }, 2000);
    }
  }, [scrollProgress, hasEscapedGhostNet]);

  if (!isTrapped) return null;

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 bg-abyss-black/80 backdrop-blur-sm" />
      <motion.div
        className="relative max-w-md p-8 text-center bg-gradient-to-b from-red-900/20 to-abyss-black border border-red-500/30 rounded-2xl"
        animate={{ scale: [0.9, 1.05, 1], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <div className="text-6xl mb-4">🎣</div>
        <h3 className="text-2xl font-serif text-red-400 mb-2">Trapped in a Ghost Net</h3>
        <p className="text-gray-300 text-sm mb-4">
          Marine life can't escape this. Neither can you.
        </p>
        <button
          onClick={() => {
            setIsTrapped(false);
            setGhostNetEscaped();
            document.body.style.overflow = 'auto';
          }}
          className="px-6 py-2 bg-red-500/20 border border-red-500 rounded-full text-red-300 hover:bg-red-500/30 transition"
        >
          ✂️ Cut the Net
        </button>
      </motion.div>
    </motion.div>
  );
});