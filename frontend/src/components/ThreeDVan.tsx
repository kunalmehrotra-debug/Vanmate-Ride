"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

function VanMesh() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* A simple placeholder geometry representing a van */}
      <boxGeometry args={[3, 1.5, 1.5]} />
      <meshStandardMaterial color="#facc15" roughness={0.3} metalness={0.8} />
      
      {/* Wheels */}
      <mesh position={[-1, -0.75, 0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[1, -0.75, 0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-1, -0.75, -0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[1, -0.75, -0.8]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </mesh>
  );
}

export default function ThreeDVan() {
  return (
    <div className="h-[400px] w-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [5, 3, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />
        <VanMesh />
      </Canvas>
    </div>
  );
}
