"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crosshair,
  Bomb,
  Radar,
  Bot,
  ChevronLeft,
  Shield,
  Plane,
  Terminal,
} from "lucide-react";
import { categories, getAircraftByCategory, type AircraftCategory, type Aircraft } from "@/data/aircraft";

const iconMap: Record<AircraftCategory, React.ReactNode> = {
  "مقاتلات التفوق الجوي": <Crosshair className="w-4 h-4" />,
  "قاذفات استراتيجية": <Bomb className="w-4 h-4" />,
  "استطلاع واستخبارات": <Radar className="w-4 h-4" />,
  "طائرات بدون طيار قتالية": <Bot className="w-4 h-4" />,
};

interface SideNavProps {
  selectedAircraft: Aircraft | null;
  onSelectAircraft: (aircraft: Aircraft) => void;
  activeCategory: AircraftCategory;
  onSelectCategory: (category: AircraftCategory) => void;
}

export default function SideNav({
  selectedAircraft,
  onSelectAircraft,
  activeCategory,
  onSelectCategory,
}: SideNavProps) {
  const [expandedCategory, setExpandedCategory] =
    useState<AircraftCategory>(activeCategory);

  const handleCategoryClick = (cat: AircraftCategory) => {
    setExpandedCategory(cat);
    onSelectCategory(cat);
  };

  return (
    <nav className="w-full lg:w-72 xl:w-80 shrink-0 border-l border-matrix/20 bg-black lg:h-screen lg:sticky lg:top-0 overflow-y-auto hide-scrollbar font-mono">
      {/* Header */}
      <div className="p-6 border-b border-matrix/20 relative overflow-hidden group">
        <div className="absolute inset-0 bg-matrix/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="p-2 bg-matrix/10 border border-matrix/30">
              <Shield className="w-6 h-6 text-matrix" />
            </div>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-matrix animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-[0.2em] text-matrix uppercase">
              WARPLANES_ELITE
            </h1>
            <p className="text-[9px] tracking-[0.1em] text-matrix/40 uppercase">
              STRAT_INTEL_SYSTEM_V4.0
            </p>
          </div>
        </div>
        
        {/* Status Line */}
        <div className="mt-6 flex flex-col gap-2 text-[8px] tracking-widest text-matrix/50">
          <div className="flex justify-between items-center">
            <span>LINK_STATUS:</span>
            <span className="text-matrix">ENCRYPTED</span>
          </div>
          <div className="flex justify-between items-center">
            <span>DATABASE:</span>
            <span className="text-matrix">16_ACTIVE_ASSETS</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-4">
        {categories.map((cat) => {
          const planes = getAircraftByCategory(cat);
          const isExpanded = expandedCategory === cat;

          return (
            <div key={cat} className="mb-2">
              {/* Category Header */}
              <button
                onClick={() => handleCategoryClick(cat)}
                className={`w-full flex items-center gap-4 px-6 py-4 text-right transition-all group relative ${
                  isExpanded
                    ? "text-matrix"
                    : "text-matrix/40 hover:text-matrix/80"
                }`}
              >
                {isExpanded && <motion.div layoutId="nav-bg" className="absolute inset-0 bg-matrix/5" />}
                <span className={`transition-colors relative z-10 ${isExpanded ? "text-matrix" : "text-matrix/40"}`}>
                  {iconMap[cat]}
                </span>
                <span className="text-[10px] tracking-widest flex-1 relative z-10 font-black">
                  {cat}
                </span>
                <ChevronLeft
                  className={`w-3.5 h-3.5 transition-transform relative z-10 ${
                    isExpanded ? "-rotate-90 text-matrix" : "text-matrix/20"
                  }`}
                />
              </button>

              {/* Aircraft List */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-black/40"
                  >
                    {planes.map((plane, i) => (
                      <button
                        key={plane.id}
                        onClick={() => onSelectAircraft(plane)}
                        className={`w-full flex items-center gap-4 pr-12 pl-6 py-3 text-right transition-all border-r-2 ${
                          selectedAircraft?.id === plane.id
                            ? "bg-matrix/10 border-matrix text-white"
                            : "text-matrix/40 hover:text-matrix/60 border-transparent"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-black truncate">
                            {plane.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[8px] text-matrix/30">{plane.designation}</span>
                            <span className="w-1 h-1 bg-matrix/20 rounded-full" />
                            <span className="text-[8px] text-matrix/30 uppercase">{plane.specs.generation}</span>
                          </div>
                        </div>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          plane.status === "نشطة" ? "bg-matrix" : "bg-matrix/20"
                        }`} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-auto p-6 border-t border-matrix/10">
        <div className="flex items-center gap-3 text-matrix/20 text-[9px] uppercase tracking-widest">
          <Terminal className="w-3 h-3" />
          <span>TERMINAL_ID: GC_01</span>
        </div>
      </div>
    </nav>
  );
}
