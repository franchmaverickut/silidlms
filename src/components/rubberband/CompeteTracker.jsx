import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import { CheckCircle2, TrendingUp, Trophy } from "lucide-react";

const CHALLENGES = [
  { key: "distance", label: "Distance", unit: "cm", color: "#2563eb", description: "Farthest Distance — straight-line distance from start to stop" },
  { key: "deviation", label: "Straightness", unit: "cm", color: "#7c3aed", description: "Straightest Line — deviation from center line (lower = better)" },
  { key: "time", label: "Speed", unit: "sec", color: "#16a34a", description: "Fastest Car — time to reach 3m finish line (lower = better)" },
];

export default function CompeteTracker() {
  const [results, setResults] = useState({ distance: "", deviation: "", time: "" });
  const [best, setBest] = useState({ distance: "", deviation: "", time: "" });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (results.distance || results.deviation || results.time) setSaved(true);
  };

  const barData = CHALLENGES.map(c => ({
    name: c.label,
    "Your Result": parseFloat(results[c.key]) || 0,
    "Best in Room": parseFloat(best[c.key]) || 0,
  }));

  // Normalize radar data: for deviation & time, invert so higher = better performance
  const radarData = CHALLENGES.map(c => {
    const mine = parseFloat(results[c.key]) || 0;
    const bestVal = parseFloat(best[c.key]) || 1;
    let score = 0;
    if (mine > 0 && bestVal > 0) {
      score = c.key === "distance"
        ? Math.min(100, Math.round((mine / bestVal) * 100))
        : Math.min(100, Math.round((bestVal / mine) * 100));
    }
    return { subject: c.label, Score: score, fullMark: 100 };
  });

  const hasData = CHALLENGES.some(c => parseFloat(results[c.key]) > 0);

  return (
    <div className="space-y-5">
      <p className="text-sm text-foreground/80">Teams will be called up one at a time. Each team gets one wind, one release, and one official measurement per challenge. Enter your results and the best result in the room below.</p>

      {/* Input Table */}
      <div className="rounded-2xl border border-border/60 overflow-hidden">
        <div className="px-4 py-3 bg-muted/40 border-b border-border/40">
          <p className="font-poppins font-bold text-sm text-foreground">📊 Enter Your Results</p>
        </div>
        <div className="divide-y divide-border/30">
          {CHALLENGES.map(c => (
            <div key={c.key} className="px-4 py-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                <p className="font-semibold text-sm text-foreground">{c.label} <span className="text-muted-foreground font-normal text-xs">({c.unit})</span></p>
              </div>
              <p className="text-xs text-muted-foreground">{c.description}</p>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Your Result</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={results[c.key]}
                    onChange={e => { setResults(r => ({ ...r, [c.key]: e.target.value })); setSaved(false); }}
                    placeholder={`e.g. ${c.key === "distance" ? "245" : c.key === "deviation" ? "12" : "4.3"}`}
                    className="w-full border border-input rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Best in Room</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={best[c.key]}
                    onChange={e => { setBest(b => ({ ...b, [c.key]: e.target.value })); setSaved(false); }}
                    placeholder={`e.g. ${c.key === "distance" ? "380" : c.key === "deviation" ? "3" : "2.1"}`}
                    className="w-full border border-input rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-border/40">
          <button
            onClick={handleSave}
            className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {saved ? <><CheckCircle2 size={15} /> Results Saved!</> : "Save & Generate Analytics"}
          </button>
        </div>
      </div>

      {/* Charts */}
      {hasData && (
        <div className="space-y-5">
          {/* Bar Chart */}
          <div className="rounded-2xl border border-border/60 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-blue-600" />
              <p className="font-poppins font-bold text-sm text-foreground">Your Results vs Best in Room</p>
            </div>
            <p className="text-xs text-muted-foreground">Compare your performance across all three challenges. For Distance, higher is better. For Straightness and Speed, lower is better.</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", fontSize: "12px", border: "1px solid hsl(var(--border))" }}
                  formatter={(val, name) => [`${val}`, name]}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="Your Result" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Best in Room" fill="#93c5fd" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar / Performance Score */}
          <div className="rounded-2xl border border-border/60 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Trophy size={15} className="text-blue-600" />
              <p className="font-poppins font-bold text-sm text-foreground">Performance Score Radar</p>
            </div>
            <p className="text-xs text-muted-foreground">Your score relative to the best in the room (100 = matched or beat the best). For Distance, higher is better. For Straightness & Speed, your score increases the closer you are to the best result.</p>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <Radar name="Your Score" dataKey="Score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.25} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", fontSize: "12px", border: "1px solid hsl(var(--border))" }}
                  formatter={(val) => [`${val}/100`, "Score"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Insight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CHALLENGES.map(c => {
              const mine = parseFloat(results[c.key]);
              const bestVal = parseFloat(best[c.key]);
              const diff = mine && bestVal ? Math.abs(mine - bestVal).toFixed(1) : null;
              const isWinner = mine && bestVal && (c.key === "distance" ? mine >= bestVal : mine <= bestVal);
              return (
                <div key={c.key} className={`p-3 rounded-xl border text-center ${isWinner ? "bg-green-50 border-green-200" : "bg-muted/40 border-border/40"}`}>
                  <p className="text-xs font-semibold text-muted-foreground">{c.label}</p>
                  <p className="font-poppins font-bold text-lg mt-1" style={{ color: c.color }}>
                    {results[c.key] ? `${results[c.key]} ${c.unit}` : "—"}
                  </p>
                  {diff !== null && (
                    <p className={`text-xs mt-1 ${isWinner ? "text-green-700 font-semibold" : "text-muted-foreground"}`}>
                      {isWinner ? "🏆 You won!" : `${diff} ${c.unit} off the best`}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}