"use client";

import { type Operator } from "@/data/aircraft";
import { Globe, MapPin } from "lucide-react";

interface OperatorsBarProps {
  operators: Operator[];
}

export default function OperatorsBar({ operators }: OperatorsBarProps) {
  return (
    <div className="pt-10 border-t border-matrix/10 font-mono">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 text-matrix/60 text-[10px] tracking-[0.3em] uppercase font-black">
          <Globe className="w-3 h-3" />
          <span>GLOBAL_DEPLOYMENT_FEED</span>
        </div>
        <div className="text-[8px] text-matrix/20 tracking-widest">REALTIME_STRAT_DATA</div>
      </div>

      <div className="relative overflow-hidden group py-4 bg-matrix/5 border-y border-matrix/10">
        <div className="flex gap-16 animate-marquee-slow whitespace-nowrap">
          {/* Repeat multiple times for seamless marquee */}
          {[...operators, ...operators, ...operators].map((op, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0 relative group/item">
              <div className="relative">
                <span className="text-3xl grayscale group-hover/item:grayscale-0 transition-all duration-500 scale-100 group-hover/item:scale-110 inline-block">
                  {op.flag}
                </span>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-matrix rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity animate-pulse" />
              </div>
              
              <div className="text-right">
                <div className="text-xs font-black text-matrix/60 group-hover/item:text-matrix transition-colors tracking-widest">
                  {op.country.toUpperCase()}
                </div>
                <div className="flex items-center gap-2 text-[8px] text-matrix/20 tracking-tighter uppercase mt-1">
                  <MapPin className="w-2 h-2" />
                  ASSIGN_YEAR: {op.year}
                </div>
              </div>
              
              {/* Divider line between items */}
              <div className="h-8 w-[1px] bg-matrix/10 ml-8" />
            </div>
          ))}
        </div>

        {/* Fade masks */}
        <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-[#020204] to-transparent z-10" />
        <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-[#020204] to-transparent z-10" />
      </div>
    </div>
  );
}
