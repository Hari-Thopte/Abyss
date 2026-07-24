import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store/appStore';
import { Submarine } from './Submarine';
import { TrashParticles } from './TrashParticles';
import Shark from './Shark';

// ===== DEPTH ENVIRONMENT =====
const DepthEnvironment = ({ scrollProgress }) => {
  const { scene } = useThree();
  
  useFrame(() => {
    const bgColor = new THREE.Color(0x0a2a4a).lerp(new THREE.Color(0x010510), scrollProgress);
    scene.background = bgColor;
    const fogDensity = 0.015 + scrollProgress * 0.03;
    scene.fog = new THREE.FogExp2(bgColor, fogDensity);

    const ambientLight = scene.children.find(child => child.isAmbientLight);
    if (ambientLight) ambientLight.intensity = 0.3 * (1 - scrollProgress * 0.8);

    const dirLight = scene.children.find(child => child.isDirectionalLight);
    if (dirLight) dirLight.intensity = 0.6 * (1 - scrollProgress * 0.7);
  });

  return null;
};

// ===== CAMERA CONTROLLER WITH SMOOTH TRANSITIONS =====
const CameraController = ({ viewMode }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 4, 12));
  const currentPosition = useRef(new THREE.Vector3(0, 4, 12));

  useEffect(() => {
    const positions = {
      'Chase View': new THREE.Vector3(0, 4, 12),
      'First Person': new THREE.Vector3(0, 1.5, 3),
      'Top Down': new THREE.Vector3(0, 15, 0.1),
      'Free Camera': new THREE.Vector3(8, 4, 8),
    };
    targetPosition.current.copy(positions[viewMode] || positions['Chase View']);
  }, [viewMode]);

  useFrame(() => {
    // Smoothly lerp camera position
    currentPosition.current.lerp(targetPosition.current, 0.05);
    camera.position.copy(currentPosition.current);
    // Look at center (or slightly ahead)
    const lookTarget = new THREE.Vector3(0, 0, -1);
    if (viewMode === 'Top Down') {
      lookTarget.set(0, 0, 0);
    } else if (viewMode === 'First Person') {
      lookTarget.set(0, 0, -5);
    }
    camera.lookAt(lookTarget);
  });

  return null;
};

// ===== OCEAN SURFACE =====
const OceanSurface = React.memo(({ scrollProgress }) => {
  const meshRef = useRef();
  const { clock } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 }
  }), []);

  useFrame(() => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uScroll.value = scrollProgress;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 6, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[40, 40, 128, 128]} />
      <shaderMaterial
        vertexShader={`
          uniform float uTime;
          uniform float uScroll;
          varying float vHeight;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float wave1 = sin(pos.x * 0.3 + uTime * 0.5) * 0.3;
            float wave2 = sin(pos.y * 0.2 + uTime * 0.3 + 1.0) * 0.2;
            float wave3 = sin((pos.x + pos.y) * 0.1 + uTime * 0.7) * 0.15;
            float height = wave1 + wave2 + wave3;
            pos.z += height * (1.0 - uScroll * 0.5);
            vHeight = height;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uScroll;
          uniform float uTime;
          varying float vHeight;
          varying vec2 vUv;
          void main() {
            float depth = 0.5 + vHeight * 0.3;
            vec3 deepColor = vec3(0.01, 0.02, 0.08);
            vec3 midColor = vec3(0.02, 0.08, 0.2);
            vec3 shallowColor = vec3(0.05, 0.3, 0.5);
            vec3 color = mix(shallowColor, midColor, uScroll);
            color = mix(color, deepColor, uScroll * 0.5);
            float glow = sin(uTime * 0.5 + vUv.x * 10.0 + vUv.y * 8.0) * 0.5 + 0.5;
            color += vec3(0.0, 0.2, 0.4) * glow * 0.2 * (1.0 - uScroll);
            float rays = sin(vUv.x * 20.0 + uTime * 0.1) * 0.5 + 0.5;
            color += vec3(0.1, 0.2, 0.3) * rays * 0.1 * (1.0 - uScroll);
            float foam = smoothstep(0.4, 0.6, vHeight);
            color += vec3(0.4, 0.6, 0.7) * foam * 0.2;
            gl_FragColor = vec4(color, 0.85);
          }
        `}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
});

// ===== HEADLIGHT VISUALIZATION (Cone) =====
const HeadlightCone = ({ on }) => {
  const groupRef = useRef();
  useFrame(() => {
    if (!groupRef.current) return;
    // Opacity pulsing or visibility
    groupRef.current.visible = on;
  });
  return (
    <group ref={groupRef} position={[0, -0.5, 3]}>
      <mesh rotation={[0, 0, 0]}>
        <coneGeometry args={[2, 8, 8, 1, true]} />
        <meshBasicMaterial 
          color="#ffff88" 
          transparent 
          opacity={0.08} 
          side={THREE.DoubleSide} 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// ===== MAIN OCEAN SCENE =====
export const OceanScene = ({ headlightsOn = true, viewMode = 'Chase View' }) => {
  const { scrollProgress, isEcoMode } = useAppStore();
  const bgColor = isEcoMode ? '#0a0505' : '#050a15';

  return (
    <Canvas 
      camera={{ position: [0, 5, 12], fov: 60 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ background: bgColor }}
    >
      {/* Lights */}
      <ambientLight intensity={0.3} color="#1a3a5c" />
      <directionalLight position={[5, 10, 5]} intensity={0.6} color="#4a8db7" />
      <pointLight position={[-5, 0, -5]} intensity={0.5} color="#00ffff" />
      <pointLight position={[0, 5, 5]} intensity={0.3} color="#4af0ff" />
      
      {/* Headlight point light */}
      <pointLight 
        position={[0, -0.5, 6]} 
        intensity={headlightsOn ? 3.0 : 0} 
        color="#ffffaa" 
        distance={25}
        decay={1.5}
      />
      <spotLight 
        position={[0, -0.5, 6]} 
        angle={0.6} 
        penumbra={0.5} 
        intensity={headlightsOn ? 1.5 : 0} 
        color="#ffff88" 
        distance={30}
      />
      {/* Visual cone */}
      <HeadlightCone on={headlightsOn} />

      <DepthEnvironment scrollProgress={scrollProgress} />
      <CameraController viewMode={viewMode} />

      <OceanSurface scrollProgress={scrollProgress} />
      <Submarine scrollProgress={scrollProgress} />
      <TrashParticles />

      <Suspense fallback={null}>
        <Shark scrollProgress={scrollProgress} />
      </Suspense>

      <Environment preset="night" />
    </Canvas>
  );
};