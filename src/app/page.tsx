"use client";

import { useState } from "react";
import { aircraftData, type Aircraft, type AircraftCategory } from "@/data/aircraft";
import SideNav from "@/components/SideNav";
import AircraftDashboard from "@/components/AircraftDashboard";
import ComparisonTool from "@/components/ComparisonTool";
import HistoryTimeline from "@/components/HistoryTimeline";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Swords, History as HistoryIcon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "specs" | "compare" | "history";

export default function Home() {
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft>(aircraftData[0]);
  const [activeCategory, setActiveCategory] = useState<AircraftCategory>("مقاتلات التفوق الجوي");
  const [viewMode, setViewMode] = useState<ViewMode>("specs");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectAircraft = (aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
    setViewMode("specs");
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#050505] text-[#e0e0e0] selection:bg-[#ff4d00] selection:text-white">
      {/* ─── Mobile Header ────────────────────────────────────────────────── */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#1a1a25] sticky top-0 bg-[#050505] z-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#ff4d00] rounded-full animate-pulse" />
          <span className="text-xs font-sans tracking-widest text-[#ff4d00] font-bold">طيران-أوبس</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-[#ff4d00]"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ─── Navigation Sidebar ───────────────────────────────────────────── */}
      <div className={`
        fixed inset-0 z-40 lg:relative lg:block transition-transform duration-300 lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
      `}>
        <SideNav
          selectedAircraft={selectedAircraft}
          onSelectAircraft={handleSelectAircraft}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* ─── Main Content Area ────────────────────────────────────────────── */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto scroll-smooth">
        {/* Top Header / Tab Bar */}
        <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as ViewMode)}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-black/40 border border-white/5 p-1 h-auto grid grid-cols-3 md:flex gap-1 rounded-sm">
              <TabsTrigger
                value="specs"
                className="data-[state=active]:bg-[#ff4d00] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,77,0,0.4)] text-white/40 hover:text-white/70 transition-all font-sans text-[10px] tracking-[0.2em] uppercase py-2.5 px-8 flex items-center gap-2.5 rounded-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                المواصفات
              </TabsTrigger>
              <TabsTrigger
                value="compare"
                className="data-[state=active]:bg-[#ff4d00] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,77,0,0.4)] text-white/40 hover:text-white/70 transition-all font-sans text-[10px] tracking-[0.2em] uppercase py-2.5 px-8 flex items-center gap-2.5 rounded-sm"
              >
                <Swords className="w-3.5 h-3.5" />
                المقارنة
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-[#ff4d00] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,77,0,0.4)] text-white/40 hover:text-white/70 transition-all font-sans text-[10px] tracking-[0.2em] uppercase py-2.5 px-8 flex items-center gap-2.5 rounded-sm"
              >
                <HistoryIcon className="w-3.5 h-3.5" />
                التاريخ
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="hidden md:flex items-center gap-4 py-2 px-4 bg-white/[0.02] border border-white/5 rounded-sm">
            <span className="text-[10px] font-sans text-[#666] tracking-[0.1em] uppercase font-medium">{activeCategory}</span>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#ff4d00] rounded-full animate-pulse shadow-[0_0_8px_#ff4d00]" />
              <span className="text-[11px] font-heading font-bold text-white tracking-widest uppercase">{selectedAircraft.name}</span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24">
          <AnimatePresence mode="wait">
            {viewMode === "specs" && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <AircraftDashboard aircraft={selectedAircraft} />
              </motion.div>
            )}

            {viewMode === "compare" && (
              <motion.div
                key="compare"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ComparisonTool />
              </motion.div>
            )}

            {viewMode === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <HistoryTimeline />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scanline Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] scanlines" />
      </main>
    </div>
  );
}
