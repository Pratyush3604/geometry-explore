import { motion } from "framer-motion";
import { Box, Hexagon, Triangle, Circle } from "lucide-react";

interface Hero3DAnimationProps {
  className?: string;
}

export function Hero3DAnimation({ className = "" }: Hero3DAnimationProps) {
  return (
    <div className={`relative w-full h-[300px] rounded-2xl overflow-hidden bg-muted/30 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central rotating shape */}
        <motion.div
          animate={{ 
            rotateY: 360,
            rotateX: 360,
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="relative w-32 h-32"
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl gradient-bg opacity-80"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        
        {/* Orbiting shapes */}
        <motion.div
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ width: 250, height: 250 }}
        >
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 p-3 rounded-xl bg-primary/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <Box className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ width: 180, height: 180 }}
        >
          <motion.div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 p-3 rounded-xl bg-secondary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <Hexagon className="w-6 h-6 text-secondary" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ width: 120, height: 120 }}
        >
          <motion.div 
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-accent/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Triangle className="w-5 h-5 text-accent" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ width: 200, height: 200 }}
        >
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-success/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <Circle className="w-5 h-5 text-success" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
