import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Shape2D } from "@/components/shapes/Shape2D";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const shapes2D = [
  // Circles & Curves
  {
    id: "circle",
    name: "Circle",
    description: "A perfectly round shape where all points are equidistant from the center.",
    formula: "Area = πr², Circumference = 2πr",
    properties: ["No sides", "No vertices", "360° total"],
    color: "hsl(259 85% 65%)",
    category: "curves",
  },
  {
    id: "ellipse",
    name: "Ellipse",
    description: "An oval shape with two focal points. The sum of distances from any point to both foci is constant.",
    formula: "Area = πab",
    properties: ["Two axes", "Two foci", "Smooth curve"],
    color: "hsl(330 85% 65%)",
    category: "curves",
  },
  {
    id: "semicircle",
    name: "Semicircle",
    description: "Half of a circle, bounded by a diameter and half the circumference.",
    formula: "Area = ½πr²",
    properties: ["One curved edge", "One straight edge", "180° arc"],
    color: "hsl(195 90% 55%)",
    category: "curves",
  },
  {
    id: "quarter-circle",
    name: "Quarter Circle",
    description: "One quarter of a circle, bounded by two radii and a 90° arc.",
    formula: "Area = ¼πr²",
    properties: ["90° arc", "Two straight edges", "One vertex"],
    color: "hsl(160 70% 45%)",
    category: "curves",
  },
  {
    id: "annulus",
    name: "Annulus (Ring)",
    description: "The region between two concentric circles.",
    formula: "Area = π(R² - r²)",
    properties: ["Two circular boundaries", "Donut shape", "No vertices"],
    color: "hsl(35 90% 55%)",
    category: "curves",
  },
  {
    id: "crescent",
    name: "Crescent",
    description: "A curved shape formed by two circular arcs, resembling a moon phase.",
    formula: "Complex area formula",
    properties: ["Two curved edges", "Two cusps", "Asymmetric"],
    color: "hsl(259 85% 65%)",
    category: "curves",
  },
  
  // Triangles
  {
    id: "triangle",
    name: "Scalene Triangle",
    description: "A triangle with all three sides of different lengths and all angles different.",
    formula: "Area = ½ × base × height",
    properties: ["3 sides", "3 vertices", "No equal sides"],
    color: "hsl(160 70% 45%)",
    category: "triangles",
  },
  {
    id: "equilateral",
    name: "Equilateral Triangle",
    description: "A triangle with all three sides equal and all angles measuring 60°.",
    formula: "Area = (√3/4) × a²",
    properties: ["3 equal sides", "3 equal angles (60°)", "Perfect symmetry"],
    color: "hsl(259 85% 65%)",
    category: "triangles",
  },
  {
    id: "isosceles",
    name: "Isosceles Triangle",
    description: "A triangle with two sides of equal length and two equal base angles.",
    formula: "Area = ½ × base × height",
    properties: ["2 equal sides", "2 equal angles", "Line of symmetry"],
    color: "hsl(195 90% 55%)",
    category: "triangles",
  },
  {
    id: "right-triangle",
    name: "Right Triangle",
    description: "A triangle with one 90° angle. Forms the basis of trigonometry.",
    formula: "a² + b² = c² (Pythagorean)",
    properties: ["One 90° angle", "Hypotenuse", "Two legs"],
    color: "hsl(330 85% 65%)",
    category: "triangles",
  },
  {
    id: "obtuse-triangle",
    name: "Obtuse Triangle",
    description: "A triangle with one angle greater than 90°.",
    formula: "Area = ½ × base × height",
    properties: ["One obtuse angle", "Two acute angles", "3 vertices"],
    color: "hsl(35 90% 55%)",
    category: "triangles",
  },
  {
    id: "acute-triangle",
    name: "Acute Triangle",
    description: "A triangle where all three angles are less than 90°.",
    formula: "Area = ½ × base × height",
    properties: ["All angles < 90°", "3 acute angles", "3 vertices"],
    color: "hsl(160 70% 45%)",
    category: "triangles",
  },
  
  // Quadrilaterals
  {
    id: "square",
    name: "Square",
    description: "A four-sided regular polygon with equal sides and four right angles.",
    formula: "Area = s², Perimeter = 4s",
    properties: ["4 equal sides", "4 right angles (90°)", "4-fold symmetry"],
    color: "hsl(195 90% 55%)",
    category: "quadrilaterals",
  },
  {
    id: "rectangle",
    name: "Rectangle",
    description: "A four-sided polygon with opposite sides equal and four right angles.",
    formula: "Area = l × w, Perimeter = 2(l + w)",
    properties: ["4 sides", "4 right angles", "Opposite sides equal"],
    color: "hsl(330 85% 65%)",
    category: "quadrilaterals",
  },
  {
    id: "rhombus",
    name: "Rhombus",
    description: "A parallelogram with all four sides equal. Diagonals bisect each other at right angles.",
    formula: "Area = ½ × d₁ × d₂",
    properties: ["4 equal sides", "Opposite angles equal", "Diagonals bisect at 90°"],
    color: "hsl(160 70% 45%)",
    category: "quadrilaterals",
  },
  {
    id: "parallelogram",
    name: "Parallelogram",
    description: "A quadrilateral with opposite sides parallel and equal.",
    formula: "Area = base × height",
    properties: ["Opposite sides parallel", "Opposite angles equal", "Diagonals bisect each other"],
    color: "hsl(259 85% 65%)",
    category: "quadrilaterals",
  },
  {
    id: "trapezoid",
    name: "Trapezoid",
    description: "A quadrilateral with exactly one pair of parallel sides.",
    formula: "Area = ½(a + b) × h",
    properties: ["One pair parallel sides", "4 vertices", "Variable angles"],
    color: "hsl(195 90% 55%)",
    category: "quadrilaterals",
  },
  {
    id: "kite",
    name: "Kite",
    description: "A quadrilateral with two pairs of adjacent sides that are equal.",
    formula: "Area = ½ × d₁ × d₂",
    properties: ["2 pairs equal adjacent sides", "One line of symmetry", "Perpendicular diagonals"],
    color: "hsl(35 90% 55%)",
    category: "quadrilaterals",
  },
  
  // Regular Polygons (3-12 sides)
  {
    id: "pentagon",
    name: "Pentagon",
    description: "A five-sided polygon. Regular pentagons have equal sides and 108° angles.",
    formula: "Area = ¼√(5(5+2√5)) × s²",
    properties: ["5 sides", "5 vertices", "Interior angles = 540°"],
    color: "hsl(330 85% 65%)",
    category: "polygons",
  },
  {
    id: "hexagon",
    name: "Hexagon",
    description: "A six-sided polygon. Found in nature in honeycombs and snowflakes.",
    formula: "Area = (3√3/2) × s²",
    properties: ["6 sides", "6 vertices", "Interior angles = 720°"],
    color: "hsl(160 70% 45%)",
    category: "polygons",
  },
  {
    id: "heptagon",
    name: "Heptagon",
    description: "A seven-sided polygon with interior angles summing to 900°.",
    formula: "Interior angle = 128.57° (regular)",
    properties: ["7 sides", "7 vertices", "Interior angles = 900°"],
    color: "hsl(259 85% 65%)",
    category: "polygons",
  },
  {
    id: "octagon",
    name: "Octagon",
    description: "An eight-sided polygon. Commonly seen in stop signs.",
    formula: "Area = 2(1 + √2) × s²",
    properties: ["8 sides", "8 vertices", "Interior angles = 1080°"],
    color: "hsl(195 90% 55%)",
    category: "polygons",
  },
  {
    id: "nonagon",
    name: "Nonagon",
    description: "A nine-sided polygon with each interior angle measuring 140°.",
    formula: "Interior angle = 140° (regular)",
    properties: ["9 sides", "9 vertices", "Interior angles = 1260°"],
    color: "hsl(330 85% 65%)",
    category: "polygons",
  },
  {
    id: "decagon",
    name: "Decagon",
    description: "A ten-sided polygon with each interior angle measuring 144°.",
    formula: "Interior angle = 144° (regular)",
    properties: ["10 sides", "10 vertices", "Interior angles = 1440°"],
    color: "hsl(160 70% 45%)",
    category: "polygons",
  },
  {
    id: "hendecagon",
    name: "Hendecagon",
    description: "An eleven-sided polygon with each interior angle measuring 147.27°.",
    formula: "Interior angle = 147.27° (regular)",
    properties: ["11 sides", "11 vertices", "Interior angles = 1620°"],
    color: "hsl(35 90% 55%)",
    category: "polygons",
  },
  {
    id: "dodecagon",
    name: "Dodecagon",
    description: "A twelve-sided polygon with each interior angle measuring 150°.",
    formula: "Interior angle = 150° (regular)",
    properties: ["12 sides", "12 vertices", "Interior angles = 1800°"],
    color: "hsl(259 85% 65%)",
    category: "polygons",
  },
  
  // Stars & Special Shapes
  {
    id: "star",
    name: "5-Point Star",
    description: "A star polygon with five points, created by extending the sides of a pentagon.",
    formula: "Point angle = 36°",
    properties: ["5 points", "10 edges", "Non-convex"],
    color: "hsl(259 85% 65%)",
    category: "special",
  },
  {
    id: "star6",
    name: "6-Point Star",
    description: "A hexagram formed by two overlapping equilateral triangles.",
    formula: "Also called Star of David",
    properties: ["6 points", "12 edges", "Two triangles"],
    color: "hsl(195 90% 55%)",
    category: "special",
  },
  {
    id: "star8",
    name: "8-Point Star",
    description: "An octagram formed by two overlapping squares.",
    formula: "Two rotated squares",
    properties: ["8 points", "16 edges", "High symmetry"],
    color: "hsl(330 85% 65%)",
    category: "special",
  },
  {
    id: "arrow",
    name: "Arrow",
    description: "A directional shape commonly used to indicate movement or direction.",
    formula: "Composite shape",
    properties: ["7 vertices", "Directional", "Asymmetric"],
    color: "hsl(160 70% 45%)",
    category: "special",
  },
  {
    id: "cross",
    name: "Cross",
    description: "A shape with four arms extending from a central point.",
    formula: "12 vertices",
    properties: ["4-fold symmetry", "12 edges", "Convex"],
    color: "hsl(35 90% 55%)",
    category: "special",
  },
  {
    id: "heart",
    name: "Heart",
    description: "A symbolic shape representing love and affection.",
    formula: "Curved composite",
    properties: ["Symmetric", "Curved edges", "One vertex"],
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
  const [selectedShape, setSelectedShape] = useState(shapes2D[0]);

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
            Explore the world of flat geometry from simple circles to complex polygons.
          </p>
        </motion.div>

        {/* Selected Shape Detail */}
        <motion.div
          key={selectedShape.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0 p-8 bg-muted/50 rounded-2xl">
              <Shape2D
                type={selectedShape.id}
                size={180}
                color={selectedShape.color}
                strokeColor={selectedShape.color}
              />
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-display font-bold mb-4">
                {selectedShape.name}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {selectedShape.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <span className="text-sm text-muted-foreground">Formula</span>
                  <p className="text-sm font-mono font-semibold text-primary mt-1">
                    {selectedShape.formula}
                  </p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/20">
                  <span className="text-sm text-muted-foreground">Properties</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedShape.properties.map((prop, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-secondary/20 rounded-full text-secondary">
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
