"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Map, ShieldAlert, Zap, Box, Users, Target, Ruler, Maximize, X, Terminal } from "lucide-react";
import { type Aircraft, specMaxValues } from "@/data/aircraft";
import { Card } from "@/components/ui/card";
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
            className="fixed inset-0 z-[100] bg-[#020204] flex flex-col p-8 md:p-12 overflow-hidden"
          >
            {/* HUD Scanlines */}
            <div className="scanlines opacity-20" />
            
            {/* Background Image */}
            {aircraft.imageUrl && (
              <div className="absolute inset-0 z-0">
                <img 
                  src={aircraft.imageUrl} 
                  alt={aircraft.name} 
                  className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/40 to-[#020204]/80" />
              </div>
            )}

            {/* Content HUD */}
            <div className="relative z-10 h-full flex flex-col font-mono">
              <div className="flex justify-between items-start border-b border-matrix/20 pb-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-3 bg-matrix animate-pulse" />
                    <Badge className="bg-matrix text-black text-[10px] tracking-widest px-4 py-1 rounded-none font-black">
                      SYSTEM_INIT // PRESENTATION_MODE
                    </Badge>
                  </div>
                  <h1 className="text-7xl md:text-9xl font-heading font-black text-white tracking-tighter text-glow-matrix">
                    {aircraft.name}
                  </h1>
                  <p className="text-xl text-matrix/80 font-mono tracking-[0.3em] uppercase mt-4">
                    ID: {aircraft.designation} // TYPE: {aircraft.category}
                  </p>
                </div>
                <button 
                  onClick={() => setIsPresentationMode(false)}
                  className="p-4 bg-matrix/10 hover:bg-matrix border border-matrix/30 text-matrix hover:text-black transition-all"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl">
                <PresentationStat label="VELOCITY" value={`${aircraft.specs.maxSpeed} KM/H`} />
                <PresentationStat label="OPERATIONAL_RANGE" value={`${aircraft.specs.range} KM`} />
                <PresentationStat label="STEalth_SIG" value={`${aircraft.specs.stealthRating}%`} />
                <PresentationStat label="GEN_CLASS" value={aircraft.specs.generation} />
              </div>
              
              <div className="mt-auto flex items-center justify-between text-matrix/40 text-[10px] tracking-widest py-4 border-t border-matrix/10">
                <div className="flex items-center gap-4">
                  <Terminal className="w-3 h-3" />
                  <span>ENCRYPTION: AES-256-GCM</span>
                  <span className="ml-4 cursor-blink">DATA_SYNCING</span>
                </div>
                <span className="uppercase">© 2026 GHOST_COMMAND_SYSTEMS</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Header Section ────────────────────────────────────────────────── */}
      <Card className="relative overflow-hidden bg-black/40 border-matrix/20 rounded-none border-t-4 border-t-matrix shadow-[0_0_30px_rgba(0,255,65,0.05)]">
        {/* Background Aircraft Image */}
        {aircraft.imageUrl && (
          <div className="absolute inset-0 z-0 opacity-30 grayscale">
            <div className="absolute inset-0 bg-gradient-to-r from-[#020204] via-transparent to-[#020204] z-10" />
            <img 
              src={aircraft.imageUrl} 
              alt={aircraft.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}
        
        <div className="relative z-10 p-8 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-matrix/10 border border-matrix/30 text-matrix text-[10px] font-mono tracking-widest uppercase">
                {aircraft.category}
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-white/60 text-[10px] font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-matrix rounded-full animate-pulse" />
                {aircraft.status}
              </div>
            </div>
            
            <h2 className="text-6xl font-heading font-black text-white tracking-tight text-glow-matrix">
              {aircraft.name}
            </h2>
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[10px] font-mono text-matrix/60 tracking-[0.2em] uppercase">
              <div className="flex items-center gap-2"><div className="w-1 h-1 bg-matrix" /> SN: {aircraft.designation}</div>
              <div className="flex items-center gap-2"><div className="w-1 h-1 bg-matrix" /> NATO: {aircraft.nato}</div>
              <div className="flex items-center gap-2"><div className="w-1 h-1 bg-matrix" /> MFG: {aircraft.manufacturer}</div>
              <div className="flex items-center gap-2"><div className="w-1 h-1 bg-matrix" /> EST: {aircraft.firstFlight}</div>
            </div>
            
            <div className="card-terminal text-white/80 font-mono text-sm leading-relaxed border-matrix/40" data-id={aircraft.id.toUpperCase()}>
              <p className="border-l-2 border-matrix/30 pl-4">
                {aircraft.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <button
              onClick={() => setIsPresentationMode(true)}
              className="btn-tactical"
            >
              <div className="flex items-center gap-2">
                <Maximize className="w-3 h-3" />
                <span>INIT_PRESENTATION</span>
              </div>
            </button>
          </div>
        </div>

        {/* ─── Grid Stats ────────────────────────────────────────────────── */}
        <div className="relative z-10 px-8 pb-8 grid grid-cols-2 md:grid-cols-4 gap-1">
          <StatBox label="WINGSPAN" value={`${aircraft.specs.wingspan}M`} />
          <StatBox label="LENGTH" value={`${aircraft.specs.length}M`} />
          <StatBox label="WEIGHT" value={`${(aircraft.specs.weight / 1000).toFixed(0)}T`} />
          <StatBox label="CREW" value={aircraft.specs.crew.toString()} />
        </div>
      </Card>

      {/* ─── Performance Metrics ────────────────────────────────────────────── */}
      <Card className="bg-black/60 border-matrix/20 rounded-none p-8 border-l-4 border-l-matrix">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-[2px] bg-matrix" />
          <h3 className="text-xs font-mono tracking-[0.4em] text-matrix uppercase font-black">
            PERFORMANCE_DATA_FEED
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          <MetricBar
            label="MAX_VELOCITY"
            value={aircraft.specs.maxSpeed}
            max={specMaxValues.maxSpeed}
            unit="KM/H"
            icon={<Gauge className="w-4 h-4" />}
          />
          <MetricBar
            label="OPERATIONAL_RADIUS"
            value={aircraft.specs.range}
            max={specMaxValues.range}
            unit="KM"
            icon={<Map className="w-4 h-4" />}
          />
          <MetricBar
            label="CEILING_LIMIT"
            value={aircraft.specs.serviceCeiling}
            max={specMaxValues.serviceCeiling}
            unit="M"
            icon={<ShieldAlert className="w-4 h-4" />}
          />
          <MetricBar
            label="ENDURANCE_WINDOW"
            value={aircraft.specs.endurance}
            max={specMaxValues.endurance}
            unit="HRS"
            icon={<Zap className="w-4 h-4" />}
          />
          <MetricBar
            label="STEALTH_COEFFICIENT"
            value={aircraft.specs.stealthRating}
            max={specMaxValues.stealthRating}
            unit="%"
            icon={<ShieldAlert className="w-4 h-4" />}
          />
          <MetricBar
            label="ORDNANCE_CAPACITY"
            value={aircraft.specs.weaponCapacity}
            max={specMaxValues.weaponCapacity}
            unit="KG"
            icon={<Target className="w-4 h-4" />}
          />
        </div>
      </Card>

      {/* ─── Global Operators ─────────────────────────────────────────────── */}
      <div className="border-t border-matrix/10 pt-8">
        <OperatorsBar operators={aircraft.operators} />
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-matrix/5 border border-matrix/10 p-6 transition-all hover:bg-matrix/10 group">
      <div className="text-matrix/40 text-[9px] font-mono tracking-[0.3em] mb-2 font-bold group-hover:text-matrix/60 transition-colors">
        {label}
      </div>
      <div className="text-3xl font-heading font-black text-white tracking-tighter group-hover:text-matrix transition-colors">
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
    <div className="group font-mono">
      <div className="flex justify-between items-end mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-matrix/5 border border-matrix/20 text-matrix">
            {icon}
          </div>
          <span className="text-[10px] tracking-[0.2em] text-matrix/60 group-hover:text-matrix transition-colors">
            {label}
          </span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-white mr-2">{value.toLocaleString()}</span>
          <span className="text-[10px] text-matrix/40">{unit}</span>
        </div>
      </div>
      <div className="relative h-2 w-full bg-matrix/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="absolute h-full left-0 bg-matrix shadow-[0_0_15px_rgba(0,255,65,0.5)]"
        />
        {/* Decorative Grid on Bar */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,rgba(0,0,0,0.4)_95%)] bg-[size:10%_100%]" />
      </div>
    </div>
  );
}

function PresentationStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-4 border-matrix pl-8 py-2 bg-matrix/5">
      <div className="text-matrix/40 text-[12px] font-mono tracking-[0.4em] mb-2 font-bold uppercase">{label}</div>
      <div className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter text-glow-matrix">{value}</div>
    </div>
  );
}
