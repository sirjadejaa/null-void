"use client";

import { Check } from "lucide-react";
import { MagneticWrapper } from "./magnetic-wrapper";

import { Package } from "@/generated/prisma/client";

interface PackagesProps {
  packages: Package[];
}

export function Packages({ packages }: PackagesProps) {
  return (
    <section id="packages" className="py-32 relative bg-secondary/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-glow)_0%,_transparent_70%)] opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">Investment Packages</h2>
          <p className="text-xl text-muted-foreground">
            Transparent pricing for premium digital solutions. No hidden fees, just pure value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 border ${
                pkg.highlight 
                  ? "border-primary bg-primary/5 shadow-[0_0_30px_var(--color-glow)]" 
                  : "border-border bg-background"
              } flex flex-col`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8 border-b border-border pb-8">
                <h3 className="text-2xl font-heading font-bold mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 h-10">{pkg.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">Starting From</span>
                </div>
                <div className="text-5xl font-heading font-bold text-foreground">
                  {pkg.price}
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {pkg.features.split('\n').filter(Boolean).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${pkg.highlight ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-muted-foreground">{feature.trim()}</span>
                  </li>
                ))}
              </ul>

              <MagneticWrapper>
                <button
                  className={`w-full py-4 rounded-full font-semibold transition-all ${
                    pkg.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {pkg.cta}
                </button>
              </MagneticWrapper>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
