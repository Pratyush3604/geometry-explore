import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

interface Shape3DViewerProps {
  shape: string;
  color: string;
  wireframe?: boolean;
}

function ShapeMesh({ shape, color, wireframe = false }: { shape: string; color: string; wireframe: boolean }) {
  const materialProps = {
    color: color,
    wireframe: wireframe,
    roughness: 0.3,
    metalness: 0.4,
  };

  const renderShape = () => {
    switch (shape.toLowerCase()) {
      case "cube":
        return (
          <mesh>
            <boxGeometry args={[1.8, 1.8, 1.8]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "sphere":
        return (
          <mesh>
            <sphereGeometry args={[1.2, 64, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "cylinder":
        return (
          <mesh>
            <cylinderGeometry args={[1, 1, 2, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "cone":
        return (
          <mesh>
            <coneGeometry args={[1, 2, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "torus":
        return (
          <mesh>
            <torusGeometry args={[1, 0.4, 32, 100]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "torus-knot":
        return (
          <mesh>
            <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "tetrahedron":
        return (
          <mesh>
            <tetrahedronGeometry args={[1.5]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "octahedron":
        return (
          <mesh>
            <octahedronGeometry args={[1.4]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "dodecahedron":
        return (
          <mesh>
            <dodecahedronGeometry args={[1.3]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "icosahedron":
        return (
          <mesh>
            <icosahedronGeometry args={[1.4]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "pyramid":
        return (
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[1.2, 1.8, 4]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "triangular-pyramid":
        return (
          <mesh>
            <tetrahedronGeometry args={[1.5]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "pentagonal-pyramid":
        return (
          <mesh>
            <coneGeometry args={[1.2, 1.8, 5]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "hexagonal-pyramid":
        return (
          <mesh>
            <coneGeometry args={[1.2, 1.8, 6]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "octagonal-pyramid":
        return (
          <mesh>
            <coneGeometry args={[1.2, 1.8, 8]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "prism":
        return (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1, 1, 2, 6]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "triangular-prism":
        return (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1, 1, 2, 3]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "square-prism":
        return (
          <mesh>
            <boxGeometry args={[1.4, 2.2, 1.4]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "pentagonal-prism":
        return (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1, 1, 1.8, 5]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "heptagonal-prism":
        return (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1, 1, 1.8, 7]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "octagonal-prism":
        return (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1, 1, 1.8, 8]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "decagonal-prism":
        return (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1, 1, 1.8, 10]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "dodecagonal-prism":
        return (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1, 1, 1.8, 12]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "square-antiprism":
        return (
          <mesh rotation={[Math.PI / 2, Math.PI / 8, 0]}>
            <cylinderGeometry args={[1, 1, 1.5, 4, 1, false]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "pentagonal-antiprism":
        return (
          <mesh rotation={[Math.PI / 2, Math.PI / 10, 0]}>
            <cylinderGeometry args={[1, 1, 1.5, 5, 1, false]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "hexagonal-antiprism":
        return (
          <mesh rotation={[Math.PI / 2, Math.PI / 12, 0]}>
            <cylinderGeometry args={[1, 1, 1.5, 6, 1, false]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "octagonal-antiprism":
        return (
          <mesh rotation={[Math.PI / 2, Math.PI / 16, 0]}>
            <cylinderGeometry args={[1, 1, 1.5, 8, 1, false]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "capsule":
        return (
          <mesh>
            <capsuleGeometry args={[0.8, 1.2, 16, 32]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "hemisphere":
        return (
          <mesh rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[1.2, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial {...materialProps} side={THREE.DoubleSide} />
          </mesh>
        );
      
      case "ellipsoid":
        return (
          <mesh scale={[1.5, 1, 0.8]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "ovoid":
        return (
          <mesh scale={[1, 1.3, 1]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "paraboloid":
        return (
          <mesh rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[1.2, 2, 64, 1, true]} />
            <meshStandardMaterial {...materialProps} side={THREE.DoubleSide} />
          </mesh>
        );
      
      case "hyperboloid":
        return (
          <mesh>
            <cylinderGeometry args={[0.6, 1.2, 2, 32, 1, true]} />
            <meshStandardMaterial {...materialProps} side={THREE.DoubleSide} />
          </mesh>
        );
      
      case "cuboid":
        return (
          <mesh>
            <boxGeometry args={[2.2, 1.2, 1]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "frustum":
        return (
          <mesh>
            <cylinderGeometry args={[0.6, 1.2, 1.8, 32]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "rhombohedron":
        const rhombGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        rhombGeo.applyMatrix4(new THREE.Matrix4().makeShear(0.3, 0, 0, 0.3, 0, 0));
        return (
          <mesh geometry={rhombGeo}>
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "stellated-octahedron":
        return (
          <group>
            <mesh>
              <tetrahedronGeometry args={[1.3]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI]}>
              <tetrahedronGeometry args={[1.3]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          </group>
        );
      
      case "truncated-cube":
        return (
          <mesh>
            <boxGeometry args={[1.6, 1.6, 1.6]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "cuboctahedron":
        return (
          <mesh>
            <icosahedronGeometry args={[1.3, 0]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "truncated-tetrahedron":
        return (
          <mesh>
            <tetrahedronGeometry args={[1.4, 1]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "rhombicuboctahedron":
        return (
          <mesh>
            <icosahedronGeometry args={[1.4, 1]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "snub-cube":
        return (
          <mesh>
            <dodecahedronGeometry args={[1.3, 1]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      case "icosidodecahedron":
        return (
          <mesh>
            <icosahedronGeometry args={[1.4, 1]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      
      default:
        return (
          <mesh>
            <boxGeometry args={[1.8, 1.8, 1.8]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {renderShape()}
    </Float>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
}

export function Shape3DViewer({ shape, color, wireframe = false }: Shape3DViewerProps) {
  return (
    <div className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden bg-muted/30">
      <Canvas
        camera={{ position: [3, 2, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />
          
          <ShapeMesh shape={shape} color={color} wireframe={wireframe} />
          
          <Environment preset="studio" />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            autoRotate
            autoRotateSpeed={2}
            minDistance={3}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
