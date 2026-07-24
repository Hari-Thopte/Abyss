import React from 'react';
import { useAppStore } from '../../store/appStore';

export const MarineLife = React.memo(() => {
  const { isEcoMode } = useAppStore();
  
  if (isEcoMode) return null;
  
  return null;
});