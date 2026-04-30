"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Gauge, Map, ShieldAlert, Target, Zap, Swords, AlertCircle } from "lucide-react";
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
    <Card className="bg-black/60 border-matrix/20 p-8 rounded-none border-t-4 border-t-matrix relative overflow-hidden font-mono">
      {/* HUD Accents */}
      <div className="absolute top-0 right-0 p-2 text-[8px] text-matrix/20">ANALYSIS_MODE: ACTIVE</div>
      
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-matrix/10 border border-matrix/30">
          <Swords className="w-5 h-5 text-matrix" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-black text-white tracking-widest uppercase">
            COMBAT_SIMULATION_1V1
          </h2>
          <p className="text-[10px] text-matrix/40 tracking-widest">TACTICAL_COMPARISON_MATRIX</p>
        </div>
      </div>

      {/* ─── Selection Controls ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-8 mb-16">
        <div className="space-y-3">
          <label className="text-[10px] text-matrix/60 uppercase tracking-[0.2em] block">
            UNIT_ALPHA_SELECT
          </label>
          <Select onValueChange={setAlphaId} value={alphaId}>
            <SelectTrigger className="bg-black/80 border-matrix/30 text-matrix font-mono text-xs h-12 focus:ring-matrix/30 rounded-none transition-all w-full">
              <SelectValue>
                {alpha ? `${alpha.name}` : "— CHOOSE_UNIT —"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-black border-matrix/30 text-matrix font-mono rounded-none">
              {aircraftData.map((a) => (
                <SelectItem 
                  key={a.id} 
                  value={a.id} 
                  className="focus:bg-matrix focus:text-black text-right cursor-pointer py-3 rounded-none"
                >
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center">
          <div className="w-12 h-12 border border-matrix/30 flex items-center justify-center text-xs text-matrix font-black bg-matrix/5 rotate-45">
            <span className="-rotate-45">VS</span>
          </div>
        </div>

        <div className="space-y-3 text-left md:text-right">
          <label className="text-[10px] text-matrix/60 uppercase tracking-[0.2em] block">
            UNIT_BRAVO_SELECT
          </label>
          <Select onValueChange={setBravoId} value={bravoId}>
            <SelectTrigger className="bg-black/80 border-matrix/30 text-matrix font-mono text-xs h-12 focus:ring-matrix/30 rounded-none transition-all w-full">
              <SelectValue>
                {bravo ? `${bravo.name}` : "— CHOOSE_UNIT —"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-black border-matrix/30 text-matrix font-mono rounded-none">
              {aircraftData.map((a) => (
                <SelectItem 
                  key={a.id} 
                  value={a.id} 
                  className="focus:bg-matrix focus:text-black text-right cursor-pointer py-3 rounded-none"
                >
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ─── Comparison Grid ─────────────────────────────────────────────── */}
      <div className="space-y-12 min-h-[400px]">
        {alpha && bravo ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Column Headers */}
            <div className="grid grid-cols-[1fr,60px,1fr] gap-6 mb-12">
              <div className="text-center p-6 bg-matrix/10 border-b-4 border-matrix relative">
                <div className="absolute top-2 left-2 text-[8px] text-matrix/40">ALPHA_UNIT</div>
                <span className="text-2xl font-heading font-black text-white text-glow-matrix">{alpha.name}</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-1 h-8 bg-matrix/20" />
              </div>
              <div className="text-center p-6 bg-hud-blue/10 border-b-4 border-hud-blue relative">
                <div className="absolute top-2 right-2 text-[8px] text-hud-blue/40">BRAVO_UNIT</div>
                <span className="text-2xl font-heading font-black text-white shadow-[0_0_15px_rgba(0,242,255,0.3)]">{bravo.name}</span>
              </div>
            </div>

            <ComparisonMetric
              label="VELOCITY_TEST"
              alphaValue={alpha.specs.maxSpeed}
              bravoValue={bravo.specs.maxSpeed}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.maxSpeed}
              icon={<Gauge className="w-4 h-4" />}
            />
            <ComparisonMetric
              label="OPERATIONAL_RANGE"
              alphaValue={alpha.specs.range}
              bravoValue={bravo.specs.range}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.range}
              icon={<Map className="w-4 h-4" />}
            />
            <ComparisonMetric
              label="CEILING_LIMIT"
              alphaValue={alpha.specs.serviceCeiling}
              bravoValue={bravo.specs.serviceCeiling}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.serviceCeiling}
              icon={<ShieldAlert className="w-4 h-4" />}
            />
            <ComparisonMetric
              label="ENDURANCE_CAP"
              alphaValue={alpha.specs.endurance}
              bravoValue={bravo.specs.endurance}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.endurance}
              icon={<Zap className="w-4 h-4" />}
            />
            <ComparisonMetric
              label="STEALTH_SIGNATURE"
              alphaValue={alpha.specs.stealthRating}
              bravoValue={bravo.specs.stealthRating}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.stealthRating}
              icon={<ShieldAlert className="w-4 h-4" />}
            />
            <ComparisonMetric
              label="ORDNANCE_LOAD"
              alphaValue={alpha.specs.weaponCapacity}
              bravoValue={bravo.specs.weaponCapacity}
              alphaName={alpha.name}
              bravoName={bravo.name}
              max={specMaxValues.weaponCapacity}
              icon={<Target className="w-4 h-4" />}
            />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-24 opacity-20 group relative">
            <div className="radar-ping absolute">
              <Swords className="w-20 h-20 text-matrix mb-6 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-sm font-mono tracking-[0.5em] text-matrix uppercase mt-24">
              AWAITING_INPUT_UNITS
            </h3>
            <div className="flex items-center gap-2 mt-4 text-[10px] text-matrix/60">
              <AlertCircle className="w-3 h-3" />
              <span>SELECT TWO ASSETS FOR DATA CONFLICT ANALYSIS</span>
            </div>
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
    <div className="space-y-4 font-mono group">
      <div className="flex items-center justify-center gap-3 text-matrix/40 group-hover:text-matrix/80 transition-colors">
        <div className="w-12 h-[1px] bg-matrix/20" />
        <span className="text-[10px] tracking-[0.3em] uppercase font-black">
          {label}
        </span>
        <div className="w-12 h-[1px] bg-matrix/20" />
      </div>

      <div className="grid grid-cols-[1fr,60px,1fr] items-center gap-8">
        {/* Alpha Side */}
        <div className="space-y-3">
          <div className="flex justify-between items-end px-1">
            <span className="text-[10px] text-matrix font-black uppercase truncate max-w-[150px]">
              {alphaName}
            </span>
            <span className={`text-xl font-black transition-all ${alphaWins ? "text-matrix text-glow-matrix" : "text-matrix/30"}`}>
              {alphaValue.toLocaleString()}
            </span>
          </div>
          <div className="relative h-3 bg-matrix/5 border border-matrix/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${alphaPercent}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className={`absolute h-full right-0 ${
                alphaWins
                  ? "bg-matrix shadow-[0_0_20px_rgba(0,255,65,0.4)]"
                  : "bg-matrix/10"
              }`}
            />
            {/* Holographic segments */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_90%,rgba(0,0,0,0.3)_90%)] bg-[size:10%_100%]" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="text-[8px] text-matrix/20 font-black">CONFLICT</div>
        </div>

        {/* Bravo Side */}
        <div className="space-y-3">
          <div className="flex justify-between items-end px-1">
            <span className={`text-xl font-black transition-all ${bravoWins ? "text-hud-blue shadow-[0_0_15px_rgba(0,242,255,0.4)]" : "text-hud-blue/30"}`}>
              {bravoValue.toLocaleString()}
            </span>
            <span className="text-[10px] text-hud-blue font-black uppercase truncate max-w-[150px]">
              {bravoName}
            </span>
          </div>
          <div className="relative h-3 bg-hud-blue/5 border border-hud-blue/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${bravoPercent}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className={`absolute h-full left-0 ${
                bravoWins
                  ? "bg-hud-blue shadow-[0_0_20px_rgba(0,242,255,0.4)]"
                  : "bg-hud-blue/10"
              }`}
            />
            {/* Holographic segments */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_90%,rgba(0,0,0,0.3)_90%)] bg-[size:10%_100%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
