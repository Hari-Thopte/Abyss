import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store/appStore';

export const Submarine = React.memo(({ scrollProgress }) => {
  const groupRef = useRef();
  const { isEcoMode } = useAppStore();
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Floating motion
    groupRef.current.position.y = 1 - scrollProgress * 4 + Math.sin(time * 0.5) * 0.2;
    groupRef.current.position.x = Math.sin(time * 0.1) * 0.5;
    groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.03;
    groupRef.current.rotation.x = Math.sin(time * 0.08) * 0.02;
    
    // Gentle yaw
    groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.05;
    
    const targetScale = isEcoMode ? 0.35 : 0.45;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[2, 1, -3]} scale={0.45}>
      <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.15}>
        
        {/* ===== MAIN HULL ===== */}
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[1.2, 2.8, 16, 16]} />
          <meshStandardMaterial 
            color="#2a4a6a" 
            metalness={0.85} 
            roughness={0.2}
            emissive="#1a3a5a"
            emissiveIntensity={0.15}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* ===== NOSE CONE ===== */}
        <mesh position={[0, 0, 2.2]} castShadow>
          <sphereGeometry args={[1.1, 16, 16]} />
          <meshStandardMaterial 
            color="#3a5a7a" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#1a3a5a"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* ===== COCKPIT WINDOW ===== */}
        <mesh position={[0.8, 0.3, 1.8]} scale={[0.6, 0.4, 0.5]} castShadow>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshPhysicalMaterial 
            color="#4af0ff" 
            emissive="#00ccff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
            metalness={0.1}
            roughness={0.05}
            envMapIntensity={1.5}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* ===== COCKPIT FRAME ===== */}
        <mesh position={[0.8, 0.3, 1.8]} scale={[0.65, 0.45, 0.55]} castShadow>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshStandardMaterial 
            color="#1a2a3a" 
            metalness={0.9} 
            roughness={0.3}
            wireframe={true}
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* ===== REAR SECTION ===== */}
        <mesh position={[0, 0, -1.8]} castShadow>
          <coneGeometry args={[1.0, 1.2, 16]} />
          <meshStandardMaterial 
            color="#1a3a5a" 
            metalness={0.8} 
            roughness={0.3}
          />
        </mesh>

        {/* ===== PROPELLER HOUSING ===== */}
        <mesh position={[0, 0, -2.4]} castShadow>
          <cylinderGeometry args={[0.6, 0.8, 0.4, 12]} />
          <meshStandardMaterial 
            color="#4a5a6a" 
            metalness={0.7} 
            roughness={0.4}
          />
        </mesh>

        {/* ===== PROPELLER ===== */}
        <group position={[0, 0, -2.6]} rotation={[0, 0, 0]}>
          {[0, 120, 240].map((angle, i) => (
            <mesh key={i} rotation={[0, 0, angle * Math.PI / 180]} castShadow>
              <boxGeometry args={[0.05, 0.8, 0.3]} />
              <meshStandardMaterial 
                color="#8a9aad" 
                metalness={0.9} 
                roughness={0.2}
                emissive="#4a5a6a"
                emissiveIntensity={0.1}
              />
            </mesh>
          ))}
          <mesh castShadow>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="#6a7a8a" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* ===== UPPER FIN (Sail) ===== */}
        <mesh position={[0, 1.3, 0.3]} castShadow>
          <boxGeometry args={[0.1, 0.8, 1.0]} />
          <meshStandardMaterial 
            color="#2a4a6a" 
            metalness={0.7} 
            roughness={0.3}
          />
        </mesh>

        {/* ===== UPPER FIN TIP ===== */}
        <mesh position={[0, 1.8, 0.3]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial 
            color="#3a5a7a" 
            metalness={0.7} 
            roughness={0.3}
            emissive="#4af0ff"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* ===== SIDE FINS (Port & Starboard) ===== */}
        {[
          { x: -1.1, z: 0.2, rotZ: 0.3 },
          { x: 1.1, z: 0.2, rotZ: -0.3 }
        ].map((pos, i) => (
          <group key={i} position={[pos.x, 0, pos.z]} rotation={[0, 0, pos.rotZ]}>
            <mesh castShadow>
              <boxGeometry args={[0.05, 1.2, 0.6]} />
              <meshStandardMaterial 
                color="#2a4a6a" 
                metalness={0.7} 
                roughness={0.3}
              />
            </mesh>
            <mesh position={[0, 0.7, 0]} castShadow>
              <sphereGeometry args={[0.08, 6, 6]} />
              <meshStandardMaterial 
                color="#3a5a7a" 
                metalness={0.7} 
                roughness={0.3}
              />
            </mesh>
          </group>
        ))}

        {/* ===== BOTTOM FINS ===== */}
        {[-1, 1].map((dir) => (
          <mesh key={dir} position={[dir * 0.3, -1.2, 0.2]} rotation={[0.2, 0, 0]} castShadow>
            <boxGeometry args={[0.3, 0.05, 0.5]} />
            <meshStandardMaterial 
              color="#1a3a5a" 
              metalness={0.7} 
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* ===== HEADLIGHTS ===== */}
        {[
          { x: 0.7, y: -0.2, z: 2.0 },
          { x: -0.7, y: -0.2, z: 2.0 }
        ].map((pos, i) => (
          <group key={i} position={[pos.x, pos.y, pos.z]}>
            <mesh castShadow>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshStandardMaterial 
                color="#ffffaa" 
                emissive="#ffff88"
                emissiveIntensity={1.5}
                transparent
                opacity={0.9}
              />
            </mesh>
            <mesh position={[0, 0, 0.3]} castShadow>
              <sphereGeometry args={[0.3, 12, 12]} />
              <meshStandardMaterial 
                color="#ffff88" 
                emissive="#ffff44"
                emissiveIntensity={1.0}
                transparent
                opacity={0.15}
              />
            </mesh>
          </group>
        ))}

        {/* ===== SONAR DOME (Bottom) ===== */}
        <mesh position={[0, -0.8, 0.8]} castShadow>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshStandardMaterial 
            color="#4af0ff" 
            emissive="#00ccff"
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* ===== PERISCOPE / SENSOR MAST ===== */}
        <group position={[0.3, 1.5, -0.8]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.06, 0.6, 6]} />
            <meshStandardMaterial color="#4a5a6a" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.35, 0]} castShadow>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial 
              color="#4af0ff" 
              emissive="#00ccff"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>

        {/* ===== HULL DETAILS (Panels) ===== */}
        {[-0.8, -0.4, 0, 0.4, 0.8].map((z, i) => (
          <mesh key={i} position={[0, 0.1, z]} castShadow>
            <boxGeometry args={[0.8, 0.02, 0.05]} />
            <meshStandardMaterial 
              color="#3a5a7a" 
              metalness={0.6} 
              roughness={0.4}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}

        {/* ===== GLOW RING AROUND SUBMARINE ===== */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2.0, 32]} />
          <meshStandardMaterial 
            color="#4af0ff" 
            emissive="#00ccff"
            emissiveIntensity={0.1}
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* ===== BUBBLE TRAIL ===== */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[Math.sin(i * 0.5) * 0.1, -0.3 + i * 0.1, -3.0 - i * 0.3]} scale={0.05 + i * 0.01}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial 
              color="#4af0ff" 
              transparent 
              opacity={0.3 - i * 0.05}
              emissive="#00ccff"
              emissiveIntensity={0.1}
            />
          </mesh>
        ))}

        {/* ===== AMBIENT GLOW ===== */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2.5, 16, 16]} />
          <meshStandardMaterial 
            color="#4af0ff" 
            emissive="#0066ff"
            emissiveIntensity={0.05}
            transparent
            opacity={0.04}
            side={THREE.BackSide}
          />
        </mesh>

      </Float>
    </group>
  );
});