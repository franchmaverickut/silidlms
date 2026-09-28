import { useState } from "react";

// Wire connection data — each wire links a module pin to a shield pin
const WIRES = [
  // L298N → UNO
  { id: "ena", from: "L298N ENA", to: "D5", color: "#7b1fa2", label: "ENA → D5", desc: "Enable A — PWM speed control for the LEFT motor pair. analogWrite() on D5 sets 0–255 duty cycle." },
  { id: "in1", from: "L298N IN1", to: "D7", color: "#1565c0", label: "IN1 → D7", desc: "Input 1 — direction bit for left side. HIGH = forward, LOW = backward (combined with IN2)." },
  { id: "in2", from: "L298N IN2", to: "D8", color: "#00bcd4", label: "IN2 → D8", desc: "Input 2 — direction bit for left side. HIGH = backward, LOW = forward (combined with IN1)." },
  { id: "enb", from: "L298N ENB", to: "D6", color: "#2e7d32", label: "ENB → D6", desc: "Enable B — PWM speed control for the RIGHT motor pair. analogWrite() on D6 sets 0–255 duty cycle." },
  { id: "in3", from: "L298N IN3", to: "D9", color: "#558b2f", label: "IN3 → D9", desc: "Input 3 — direction bit for right side. The Servo library takes over D10's timer, so IN3 uses D9 (simple on/off, no PWM needed)." },
  { id: "in4", from: "L298N IN4", to: "D11", color: "#9e9d24", label: "IN4 → D11", desc: "Input 4 — direction bit for right side." },
  { id: "l298gnd", from: "L298N GND", to: "GND", color: "#212121", label: "L298N GND → GND", desc: "Common ground. ALL grounds (battery −, L298N, UNO, sensors) must connect together." },
  { id: "l2985v", from: "L298N +5V", to: "5V", color: "#d32f2f", label: "L298N +5V → 5V", desc: "5V output from the L298N's onboard regulator powers the UNO (only with 4×AA / 6V battery option)." },
  // HC-SR04
  { id: "trig", from: "HC-SR04 Trig", to: "A0", color: "#00bcd4", label: "Trig → A0", desc: "Trigger pin. A 10 µs HIGH pulse sends 8 cycles of 40 kHz ultrasound." },
  { id: "echo", from: "HC-SR04 Echo", to: "A1", color: "#7b1fa2", label: "Echo → A1", desc: "Echo pin. Goes HIGH for the round-trip time of the sound. distance = echoTime / 58 (cm)." },
  // Line Tracker
  { id: "out1", from: "Tracker OUT1", to: "A2", color: "#d32f2f", label: "OUT1 → A2", desc: "Far-left probe. Weight −3 in the PD error calculation." },
  { id: "out2", from: "Tracker OUT2", to: "A3", color: "#ef6c00", label: "OUT2 → A3", desc: "Inner-left probe. Weight −1 in the PD error calculation." },
  { id: "out3", from: "Tracker OUT3", to: "A4", color: "#2e7d32", label: "OUT3 → A4", desc: "Inner-right probe. Weight +1 in the PD error calculation." },
  { id: "out4", from: "Tracker OUT4", to: "A5", color: "#1565c0", label: "OUT4 → A5", desc: "Far-right probe. Weight +3 in the PD error calculation." },
  // Servo
  { id: "servo", from: "SG90 Signal", to: "D3", color: "#ef6c00", label: "Servo → D3", desc: "Servo signal. myServo.write(angle) sends PWM position pulses (0–180°). The Servo library takes over Timer2 (affects D9/D10 PWM)." },
  // Power
  { id: "bat12v", from: "Battery +", to: "L298N 12V", color: "#d32f2f", label: "Battery + → 12V", desc: "Battery positive (through ON/OFF switch) to L298N VS / 12V terminal." },
  { id: "batgnd", from: "Battery −", to: "L298N GND", color: "#212121", label: "Battery − → GND", desc: "Battery negative to L298N GND terminal." },
];

const MODULES = [
  { id: "uno", label: "UNO R3 + Sensor Shield v5.0", x: 350, y: 180, w: 200, h: 90, fill: "#e3f2fd", stroke: "#1565c0" },
  { id: "l298", label: "L298N Driver", x: 350, y: 40, w: 200, h: 70, fill: "#fce4ec", stroke: "#c62828" },
  { id: "lmot", label: "Left Motors", x: 100, y: 40, w: 130, h: 70, fill: "#fff9c4", stroke: "#f9a825" },
  { id: "rmot", label: "Right Motors", x: 670, y: 40, w: 130, h: 70, fill: "#fff9c4", stroke: "#f9a825" },
  { id: "bat", label: "Battery Box", x: 100, y: 180, w: 130, h: 70, fill: "#f5f5f5", stroke: "#616161" },
  { id: "servo", label: "SG90 Servo", x: 670, y: 180, w: 130, h: 50, fill: "#e8f5e9", stroke: "#2e7d32" },
  { id: "hcsr04", label: "HC-SR04 Ultrasonic", x: 670, y: 250, w: 130, h: 50, fill: "#f3e5f5", stroke: "#6a1b9a" },
  { id: "tracker", label: "4-ch Line Tracker", x: 350, y: 320, w: 200, h: 50, fill: "#fce4ec", stroke: "#ad1457" },
];

// Pin positions on the UNO (relative to its box at x=350,y=180,w=200,h=90)
const UNO_PINS = {
  D3: { x: 380, y: 180 }, D5: { x: 410, y: 180 }, D6: { x: 430, y: 180 },
  D7: { x: 450, y: 180 }, D8: { x: 470, y: 180 }, D9: { x: 490, y: 180 },
  D11: { x: 510, y: 180 }, A0: { x: 380, y: 270 }, A1: { x: 400, y: 270 },
  A2: { x: 420, y: 270 }, A3: { x: 440, y: 270 }, A4: { x: 460, y: 270 },
  A5: { x: 480, y: 270 }, "5V": { x: 530, y: 180 }, GND: { x: 550, y: 180 },
};

// Pin positions on other modules
const MODULE_PINS = {
  "L298N ENA": { x: 370, y: 110 }, "L298N IN1": { x: 395, y: 110 }, "L298N IN2": { x: 420, y: 110 },
  "L298N ENB": { x: 450, y: 110 }, "L298N IN3": { x: 475, y: 110 }, "L298N IN4": { x: 500, y: 110 },
  "L298N GND": { x: 525, y: 110 }, "L298N +5V": { x: 540, y: 110 },
  "HC-SR04 Trig": { x: 700, y: 275 }, "HC-SR04 Echo": { x: 730, y: 275 },
  "Tracker OUT1": { x: 370, y: 320 }, "Tracker OUT2": { x: 410, y: 320 },
  "Tracker OUT3": { x: 450, y: 320 }, "Tracker OUT4": { x: 490, y: 320 },
  "SG90 Signal": { x: 700, y: 205 },
  "Battery +": { x: 165, y: 180 }, "Battery −": { x: 165, y: 250 },
};

// Wire path generator — routes from module pin to UNO pin
function wirePath(wire) {
  const from = MODULE_PINS[wire.from] || UNO_PINS[wire.to];
  const to = UNO_PINS[wire.to];
  if (!from || !to) return "";
  // Simple L-shaped or curved path
  const midY = (from.y + to.y) / 2;
  return `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;
}

export default function InteractiveWiringDiagram() {
  const [activeWire, setActiveWire] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Hover over any wire or pin label to see what it does. Click a wire to pin its description in the panel below.
      </p>

      {/* SVG Diagram */}
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 overflow-x-auto">
        <svg viewBox="0 0 900 400" className="w-full" style={{ minWidth: 600 }}>
          {/* Wires (drawn first, behind modules) */}
          {WIRES.map((w) => {
            const isActive = activeWire === w.id || hovered === w.id;
            return (
              <g key={w.id}>
                <path
                  d={wirePath(w)}
                  fill="none"
                  stroke={w.color}
                  strokeWidth={isActive ? 5 : 3}
                  strokeOpacity={isActive ? 1 : 0.7}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHovered(w.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActiveWire(w.id)}
                />
                {/* Invisible wider hit area */}
                <path
                  d={wirePath(w)}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={14}
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered(w.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActiveWire(w.id)}
                />
              </g>
            );
          })}

          {/* Modules */}
          {MODULES.map((m) => (
            <g key={m.id}>
              <rect x={m.x} y={m.y} width={m.w} height={m.h} rx={10} fill={m.fill} stroke={m.stroke} strokeWidth={2} className="transition-all" />
              <text x={m.x + m.w / 2} y={m.y + m.h / 2 + 5} textAnchor="middle" className="font-poppins font-bold" fill="#212121" style={{ fontSize: 13 }}>
                {m.label}
              </text>
            </g>
          ))}

          {/* UNO pin labels */}
          {Object.entries(UNO_PINS).map(([name, pos]) => {
            const isPinHovered = WIRES.some((w) => (w.to === name || w.from.includes(name)) && (hovered === w.id || activeWire === w.id));
            return (
              <g key={name}>
                <circle cx={pos.x} cy={pos.y} r={isPinHovered ? 6 : 4} fill={isPinHovered ? "#ff6f00" : "#1565c0"} className="transition-all cursor-pointer" />
                <text x={pos.x} y={pos.y - 8} textAnchor="middle" className="font-mono" fill="#424242" style={{ fontSize: 9, fontWeight: 600 }}>
                  {name}
                </text>
              </g>
            );
          })}

          {/* Annotations */}
          <text x={450} y={135} textAnchor="middle" fill="#c62828" style={{ fontSize: 9, fontStyle: "italic" }}>keep 5V-EN jumper ON</text>
          <text x={165} y={265} textAnchor="middle" fill="#616161" style={{ fontSize: 9, fontStyle: "italic" }}>+ via ON/OFF switch</text>
        </svg>
      </div>

      {/* Info panel */}
      <div className="rounded-xl border border-border/60 bg-muted/30 p-4 min-h-[80px]">
        {activeWire ? (
          (() => {
            const w = WIRES.find((x) => x.id === activeWire);
            return (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border-2 border-white shadow" style={{ background: w.color }} />
                  <span className="font-poppins font-bold text-sm text-foreground">{w.label}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{w.desc}</p>
                <button onClick={() => setActiveWire(null)} className="text-xs text-primary hover:underline">Clear</button>
              </div>
            );
          })()
        ) : hovered ? (
          (() => {
            const w = WIRES.find((x) => x.id === hovered);
            return (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border-2 border-white shadow" style={{ background: w.color }} />
                  <span className="font-poppins font-bold text-sm text-foreground">{w.label}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{w.desc}</p>
              </div>
            );
          })()
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            Click any wire to pin its explanation here. The diagram shows the master pin map used by all six sketches.
          </p>
        )}
      </div>

      {/* Wire legend */}
      <div className="flex flex-wrap gap-2">
        {WIRES.filter((w, i, arr) => arr.findIndex((x) => x.color === w.color) === i).map((w) => (
          <span key={w.color} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/40 border border-border/40 text-xs">
            <span className="w-3 h-3 rounded-full" style={{ background: w.color }} />
            {w.color}
          </span>
        ))}
      </div>
    </div>
  );
}