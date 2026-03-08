import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Shape2D } from "@/components/shapes/Shape2D";
import { ArrowLeft, ArrowRight, Calculator, Ruler, TriangleRight, Info, Brain, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { SearchBar } from "@/components/features/SearchBar";
import { ProgressStats } from "@/components/features/ProgressStats";
import { ShapeActions } from "@/components/features/ShapeActions";
import { QuizMode } from "@/components/features/QuizMode";
import { FormulaCalculator } from "@/components/features/FormulaCalculator";
import { useGeometryProgress } from "@/hooks/useGeometryProgress";
import { shapes2D, categories2D, type Shape2DData } from "@/data/shapes2DData";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorShape, setCalculatorShape] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<"all" | "learned" | "favorites">("all");

  const { toggleLearned, toggleFavorite, isLearned, isFavorite, learnedCount, favoritesCount } = useGeometryProgress();

  const filteredShapes = useMemo(() => {
    let shapes = shapes2D;
    
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
      shapes = shapes.filter(s => isLearned(`2d-${s.id}`));
    } else if (filterMode === "favorites") {
      shapes = shapes.filter(s => isFavorite(`2d-${s.id}`));
    }
    
    return shapes;
  }, [activeCategory, searchQuery, filterMode, isLearned, isFavorite]);

  const quizItems = shapes2D.map(s => ({
    id: s.id,
    name: s.name,
    properties: s.properties,
    category: s.category,
    formula: s.area,
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
          <Link to="/lines" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Lines
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                2D <span className="gradient-text">Shapes</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Explore flat geometry from circles to complex polygons with complete formulas.
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
            totalCount={shapes2D.length} 
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
            placeholder="Search 2D shapes..." 
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
              {categories2D.map((cat) => (
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
        </motion.div>

        <QuizMode 
          open={showQuiz} 
          onOpenChange={setShowQuiz} 
          items={quizItems} 
          type="2d" 
        />

        <FormulaCalculator
          open={showCalculator}
          onOpenChange={setShowCalculator}
          shapeName={calculatorShape}
          shapeType="2d"
        />

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
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-display font-bold mb-2">
                    {selectedShape.name}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {selectedShape.description}
                  </p>
                </div>
                <ShapeActions
                  isLearned={isLearned(`2d-${selectedShape.id}`)}
                  isFavorite={isFavorite(`2d-${selectedShape.id}`)}
                  onToggleLearned={() => toggleLearned(`2d-${selectedShape.id}`)}
                  onToggleFavorite={() => toggleFavorite(`2d-${selectedShape.id}`)}
                  showCalculator
                  onOpenCalculator={() => openCalculator(selectedShape.name)}
                />
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
              {(isLearned(`2d-${shape.id}`) || isFavorite(`2d-${shape.id}`)) && (
                <div className="absolute top-1 right-1 flex gap-0.5">
                  {isLearned(`2d-${shape.id}`) && (
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  )}
                  {isFavorite(`2d-${shape.id}`) && (
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  )}
                </div>
              )}
              <Shape2D
                type={shape.id}
                size={50}
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