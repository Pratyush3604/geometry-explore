import { motion } from "framer-motion";

interface LineVisualizationProps {
  type: string;
  size?: number;
  color?: string;
  className?: string;
}

export function LineVisualization({
  type,
  size = 150,
  color = "hsl(259 85% 65%)",
  className = "",
}: LineVisualizationProps) {
  const strokeWidth = 3;
  
  const renderVisualization = () => {
    switch (type.toLowerCase()) {
      case "line":
        return (
          <>
            <line x1="10" y1={size / 2} x2={size - 10} y2={size / 2} stroke={color} strokeWidth={strokeWidth} />
            <motion.circle cx="10" cy={size / 2} r="4" fill={color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
            <motion.circle cx={size - 10} cy={size / 2} r="4" fill={color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
          </>
        );
      
      case "ray":
        return (
          <>
            <line x1="20" y1={size / 2} x2={size - 10} y2={size / 2} stroke={color} strokeWidth={strokeWidth} />
            <motion.circle cx="20" cy={size / 2} r="5" fill={color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
            <polygon points={`${size - 10},${size / 2} ${size - 25},${size / 2 - 8} ${size - 25},${size / 2 + 8}`} fill={color} />
          </>
        );
      
      case "segment":
        return (
          <>
            <line x1="25" y1={size / 2} x2={size - 25} y2={size / 2} stroke={color} strokeWidth={strokeWidth} />
            <motion.circle cx="25" cy={size / 2} r="6" fill={color} stroke="hsl(var(--background))" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
            <motion.circle cx={size - 25} cy={size / 2} r="6" fill={color} stroke="hsl(var(--background))" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
          </>
        );
      
      case "parallel":
        return (
          <>
            <line x1="15" y1={size * 0.35} x2={size - 15} y2={size * 0.35} stroke={color} strokeWidth={strokeWidth} />
            <line x1="15" y1={size * 0.65} x2={size - 15} y2={size * 0.65} stroke={color} strokeWidth={strokeWidth} />
            <motion.text x={size / 2} y={size * 0.5} fill={color} fontSize="12" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>∥</motion.text>
          </>
        );
      
      case "perpendicular":
        return (
          <>
            <line x1="20" y1={size / 2} x2={size - 20} y2={size / 2} stroke={color} strokeWidth={strokeWidth} />
            <line x1={size / 2} y1="20" x2={size / 2} y2={size - 20} stroke="hsl(195 90% 55%)" strokeWidth={strokeWidth} />
            <rect x={size / 2} y={size / 2} width="12" height="12" fill="none" stroke={color} strokeWidth="1.5" />
          </>
        );
      
      case "intersecting":
        return (
          <>
            <line x1="15" y1="15" x2={size - 15} y2={size - 15} stroke={color} strokeWidth={strokeWidth} />
            <line x1="15" y1={size - 15} x2={size - 15} y2="15" stroke="hsl(330 85% 65%)" strokeWidth={strokeWidth} />
            <motion.circle cx={size / 2} cy={size / 2} r="6" fill="hsl(var(--background))" stroke={color} strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} />
          </>
        );
      
      case "angle-acute":
        return (
          <>
            <line x1="20" y1={size - 25} x2={size - 20} y2={size - 25} stroke={color} strokeWidth={strokeWidth} />
            <line x1="20" y1={size - 25} x2={size * 0.6} y2="25" stroke={color} strokeWidth={strokeWidth} />
            <path d={`M 50,${size - 25} A 30,30 0 0,0 38,${size - 50}`} fill="none" stroke="hsl(160 70% 45%)" strokeWidth="2" />
            <motion.text x="55" y={size - 45} fill="hsl(160 70% 45%)" fontSize="11" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>45°</motion.text>
          </>
        );
      
      case "angle-right":
        return (
          <>
            <line x1="25" y1={size - 25} x2={size - 25} y2={size - 25} stroke={color} strokeWidth={strokeWidth} />
            <line x1="25" y1={size - 25} x2="25" y2="25" stroke={color} strokeWidth={strokeWidth} />
            <rect x="25" y={size - 45} width="20" height="20" fill="none" stroke="hsl(160 70% 45%)" strokeWidth="2" />
            <motion.text x="55" y={size - 35} fill="hsl(160 70% 45%)" fontSize="11" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>90°</motion.text>
          </>
        );
      
      case "angle-obtuse":
        return (
          <>
            <line x1="25" y1={size - 25} x2={size - 15} y2={size - 25} stroke={color} strokeWidth={strokeWidth} />
            <line x1="25" y1={size - 25} x2={size * 0.25} y2="20" stroke={color} strokeWidth={strokeWidth} />
            <path d={`M 55,${size - 25} A 30,30 0 0,0 30,${size - 50}`} fill="none" stroke="hsl(330 85% 65%)" strokeWidth="2" />
            <motion.text x="60" y={size - 45} fill="hsl(330 85% 65%)" fontSize="11" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>120°</motion.text>
          </>
        );
      
      case "point":
        return (
          <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <circle cx={size / 2} cy={size / 2} r="8" fill={color} />
            <circle cx={size / 2} cy={size / 2} r="16" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
            <text x={size / 2 + 22} y={size / 2 + 5} fill={color} fontSize="14" fontWeight="600">P</text>
          </motion.g>
        );
      
      case "midpoint":
        return (
          <>
            <line x1="20" y1={size / 2} x2={size - 20} y2={size / 2} stroke={color} strokeWidth={strokeWidth} />
            <circle cx="20" cy={size / 2} r="4" fill={color} />
            <circle cx={size - 20} cy={size / 2} r="4" fill={color} />
            <motion.circle cx={size / 2} cy={size / 2} r="6" fill="hsl(330 85% 65%)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} />
            <motion.text x={size / 2} y={size / 2 - 15} fill="hsl(330 85% 65%)" fontSize="11" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>M</motion.text>
          </>
        );
      
      case "bisector":
        return (
          <>
            <line x1="20" y1={size - 20} x2={size - 20} y2={size - 20} stroke={color} strokeWidth={strokeWidth} />
            <line x1="20" y1={size - 20} x2={size * 0.4} y2="15" stroke={color} strokeWidth={strokeWidth} />
            <line x1="20" y1={size - 20} x2={size * 0.7} y2="35" stroke="hsl(160 70% 45%)" strokeWidth="2" strokeDasharray="5 3" />
            <path d={`M 45,${size - 20} A 25,25 0 0,0 32,${size - 40}`} fill="none" stroke="hsl(195 90% 55%)" strokeWidth="1.5" />
            <path d={`M 50,${size - 20} A 30,30 0 0,0 40,${size - 38}`} fill="none" stroke="hsl(195 90% 55%)" strokeWidth="1.5" />
          </>
        );
      
      case "transversal":
        return (
          <>
            <line x1="10" y1={size * 0.3} x2={size - 10} y2={size * 0.3} stroke={color} strokeWidth={strokeWidth} />
            <line x1="10" y1={size * 0.7} x2={size - 10} y2={size * 0.7} stroke={color} strokeWidth={strokeWidth} />
            <line x1={size * 0.25} y1="5" x2={size * 0.75} y2={size - 5} stroke="hsl(160 70% 45%)" strokeWidth={strokeWidth} />
            <motion.circle cx={size * 0.4} cy={size * 0.3} r="4" fill="hsl(160 70% 45%)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
            <motion.circle cx={size * 0.6} cy={size * 0.7} r="4" fill="hsl(160 70% 45%)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} />
          </>
        );
      
      case "angle-straight":
        return (
          <>
            <line x1="15" y1={size / 2} x2={size - 15} y2={size / 2} stroke={color} strokeWidth={strokeWidth} />
            <circle cx={size / 2} cy={size / 2} r="4" fill={color} />
            <path d={`M ${size / 2 - 30},${size / 2} A 30,30 0 0,0 ${size / 2 + 30},${size / 2}`} fill="none" stroke="hsl(245 80% 60%)" strokeWidth="2" />
            <motion.text x={size / 2} y={size / 2 - 15} fill="hsl(245 80% 60%)" fontSize="11" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>180°</motion.text>
          </>
        );
      
      case "angle-reflex":
        return (
          <>
            <line x1="25" y1={size - 30} x2={size - 25} y2={size - 30} stroke={color} strokeWidth={strokeWidth} />
            <line x1="25" y1={size - 30} x2={size * 0.5} y2="20" stroke={color} strokeWidth={strokeWidth} />
            <path d={`M 55,${size - 30} A 30,30 0 1,1 40,${size - 55}`} fill="none" stroke="hsl(0 75% 55%)" strokeWidth="2" />
            <motion.text x={size * 0.7} y={size / 2} fill="hsl(0 75% 55%)" fontSize="10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>270°</motion.text>
          </>
        );
      
      case "complementary":
        return (
          <>
            <line x1="20" y1={size - 20} x2={size - 20} y2={size - 20} stroke={color} strokeWidth={strokeWidth} />
            <line x1="20" y1={size - 20} x2="20" y2="30" stroke={color} strokeWidth={strokeWidth} />
            <line x1="20" y1={size - 20} x2={size * 0.6} y2="25" stroke="hsl(195 90% 55%)" strokeWidth={strokeWidth} />
            <path d={`M 50,${size - 20} A 30,30 0 0,0 20,${size - 50}`} fill="hsl(259 85% 65% / 0.2)" stroke="hsl(259 85% 65%)" strokeWidth="1.5" />
            <path d={`M 45,${size - 20} A 25,25 0 0,0 35,${size - 40}`} fill="hsl(195 90% 55% / 0.2)" stroke="hsl(195 90% 55%)" strokeWidth="1.5" />
            <motion.text x={size * 0.55} y={size - 40} fill="hsl(var(--foreground))" fontSize="9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>90°</motion.text>
          </>
        );
      
      case "supplementary":
        return (
          <>
            <line x1="15" y1={size / 2} x2={size - 15} y2={size / 2} stroke={color} strokeWidth={strokeWidth} />
            <line x1={size / 2} y1={size / 2} x2={size * 0.3} y2="20" stroke="hsl(330 85% 65%)" strokeWidth={strokeWidth} />
            <path d={`M ${size / 2 - 25},${size / 2} A 25,25 0 0,0 ${size / 2 - 18},${size / 2 - 18}`} fill="hsl(259 85% 65% / 0.2)" stroke="hsl(259 85% 65%)" strokeWidth="1.5" />
            <path d={`M ${size / 2 + 25},${size / 2} A 25,25 0 0,1 ${size / 2 - 18},${size / 2 - 18}`} fill="hsl(330 85% 65% / 0.2)" stroke="hsl(330 85% 65%)" strokeWidth="1.5" />
            <motion.text x={size / 2} y={size / 2 + 25} fill="hsl(var(--foreground))" fontSize="9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>180°</motion.text>
          </>
        );
      
      case "vertical":
        return (
          <>
            <line x1="15" y1="15" x2={size - 15} y2={size - 15} stroke={color} strokeWidth={strokeWidth} />
            <line x1="15" y1={size - 15} x2={size - 15} y2="15" stroke="hsl(330 85% 65%)" strokeWidth={strokeWidth} />
            <path d={`M ${size / 2 + 15},${size / 2} A 15,15 0 0,0 ${size / 2},${size / 2 - 15}`} fill="hsl(259 85% 65% / 0.3)" stroke="hsl(259 85% 65%)" strokeWidth="1.5" />
            <path d={`M ${size / 2 - 15},${size / 2} A 15,15 0 0,0 ${size / 2},${size / 2 + 15}`} fill="hsl(259 85% 65% / 0.3)" stroke="hsl(259 85% 65%)" strokeWidth="1.5" />
            <motion.text x={size / 2 + 20} y={size / 2 - 20} fill="hsl(259 85% 65%)" fontSize="9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>∠1</motion.text>
            <motion.text x={size / 2 - 30} y={size / 2 + 25} fill="hsl(259 85% 65%)" fontSize="9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>∠1</motion.text>
          </>
        );
      
      case "corresponding":
        return (
          <>
            <line x1="10" y1={size * 0.3} x2={size - 10} y2={size * 0.3} stroke={color} strokeWidth={strokeWidth} />
            <line x1="10" y1={size * 0.7} x2={size - 10} y2={size * 0.7} stroke={color} strokeWidth={strokeWidth} />
            <line x1={size * 0.3} y1="5" x2={size * 0.7} y2={size - 5} stroke="hsl(160 70% 45%)" strokeWidth={strokeWidth} />
            <path d={`M ${size * 0.45},${size * 0.3} A 12,12 0 0,0 ${size * 0.42},${size * 0.3 - 12}`} fill="hsl(160 70% 45% / 0.3)" stroke="hsl(160 70% 45%)" strokeWidth="1.5" />
            <path d={`M ${size * 0.57},${size * 0.7} A 12,12 0 0,0 ${size * 0.54},${size * 0.7 - 12}`} fill="hsl(160 70% 45% / 0.3)" stroke="hsl(160 70% 45%)" strokeWidth="1.5" />
          </>
        );
      
      case "alternate-interior":
        return (
          <>
            <line x1="10" y1={size * 0.3} x2={size - 10} y2={size * 0.3} stroke={color} strokeWidth={strokeWidth} />
            <line x1="10" y1={size * 0.7} x2={size - 10} y2={size * 0.7} stroke={color} strokeWidth={strokeWidth} />
            <line x1={size * 0.3} y1="5" x2={size * 0.7} y2={size - 5} stroke="hsl(35 90% 55%)" strokeWidth={strokeWidth} />
            <path d={`M ${size * 0.45},${size * 0.3} A 12,12 0 0,1 ${size * 0.45 + 10},${size * 0.3 + 10}`} fill="hsl(35 90% 55% / 0.3)" stroke="hsl(35 90% 55%)" strokeWidth="1.5" />
            <path d={`M ${size * 0.55},${size * 0.7} A 12,12 0 0,1 ${size * 0.55 - 10},${size * 0.7 - 10}`} fill="hsl(35 90% 55% / 0.3)" stroke="hsl(35 90% 55%)" strokeWidth="1.5" />
          </>
        );
      
      case "perpendicular-bisector":
        return (
          <>
            <line x1="20" y1={size / 2} x2={size - 20} y2={size / 2} stroke={color} strokeWidth={strokeWidth} />
            <line x1={size / 2} y1="15" x2={size / 2} y2={size - 15} stroke="hsl(330 85% 65%)" strokeWidth={strokeWidth} strokeDasharray="6 3" />
            <circle cx="20" cy={size / 2} r="4" fill={color} />
            <circle cx={size - 20} cy={size / 2} r="4" fill={color} />
            <motion.circle cx={size / 2} cy={size / 2} r="5" fill="hsl(330 85% 65%)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
            <rect x={size / 2} y={size / 2} width="10" height="10" fill="none" stroke="hsl(160 70% 45%)" strokeWidth="1.5" />
          </>
        );
      
      default:
        return (
          <line x1="20" y1={size / 2} x2={size - 20} y2={size / 2} stroke={color} strokeWidth={strokeWidth} />
        );
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderVisualization()}
    </motion.svg>
  );
}
