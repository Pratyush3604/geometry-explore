import { motion } from "framer-motion";
import { CheckCircle2, Circle, Star, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ShapeActionsProps {
  isLearned: boolean;
  isFavorite: boolean;
  onToggleLearned: () => void;
  onToggleFavorite: () => void;
  onOpenCalculator?: () => void;
  showCalculator?: boolean;
}

export function ShapeActions({
  isLearned,
  isFavorite,
  onToggleLearned,
  onToggleFavorite,
  onOpenCalculator,
  showCalculator = false,
}: ShapeActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLearned();
            }}
            className="h-8 w-8"
          >
            <motion.div
              initial={false}
              animate={{ scale: isLearned ? [1, 1.2, 1] : 1 }}
            >
              {isLearned ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <Circle className="w-4 h-4 text-muted-foreground" />
              )}
            </motion.div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isLearned ? "Mark as not learned" : "Mark as learned"}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="h-8 w-8"
          >
            <motion.div
              initial={false}
              animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}
            >
              <Star
                className={`w-4 h-4 ${
                  isFavorite
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-muted-foreground"
                }`}
              />
            </motion.div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </TooltipContent>
      </Tooltip>

      {showCalculator && onOpenCalculator && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCalculator();
              }}
              className="h-8 w-8"
            >
              <Calculator className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open calculator</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
