import React from 'react';
import './WaveDivider.css';

const WaveDivider = ({ flip = false }) => (
  <div className={`wave-divider ${flip ? 'wave-flip' : ''}`}>
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
      <path
        className="wave-path wave-path-back"
        d="M0,30 C150,60 350,0 600,30 C850,60 1050,0 1200,30 L1200,60 L0,60 Z"
      />
      <path
        className="wave-path wave-path-front"
        d="M0,35 C200,10 400,55 600,35 C800,15 1000,55 1200,35 L1200,60 L0,60 Z"
      />
    </svg>
  </div>
);

export default WaveDivider;