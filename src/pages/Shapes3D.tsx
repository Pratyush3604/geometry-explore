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
import { shapes3D, categories3D, type Shape3DData } from "@/data/shapes3DData";

const Shape3DViewer = lazy(() => import("@/components/3d/Shape3DViewer").then(m => ({ default: m.Shape3DViewer })));

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