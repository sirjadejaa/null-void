"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How much does a premium website cost?",
    a: "Our packages start at ₹14,999 for basic businesses, scaling up to ₹79,999+ for full custom SaaS and eCommerce solutions. We provide transparent pricing based on the value and technical complexity of the project.",
  },
  {
    q: "How long does it take to build?",
    a: "A standard landing page or 5-page website takes 1-2 weeks. Complex custom applications or eCommerce platforms can take 4-8 weeks, depending on the requirements and feedback cycles.",
  },
  {
    q: "Do you offer SEO and Marketing?",
    a: "Yes. Every website we build includes basic technical SEO. We also offer advanced local SEO and Google Business Profile optimization as standalone packages.",
  },
  {
    q: "What tech stack do you use?",
    a: "We build modern, blazing-fast web applications using Next.js, React, Tailwind CSS, Framer Motion, and Three.js. This ensures a 100/100 Lighthouse score and unparalleled user experience.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 relative bg-secondary/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">Questions?</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about working with us.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border border-border rounded-2xl bg-background overflow-hidden"
            >
              <button
                className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <h3 className="text-xl font-heading font-bold">{faq.q}</h3>
                {openIndex === i ? (
                  <Minus className="w-6 h-6 text-primary shrink-0" />
                ) : (
                  <Plus className="w-6 h-6 text-muted-foreground shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
