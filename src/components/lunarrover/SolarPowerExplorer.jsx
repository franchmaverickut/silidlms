import { useState } from "react";
import { Sun, Zap, Cloud } from "lucide-react";

// Kid-friendly solar-power explorer.
// Shows how sun angle and clouds affect the power a solar panel makes,
// and whether the rover has enough power to drive.
export default function SolarPowerExplorer() {
  const [angle, setAngle] = useState(60); // sun elevation 0-90
  const [cloud, setCloud] = useState(10); // cloud cover 0-100

  const panelWatts = 1.5; // each small panel
  const motorNeeds = 0.9; // watts needed to move
  const effective = panelWatts * Math.cos((angle * Math.PI) / 180) * (1 - cloud / 100);
  const canMove = effective >= motorNeeds;
  const powerPct = Math.min(100, Math.round((effective / 1.5) * 100));

  // Sun position on an arc: angle 90 = top, 0 = right horizon
  const sunLeft = 50 + Math.cos((angle * Math.PI) / 180) * 42;
  const sunTop = 92 - Math.sin((angle * Math.PI) / 180) * 78;

  return (
    <div className="rounded-xl border border-amber-200 bg-white p-4 space-y-4">
      <div className="flex items-center gap-2 text-amber-700">
        <Sun size={16} />
        <span className="font-poppins font-bold text-xs">Solar Power Explorer</span>
      </div>

      {/* Sky scene */}
      <div className="relative rounded-xl overflow-hidden border border-border/60 bg-gradient-to-b from-sky-100 to-sky-50" style={{ height: 120 }}>
        <span
          className="absolute text-3xl transition-all duration-200"
          style={{ left: `${sunLeft}%`, top: `${sunTop}%`, transform: "translate(-50%, -50%)" }}
        >☀️</span>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span
            className={`text-3xl transition-transform duration-300 ${canMove ? "animate-bounce" : ""}`}
          >🤖</span>
          {canMove && <span className="text-[10px] font-bold text-green-700">Moving!</span>}
        </div>
        {cloud > 40 && (
          <span className="absolute top-3 left-6 text-2xl opacity-80">☁️</span>
        )}
      </div>

      {/* Sliders */}
      <div className="space-y-3">
        <label className="block">
          <div className="flex justify-between text-[11px] font-medium text-foreground mb-1">
            <span className="flex items-center gap-1"><Sun size={11} /> Sun height</span><span className="font-mono text-amber-600">{angle}°</span>
          </div>
          <input type="range" min={0} max={90} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-amber-500" />
        </label>
        <label className="block">
          <div className="flex justify-between text-[11px] font-medium text-foreground mb-1">
            <span className="flex items-center gap-1"><Cloud size={11} /> Cloud cover</span><span className="font-mono text-slate-500">{cloud}%</span>
          </div>
          <input type="range" min={0} max={100} value={cloud} onChange={(e) => setCloud(Number(e.target.value))} className="w-full accent-slate-400" />
        </label>
      </div>

      {/* Power bar */}
      <div>
        <div className="flex justify-between text-[11px] font-medium text-foreground mb-1">
          <span className="flex items-center gap-1"><Zap size={11} className="text-amber-500" /> Power captured</span>
          <span className={`font-bold ${canMove ? "text-green-600" : "text-red-500"}`}>{effective.toFixed(2)} W</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden relative">
          <div
            className={`h-full transition-all duration-300 ${canMove ? "bg-green-500" : "bg-amber-400"}`}
            style={{ width: `${powerPct}%` }}
          />
          <span className="absolute top-0 bottom-0 border-l-2 border-red-500/70" style={{ left: `${(motorNeeds / 1.5) * 100}%` }} />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">The red line shows the power the motor needs to move.</p>
      </div>

      <p className="text-[11px] text-foreground/70 leading-relaxed">
        {canMove
          ? "The panel makes enough power, so the motor spins and the rover drives. More direct sun means more energy."
          : "Not enough power yet. The sun is too low or the clouds too thick. Raise the sun or clear the clouds to get the rover moving."}
      </p>
    </div>
  );
}