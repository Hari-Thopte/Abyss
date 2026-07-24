import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const generateMockStats = () => ({
  plasticRemoved: Math.floor(2340 + Math.random() * 100),
  totalExplorers: Math.floor(2340 + Math.random() * 50),
  monthlyGoal: 5000,
  percentageToGoal: 46.8 + (Math.random() * 5),
});

export const useAppStore = create(
  persist(
    (set, get) => ({
      isEcoMode: false,
      depth: 0,
      scrollProgress: 0,
      isSoundEnabled: false,
      hasEscapedGhostNet: false,
      stats: generateMockStats(),
      
      toggleEcoMode: () => {
        set((state) => ({ isEcoMode: !state.isEcoMode }));
        console.log('🔀 Eco mode toggled:', !get().isEcoMode);
      },
      
      setDepth: (depth) => set({ depth }),
      setScrollProgress: (progress) => set({ scrollProgress: progress }),
      
      toggleSound: () => {
        set((state) => ({ isSoundEnabled: !state.isSoundEnabled }));
        console.log('🔊 Sound toggled:', !get().isSoundEnabled);
      },
      
      setGhostNetEscaped: () => {
        set({ hasEscapedGhostNet: true });
        console.log('🕸️ Ghost net escaped!');
      },
      
      simulateBooking: () => {
        const currentStats = get().stats;
        const newStats = {
          ...currentStats,
          plasticRemoved: currentStats.plasticRemoved + 10,
          totalExplorers: currentStats.totalExplorers + 1,
          percentageToGoal: ((currentStats.plasticRemoved + 10) / currentStats.monthlyGoal) * 100,
        };
        set({ stats: newStats });
        console.log('🎉 Booking simulated! +10kg plastic removed');
        return { success: true, plasticOffset: 10 };
      },
      
      refreshStats: () => {
        set({ stats: generateMockStats() });
        console.log('🔄 Stats refreshed');
      },
    }),
    {
      name: 'abyss-storage',
      partialize: (state) => ({
        hasEscapedGhostNet: state.hasEscapedGhostNet,
        stats: state.stats,
        isEcoMode: state.isEcoMode,
        isSoundEnabled: state.isSoundEnabled,
      }),
    }
  )
);

if (typeof window !== 'undefined') {
  setInterval(() => {
    const { refreshStats } = useAppStore.getState();
    refreshStats();
  }, 60000);
}