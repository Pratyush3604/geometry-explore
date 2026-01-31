import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { LineVisualization } from "@/components/shapes/LineVisualization";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const linesConcepts = [
  {
    id: "point",
    name: "Point",
    description: "A point represents an exact location in space. It has no size, only position.",
    formula: "Notation: P or (x, y)",
    color: "#8b5cf6",
  },
  {
    id: "line",
    name: "Line",
    description: "A line extends infinitely in both directions. It has no endpoints.",
    formula: "↔ or AB̅",
    color: "#8b5cf6",
  },
  {
    id: "ray",
    name: "Ray",
    description: "A ray has one endpoint and extends infinitely in one direction.",
    formula: "→ or AB⃗",
    color: "#06b6d4",
  },
  {
    id: "segment",
    name: "Line Segment",
    description: "A line segment has two endpoints and a definite length.",
    formula: "AB̅ with length d",
    color: "#ec4899",
  },
  {
    id: "parallel",
    name: "Parallel Lines",
    description: "Two lines that never intersect, maintaining equal distance forever.",
    formula: "l₁ ∥ l₂",
    color: "#8b5cf6",
  },
  {
    id: "perpendicular",
    name: "Perpendicular Lines",
    description: "Two lines that intersect at a 90° right angle.",
    formula: "l₁ ⊥ l₂",
    color: "#8b5cf6",
  },
  {
    id: "intersecting",
    name: "Intersecting Lines",
    description: "Two lines that cross at exactly one point.",
    formula: "l₁ ∩ l₂ = {P}",
    color: "#8b5cf6",
  },
  {
    id: "angle-acute",
    name: "Acute Angle",
    description: "An angle measuring less than 90 degrees.",
    formula: "0° < θ < 90°",
    color: "#8b5cf6",
  },
  {
    id: "angle-right",
    name: "Right Angle",
    description: "An angle measuring exactly 90 degrees.",
    formula: "θ = 90°",
    color: "#8b5cf6",
  },
  {
    id: "angle-obtuse",
    name: "Obtuse Angle",
    description: "An angle measuring more than 90 but less than 180 degrees.",
    formula: "90° < θ < 180°",
    color: "#8b5cf6",
  },
  {
    id: "midpoint",
    name: "Midpoint",
    description: "The point that divides a line segment into two equal parts.",
    formula: "M = ((x₁+x₂)/2, (y₁+y₂)/2)",
    color: "#8b5cf6",
  },
  {
    id: "bisector",
    name: "Angle Bisector",
    description: "A ray that divides an angle into two equal parts.",
    formula: "∠BAD = ∠DAC",
    color: "#8b5cf6",
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Lines = () => {
  const [selectedConcept, setSelectedConcept] = useState(linesConcepts[0]);

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
            Lines & <span className="gradient-text">Points</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Master the fundamentals of geometry with interactive visualizations 
            of lines, rays, segments, and angles.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Concept List */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-1 space-y-3"
          >
            {linesConcepts.map((concept) => (
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
                <h3 className={`font-semibold ${selectedConcept.id === concept.id ? "text-primary" : ""}`}>
                  {concept.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">{concept.description}</p>
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
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 p-6 bg-muted/50 rounded-2xl">
                  <LineVisualization
                    type={selectedConcept.id}
                    size={180}
                    color={selectedConcept.color}
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-display font-bold mb-4">
                    {selectedConcept.name}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {selectedConcept.description}
                  </p>
                  
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <span className="text-sm text-muted-foreground">Formula / Notation</span>
                    <p className="text-lg font-mono font-semibold text-primary mt-1">
                      {selectedConcept.formula}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

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
