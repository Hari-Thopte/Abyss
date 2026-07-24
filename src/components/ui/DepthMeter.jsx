import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

export const DepthMeter = React.memo(() => {
  const { depth } = useAppStore();
  const depthInMeters = Math.floor(depth * 1200);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-gray-400 tracking-wider uppercase">Depth</div>
        <div className="relative h-64 w-1 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-full overflow-hidden">
          <motion.div
            className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-400 to-cyan-600 rounded-full"
            style={{ 
              height: `${depth * 100}%`,
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          />
        </div>
        <div className="text-lg font-mono text-cyan-300">{depthInMeters}m</div>
        <div className="text-xs text-gray-500">below surface</div>
      </div>
    </div>
  );
});