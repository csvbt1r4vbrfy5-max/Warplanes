"use client";

import { type Operator } from "@/data/aircraft";
import { Globe } from "lucide-react";

interface OperatorsBarProps {
  operators: Operator[];
}

export default function OperatorsBar({ operators }: OperatorsBarProps) {
  return (
    <div className="pt-10 border-t border-[#1a1a25]">
      <div className="flex items-center gap-3 mb-8 text-[#ff4d00]">
        <Globe className="w-4 h-4" />
        <h3 className="text-xs font-sans font-black tracking-widest uppercase">
          المشغلون حول العالم
        </h3>
      </div>

      <div className="relative overflow-hidden group">
        <div className="flex gap-12 animate-marquee whitespace-nowrap py-4">
          {/* Repeat multiple times for seamless marquee */}
          {[...operators, ...operators, ...operators].map((op, i) => (
            <div key={i} className="flex items-center gap-4 shrink-0 px-6 py-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[#ff4d00]/30 transition-colors">
              <span className="text-3xl transition-all duration-500">
                {op.flag}
              </span>
              <div className="text-right">
                <div className="text-[11px] font-sans font-black text-white uppercase tracking-wider">
                  {op.country}
                </div>
                <div className="text-[9px] font-sans text-[#444] uppercase mt-0.5">
                  منذ عام: {op.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fade masks */}
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      </div>
    </div>
  );
}
