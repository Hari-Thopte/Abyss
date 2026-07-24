import React, { useState } from 'react';
import './AbyssSimulation.css';
import DayNightControls from '../UI/DayNightControls';
import { OceanScene } from '../3D/OceanScene';

const AbyssSimulation = ({ onExit }) => {
  const [depth, setDepth] = useState(5282);
  const [pressure, setPressure] = useState(528);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [posZ, setPosZ] = useState(0);
  const [isPinging, setIsPinging] = useState(false);
  const [targetFound, setTargetFound] = useState(false);
  const [targetData, setTargetData] = useState(null);
  const [dayTime, setDayTime] = useState(0.5);

  // Functional HUD states
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [viewMode, setViewMode] = useState('Chase View');
  const viewModes = ['Chase View', 'First Person', 'Top Down', 'Free Camera'];

  const cycleViewMode = () => {
    const currentIndex = viewModes.indexOf(viewMode);
    const nextIndex = (currentIndex + 1) % viewModes.length;
    setViewMode(viewModes[nextIndex]);
    console.log('View mode changed to:', viewModes[nextIndex]); // Debug
  };

  const toggleHeadlights = () => {
    setHeadlightsOn(!headlightsOn);
    console.log('Headlights toggled:', !headlightsOn); // Debug
  };

  // Joystick state...
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });

  const handleExit = () => {
    if (onExit) onExit();
  };

  const handleJoystickStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setJoystickActive(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (clientX !== undefined && clientY !== undefined) {
      const x = (clientX - centerX) / (rect.width / 2);
      const y = (clientY - centerY) / (rect.height / 2);
      setJoystickPos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    }
  };

  const handleJoystickMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!joystickActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (clientX !== undefined && clientY !== undefined) {
      const x = (clientX - centerX) / (rect.width / 2);
      const y = (clientY - centerY) / (rect.height / 2);
      setJoystickPos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    }
  };

  const handleJoystickEnd = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setJoystickActive(false);
    setJoystickPos({ x: 0, y: 0 });
  };

  const triggerSonarPing = () => {
    setIsPinging(true);
    setTargetFound(false);
    setTimeout(() => {
      const targets = [
        { name: '🦈 Megalodon Shark', depth: '4,200m', size: '18m', type: 'Predator' },
        { name: 'Ancient Submarine Wreck', depth: '4,800m', size: '45m', type: 'Structure' },
        { name: '✨ Bioluminescent Jellyfish', depth: '3,900m', size: '1.2m', type: 'Cnidarian' },
        { name: '🐙 Kraken Sighting', depth: '5,100m', size: '35m', type: 'Unknown' },
        { name: '🌊 Deep Sea Coral', depth: '4,500m', size: '3m', type: 'Coral' },
        { name: '🗑️ Plastic Debris Field', depth: '4,700m', size: '200m', type: 'Pollution' },
        { name: '🐋 Giant Squid', depth: '4,000m', size: '12m', type: 'Mollusk' },
        { name: '🌌 Abyssal Anglerfish', depth: '4,800m', size: '0.8m', type: 'Fish' },
      ];
      const randomTarget = targets[Math.floor(Math.random() * targets.length)];
      setTargetData(randomTarget);
      setTargetFound(true);
      setIsPinging(false);
    }, 1500);
  };

  return (
    <div className="abyss-simulation-container">
      <button className="exit-simulation" onClick={handleExit}>← BACK TO SURFACE</button>
      <div className="three-container">
        <OceanScene headlightsOn={headlightsOn} viewMode={viewMode} />
      </div>

      <DayNightControls onTimeChange={(time) => setDayTime(time)} />

      <div className="vignette" />
      <div className="scanline" />

      <div className="sonar-radar">
        <div className="sonar-ring"></div>
        <div className="sonar-ring"></div>
        <div className="sonar-ring"></div>
        <div className="sonar-dot"></div>
        <div className="sonar-line"></div>
        <div className="sonar-line" style={{ transform: 'rotate(45deg)' }}></div>
        <div className="sonar-line" style={{ transform: 'rotate(-45deg)' }}></div>
        <span className="sonar-label">GRID RANGE: 58m</span>
      </div>

      <header className="hud-top">
        <div className="hud-left glass-panel">
          <div className="status-dot">
            <span className="ping"></span>
            <span className="dot"></span>
          </div>
          <div>
            <h1 className="hud-title">ABYSS COMMAND v4.2</h1>
            <p className="hud-subtitle">AUTONOMOUS EXPLORATION VESSEL</p>
          </div>
        </div>
        <div className="hud-right">
          <div className="telemetry-item"><p className="telemetry-label">DEPTH</p><p className="telemetry-value cyan">{depth}m</p></div>
          <div className="telemetry-item"><p className="telemetry-label">PRESSURE</p><p className="telemetry-value emerald">{pressure} atm</p></div>
          <div className="telemetry-item"><p className="telemetry-label">INTEGRITY</p><p className="telemetry-value green">100%</p></div>
          <div className="telemetry-item"><p className="telemetry-label">TEMP</p><p className="telemetry-value blue">2.0°C</p></div>
        </div>
      </header>

      <div className="hud-middle">
        <div className="target-analyzer glass-panel-dark">
          <h2 className="target-title">🎯 TARGET ANALYZER</h2>
          <p className="target-text">Drive close to specimens or trigger a sonar ping to analyze target characteristics.</p>
          <button className={`sonar-ping-btn ${isPinging ? 'pinging' : ''}`} onClick={triggerSonarPing} disabled={isPinging}>
            {isPinging ? '📡 PINGING...' : '📡 TRIGGER SONAR PING'}
          </button>
          {targetFound && targetData && (
            <div className="target-result">
              <div className="target-result-header"><span className="target-found-icon">✅</span><span className="target-found-label">TARGET ACQUIRED</span></div>
              <div className="target-data">
                <div className="target-row"><span className="target-label">Name:</span><span className="target-value">{targetData.name}</span></div>
                <div className="target-row"><span className="target-label">Depth:</span><span className="target-value">{targetData.depth}</span></div>
                <div className="target-row"><span className="target-label">Size:</span><span className="target-value">{targetData.size}</span></div>
                <div className="target-row"><span className="target-label">Type:</span><span className="target-value">{targetData.type}</span></div>
              </div>
            </div>
          )}
          <div className="acoustics-status">
            <span className="acoustics-label">IMMERSIVE UNDERWATER ACOUSTICS</span>
            <span className="acoustics-dot"><span className="acoustics-ping"></span><span className="acoustics-dot-inner"></span></span>
            <span className="acoustics-active">ACTIVE</span>
          </div>
        </div>
      </div>

      <footer className="hud-bottom">
        <div className="nav-feedback glass-panel">
          <span className="nav-title">NAVIGATION SYSTEM FEEDBACK</span>
          <p className="nav-text">Sector: Abyssal Zone (Abyssopelagic). Near-freezing floor. Spotlights reveal ancient marine debris.</p>
          <div className="nav-coords">
            <span>X: <span className="coord-value">{posX.toFixed(1)}</span></span>
            <span>Y: <span className="coord-value">{posY.toFixed(1)}</span></span>
            <span>Z: <span className="coord-value">{posZ.toFixed(1)}</span></span>
          </div>
        </div>

        <div className="hud-controls">
          <div className="joystick-container glass-panel">
            <span className="joystick-label">🎮 STEER SUBMERSIBLE</span>
            <div className={`joystick-base ${joystickActive ? 'active' : ''}`}
              onMouseDown={handleJoystickStart}
              onMouseMove={handleJoystickMove}
              onMouseUp={handleJoystickEnd}
              onMouseLeave={handleJoystickEnd}
              onTouchStart={handleJoystickStart}
              onTouchMove={handleJoystickMove}
              onTouchEnd={handleJoystickEnd}
              onTouchCancel={handleJoystickEnd}
            >
              <div className="joystick-thumb" style={{ transform: `translate(${joystickPos.x * 35}px, ${joystickPos.y * 35}px)` }} />
            </div>
            <div className="joystick-arrows">
              <span className="arrow-up">▲</span>
              <span className="arrow-down">▼</span>
              <span className="arrow-left">◄</span>
              <span className="arrow-right">►</span>
            </div>
            <span className="joystick-hint">Click & Drag</span>
          </div>

          {/* Interactive Subsystems */}
          <div className="subsystems glass-panel">
            <span className="subsystems-label">SUBSYSTEMS</span>
            <span 
              className="subsystems-value" 
              onClick={toggleHeadlights} 
              style={{ cursor: 'pointer' }}
            >
              HEADLIGHT SPOTLIGHT <span className="cyan">{headlightsOn ? '1.5 lm' : 'OFF'}</span>
            </span>
          </div>

          {/* Interactive View Mode */}
          <div className="view-mode glass-panel">
            <span className="view-mode-label">ACTIVE VIEW MODE</span>
            <span 
              className="view-mode-value" 
              onClick={cycleViewMode} 
              style={{ cursor: 'pointer' }}
            >
              {viewMode}
            </span>
            <span className="view-mode-controls">DRIVE WITH WASD / JOYSTICK</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AbyssSimulation;