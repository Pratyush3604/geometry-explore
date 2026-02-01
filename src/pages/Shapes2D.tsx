import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Shape2D } from "@/components/shapes/Shape2D";
import { ArrowLeft, ArrowRight, Calculator, Ruler, TriangleRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Shape2DData {
  id: string;
  name: string;
  description: string;
  area: string;
  perimeter: string;
  interiorAngleSum?: string;
  exteriorAngleSum?: string;
  eachInteriorAngle?: string;
  eachExteriorAngle?: string;
  diagonals?: string;
  symmetryLines?: string;
  properties: string[];
  color: string;
  category: string;
}

const shapes2D: Shape2DData[] = [
  // Circles & Curves
  {
    id: "circle",
    name: "Circle",
    description: "A perfectly round shape where all points are equidistant from the center. The most symmetrical 2D shape.",
    area: "A = πr²",
    perimeter: "C = 2πr = πd",
    symmetryLines: "Infinite",
    properties: ["No sides", "No vertices", "360° total", "Constant curvature"],
    color: "hsl(259 85% 65%)",
    category: "curves",
  },
  {
    id: "ellipse",
    name: "Ellipse",
    description: "An oval shape with two focal points. The sum of distances from any point to both foci is constant. Earth's orbit is elliptical.",
    area: "A = πab",
    perimeter: "C ≈ π(3(a+b) - √((3a+b)(a+3b)))",
    symmetryLines: "2",
    properties: ["Two axes (major & minor)", "Two foci", "Eccentricity 0 < e < 1"],
    color: "hsl(330 85% 65%)",
    category: "curves",
  },
  {
    id: "semicircle",
    name: "Semicircle",
    description: "Half of a circle, bounded by a diameter and half the circumference. Used in architecture for arches.",
    area: "A = ½πr²",
    perimeter: "P = πr + 2r",
    symmetryLines: "1",
    properties: ["One curved edge", "One straight edge", "180° arc", "One axis of symmetry"],
    color: "hsl(195 90% 55%)",
    category: "curves",
  },
  {
    id: "quarter-circle",
    name: "Quarter Circle",
    description: "One quarter of a circle, bounded by two radii and a 90° arc. Also called a quadrant.",
    area: "A = ¼πr²",
    perimeter: "P = ½πr + 2r",
    symmetryLines: "1",
    properties: ["90° arc", "Two straight edges", "One vertex", "One right angle"],
    color: "hsl(160 70% 45%)",
    category: "curves",
  },
  {
    id: "annulus",
    name: "Annulus (Ring)",
    description: "The region between two concentric circles. Common in washers, CDs, and planetary rings.",
    area: "A = π(R² - r²)",
    perimeter: "P = 2π(R + r)",
    symmetryLines: "Infinite",
    properties: ["Two circular boundaries", "Donut shape", "No vertices", "Radial symmetry"],
    color: "hsl(35 90% 55%)",
    category: "curves",
  },
  {
    id: "crescent",
    name: "Crescent",
    description: "A curved shape formed by two circular arcs, resembling a moon phase. Seen in lunar cycles and flags.",
    area: "Depends on arc radii",
    perimeter: "Sum of both arcs",
    symmetryLines: "1",
    properties: ["Two curved edges", "Two cusps", "Asymmetric", "No vertices"],
    color: "hsl(259 85% 65%)",
    category: "curves",
  },
  
  // Triangles
  {
    id: "triangle",
    name: "Scalene Triangle",
    description: "A triangle with all three sides of different lengths and all angles different. The most general triangle type.",
    area: "A = ½ × base × height",
    perimeter: "P = a + b + c",
    interiorAngleSum: "180°",
    exteriorAngleSum: "360°",
    properties: ["3 unequal sides", "3 unequal angles", "No symmetry", "Altitudes intersect at orthocenter"],
    color: "hsl(160 70% 45%)",
    category: "triangles",
  },
  {
    id: "equilateral",
    name: "Equilateral Triangle",
    description: "A triangle with all three sides equal and all angles measuring 60°. The most symmetrical triangle.",
    area: "A = (√3/4) × a²",
    perimeter: "P = 3a",
    interiorAngleSum: "180°",
    exteriorAngleSum: "360°",
    eachInteriorAngle: "60°",
    eachExteriorAngle: "120°",
    symmetryLines: "3",
    properties: ["3 equal sides", "3 equal angles (60°)", "3-fold rotational symmetry", "Centroid = Incenter = Circumcenter"],
    color: "hsl(259 85% 65%)",
    category: "triangles",
  },
  {
    id: "isosceles",
    name: "Isosceles Triangle",
    description: "A triangle with two sides of equal length and two equal base angles. Common in architecture and design.",
    area: "A = ½ × base × height",
    perimeter: "P = 2a + b",
    interiorAngleSum: "180°",
    exteriorAngleSum: "360°",
    symmetryLines: "1",
    properties: ["2 equal sides", "2 equal angles", "1 line of symmetry", "Apex angle differs from base angles"],
    color: "hsl(195 90% 55%)",
    category: "triangles",
  },
  {
    id: "right-triangle",
    name: "Right Triangle",
    description: "A triangle with one 90° angle. Forms the basis of trigonometry and the Pythagorean theorem.",
    area: "A = ½ × leg₁ × leg₂",
    perimeter: "P = a + b + c",
    interiorAngleSum: "180°",
    exteriorAngleSum: "360°",
    properties: ["One 90° angle", "Hypotenuse (longest side)", "a² + b² = c²", "Used in trigonometry"],
    color: "hsl(330 85% 65%)",
    category: "triangles",
  },
  {
    id: "obtuse-triangle",
    name: "Obtuse Triangle",
    description: "A triangle with one angle greater than 90°. The longest side is opposite the obtuse angle.",
    area: "A = ½ × base × height",
    perimeter: "P = a + b + c",
    interiorAngleSum: "180°",
    exteriorAngleSum: "360°",
    properties: ["One obtuse angle (>90°)", "Two acute angles", "Altitude can be external", "Circumcenter outside triangle"],
    color: "hsl(35 90% 55%)",
    category: "triangles",
  },
  {
    id: "acute-triangle",
    name: "Acute Triangle",
    description: "A triangle where all three angles are less than 90°. All altitudes lie inside the triangle.",
    area: "A = ½ × base × height",
    perimeter: "P = a + b + c",
    interiorAngleSum: "180°",
    exteriorAngleSum: "360°",
    properties: ["All angles < 90°", "All altitudes internal", "Circumcenter inside triangle", "Orthocenter inside triangle"],
    color: "hsl(160 70% 45%)",
    category: "triangles",
  },
  
  // Quadrilaterals
  {
    id: "square",
    name: "Square",
    description: "A regular quadrilateral with four equal sides and four right angles. Maximum area for a given perimeter among rectangles.",
    area: "A = s²",
    perimeter: "P = 4s",
    interiorAngleSum: "360°",
    exteriorAngleSum: "360°",
    eachInteriorAngle: "90°",
    eachExteriorAngle: "90°",
    diagonals: "d = s√2",
    symmetryLines: "4",
    properties: ["4 equal sides", "4 right angles (90°)", "Diagonals equal & perpendicular", "4-fold rotational symmetry"],
    color: "hsl(195 90% 55%)",
    category: "quadrilaterals",
  },
  {
    id: "rectangle",
    name: "Rectangle",
    description: "A quadrilateral with opposite sides equal and four right angles. Very common in architecture and screens.",
    area: "A = l × w",
    perimeter: "P = 2(l + w)",
    interiorAngleSum: "360°",
    exteriorAngleSum: "360°",
    eachInteriorAngle: "90°",
    eachExteriorAngle: "90°",
    diagonals: "d = √(l² + w²)",
    symmetryLines: "2",
    properties: ["Opposite sides equal", "4 right angles", "Diagonals equal & bisect each other", "2 lines of symmetry"],
    color: "hsl(330 85% 65%)",
    category: "quadrilaterals",
  },
  {
    id: "rhombus",
    name: "Rhombus",
    description: "A parallelogram with all four sides equal. Diagonals bisect each other at right angles. A tilted square.",
    area: "A = ½ × d₁ × d₂",
    perimeter: "P = 4a",
    interiorAngleSum: "360°",
    exteriorAngleSum: "360°",
    diagonals: "d₁ ⊥ d₂",
    symmetryLines: "2",
    properties: ["4 equal sides", "Opposite angles equal", "Diagonals perpendicular bisectors", "2 lines of symmetry"],
    color: "hsl(160 70% 45%)",
    category: "quadrilaterals",
  },
  {
    id: "parallelogram",
    name: "Parallelogram",
    description: "A quadrilateral with opposite sides parallel and equal. Includes rectangles, rhombi, and squares as special cases.",
    area: "A = base × height",
    perimeter: "P = 2(a + b)",
    interiorAngleSum: "360°",
    exteriorAngleSum: "360°",
    properties: ["Opposite sides parallel & equal", "Opposite angles equal", "Diagonals bisect each other", "Adjacent angles supplementary"],
    color: "hsl(259 85% 65%)",
    category: "quadrilaterals",
  },
  {
    id: "trapezoid",
    name: "Trapezoid",
    description: "A quadrilateral with exactly one pair of parallel sides. The parallel sides are called bases.",
    area: "A = ½(a + b) × h",
    perimeter: "P = a + b + c + d",
    interiorAngleSum: "360°",
    exteriorAngleSum: "360°",
    properties: ["One pair parallel sides", "Median = ½(a + b)", "Isosceles if legs equal", "Co-interior angles supplementary"],
    color: "hsl(195 90% 55%)",
    category: "quadrilaterals",
  },
  {
    id: "kite",
    name: "Kite",
    description: "A quadrilateral with two pairs of adjacent sides that are equal. One diagonal is the axis of symmetry.",
    area: "A = ½ × d₁ × d₂",
    perimeter: "P = 2(a + b)",
    interiorAngleSum: "360°",
    exteriorAngleSum: "360°",
    symmetryLines: "1",
    properties: ["2 pairs equal adjacent sides", "Diagonals perpendicular", "One pair equal opposite angles", "1 line of symmetry"],
    color: "hsl(35 90% 55%)",
    category: "quadrilaterals",
  },
  
  // Regular Polygons (5-12 sides)
  {
    id: "pentagon",
    name: "Regular Pentagon",
    description: "A five-sided polygon with equal sides and angles. Found in nature (starfish, flowers) and the Pentagon building.",
    area: "A = ¼√(5(5+2√5)) × s²",
    perimeter: "P = 5s",
    interiorAngleSum: "540°",
    exteriorAngleSum: "360°",
    eachInteriorAngle: "108°",
    eachExteriorAngle: "72°",
    diagonals: "5 diagonals",
    symmetryLines: "5",
    properties: ["5 equal sides", "5 equal angles", "Golden ratio in diagonals", "5-fold rotational symmetry"],
    color: "hsl(330 85% 65%)",
    category: "polygons",
  },
  {
    id: "hexagon",
    name: "Regular Hexagon",
    description: "A six-sided polygon. Most efficient shape for tiling a plane. Found in honeycombs and snowflakes.",
    area: "A = (3√3/2) × s²",
    perimeter: "P = 6s",
    interiorAngleSum: "720°",
    exteriorAngleSum: "360°",
    eachInteriorAngle: "120°",
    eachExteriorAngle: "60°",
    diagonals: "9 diagonals",
    symmetryLines: "6",
    properties: ["6 equal sides", "Tiles the plane perfectly", "6-fold symmetry", "Contains 6 equilateral triangles"],
    color: "hsl(160 70% 45%)",
    category: "polygons",
  },
  {
    id: "heptagon",
    name: "Regular Heptagon",
    description: "A seven-sided polygon. Cannot be constructed with compass and straightedge. Used in some coins.",
    area: "A ≈ 3.634 × s²",
    perimeter: "P = 7s",
    interiorAngleSum: "900°",
    exteriorAngleSum: "360°",
    eachInteriorAngle: "128.57°",
    eachExteriorAngle: "51.43°",
    diagonals: "14 diagonals",
    symmetryLines: "7",
    properties: ["7 equal sides", "Not constructible classically", "7-fold symmetry", "UK 50p coin shape"],
    color: "hsl(259 85% 65%)",
    category: "polygons",
  },
  {
    id: "octagon",
    name: "Regular Octagon",
    description: "An eight-sided polygon. Universally recognized as the stop sign shape. Can tessellate with squares.",
    area: "A = 2(1 + √2) × s²",
    perimeter: "P = 8s",
    interiorAngleSum: "1080°",
    exteriorAngleSum: "360°",
    eachInteriorAngle: "135°",
    eachExteriorAngle: "45°",
    diagonals: "20 diagonals",
    symmetryLines: "8",
    properties: ["8 equal sides", "Stop sign shape", "8-fold symmetry", "Semi-regular tessellation"],
    color: "hsl(195 90% 55%)",
    category: "polygons",
  },
  {
    id: "nonagon",
    name: "Regular Nonagon",
    description: "A nine-sided polygon. Also called enneagon. Each interior angle measures 140°.",
    area: "A ≈ 6.182 × s²",
    perimeter: "P = 9s",
    interiorAngleSum: "1260°",
    exteriorAngleSum: "360°",
    eachInteriorAngle: "140°",
    eachExteriorAngle: "40°",
    diagonals: "27 diagonals",
    symmetryLines: "9",
    properties: ["9 equal sides", "Not constructible classically", "9-fold symmetry", "Rare in nature"],
    color: "hsl(330 85% 65%)",
    category: "polygons",
  },
  {
    id: "decagon",
    name: "Regular Decagon",
    description: "A ten-sided polygon. Related to the golden ratio. Can be constructed with compass and straightedge.",
    area: "A = (5/2)s² × √(5 + 2√5)",
    perimeter: "P = 10s",
    interiorAngleSum: "1440°",
    exteriorAngleSum: "360°",
    eachInteriorAngle: "144°",
    eachExteriorAngle: "36°",
    diagonals: "35 diagonals",
    symmetryLines: "10",
    properties: ["10 equal sides", "Golden ratio related", "10-fold symmetry", "Constructible polygon"],
    color: "hsl(160 70% 45%)",
    category: "polygons",
  },
  {
    id: "hendecagon",
    name: "Regular Hendecagon",
    description: "An eleven-sided polygon. Also called undecagon. Cannot be constructed with compass and straightedge.",
    area: "A ≈ 9.366 × s²",
    perimeter: "P = 11s",
    interiorAngleSum: "1620°",
    exteriorAngleSum: "360°",
    eachInteriorAngle: "147.27°",
    eachExteriorAngle: "32.73°",
    diagonals: "44 diagonals",
    symmetryLines: "11",
    properties: ["11 equal sides", "11-fold symmetry", "Not constructible", "Canadian dollar coin"],
    color: "hsl(35 90% 55%)",
    category: "polygons",
  },
  {
    id: "dodecagon",
    name: "Regular Dodecagon",
    description: "A twelve-sided polygon. Approximates a circle well. Found in clock faces and architecture.",
    area: "A = 3s² × (2 + √3)",
    perimeter: "P = 12s",
    interiorAngleSum: "1800°",
    exteriorAngleSum: "360°",
    eachInteriorAngle: "150°",
    eachExteriorAngle: "30°",
    diagonals: "54 diagonals",
    symmetryLines: "12",
    properties: ["12 equal sides", "12-fold symmetry", "Constructible polygon", "Clock face division"],
    color: "hsl(259 85% 65%)",
    category: "polygons",
  },
  
  // Stars & Special Shapes
  {
    id: "star",
    name: "5-Point Star",
    description: "A star polygon with five points, created by extending the sides of a pentagon. Contains golden ratio proportions.",
    area: "Complex - depends on construction",
    perimeter: "5 × side length",
    properties: ["5 points at 36°", "10 edges", "Non-convex", "Golden ratio proportions"],
    color: "hsl(259 85% 65%)",
    category: "special",
  },
  {
    id: "star6",
    name: "6-Point Star",
    description: "A hexagram formed by two overlapping equilateral triangles. Known as the Star of David.",
    area: "A = 2 × (area of triangle)",
    perimeter: "12 × side length",
    symmetryLines: "6",
    properties: ["6 points at 60°", "12 edges", "Two triangles", "6-fold symmetry"],
    color: "hsl(195 90% 55%)",
    category: "special",
  },
  {
    id: "star8",
    name: "8-Point Star",
    description: "An octagram formed by two overlapping squares rotated 45°. Used in Islamic geometric patterns.",
    area: "A = 2 × (area of square)",
    perimeter: "16 × side length",
    symmetryLines: "8",
    properties: ["8 points at 45°", "16 edges", "Two squares", "8-fold symmetry"],
    color: "hsl(330 85% 65%)",
    category: "special",
  },
  {
    id: "arrow",
    name: "Arrow",
    description: "A directional shape commonly used to indicate movement, direction, or emphasis in design.",
    area: "Composite calculation",
    perimeter: "Sum of all edges",
    properties: ["7 vertices", "Directional", "Asymmetric", "Chevron shape"],
    color: "hsl(160 70% 45%)",
    category: "special",
  },
  {
    id: "cross",
    name: "Cross",
    description: "A shape with four arms extending from a central point. Used in religious and medical symbols.",
    area: "A = 5s² (if arms equal width)",
    perimeter: "P = 12s",
    symmetryLines: "4",
    properties: ["4-fold symmetry", "12 edges", "12 vertices", "Plus sign shape"],
    color: "hsl(35 90% 55%)",
    category: "special",
  },
  {
    id: "heart",
    name: "Heart",
    description: "A symbolic shape representing love and affection. Created from two semicircular arcs and a triangle.",
    area: "Approximated by calculus",
    perimeter: "Two arcs + two lines",
    symmetryLines: "1",
    properties: ["Bilateral symmetry", "Curved edges", "One cusp vertex", "Iconic symbol"],
    color: "hsl(330 85% 65%)",
    category: "special",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const Shapes2D = () => {
  const [selectedShape, setSelectedShape] = useState<Shape2DData>(shapes2D[0]);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link to="/lines" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Lines
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            2D <span className="gradient-text">Shapes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore the world of flat geometry from simple circles to complex polygons with complete formulas.
          </p>
        </motion.div>

        {/* Selected Shape Detail */}
        <motion.div
          key={selectedShape.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border p-8 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-shrink-0 p-8 bg-muted/50 rounded-2xl self-center">
              <Shape2D
                type={selectedShape.id}
                size={180}
                color={selectedShape.color}
                strokeColor={selectedShape.color}
              />
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-3xl font-display font-bold mb-2">
                  {selectedShape.name}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {selectedShape.description}
                </p>
              </div>
              
              {/* Formulas Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Area</span>
                  </div>
                  <p className="text-sm font-mono font-semibold text-primary">
                    {selectedShape.area}
                  </p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">Perimeter</span>
                  </div>
                  <p className="text-sm font-mono font-semibold text-secondary">
                    {selectedShape.perimeter}
                  </p>
                </div>
              </div>

              {/* Angle Information */}
              {(selectedShape.interiorAngleSum || selectedShape.eachInteriorAngle) && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {selectedShape.interiorAngleSum && (
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <span className="text-xs text-muted-foreground block mb-1">Sum of Interior ∠</span>
                      <span className="text-sm font-mono font-semibold text-accent-foreground">{selectedShape.interiorAngleSum}</span>
                    </div>
                  )}
                  {selectedShape.exteriorAngleSum && (
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <span className="text-xs text-muted-foreground block mb-1">Sum of Exterior ∠</span>
                      <span className="text-sm font-mono font-semibold text-accent-foreground">{selectedShape.exteriorAngleSum}</span>
                    </div>
                  )}
                  {selectedShape.eachInteriorAngle && (
                    <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                      <span className="text-xs text-muted-foreground block mb-1">Each Interior ∠</span>
                      <span className="text-sm font-mono font-semibold text-success">{selectedShape.eachInteriorAngle}</span>
                    </div>
                  )}
                  {selectedShape.eachExteriorAngle && (
                    <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                      <span className="text-xs text-muted-foreground block mb-1">Each Exterior ∠</span>
                      <span className="text-sm font-mono font-semibold text-success">{selectedShape.eachExteriorAngle}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Additional Info */}
              <div className="grid sm:grid-cols-3 gap-3">
                {selectedShape.diagonals && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <span className="text-xs text-muted-foreground block mb-1">Diagonals</span>
                    <span className="text-sm font-semibold">{selectedShape.diagonals}</span>
                  </div>
                )}
                {selectedShape.symmetryLines && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <span className="text-xs text-muted-foreground block mb-1">Lines of Symmetry</span>
                    <span className="text-sm font-semibold">{selectedShape.symmetryLines}</span>
                  </div>
                )}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <span className="text-xs text-muted-foreground block mb-1">Category</span>
                  <span className="text-sm font-semibold capitalize">{selectedShape.category}</span>
                </div>
              </div>

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

        {/* Polygon Formulas Reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-muted/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <TriangleRight className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-lg">Universal Polygon Formulas (n = number of sides)</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-background rounded-lg">
              <span className="text-muted-foreground block mb-1">Sum of Interior Angles</span>
              <span className="font-mono font-semibold text-primary">(n - 2) × 180°</span>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <span className="text-muted-foreground block mb-1">Each Interior Angle</span>
              <span className="font-mono font-semibold text-primary">((n - 2) × 180°) / n</span>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <span className="text-muted-foreground block mb-1">Sum of Exterior Angles</span>
              <span className="font-mono font-semibold text-secondary">Always 360°</span>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <span className="text-muted-foreground block mb-1">Number of Diagonals</span>
              <span className="font-mono font-semibold text-secondary">n(n - 3) / 2</span>
            </div>
          </div>
        </motion.div>

        {/* Shape Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4"
        >
          {shapes2D.map((shape) => (
            <motion.button
              key={shape.id}
              variants={item}
              onClick={() => setSelectedShape(shape)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${
                selectedShape.id === shape.id
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <Shape2D
                type={shape.id}
                size={60}
                color={shape.color}
                strokeColor={shape.color}
              />
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
          <Link to="/lines">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Lines
            </Button>
          </Link>
          <Link to="/shapes-3d">
            <Button className="gap-2 gradient-bg">
              3D Shapes
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Shapes2D;