"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Stars } from "@react-three/drei";
import { MagneticWrapper } from "./magnetic-wrapper";

function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[2, 1, -2]} scale={1.5}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
              color="#414FA1"
              envMapIntensity={1}
              clearcoat={1}
              clearcoatRoughness={0.1}
              metalness={0.8}
              roughness={0.2}
              distort={0.4}
              speed={2}
            />
          </mesh>
        </Float>
        <Float speed={3} rotationIntensity={2} floatIntensity={3}>
          <mesh position={[-3, -1, -4]} scale={1}>
            <torusGeometry args={[1, 0.3, 32, 64]} />
            <MeshDistortMaterial
              color="#F27024"
              envMapIntensity={1}
              clearcoat={1}
              metalness={0.9}
              roughness={0.1}
              distort={0.2}
              speed={3}
            />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const stats = [
    { value: "50+", label: "Projects" },
    { value: "20+", label: "Industries" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "100%", label: "Mobile Optimized" },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      <Hero3D />
      
      {/* Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-glow)_0%,_transparent_50%)] opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-glow)_0%,_transparent_50%)] opacity-20" />

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium tracking-wide text-primary">AWARD WINNING DIGITAL AGENCY</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] font-heading font-bold mb-6 max-w-5xl"
        >
          We Design Websites <br className="hidden md:block" /> That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-[0_0_20px_var(--color-glow)]">Grow Businesses.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12"
        >
          Premium websites, branding, automation and marketing solutions for modern businesses.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6 mb-20"
        >
          <MagneticWrapper>
            <a href="#portfolio" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all shadow-[0_0_30px_var(--color-glow)]">
              View Portfolio
            </a>
          </MagneticWrapper>
          <MagneticWrapper>
            <a href="#contact" className="px-8 py-4 rounded-full bg-transparent border border-border text-foreground font-semibold text-lg hover:bg-white/5 transition-all">
              Book a Free Call
            </a>
          </MagneticWrapper>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-border/50 pt-12 w-full max-w-5xl">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-foreground">{stat.value}</div>
              <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
