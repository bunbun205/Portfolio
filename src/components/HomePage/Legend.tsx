import {useRef, useEffect, useState, useMemo} from 'react';
import type {JSX} from "react";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from "three-stdlib";
import {TextureLoader} from "three";

function Platform() {
	const platformRef = useRef<THREE.Group>(null);
	const rotationRef = useRef(0);
	const targetRotation = useRef(0);
	const obj = useLoader(OBJLoader, '/platform.obj');
    const texture = useLoader(TextureLoader, '/colorPalette.png');

    const material = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                map: texture,
            }),
        [texture]
    );

	const links: Record<string, string> = {
		ProjectsSign: '/projects',
		AboutSign: '/about',
		BlogSign: '/blog',
		ContactSign: '/contact',
	};

    useMemo(() => {
        obj.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
    }, [obj, material]);

	const clickableMeshes = useMemo(() => {
		const meshes: JSX.Element[] = [];
		obj.traverse((child) => {
			if(child.type === 'Mesh' && links[child.name]) {
				meshes.push(
					<mesh
						key={child.uuid}
						geometry={(child as THREE.Mesh).geometry}
						material={(child as THREE.Mesh).material}
						onClick={() => (window.location.href = links[child.name])}
						onPointerOver={(e) => {
							document.body.style.cursor = 'pointer';
							e.stopPropagation();
						}}
						onPointerOut={(e) => (document.body.style.cursor = 'default')}
					/>
				);
			}
		});
		return meshes;
	}, [obj]);

	// 🖱️ Scroll Rotation (Desktop)
	useEffect(() => {
		const handleScroll = (e: WheelEvent) => {
			targetRotation.current -= e.deltaY * 0.001;
		};
		window.addEventListener('wheel', handleScroll);
		return () => window.removeEventListener('wheel', handleScroll);
	}, []);

	// 📱 Touch Rotation (Mobile)
	useEffect(() => {
		let touchStartX: number | null = null;

		const handleTouchStart = (e: TouchEvent) => {
			touchStartX = e.touches[0].clientX;
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (touchStartX === null) return;
			const touchX = e.touches[0].clientX;
			const deltaX = touchX - touchStartX;
			targetRotation.current += deltaX * 0.005; // Adjust for sensitivity
			touchStartX = touchX;
		};

		window.addEventListener('touchstart', handleTouchStart);
		window.addEventListener('touchmove', handleTouchMove);

		return () => {
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove);
		};
	}, []);

	// Animation Frame
	useFrame(() => {
		rotationRef.current += (targetRotation.current - rotationRef.current) * 0.1;
		if (platformRef.current) {
			platformRef.current.rotation.y = rotationRef.current;
		}
	});

	return (
		<group ref={platformRef} position={[0, -1.2, 0]} scale={[0.6, 0.6, 0.6]}>
			<group rotation={[0, Math.PI/4, 0]}>
				<primitive object={obj}/>
				{clickableMeshes}
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
				// Mobile
				setCameraConfig({
					position: new THREE.Vector3(0, 1.5, 8),
					fov: 90,
				});
			} else {
				// Desktop
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
			<ambientLight intensity={0.4} />
			<directionalLight position={[5, 10, 5]} intensity={1} castShadow />
			<Platform />
		</Canvas>
	);
}
