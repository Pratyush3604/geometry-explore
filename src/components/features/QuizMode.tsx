import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, Lightbulb, Zap, Flame, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface QuizItem {
  id: string;
  name: string;
  properties: string[];
  category: string;
  formula?: string;
}

interface QuizModeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: QuizItem[];
  type: "lines" | "2d" | "3d";
}

type Difficulty = "easy" | "medium" | "hard";
type QuestionType = "identify" | "property" | "formula";

interface Question {
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

function generateQuestions(items: QuizItem[], type: string, difficulty: Difficulty): Question[] {
  if (items.length < 4) return [];
  const count = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 15;
  const optionCount = difficulty === "easy" ? 3 : 4;
  const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, count);

  return shuffled.map((item) => {
    const questionTypes: QuestionType[] = difficulty === "easy" ? ["identify"] : ["identify", "property"];
    if (item.formula && difficulty !== "easy") questionTypes.push("formula");
    const qType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const wrongAnswers = items.filter((i) => i.id !== item.id).sort(() => Math.random() - 0.5).slice(0, optionCount - 1).map((i) => i.name);

    switch (qType) {
      case "property": {
        const property = item.properties[Math.floor(Math.random() * item.properties.length)];
        return {
          type: "property",
          question: `Which ${type === "lines" ? "concept" : "shape"} has this property: "${property}"?`,
          options: [item.name, ...wrongAnswers].sort(() => Math.random() - 0.5),
          correctAnswer: item.name,
          explanation: `${item.name} has the property: ${property}`,
        };
      }
      case "formula":
        return {
          type: "formula",
          question: `Which ${type === "lines" ? "concept" : "shape"} has this formula: ${item.formula}?`,
          options: [item.name, ...wrongAnswers].sort(() => Math.random() - 0.5),
          correctAnswer: item.name,
          explanation: `The formula ${item.formula} belongs to ${item.name}`,
        };
      default: {
        const desc = item.properties.slice(0, difficulty === "hard" ? 1 : 2).join(", ");
        return {
          type: "identify",
          question: difficulty === "hard" ? `Which ${type === "lines" ? "concept" : "shape"} is described by: "${desc}"?` : `Identify: ${desc}`,
          options: [item.name, ...wrongAnswers].sort(() => Math.random() - 0.5),
          correctAnswer: item.name,
          explanation: `This describes ${item.name}`,
        };
      }
    }
  });
}

const difficultyConfig = {
  easy: { label: "Easy", icon: Zap, color: "text-green-500", desc: "3 options, basic questions" },
  medium: { label: "Medium", icon: Flame, color: "text-yellow-500", desc: "4 options, properties & formulas" },
  hard: { label: "Hard", icon: GraduationCap, color: "text-red-500", desc: "4 options, fewer hints, more questions" },
};

export function QuizMode({ open, onOpenChange, items, type }: QuizModeProps) {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const questions = useMemo(() => {
    if (!difficulty) return [];
    return generateQuestions(items, type, difficulty);
  }, [items, type, difficulty]);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === currentQuestion?.correctAnswer) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
    setShowHint(false);
    setDifficulty(null);
  };

  const handleClose = () => { handleRestart(); onOpenChange(false); };

  if (items.length < 4) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent><DialogHeader><DialogTitle>Quiz Mode</DialogTitle></DialogHeader>
          <p className="text-center text-muted-foreground py-8">Not enough items for a quiz. Add more {type === "lines" ? "concepts" : "shapes"} to start.</p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Geometry Quiz
            {difficulty && <span className={`text-sm font-normal ${difficultyConfig[difficulty].color}`}>({difficultyConfig[difficulty].label})</span>}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!difficulty ? (
            <motion.div key="difficulty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 py-4">
              <p className="text-center text-muted-foreground">Choose your difficulty level</p>
              <div className="grid gap-3">
                {(Object.entries(difficultyConfig) as [Difficulty, typeof difficultyConfig.easy][]).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <Button key={key} variant="outline" className="h-auto py-4 px-4 justify-start gap-3" onClick={() => setDifficulty(key)}>
                      <Icon className={`w-6 h-6 ${config.color}`} />
                      <div className="text-left">
                        <div className="font-semibold">{config.label}</div>
                        <div className="text-xs text-muted-foreground">{config.desc}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          ) : quizComplete ? (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center py-8 space-y-4">
              <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
              <h3 className="text-2xl font-bold">Quiz Complete!</h3>
              <p className="text-lg">You scored <span className="font-bold text-primary">{score}/{questions.length}</span></p>
              <p className="text-muted-foreground">
                {score === questions.length ? "Perfect! You're a geometry master! 🎉" : score >= questions.length * 0.7 ? "Great job! Keep practicing! 👏" : "Keep learning, you'll get better! 💪"}
              </p>
              <div className="flex gap-2 justify-center pt-4">
                <Button onClick={handleRestart} variant="outline" className="gap-2"><RotateCcw className="w-4 h-4" />Try Again</Button>
                <Button onClick={handleClose}>Done</Button>
              </div>
            </motion.div>
          ) : currentQuestion ? (
            <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Question {currentIndex + 1} of {questions.length}</span>
                  <span>Score: {score}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <p className="text-lg font-medium">{currentQuestion.question}</p>
              <div className="grid gap-2">
                {currentQuestion.options.map((option) => {
                  const isCorrect = option === currentQuestion.correctAnswer;
                  const isSelected = option === selectedAnswer;
                  let variant: "default" | "outline" | "secondary" | "destructive" = "outline";
                  if (showResult) { if (isCorrect) variant = "default"; else if (isSelected) variant = "destructive"; }
                  return (
                    <Button key={option} variant={variant} className={`justify-start h-auto py-3 px-4 text-left ${showResult && isCorrect ? "bg-green-500 hover:bg-green-500 text-white" : ""}`} onClick={() => !showResult && handleAnswer(option)} disabled={showResult}>
                      <span className="flex items-center gap-2">
                        {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 shrink-0" />}
                        {option}
                      </span>
                    </Button>
                  );
                })}
              </div>
              {!showResult && difficulty !== "hard" && (
                <Button variant="ghost" size="sm" onClick={() => setShowHint(true)} className="gap-2" disabled={showHint}>
                  <Lightbulb className="w-4 h-4" />{showHint ? "Hint shown above" : "Show Hint"}
                </Button>
              )}
              {showHint && !showResult && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-lg">
                  💡 Look for unique characteristics that only one answer has.
                </motion.p>
              )}
              {showResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <p className={`text-sm p-3 rounded-lg ${selectedAnswer === currentQuestion.correctAnswer ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-500/10 text-red-600 dark:text-red-400"}`}>
                    {selectedAnswer === currentQuestion.correctAnswer ? "✓ Correct!" : `✗ Wrong. ${currentQuestion.explanation}`}
                  </p>
                  <Button onClick={handleNext} className="w-full gap-2">
                    {currentIndex < questions.length - 1 ? (<>Next Question<ArrowRight className="w-4 h-4" /></>) : (<>See Results<Trophy className="w-4 h-4" /></>)}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
