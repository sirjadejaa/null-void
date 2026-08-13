"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discover", desc: "Understanding your vision, goals, and target audience." },
  { num: "02", title: "Strategy", desc: "Crafting a roadmap for design, development, and growth." },
  { num: "03", title: "Design", desc: "Creating premium wireframes and high-fidelity 3D UI." },
  { num: "04", title: "Development", desc: "Building fast, SEO-optimized, and scalable code." },
  { num: "05", title: "Launch", desc: "Rigorous testing and a seamless deployment." },
  { num: "06", title: "Growth", desc: "Ongoing support, AI automation, and marketing." },
];

export function Process() {
  return (
    <section id="process" className="py-32 relative bg-background border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              A systematic approach to delivering world-class digital experiences.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-12 left-0 w-full h-[1px] bg-border hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pt-8 lg:pt-0"
              >
                <div className="lg:absolute -top-3 left-0 w-6 h-6 rounded-full bg-background border-4 border-primary z-10 hidden lg:block" />
                <div className="text-5xl font-heading font-bold text-border mb-4 lg:mt-12">{step.num}</div>
                <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
