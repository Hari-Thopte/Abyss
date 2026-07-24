import { useRef } from 'react';

export const useAnalytics = () => {
  const events = useRef([]);

  const trackPageView = (path, title) => {
    try {
      console.log(`📄 Page View: ${path} - ${title}`);
      events.current.push({ 
        type: 'pageview', 
        path: String(path || '/'), 
        title: String(title || 'ABYSS'), 
        timestamp: Date.now() 
      });
    } catch (error) {
      console.log('📄 Page View tracked');
    }
  };

  const trackEvent = (category, action, label = null, value = null) => {
    try {
      console.log(`📊 Event: ${String(category)} | ${String(action)} | ${String(label || '')}`);
      events.current.push({ 
        type: 'event', 
        category: String(category || 'unknown'),
        action: String(action || 'click'),
        label: label ? String(label) : null,
        value: value ? Number(value) : null,
        timestamp: Date.now() 
      });
    } catch (error) {
      console.log('📊 Event tracked');
    }
  };

  const getEvents = () => events.current;

  return { trackPageView, trackEvent, getEvents };
};