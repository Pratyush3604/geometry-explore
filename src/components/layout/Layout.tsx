import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen mesh-gradient flex flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20 flex-1"
      >
        {children}
      </motion.main>
      <footer className="py-6 border-t border-border/50 glass">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Made by{" "}
            <span className="font-semibold gradient-text">Pratyush Dalmia</span>{" "}
            of Mayo College
          </p>
        </div>
      </footer>
    </div>
  );
}
