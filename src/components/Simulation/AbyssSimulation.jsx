import React, { useState, useEffect, useRef } from 'react';
import './AbyssSimulation.css';
import DayNightControls from '../UI/DayNightControls';
import * as THREE from 'three';

const AbyssSimulation = ({ onExit }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const submarineRef = useRef(null);
  const headlightRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const oceanRef = useRef(null);
  
  // Telemetry state
  const [depth, setDepth] = useState(5282);
  const [pressure, setPressure] = useState(528);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [posZ, setPosZ] = useState(0);
  const [integrity, setIntegrity] = useState(100);
  const [temperature, setTemperature] = useState(2.0);
  
  const [isPinging, setIsPinging] = useState(false);
  const [targetFound, setTargetFound] = useState(false);
  const [targetData, setTargetData] = useState(null);
  const [dayTime, setDayTime] = useState(0.5);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [viewMode, setViewMode] = useState('Chase View');
  const viewModes = ['Chase View', 'First Person', 'Top Down', 'Free Camera'];
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });

  const handleExit = () => {
    if (onExit) onExit();
  };

  const cycleViewMode = () => {
    const currentIndex = viewModes.indexOf(viewMode);
    const nextIndex = (currentIndex + 1) % viewModes.length;
    setViewMode(viewModes[nextIndex]);
    console.log('📷 View mode changed to:', viewModes[nextIndex]);
  };

  const toggleHeadlights = () => {
    setHeadlightsOn(!headlightsOn);
    console.log('💡 Headlights:', !headlightsOn ? 'ON' : 'OFF');
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

  // ===== THREE.JS SCENE SETUP =====
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050a15);
    scene.fog = new THREE.FogExp2(0x050a15, 0.015);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, -3);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ===== LIGHTS =====
    const ambientLight = new THREE.AmbientLight(0x1a3a5c, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0x4a8db7, 0.8);
    sunLight.position.set(5, 10, 5);
    scene.add(sunLight);

    const pointLight = new THREE.PointLight(0x00ffff, 0.5, 30);
    pointLight.position.set(-5, 0, -5);
    scene.add(pointLight);

    // Headlight
    const headlight = new THREE.PointLight(0xffffaa, 2, 20);
    headlight.position.set(0, -0.5, 6);
    scene.add(headlight);
    headlightRef.current = headlight;

    // ===== OCEAN SURFACE =====
    const oceanGeo = new THREE.PlaneGeometry(40, 40, 64, 64);
    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x0a2a5a,
      transparent: true,
      opacity: 0.6,
      metalness: 0.1,
      roughness: 0.3,
      side: THREE.DoubleSide,
    });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.rotation.x = -Math.PI / 6;
    ocean.position.y = -1;
    scene.add(ocean);
    oceanRef.current = ocean;

    // ===== SUBMARINE =====
    const submarine = new THREE.Group();
    submarine.position.set(0, 1, -3);
    submarine.scale.set(0.8, 0.8, 0.8);
    submarineRef.current = submarine;

    // Body
    const bodyGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x2a6a8a,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x1a3a5a,
      emissiveIntensity: 0.2,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.scale.set(1, 0.8, 1.5);
    submarine.add(body);

    // Cockpit
    const cockpitGeo = new THREE.SphereGeometry(0.6, 16, 16);
    const cockpitMat = new THREE.MeshPhysicalMaterial({
      color: 0x4af0ff,
      emissive: 0x00ccff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.6,
      metalness: 0.1,
      roughness: 0.05,
    });
    const cockpit = new THREE.Mesh(cockpitGeo, cockpitMat);
    cockpit.position.set(1.0, 0.2, 0.5);
    cockpit.scale.set(0.8, 0.6, 0.6);
    submarine.add(cockpit);

    // Headlights
    const hlMat = new THREE.MeshStandardMaterial({
      color: 0xffffaa,
      emissive: 0xffff88,
      emissiveIntensity: 2,
    });
    const hlGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const hl1 = new THREE.Mesh(hlGeo, hlMat);
    hl1.position.set(1.6, -0.2, 0.6);
    submarine.add(hl1);
    const hl2 = new THREE.Mesh(hlGeo, hlMat);
    hl2.position.set(1.6, -0.2, -0.6);
    submarine.add(hl2);

    scene.add(submarine);

    // ===== PARTICLES =====
    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 40;
      particlePos[i + 1] = (Math.random() - 0.5) * 20 + 2;
      particlePos[i + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x4af0ff,
      size: 0.08,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ===== ANIMATION LOOP =====
    let animationId;
    let subPosX = 0, subPosZ = 0;
    let targetCamPos = new THREE.Vector3(0, 5, 12);
    let currentCamPos = new THREE.Vector3(0, 5, 12);
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      
      // ===== DAY/NIGHT BACKGROUND COLOR =====
      // Get color based on dayTime (0-1 range)
      const dayColors = [
        new THREE.Color(0x0a0a1a),  // 0.0 - Midnight (dark blue-black)
        new THREE.Color(0x1a1a3a),  // 0.1 - Deep night
        new THREE.Color(0x2a1a2a),  // 0.2 - Pre-dawn
        new THREE.Color(0x4a2a1a),  // 0.3 - Sunrise (orange)
        new THREE.Color(0x4a6a8a),  // 0.4 - Morning (light blue)
        new THREE.Color(0x4a8ab0),  // 0.5 - Day (bright blue)
        new THREE.Color(0x4a8ab0),  // 0.6 - Afternoon
        new THREE.Color(0x6a4a2a),  // 0.7 - Sunset (orange-gold)
        new THREE.Color(0x2a1a2a),  // 0.8 - Dusk
        new THREE.Color(0x0a0a1a),  // 0.9 - Night
        new THREE.Color(0x0a0a1a),  // 1.0 - Midnight
      ];
      
      // Calculate which two colors to interpolate between
      const numColors = dayColors.length - 1;
      const index = dayTime * numColors;
      const i1 = Math.floor(index);
      const i2 = Math.min(i1 + 1, numColors);
      const t = index - i1;
      
      // Interpolate between the two colors
      const bgColor = dayColors[i1].clone().lerp(dayColors[i2], t);
      scene.background = bgColor;
      
      // Also update fog color to match
      scene.fog.color.copy(bgColor);
      
      // Update ambient light based on dayTime
      let ambientIntensity = 0.5;
      if (dayTime < 0.2 || dayTime > 0.8) {
        ambientIntensity = 0.05; // Night
      } else if (dayTime >= 0.2 && dayTime < 0.35) {
        ambientIntensity = 0.05 + ((dayTime - 0.2) / 0.15) * 0.45; // Sunrise transition
      } else if (dayTime >= 0.65 && dayTime < 0.8) {
        ambientIntensity = 0.5 - ((dayTime - 0.65) / 0.15) * 0.45; // Sunset transition
      }
      ambientLight.intensity = ambientIntensity;
      
      // Update sun light position and intensity
      const sunAngle = dayTime * Math.PI * 2;
      const sunRadius = 30;
      const sunHeight = 15;
      sunLight.position.set(
        Math.cos(sunAngle) * sunRadius,
        Math.sin(sunAngle) * sunHeight + 5,
        Math.sin(sunAngle) * sunRadius
      );
      
      let sunIntensity = 0.8;
      if (dayTime < 0.2 || dayTime > 0.8) {
        sunIntensity = 0.05; // Night
      } else if (dayTime >= 0.2 && dayTime < 0.35) {
        sunIntensity = 0.05 + ((dayTime - 0.2) / 0.15) * 0.75;
      } else if (dayTime >= 0.65 && dayTime < 0.8) {
        sunIntensity = 0.8 - ((dayTime - 0.65) / 0.15) * 0.75;
      }
      sunLight.intensity = sunIntensity;
      
      // Sun color changes during sunrise/sunset
      if (dayTime >= 0.2 && dayTime < 0.4) {
        const t2 = (dayTime - 0.2) / 0.2;
        sunLight.color.setHSL(0.08 + t2 * 0.5, 0.8, 0.3 + t2 * 0.3);
      } else if (dayTime >= 0.6 && dayTime < 0.8) {
        const t2 = (dayTime - 0.6) / 0.2;
        sunLight.color.setHSL(0.08 + (1 - t2) * 0.5, 0.8, 0.6 - t2 * 0.3);
      } else {
        sunLight.color.setHSL(0.58, 0.6, 0.6);
      }
      
      // Animate ocean
      const positions = ocean.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.3 + time * 0.5) * 0.2 + Math.sin(y * 0.2 + time * 0.3) * 0.2;
      }
      ocean.geometry.attributes.position.needsUpdate = true;

      // Move submarine with joystick
      const speed = 0.02;
      if (joystickPos.x !== 0 || joystickPos.y !== 0) {
        subPosX += joystickPos.x * speed;
        subPosZ += joystickPos.y * speed;
      }
      
      subPosX = Math.max(-8, Math.min(8, subPosX));
      subPosZ = Math.max(-8, Math.min(8, subPosZ));
      
      submarine.position.x = subPosX;
      submarine.position.z = subPosZ;
      submarine.position.y = 1 + Math.sin(time * 0.5) * 0.2;
      submarine.rotation.y = Math.sin(time * 0.1) * 0.05 + joystickPos.x * 0.1;

      // Update position state
      setPosX(subPosX);
      setPosY(submarine.position.y);
      setPosZ(subPosZ);

      // ===== HEADLIGHT CONTROL =====
      if (headlightRef.current) {
        headlightRef.current.intensity = headlightsOn ? 2.0 : 0;
        hl1.material.emissiveIntensity = headlightsOn ? 2 : 0;
        hl2.material.emissiveIntensity = headlightsOn ? 2 : 0;
      }

      // ===== VIEW MODE CONTROL =====
      const subPos = submarine.position;
      let targetX = 0, targetY = 0, targetZ = 0;
      
      switch(viewMode) {
        case 'Chase View':
          targetX = subPosX * 0.5;
          targetY = 5;
          targetZ = 12 + subPosZ * 0.3;
          break;
        case 'First Person':
          targetX = subPosX;
          targetY = 1.5;
          targetZ = subPosZ + 3;
          break;
        case 'Top Down':
          targetX = subPosX;
          targetY = 15;
          targetZ = subPosZ + 1;
          break;
        case 'Free Camera':
          targetX = subPosX + 8;
          targetY = 4;
          targetZ = subPosZ + 8;
          break;
        default:
          targetX = subPosX * 0.5;
          targetY = 5;
          targetZ = 12 + subPosZ * 0.3;
      }
      
      currentCamPos.x += (targetX - currentCamPos.x) * 0.05;
      currentCamPos.y += (targetY - currentCamPos.y) * 0.05;
      currentCamPos.z += (targetZ - currentCamPos.z) * 0.05;
      
      camera.position.copy(currentCamPos);
      camera.lookAt(subPosX, 0, subPosZ - 3);

      // Update telemetry
      const newDepth = 5282 + Math.sin(time * 0.2) * 15 + subPosZ * 2;
      setDepth(Math.round(newDepth));
      setPressure(Math.round(newDepth / 10));
      setIntegrity(Math.round(100 - Math.sin(time * 0.1) * 0.5));
      setTemperature((2.0 + Math.sin(time * 0.3) * 0.2).toFixed(1));

      renderer.render(scene, camera);
    };
    animate();

    // ===== RESIZE =====
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ===== CLEANUP =====
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [joystickPos, headlightsOn, viewMode, dayTime]);

  return (
    <div className="abyss-simulation-container">
      {/* Exit Button */}
      <button className="exit-simulation" onClick={handleExit}>
        ← BACK TO SURFACE
      </button>

      {/* 3D Scene Container */}
      <div ref={containerRef} className="three-container" />

      {/* Day/Night Controls */}
      <DayNightControls onTimeChange={(time) => setDayTime(time)} />

      {/* Vignette & Scanline */}
      <div className="vignette" />
      <div className="scanline" />

      {/* Sonar Radar */}
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

      {/* Top HUD */}
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
          <div className="telemetry-item">
            <p className="telemetry-label">DEPTH</p>
            <p className="telemetry-value cyan">{depth}m</p>
          </div>
          <div className="telemetry-item">
            <p className="telemetry-label">PRESSURE</p>
            <p className="telemetry-value emerald">{pressure} atm</p>
          </div>
          <div className="telemetry-item">
            <p className="telemetry-label">INTEGRITY</p>
            <p className="telemetry-value green">{integrity}%</p>
          </div>
          <div className="telemetry-item">
            <p className="telemetry-label">TEMP</p>
            <p className="telemetry-value blue">{temperature}°C</p>
          </div>
        </div>
      </header>

      {/* Middle HUD - TARGET ANALYZER */}
      <div className="hud-middle">
        <div className="target-analyzer glass-panel-dark">
          <h2 className="target-title">🎯 TARGET ANALYZER</h2>
          <p className="target-text">
            Drive close to specimens or trigger a sonar ping to analyze target characteristics.
          </p>
          <button
            className={`sonar-ping-btn ${isPinging ? 'pinging' : ''}`}
            onClick={triggerSonarPing}
            disabled={isPinging}
          >
            {isPinging ? '📡 PINGING...' : '📡 TRIGGER SONAR PING'}
          </button>
          {targetFound && targetData && (
            <div className="target-result">
              <div className="target-result-header">
                <span className="target-found-icon">✅</span>
                <span className="target-found-label">TARGET ACQUIRED</span>
              </div>
              <div className="target-data">
                <div className="target-row">
                  <span className="target-label">Name:</span>
                  <span className="target-value">{targetData.name}</span>
                </div>
                <div className="target-row">
                  <span className="target-label">Depth:</span>
                  <span className="target-value">{targetData.depth}</span>
                </div>
                <div className="target-row">
                  <span className="target-label">Size:</span>
                  <span className="target-value">{targetData.size}</span>
                </div>
                <div className="target-row">
                  <span className="target-label">Type:</span>
                  <span className="target-value">{targetData.type}</span>
                </div>
              </div>
            </div>
          )}
          <div className="acoustics-status">
            <span className="acoustics-label">IMMERSIVE UNDERWATER ACOUSTICS</span>
            <span className="acoustics-dot">
              <span className="acoustics-ping"></span>
              <span className="acoustics-dot-inner"></span>
            </span>
            <span className="acoustics-active">ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
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
          {/* STEER SUBMERSIBLE - Joystick */}
          <div className="joystick-container glass-panel">
            <span className="joystick-label">🎮 STEER SUBMERSIBLE</span>
            <div
              className={`joystick-base ${joystickActive ? 'active' : ''}`}
              onMouseDown={handleJoystickStart}
              onMouseMove={handleJoystickMove}
              onMouseUp={handleJoystickEnd}
              onMouseLeave={handleJoystickEnd}
              onTouchStart={handleJoystickStart}
              onTouchMove={handleJoystickMove}
              onTouchEnd={handleJoystickEnd}
              onTouchCancel={handleJoystickEnd}
            >
              <div
                className="joystick-thumb"
                style={{
                  transform: `translate(${joystickPos.x * 35}px, ${joystickPos.y * 35}px)`
                }}
              />
            </div>
            <div className="joystick-arrows">
              <span className="arrow-up">▲</span>
              <span className="arrow-down">▼</span>
              <span className="arrow-left">◄</span>
              <span className="arrow-right">►</span>
            </div>
            <span className="joystick-hint">Click & Drag</span>
          </div>

          {/* Subsystems - Interactive Headlights */}
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

          {/* View Mode - Interactive */}
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
