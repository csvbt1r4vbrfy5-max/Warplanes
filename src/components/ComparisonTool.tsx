"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Gauge, Map, ShieldAlert, Target, Zap, Swords } from "lucide-react";
import { aircraftData, type Aircraft, specMaxValues } from "@/data/aircraft";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ComparisonTool() {
  const [alphaId, setAlphaId] = useState<string>("");
  const [bravoId, setBravoId] = useState<string>("");

  const alpha = aircraftData.find((a) => a.id === alphaId);
  const bravo = aircraftData.find((a) => a.id === bravoId);

  return (
    <Card className="bg-[rgba(10,10,15,0.8)] border-[#1a1a25] p-8 crt-overlay">
      <div className="flex items-center gap-3 mb-10">
        <Swords className="w-5 h-5 text-[#ff4d00]" />
        <h2 className="text-xl font-heading font-bold text-white tracking-tight">
          مقارنة قتالية 1 ضد 1
        </h2>
      </div>

      {/* ─── Selection Controls ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-8 mb-12">
        <div className="space-y-2">
          <label className="text-[10px] font-sans text-[#444] uppercase tracking-widest block mb-1">
            الطائرة الأولى
          </label>
          <Select onValueChange={setAlphaId} value={alphaId}>
            <SelectTrigger className="bg-[#0c0c12] border-[#1a1a25] text-white font-sans text-xs h-12 focus:ring-[#ff4d00]/30 transition-all w-full">
              <SelectValue>
                {alpha ? `${alpha.name} (${alpha.designation})` : "— اختر الطائرة —"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-[#0c0c12] border-[#1a1a25] text-white font-sans min-w-[280px]">
              {aircraftData.map((a) => (
                <SelectItem 
                  key={a.id} 
                  value={a.id} 
                  className="focus:bg-[#ff4d00]/10 focus:text-white text-right cursor-pointer py-3"
                >
                  {a.name} ({a.designation})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full border border-[#ff4d00]/20 flex items-center justify-center text-[10px] font-sans text-[#ff4d00] font-bold bg-[#ff4d00]/5 pulse-ring">
            VS
          </div>
        </div>

        <div className="space-y-2 text-left md:text-right">
          <label className="text-[10px] font-sans text-[#444] uppercase tracking-widest block mb-1">
            الطائرة الثانية
          </label>
          <Select onValueChange={setBravoId} value={bravoId}>
            <SelectTrigger className="bg-[#0c0c12] border-[#1a1a25] text-white font-sans text-xs h-12 focus:ring-[#ff4d00]/30 transition-all w-full">
              <SelectValue>
                {bravo ? `${bravo.name} (${bravo.designation})` : "— اختر الطائرة —"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-[#0c0c12] border-[#1a1a25] text-white font-sans min-w-[280px]">
              {aircraftData.map((a) => (
                <SelectItem 
                  key={a.id} 
                  value={a.id} 
                  className="focus:bg-[#ff4d00]/10 focus:text-white text-right cursor-pointer py-3"
                >
                  {a.name} ({a.designation})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ─── Comparison Grid ─────────────────────────────────────────────── */}
      <div className="space-y-10 min-h-[400px]">
        {alpha && bravo ? (
          <div className="space-y-8">
            {/* Column Headers */}
            <div className="grid grid-cols-[1fr,40px,1fr] gap-4 mb-8">
              <div className="text-center p-4 bg-[#ff4d00]/10 border-b-2 border-[#ff4d00] rounded-t-lg">
                <span className="text-xs font-sans font-bold text-[#ff4d00] uppercase tracking-widest block mb-1">الطائرة الأولى</span>
                <span className="text-sm font-heading font-black text-white">{alpha.name}</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-[#444] flex items-center justify-center text-[10px] text-[#444] font-bold">VS</div>
              </div>
              <div className="text-center p-4 bg-[#00ff88]/10 border-b-2 border-[#00ff88] rounded-t-lg">
                <span className="text-xs font-sans font-bold text-[#00ff88] uppercase tracking-widest block mb-1">الطائرة الثانية</span>
                <span className="text-sm font-heading font-black text-white">{bravo.name}</span>
              </div>
            </div>

            <ComparisonMetric
              label="السرعة القصوى"
              alphaValue={alpha.specs.maxSpeed}
              bravoValue={bravo.specs.maxSpeed}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.maxSpeed}
              icon={<Gauge className="w-4 h-4" />}
            />
            <ComparisonMetric
              label="المدى القتالي"
              alphaValue={alpha.specs.range}
              bravoValue={bravo.specs.range}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.range}
              icon={<Map className="w-4 h-4" />}
            />
            <ComparisonMetric
              label="سقف الخدمة"
              alphaValue={alpha.specs.serviceCeiling}
              bravoValue={bravo.specs.serviceCeiling}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.serviceCeiling}
              icon={<ShieldAlert className="w-4 h-4" />}
            />
            <ComparisonMetric
              label="القدرة على التحمل"
              alphaValue={alpha.specs.endurance}
              bravoValue={bravo.specs.endurance}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.endurance}
              icon={<Zap className="w-4 h-4" />}
            />
            <ComparisonMetric
              label="تصنيف التخفي"
              alphaValue={alpha.specs.stealthRating}
              bravoValue={bravo.specs.stealthRating}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.stealthRating}
              icon={<ShieldAlert className="w-4 h-4" />}
            />
            <ComparisonMetric
              label="سعة الأسلحة"
              alphaValue={alpha.specs.weaponCapacity}
              bravoValue={bravo.specs.weaponCapacity}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.weaponCapacity}
              icon={<Target className="w-4 h-4" />}
            />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-20 opacity-20 group">
            <Swords className="w-16 h-16 text-[#444] mb-4 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-sm font-sans tracking-widest text-[#444] uppercase">
              اختر طائرتين للمقارنة
            </h3>
            <p className="text-[10px] text-[#222] mt-2 max-w-[200px] text-center">
              سيتم تحليل مقاييس الأداء جنباً إلى جنب
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

function ComparisonMetric({
  label,
  alphaValue,
  bravoValue,
  alphaName,
  bravoName,
  max,
  icon,
}: {
  label: string;
  alphaValue: number;
  bravoValue: number;
  alphaName: string;
  bravoName: string;
  max: number;
  icon: React.ReactNode;
}) {
  const alphaPercent = (alphaValue / max) * 100;
  const bravoPercent = (bravoValue / max) * 100;
  const alphaWins = alphaValue > bravoValue;
  const bravoWins = bravoValue > alphaValue;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-[#444]">
        {icon}
        <span className="text-[9px] font-sans tracking-[0.2em] uppercase font-bold">
          {label}
        </span>
      </div>

      <div className="grid grid-cols-[1fr,40px,1fr] items-center gap-6">
        {/* Alpha Side */}
        <div className="space-y-2">
          <div className="flex justify-between items-end px-1">
            <span className="text-[9px] text-[#ff4d00] font-sans font-bold uppercase truncate max-w-[120px]">
              {alphaName}
            </span>
            <span className={`text-sm font-sans font-black transition-colors ${alphaWins ? "text-[#ff4d00]" : "text-[#444]"}`}>
              {alphaValue.toLocaleString()}
            </span>
          </div>
          <div className="relative h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-[#1a1a25]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${alphaPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`absolute h-full right-0 ${
                alphaWins
                  ? "bg-[#ff4d00] shadow-[0_0_12px_rgba(255,77,0,0.4)]"
                  : "bg-[#444] opacity-20"
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="text-[8px] font-sans text-[#222] font-bold">VS</div>
        </div>

        {/* Bravo Side */}
        <div className="space-y-2">
          <div className="flex justify-between items-end px-1">
            <span className={`text-sm font-sans font-black transition-colors ${bravoWins ? "text-[#00ff88]" : "text-[#444]"}`}>
              {bravoValue.toLocaleString()}
            </span>
            <span className="text-[9px] text-[#00ff88] font-sans font-bold uppercase truncate max-w-[120px]">
              {bravoName}
            </span>
          </div>
          <div className="relative h-2 bg-[#0a0a0f] rounded-full overflow-hidden border border-[#1a1a25]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${bravoPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`absolute h-full left-0 ${
                bravoWins
                  ? "bg-[#00ff88] shadow-[0_0_12px_rgba(0,255,136,0.4)]"
                  : "bg-[#444] opacity-20"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
