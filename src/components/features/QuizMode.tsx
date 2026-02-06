import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trophy,
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

type QuestionType = "identify" | "property" | "formula";

interface Question {
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export function QuizMode({ open, onOpenChange, items, type }: QuizModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const questions: Question[] = useMemo(() => {
    if (items.length < 4) return [];

    const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, 10);

    return shuffled.map((item) => {
      const questionTypes: QuestionType[] = ["identify", "property"];
      if (item.formula) questionTypes.push("formula");

      const qType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      const otherItems = items.filter((i) => i.id !== item.id);
      const wrongAnswers = otherItems
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((i) => i.name);

      let question: Question;

      switch (qType) {
        case "property":
          const property = item.properties[Math.floor(Math.random() * item.properties.length)];
          question = {
            type: "property",
            question: `Which ${type === "lines" ? "concept" : "shape"} has this property: "${property}"?`,
            options: [item.name, ...wrongAnswers].sort(() => Math.random() - 0.5),
            correctAnswer: item.name,
            explanation: `${item.name} has the property: ${property}`,
          };
          break;
        case "formula":
          question = {
            type: "formula",
            question: `Which ${type === "lines" ? "concept" : "shape"} has this formula: ${item.formula}?`,
            options: [item.name, ...wrongAnswers].sort(() => Math.random() - 0.5),
            correctAnswer: item.name,
            explanation: `The formula ${item.formula} belongs to ${item.name}`,
          };
          break;
        default:
          const desc = item.properties.slice(0, 2).join(", ");
          question = {
            type: "identify",
            question: `Identify: ${desc}`,
            options: [item.name, ...wrongAnswers].sort(() => Math.random() - 0.5),
            correctAnswer: item.name,
            explanation: `This describes ${item.name}`,
          };
      }

      return question;
    });
  }, [items, type]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === currentQuestion?.correctAnswer) {
      setScore((prev) => prev + 1);
    }
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
  };

  const handleClose = () => {
    handleRestart();
    onOpenChange(false);
  };

  if (questions.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz Mode</DialogTitle>
          </DialogHeader>
          <p className="text-center text-muted-foreground py-8">
            Not enough items for a quiz. Add more {type === "lines" ? "concepts" : "shapes"} to start.
          </p>
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
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {quizComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8 space-y-4"
            >
              <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
              <h3 className="text-2xl font-bold">Quiz Complete!</h3>
              <p className="text-lg">
                You scored{" "}
                <span className="font-bold text-primary">
                  {score}/{questions.length}
                </span>
              </p>
              <p className="text-muted-foreground">
                {score === questions.length
                  ? "Perfect! You're a geometry master! 🎉"
                  : score >= questions.length * 0.7
                  ? "Great job! Keep practicing! 👏"
                  : "Keep learning, you'll get better! 💪"}
              </p>
              <div className="flex gap-2 justify-center pt-4">
                <Button onClick={handleRestart} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </Button>
                <Button onClick={handleClose}>Done</Button>
              </div>
            </motion.div>
          ) : currentQuestion ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    Question {currentIndex + 1} of {questions.length}
                  </span>
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

                  if (showResult) {
                    if (isCorrect) variant = "default";
                    else if (isSelected) variant = "destructive";
                  }

                  return (
                    <Button
                      key={option}
                      variant={variant}
                      className={`justify-start h-auto py-3 px-4 text-left ${
                        showResult && isCorrect
                          ? "bg-green-500 hover:bg-green-500 text-white"
                          : ""
                      }`}
                      onClick={() => !showResult && handleAnswer(option)}
                      disabled={showResult}
                    >
                      <span className="flex items-center gap-2">
                        {showResult && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 shrink-0" />
                        )}
                        {option}
                      </span>
                    </Button>
                  );
                })}
              </div>

              {!showResult && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHint(true)}
                  className="gap-2"
                  disabled={showHint}
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? "Hint shown above" : "Show Hint"}
                </Button>
              )}

              {showHint && !showResult && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-lg"
                >
                  💡 Look for unique characteristics that only one answer has.
                </motion.p>
              )}

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <p
                    className={`text-sm p-3 rounded-lg ${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {selectedAnswer === currentQuestion.correctAnswer
                      ? "✓ Correct!"
                      : `✗ Wrong. ${currentQuestion.explanation}`}
                  </p>

                  <Button onClick={handleNext} className="w-full gap-2">
                    {currentIndex < questions.length - 1 ? (
                      <>
                        Next Question
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        See Results
                        <Trophy className="w-4 h-4" />
                      </>
                    )}
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
