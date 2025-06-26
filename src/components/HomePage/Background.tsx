import { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../utils/useTheme";
import { Environment } from "@react-three/drei";
import hdr from "/animestyled_hdr.hdr?url"
import galaxy from "/7025981.jpg?url"
import { RGBELoader } from "three/examples/jsm/Addons.js";

function BackgroundImage() {
  return (
    <mesh position={[0, 0, -20]}>
      <planeGeometry args={[100, 50]} />
      <meshBasicMaterial map={new THREE.TextureLoader().load(galaxy)} />
    </mesh>
  );
}

function ParticleSphere() {
  const points = useRef<THREE.Points>(null);
  const sprite = useMemo(() => new THREE.TextureLoader().load("/star.png"), []);

  const particleCount = 2000;
  const radius = 10.5;

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = radius * Math.cbrt(Math.random());
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
        color={"#ffffff"}
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

function RotatingBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(RGBELoader, hdr);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.01 * delta; // Slowly rotate
    }
  });

  return (
    <mesh ref={meshRef} scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function StarrySphereBackground() {
  const theme = useTheme();

  // Render only in dark mode
  if (theme === "light") return (
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
      <RotatingBackground />
    </Canvas>
  );

  if (theme === "dark") return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${galaxy})`
      }}
      camera={{ position: [0, 0, 10], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <ParticleSphere />
      <BackgroundImage />
    </Canvas>
  );
}
