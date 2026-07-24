import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/appStore';

export const TrashParticles = React.memo(() => {
  const meshRef = useRef();
  const { isEcoMode, scrollProgress } = useAppStore();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5 + 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const palette = ['#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return col;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const visibility = isEcoMode ? 1 : Math.min(scrollProgress * 1.5, 1);
    meshRef.current.material.opacity += (visibility - meshRef.current.material.opacity) * 0.08;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={meshRef}>
      <bufferGeometry {...geometry} />
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
});