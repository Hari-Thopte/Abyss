import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MouseRipples = ({ isActive = true }) => {
  const { camera } = useThree();
  const [ripples, setRipples] = useState([]);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0, z: 0 });

  const createRipple = (x, y, z) => {
    const geometry = new THREE.RingGeometry(0.05, 0.1, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x4af0ff,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.x = -Math.PI / 2;
    mesh.userData = {
      life: 0,
      maxLife: 2.5,
      maxScale: 3 + Math.random() * 3,
      speed: 0.8 + Math.random() * 0.4,
    };
    return mesh;
  };

  const getMouse3DPosition = (clientX, clientY) => {
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    
    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.y / dir.y;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    return pos;
  };

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e) => {
      const pos = getMouse3DPosition(e.clientX, e.clientY);
      lastMousePos.current = { x: pos.x, y: 0.05, z: pos.z };
      
      if (isDragging.current && Math.random() > 0.7) {
        const newRipple = createRipple(
          pos.x + (Math.random() - 0.5) * 0.5,
          0.05,
          pos.z + (Math.random() - 0.5) * 0.5
        );
        setRipples(prev => [...prev, newRipple]);
      }
    };

    const handleMouseDown = (e) => {
      isDragging.current = true;
      const pos = getMouse3DPosition(e.clientX, e.clientY);
      
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + Math.random() * 0.5;
        const offset = 0.3 + Math.random() * 0.8;
        const newRipple = createRipple(
          pos.x + Math.cos(angle) * offset,
          0.05,
          pos.z + Math.sin(angle) * offset
        );
        setRipples(prev => [...prev, newRipple]);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [camera, isActive]);

  useFrame((state, delta) => {
    const toRemove = [];
    
    ripples.forEach((ripple, index) => {
      const data = ripple.userData;
      data.life += delta;
      
      const progress = data.life / data.maxLife;
      const scale = 0.5 + progress * data.maxScale;
      ripple.scale.set(scale, scale, scale);
      ripple.material.opacity = Math.max(0, 0.8 * (1 - progress));
      
      const hue = 0.5 + progress * 0.2;
      ripple.material.color.setHSL(hue % 1, 0.8, 0.5);
      
      ripple.position.x += Math.sin(data.life * 0.5 + index) * 0.002;
      ripple.position.z += Math.cos(data.life * 0.3 + index * 2) * 0.002;
      
      if (data.life >= data.maxLife) {
        toRemove.push(index);
      }
    });
    
    if (toRemove.length > 0) {
      const newRipples = ripples.filter((_, i) => !toRemove.includes(i));
      toRemove.forEach(index => {
        const ripple = ripples[index];
        if (ripple) {
          ripple.geometry.dispose();
          ripple.material.dispose();
        }
      });
      setRipples(newRipples);
    }
  });

  return <group>{ripples.map((ripple, i) => (
    <primitive key={i} object={ripple} />
  ))}</group>;
};

export default MouseRipples;