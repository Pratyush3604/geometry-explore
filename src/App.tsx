import { Component, Suspense, lazy, type ErrorInfo, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const Lines = lazy(() => import("./pages/Lines"));
const Shapes2D = lazy(() => import("./pages/Shapes2D"));
const Shapes3D = lazy(() => import("./pages/Shapes3D"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background">
    <div className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" aria-label="Loading" />
  </div>
);

class RouteErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Route rendering failed", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background px-6">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-2xl font-display font-bold text-foreground">Something went wrong while loading</h1>
            <p className="text-muted-foreground">Please reload once. If it keeps happening, I can keep debugging from the logs.</p>
            <Button onClick={() => window.location.reload()}>Reload app</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/lines" element={<Lines />} />
              <Route path="/shapes-2d" element={<Shapes2D />} />
              <Route path="/shapes-3d" element={<Shapes3D />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

