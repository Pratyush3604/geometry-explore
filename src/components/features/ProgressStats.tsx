import { motion } from "framer-motion";
import { CheckCircle2, Star, Trophy } from "lucide-react";

interface ProgressStatsProps {
  learnedCount: number;
  favoritesCount: number;
  totalCount: number;
}

export function ProgressStats({ learnedCount, favoritesCount, totalCount }: ProgressStatsProps) {
  const percentage = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 justify-center flex-wrap"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
        <CheckCircle2 className="w-4 h-4" />
        <span className="text-sm font-medium">{learnedCount} learned</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
        <Star className="w-4 h-4 fill-current" />
        <span className="text-sm font-medium">{favoritesCount} favorites</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
        <Trophy className="w-4 h-4" />
        <span className="text-sm font-medium">{percentage}% complete</span>
      </div>
    </motion.div>
  );
}
