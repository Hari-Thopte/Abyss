import React, { useMemo } from 'react';
import './OceanBackground.css';

const random = (min, max) => Math.random() * (max - min) + min;

const OceanBackground = () => {
  const bubbles = useMemo(() => (
    Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: random(0, 100),
      size: random(4, 18),
      duration: random(14, 32),
      delay: random(0, 25),
      drift: random(-40, 40),
    }))
  ), []);

  const particles = useMemo(() => (
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: random(0, 100),
      top: random(0, 100),
      size: random(1, 3),
      duration: random(10, 22),
      delay: random(0, 20),
    }))
  ), []);

  return (
    <div className="ocean-bg" aria-hidden="true">
      <div className="ocean-caustics ocean-caustics-1" />
      <div className="ocean-caustics ocean-caustics-2" />

      <div className="ocean-rays">
        <span className="ray ray-1" />
        <span className="ray ray-2" />
        <span className="ray ray-3" />
      </div>

      <div className="ocean-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="ocean-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="ocean-bubbles">
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="ocean-bubble"
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              '--drift': `${b.drift}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OceanBackground;
