import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Shape2D } from "@/components/shapes/Shape2D";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const shapes2D = [
  {
    id: "circle",
    name: "Circle",
    description: "A perfectly round shape where all points are equidistant from the center.",
    formula: "Area = πr², Circumference = 2πr",
    properties: ["No sides", "No vertices", "360° total"],
    color: "hsl(259 85% 65%)",
  },
  {
    id: "ellipse",
    name: "Ellipse",
    description: "An oval shape with two focal points. The sum of distances from any point to both foci is constant.",
    formula: "Area = πab",
    properties: ["Two axes", "Two foci", "Smooth curve"],
    color: "hsl(330 85% 65%)",
  },
  {
    id: "semicircle",
    name: "Semicircle",
    description: "Half of a circle, bounded by a diameter and half the circumference.",
    formula: "Area = ½πr²",
    properties: ["One curved edge", "One straight edge", "180° arc"],
    color: "hsl(195 90% 55%)",
  },
  {
    id: "triangle",
    name: "Triangle",
    description: "A three-sided polygon. The simplest polygon with interior angles summing to 180°.",
    formula: "Area = ½ × base × height",
    properties: ["3 sides", "3 vertices", "Interior angles = 180°"],
    color: "hsl(160 70% 45%)",
  },
  {
    id: "equilateral",
    name: "Equilateral Triangle",
    description: "A triangle with all three sides equal and all angles measuring 60°.",
    formula: "Area = (√3/4) × a²",
    properties: ["3 equal sides", "3 equal angles (60°)", "Perfect symmetry"],
    color: "hsl(259 85% 65%)",
  },
  {
    id: "square",
    name: "Square",
    description: "A four-sided regular polygon with equal sides and four right angles.",
    formula: "Area = s², Perimeter = 4s",
    properties: ["4 equal sides", "4 right angles (90°)", "4-fold symmetry"],
    color: "hsl(195 90% 55%)",
  },
  {
    id: "rectangle",
    name: "Rectangle",
    description: "A four-sided polygon with opposite sides equal and four right angles.",
    formula: "Area = l × w, Perimeter = 2(l + w)",
    properties: ["4 sides", "4 right angles", "Opposite sides equal"],
    color: "hsl(330 85% 65%)",
  },
  {
    id: "rhombus",
    name: "Rhombus",
    description: "A parallelogram with all four sides equal. Diagonals bisect each other at right angles.",
    formula: "Area = ½ × d₁ × d₂",
    properties: ["4 equal sides", "Opposite angles equal", "Diagonals bisect at 90°"],
    color: "hsl(160 70% 45%)",
  },
  {
    id: "parallelogram",
    name: "Parallelogram",
    description: "A quadrilateral with opposite sides parallel and equal.",
    formula: "Area = base × height",
    properties: ["Opposite sides parallel", "Opposite angles equal", "Diagonals bisect each other"],
    color: "hsl(259 85% 65%)",
  },
  {
    id: "trapezoid",
    name: "Trapezoid",
    description: "A quadrilateral with exactly one pair of parallel sides.",
    formula: "Area = ½(a + b) × h",
    properties: ["One pair parallel sides", "4 vertices", "Variable angles"],
    color: "hsl(195 90% 55%)",
  },
  {
    id: "pentagon",
    name: "Pentagon",
    description: "A five-sided polygon. Regular pentagons have equal sides and 108° angles.",
    formula: "Area = ¼√(5(5+2√5)) × s²",
    properties: ["5 sides", "5 vertices", "Interior angles = 540°"],
    color: "hsl(330 85% 65%)",
  },
  {
    id: "hexagon",
    name: "Hexagon",
    description: "A six-sided polygon. Found in nature in honeycombs and snowflakes.",
    formula: "Area = (3√3/2) × s²",
    properties: ["6 sides", "6 vertices", "Interior angles = 720°"],
    color: "hsl(160 70% 45%)",
  },
  {
    id: "heptagon",
    name: "Heptagon",
    description: "A seven-sided polygon with interior angles summing to 900°.",
    formula: "Interior angle = 128.57° (regular)",
    properties: ["7 sides", "7 vertices", "Interior angles = 900°"],
    color: "hsl(259 85% 65%)",
  },
  {
    id: "octagon",
    name: "Octagon",
    description: "An eight-sided polygon. Commonly seen in stop signs.",
    formula: "Area = 2(1 + √2) × s²",
    properties: ["8 sides", "8 vertices", "Interior angles = 1080°"],
    color: "hsl(195 90% 55%)",
  },
  {
    id: "nonagon",
    name: "Nonagon",
    description: "A nine-sided polygon with each interior angle measuring 140°.",
    formula: "Interior angle = 140° (regular)",
    properties: ["9 sides", "9 vertices", "Interior angles = 1260°"],
    color: "hsl(330 85% 65%)",
  },
  {
    id: "decagon",
    name: "Decagon",
    description: "A ten-sided polygon with each interior angle measuring 144°.",
    formula: "Interior angle = 144° (regular)",
    properties: ["10 sides", "10 vertices", "Interior angles = 1440°"],
    color: "hsl(160 70% 45%)",
  },
  {
    id: "star",
    name: "5-Point Star",
    description: "A star polygon with five points, created by extending the sides of a pentagon.",
    formula: "Point angle = 36°",
    properties: ["5 points", "10 edges", "Non-convex"],
    color: "hsl(259 85% 65%)",
  },
  {
    id: "star6",
    name: "6-Point Star",
    description: "A hexagram formed by two overlapping equilateral triangles.",
    formula: "Also called Star of David",
    properties: ["6 points", "12 edges", "Two triangles"],
    color: "hsl(195 90% 55%)",
  },
  {
    id: "arrow",
    name: "Arrow",
    description: "A directional shape commonly used to indicate movement or direction.",
    formula: "Composite shape",
    properties: ["7 vertices", "Directional", "Asymmetric"],
    color: "hsl(330 85% 65%)",
  },
  {
    id: "cross",
    name: "Cross",
    description: "A shape with four arms extending from a central point.",
    formula: "12 vertices",
    properties: ["4-fold symmetry", "12 edges", "Convex"],
    color: "hsl(160 70% 45%)",
  },
  {
    id: "heart",
    name: "Heart",
    description: "A symbolic shape representing love and affection.",
    formula: "Curved composite",
    properties: ["Symmetric", "Curved edges", "One vertex"],
    color: "hsl(330 85% 65%)",
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
