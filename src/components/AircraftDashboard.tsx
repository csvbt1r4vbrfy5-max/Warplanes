"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Map, ShieldAlert, Zap, Box, Users, Target, Ruler, Maximize, X } from "lucide-react";
import { type Aircraft, specMaxValues } from "@/data/aircraft";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import OperatorsBar from "./OperatorsBar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface AircraftDashboardProps {
  aircraft: Aircraft;
}

export default function AircraftDashboard({ aircraft }: AircraftDashboardProps) {
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* ─── Presentation Mode Overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {isPresentationMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col p-8 md:p-12 overflow-hidden"
          >
            {/* Background Image */}
            {aircraft.imageUrl && (
              <div className="absolute inset-0 z-0">
                <img 
                  src={aircraft.imageUrl} 
                  alt={aircraft.name} 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
              </div>
            )}

            {/* Content HUD */}
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="bg-[#ff4d00] text-white text-[10px] tracking-widest mb-4">MODE: PRESENTATION</Badge>
                  <h1 className="text-7xl md:text-9xl font-heading font-black text-white tracking-tighter drop-shadow-2xl">
                    {aircraft.name}
                  </h1>
                  <p className="text-xl text-[#ff4d00] font-sans font-bold tracking-[0.3em] uppercase mt-2">
                    {aircraft.designation} · {aircraft.category}
                  </p>
                </div>
                <button 
                  onClick={() => setIsPresentationMode(false)}
                  className="p-4 bg-white/5 hover:bg-[#ff4d00] border border-white/10 text-white rounded-full transition-all"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl">
                <PresentationStat label="SPEED" value={`${aircraft.specs.maxSpeed} KM/H`} />
                <PresentationStat label="RANGE" value={`${aircraft.specs.range} KM`} />
                <PresentationStat label="STEALTH" value={`${aircraft.specs.stealthRating}%`} />
                <PresentationStat label="GENERATION" value={aircraft.specs.generation} />
              </div>
              
              <div className="mt-8 flex items-center gap-4 text-white/40 font-sans text-[10px] tracking-widest">
                <span>SYSTEM STATUS: OPTIMAL</span>
                <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
                <span className="ml-8 uppercase">Copyright © 2026 Tactical Encyclopedia</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Header Section ────────────────────────────────────────────────── */}
      <Card className="relative overflow-hidden bg-[rgba(10,10,15,0.8)] border-[#1a1a25] crt-overlay">
        {/* Background Aircraft Image */}
        {aircraft.imageUrl && (
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-[#0a0a0f] z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10" />
            <img 
              src={aircraft.imageUrl} 
              alt={aircraft.name} 
              className="w-full h-full object-cover object-center scale-110"
            />
          </div>
        )}
        <div className="relative z-10 p-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="text-[10px] border-[#ff4d00]/30 text-[#ff4d00] font-sans">
                {aircraft.category}
              </Badge>
              <Badge variant="secondary" className="text-[10px] bg-[#00ff88]/10 text-[#00ff88] font-sans">
                {aircraft.status}
              </Badge>
            </div>
            <h2 className="text-5xl font-heading font-bold text-white mb-1 tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {aircraft.name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] font-sans text-[#ccc] tracking-[0.1em] uppercase font-bold drop-shadow-md">
              <span>الطراز: {aircraft.designation}</span>
              <span>الناتو: {aircraft.nato}</span>
              <span>المصنع: {aircraft.manufacturer}</span>
              <span>أول تحليق: {aircraft.firstFlight}</span>
            </div>
            <p className="mt-6 text-white leading-relaxed max-w-3xl font-sans text-sm drop-shadow-md bg-black/20 p-4 rounded-sm backdrop-blur-sm border-l-2 border-[#ff4d00]/50">
              {aircraft.description}
            </p>
          </div>

          <div className="flex flex-col items-end gap-4">
            <button
              onClick={() => setIsPresentationMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-sm hover:bg-[#ff4d00] transition-all font-sans text-[10px] tracking-widest uppercase font-bold"
            >
              <Maximize className="w-3 h-3" />
              <span>وضع العرض</span>
            </button>
          </div>
        </div>

        {/* ─── Grid Stats ────────────────────────────────────────────────── */}
        <div className="relative z-10 px-8 pb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox icon={<Ruler className="w-3 h-3" />} label="باع الجناح" value={`${aircraft.specs.wingspan}م`} />
          <StatBox icon={<Box className="w-3 h-3" />} label="الطول" value={`${aircraft.specs.length}م`} />
          <StatBox icon={<Target className="w-3 h-3" />} label="الوزن" value={`${(aircraft.specs.weight / 1000).toFixed(0)}طن`} />
          <StatBox icon={<Users className="w-3 h-3" />} label="الطاقم" value={aircraft.specs.crew.toString()} />
        </div>
      </Card>

      {/* ─── Performance Metrics ────────────────────────────────────────────── */}
      <Card className="bg-[rgba(10,10,15,0.8)] border-[#1a1a25] p-8 crt-overlay">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-4 bg-[#ff4d00]" />
          <h3 className="text-xs font-sans tracking-[0.2em] text-[#ff4d00] uppercase font-bold">
            مقاييس الأداء
          </h3>
        </div>

        <div className="space-y-6">
          <MetricBar
            label="السرعة القصوى"
            value={aircraft.specs.maxSpeed}
            max={specMaxValues.maxSpeed}
            unit="كم/س"
            icon={<Gauge className="w-4 h-4" />}
          />
          <MetricBar
            label="المدى القتالي"
            value={aircraft.specs.range}
            max={specMaxValues.range}
            unit="كم"
            icon={<Map className="w-4 h-4" />}
          />
          <MetricBar
            label="سقف الخدمة"
            value={aircraft.specs.serviceCeiling}
            max={specMaxValues.serviceCeiling}
            unit="م"
            icon={<ShieldAlert className="w-4 h-4" />}
          />
          <MetricBar
            label="القدرة على التحمل"
            value={aircraft.specs.endurance}
            max={specMaxValues.endurance}
            unit="ساعة"
            icon={<Zap className="w-4 h-4" />}
          />
          <MetricBar
            label="تصنيف التخفي"
            value={aircraft.specs.stealthRating}
            max={specMaxValues.stealthRating}
            unit="%"
            icon={<ShieldAlert className="w-4 h-4" />}
          />
          <MetricBar
            label="سعة الأسلحة"
            value={aircraft.specs.weaponCapacity}
            max={specMaxValues.weaponCapacity}
            unit="كجم"
            icon={<Target className="w-4 h-4" />}
          />
        </div>
      </Card>

      {/* ─── Global Operators ─────────────────────────────────────────────── */}
      <OperatorsBar operators={aircraft.operators} />
    </div>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-[#0c0c12] border border-[#1a1a25] p-4 rounded-sm border-r-2 border-r-[#333]">
      <div className="flex items-center gap-2 text-[#555] mb-2">
        {icon}
        <span className="text-[9px] font-sans tracking-widest uppercase">{label}</span>
      </div>
      <div className="text-xl font-heading font-bold text-white tracking-tighter">{value}</div>
    </div>
  );
}

function MetricBar({
  label,
  value,
  max,
  unit,
  icon,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  icon: React.ReactNode;
}) {
  const percentage = (value / max) * 100;

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-[#888] group-hover:text-[#ccc] transition-colors">
          <span className="text-[#444] group-hover:text-[#ff4d00] transition-colors">{icon}</span>
          <span className="text-[10px] font-sans tracking-widest uppercase">{label}</span>
        </div>
        <div className="font-sans text-xs text-white">
          <span className="text-lg font-bold mr-1">{value.toLocaleString()}</span>
          <span className="text-[#444] font-medium">{unit}</span>
        </div>
      </div>
      <div className="relative h-1.5 w-full bg-[#111] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute h-full left-0 bg-[#ff4d00] shadow-[0_0_10px_rgba(255,77,0,0.5)]"
        />
      </div>
    </div>
  );
}
function PresentationStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-[#ff4d00] pl-6 py-2">
      <div className="text-[#666] text-[12px] font-sans tracking-[0.4em] mb-1 font-bold">{label}</div>
      <div className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter">{value}</div>
    </div>
  );
}
