"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MovingBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#020204]">
      {/* Moving Grid */}
      <div className="moving-grid opacity-20" />
      
      {/* Scanlines Overlay */}
      <div className="scanlines opacity-30" />
      
      {/* HUD Glare */}
      <div className="hud-glare" />

      {/* Dynamic Radar Sweeps */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full border border-matrix/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Floating Tactical Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-matrix/20"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}

      {/* Mouse Follow HUD Element */}
      <motion.div
        className="fixed w-40 h-40 border border-matrix/10 rounded-full flex items-center justify-center pointer-events-none"
        animate={{
          x: mousePos.x - 80,
          y: mousePos.y - 80,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      >
        <div className="w-1 h-8 bg-matrix/20 absolute" />
        <div className="w-8 h-1 bg-matrix/20 absolute" />
        <span className="text-[8px] font-mono text-matrix/20 absolute -top-4">TARGET_LOCK: ACTIVE</span>
      </motion.div>
    </div>
  );
}
