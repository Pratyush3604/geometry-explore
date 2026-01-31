import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

interface Shape3DViewerProps {
  shape: string;
  color?: string;
  wireframe?: boolean;
}

function Cube({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Sphere({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Cylinder({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <cylinderGeometry args={[1, 1, 2.5, 32]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Cone({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <coneGeometry args={[1.2, 2.5, 32]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Torus({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <torusGeometry args={[1.2, 0.4, 16, 100]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function TorusKnot({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Tetrahedron({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <tetrahedronGeometry args={[1.5]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Octahedron({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <octahedronGeometry args={[1.5]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Dodecahedron({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <dodecahedronGeometry args={[1.3]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Icosahedron({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <icosahedronGeometry args={[1.4]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Capsule({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <capsuleGeometry args={[0.8, 1.5, 4, 16]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Pyramid({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <coneGeometry args={[1.5, 2, 4]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Prism({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh>
      <cylinderGeometry args={[1, 1, 2.5, 6]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function Ring3D({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.8, 1.5, 32]} />
      <meshStandardMaterial color={color} wireframe={wireframe} side={THREE.DoubleSide} />
    </mesh>
  );
}

const shapes: Record<string, React.ComponentType<{ color: string; wireframe: boolean }>> = {
  cube: Cube,
  sphere: Sphere,
  cylinder: Cylinder,
  cone: Cone,
  torus: Torus,
  torusknot: TorusKnot,
  tetrahedron: Tetrahedron,
  octahedron: Octahedron,
  dodecahedron: Dodecahedron,
  icosahedron: Icosahedron,
  capsule: Capsule,
  pyramid: Pyramid,
  prism: Prism,
  ring: Ring3D,
};

export function Shape3DViewer({ shape, color = "#8b5cf6", wireframe = false }: Shape3DViewerProps) {
  const ShapeComponent = shapes[shape.toLowerCase()] || Cube;

  return (
    <div className="w-full h-[300px] rounded-2xl overflow-hidden bg-card/50">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[4, 3, 4]} />
          <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={2} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <ShapeComponent color={color} wireframe={wireframe} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
