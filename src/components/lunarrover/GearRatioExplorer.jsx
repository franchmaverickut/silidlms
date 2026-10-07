import { useState } from "react";
import { Gauge, TrendingUp, TrendingDown } from "lucide-react";

// A small, kid-friendly gear-ratio explorer.
// The pinion (small gear on the motor) drives the large gear on the axle.
export default function GearRatioExplorer() {
  const [pinion, setPinion] = useState(10);
  const [drive, setDrive] = useState(40);
  const motorRpm = 60;

  const ratio = drive / pinion;
  const wheelRpm = (motorRpm / ratio).toFixed(1);
  // Visual spin speed: pinion makes one turn per second at 60 rpm.
  const pinionSpin = 1; // seconds per rev
  const driveSpin = Math.min(ratio, 12); // seconds per rev (cap for display)

  return (
    <div className="rounded-xl border border-indigo-200 bg-white p-4 space-y-4">
      <div className="flex items-center gap-2 text-indigo-700">
        <Gauge size={16} />
        <span className="font-poppins font-bold text-xs">Gear Ratio Explorer</span>
      </div>

      {/* Gears */}
      <div className="flex items-end justify-center gap-6 py-2">
        <div className="flex flex-col items-center gap-1.5">
          <div
            className="relative rounded-full border-4 border-slate-400 bg-slate-100 animate-spin"
            style={{ width: 56, height: 56, animationDuration: `${pinionSpin}s` }}
          >
            <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-slate-500 rounded" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-600">{pinion}</span>
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">Pinion ({pinion} teeth)</span>
        </div>
        <span className="text-lg font-bold text-muted-foreground pb-6">→</span>
        <div className="flex flex-col items-center gap-1.5">
          <div
            className="relative rounded-full border-4 border-amber-500 bg-amber-100 animate-spin"
            style={{ width: 104, height: 104, animationDuration: `${driveSpin}s` }}
          >
            <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-amber-600 rounded" />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-amber-700">{drive}</span>
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">Drive gear ({drive} teeth)</span>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-3">
        <label className="block">
          <div className="flex justify-between text-[11px] font-medium text-foreground mb-1">
            <span>Pinion teeth</span><span className="font-mono text-indigo-600">{pinion}</span>
          </div>
          <input type="range" min={8} max={20} value={pinion} onChange={(e) => setPinion(Number(e.target.value))} className="w-full accent-indigo-600" />
        </label>
        <label className="block">
          <div className="flex justify-between text-[11px] font-medium text-foreground mb-1">
            <span>Drive gear teeth</span><span className="font-mono text-amber-600">{drive}</span>
          </div>
          <input type="range" min={20} max={60} value={drive} onChange={(e) => setDrive(Number(e.target.value))} className="w-full accent-amber-500" />
        </label>
      </div>

      {/* Math */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-indigo-50 p-2">
          <p className="text-[10px] text-muted-foreground">Ratio</p>
          <p className="font-poppins font-bold text-sm text-indigo-700">{ratio.toFixed(1)}:1</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2">
          <p className="text-[10px] text-muted-foreground">Motor</p>
          <p className="font-poppins font-bold text-sm text-slate-700">{motorRpm} rpm</p>
        </div>
        <div className="rounded-lg bg-green-50 p-2">
          <p className="text-[10px] text-muted-foreground">Wheel</p>
          <p className="font-poppins font-bold text-sm text-green-700">{wheelRpm} rpm</p>
        </div>
      </div>

      <div className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
        {ratio >= 4 ? <TrendingUp size={14} className="text-green-600 flex-shrink-0 mt-0.5" /> : <TrendingDown size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />}
        <span>
          {ratio.toFixed(1)}:1 means the wheel turns {ratio.toFixed(1)} times slower than the motor, but with about {ratio.toFixed(1)} times more turning force. A big ratio gives a slow, strong rover, which is perfect for climbing over small bumps.
        </span>
      </div>
    </div>
  );
}