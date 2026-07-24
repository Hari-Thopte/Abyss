import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Shark = ({ scrollProgress }) => {
  const groupRef = useRef();
  const { scene, animations } = useGLTF('/models/ark_survival_evolved_megalodon_ocean_variant.glb');
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]]?.play();
    }
  }, [actions]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const radius = 8 + Math.sin(time * 0.05) * 2;
    const angle = time * 0.08;
    const targetX = Math.cos(angle) * radius;
    const targetZ = Math.sin(angle) * radius;
    const targetY = Math.sin(time * 0.15) * 1.5 + 1;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.02;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.02;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.02;
    const dx = targetX - groupRef.current.position.x;
    const dz = targetZ - groupRef.current.position.z;
    if (Math.abs(dx) > 0.01 || Math.abs(dz) > 0.01) {
      groupRef.current.rotation.y = Math.atan2(dx, dz);
    }
    groupRef.current.rotation.z = Math.sin(time * 0.2 + angle) * 0.03;
    const scale = 0.5 + scrollProgress * 0.05;
    groupRef.current.scale.set(scale, scale, scale);
  });

  const model = scene.clone();
  model.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.metalness = 0.4;
      child.material.roughness = 0.3;
      child.material.emissive = new THREE.Color(0x004488);
      child.material.emissiveIntensity = 0.1;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      <primitive object={model} scale={0.5} />
    </group>
  );
};

export default Shark;