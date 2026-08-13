"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hexagon } from "lucide-react";
import { MagneticWrapper } from "./magnetic-wrapper";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#portfolio" },
    { name: "Process", href: "#process" },
    { name: "Packages", href: "#packages" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-4 bg-background/50 backdrop-blur-xl border-b border-border/50 shadow-sm" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group z-50 magnetic">
            <Hexagon className="w-8 h-8 text-primary group-hover:fill-primary/20 transition-all duration-300" />
            <span className="font-heading font-bold text-xl tracking-tighter">NullVoid</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticWrapper key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors magnetic relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </MagneticWrapper>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "orange" ? "blue" : "orange")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors magnetic"
              aria-label="Toggle Theme"
            >
              <div className={`w-4 h-4 rounded-full ${theme === 'orange' ? 'bg-[#F27024]' : 'bg-[#414FA1]'}`} />
            </button>
            <MagneticWrapper>
              <Link
                href="#contact"
                className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_var(--color-glow)] magnetic"
              >
                Let's Talk
              </Link>
            </MagneticWrapper>
          </div>

          <button
            className="md:hidden z-50 relative p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                key={link.name}
              >
                <Link
                  href={link.href}
                  className="text-4xl font-heading font-bold hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <button
                onClick={() => setTheme(theme === "orange" ? "blue" : "orange")}
                className="px-6 py-3 rounded-full border border-border flex items-center gap-3"
              >
                <span>Theme: {theme === 'orange' ? 'Orange' : 'Blue'}</span>
                <div className={`w-4 h-4 rounded-full ${theme === 'orange' ? 'bg-[#F27024]' : 'bg-[#414FA1]'}`} />
              </button>
              <Link
                href="#contact"
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let's Talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
