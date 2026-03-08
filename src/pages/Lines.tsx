import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { LineVisualization } from "@/components/shapes/LineVisualization";
import { ArrowLeft, ArrowRight, Info, BookOpen, Brain, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { SearchBar } from "@/components/features/SearchBar";
import { ProgressStats } from "@/components/features/ProgressStats";
import { ShapeActions } from "@/components/features/ShapeActions";
import { QuizMode } from "@/components/features/QuizMode";
import { useGeometryProgress } from "@/hooks/useGeometryProgress";
import { linesConcepts, linesCategories, type LineConcept } from "@/data/linesData";

const categories = linesCategories;

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [filterMode, setFilterMode] = useState<"all" | "learned" | "favorites">("all");

  const { toggleLearned, toggleFavorite, isLearned, isFavorite, learnedCount, favoritesCount } = useGeometryProgress();

  const filteredConcepts = useMemo(() => {
    let concepts = linesConcepts;
    
    if (activeCategory) {
      concepts = concepts.filter(c => c.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      concepts = concepts.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.properties.some(p => p.toLowerCase().includes(query))
      );
    }

    if (filterMode === "learned") {
      concepts = concepts.filter(c => isLearned(`line-${c.id}`));
    } else if (filterMode === "favorites") {
      concepts = concepts.filter(c => isFavorite(`line-${c.id}`));
    }
    
    return concepts;
  }, [activeCategory, searchQuery, filterMode, isLearned, isFavorite]);

  const quizItems = linesConcepts.map(c => ({
    id: c.id,
    name: c.name,
    properties: c.properties,
    category: c.category,
    formula: c.formula,
  }));

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                Lines & <span className="gradient-text">Angles</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Master the fundamentals of geometry with interactive visualizations.
              </p>
            </div>
            <Button onClick={() => setShowQuiz(true)} className="gap-2 shrink-0">
              <Brain className="w-4 h-4" />
              Start Quiz
            </Button>
          </div>

          <ProgressStats 
            learnedCount={learnedCount} 
            favoritesCount={favoritesCount} 
            totalCount={linesConcepts.length} 
          />
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 mb-8"
        >
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search concepts..." 
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

            <div className="flex items-center gap-1">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Category:</span>
              <Button
                variant={activeCategory === null ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(null)}
              >
                All
              </Button>
              {categories.map((cat) => (
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
          type="lines" 
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Concept List */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2"
          >
            {filteredConcepts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No concepts found matching your criteria.
              </div>
            ) : filteredConcepts.map((concept) => (
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
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold ${selectedConcept.id === concept.id ? "text-primary" : ""}`}>
                      {concept.name}
                    </h3>
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground capitalize">
                      {concept.category.replace("-", " ")}
                    </span>
                  </div>
                  <ShapeActions
                    isLearned={isLearned(`line-${concept.id}`)}
                    isFavorite={isFavorite(`line-${concept.id}`)}
                    onToggleLearned={() => toggleLearned(`line-${concept.id}`)}
                    onToggleFavorite={() => toggleFavorite(`line-${concept.id}`)}
                  />
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