import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING');

  const statusMessages = [
    { progress: 0, message: 'INITIALIZING SYSTEMS' },
    { progress: 10, message: 'CALIBRATING SENSORS' },
    { progress: 25, message: 'DEPLOYING SONAR ARRAY' },
    { progress: 40, message: 'CHECKING PRESSURE HULL' },
    { progress: 55, message: 'ENGAGING THRUSTERS' },
    { progress: 70, message: 'NAVIGATING TO COORDINATES' },
    { progress: 85, message: 'READYING FOR DESCENT' },
    { progress: 95, message: 'FINALIZING SYSTEMS' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 3 + 0.5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setProgress(100);
          setStatus('DESCENT READY');
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
          return 100;
        }
        
        // Update status message based on progress
        for (let i = statusMessages.length - 1; i >= 0; i--) {
          if (newProgress >= statusMessages[i].progress) {
            setStatus(statusMessages[i].message);
            break;
          }
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-background">
        <div className="loading-overlay" />
        
        <div className="loading-content">
          <div className="loading-header">
            <span className="loading-icon">🌊</span>
            <h1 className="loading-title">ABYSS</h1>
            <p className="loading-subtitle">DEEP SEA EXPLORATION</p>
          </div>

          <div className="loading-status">
            <div className="loading-progress-container">
              <div className="loading-progress-bar">
                <div 
                  className="loading-progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="loading-progress-text">{Math.floor(progress)}%</span>
            </div>
            
            <div className="loading-status-text">
              <span className="status-message">{status}</span>
              <span className="status-dots">
                <span className="dot dot-1">.</span>
                <span className="dot dot-2">.</span>
                <span className="dot dot-3">.</span>
              </span>
            </div>

            <div className="loading-depth-info">
              <span>DESCENDING DEEP</span>
              <span>FROM 2021.12.05 PR55 MIN STRAIGHT CS...</span>
            </div>
          </div>

          <div className="loading-footer">
            <div className="loading-pulse-ring" />
            <span>SYSTEMS ONLINE • READY FOR DESCENT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;