"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";

function Loader3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />
      <Float speed={4} rotationIntensity={1.5} floatIntensity={2}>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.2}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
            color="#414FA1"
          />
        </mesh>
      </Float>
    </Canvas>
  );
}

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 w-full h-full opacity-50 mix-blend-screen pointer-events-none">
             {/* This could be a noise overlay in real life */}
          </div>
          
          <div className="w-64 h-64 mb-8">
            <Loader3D />
          </div>

          <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {Math.min(progress, 100)}%
            </div>
            <div className="w-48 h-[2px] bg-muted overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
              NullVoid Digitals
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
