"use client";

import { type Operator } from "@/data/aircraft";
import { Globe } from "lucide-react";

interface OperatorsBarProps {
  operators: Operator[];
}

export default function OperatorsBar({ operators }: OperatorsBarProps) {
  return (
    <div className="pt-8 border-t border-[#1a1a25]">
      <div className="flex items-center gap-2 mb-6 text-[#ff4d00]/60 font-sans text-[10px] tracking-widest uppercase font-bold">
        <Globe className="w-3 h-3" />
        <span>المشغلون العالميون</span>
      </div>

      <div className="relative overflow-hidden group">
        <div className="flex gap-12 animate-marquee-slow whitespace-nowrap">
          {/* Repeat multiple times for seamless marquee */}
          {[...operators, ...operators, ...operators].map((op, i) => (
            <div key={i} className="flex items-center gap-4 shrink-0">
              <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-500">
                {op.flag}
              </span>
              <div className="text-right">
                <div className="text-sm font-sans font-bold text-[#ccc] group-hover:text-white transition-colors">
                  {op.country}
                </div>
                <div className="text-[9px] font-sans text-[#444] tracking-widest uppercase">
                  التكليف: {op.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fade masks */}
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      </div>
    </div>
  );
}
