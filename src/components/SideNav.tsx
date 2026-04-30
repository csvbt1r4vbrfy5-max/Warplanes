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
    <nav className="w-full lg:w-72 xl:w-80 shrink-0 border-l border-[rgba(255,77,0,0.1)] bg-[#060609] lg:h-screen lg:sticky lg:top-0 overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="p-5 border-b border-[rgba(255,77,0,0.1)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-7 h-7 text-[#ff4d00]" />
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#ff4d00] rounded-full pulse-ring" />
          </div>
          <div>
            <h1 className="font-sans text-sm tracking-[0.1em] text-[#ff4d00] font-bold">
              الطائرات الحربية
            </h1>
            <p className="text-[10px] tracking-[0.1em] text-[#666680] font-sans uppercase">
              موسوعة الطيران العسكري
            </p>
          </div>
        </div>
        {/* Status Line */}
        <div className="mt-4 flex items-center gap-2 text-[10px] font-sans text-[#444]">
          <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full inline-block" />
          <span className="text-[#00ff88]">النظام متصل</span>
          <span className="mx-1">|</span>
          <span>تحميل 16 أصل</span>
        </div>
      </div>

      {/* Categories */}
      <div className="py-2">
        {categories.map((cat) => {
          const planes = getAircraftByCategory(cat);
          const isExpanded = expandedCategory === cat;

          return (
            <div key={cat}>
              {/* Category Header */}
              <button
                onClick={() => handleCategoryClick(cat)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-right transition-all duration-200 group ${
                  isExpanded
                    ? "bg-[rgba(255,77,0,0.06)] text-[#ff4d00]"
                    : "text-[#888] hover:text-[#ccc] hover:bg-[rgba(255,255,255,0.02)]"
                }`}
              >
                <span
                  className={`transition-colors ${
                    isExpanded ? "text-[#ff4d00]" : "text-[#555]"
                  }`}
                >
                  {iconMap[cat]}
                </span>
                <span className="font-sans text-xs tracking-wider flex-1">
                  {cat}
                </span>
                <ChevronLeft
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isExpanded ? "-rotate-90 text-[#ff4d00]" : "text-[#444]"
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
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {planes.map((plane, i) => (
                      <motion.button
                        key={plane.id}
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => onSelectAircraft(plane)}
                        className={`w-full flex items-center gap-3 pr-12 pl-5 py-2.5 text-right transition-all duration-150 ${
                          selectedAircraft?.id === plane.id
                            ? "bg-[rgba(255,77,0,0.1)] border-r-2 border-[#ff4d00] text-white"
                            : "text-[#777] hover:text-[#bbb] hover:bg-[rgba(255,255,255,0.02)] border-r-2 border-transparent"
                        }`}
                      >
                        <Plane className="w-3 h-3 opacity-40" />
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-[11px] truncate">
                            {plane.name}
                          </p>
                          <p className="text-[9px] text-[#555] font-sans">
                            {plane.designation} · {plane.specs.generation}
                          </p>
                        </div>
                        <span
                          className={`text-[8px] font-sans px-1.5 py-0.5 rounded ${
                            plane.status === "نشطة"
                              ? "bg-[rgba(0,255,136,0.1)] text-[#00ff88]"
                              : plane.status === "قيد التطوير"
                              ? "bg-[rgba(0,212,255,0.1)] text-[#00d4ff]"
                              : plane.status === "متقاعدة"
                              ? "bg-[rgba(255,255,255,0.05)] text-[#555]"
                              : "bg-[rgba(255,200,0,0.1)] text-[#ffd700]"
                          }`}
                        >
                          {plane.status.toUpperCase()}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </nav>
  );
}
