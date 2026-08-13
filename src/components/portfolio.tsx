"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "./tilt-card";
import { ArrowUpRight } from "lucide-react";
import { MagneticWrapper } from "./magnetic-wrapper";

import { Project } from "@prisma/client";

interface PortfolioProps {
  projects: Project[];
}

export function Portfolio({ projects }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section id="portfolio" className="py-32 relative bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">Selected Work</h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              We build digital experiences that drive growth, crafted with precision and premium aesthetics.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <MagneticWrapper key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_var(--color-glow)]"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              </MagneticWrapper>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                key={project.id}
                className="group relative"
              >
                <TiltCard className="h-[400px] md:h-[500px]">
                  <div className={`w-full h-full rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br ${project.color} flex flex-col justify-between p-8 relative`}>
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    
                    <div className="flex justify-between items-start z-10 relative">
                      <div className="flex gap-2 flex-wrap">
                        {project.tech.split(",").map((tech: string) => (
                          <span key={tech} className="px-3 py-1 rounded-full bg-background/50 backdrop-blur-md border border-border text-xs font-medium text-foreground">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">{new Date(project.createdAt).getFullYear()}</span>
                    </div>

                    <div className="z-10 relative flex justify-between items-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div>
                        <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 block">{project.category}</span>
                        <h3 className="text-3xl font-heading font-bold text-foreground">{project.title}</h3>
                      </div>
                      
                      <div className="flex gap-3">
                        {project.link && (
                          <MagneticWrapper>
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noreferrer"
                              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 shadow-[0_0_20px_var(--color-glow)]"
                            >
                              <ArrowUpRight className="w-6 h-6" />
                            </a>
                          </MagneticWrapper>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
