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
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col p-8 md:p-12 overflow-hidden"
          >
            {/* Background Image */}
            {aircraft.imageUrl && (
              <div className="absolute inset-0 z-0">
                <img
                  src={aircraft.imageUrl}
                  alt={aircraft.name}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
              </div>
            )}

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-7xl md:text-9xl font-heading font-black text-white tracking-tighter mb-4">
                    {aircraft.name}
                  </h1>
                  <p className="text-2xl text-[#ff4d00] font-sans font-bold tracking-widest uppercase">
                    {aircraft.designation} // {aircraft.category}
                  </p>
                </div>
                <button
                  onClick={() => setIsPresentationMode(false)}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl">
                <PresentationStat label="السرعة" value={`${aircraft.specs.maxSpeed} KM/H`} />
                <PresentationStat label="المدى" value={`${aircraft.specs.range} KM`} />
                <PresentationStat label="التخفي" value={`${aircraft.specs.stealthRating}%`} />
                <PresentationStat label="الجيل" value={aircraft.specs.generation} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Header Section ────────────────────────────────────────────────── */}
      <Card className="relative overflow-hidden bg-[rgba(10,10,15,0.8)] border-[#1a1a25] p-8 md:p-12 group">
        {/* Background Aircraft Image */}
        {aircraft.imageUrl && (
          <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10" />
            <img
              src={aircraft.imageUrl}
              alt={aircraft.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-[#ff4d00] text-white hover:bg-[#ff4d00] px-4 py-1 font-sans text-[10px] uppercase tracking-widest">
                {aircraft.category}
              </Badge>
              <Badge variant="outline" className="border-[#ff4d00]/30 text-[#ff4d00] px-4 py-1 font-sans text-[10px] uppercase tracking-widest">
                {aircraft.status}
              </Badge>
            </div>

            <h2 className="text-6xl md:text-8xl font-heading font-black text-white tracking-tighter leading-none">
              {aircraft.name}
            </h2>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-sans text-[#666] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">المُعرف: <span className="text-white">{aircraft.designation}</span></div>
              <div className="flex items-center gap-2">ناتو: <span className="text-white">{aircraft.nato}</span></div>
              <div className="flex items-center gap-2">المصنع: <span className="text-white">{aircraft.manufacturer}</span></div>
              <div className="flex items-center gap-2">أول طيران: <span className="text-white">{aircraft.firstFlight}</span></div>
            </div>

            <p className="text-lg text-[#999] leading-relaxed max-w-3xl font-sans font-light">
              {aircraft.description}
            </p>
          </div>

          <button
            onClick={() => setIsPresentationMode(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-[#ff4d00] text-white rounded-full border border-white/10 hover:border-[#ff4d00] transition-all group/btn"
          >
            <Maximize className="w-4 h-4 group-hover/btn:scale-125 transition-transform" />
            <span className="font-sans text-xs font-bold uppercase tracking-widest">عرض ملء الشاشة</span>
          </button>
        </div>

        {/* ─── Grid Stats ────────────────────────────────────────────────── */}
        <div className="relative z-10 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatBox label="باع الجناح" value={`${aircraft.specs.wingspan}M`} />
          <StatBox label="الطول" value={`${aircraft.specs.length}M`} />
          <StatBox label="الوزن" value={`${(aircraft.specs.weight / 1000).toFixed(0)}T`} />
          <StatBox label="الطاقم" value={aircraft.specs.crew.toString()} />
        </div>
      </Card>

      {/* ─── Performance Metrics ────────────────────────────────────────────── */}
      <Card className="bg-[rgba(10,10,15,0.4)] border-[#1a1a25] p-8 md:p-12">
        <h3 className="text-sm font-sans tracking-[0.3em] text-[#ff4d00] uppercase font-bold mb-10 border-r-2 border-[#ff4d00] pr-4">
          مقاييس الأداء القتالي
        </h3>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          <MetricBar
            label="السرعة القصوى"
            value={aircraft.specs.maxSpeed}
            max={specMaxValues.maxSpeed}
            unit="KM/H"
            icon={<Gauge className="w-4 h-4" />}
          />
          <MetricBar
            label="المدى العملياتي"
            value={aircraft.specs.range}
            max={specMaxValues.range}
            unit="KM"
            icon={<Map className="w-4 h-4" />}
          />
          <MetricBar
            label="سقف الخدمة"
            value={aircraft.specs.serviceCeiling}
            max={specMaxValues.serviceCeiling}
            unit="M"
            icon={<ShieldAlert className="w-4 h-4" />}
          />
          <MetricBar
            label="القدرة على التحمل"
            value={aircraft.specs.endurance}
            max={specMaxValues.endurance}
            unit="HRS"
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
            unit="KG"
            icon={<Target className="w-4 h-4" />}
          />
        </div>
      </Card>

      {/* ─── Global Operators ─────────────────────────────────────────────── */}
      <OperatorsBar operators={aircraft.operators} />
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.05] transition-all group">
      <div className="text-[#444] text-[10px] font-sans tracking-widest mb-2 uppercase group-hover:text-[#ff4d00] transition-colors">
        {label}
      </div>
      <div className="text-3xl font-heading font-black text-white">
        {value}
      </div>
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
      <div className="flex justify-between items-end mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg text-[#ff4d00] group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <span className="text-xs tracking-widest text-[#666] uppercase font-bold">
            {label}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xl font-black text-white mr-2">{value.toLocaleString()}</span>
          <span className="text-[10px] text-[#444]">{unit}</span>
        </div>
      </div>
      <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute h-full left-0 bg-[#ff4d00] shadow-[0_0_15px_rgba(255,77,0,0.5)]"
        />
      </div>
    </div>
  );
}

function PresentationStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2 border-r-2 border-[#ff4d00] pr-6">
      <div className="text-[#666] text-xs font-sans tracking-widest uppercase">{label}</div>
      <div className="text-4xl md:text-5xl font-heading font-black text-white">{value}</div>
    </div>
  );
}
