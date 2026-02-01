import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { LineVisualization } from "@/components/shapes/LineVisualization";
import { ArrowLeft, ArrowRight, Info, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

interface LineConcept {
  id: string;
  name: string;
  description: string;
  formula: string;
  properties: string[];
  realWorldExample: string;
  color: string;
  category: string;
}

const linesConcepts: LineConcept[] = [
  // Basic Elements
  {
    id: "point",
    name: "Point",
    description: "A point represents an exact location in space. It has no size, only position. Named with capital letters.",
    formula: "Notation: P or (x, y)",
    properties: ["Zero dimensions", "No length, width, or height", "Fundamental building block", "Represented by a dot"],
    realWorldExample: "A location on a map, a pixel on a screen",
    color: "#8b5cf6",
    category: "basic",
  },
  {
    id: "line",
    name: "Line",
    description: "A line extends infinitely in both directions. It has no endpoints and infinite length. Defined by any two points on it.",
    formula: "y = mx + b (slope-intercept)",
    properties: ["One dimension", "Infinite length", "No thickness", "Named by two points: AB"],
    realWorldExample: "The horizon, railroad tracks extending forever",
    color: "#8b5cf6",
    category: "basic",
  },
  {
    id: "ray",
    name: "Ray",
    description: "A ray has one endpoint and extends infinitely in one direction. Light travels as rays from a source.",
    formula: "Notation: AB→ (starts at A)",
    properties: ["One endpoint", "Infinite in one direction", "Half of a line", "Direction matters"],
    realWorldExample: "A flashlight beam, sun rays",
    color: "#06b6d4",
    category: "basic",
  },
  {
    id: "segment",
    name: "Line Segment",
    description: "A line segment has two endpoints and a definite, measurable length. The most common line type in real life.",
    formula: "Length = √((x₂-x₁)² + (y₂-y₁)²)",
    properties: ["Two endpoints", "Finite length", "Can be measured", "Notation: AB̄"],
    realWorldExample: "The edge of a table, a ruler",
    color: "#ec4899",
    category: "basic",
  },
  {
    id: "midpoint",
    name: "Midpoint",
    description: "The point that divides a line segment into two equal parts. Equidistant from both endpoints.",
    formula: "M = ((x₁+x₂)/2, (y₁+y₂)/2)",
    properties: ["Divides segment in half", "Equidistant from endpoints", "Unique for each segment", "Center point"],
    realWorldExample: "Center of a bridge, middle of a road",
    color: "#8b5cf6",
    category: "basic",
  },

  // Line Relationships
  {
    id: "parallel",
    name: "Parallel Lines",
    description: "Two lines that never intersect, maintaining equal distance forever. They have the same slope.",
    formula: "m₁ = m₂ (equal slopes)",
    properties: ["Never intersect", "Same slope", "Equal distance apart", "Symbol: ∥"],
    realWorldExample: "Railroad tracks, lines on notebook paper",
    color: "#8b5cf6",
    category: "relationships",
  },
  {
    id: "perpendicular",
    name: "Perpendicular Lines",
    description: "Two lines that intersect at a 90° right angle. Their slopes are negative reciprocals.",
    formula: "m₁ × m₂ = -1",
    properties: ["Intersect at 90°", "Slopes are negative reciprocals", "Form right angles", "Symbol: ⊥"],
    realWorldExample: "Corner of a room, cross streets",
    color: "#8b5cf6",
    category: "relationships",
  },
  {
    id: "intersecting",
    name: "Intersecting Lines",
    description: "Two lines that cross at exactly one point. They create two pairs of vertical angles.",
    formula: "Point of intersection: solve system",
    properties: ["Cross at one point", "Create 4 angles", "Different slopes", "Form vertical angles"],
    realWorldExample: "Crossroads, scissors",
    color: "#8b5cf6",
    category: "relationships",
  },
  {
    id: "transversal",
    name: "Transversal",
    description: "A line that intersects two or more lines at distinct points. Creates 8 angles with two parallel lines.",
    formula: "Creates corresponding, alternate, and co-interior angles",
    properties: ["Intersects multiple lines", "Creates 8 angles with parallels", "Key to angle theorems", "Bridge between lines"],
    realWorldExample: "A road crossing train tracks",
    color: "#10b981",
    category: "relationships",
  },

  // Basic Angles
  {
    id: "angle-acute",
    name: "Acute Angle",
    description: "An angle measuring less than 90 degrees. Sharp and pointed, like the tip of a needle.",
    formula: "0° < θ < 90°",
    properties: ["Less than 90°", "Sharp appearance", "Sum in acute triangle: 180°", "All angles in equilateral triangle"],
    realWorldExample: "Pizza slice, tent roof",
    color: "#8b5cf6",
    category: "angles",
  },
  {
    id: "angle-right",
    name: "Right Angle",
    description: "An angle measuring exactly 90 degrees. The most important angle in construction and design.",
    formula: "θ = 90°",
    properties: ["Exactly 90°", "Marked with small square", "Perpendicular lines", "L-shape"],
    realWorldExample: "Corner of a book, wall meeting floor",
    color: "#8b5cf6",
    category: "angles",
  },
  {
    id: "angle-obtuse",
    name: "Obtuse Angle",
    description: "An angle measuring more than 90 but less than 180 degrees. Wider than a right angle.",
    formula: "90° < θ < 180°",
    properties: ["Between 90° and 180°", "Wider than right angle", "One per obtuse triangle", "Blunt appearance"],
    realWorldExample: "Reclining chair, open book",
    color: "#8b5cf6",
    category: "angles",
  },
  {
    id: "angle-straight",
    name: "Straight Angle",
    description: "An angle measuring exactly 180 degrees, forming a straight line. Half of a full rotation.",
    formula: "θ = 180°",
    properties: ["Exactly 180°", "Forms a line", "Half rotation", "Supplementary to itself"],
    realWorldExample: "Flat surface, horizon line",
    color: "#f59e0b",
    category: "angles",
  },
  {
    id: "angle-reflex",
    name: "Reflex Angle",
    description: "An angle measuring more than 180 but less than 360 degrees. Goes the 'long way' around.",
    formula: "180° < θ < 360°",
    properties: ["Greater than 180°", "Less than 360°", "Reflex = 360° - acute", "Outer angle"],
    realWorldExample: "Clock hands at 8 o'clock (outer angle)",
    color: "#ef4444",
    category: "angles",
  },

  // Angle Pairs
  {
    id: "complementary",
    name: "Complementary Angles",
    description: "Two angles whose measures sum to exactly 90 degrees. They 'complete' a right angle.",
    formula: "∠A + ∠B = 90°",
    properties: ["Sum to 90°", "Complete a right angle", "Each is complement of other", "Often adjacent"],
    realWorldExample: "Two angles in a right triangle",
    color: "#06b6d4",
    category: "angle-pairs",
  },
  {
    id: "supplementary",
    name: "Supplementary Angles",
    description: "Two angles whose measures sum to exactly 180 degrees. They form a straight line when adjacent.",
    formula: "∠A + ∠B = 180°",
    properties: ["Sum to 180°", "Form straight line", "Linear pair", "Each is supplement of other"],
    realWorldExample: "Adjacent angles on a straight line",
    color: "#ec4899",
    category: "angle-pairs",
  },
  {
    id: "vertical",
    name: "Vertical Angles",
    description: "Two non-adjacent angles formed by intersecting lines. They are always equal (congruent).",
    formula: "∠1 = ∠3, ∠2 = ∠4",
    properties: ["Always equal", "Opposite each other", "Formed by intersection", "Also called vertically opposite"],
    realWorldExample: "X-pattern, scissors opening",
    color: "#8b5cf6",
    category: "angle-pairs",
  },
  {
    id: "corresponding",
    name: "Corresponding Angles",
    description: "Angles in the same position at each intersection when a transversal crosses parallel lines. They are equal.",
    formula: "∠1 = ∠5 (if lines parallel)",
    properties: ["Same position", "Equal if parallel", "On same side of transversal", "One interior, one exterior"],
    realWorldExample: "Steps on an escalator",
    color: "#10b981",
    category: "angle-pairs",
  },
  {
    id: "alternate-interior",
    name: "Alternate Interior Angles",
    description: "Angles on opposite sides of a transversal, between the parallel lines. Equal when lines are parallel.",
    formula: "∠3 = ∠6 (if lines parallel)",
    properties: ["Between the lines", "Opposite sides", "Equal if parallel", "Form Z-pattern"],
    realWorldExample: "Z-shaped metal brackets",
    color: "#f59e0b",
    category: "angle-pairs",
  },

  // Special Lines
  {
    id: "bisector",
    name: "Angle Bisector",
    description: "A ray that divides an angle into two equal parts. Every point on it is equidistant from the sides.",
    formula: "∠BAD = ∠DAC = ½∠BAC",
    properties: ["Divides angle in half", "Creates two equal angles", "Locus property", "Incenter uses three bisectors"],
    realWorldExample: "Folding paper corner to corner",
    color: "#8b5cf6",
    category: "special",
  },
  {
    id: "perpendicular-bisector",
    name: "Perpendicular Bisector",
    description: "A line that passes through the midpoint of a segment at 90 degrees. Every point on it is equidistant from both endpoints.",
    formula: "Passes through M, perpendicular to AB",
    properties: ["Through midpoint", "Perpendicular to segment", "Equidistant locus", "Circumcenter uses three"],
    realWorldExample: "Center line of a football field",
    color: "#ec4899",
    category: "special",
  },
];

const categories = [
  { id: "basic", name: "Basic Elements" },
  { id: "relationships", name: "Line Relationships" },
  { id: "angles", name: "Types of Angles" },
  { id: "angle-pairs", name: "Angle Pairs" },
  { id: "special", name: "Special Lines" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Lines = () => {
  const [selectedConcept, setSelectedConcept] = useState<LineConcept>(linesConcepts[0]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredConcepts = activeCategory 
    ? linesConcepts.filter(c => c.category === activeCategory)
    : linesConcepts;

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Lines & <span className="gradient-text">Angles</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Master the fundamentals of geometry with interactive visualizations 
            of lines, rays, segments, and all types of angles.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(null)}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Concept List */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2"
          >
            {filteredConcepts.map((concept) => (
              <motion.button
                key={concept.id}
                variants={item}
                onClick={() => setSelectedConcept(concept)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedConcept.id === concept.id
                    ? "bg-primary/10 border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-semibold ${selectedConcept.id === concept.id ? "text-primary" : ""}`}>
                    {concept.name}
                  </h3>
                  <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground capitalize">
                    {concept.category.replace("-", " ")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{concept.description}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Detail View */}
          <motion.div
            key={selectedConcept.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-3xl border border-border p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 p-6 bg-muted/50 rounded-2xl self-center">
                  <LineVisualization
                    type={selectedConcept.id}
                    size={180}
                    color={selectedConcept.color}
                  />
                </div>

                <div className="flex-1 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-3xl font-display font-bold">
                        {selectedConcept.name}
                      </h2>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                        {selectedConcept.category.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {selectedConcept.description}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <span className="text-sm text-muted-foreground">Formula / Notation</span>
                    <p className="text-lg font-mono font-semibold text-primary mt-1">
                      {selectedConcept.formula}
                    </p>
                  </div>

                  {/* Properties */}
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Key Properties</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedConcept.properties.map((prop, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 bg-background rounded-full border border-border">
                          {prop}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Real World Example */}
                  <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-secondary" />
                      <span className="text-sm text-muted-foreground">Real World Example</span>
                    </div>
                    <p className="text-sm font-medium text-secondary">
                      {selectedConcept.realWorldExample}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-muted/30 rounded-2xl p-6 mt-12"
        >
          <h3 className="font-display font-bold text-lg mb-4">Quick Angle Reference</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
            <div className="p-3 bg-background rounded-lg text-center">
              <span className="text-muted-foreground block mb-1">Acute</span>
              <span className="font-mono font-semibold text-primary">0° &lt; θ &lt; 90°</span>
            </div>
            <div className="p-3 bg-background rounded-lg text-center">
              <span className="text-muted-foreground block mb-1">Right</span>
              <span className="font-mono font-semibold text-primary">θ = 90°</span>
            </div>
            <div className="p-3 bg-background rounded-lg text-center">
              <span className="text-muted-foreground block mb-1">Obtuse</span>
              <span className="font-mono font-semibold text-primary">90° &lt; θ &lt; 180°</span>
            </div>
            <div className="p-3 bg-background rounded-lg text-center">
              <span className="text-muted-foreground block mb-1">Straight</span>
              <span className="font-mono font-semibold text-primary">θ = 180°</span>
            </div>
            <div className="p-3 bg-background rounded-lg text-center">
              <span className="text-muted-foreground block mb-1">Reflex</span>
              <span className="font-mono font-semibold text-primary">180° &lt; θ &lt; 360°</span>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between mt-12"
        >
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Home
            </Button>
          </Link>
          <Link to="/shapes-2d">
            <Button className="gap-2 gradient-bg">
              2D Shapes
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Lines;