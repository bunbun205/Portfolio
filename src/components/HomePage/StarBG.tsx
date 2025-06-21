"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../utils/useTheme";

function ParticleSphere() {
  const theme = useTheme();
  const points = useRef<THREE.Points>(null);
  const color = theme === "dark" ? "#fefefe" : "#121212";
  const sprite = useMemo(() => new THREE.TextureLoader().load("/star.png"), []);

  const particleCount = 2000;
  const radius = 10.5;

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = radius * Math.cbrt(Math.random()); // uniform volume
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      arr.set([x, y, z], i * 3);
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((_, delta) => {
    if (points.current) {
	const speed = 0.005;
      points.current.rotation.y += speed * delta;
      points.current.rotation.x += speed * delta;
      points.current.rotation.z += speed * delta;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.1}
        sizeAttenuation
        map={sprite}
        alphaTest={0.5}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function StarrySphereBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
      }}
    >
      <ambientLight intensity={0.5} />
      <ParticleSphere />
    </Canvas>
  );
}
