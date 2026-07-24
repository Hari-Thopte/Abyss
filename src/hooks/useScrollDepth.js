import { useEffect, useState } from 'react';

export const useScrollDepth = () => {
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const updateDepth = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setDepth(maxScroll > 0 ? scrollPosition / maxScroll : 0);
    };

    window.addEventListener('scroll', updateDepth, { passive: true });
    updateDepth();
    return () => window.removeEventListener('scroll', updateDepth);
  }, []);

  return depth;
};