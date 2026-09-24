import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import bark from '../assets/Images/LandingTree/bark.png'
import barkdisplacement from '../assets/Images/LandingTree/bark.png'

new THREE.CylinderGeometry()

function TreeTrunk() {
  const loader = new THREE.TextureLoader();
  const barkTexture = loader.load(bark);
  // const barkNormal = loader.load('/textures/bark_normal.jpg');
  const barkDisplacement = loader.load(barkdisplacement);

  return (
    <mesh>
      {/* Cylinder trunk geometry */}
      <cylinderGeometry args={[1, 1, 30, 64, 64]} />
      <meshStandardMaterial
        map={barkTexture}
        displacementMap={barkDisplacement}
        displacementScale={0.2}
      />
    </mesh>
  );
}

export default function Tree() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }} style={{height: '100vh'}}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* Tree trunk */}
      <TreeTrunk />

      {/* Controls to rotate/zoom */}
      <OrbitControls />
    </Canvas>
  );
}
