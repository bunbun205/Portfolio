'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../utils/useTheme';

function ParticleSphere() {
	const theme = useTheme();
	const points = useRef<THREE.Points>(null);
	const color = theme === 'dark' ? '#fefefe' : '#121212'

	useFrame(() => {
		if(points.current) {
			points.current.rotation.y += 0.0002;
			points.current.rotation.x += 0.0002;
			points.current.rotation.z += 0.0002;
		}
	});

	const particleCount = 2000;
	const radius = 10.5;
	const positions = new Float32Array(particleCount * 3);

	for(let i = 0; i < particleCount; i++) {
		const phi = Math.acos(2 * Math.random() - 1);
		const theta = 2 * Math.PI * Math.random();
		const r = radius;

		const x = r * Math.sin(phi) * Math.cos(theta);
		const y = r * Math.sin(phi) * Math.sin(theta);
		const z = r * Math.cos(phi);

		positions.set([x, y, z], i * 3);
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

	return (
		<points ref={points} geometry={geometry}>
			<pointsMaterial color={color} size={0.04} sizeAttenuation />
		</points>
	);
}

export default function StarrySphereBackground() {
	return (
		<Canvas
			camera={{ position: [0, 0, 10], fov: 75 }}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: -1,
				width: '100vw',
				height: '100vh',
			}}
		>
			<ambientLight intensity={0.5} />
			<ParticleSphere />
		</Canvas>
	);
}