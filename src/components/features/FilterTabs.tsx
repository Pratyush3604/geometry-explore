import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FilterTabsProps {
  options: { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}

export function FilterTabs({ options, selected, onSelect }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {options.map((option) => (
        <Button
          key={option.id}
          variant={selected === option.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(option.id)}
          className="relative"
        >
          {option.label}
          {selected === option.id && (
            <motion.div
              layoutId="filterIndicator"
              className="absolute inset-0 bg-primary rounded-md -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Button>
      ))}
    </div>
  );
}
