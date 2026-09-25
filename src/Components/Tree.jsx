import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import bark from '../assets/Images/LandingTree/bark.png'
import barkdisplacement from '../assets/Images/LandingTree/bark.png'

function TreeTrunk() {
  const loader = new THREE.TextureLoader();
  const barkTexture = loader.load(bark);
  const barkDisplacement = loader.load(barkdisplacement);

  const scrollProgress = useRef(0)
  const targetProgress = useRef(0)
  const trunk = useRef()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      targetProgress.current = maxScroll > 0 ? scrollY / maxScroll : 0
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    scrollProgress.current += (targetProgress.current - scrollProgress.current)
    if (trunk.current) {
      trunk.current.rotation.y = scrollProgress.current * Math.PI * 2
    }
  })



  return (
    <mesh ref={trunk}>
      {/* Cylinder trunk geometry */}
      <cylinderGeometry args={[1, 1, 30, 64, 128]} />
      <meshStandardMaterial
        map={barkTexture}
        displacementMap={barkDisplacement}
        displacementScale={0.1}
      />
    </mesh>
  );
}
export default function Tree() {
  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 8 }} style={{ overflow: 'visible' }} >
      {/* Lighting */}
      <ambientLight intensity={2} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* Tree trunk */}
      <TreeTrunk />

      {/* Controls to rotate/zoom */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
    </Canvas>
  );
}
