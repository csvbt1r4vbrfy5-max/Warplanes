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
    <nav className="w-full lg:w-72 xl:w-80 shrink-0 border-l border-[#1a1a25] bg-[#050505] lg:h-screen lg:sticky lg:top-0 overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="p-8 border-b border-[#1a1a25] mb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#ff4d00]/10 rounded-xl border border-[#ff4d00]/20">
            <Shield className="w-6 h-6 text-[#ff4d00]" />
          </div>
          <h1 className="text-xl font-heading font-black text-white tracking-tighter">
            WARPLANES
          </h1>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.3em] text-[#444] uppercase font-bold">
            نظام استخبارات الطيران
          </p>
          <div className="h-1 w-12 bg-[#ff4d00] rounded-full" />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 space-y-2">
        {categories.map((cat) => {
          const planes = getAircraftByCategory(cat);
          const isExpanded = expandedCategory === cat;

          return (
            <div key={cat} className="space-y-1">
              <button
                onClick={() => handleCategoryClick(cat)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
                  isExpanded
                    ? "bg-[#ff4d00]/10 text-white"
                    : "text-[#666] hover:bg-white/5"
                }`}
              >
                <span className={`transition-colors ${isExpanded ? "text-[#ff4d00]" : "text-[#444]"}`}>
                  {iconMap[cat]}
                </span>
                <span className="text-xs font-sans font-bold flex-1 text-right">
                  {cat}
                </span>
                <ChevronLeft
                  className={`w-4 h-4 transition-transform ${
                    isExpanded ? "-rotate-90 text-[#ff4d00]" : "text-[#222]"
                  }`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-1 pr-4"
                  >
                    {planes.map((plane) => (
                      <button
                        key={plane.id}
                        onClick={() => onSelectAircraft(plane)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                          selectedAircraft?.id === plane.id
                            ? "bg-white/5 text-[#ff4d00]"
                            : "text-[#444] hover:text-white"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          selectedAircraft?.id === plane.id ? "bg-[#ff4d00]" : "bg-[#111]"
                        }`} />
                        <span className="text-[11px] font-sans font-medium flex-1 text-right">
                          {plane.name}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-8 px-8 py-8 border-t border-[#1a1a25]">
        <div className="p-4 bg-[#ff4d00]/5 rounded-2xl border border-[#ff4d00]/10">
          <div className="flex items-center gap-2 mb-2">
            <Plane className="w-3 h-3 text-[#ff4d00]" />
            <span className="text-[10px] font-sans font-bold text-[#ff4d00] uppercase">حالة الأنظمة</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
            <span className="text-[9px] font-sans text-[#666]">كافة البيانات مُحدثة</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
