import { motion } from "framer-motion";

interface Shape2DProps {
  type: string;
  size?: number;
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
}

export function Shape2D({
  type,
  size = 120,
  color = "hsl(259 85% 65%)",
  strokeColor = "hsl(259 85% 55%)",
  strokeWidth = 2,
  className = "",
}: Shape2DProps) {
  const renderShape = () => {
    const center = size / 2;
    const radius = size / 2 - strokeWidth;
    
    switch (type.toLowerCase()) {
      case "circle":
        return <circle cx={center} cy={center} r={radius * 0.8} />;
      
      case "square":
        const squareSize = radius * 1.4;
        return <rect x={(size - squareSize) / 2} y={(size - squareSize) / 2} width={squareSize} height={squareSize} />;
      
      case "rectangle":
        return <rect x={size * 0.1} y={size * 0.25} width={size * 0.8} height={size * 0.5} />;
      
      case "triangle":
        return <polygon points={`${center},${size * 0.1} ${size * 0.9},${size * 0.85} ${size * 0.1},${size * 0.85}`} />;
      
      case "equilateral":
        const h = radius * 1.5;
        return <polygon points={`${center},${center - h * 0.5} ${center + h * 0.5},${center + h * 0.4} ${center - h * 0.5},${center + h * 0.4}`} />;
      
      case "isosceles":
        return <polygon points={`${center},${size * 0.1} ${size * 0.8},${size * 0.85} ${size * 0.2},${size * 0.85}`} />;
      
      case "scalene":
        return <polygon points={`${size * 0.3},${size * 0.15} ${size * 0.9},${size * 0.7} ${size * 0.1},${size * 0.85}`} />;
      
      case "right-triangle":
        return <polygon points={`${size * 0.15},${size * 0.15} ${size * 0.15},${size * 0.85} ${size * 0.85},${size * 0.85}`} />;
      
      case "obtuse-triangle":
        return <polygon points={`${size * 0.1},${size * 0.75} ${size * 0.5},${size * 0.15} ${size * 0.95},${size * 0.85}`} />;
      
      case "acute-triangle":
        return <polygon points={`${center},${size * 0.12} ${size * 0.82},${size * 0.82} ${size * 0.18},${size * 0.82}`} />;
      
      case "pentagon":
        return <polygon points={createPolygonPoints(5, center, radius * 0.8)} />;
      
      case "hexagon":
        return <polygon points={createPolygonPoints(6, center, radius * 0.85)} />;
      
      case "heptagon":
        return <polygon points={createPolygonPoints(7, center, radius * 0.8)} />;
      
      case "octagon":
        return <polygon points={createPolygonPoints(8, center, radius * 0.85)} />;
      
      case "nonagon":
        return <polygon points={createPolygonPoints(9, center, radius * 0.8)} />;
      
      case "decagon":
        return <polygon points={createPolygonPoints(10, center, radius * 0.85)} />;
      
      case "hendecagon":
        return <polygon points={createPolygonPoints(11, center, radius * 0.8)} />;
      
      case "dodecagon":
        return <polygon points={createPolygonPoints(12, center, radius * 0.85)} />;
      
      case "rhombus":
        return <polygon points={`${center},${size * 0.1} ${size * 0.85},${center} ${center},${size * 0.9} ${size * 0.15},${center}`} />;
      
      case "parallelogram":
        return <polygon points={`${size * 0.2},${size * 0.7} ${size * 0.4},${size * 0.3} ${size * 0.85},${size * 0.3} ${size * 0.65},${size * 0.7}`} />;
      
      case "trapezoid":
        return <polygon points={`${size * 0.1},${size * 0.75} ${size * 0.3},${size * 0.25} ${size * 0.7},${size * 0.25} ${size * 0.9},${size * 0.75}`} />;
      
      case "kite":
        return <polygon points={`${center},${size * 0.05} ${size * 0.75},${size * 0.4} ${center},${size * 0.95} ${size * 0.25},${size * 0.4}`} />;
      
      case "star":
        return <polygon points={createStarPoints(5, center, radius * 0.85, radius * 0.4)} />;
      
      case "star6":
        return <polygon points={createStarPoints(6, center, radius * 0.85, radius * 0.5)} />;
      
      case "star8":
        return <polygon points={createStarPoints(8, center, radius * 0.85, radius * 0.5)} />;
      
      case "ellipse":
        return <ellipse cx={center} cy={center} rx={radius * 0.9} ry={radius * 0.6} />;
      
      case "semicircle":
        return <path d={`M ${size * 0.1},${center} A ${radius * 0.8},${radius * 0.8} 0 0 1 ${size * 0.9},${center} Z`} />;
      
      case "quarter-circle":
        return <path d={`M ${size * 0.15},${size * 0.85} L ${size * 0.15},${size * 0.15} A ${size * 0.7},${size * 0.7} 0 0 1 ${size * 0.85},${size * 0.85} Z`} />;
      
      case "annulus":
        return (
          <>
            <circle cx={center} cy={center} r={radius * 0.85} fill="none" stroke={color} strokeWidth={radius * 0.3} />
          </>
        );
      
      case "arrow":
        return <polygon points={`${size * 0.5},${size * 0.1} ${size * 0.85},${size * 0.5} ${size * 0.65},${size * 0.5} ${size * 0.65},${size * 0.85} ${size * 0.35},${size * 0.85} ${size * 0.35},${size * 0.5} ${size * 0.15},${size * 0.5}`} />;
      
      case "cross":
        return <polygon points={`${size * 0.35},${size * 0.1} ${size * 0.65},${size * 0.1} ${size * 0.65},${size * 0.35} ${size * 0.9},${size * 0.35} ${size * 0.9},${size * 0.65} ${size * 0.65},${size * 0.65} ${size * 0.65},${size * 0.9} ${size * 0.35},${size * 0.9} ${size * 0.35},${size * 0.65} ${size * 0.1},${size * 0.65} ${size * 0.1},${size * 0.35} ${size * 0.35},${size * 0.35}`} />;
      
      case "heart":
        return (
          <path d={`M ${center} ${size * 0.85}
            C ${size * 0.1} ${size * 0.5} ${size * 0.1} ${size * 0.2} ${center} ${size * 0.35}
            C ${size * 0.9} ${size * 0.2} ${size * 0.9} ${size * 0.5} ${center} ${size * 0.85} Z`} />
        );
      
      case "crescent":
        return (
          <path d={`M ${size * 0.7},${size * 0.15} 
            A ${radius * 0.7},${radius * 0.7} 0 1 0 ${size * 0.7},${size * 0.85}
            A ${radius * 0.5},${radius * 0.5} 0 1 1 ${size * 0.7},${size * 0.15}`} />
        );
      
      default:
        return <circle cx={center} cy={center} r={radius * 0.8} />;
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <g fill={color} stroke={strokeColor} strokeWidth={strokeWidth}>
        {renderShape()}
      </g>
    </motion.svg>
  );
}

function createPolygonPoints(sides: number, center: number, radius: number): string {
  const points: string[] = [];
  const angleStep = (2 * Math.PI) / sides;
  const startAngle = -Math.PI / 2;
  
  for (let i = 0; i < sides; i++) {
    const angle = startAngle + i * angleStep;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  
  return points.join(" ");
}

function createStarPoints(points: number, center: number, outerRadius: number, innerRadius: number): string {
  const result: string[] = [];
  const angleStep = Math.PI / points;
  const startAngle = -Math.PI / 2;
  
  for (let i = 0; i < points * 2; i++) {
    const angle = startAngle + i * angleStep;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    result.push(`${x},${y}`);
  }
  
  return result.join(" ");
}
