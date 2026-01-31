import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Box, Circle, Minus, Layers, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shape3DViewer } from "@/components/3d/Shape3DViewer";

const stats = [
  { value: "80+", label: "Interactive Shapes", icon: Sparkles },
  { value: "3D", label: "Rotatable Models", icon: Box },
  { value: "∞", label: "Learning Fun", icon: Zap },
];

const categories = [
  {
    title: "Lines & Points",
    description: "Master the fundamentals with rays, segments, angles, and geometric relationships.",
    icon: Minus,
    path: "/lines",
    count: "15+",
    color: "from-primary to-secondary",
  },
  {
    title: "2D Shapes",
    description: "Explore polygons from triangles to decagons, stars, and complex figures.",
    icon: Circle,
    path: "/shapes-2d",
    count: "25+",
    color: "from-accent to-primary",
  },
  {
    title: "3D Shapes",
    description: "Dive into spheres, polyhedra, and complex 3D forms with interactive models.",
    icon: Box,
    path: "/shapes-3d",
    count: "15+",
    color: "from-secondary to-success",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Interactive Geometry Learning</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                Explore Shapes in{" "}
                <span className="gradient-text">3D</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Master geometry with interactive 3D models, stunning visualizations, 
                and comprehensive explanations for every shape.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/lines">
                  <Button size="lg" className="gradient-bg text-primary-foreground gap-2 text-lg px-8">
                    Start Learning
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/shapes-3d">
                  <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                    <Eye className="w-5 h-5" />
                    Explore 3D
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <div className="relative">
                <Shape3DViewer shape="torusknot" color="#8b5cf6" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating shapes decoration */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-2xl bg-primary/20 shape-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-secondary/20 shape-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 rotate-45 bg-accent/15 shape-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-40 w-12 h-12 rounded-lg bg-success/20 shape-float" style={{ animationDelay: "0.5s" }} />
      </section>

      {/* Stats Section */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={item}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl font-display font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Three Ways to <span className="gradient-text">Learn</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Progress from basic concepts to advanced 3D geometry at your own pace.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {categories.map((category, index) => (
              <motion.div key={index} variants={item}>
                <Link to={category.path}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative h-full p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity`} />
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {category.count} concepts
                        </span>
                      </div>

                      <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {category.description}
                      </p>

                      <div className="flex items-center gap-2 text-primary font-medium">
                        Start learning
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl gradient-bg p-12 md:p-20 text-center"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-white" />
              <div className="absolute bottom-10 right-10 w-24 h-24 rotate-45 border-4 border-white" />
              <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-lg border-4 border-white" />
            </div>

            <div className="relative">
              <Layers className="w-16 h-16 text-white/90 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Ready to Explore Geometry?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Dive into our interactive learning experience with 80+ shapes, 
                3D models, and comprehensive explanations.
              </p>
              <Link to="/lines">
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
