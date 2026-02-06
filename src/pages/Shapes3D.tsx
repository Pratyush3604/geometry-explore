import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Grid3X3, Eye, EyeOff, Calculator, Box, Layers, Info, Brain, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, Suspense, lazy, useMemo } from "react";
import { SearchBar } from "@/components/features/SearchBar";
import { ProgressStats } from "@/components/features/ProgressStats";
import { ShapeActions } from "@/components/features/ShapeActions";
import { QuizMode } from "@/components/features/QuizMode";
import { FormulaCalculator } from "@/components/features/FormulaCalculator";
import { useGeometryProgress } from "@/hooks/useGeometryProgress";

// Lazy load the 3D viewer to prevent blocking
const Shape3DViewer = lazy(() => import("@/components/3d/Shape3DViewer").then(m => ({ default: m.Shape3DViewer })));

interface Shape3DData {
  id: string;
  name: string;
  description: string;
  volume: string;
  surfaceArea: string;
  faces?: string;
  edges?: string;
  vertices?: string;
  eulerFormula?: string;
  properties: string[];
  color: string;
  category: string;
}

const shapes3D: Shape3DData[] = [
  // Platonic Solids
  {
    id: "tetrahedron",
    name: "Tetrahedron",
    description: "The simplest Platonic solid with four triangular faces. Every face is an equilateral triangle. The dual of itself.",
    volume: "V = (a³√2)/12",
    surfaceArea: "SA = √3 × a²",
    faces: "4 triangles",
    edges: "6",
    vertices: "4",
    eulerFormula: "4 - 6 + 4 = 2 ✓",
    properties: ["Self-dual polyhedron", "Fire element (Plato)", "Minimum vertices for 3D", "Tetrahedral symmetry"],
    color: "#06b6d4",
    category: "platonic",
  },
  {
    id: "cube",
    name: "Cube (Hexahedron)",
    description: "A regular polyhedron with six square faces. The only Platonic solid that tessellates 3D space. Also called a hexahedron.",
    volume: "V = s³",
    surfaceArea: "SA = 6s²",
    faces: "6 squares",
    edges: "12",
    vertices: "8",
    eulerFormula: "6 - 12 + 8 = 2 ✓",
    properties: ["Dual: Octahedron", "Earth element (Plato)", "Space-filling", "3 edges per vertex"],
    color: "#8b5cf6",
    category: "platonic",
  },
  {
    id: "octahedron",
    name: "Octahedron",
    description: "Eight equilateral triangular faces. Two square pyramids joined at their bases. Dual of the cube.",
    volume: "V = (√2/3) × a³",
    surfaceArea: "SA = 2√3 × a²",
    faces: "8 triangles",
    edges: "12",
    vertices: "6",
    eulerFormula: "8 - 12 + 6 = 2 ✓",
    properties: ["Dual: Cube", "Air element (Plato)", "4 edges per vertex", "Fluorite crystal shape"],
    color: "#ec4899",
    category: "platonic",
  },
  {
    id: "dodecahedron",
    name: "Dodecahedron",
    description: "Twelve regular pentagonal faces. Contains the golden ratio in its proportions. The shape of the universe (Plato).",
    volume: "V = ((15 + 7√5)/4) × a³",
    surfaceArea: "SA = 3√(25 + 10√5) × a²",
    faces: "12 pentagons",
    edges: "30",
    vertices: "20",
    eulerFormula: "12 - 30 + 20 = 2 ✓",
    properties: ["Dual: Icosahedron", "Cosmos element (Plato)", "Golden ratio", "Pyritohedron crystal"],
    color: "#10b981",
    category: "platonic",
  },
  {
    id: "icosahedron",
    name: "Icosahedron",
    description: "Twenty equilateral triangular faces. Appears nearly spherical. Used in virus structures and geodesic domes.",
    volume: "V = (5(3 + √5)/12) × a³",
    surfaceArea: "SA = 5√3 × a²",
    faces: "20 triangles",
    edges: "30",
    vertices: "12",
    eulerFormula: "20 - 30 + 12 = 2 ✓",
    properties: ["Dual: Dodecahedron", "Water element (Plato)", "5 edges per vertex", "Virus capsids"],
    color: "#f59e0b",
    category: "platonic",
  },
  
  // Basic Solids
  {
    id: "sphere",
    name: "Sphere",
    description: "Every point on the surface is equidistant from the center. Maximum volume for given surface area. Perfect symmetry.",
    volume: "V = (4/3)πr³",
    surfaceArea: "SA = 4πr²",
    properties: ["Infinite symmetry", "No edges/vertices", "Minimum surface for volume", "Constant curvature"],
    color: "#06b6d4",
    category: "basic",
  },
  {
    id: "hemisphere",
    name: "Hemisphere",
    description: "Half of a sphere, cut by a plane through its center. Common in architecture (domes) and astronomy.",
    volume: "V = (2/3)πr³",
    surfaceArea: "SA = 3πr² (curved + base)",
    properties: ["One flat circular face", "One curved surface", "Dome shape", "Half of sphere volume"],
    color: "#8b5cf6",
    category: "basic",
  },
  {
    id: "ellipsoid",
    name: "Ellipsoid",
    description: "A sphere stretched along one or more axes. Earth is an oblate ellipsoid. Three semi-axes: a, b, c.",
    volume: "V = (4/3)πabc",
    surfaceArea: "SA ≈ complex formula",
    properties: ["Three semi-axes", "Oblate/Prolate types", "Earth's shape", "Rugby ball shape"],
    color: "#ec4899",
    category: "basic",
  },
  {
    id: "cylinder",
    name: "Cylinder",
    description: "Two parallel circular bases connected by a curved surface. Common in cans, pipes, and columns.",
    volume: "V = πr²h",
    surfaceArea: "SA = 2πr(r + h)",
    faces: "2 circles + 1 curved",
    edges: "2 circular",
    properties: ["Two parallel bases", "Constant cross-section", "Right or oblique", "Lateral area = 2πrh"],
    color: "#10b981",
    category: "basic",
  },
  {
    id: "cone",
    name: "Cone",
    description: "Circular base tapering to a point (apex). Ice cream cones, traffic cones, and volcanoes are examples.",
    volume: "V = (1/3)πr²h",
    surfaceArea: "SA = πr(r + l)",
    faces: "1 circle + 1 curved",
    edges: "1 circular",
    vertices: "1 (apex)",
    properties: ["One circular base", "Slant height l = √(r² + h²)", "1/3 of cylinder volume", "Conic sections"],
    color: "#f59e0b",
    category: "basic",
  },
  {
    id: "frustum",
    name: "Frustum",
    description: "A cone or pyramid with the top cut off parallel to the base. Buckets and lampshades are frustums.",
    volume: "V = (πh/3)(R² + Rr + r²)",
    surfaceArea: "SA = π(R + r)l + πR² + πr²",
    properties: ["Two circular faces", "Truncated cone", "Slant height formula", "Common in engineering"],
    color: "#8b5cf6",
    category: "basic",
  },
  {
    id: "capsule",
    name: "Capsule",
    description: "A cylinder with hemispherical ends. Used in pills, physics simulations, and stadium roofs.",
    volume: "V = πr²h + (4/3)πr³",
    surfaceArea: "SA = 2πrh + 4πr²",
    properties: ["Cylinder + 2 hemispheres", "Smooth everywhere", "No edges", "Pill shape"],
    color: "#06b6d4",
    category: "basic",
  },
  {
    id: "ovoid",
    name: "Ovoid (Egg)",
    description: "An egg-shaped solid with one end larger than the other. Found in nature as eggs and some fruits.",
    volume: "V ≈ (2/3)πab²",
    surfaceArea: "SA ≈ complex formula",
    properties: ["Asymmetric shape", "One end larger", "Natural form", "Stronger at narrow end"],
    color: "#ec4899",
    category: "basic",
  },
  {
    id: "paraboloid",
    name: "Paraboloid",
    description: "Surface generated by rotating a parabola. Used in satellite dishes and reflector telescopes.",
    volume: "V = (1/2)πr²h",
    surfaceArea: "SA = (π/6h²)((r²+4h²)^1.5 - r³)",
    properties: ["Parabolic cross-section", "Focus point", "Reflective property", "Dish antenna shape"],
    color: "#10b981",
    category: "basic",
  },
  {
    id: "hyperboloid",
    name: "Hyperboloid",
    description: "A doubly curved surface that can be made with straight lines. Used in cooling towers and architecture.",
    volume: "V = (πh/3)(R² + Rr + r²)",
    surfaceArea: "Complex calculation",
    properties: ["Ruled surface", "Doubly curved", "Cooling tower shape", "Made with straight lines"],
    color: "#f59e0b",
    category: "basic",
  },
  
  // Prisms
  {
    id: "cuboid",
    name: "Cuboid (Rectangular Prism)",
    description: "Six rectangular faces with opposite faces equal. Books, bricks, and boxes are cuboids.",
    volume: "V = l × w × h",
    surfaceArea: "SA = 2(lw + wh + lh)",
    faces: "6 rectangles",
    edges: "12",
    vertices: "8",
    eulerFormula: "6 - 12 + 8 = 2 ✓",
    properties: ["All angles 90°", "Opposite faces equal", "Space diagonal = √(l²+w²+h²)", "Box shape"],
    color: "#ec4899",
    category: "prisms",
  },
  {
    id: "triangular-prism",
    name: "Triangular Prism",
    description: "A prism with triangular bases. Light splits into colors through a triangular prism (Newton).",
    volume: "V = (½ × b × h) × l",
    surfaceArea: "SA = bh + (a+b+c)l",
    faces: "2 triangles + 3 rectangles",
    edges: "9",
    vertices: "6",
    eulerFormula: "5 - 9 + 6 = 2 ✓",
    properties: ["Triangular bases", "Light refraction", "Toblerone shape", "Tent shape"],
    color: "#10b981",
    category: "prisms",
  },
  {
    id: "square-prism",
    name: "Square Prism",
    description: "A prism with square bases. When all faces are squares, it becomes a cube.",
    volume: "V = s² × h",
    surfaceArea: "SA = 2s² + 4sh",
    faces: "2 squares + 4 rectangles",
    edges: "12",
    vertices: "8",
    eulerFormula: "6 - 12 + 8 = 2 ✓",
    properties: ["Square bases", "Right angles", "Column shape", "6 faces total"],
    color: "#8b5cf6",
    category: "prisms",
  },
  {
    id: "pentagonal-prism",
    name: "Pentagonal Prism",
    description: "A prism with pentagonal bases. Seven faces total: two pentagons and five rectangles.",
    volume: "V = (¼√(5(5+2√5))s²) × h",
    surfaceArea: "SA = 2A_base + 5sh",
    faces: "2 pentagons + 5 rectangles",
    edges: "15",
    vertices: "10",
    eulerFormula: "7 - 15 + 10 = 2 ✓",
    properties: ["7 faces total", "Pentagon bases", "10 vertices", "15 edges"],
    color: "#f59e0b",
    category: "prisms",
  },
  {
    id: "prism",
    name: "Hexagonal Prism",
    description: "A prism with hexagonal bases. Pencils and some crystals have this shape. Eight faces total.",
    volume: "V = (3√3/2)s²h",
    surfaceArea: "SA = 3√3s² + 6sh",
    faces: "2 hexagons + 6 rectangles",
    edges: "18",
    vertices: "12",
    eulerFormula: "8 - 18 + 12 = 2 ✓",
    properties: ["8 faces total", "Hexagon bases", "Pencil shape", "Honeycomb related"],
    color: "#8b5cf6",
    category: "prisms",
  },
  {
    id: "heptagonal-prism",
    name: "Heptagonal Prism",
    description: "A prism with heptagonal (7-sided) bases. Nine faces total with 21 edges.",
    volume: "V = (7/4)s²cot(π/7) × h",
    surfaceArea: "SA = 2A_base + 7sh",
    faces: "2 heptagons + 7 rectangles",
    edges: "21",
    vertices: "14",
    eulerFormula: "9 - 21 + 14 = 2 ✓",
    properties: ["9 faces total", "7-sided bases", "Rare in nature", "21 edges"],
    color: "#06b6d4",
    category: "prisms",
  },
  {
    id: "octagonal-prism",
    name: "Octagonal Prism",
    description: "A prism with octagonal bases. Ten faces total. Found in some columns and architectural elements.",
    volume: "V = 2(1+√2)s²h",
    surfaceArea: "SA = 4(1+√2)s² + 8sh",
    faces: "2 octagons + 8 rectangles",
    edges: "24",
    vertices: "16",
    eulerFormula: "10 - 24 + 16 = 2 ✓",
    properties: ["10 faces total", "Stop sign bases", "Column shape", "24 edges"],
    color: "#ec4899",
    category: "prisms",
  },
  {
    id: "decagonal-prism",
    name: "Decagonal Prism",
    description: "A prism with decagonal (10-sided) bases. Twelve faces with 30 edges.",
    volume: "V = (5/2)s²√(5+2√5) × h",
    surfaceArea: "SA = 2A_base + 10sh",
    faces: "2 decagons + 10 rectangles",
    edges: "30",
    vertices: "20",
    eulerFormula: "12 - 30 + 20 = 2 ✓",
    properties: ["12 faces total", "10-sided bases", "Near circular", "30 edges"],
    color: "#10b981",
    category: "prisms",
  },
  {
    id: "dodecagonal-prism",
    name: "Dodecagonal Prism",
    description: "A prism with dodecagonal (12-sided) bases. Fourteen faces total, very close to cylindrical.",
    volume: "V = 3(2+√3)s²h",
    surfaceArea: "SA = 2A_base + 12sh",
    faces: "2 dodecagons + 12 rectangles",
    edges: "36",
    vertices: "24",
    eulerFormula: "14 - 36 + 24 = 2 ✓",
    properties: ["14 faces total", "12-sided bases", "Almost cylindrical", "36 edges"],
    color: "#f59e0b",
    category: "prisms",
  },
  
  // Pyramids
  {
    id: "pyramid",
    name: "Square Pyramid",
    description: "A square base with four triangular faces meeting at an apex. The Great Pyramid of Giza is a famous example.",
    volume: "V = (1/3) × s² × h",
    surfaceArea: "SA = s² + 2sl",
    faces: "1 square + 4 triangles",
    edges: "8",
    vertices: "5",
    eulerFormula: "5 - 8 + 5 = 2 ✓",
    properties: ["Giza pyramid shape", "Slant height l", "Square base", "Ancient architecture"],
    color: "#06b6d4",
    category: "pyramids",
  },
  {
    id: "triangular-pyramid",
    name: "Triangular Pyramid",
    description: "A pyramid with a triangular base. When all four faces are equilateral triangles, it's a tetrahedron.",
    volume: "V = (1/3) × A_base × h",
    surfaceArea: "SA = A_base + 3 × A_lateral",
    faces: "4 triangles",
    edges: "6",
    vertices: "4",
    eulerFormula: "4 - 6 + 4 = 2 ✓",
    properties: ["4 triangular faces", "Simplest pyramid", "Same as tetrahedron", "4 vertices"],
    color: "#8b5cf6",
    category: "pyramids",
  },
  {
    id: "pentagonal-pyramid",
    name: "Pentagonal Pyramid",
    description: "A pyramid with a pentagonal base and five triangular lateral faces.",
    volume: "V = (1/3) × A_base × h",
    surfaceArea: "SA = A_base + 5 × A_lateral",
    faces: "1 pentagon + 5 triangles",
    edges: "10",
    vertices: "6",
    eulerFormula: "6 - 10 + 6 = 2 ✓",
    properties: ["Pentagon base", "5 triangular faces", "6 vertices", "10 edges"],
    color: "#ec4899",
    category: "pyramids",
  },
  {
    id: "hexagonal-pyramid",
    name: "Hexagonal Pyramid",
    description: "A pyramid with a hexagonal base and six triangular lateral faces meeting at an apex.",
    volume: "V = (1/3) × (3√3/2)s² × h",
    surfaceArea: "SA = (3√3/2)s² + 6 × A_lateral",
    faces: "1 hexagon + 6 triangles",
    edges: "12",
    vertices: "7",
    eulerFormula: "7 - 12 + 7 = 2 ✓",
    properties: ["Hexagon base", "6 triangular faces", "7 vertices", "12 edges"],
    color: "#10b981",
    category: "pyramids",
  },
  {
    id: "octagonal-pyramid",
    name: "Octagonal Pyramid",
    description: "A pyramid with an octagonal base and eight triangular faces converging at a single apex.",
    volume: "V = (1/3) × 2(1+√2)s² × h",
    surfaceArea: "SA = A_base + 8 × A_lateral",
    faces: "1 octagon + 8 triangles",
    edges: "16",
    vertices: "9",
    eulerFormula: "9 - 16 + 9 = 2 ✓",
    properties: ["Octagon base", "8 triangular faces", "9 vertices", "16 edges"],
    color: "#f59e0b",
    category: "pyramids",
  },
  
  // Antiprisms
  {
    id: "square-antiprism",
    name: "Square Antiprism",
    description: "Two square faces connected by a band of eight alternating triangles. More spherical than a prism.",
    volume: "V = (1/3)(1 + √2)√(2(2+√2))s³",
    surfaceArea: "SA = 2s² + 4√3s²",
    faces: "2 squares + 8 triangles",
    edges: "16",
    vertices: "8",
    eulerFormula: "10 - 16 + 8 = 2 ✓",
    properties: ["Twisted prism", "8 triangular faces", "More spherical", "Dual is tetragonal trapezohedron"],
    color: "#8b5cf6",
    category: "antiprisms",
  },
  {
    id: "pentagonal-antiprism",
    name: "Pentagonal Antiprism",
    description: "Two pentagonal faces connected by ten alternating triangles. Part of icosahedral symmetry.",
    volume: "V ≈ 2.243s³",
    surfaceArea: "SA ≈ 7.771s²",
    faces: "2 pentagons + 10 triangles",
    edges: "20",
    vertices: "10",
    eulerFormula: "12 - 20 + 10 = 2 ✓",
    properties: ["10 triangular faces", "Part of icosahedron", "5-fold symmetry", "Dual is pentagonal trapezohedron"],
    color: "#06b6d4",
    category: "antiprisms",
  },
  {
    id: "hexagonal-antiprism",
    name: "Hexagonal Antiprism",
    description: "Two hexagonal faces connected by twelve alternating triangles twisted relative to each other.",
    volume: "V ≈ 3.873s³",
    surfaceArea: "SA ≈ 11.196s²",
    faces: "2 hexagons + 12 triangles",
    edges: "24",
    vertices: "12",
    eulerFormula: "14 - 24 + 12 = 2 ✓",
    properties: ["12 triangular faces", "6-fold symmetry", "Twisted hexagonal prism", "More spherical"],
    color: "#ec4899",
    category: "antiprisms",
  },
  {
    id: "octagonal-antiprism",
    name: "Octagonal Antiprism",
    description: "Two octagonal faces connected by sixteen alternating triangles. Very close to spherical shape.",
    volume: "V ≈ 6.318s³",
    surfaceArea: "SA ≈ 17.485s²",
    faces: "2 octagons + 16 triangles",
    edges: "32",
    vertices: "16",
    eulerFormula: "18 - 32 + 16 = 2 ✓",
    properties: ["16 triangular faces", "8-fold symmetry", "Near spherical", "32 edges"],
    color: "#10b981",
    category: "antiprisms",
  },
  
  // Special Solids
  {
    id: "torus",
    name: "Torus",
    description: "A doughnut shape generated by rotating a circle around an external axis. Has genus 1 (one hole).",
    volume: "V = 2π²Rr²",
    surfaceArea: "SA = 4π²Rr",
    properties: ["Donut shape", "Genus 1 (one hole)", "R = major radius", "r = minor radius"],
    color: "#ec4899",
    category: "special",
  },
  {
    id: "torus-knot",
    name: "Torus Knot",
    description: "A mathematical knot lying on the surface of a torus. Creates beautiful intertwined 3D curves.",
    volume: "Complex parametric",
    surfaceArea: "Complex calculation",
    properties: ["Continuous curve", "No endpoints", "Knotted topology", "Mathematical art"],
    color: "#10b981",
    category: "special",
  },
  {
    id: "rhombohedron",
    name: "Rhombohedron",
    description: "A parallelepiped where all six faces are congruent rhombi. Like a cube sheared in one direction.",
    volume: "V = a³√(1-3cos²α+2cos³α)",
    surfaceArea: "SA = 6a²sin(α)",
    faces: "6 rhombi",
    edges: "12",
    vertices: "8",
    eulerFormula: "6 - 12 + 8 = 2 ✓",
    properties: ["Sheared cube", "All faces rhombi", "Calcite crystal", "3 pairs parallel faces"],
    color: "#f59e0b",
    category: "special",
  },
  {
    id: "stellated-octahedron",
    name: "Stellated Octahedron",
    description: "An octahedron with triangular pyramids on each face. Also called stella octangula or star tetrahedron.",
    volume: "V = (8/3) × tetrahedron",
    surfaceArea: "SA = 8 × equilateral triangles",
    faces: "8 triangular pyramids",
    edges: "24",
    vertices: "14",
    properties: ["Two interlocking tetrahedra", "Star-shaped", "Self-dual compound", "Kepler's solid"],
    color: "#8b5cf6",
    category: "special",
  },
  {
    id: "truncated-cube",
    name: "Truncated Cube",
    description: "A cube with corners cut off, creating 8 triangular faces and 6 octagonal faces.",
    volume: "V = (21 + 14√2)/3 × s³",
    surfaceArea: "SA = 2(6 + 6√2 + √3)s²",
    faces: "8 triangles + 6 octagons",
    edges: "36",
    vertices: "24",
    eulerFormula: "14 - 36 + 24 = 2 ✓",
    properties: ["Archimedean solid", "Truncated Platonic", "14 faces", "All edges equal"],
    color: "#06b6d4",
    category: "special",
  },
  {
    id: "cuboctahedron",
    name: "Cuboctahedron",
    description: "An Archimedean solid with 8 triangular and 6 square faces. Halfway between cube and octahedron.",
    volume: "V = (5√2/3)a³",
    surfaceArea: "SA = (6 + 2√3)a²",
    faces: "8 triangles + 6 squares",
    edges: "24",
    vertices: "12",
    eulerFormula: "14 - 24 + 12 = 2 ✓",
    properties: ["Archimedean solid", "Rectified cube", "Vector equilibrium", "12 vertices"],
    color: "#ec4899",
    category: "special",
  },
  {
    id: "truncated-tetrahedron",
    name: "Truncated Tetrahedron",
    description: "A tetrahedron with corners cut off, creating 4 triangular and 4 hexagonal faces.",
    volume: "V = (23√2/12)a³",
    surfaceArea: "SA = 7√3a²",
    faces: "4 triangles + 4 hexagons",
    edges: "18",
    vertices: "12",
    eulerFormula: "8 - 18 + 12 = 2 ✓",
    properties: ["Archimedean solid", "8 faces total", "Truncated Platonic", "All edges equal"],
    color: "#10b981",
    category: "special",
  },
  {
    id: "rhombicuboctahedron",
    name: "Rhombicuboctahedron",
    description: "An Archimedean solid with 8 triangles and 18 squares. Used in many architectural designs.",
    volume: "V = (12 + 10√2)/3 × a³",
    surfaceArea: "SA = (18 + 2√3)a²",
    faces: "8 triangles + 18 squares",
    edges: "48",
    vertices: "24",
    eulerFormula: "26 - 48 + 24 = 2 ✓",
    properties: ["Archimedean solid", "26 faces", "Expanded cube", "48 edges"],
    color: "#f59e0b",
    category: "special",
  },
  {
    id: "snub-cube",
    name: "Snub Cube",
    description: "A chiral Archimedean solid with 32 triangles and 6 squares. Has two mirror-image forms.",
    volume: "V ≈ 7.889a³",
    surfaceArea: "SA ≈ 19.856a²",
    faces: "32 triangles + 6 squares",
    edges: "60",
    vertices: "24",
    eulerFormula: "38 - 60 + 24 = 2 ✓",
    properties: ["Archimedean solid", "Chiral (two forms)", "38 faces", "No mirror symmetry"],
    color: "#8b5cf6",
    category: "special",
  },
  {
    id: "icosidodecahedron",
    name: "Icosidodecahedron",
    description: "An Archimedean solid with 20 triangular and 12 pentagonal faces. Related to both icosahedron and dodecahedron.",
    volume: "V = (45 + 17√5)/6 × a³",
    surfaceArea: "SA = (5√3 + 3√(25+10√5))a²",
    faces: "20 triangles + 12 pentagons",
    edges: "60",
    vertices: "30",
    eulerFormula: "32 - 60 + 30 = 2 ✓",
    properties: ["Archimedean solid", "32 faces", "Rectified icosahedron", "Golden ratio"],
    color: "#06b6d4",
    category: "special",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

function LoadingPlaceholder() {
  return (
    <div className="w-full h-[300px] rounded-2xl bg-muted/30 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
      />
    </div>
  );
}

const categories3D = [
  { id: "platonic", name: "Platonic Solids" },
  { id: "basic", name: "Basic Solids" },
  { id: "prisms", name: "Prisms" },
  { id: "pyramids", name: "Pyramids" },
  { id: "antiprisms", name: "Antiprisms" },
  { id: "special", name: "Special" },
];

const Shapes3D = () => {
  const [selectedShape, setSelectedShape] = useState<Shape3DData>(shapes3D[0]);
  const [wireframe, setWireframe] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorShape, setCalculatorShape] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<"all" | "learned" | "favorites">("all");

  const { toggleLearned, toggleFavorite, isLearned, isFavorite, learnedCount, favoritesCount } = useGeometryProgress();

  const filteredShapes = useMemo(() => {
    let shapes = shapes3D;
    
    if (activeCategory) {
      shapes = shapes.filter(s => s.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      shapes = shapes.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.properties.some(p => p.toLowerCase().includes(query))
      );
    }

    if (filterMode === "learned") {
      shapes = shapes.filter(s => isLearned(`3d-${s.id}`));
    } else if (filterMode === "favorites") {
      shapes = shapes.filter(s => isFavorite(`3d-${s.id}`));
    }
    
    return shapes;
  }, [activeCategory, searchQuery, filterMode, isLearned, isFavorite]);

  const quizItems = shapes3D.map(s => ({
    id: s.id,
    name: s.name,
    properties: s.properties,
    category: s.category,
    formula: s.volume,
  }));

  const openCalculator = (shapeName: string) => {
    setCalculatorShape(shapeName);
    setShowCalculator(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/shapes-2d" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to 2D Shapes
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                3D <span className="gradient-text">Shapes</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Explore three-dimensional geometry with interactive 3D models.
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => openCalculator(selectedShape.name)} variant="outline" className="gap-2">
                <Calculator className="w-4 h-4" />
                Calculator
              </Button>
              <Button onClick={() => setShowQuiz(true)} className="gap-2">
                <Brain className="w-4 h-4" />
                Start Quiz
              </Button>
            </div>
          </div>

          <ProgressStats 
            learnedCount={learnedCount} 
            favoritesCount={favoritesCount} 
            totalCount={shapes3D.length} 
          />
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 mb-8"
        >
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search 3D shapes..." 
          />
          
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <div className="flex gap-2">
              <Button
                variant={filterMode === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterMode("all")}
              >
                All
              </Button>
              <Button
                variant={filterMode === "learned" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterMode("learned")}
              >
                Learned
              </Button>
              <Button
                variant={filterMode === "favorites" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterMode("favorites")}
              >
                Favorites
              </Button>
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Category:</span>
              <Button
                variant={activeCategory === null ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(null)}
              >
                All
              </Button>
              {categories3D.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>

          {/* 3D Controls */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RotateCcw className="w-4 h-4" />
              <span>Drag to rotate • Scroll to zoom</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setWireframe(!wireframe)}
              className="gap-2"
            >
              {wireframe ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {wireframe ? "Solid" : "Wireframe"}
            </Button>
          </div>
        </motion.div>

        <QuizMode 
          open={showQuiz} 
          onOpenChange={setShowQuiz} 
          items={quizItems} 
          type="3d" 
        />

        <FormulaCalculator
          open={showCalculator}
          onOpenChange={setShowCalculator}
          shapeName={calculatorShape}
          shapeType="3d"
        />

        {/* Main View */}
        <motion.div
          key={selectedShape.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-3xl border border-border p-8 mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="aspect-square max-h-[400px]">
              <Suspense fallback={<LoadingPlaceholder />}>
                <Shape3DViewer 
                  shape={selectedShape.id} 
                  color={selectedShape.color}
                  wireframe={wireframe}
                />
              </Suspense>
            </div>

            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: selectedShape.color }}
                  >
                    <Grid3X3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-bold">
                      {selectedShape.name}
                    </h2>
                    <span className="text-sm text-muted-foreground capitalize">{selectedShape.category}</span>
                  </div>
                </div>
                <ShapeActions
                  isLearned={isLearned(`3d-${selectedShape.id}`)}
                  isFavorite={isFavorite(`3d-${selectedShape.id}`)}
                  onToggleLearned={() => toggleLearned(`3d-${selectedShape.id}`)}
                  onToggleFavorite={() => toggleFavorite(`3d-${selectedShape.id}`)}
                  showCalculator
                  onOpenCalculator={() => openCalculator(selectedShape.name)}
                />
              </div>
              <p className="text-lg text-muted-foreground">
                {selectedShape.description}
              </p>
              
              {/* Volume & Surface Area */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Box className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Volume</span>
                  </div>
                  <p className="text-sm font-mono font-semibold text-primary">
                    {selectedShape.volume}
                  </p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">Surface Area</span>
                  </div>
                  <p className="text-sm font-mono font-semibold text-secondary">
                    {selectedShape.surfaceArea}
                  </p>
                </div>
              </div>

              {/* Topology Info */}
              {(selectedShape.faces || selectedShape.edges || selectedShape.vertices) && (
                <div className="grid grid-cols-3 gap-3">
                  {selectedShape.faces && (
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20 text-center">
                      <span className="text-xs text-muted-foreground block mb-1">Faces (F)</span>
                      <span className="text-sm font-semibold">{selectedShape.faces}</span>
                    </div>
                  )}
                  {selectedShape.edges && (
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20 text-center">
                      <span className="text-xs text-muted-foreground block mb-1">Edges (E)</span>
                      <span className="text-sm font-semibold">{selectedShape.edges}</span>
                    </div>
                  )}
                  {selectedShape.vertices && (
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20 text-center">
                      <span className="text-xs text-muted-foreground block mb-1">Vertices (V)</span>
                      <span className="text-sm font-semibold">{selectedShape.vertices}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Euler's Formula */}
              {selectedShape.eulerFormula && (
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Calculator className="w-4 h-4 text-success" />
                    <span className="text-xs text-muted-foreground">Euler's Formula: V - E + F = 2</span>
                  </div>
                  <span className="text-sm font-mono font-semibold text-success">{selectedShape.eulerFormula}</span>
                </div>
              )}

              {/* Properties */}
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Key Properties</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedShape.properties.map((prop, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 bg-background rounded-full border border-border">
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3D Formulas Reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-muted/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-lg">Key 3D Geometry Concepts</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-background rounded-lg">
              <span className="text-muted-foreground block mb-1">Euler's Polyhedron Formula</span>
              <span className="font-mono font-semibold text-primary">V - E + F = 2</span>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <span className="text-muted-foreground block mb-1">Platonic Solids</span>
              <span className="font-mono font-semibold text-primary">Only 5 exist</span>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <span className="text-muted-foreground block mb-1">Prism Volume</span>
              <span className="font-mono font-semibold text-secondary">V = Base Area × Height</span>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <span className="text-muted-foreground block mb-1">Pyramid/Cone Volume</span>
              <span className="font-mono font-semibold text-secondary">V = ⅓ × Base × Height</span>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <span className="text-muted-foreground block mb-1">Sphere Volume</span>
              <span className="font-mono font-semibold text-secondary">V = (4/3)πr³</span>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <span className="text-muted-foreground block mb-1">Sphere Surface Area</span>
              <span className="font-mono font-semibold text-secondary">SA = 4πr²</span>
            </div>
          </div>
        </motion.div>

        {/* Shape Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredShapes.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No shapes found matching your criteria.
            </div>
          ) : filteredShapes.map((shape) => (
            <motion.button
              key={shape.id}
              variants={item}
              onClick={() => setSelectedShape(shape)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 relative ${
                selectedShape.id === shape.id
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              {(isLearned(`3d-${shape.id}`) || isFavorite(`3d-${shape.id}`)) && (
                <div className="absolute top-1 right-1 flex gap-0.5">
                  {isLearned(`3d-${shape.id}`) && (
                    <span className="w-2 h-2 rounded-full bg-success" />
                  )}
                  {isFavorite(`3d-${shape.id}`) && (
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  )}
                </div>
              )}
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: shape.color }}
              >
                <Grid3X3 className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium truncate max-w-full">
                {shape.name}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between mt-12"
        >
          <Link to="/shapes-2d">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              2D Shapes
            </Button>
          </Link>
          <Link to="/">
            <Button className="gap-2 gradient-bg">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Shapes3D;