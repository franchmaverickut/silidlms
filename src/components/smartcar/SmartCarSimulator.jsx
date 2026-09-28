import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Radio, Activity, Gauge, GitBranch } from "lucide-react";

const TABS = [
  { id: "ultrasonic", label: "Ultrasonic Distance", icon: Radio },
  { id: "pwm", label: "PWM & Motor Speed", icon: Gauge },
  { id: "pd", label: "PD Line Following", icon: Activity },
  { id: "maze", label: "Left-Hand Maze", icon: GitBranch },
];

// ── Ultrasonic Simulation ──────────────────────────────────
function UltrasonicSim() {
  const [distance, setDistance] = useState(30);
  // speed of sound = 343 m/s = 0.0343 cm/µs; round trip so / 2
  // distance = echoTime * 0.0343 / 2 = echoTime / 58
  const echoTime = Math.round((distance * 58));
  const speedOfSound = 0.0343; // cm/µs

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        The HC-SR04 sends 8 cycles of 40 kHz ultrasound. The <strong>Echo</strong> pin stays HIGH for the round-trip time.
        Sound travels at <strong>343 m/s</strong> (0.0343 cm/µs). Because the sound goes there <em>and</em> back, we divide by 2.
      </p>

      {/* Visual */}
      <div className="rounded-xl border border-border/60 bg-slate-900 p-4 overflow-hidden">
        <svg viewBox="0 0 400 120" className="w-full">
          {/* Sensor */}
          <rect x="10" y="40" width="40" height="40" rx="4" fill="#6a1b9a" />
          <text x="30" y="100" textAnchor="middle" fill="#e0e0e0" style={{ fontSize: 9 }}>HC-SR04</text>
          {/* Obstacle */}
          <rect x={340 - distance * 2} y="20" width="20" height="80" rx="3" fill="#ef6c00" />
          <text x={350 - distance * 2} y="115" textAnchor="middle" fill="#e0e0e0" style={{ fontSize: 9 }}>Wall</text>
          {/* Sound waves */}
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="50" cy="60" r={20 + i * 15 + (distance * 2 * 0.3)} fill="none" stroke="#00bcd4" strokeWidth="1" strokeOpacity={0.5 - i * 0.15} />
          ))}
          {/* Distance label */}
          <text x="200" y="15" textAnchor="middle" fill="#00bcd4" style={{ fontSize: 11, fontWeight: 700 }}>
            {distance} cm
          </text>
        </svg>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Distance to obstacle: <span className="text-primary font-bold">{distance} cm</span></label>
        <input type="range" min="2" max="100" value={distance} onChange={(e) => setDistance(+e.target.value)} className="w-full accent-primary" />
      </div>

      {/* Calculation */}
      <div className="rounded-xl bg-muted/40 border border-border/40 p-4 space-y-2">
        <p className="font-poppins font-bold text-sm text-foreground">The Math</p>
        <div className="font-mono text-sm text-foreground/80 space-y-1">
          <p>echoTime = distance × 58 = <span className="text-primary font-bold">{echoTime} µs</span></p>
          <p>distance = echoTime × 0.0343 / 2</p>
          <p>       = echoTime / 58</p>
          <p>       = {echoTime} / 58 = <span className="text-primary font-bold">{distance} cm</span> ✓</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground italic">
        In code: <code className="font-mono bg-muted/40 px-1 rounded">pulseIn(ECHO, HIGH) / 58</code>
      </p>
    </div>
  );
}

// ── PWM / Motor Speed Simulation ───────────────────────────
function PwmSim() {
  const [duty, setDuty] = useState(170); // 0-255
  const voltage = ((duty / 255) * 6).toFixed(1); // 6V battery
  const pct = Math.round((duty / 255) * 100);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        The L298N <strong>ENA/ENB</strong> pins receive a PWM signal from <code className="font-mono bg-muted/40 px-1 rounded">analogWrite(pin, 0–255)</code>.
        The motor sees the <em>average</em> voltage — higher duty cycle = faster motor.
      </p>

      {/* PWM waveform visual */}
      <div className="rounded-xl border border-border/60 bg-slate-900 p-4">
        <svg viewBox="0 0 400 100" className="w-full">
          {/* Grid */}
          <line x1="0" y1="80" x2="400" y2="80" stroke="#37474f" strokeWidth="1" />
          <line x1="0" y1="20" x2="400" y2="20" stroke="#37474f" strokeWidth="1" strokeDasharray="3 3" />
          <text x="5" y="16" fill="#78909c" style={{ fontSize: 8 }}>5V</text>
          <text x="5" y="92" fill="#78909c" style={{ fontSize: 8 }}>0V</text>
          {/* PWM square wave — 4 cycles */}
          {[0, 1, 2, 3].map((i) => {
            const cycleW = 100;
            const highW = (duty / 255) * cycleW;
            const startX = i * cycleW;
            return (
              <g key={i}>
                <line x1={startX} y1="20" x2={startX + highW} y2="20" stroke="#00e676" strokeWidth="2" />
                <line x1={startX + highW} y1="20" x2={startX + highW} y2="80" stroke="#00e676" strokeWidth="2" />
                <line x1={startX + highW} y1="80" x2={startX + cycleW} y2="80" stroke="#00e676" strokeWidth="2" />
                <line x1={startX + cycleW} y1="80" x2={startX + cycleW} y2="20" stroke="#00e676" strokeWidth="2" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">analogWrite value: <span className="text-primary font-bold">{duty}</span> / 255 ({pct}%)</label>
        <input type="range" min="0" max="255" value={duty} onChange={(e) => setDuty(+e.target.value)} className="w-full accent-primary" />
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-muted/40 border border-border/40 p-3 text-center">
          <p className="text-xs text-muted-foreground">Average Voltage</p>
          <p className="font-poppins font-bold text-lg text-primary">{voltage} V</p>
          <p className="text-xs text-muted-foreground">of 6V battery</p>
        </div>
        <div className="rounded-xl bg-muted/40 border border-border/40 p-3 text-center">
          <p className="text-xs text-muted-foreground">Motor Speed</p>
          <p className="font-poppins font-bold text-lg text-primary">{pct}%</p>
          <p className="text-xs text-muted-foreground">of max RPM</p>
        </div>
      </div>
      <div className="rounded-xl bg-muted/40 border border-border/40 p-4 space-y-1">
        <p className="font-mono text-sm text-foreground/80">
          avgVoltage = (duty / 255) × batteryVoltage
        </p>
        <p className="font-mono text-sm text-foreground/80">
          = ({duty} / 255) × 6V = <span className="text-primary font-bold">{voltage} V</span>
        </p>
      </div>
      <p className="text-xs text-muted-foreground italic">
        In the code: <code className="font-mono bg-muted/40 px-1 rounded">CRUISE_SPEED = 170</code> ≈ 67% — a safe speed that saves battery and gives sensors time to react.
      </p>
    </div>
  );
}

// ── PD Line Following Simulation ────────────────────────────
function PdSim() {
  const [kp, setKp] = useState(45);
  const [kd, setKd] = useState(80);
  const [linePos, setLinePos] = useState(0); // -3 to +3

  // Sensor weights: S1=-3, S2=-1, S3=+1, S4=+3
  // Error = average weight of sensors seeing black
  // For sim: error = linePos (simplified)
  const error = linePos;
  const steer = -(kp * error); // P term (simplified, no D dynamic)
  const leftSpeed = 150 + steer;
  const rightSpeed = 150 - steer;

  // Visual car + line
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Each IR probe has a weight: <strong>S1=−3, S2=−1, S3=+1, S4=+3</strong>. The <strong>error</strong> is the average weight of probes seeing black.
        The PD controller steers: <code className="font-mono bg-muted/40 px-1 rounded">turn = −(Kp×error + Kd×rateOfChange)</code>.
      </p>

      {/* Visual */}
      <div className="rounded-xl border border-border/60 bg-slate-900 p-4 overflow-hidden">
        <svg viewBox="0 0 400 140" className="w-full">
          {/* Track */}
          <rect x="0" y="100" width="400" height="30" fill="#e8eaf6" />
          {/* Line */}
          <rect x={190 + linePos * 20} y="100" width="20" height="30" fill="#212121" />
          {/* Car body */}
          <rect x={170} y="60" width="60" height="30" rx="5" fill={linePos === 0 ? "#4caf50" : "#ff9800"} />
          <text x="200" y="78" textAnchor="middle" fill="white" style={{ fontSize: 9, fontWeight: 700 }}>CAR</text>
          {/* Sensors */}
          {[-3, -1, 1, 3].map((w, i) => {
            const sx = 175 + i * 15;
            const onLine = Math.abs((190 + linePos * 20 + 10) - (sx + 5)) < 12;
            return (
              <g key={i}>
                <circle cx={sx + 5} cy="95" r="4" fill={onLine ? "#212121" : "#90a4ae"} />
                <text x={sx + 5} y="55" textAnchor="middle" fill={onLine ? "#4caf50" : "#78909c"} style={{ fontSize: 8, fontWeight: 700 }}>{w}</text>
              </g>
            );
          })}
          {/* Error display */}
          <text x="200" y="20" textAnchor="middle" fill="#00bcd4" style={{ fontSize: 11, fontWeight: 700 }}>
            error = {error}
          </text>
          {/* Wheels */}
          <rect x={165 + (steer > 0 ? 0 : 0)} y="88" width="10" height="8" fill={leftSpeed > rightSpeed ? "#4caf50" : "#ef5350"} />
          <rect x={225} y="88" width="10" height="8" fill={rightSpeed > leftSpeed ? "#4caf50" : "#ef5350"} />
        </svg>
      </div>

      {/* Line position slider */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Line position: <span className="text-primary font-bold">{linePos > 0 ? "→ right" : linePos < 0 ? "← left" : "centered"}</span></label>
        <input type="range" min="-3" max="3" value={linePos} onChange={(e) => setLinePos(+e.target.value)} className="w-full accent-primary" />
      </div>

      {/* PD sliders */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Kp = <span className="text-primary font-bold">{kp}</span></label>
          <input type="range" min="0" max="100" value={kp} onChange={(e) => setKp(+e.target.value)} className="w-full accent-primary" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Kd = <span className="text-primary font-bold">{kd}</span></label>
          <input type="range" min="0" max="200" value={kd} onChange={(e) => setKd(+e.target.value)} className="w-full accent-primary" />
        </div>
      </div>

      {/* Calculation */}
      <div className="rounded-xl bg-muted/40 border border-border/40 p-4 space-y-2">
        <p className="font-poppins font-bold text-sm text-foreground">PD Calculation</p>
        <div className="font-mono text-sm text-foreground/80 space-y-1">
          <p>error = {error}</p>
          <p>turn = −(Kp × error) = −({kp} × {error}) = <span className="text-primary font-bold">{steer}</span></p>
          <p>leftSpeed = BASE + turn = 150 + ({steer}) = <span className="text-blue-600 font-bold">{leftSpeed}</span></p>
          <p>rightSpeed = BASE − turn = 150 − ({steer}) = <span className="text-green-600 font-bold">{rightSpeed}</span></p>
        </div>
      </div>
      <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 border border-amber-200">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Try it:</strong> Move the line right (error = +3). The car turns right by slowing the right wheel. Raise Kp to turn harder. Kd damps zig-zag by reacting to how fast the error changes.
        </p>
      </div>
    </div>
  );
}

// ── Left-Hand Maze Simulation ───────────────────────────────
const MAZE = [
  // 6x6 grid: 1 = wall, 0 = open, S = start, E = exit
  [1,1,1,1,1,1],
  [1,0,0,0,0,1],
  [1,0,1,1,0,1],
  [1,0,0,1,0,1],
  [1,1,0,0,0,0],
  [1,1,1,1,1,1],
];
const START = { r: 1, c: 1 };
const EXIT = { r: 4, c: 5 };

function MazeSim() {
  const [path, setPath] = useState([]);
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const timerRef = useRef(null);

  // Left-hand rule: prefer Left, then Straight, then Right, then Back
  // Direction: 0=N, 1=E, 2=S, 3=W
  const solve = () => {
    const moves = [];
    let dir = 1; // start facing East
    let r = START.r, c = START.c;
    const visited = new Set();
    const key = (r, c) => `${r},${c}`;
    const isOpen = (r, c) => r >= 0 && r < 6 && c >= 0 && c < 6 && MAZE[r][c] !== 1;

    // Left-hand: try Left, Straight, Right, Back (relative to current dir)
    const tryDirs = [3, 0, 1, 2]; // left, straight, right, back (relative)
    const dr = [-1, 0, 1, 0]; // N, E, S, W
    const dc = [0, 1, 0, -1];

    let steps = 0;
    while (steps < 100) {
      moves.push({ r, c, dir });
      if (r === EXIT.r && c === EXIT.c) break;
      let moved = false;
      for (const rel of tryDirs) {
        const newDir = (dir + rel) % 4;
        const nr = r + dr[newDir];
        const nc = c + dc[newDir];
        if (isOpen(nr, nc)) {
          dir = newDir;
          r = nr; c = nc;
          moved = true;
          break;
        }
      }
      if (!moved) break;
      steps++;
    }
    return moves;
  };

  const run = () => {
    const result = solve();
    setPath(result);
    setCurrentStep(0);
    setRunning(true);
  };

  useEffect(() => {
    if (running && currentStep < path.length) {
      timerRef.current = setTimeout(() => setCurrentStep((s) => s + 1), 500);
    } else if (currentStep >= path.length) {
      setRunning(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [running, currentStep, path]);

  const car = path[currentStep - 1] || { r: START.r, c: START.c, dir: 1 };
  const dirArrows = ["↑", "→", "↓", "←"];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        The <strong>Left-Hand Rule</strong>: keep your left hand on the wall. At every junction, prefer
        <strong> Left → Straight → Right → Back</strong>. This guarantees reaching the exit of any maze with connected walls.
      </p>

      {/* Maze grid */}
      <div className="rounded-xl border border-border/60 bg-slate-900 p-4 flex justify-center">
        <svg viewBox="0 0 240 240" className="w-full max-w-[240px]">
          {MAZE.map((row, r) =>
            row.map((cell, c) => {
              const x = c * 40, y = r * 40;
              const isStart = r === START.r && c === START.c;
              const isExit = r === EXIT.r && c === EXIT.c;
              const isOnPath = path.slice(0, currentStep).some((p) => p.r === r && p.c === c);
              const isCar = car.r === r && car.c === c;
              return (
                <g key={`${r},${c}`}>
                  <rect x={x} y={y} width="40" height="40" fill={cell === 1 ? "#37474f" : isOnPath ? "#1b5e20" : "#eceff1"} stroke="#546e7a" strokeWidth="0.5" />
                  {isStart && <text x={x + 20} y={y + 24} textAnchor="middle" fill="#4caf50" style={{ fontSize: 14, fontWeight: 700 }}>S</text>}
                  {isExit && <text x={x + 20} y={y + 24} textAnchor="middle" fill="#ff6f00" style={{ fontSize: 14, fontWeight: 700 }}>E</text>}
                  {isCar && <text x={x + 20} y={y + 28} textAnchor="middle" fill="#2196f3" style={{ fontSize: 18, fontWeight: 700 }}>{dirArrows[car.dir]}</text>}
                </g>
              );
            })
          )}
        </svg>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={run} disabled={running} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors">
          {running ? "Solving..." : "▶ Run Maze Solver"}
        </button>
        <span className="text-sm text-muted-foreground">Step {currentStep} / {path.length}</span>
      </div>

      {/* Decision log */}
      {path.length > 0 && currentStep > 0 && (
        <div className="rounded-xl bg-muted/40 border border-border/40 p-3 space-y-1">
          <p className="font-poppins font-bold text-xs text-foreground">Decision Log</p>
          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
            {path.slice(0, currentStep).map((p, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-mono">
                {dirArrows[p.dir]}
              </span>
            ))}
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground italic">
        The green trail shows visited cells. The blue arrow is the car facing its current direction. In Project C1, the car records these moves and simplifies dead-end backtracks (L B L → S) to find the shortest path.
      </p>
    </div>
  );
}

export default function SmartCarSimulator() {
  const [tab, setTab] = useState("ultrasonic");
  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                active ? "bg-primary text-primary-foreground" : "bg-muted/40 text-foreground/70 hover:bg-muted/60"
              }`}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      <Card className="p-5 border-border/60 shadow-sm">
        {tab === "ultrasonic" && <UltrasonicSim />}
        {tab === "pwm" && <PwmSim />}
        {tab === "pd" && <PdSim />}
        {tab === "maze" && <MazeSim />}
      </Card>
    </div>
  );
}