import React, { useState } from 'react';

const DayNightControls = ({ onTimeChange }) => {
  const [time, setTime] = useState(0.5);

  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    setTime(value);
    if (onTimeChange) onTimeChange(value);
  };

  const getTimeLabel = () => {
    if (time < 0.2) return '🌙 Midnight';
    if (time < 0.35) return '🌅 Sunrise';
    if (time < 0.65) return '☀️ Day';
    if (time < 0.8) return '🌅 Sunset';
    return '🌙 Night';
  };

  return (
    <div className="daynight-controls">
      <div className="dn-container">
        <span className="dn-icon">🌙</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={time}
          onChange={handleChange}
          className="dn-slider"
          style={{
            background: `linear-gradient(to right, #1a1a3a, #ff8844, #4a90d9, #ff8844, #1a1a3a)`,
          }}
        />
        <span className="dn-icon">☀️</span>
        <span className="dn-label">{getTimeLabel()}</span>
      </div>
    </div>
  );
};

export default DayNightControls;