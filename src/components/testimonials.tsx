"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { Testimonial } from "@prisma/client";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  // Double the array for infinite scroll effect
  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-32 relative bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">Client Success</h2>
        <p className="text-xl text-muted-foreground">What our partners say about us.</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div 
          className="flex gap-6 py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {infiniteTestimonials.map((t, i) => (
            <div 
              key={i} 
              className="w-[400px] shrink-0 p-8 rounded-3xl bg-secondary/30 border border-border backdrop-blur-sm"
            >
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    className={`w-5 h-5 ${index < t.rating ? "fill-current" : "text-muted-foreground opacity-30"}`} 
                  />
                ))}
              </div>
              <p className="text-lg mb-8 leading-relaxed">"{t.text}"</p>
              <div>
                <h4 className="font-heading font-bold text-foreground">{t.name}</h4>
                <p className="text-sm text-muted-foreground">{t.company}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
