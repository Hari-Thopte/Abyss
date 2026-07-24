import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

export const EcoToggle = React.memo(() => {
  const { isEcoMode, toggleEcoMode } = useAppStore();

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={!isEcoMode ? 'text-cyan-300' : 'text-gray-500'}>
        🌊 Clean
      </span>
      <button
        onClick={toggleEcoMode}
        className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none"
        style={{ backgroundColor: isEcoMode ? '#ef4444' : '#06b6d4' }}
      >
        <motion.div
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
          animate={{ x: isEcoMode ? 26 : 2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </button>
      <span className={isEcoMode ? 'text-red-400' : 'text-gray-500'}>
        🗑️ Truth
      </span>
    </div>
  );
});