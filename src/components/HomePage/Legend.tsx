import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader, DRACOLoader } from 'three-stdlib';

function Platform() {
    const platformRef = useRef<THREE.Group>(null);
    const rotationRef = useRef(0);
    const targetRotation = useRef(0);

    // 🔑 Setup GLTFLoader with DRACOLoader
    const gltf = useLoader(GLTFLoader, '/platform.glb', (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        loader.setDRACOLoader(dracoLoader);
    });

    const obj = gltf.scene;
    const { camera } = useThree();

    // ✅ enable castShadow on all meshes
    useEffect(() => {
        obj.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).castShadow = true;
                (child as THREE.Mesh).receiveShadow = true;
            }
        });
    }, [obj]);

    const links: Record<string, string> = {
        ProjectsSign: '/projects',
        AboutSign: '/about',
        BlogSign: '/blog',
        ContactSign: '/contact',
    };

    // 🔍 Raycaster setup
    const raycaster = useRef(new THREE.Raycaster());
    const pointer = useRef(new THREE.Vector2());

    useEffect(() => {
        const handlePointerMove = (event: MouseEvent) => {
            pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.current.setFromCamera(pointer.current, camera);
            const intersects = raycaster.current.intersectObjects(obj.children, true);

            const hit = intersects.find((i) => links[i.object.name]);
            document.body.style.cursor = hit ? 'pointer' : 'default';
        };

        const handleClick = (event: MouseEvent) => {
            pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.current.setFromCamera(pointer.current, camera);
            const intersects = raycaster.current.intersectObjects(obj.children, true);

            const hit = intersects.find((i) => links[i.object.name]);
            if (hit) {
                window.location.href = links[hit.object.name];
            }
        };

        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('click', handleClick);
        };
    }, [camera, obj, links]);

    // 🖱️ Scroll Rotation
    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            targetRotation.current -= e.deltaY * 0.001;
        };
        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, []);

    // 📱 Touch Rotation
    useEffect(() => {
        let touchStartX: number | null = null;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
        };
        const handleTouchMove = (e: TouchEvent) => {
            if (touchStartX === null) return;
            const touchX = e.touches[0].clientX;
            const deltaX = touchX - touchStartX;
            targetRotation.current += deltaX * 0.005;
            touchStartX = touchX;
        };
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    // 🎥 Animate rotation
    useFrame(() => {
        rotationRef.current += (targetRotation.current - rotationRef.current) * 0.1;
        if (platformRef.current) {
            platformRef.current.rotation.y = rotationRef.current;
        }
    });

    return (
        <group ref={platformRef} position={[0, -1.2, 0]} scale={[0.6, 0.6, 0.6]}>
            <group rotation={[0, Math.PI / 4, 0]}>
                <primitive object={obj} />
            </group>
        </group>
    );
}

export default function Legend3D() {
    const [cameraConfig, setCameraConfig] = useState({
        position: new THREE.Vector3(0, 2, 10),
        fov: 50,
    });

    useEffect(() => {
        const updateCamera = () => {
            if (window.innerWidth < 768) {
                setCameraConfig({
                    position: new THREE.Vector3(0, 1.5, 8),
                    fov: 90,
                });
            } else {
                setCameraConfig({
                    position: new THREE.Vector3(0, 2, 10),
                    fov: 50,
                });
            }
        };
        updateCamera();
        window.addEventListener('resize', updateCamera);
        return () => window.removeEventListener('resize', updateCamera);
    }, []);

    return (
        <Canvas
            shadows
            camera={{
                position: cameraConfig.position,
                fov: cameraConfig.fov,
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 0,
                width: '100vw',
                height: '100vh',
            }}
        >
            <ambientLight intensity={1.5} />
            <directionalLight
                position={[5, 10, 5]}
                intensity={2}
                castShadow
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
            />
            <Platform />
        </Canvas>
    );
}
