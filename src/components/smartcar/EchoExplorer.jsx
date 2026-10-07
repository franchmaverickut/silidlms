import { useState } from "react";
import { Ear, Car, BrickWall as Wall, Zap } from "lucide-react";

// A grade-4 friendly explorer for how the ultrasonic "eye" works.
// The car beeps, the echo comes back, and the wait time tells it the distance.
export default function EchoExplorer() {
  const [distance, setDistance] = useState(40); // cm to the wall
  const stopCm = 25;
  const echoMicros = Math.round(distance * 58); // distance_cm = time_us / 58
  const tooClose = distance <= stopCm;

  // Map distance (5-150) to a position 6%-92% across the strip
  const wallLeft = 6 + ((distance - 5) / 145) * 86;

  return (
    <div className="rounded-xl border border-sky-200 bg-white p-4 space-y-4">
      <div className="flex items-center gap-2 text-sky-700">
        <Ear size={16} />
        <span className="font-poppins font-bold text-xs">Try it: how your car "sees"</span>
      </div>

      {/* Road strip */}
      <div className="relative rounded-xl overflow-hidden border border-border/60 bg-gradient-to-b from-sky-50 to-sky-100" style={{ height: 110 }}>
        {/* car */}
        <div className="absolute bottom-3 flex flex-col items-center" style={{ left: "3%" }}>
          <Car size={36} className="text-slate-700" />
          <span className="text-[9px] font-medium text-muted-foreground">your car</span>
        </div>
        {/* sound pulse line */}
        <div className="absolute bottom-6 h-0.5 border-t-2 border-dashed border-sky-400/70" style={{ left: "12%", right: `${100 - wallLeft + 2}%` }} />
        {/* moving echo dot */}
        <svg className="absolute bottom-5" style={{ left: "12%", width: `${wallLeft - 10}%`, height: 6 }} viewBox="0 0 100 6" preserveAspectRatio="none">
          <circle cx="0" cy="3" r="2.5" fill="#0ea5e9">
            <animate attributeName="cx" values="0;100;0" dur={Math.max(0.4, distance / 40)} repeatCount="indefinite" />
          </circle>
        </svg>
        {/* wall */}
        <div className="absolute bottom-3 flex flex-col items-center" style={{ left: `${wallLeft}%`, transform: "translateX(-50%)" }}>
          <Wall size={36} className="text-amber-700" />
          <span className="text-[9px] font-medium text-muted-foreground">wall</span>
        </div>
        {tooClose && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold animate-pulse">
            Too close! The car STOPS 🛑
          </div>
        )}
      </div>

      {/* Slider */}
      <label className="block">
        <div className="flex justify-between text-[11px] font-medium text-foreground mb-1">
          <span>Move the wall</span><span className="font-mono text-sky-600">{distance} cm away</span>
        </div>
        <input type="range" min={5} max={150} value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full accent-sky-500" />
      </label>

      {/* Readouts */}
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded-lg bg-sky-50 p-2">
          <p className="text-[10px] text-muted-foreground">Echo comes back in</p>
          <p className="font-poppins font-bold text-sm text-sky-700">{echoMicros} tiny seconds</p>
        </div>
        <div className={`rounded-lg p-2 ${tooClose ? "bg-red-50" : "bg-green-50"}`}>
          <p className="text-[10px] text-muted-foreground">What the car does</p>
          <p className={`font-poppins font-bold text-sm ${tooClose ? "text-red-600" : "text-green-600"}`}>{tooClose ? "Stops & looks" : "Drives forward"}</p>
        </div>
      </div>

      <div className="flex items-start gap-2 text-[11px] text-foreground/70 leading-relaxed">
        <Zap size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <span>Sound is super fast. The farther the wall, the longer the echo takes to return. The car measures that wait and turns it into a distance. That is how it knows when to brake!</span>
      </div>
    </div>
  );
}