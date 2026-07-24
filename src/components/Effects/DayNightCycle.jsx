import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const DayNightCycle = ({ speed = 0.02, initialTime = 0.5 }) => {
  const { scene } = useThree();
  const [timeOfDay, setTimeOfDay] = useState(initialTime);
  const sunRef = useRef();
  const moonRef = useRef();
  const starsRef = useRef();
  const glowRef = useRef();

  // Create stars
  const { starGeometry, starMaterial } = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const radius = 200 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = Math.abs(radius * Math.cos(phi));
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      sizes[i] = 0.3 + Math.random() * 1;
      
      const brightness = 0.5 + Math.random() * 0.5;
      colors[i * 3] = brightness;
      colors[i * 3 + 1] = brightness * (0.8 + Math.random() * 0.2);
      colors[i * 3 + 2] = brightness;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    
    return { starGeometry: geometry, starMaterial: material };
  }, []);

  // Create sun
  const sunMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xffaa44,
      transparent: true,
      opacity: 1,
    });
  }, []);

  // Create sun glow
  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xff8844,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });
  }, []);

  // Create moon
  const moonMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xeeeeff,
      transparent: true,
      opacity: 0,
    });
  }, []);

  // Update lighting based on time
  useEffect(() => {
    const angle = timeOfDay * Math.PI * 2;
    const radius = 50;
    const height = 30;
    
    // Sun position
    const sunX = Math.cos(angle) * radius;
    const sunY = Math.sin(angle) * height + 5;
    const sunZ = Math.sin(angle) * radius;
    
    if (sunRef.current) {
      sunRef.current.position.set(sunX, sunY, sunZ);
    }
    if (glowRef.current) {
      glowRef.current.position.set(sunX, sunY, sunZ);
    }
    
    // Moon position (opposite of sun)
    const moonX = Math.cos(angle + Math.PI) * radius;
    const moonY = Math.sin(angle + Math.PI) * height + 5;
    const moonZ = Math.sin(angle + Math.PI) * radius;
    
    if (moonRef.current) {
      moonRef.current.position.set(moonX, moonY, moonZ);
    }
    
    // Update scene background color
    const dayColor = new THREE.Color(0x4a90d9);
    const sunsetColor = new THREE.Color(0xcc6633);
    const nightColor = new THREE.Color(0x0a0a1a);
    
    let bgColor;
    let ambientIntensity;
    let sunOpacity;
    let moonOpacity;
    let starOpacity;
    let glowOpacity;
    
    // Calculate time phases
    const sunriseStart = 0.2;
    const sunriseEnd = 0.35;
    const sunsetStart = 0.65;
    const sunsetEnd = 0.8;
    
    if (timeOfDay >= sunriseStart && timeOfDay < sunriseEnd) {
      // Sunrise
      const t = (timeOfDay - sunriseStart) / (sunriseEnd - sunriseStart);
      bgColor = dayColor.clone().lerp(sunsetColor, 1 - t);
      ambientIntensity = 0.1 + t * 0.4;
      sunOpacity = 0.2 + t * 0.8;
      moonOpacity = 1 - t;
      starOpacity = 1 - t;
      glowOpacity = 0.1 + t * 0.3;
    } else if (timeOfDay >= sunriseEnd && timeOfDay < sunsetStart) {
      // Day
      bgColor = dayColor.clone();
      ambientIntensity = 0.5;
      sunOpacity = 1;
      moonOpacity = 0;
      starOpacity = 0;
      glowOpacity = 0.3;
    } else if (timeOfDay >= sunsetStart && timeOfDay < sunsetEnd) {
      // Sunset
      const t = (timeOfDay - sunsetStart) / (sunsetEnd - sunsetStart);
      bgColor = dayColor.clone().lerp(sunsetColor, t);
      ambientIntensity = 0.5 - t * 0.4;
      sunOpacity = 1 - t * 0.8;
      moonOpacity = t;
      starOpacity = t;
      glowOpacity = 0.3 - t * 0.2;
    } else {
      // Night
      bgColor = nightColor.clone();
      ambientIntensity = 0.05;
      sunOpacity = 0;
      moonOpacity = 1;
      starOpacity = 1;
      glowOpacity = 0;
    }
    
    // Apply to scene
    scene.background = bgColor;
    
    // Update sun and moon
    if (sunRef.current) {
      sunRef.current.material.opacity = sunOpacity;
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = glowOpacity;
    }
    if (moonRef.current) {
      moonRef.current.material.opacity = moonOpacity;
    }
    if (starsRef.current) {
      starsRef.current.material.opacity = starOpacity;
    }
    
    // Update ambient light
    const ambientLight = scene.children.find(
      child => child.isAmbientLight
    );
    if (ambientLight) {
      ambientLight.intensity = ambientIntensity;
    }
    
    // Update directional light (sun)
    const sunLight = scene.children.find(
      child => child.isDirectionalLight && child.name === 'sunLight'
    );
    if (sunLight) {
      sunLight.position.set(sunX, sunY, sunZ);
      sunLight.intensity = 0.3 + sunOpacity * 0.8;
    }
    
    // Update moon light
    const moonLight = scene.children.find(
      child => child.isDirectionalLight && child.name === 'moonLight'
    );
    if (moonLight) {
      moonLight.position.set(moonX, moonY, moonZ);
      moonLight.intensity = 0.1 * moonOpacity;
    }
  }, [timeOfDay, scene]);

  // Animation loop
  useFrame(() => {
    setTimeOfDay(prev => {
      let newTime = prev + speed * 0.001;
      if (newTime > 1) newTime -= 1;
      return newTime;
    });
  });

  return (
    <group>
      {/* Sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[4, 32, 32]} />
        <primitive object={sunMaterial} />
      </mesh>
      
      {/* Sun Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[8, 32, 32]} />
        <primitive object={glowMaterial} />
      </mesh>
      
      {/* Moon */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[3, 32, 32]} />
        <primitive object={moonMaterial} />
      </mesh>
      
      {/* Stars */}
      <points ref={starsRef} geometry={starGeometry} material={starMaterial} />
    </group>
  );
};

export default DayNightCycle;