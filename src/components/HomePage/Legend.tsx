'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

function Platform() {
	const platformRef = useRef<THREE.Group>(null);
	const rotationRef = useRef(0);
	const targetRotation = useRef(0);

	useEffect(() => {
		const handleScroll = (e: WheelEvent) => {
			targetRotation.current -= e.deltaY * 0.001;
		};
		window.addEventListener('wheel', handleScroll);
		return () => window.removeEventListener('wheel', handleScroll);
	}, []);

	useFrame(() => {
		rotationRef.current += (targetRotation.current - rotationRef.current) * 0.1;
		if (platformRef.current) {
			platformRef.current.rotation.y = rotationRef.current;
		}
	});

	const radius = 6;
	const checkpointNames = ['Projects', 'About', 'Blog', 'Contact'];
	const checkpointPositions: [number, number, number][] = useMemo(() => {
		return checkpointNames.map((_, i) => {
			const angle = (i / checkpointNames.length) * 2 * Math.PI;
			const x = (radius - 0.5) * Math.cos(angle);
			const y = 0.5;
			const z = (radius - 0.5) * Math.sin(angle);
			return [x, y, z];
		});
	}, []);

	return (
		<group ref={platformRef}>
			<mesh position={[0, -0.5, 0]}>
				<cylinderGeometry args={[radius, radius, 0.1, 128]} />
				<meshStandardMaterial color="#6e40c9" metalness={0.3} roughness={0.6} />
			</mesh>

			{checkpointPositions.map((pos, i) => (
				<mesh key={i} position={pos}>
					<sphereGeometry args={[0.15, 32, 32]} />
					<meshStandardMaterial color="white" />
					<Html center>
						<a
							href={`/${checkpointNames[i].toLowerCase()}`}
							style={{
								color: 'white',
								fontSize: '0.8rem',
								textDecoration: 'none',
								background: '#0008',
								padding: '0.2rem 0.4rem',
								borderRadius: '0.3rem',
							}}
						>
							{checkpointNames[i]}
						</a>
					</Html>
				</mesh>
			))}
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
			<ambientLight intensity={0.6} />
			<directionalLight position={[5, 10, 5]} intensity={1} />
			<Platform />
		</Canvas>
	);
}
