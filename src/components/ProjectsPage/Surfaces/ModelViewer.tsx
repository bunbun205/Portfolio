import React, { Suspense, useEffect, useState, useMemo, type JSX } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {OrbitControls, TrackballControls} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

interface ModelViewerProps {
  filename: string;
}

const WORKER_URL = "https://portfolio-backend.mayank69123-5d3.workers.dev";
const API_KEY =
  "5fb10b5369a1a45689f95d6aa1fa97df8e5b59925101f93e6e4b790ec0c6782a";

export default function ModelViewer({ filename }: ModelViewerProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [showWireframe, setShowWireframe] = useState(false);
  const [showMatcap, setShowMatcap] = useState(false);
  const [selectedMatcapIndex, setSelectedMatcapIndex] = useState<number | null>(null);
  const [matcapDialogOpen, setMatcapDialogOpen] = useState(false);
  const [flatShading, setFlatShading] = useState(false);

  // Load matcaps dynamically
  const matcapModules = import.meta.glob("/src/matcaps/*.png", { eager: true });

  const matcapPaths = Object.values(matcapModules).map(
    (mod) => (mod as any).default.src
  );

  const matcapTextures = useLoader(THREE.TextureLoader, matcapPaths);

  useEffect(() => {
    if (matcapTextures && matcapTextures.length > 0) {
      console.log("✅ Matcap textures loaded:", matcapTextures);
    }
  }, [matcapTextures]);

  useEffect(() => {
    let isMounted = true;

    async function fetchModel() {
      try {
        const response = await fetch(
          `${WORKER_URL}/preview/models/${filename}`,
          {
            headers: { Authorization: `Bearer ${API_KEY}` },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch model: ${response.statusText}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        if (isMounted) {
          setBlobUrl(url);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchModel();

    return () => {
      isMounted = false;
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [filename]);

  if (!blobUrl || !matcapTextures || matcapTextures.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-200">
        Loading 3D model...
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-60% from-gray-400 via-75% via-gray-600 to-85% to-gray-500">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45, near: 0.01 }}
        shadows
        gl={{ alpha: true }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 10, 5]} rotation={[Math.PI/2, 0, 0]} intensity={3} castShadow={true} />

        <Suspense fallback={null}>
          <Model
            url={blobUrl}
            showWireframe={showWireframe}
            showMatcap={showMatcap}
            matcapTexture={
              selectedMatcapIndex !== null
                ? matcapTextures[selectedMatcapIndex]
                : undefined
            }
            flatShading={flatShading}
          />
        </Suspense>

        <TrackballControls />
      </Canvas>

      {/* Overlay controls */}
      <div className="absolute top-2 left-2 bg-light-background/80 dark:bg-dark-background/80 text-light-text dark:text-dark-text p-2 rounded shadow flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={flatShading}
            onChange={() => setFlatShading((prev) => !prev)}
          />
          Flat Shading
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={showWireframe}
            onChange={() => setShowWireframe((prev) => !prev)}
          />
          Wireframe
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={showMatcap}
            onChange={() => setShowMatcap((prev) => !prev)}
          />
          Matcap
        </label>

        {showMatcap && (
          <div className="relative">
            <button
              className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-900"
              onClick={() => setMatcapDialogOpen((prev) => !prev)}
            >
              {selectedMatcapIndex !== null ? "Change Matcap" : "Choose Matcap"}
            </button>

            {matcapDialogOpen && (
              <div className="absolute top-full mt-2 bg-light-background dark:bg-dark-background border border-gray-300 dark:border-gray-700 shadow-lg p-2 grid grid-cols-9 gap-2 z-50 w-2xl max-h-96 overflow-auto">
                {matcapPaths.map((path, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedMatcapIndex(i);
                      setMatcapDialogOpen(false);
                    }}
                    className={`focus:outline-none border ${
                      selectedMatcapIndex === i
                        ? "border-blue-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <img
                      src={path}
                      alt={`Matcap ${i}`}
                      className="w-16 h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface ModelProps {
  url: string;
  showWireframe: boolean;
  showMatcap: boolean;
  matcapTexture?: THREE.Texture;
  flatShading: boolean;
}

function Model({
  url,
  showWireframe,
  showMatcap,
  matcapTexture,
  flatShading,
}: ModelProps) {
  const gltf = useLoader(GLTFLoader, url);

  const clonedScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  const meshes: JSX.Element[] = [];

  clonedScene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;

      const geometry = mesh.geometry.clone();

      let baseMaterial: THREE.Material;

      if (showMatcap && matcapTexture) {
        baseMaterial = new THREE.MeshMatcapMaterial({
          matcap: matcapTexture,
          flatShading: flatShading,
        });
      } else {
        const original = gltf.scene.getObjectByName(mesh.name);
        if (original && (original as THREE.Mesh).isMesh) {
          const origMat = (original as THREE.Mesh).material as THREE.Material;
          baseMaterial = origMat.clone();
          if ("flatShading" in baseMaterial) {
            (baseMaterial as any).flatShading = flatShading;
          }
        } else {
          baseMaterial = new THREE.MeshStandardMaterial({
            color: "#999999",
            flatShading: flatShading,
          });
        }
      }

      meshes.push(
        <mesh
          key={`${mesh.name}-base`}
          geometry={geometry}
          material={baseMaterial}
        />
      );

      if (showWireframe) {
        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: "#00bbff",
          wireframe: true,
          depthTest: true,
        });

        meshes.push(
          <mesh
            key={`${mesh.name}-wire`}
            geometry={geometry}
            material={wireframeMaterial}
          />
        );
      }
    }
  });

  return <group>{meshes}</group>;
}
