"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, Calendar } from "lucide-react";
import { MagneticWrapper } from "./magnetic-wrapper";

export function Contact() {
  const [formState, setFormState] = useState("idle"); // idle, loading, success

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-glow)_0%,_transparent_60%)] opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">Let's build something <span className="text-primary">extraordinary.</span></h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-md">
              Ready to elevate your digital presence? Book a free consultation or drop us a message.
            </p>
            
            <div className="space-y-8 mb-12">
              <a href="mailto:hello@nullvoid.com" className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail className="w-6 h-6 text-foreground group-hover:text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Email Us</div>
                  <div className="font-heading font-bold text-lg group-hover:text-primary transition-colors">hello@nullvoid.com</div>
                </div>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="w-6 h-6 text-foreground group-hover:text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Call Us</div>
                  <div className="font-heading font-bold text-lg group-hover:text-primary transition-colors">+91 98765 43210</div>
                </div>
              </a>
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                  <MapPin className="w-6 h-6 text-foreground group-hover:text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Visit Us</div>
                  <div className="font-heading font-bold text-lg">Mumbai, India</div>
                </div>
              </div>
            </div>

            <MagneticWrapper>
              <button className="flex items-center gap-2 px-8 py-4 rounded-full border border-border hover:bg-secondary transition-colors font-semibold">
                <Calendar className="w-5 h-5" />
                Book a Free Discovery Call
              </button>
            </MagneticWrapper>
          </div>

          <div className="bg-secondary/30 border border-border p-8 rounded-3xl backdrop-blur-sm relative">
            {formState === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-background rounded-3xl z-20 text-center p-8"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-heading font-bold mb-4">Message Sent!</h3>
                <p className="text-muted-foreground">We'll get back to you within 24 hours to discuss your project.</p>
                <button 
                  onClick={() => setFormState("idle")}
                  className="mt-8 px-8 py-3 rounded-full bg-secondary hover:bg-secondary/80 font-medium"
                >
                  Send another
                </button>
              </motion.div>
            ) : null}

            <h3 className="text-2xl font-heading font-bold mb-8">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <input required type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <input required type="email" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <input type="tel" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Budget</label>
                  <select className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground appearance-none">
                    <option value="">Select a range</option>
                    <option value="15k-30k">₹15,000 - ₹30,000</option>
                    <option value="30k-60k">₹30,000 - ₹60,000</option>
                    <option value="60k+">₹60,000+</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <textarea required rows={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" placeholder="Tell us about your project..."></textarea>
              </div>
              
              <MagneticWrapper>
                <button 
                  type="submit" 
                  disabled={formState === "loading"}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_var(--color-glow)] flex justify-center items-center gap-2"
                >
                  {formState === "loading" ? "Sending..." : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </MagneticWrapper>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
