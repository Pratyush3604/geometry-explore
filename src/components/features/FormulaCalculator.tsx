import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shapeName?: string;
  shapeType?: "2d" | "3d";
}

type CalculationType = "area" | "perimeter" | "volume" | "surface";

interface CalculationResult {
  label: string;
  value: number;
  unit: string;
}

export function FormulaCalculator({ open, onOpenChange, shapeName, shapeType = "2d" }: CalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [results, setResults] = useState<CalculationResult[]>([]);

  const calculate2D = (shape: string) => {
    const r = parseFloat(inputs.radius || "0");
    const s = parseFloat(inputs.side || "0");
    const l = parseFloat(inputs.length || "0");
    const w = parseFloat(inputs.width || "0");
    const b = parseFloat(inputs.base || "0");
    const h = parseFloat(inputs.height || "0");
    const d1 = parseFloat(inputs.diagonal1 || "0");
    const d2 = parseFloat(inputs.diagonal2 || "0");

    const newResults: CalculationResult[] = [];

    switch (shape?.toLowerCase()) {
      case "circle":
        newResults.push({ label: "Area", value: Math.PI * r * r, unit: "sq units" });
        newResults.push({ label: "Circumference", value: 2 * Math.PI * r, unit: "units" });
        break;
      case "square":
        newResults.push({ label: "Area", value: s * s, unit: "sq units" });
        newResults.push({ label: "Perimeter", value: 4 * s, unit: "units" });
        newResults.push({ label: "Diagonal", value: s * Math.SQRT2, unit: "units" });
        break;
      case "rectangle":
        newResults.push({ label: "Area", value: l * w, unit: "sq units" });
        newResults.push({ label: "Perimeter", value: 2 * (l + w), unit: "units" });
        newResults.push({ label: "Diagonal", value: Math.sqrt(l * l + w * w), unit: "units" });
        break;
      case "scalene triangle":
      case "isosceles triangle":
      case "right triangle":
      case "equilateral triangle":
        newResults.push({ label: "Area", value: 0.5 * b * h, unit: "sq units" });
        if (shape === "equilateral triangle") {
          newResults.push({ label: "Area (from side)", value: (Math.sqrt(3) / 4) * s * s, unit: "sq units" });
          newResults.push({ label: "Perimeter", value: 3 * s, unit: "units" });
        }
        break;
      case "rhombus":
        newResults.push({ label: "Area", value: 0.5 * d1 * d2, unit: "sq units" });
        newResults.push({ label: "Perimeter", value: 4 * s, unit: "units" });
        break;
      case "parallelogram":
        newResults.push({ label: "Area", value: b * h, unit: "sq units" });
        break;
      case "trapezoid":
        const a = parseFloat(inputs.parallelSide1 || "0");
        const b2 = parseFloat(inputs.parallelSide2 || "0");
        newResults.push({ label: "Area", value: 0.5 * (a + b2) * h, unit: "sq units" });
        break;
      case "regular pentagon":
        newResults.push({ label: "Area", value: 0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * s * s, unit: "sq units" });
        newResults.push({ label: "Perimeter", value: 5 * s, unit: "units" });
        break;
      case "regular hexagon":
        newResults.push({ label: "Area", value: (3 * Math.sqrt(3) / 2) * s * s, unit: "sq units" });
        newResults.push({ label: "Perimeter", value: 6 * s, unit: "units" });
        break;
      case "regular octagon":
        newResults.push({ label: "Area", value: 2 * (1 + Math.SQRT2) * s * s, unit: "sq units" });
        newResults.push({ label: "Perimeter", value: 8 * s, unit: "units" });
        break;
      default:
        // Generic polygon
        newResults.push({ label: "Area (b×h/2)", value: 0.5 * b * h, unit: "sq units" });
    }

    setResults(newResults);
  };

  const calculate3D = (shape: string) => {
    const r = parseFloat(inputs.radius || "0");
    const s = parseFloat(inputs.side || "0");
    const l = parseFloat(inputs.length || "0");
    const w = parseFloat(inputs.width || "0");
    const h = parseFloat(inputs.height || "0");
    const R = parseFloat(inputs.majorRadius || "0");

    const newResults: CalculationResult[] = [];

    switch (shape?.toLowerCase()) {
      case "sphere":
        newResults.push({ label: "Volume", value: (4 / 3) * Math.PI * r * r * r, unit: "cubic units" });
        newResults.push({ label: "Surface Area", value: 4 * Math.PI * r * r, unit: "sq units" });
        break;
      case "cube (hexahedron)":
      case "cube":
        newResults.push({ label: "Volume", value: s * s * s, unit: "cubic units" });
        newResults.push({ label: "Surface Area", value: 6 * s * s, unit: "sq units" });
        newResults.push({ label: "Space Diagonal", value: s * Math.sqrt(3), unit: "units" });
        break;
      case "cuboid (rectangular prism)":
      case "cuboid":
        newResults.push({ label: "Volume", value: l * w * h, unit: "cubic units" });
        newResults.push({ label: "Surface Area", value: 2 * (l * w + w * h + l * h), unit: "sq units" });
        newResults.push({ label: "Space Diagonal", value: Math.sqrt(l * l + w * w + h * h), unit: "units" });
        break;
      case "cylinder":
        newResults.push({ label: "Volume", value: Math.PI * r * r * h, unit: "cubic units" });
        newResults.push({ label: "Surface Area", value: 2 * Math.PI * r * (r + h), unit: "sq units" });
        newResults.push({ label: "Lateral Area", value: 2 * Math.PI * r * h, unit: "sq units" });
        break;
      case "cone":
        const slant = Math.sqrt(r * r + h * h);
        newResults.push({ label: "Volume", value: (1 / 3) * Math.PI * r * r * h, unit: "cubic units" });
        newResults.push({ label: "Surface Area", value: Math.PI * r * (r + slant), unit: "sq units" });
        newResults.push({ label: "Slant Height", value: slant, unit: "units" });
        break;
      case "tetrahedron":
        newResults.push({ label: "Volume", value: (s * s * s * Math.SQRT2) / 12, unit: "cubic units" });
        newResults.push({ label: "Surface Area", value: Math.sqrt(3) * s * s, unit: "sq units" });
        break;
      case "octahedron":
        newResults.push({ label: "Volume", value: (Math.SQRT2 / 3) * s * s * s, unit: "cubic units" });
        newResults.push({ label: "Surface Area", value: 2 * Math.sqrt(3) * s * s, unit: "sq units" });
        break;
      case "torus":
        newResults.push({ label: "Volume", value: 2 * Math.PI * Math.PI * R * r * r, unit: "cubic units" });
        newResults.push({ label: "Surface Area", value: 4 * Math.PI * Math.PI * R * r, unit: "sq units" });
        break;
      default:
        // Generic
        newResults.push({ label: "Volume (l×w×h)", value: l * w * h, unit: "cubic units" });
    }

    setResults(newResults);
  };

  const handleCalculate = () => {
    if (shapeType === "3d") {
      calculate3D(shapeName || "");
    } else {
      calculate2D(shapeName || "");
    }
  };

  const getInputFields = () => {
    const shape = shapeName?.toLowerCase() || "";
    
    if (shapeType === "3d") {
      if (shape.includes("sphere") || shape.includes("hemisphere")) {
        return [{ key: "radius", label: "Radius (r)" }];
      }
      if (shape.includes("cube") && !shape.includes("cuboid")) {
        return [{ key: "side", label: "Side (s)" }];
      }
      if (shape.includes("cuboid") || shape.includes("rectangular")) {
        return [
          { key: "length", label: "Length (l)" },
          { key: "width", label: "Width (w)" },
          { key: "height", label: "Height (h)" },
        ];
      }
      if (shape.includes("cylinder") || shape.includes("cone")) {
        return [
          { key: "radius", label: "Radius (r)" },
          { key: "height", label: "Height (h)" },
        ];
      }
      if (shape.includes("torus")) {
        return [
          { key: "majorRadius", label: "Major Radius (R)" },
          { key: "radius", label: "Minor Radius (r)" },
        ];
      }
      if (shape.includes("tetrahedron") || shape.includes("octahedron") || shape.includes("icosahedron") || shape.includes("dodecahedron")) {
        return [{ key: "side", label: "Edge Length (a)" }];
      }
      // Default 3D
      return [
        { key: "length", label: "Length (l)" },
        { key: "width", label: "Width (w)" },
        { key: "height", label: "Height (h)" },
      ];
    }

    // 2D shapes
    if (shape.includes("circle") || shape.includes("semicircle")) {
      return [{ key: "radius", label: "Radius (r)" }];
    }
    if (shape.includes("square")) {
      return [{ key: "side", label: "Side (s)" }];
    }
    if (shape.includes("rectangle")) {
      return [
        { key: "length", label: "Length (l)" },
        { key: "width", label: "Width (w)" },
      ];
    }
    if (shape.includes("triangle")) {
      return [
        { key: "base", label: "Base (b)" },
        { key: "height", label: "Height (h)" },
        { key: "side", label: "Side (for equilateral)" },
      ];
    }
    if (shape.includes("rhombus")) {
      return [
        { key: "side", label: "Side (s)" },
        { key: "diagonal1", label: "Diagonal 1 (d₁)" },
        { key: "diagonal2", label: "Diagonal 2 (d₂)" },
      ];
    }
    if (shape.includes("trapezoid")) {
      return [
        { key: "parallelSide1", label: "Parallel Side 1 (a)" },
        { key: "parallelSide2", label: "Parallel Side 2 (b)" },
        { key: "height", label: "Height (h)" },
      ];
    }
    if (shape.includes("pentagon") || shape.includes("hexagon") || shape.includes("octagon") || shape.includes("gon")) {
      return [{ key: "side", label: "Side (s)" }];
    }
    // Default
    return [
      { key: "base", label: "Base (b)" },
      { key: "height", label: "Height (h)" },
    ];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            {shapeName ? `Calculate: ${shapeName}` : "Formula Calculator"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-3">
            {getInputFields().map((field) => (
              <div key={field.key} className="space-y-1">
                <Label htmlFor={field.key}>{field.label}</Label>
                <Input
                  id={field.key}
                  type="number"
                  placeholder="Enter value"
                  value={inputs[field.key] || ""}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                />
              </div>
            ))}
          </div>

          <Button onClick={handleCalculate} className="w-full gap-2">
            Calculate
            <ArrowRight className="w-4 h-4" />
          </Button>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2 p-4 rounded-lg bg-primary/5 border border-primary/20"
              >
                <h4 className="font-medium text-sm text-muted-foreground">Results:</h4>
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-muted-foreground">{result.label}:</span>
                    <span className="font-mono font-medium">
                      {result.value.toFixed(4)} {result.unit}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
