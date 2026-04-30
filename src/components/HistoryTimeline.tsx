"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { History, ChevronRight, ChevronLeft, BookOpen, Clock } from "lucide-react";
import { timelineData, type TimelineMilestone } from "@/data/aircraft";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HistoryTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <Card className="bg-[rgba(10,10,15,0.8)] border-[#1a1a25] p-8 crt-overlay overflow-hidden">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <History className="w-5 h-5 text-[#ff4d00]" />
          <h2 className="text-xl font-heading font-bold text-white tracking-tight">
            التطور التاريخي
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("right")}
            className="p-2 border border-[#1a1a25] hover:border-[#ff4d00]/50 text-[#444] hover:text-[#ff4d00] transition-all rounded-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("left")}
            className="p-2 border border-[#1a1a25] hover:border-[#ff4d00]/50 text-[#444] hover:text-[#ff4d00] transition-all rounded-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* The Timeline Line */}
        <div className="absolute top-[41px] left-0 right-0 h-[1px] bg-[#1a1a25]" />

        <div
          ref={scrollContainerRef}
          className="flex gap-20 overflow-x-auto hide-scrollbar py-8 px-4"
        >
          {timelineData.map((milestone, i) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative shrink-0 w-48 group cursor-pointer"
              onClick={() => setSelectedMilestone(milestone)}
            >
              <div className="text-[10px] font-sans text-[#444] mb-4 group-hover:text-[#ff4d00] transition-colors text-center font-bold">
                {milestone.year}
              </div>

              {/* Point */}
              <div className="flex justify-center mb-6">
                <div className="w-4 h-4 rounded-full border-2 border-[#1a1a25] bg-[#050505] group-hover:border-[#ff4d00] group-hover:scale-125 transition-all duration-300 relative z-10">
                  <div className="absolute inset-1 rounded-full bg-[#ff4d00] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-[9px] font-sans text-[#666] tracking-[0.2em] uppercase mb-1">
                  {milestone.era}
                </div>
                <h3 className="text-sm font-heading font-bold text-[#aaa] group-hover:text-white transition-colors">
                  {milestone.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Dossier Dialog ────────────────────────────────────────────────── */}
      <Dialog open={!!selectedMilestone} onOpenChange={() => setSelectedMilestone(null)}>
        <DialogContent className="bg-[#0c0c12] border-[#1a1a25] text-white max-w-2xl crt-overlay">
          {selectedMilestone && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center gap-2 text-[#ff4d00] mb-2 font-sans text-[10px] tracking-widest uppercase">
                  <Clock className="w-3 h-3" />
                  <span>ملف الأرشيف الاستراتيجي — {selectedMilestone.year}</span>
                </div>
                <DialogTitle className="text-3xl font-heading font-bold tracking-tight">
                  {selectedMilestone.title}
                </DialogTitle>
                <DialogDescription className="text-[#ff4d00]/60 font-sans text-[11px] tracking-widest uppercase">
                  العصر: {selectedMilestone.era} {selectedMilestone.generation && `| ${selectedMilestone.generation}`}
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="h-[250px] pr-4 text-right">
                <p className="text-[#999] leading-relaxed font-sans text-sm">
                  {selectedMilestone.description}
                </p>
              </ScrollArea>

              <div className="pt-4 border-t border-[#1a1a25]">
                <div className="flex items-center gap-2 text-[#444] mb-3 text-[9px] font-sans tracking-widest uppercase">
                  <BookOpen className="w-3 h-3" />
                  <span>الطائرات الرئيسية والمساهمات</span>
                </div>
                <div className="p-4 bg-[#050505] border border-[#1a1a25] rounded-sm">
                  <p className="text-white font-sans text-xs">
                    {selectedMilestone.keyAircraft}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
