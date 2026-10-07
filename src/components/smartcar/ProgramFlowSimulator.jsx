import { useState, useEffect, useRef, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, StepForward } from "lucide-react";

// ── Node styles (fill / active / stroke / text) ────────────
// rx is derived from node type at render time (process:14, start/end:22).
const STYLES = {
  start: { fill: "#dcfce7", active: "#bbf7d0", stroke: "#16a34a", text: "#14532d" },
  process: { fill: "#dbeafe", active: "#bfdbfe", stroke: "#2563eb", text: "#1e3a8a" },
  decision: { fill: "#ffedd5", active: "#fed7aa", stroke: "#ea580c", text: "#7c2d12" },
  end: { fill: "#fee2e2", active: "#fecaca", stroke: "#dc2626", text: "#7f1d1d" },
};

// Edge format: { from, to, label?, side?: 'left'|'right', back? }
// side 'left'/'right' = the branch leaves that side of the decision.
// back = true routes the edge down the outside-left gutter (maze loop return).

function nodeById(flow, id) {
  return flow.nodes.find((n) => n.id === id);
}

function route(edge, flow) {
  const a = nodeById(flow, edge.from);
  const b = nodeById(flow, edge.to);
  if (edge.back) {
    const x = 48; // outside-left gutter
    return `M ${a.x - a.w / 2} ${a.y} H ${x} V ${b.y} H ${b.x - b.w / 2}`;
  }
  const aBottom = a.y + a.h / 2;
  const bTop = b.y - b.h / 2;
  if (Math.abs(a.x - b.x) < 8 && !edge.side) {
    return `M ${a.x} ${aBottom} V ${bTop}`;
  }
  if (edge.side === "left" || edge.side === "right") {
    const midY = a.y + (b.y - a.y) * 0.45;
    if (b.y > a.y + 20) {
      return `M ${a.x} ${aBottom} V ${midY} H ${b.x} V ${bTop}`;
    }
  }
  const mid = (aBottom + bTop) / 2;
  return `M ${a.x} ${aBottom} V ${mid} H ${b.x} V ${bTop}`;
}

// Compute a viewBox that contains every node, edge label, and the maze
// back-edge gutter, with 24px padding. Recalculated per flow on tab switch.
function computeViewBox(flow) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const pt = (x, y) => { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); };
  const box = (x, y, w, h) => { pt(x, y); pt(x + w, y + h); };
  flow.nodes.forEach((n) => { if (!n.hidden) box(n.x - n.w / 2, n.y - n.h / 2, n.w, n.h); });
  flow.edges.forEach((e) => {
    if (e.label && !e.back) {
      const a = nodeById(flow, e.from);
      const lx = e.side === "left" ? a.x - 28 : e.side === "right" ? a.x + 28 : a.x + 22;
      const ly = a.y + a.h / 2 + 14;
      box(lx - 16, ly - 9, 32, 16);
    }
    if (e.back) {
      const a = nodeById(flow, e.from);
      const b = nodeById(flow, e.to);
      pt(48, a.y); pt(48, b.y);
    }
  });
  const pad = 24;
  return { x: minX - pad, y: minY - pad, w: (maxX - minX) + pad * 2, h: (maxY - minY) + pad * 2 };
}

function FlowNode({ node, active, dimmed }) {
  const s = STYLES[node.type] || STYLES.process;
  const on = active;
  const dim = dimmed ? 0.35 : 1;
  const sw = on ? 3.5 : 2;
  const lines = String(node.label).split("\n");
  const isDecision = node.type === "decision";
  const rx = node.type === "process" ? 14 : 22;

  return (
    <g style={{ opacity: dim, transition: "opacity 0.2s" }}>
      {isDecision ? (
        <polygon
          points={`${node.x},${node.y - node.h / 2} ${node.x + node.w / 2},${node.y} ${node.x},${node.y + node.h / 2} ${node.x - node.w / 2},${node.y}`}
          fill={on ? s.active : s.fill}
          stroke={s.stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      ) : (
        <rect
          x={node.x - node.w / 2}
          y={node.y - node.h / 2}
          width={node.w}
          height={node.h}
          rx={rx}
          fill={on ? s.active : s.fill}
          stroke={s.stroke}
          strokeWidth={sw}
        />
      )}
      {lines.map((ln, i) => (
        <text
          key={i}
          x={node.x}
          y={node.y + (i - (lines.length - 1) / 2) * 13}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={s.text}
          style={{ fontSize: 11, fontWeight: on ? 800 : 650, fontFamily: "Poppins, sans-serif" }}
        >
          {ln}
        </text>
      ))}
    </g>
  );
}

function FlowEdge({ edge, flow, activePath }) {
  const a = nodeById(flow, edge.from);
  if (!a) return null;
  const on = activePath?.has(edge.from) && activePath?.has(edge.to);
  const color =
    edge.label === "Yes" ? (on ? "#16a34a" : "#86efac") :
    edge.label === "No" ? (on ? "#dc2626" : "#fca5a5") :
    (on ? "#2563eb" : "#cbd5e1");
  const marker =
    edge.label === "Yes" ? "pfs-arrY" :
    edge.label === "No" ? "pfs-arrN" :
    (on ? "pfs-arrA" : "pfs-arr");
  const sw = on ? 3.5 : 2;

  const lx = edge.side === "left" ? a.x - 28 : edge.side === "right" ? a.x + 28 : a.x + 22;
  const ly = a.y + a.h / 2 + 14;

  return (
    <g>
      <path
        d={route(edge, flow)}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
        strokeLinecap="round"
        markerEnd={`url(#${marker})`}
      />
      {edge.label && !edge.back && (
        <g>
          <rect x={lx - 16} y={ly - 9} width="32" height="16" rx="8" fill={edge.label === "Yes" ? "#16a34a" : "#dc2626"} />
          <text
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            style={{ fontSize: 10, fontWeight: 800, fontFamily: "Poppins, sans-serif" }}
          >
            {edge.label}
          </text>
        </g>
      )}
    </g>
  );
}

function FlowchartSVG({ flow, activePath, stepMode }) {
  const vb = useMemo(() => computeViewBox(flow), [flow]);
  return (
    <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-b from-sky-50/70 to-white p-3 overflow-auto shadow-sm max-h-[600px]">
      <svg
        className="flow-chart-svg"
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Program flowchart"
      >
        <defs>
          <marker id="pfs-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#94a3b8" />
          </marker>
          <marker id="pfs-arrA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#2563eb" />
          </marker>
          <marker id="pfs-arrY" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#16a34a" />
          </marker>
          <marker id="pfs-arrN" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="#dc2626" />
          </marker>
        </defs>
        {flow.edges.map((e, i) => (
          <FlowEdge key={i} edge={e} flow={flow} activePath={activePath} />
        ))}
        {flow.nodes.filter((n) => !n.hidden).map((n) => (
          <FlowNode
            key={n.id}
            node={n}
            active={activePath?.has(n.id)}
            dimmed={stepMode && !activePath?.has(n.id)}
          />
        ))}
      </svg>
    </div>
  );
}

// ── Flow 1: Obstacle Avoidance ─────────────────────────────
const OBSTACLE_FLOW = {
  name: "Obstacle Avoidance",
  w: 760, h: 760,
  nodes: [
    { id: "loop", label: "loop()", type: "start", x: 380, y: 42, w: 140, h: 40 },
    { id: "read", label: "d = distanceFiltered()\nmedian of 3 readings", type: "process", x: 380, y: 118, w: 210, h: 52 },
    { id: "stop_check", label: "d ≤ 25?", type: "decision", x: 380, y: 210, w: 150, h: 72 },
    { id: "avoid", label: "avoid()", type: "process", x: 150, y: 320, w: 130, h: 42 },
    { id: "slow_check", label: "d < 45?", type: "decision", x: 560, y: 320, w: 140, h: 72 },
    { id: "backup", label: "stop + backup\n300 ms", type: "process", x: 150, y: 400, w: 150, h: 50 },
    { id: "cruise", label: "forward\nCRUISE_SPEED", type: "process", x: 640, y: 430, w: 140, h: 50 },
    { id: "slow", label: "forward\n3/4 speed", type: "process", x: 470, y: 430, w: 130, h: 50 },
    { id: "look", label: "right = lookAt(20°)\nleft = lookAt(160°)", type: "process", x: 150, y: 490, w: 180, h: 50 },
    { id: "both_check", label: "both < 25?", type: "decision", x: 150, y: 585, w: 150, h: 72 },
    { id: "turn_around", label: "turn 180°\nTURN_MS × 3", type: "process", x: 150, y: 690, w: 140, h: 50 },
    { id: "lr_check", label: "left > right?", type: "decision", x: 380, y: 585, w: 150, h: 72 },
    { id: "spin_left", label: "spin left\nTURN_MS", type: "process", x: 300, y: 690, w: 120, h: 48 },
    { id: "spin_right", label: "spin right\nTURN_MS", type: "process", x: 470, y: 690, w: 120, h: 48 },
  ],
  edges: [
    { from: "loop", to: "read" },
    { from: "read", to: "stop_check" },
    { from: "stop_check", to: "avoid", label: "Yes", side: "left" },
    { from: "stop_check", to: "slow_check", label: "No", side: "right" },
    { from: "avoid", to: "backup" },
    { from: "backup", to: "look" },
    { from: "look", to: "both_check" },
    { from: "both_check", to: "turn_around", label: "Yes" },
    { from: "both_check", to: "lr_check", label: "No", side: "right" },
    { from: "lr_check", to: "spin_left", label: "Yes", side: "left" },
    { from: "lr_check", to: "spin_right", label: "No", side: "right" },
    { from: "slow_check", to: "slow", label: "Yes", side: "left" },
    { from: "slow_check", to: "cruise", label: "No", side: "right" },
  ],
  evaluate: (i) => {
    const p = ["loop", "read", "stop_check"];
    if (i.distance <= 25) {
      p.push("avoid", "backup", "look", "both_check");
      if (i.left < 25 && i.right < 25) p.push("turn_around");
      else p.push("lr_check", i.left > i.right ? "spin_left" : "spin_right");
    } else {
      p.push("slow_check", i.distance < 45 ? "slow" : "cruise");
    }
    return new Set(p);
  },
};

// ── Flow 2: Line Follower (PD) ─────────────────────────────
const LINE_FLOW = {
  name: "Line Follower (PD)",
  w: 720, h: 700,
  nodes: [
    { id: "loop", label: "loop()", type: "start", x: 360, y: 42, w: 140, h: 40 },
    { id: "read", label: "seen = readLine(&err)\nerr = average weight of black sensors", type: "process", x: 360, y: 122, w: 250, h: 52 },
    { id: "seen0", label: "seen == 0?", type: "decision", x: 360, y: 220, w: 150, h: 72 },
    { id: "last_err", label: "lastError < 0?", type: "decision", x: 150, y: 340, w: 160, h: 72 },
    { id: "seen4", label: "seen == 4?", type: "decision", x: 560, y: 340, w: 150, h: 72 },
    { id: "search_l", label: "spin left\nsearch for line", type: "process", x: 80, y: 470, w: 140, h: 50 },
    { id: "search_r", label: "spin right\nsearch for line", type: "process", x: 230, y: 470, w: 140, h: 50 },
    { id: "cross", label: "drive straight\ncross or finish", type: "process", x: 560, y: 470, w: 150, h: 50 },
    { id: "pd", label: "correction = KP×err\n+ KD×(err − lastErr)", type: "process", x: 400, y: 470, w: 160, h: 52 },
    { id: "motor", label: "left = BASE + corr\nright = BASE − corr", type: "process", x: 400, y: 570, w: 180, h: 50 },
    { id: "back", label: "delay(5) → loop", type: "process", x: 360, y: 650, w: 160, h: 40 },
  ],
  edges: [
    { from: "loop", to: "read" },
    { from: "read", to: "seen0" },
    { from: "seen0", to: "last_err", label: "Yes", side: "left" },
    { from: "seen0", to: "seen4", label: "No", side: "right" },
    { from: "last_err", to: "search_l", label: "Yes", side: "left" },
    { from: "last_err", to: "search_r", label: "No", side: "right" },
    { from: "seen4", to: "cross", label: "Yes" },
    { from: "seen4", to: "pd", label: "No", side: "left" },
    { from: "pd", to: "motor" },
    { from: "motor", to: "back" },
    { from: "search_l", to: "back" },
    { from: "search_r", to: "back" },
    { from: "cross", to: "back" },
  ],
  evaluate: (i) => {
    const seen = [i.s1, i.s2, i.s3, i.s4].filter(Boolean).length;
    const p = ["loop", "read", "seen0"];
    if (seen === 0) p.push("last_err", i.lastError < 0 ? "search_l" : "search_r", "back");
    else if (seen === 4) p.push("seen4", "cross", "back");
    else p.push("seen4", "pd", "motor", "back");
    return new Set(p);
  },
};

// ── Flow 3: Line Maze Solver (C1) ──────────────────────────
const MAZE_LINE_FLOW = {
  name: "Line Maze Solver (C1)",
  w: 780, h: 980,
  nodes: [
    { id: "setup", label: "setup()", type: "start", x: 390, y: 42, w: 140, h: 40 },
    { id: "mode", label: "D12 == LOW?", type: "decision", x: 390, y: 130, w: 160, h: 76 },
    { id: "replay", label: "loadPath()\nfrom EEPROM", type: "process", x: 160, y: 250, w: 160, h: 52 },
    { id: "explore", label: "EXPLORE mode", type: "process", x: 620, y: 250, w: 150, h: 44 },
    { id: "follow", label: "followSegment()\nfollow the line until a\nbranch or a dead end", type: "process", x: 390, y: 360, w: 220, h: 62 },
    { id: "junction", label: "handleJunction()\ninch forward, then\ncheck left / straight / right", type: "process", x: 390, y: 470, w: 230, h: 62 },
    { id: "all_black", label: "all 4 black?", type: "decision", x: 390, y: 580, w: 160, h: 76 },
    { id: "finish", label: "FINISH\nsave path, blink LED", type: "end", x: 390, y: 700, w: 180, h: 52 },
    { id: "is_replay", label: "replay?", type: "decision", x: 620, y: 700, w: 140, h: 72 },
    { id: "choose", label: "chooseLeftHand\nL, then S, then R, then B\nrecord the decision", type: "process", x: 160, y: 820, w: 200, h: 62 },
    { id: "use_stored", label: "use path[i++]", type: "process", x: 620, y: 820, w: 150, h: 44 },
    { id: "simplify", label: "simplifyPath()\ncollapse xBx dead ends", type: "process", x: 160, y: 920, w: 190, h: 52 },
    { id: "turn", label: "turn(d)\nL / R / B / S", type: "process", x: 390, y: 920, w: 140, h: 50 },
  ],
  edges: [
    { from: "setup", to: "mode" },
    { from: "mode", to: "replay", label: "Yes", side: "left" },
    { from: "mode", to: "explore", label: "No", side: "right" },
    { from: "replay", to: "follow" },
    { from: "explore", to: "follow" },
    { from: "follow", to: "junction" },
    { from: "junction", to: "all_black" },
    { from: "all_black", to: "finish", label: "Yes" },
    { from: "all_black", to: "is_replay", label: "No", side: "right" },
    { from: "is_replay", to: "use_stored", label: "Yes" },
    { from: "is_replay", to: "choose", label: "No", side: "left" },
    { from: "choose", to: "simplify" },
    { from: "simplify", to: "turn", side: "right" },
    { from: "use_stored", to: "turn", side: "left" },
    { from: "turn", to: "follow", back: true },
  ],
  evaluate: (i) => {
    const p = ["setup", "mode", i.replay ? "replay" : "explore", "follow", "junction", "all_black"];
    if (i.allBlack) p.push("finish");
    else p.push("is_replay", i.replay ? "use_stored" : "choose", ...(i.replay ? [] : ["simplify"]), "turn");
    return new Set(p);
  },
};

// ── Flow 4: Wall Maze Solver (C2) ──────────────────────────
const WALL_MAZE_FLOW = {
  name: "Wall Maze Solver (C2)",
  w: 760, h: 860,
  nodes: [
    { id: "loop", label: "loop()", type: "start", x: 380, y: 42, w: 140, h: 40 },
    { id: "scan", label: "left = lookAt(175°)\nfront = lookAt(90°)\nright = lookAt(5°)", type: "process", x: 380, y: 122, w: 200, h: 62 },
    { id: "exit_check", label: "all > 150?", type: "decision", x: 380, y: 220, w: 150, h: 72 },
    { id: "exit", label: "EXIT reached\nstop forever", type: "end", x: 160, y: 340, w: 160, h: 50 },
    { id: "left_check", label: "left > 30?", type: "decision", x: 520, y: 340, w: 150, h: 72 },
    { id: "go_left", label: "spinLeft90()", type: "process", x: 300, y: 460, w: 140, h: 42 },
    { id: "front_check", label: "front > 30?", type: "decision", x: 560, y: 460, w: 150, h: 72 },
    { id: "go_straight", label: "go straight", type: "process", x: 380, y: 580, w: 130, h: 42 },
    { id: "right_check", label: "right > 30?", type: "decision", x: 600, y: 580, w: 150, h: 72 },
    { id: "go_right", label: "spinRight90()", type: "process", x: 500, y: 700, w: 140, h: 42 },
    { id: "uturn", label: "U-turn\nR90° × 2", type: "process", x: 680, y: 700, w: 120, h: 50 },
    { id: "forward", label: "forwardOneCell() → loop", type: "process", x: 420, y: 800, w: 200, h: 42 },
  ],
  edges: [
    { from: "loop", to: "scan" },
    { from: "scan", to: "exit_check" },
    { from: "exit_check", to: "exit", label: "Yes", side: "left" },
    { from: "exit_check", to: "left_check", label: "No", side: "right" },
    { from: "left_check", to: "go_left", label: "Yes", side: "left" },
    { from: "left_check", to: "front_check", label: "No" },
    { from: "front_check", to: "go_straight", label: "Yes", side: "left" },
    { from: "front_check", to: "right_check", label: "No", side: "right" },
    { from: "right_check", to: "go_right", label: "Yes", side: "left" },
    { from: "right_check", to: "uturn", label: "No", side: "right" },
    { from: "go_left", to: "forward" },
    { from: "go_straight", to: "forward" },
    { from: "go_right", to: "forward" },
    { from: "uturn", to: "forward" },
  ],
  evaluate: (i) => {
    const p = ["loop", "scan", "exit_check"];
    if (i.left > 150 && i.front > 150 && i.right > 150) {
      p.push("exit");
    } else {
      p.push("left_check");
      if (i.left > 30) {
        p.push("go_left");
      } else {
        p.push("front_check");
        if (i.front > 30) {
          p.push("go_straight");
        } else {
          p.push("right_check");
          p.push(i.right > 30 ? "go_right" : "uturn");
        }
      }
      p.push("forward");
    }
    return new Set(p);
  },
};

const FLOWS = [
  { id: "A", flow: OBSTACLE_FLOW },
  { id: "B", flow: LINE_FLOW },
  { id: "C1", flow: MAZE_LINE_FLOW },
  { id: "C2", flow: WALL_MAZE_FLOW },
];

// ── Interactive input controls per flow ─────────────────────
function ObstacleInputs({ inputs, setInputs }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-bold text-slate-700">Distance ahead</span>
          <span className="font-poppins font-extrabold text-blue-600 text-base">{inputs.distance} cm</span>
        </div>
        <input type="range" min="2" max="100" value={inputs.distance} onChange={(e) => setInputs({ ...inputs, distance: +e.target.value })} className="kid-slider w-full" style={{ "--knob": "#2563eb" }} />
      </div>
      {inputs.distance <= 25 ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5"><span className="text-xs font-bold text-slate-700">Left scan</span><span className="font-poppins font-extrabold text-green-600">{inputs.left} cm</span></div>
            <input type="range" min="2" max="100" value={inputs.left} onChange={(e) => setInputs({ ...inputs, left: +e.target.value })} className="kid-slider w-full" style={{ "--knob": "#16a34a" }} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5"><span className="text-xs font-bold text-slate-700">Right scan</span><span className="font-poppins font-extrabold text-orange-600">{inputs.right} cm</span></div>
            <input type="range" min="2" max="100" value={inputs.right} onChange={(e) => setInputs({ ...inputs, right: +e.target.value })} className="kid-slider w-full" style={{ "--knob": "#ea580c" }} />
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-500 italic leading-relaxed">Bring distance to 25 cm or less to open the left and right scans.</p>
      )}
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 text-xs font-bold text-slate-700">
        {inputs.distance <= 25
          ? (inputs.left < 25 && inputs.right < 25 ? "Both sides blocked: turn around." : inputs.left > inputs.right ? "Left is more open: spin left." : "Right is clearer: spin right.")
          : inputs.distance < 45 ? "Close, but safe: slow down." : "Clear ahead: cruise."}
      </div>
    </div>
  );
}

function LineInputs({ inputs, setInputs }) {
  const toggle = (key) => setInputs({ ...inputs, [key]: !inputs[key] });
  const sensors = [
    { key: "s1", label: "S1  w = −3", color: "#ef4444" },
    { key: "s2", label: "S2  w = −1", color: "#f97316" },
    { key: "s3", label: "S3  w = +1", color: "#16a34a" },
    { key: "s4", label: "S4  w = +3", color: "#2563eb" },
  ];
  const seen = [inputs.s1, inputs.s2, inputs.s3, inputs.s4].filter(Boolean).length;
  const weights = [-3, -1, 1, 3];
  const sum = sensors.reduce((acc, s, i) => acc + (inputs[s.key] ? weights[i] : 0), 0);
  const error = seen > 0 ? (sum / seen).toFixed(1) : "—";
  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-slate-600" style={{ fontStyle: "normal" }}>Tap the sensors that see black.</p>
      <div className="grid grid-cols-2 gap-2.5">
        {sensors.map((s) => (
          <button
            key={s.key}
            onClick={() => toggle(s.key)}
            className="kid-pill px-2 py-2.5 rounded-2xl border-2 text-xs font-bold transition-colors"
            style={inputs[s.key] ? { background: s.color, borderColor: s.color, color: "#fff" } : { background: "#fff", borderColor: "#e2e8f0", color: "#475569" }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5"><span className="text-xs font-bold text-slate-700">Last error</span><span className="font-poppins font-extrabold text-slate-700">{inputs.lastError}</span></div>
        <input type="range" min="-3" max="3" step="0.5" value={inputs.lastError} onChange={(e) => setInputs({ ...inputs, lastError: +e.target.value })} className="kid-slider w-full" style={{ "--knob": "#2563eb" }} />
      </div>
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 text-xs font-bold text-slate-700 leading-relaxed">
        seen = {seen} · error = {error}<br />
        {seen === 0 ? "Line lost: search using last error." : seen === 4 ? "All black: cross or finish." : "Partial line: PD follow."}
      </div>
    </div>
  );
}

function MazeLineInputs({ inputs, setInputs }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setInputs({ ...inputs, replay: false })} className={`kid-pill flex-1 px-3 py-2.5 rounded-2xl border-2 text-xs font-bold transition-colors ${!inputs.replay ? "bg-blue-500 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200"}`}>EXPLORE</button>
        <button onClick={() => setInputs({ ...inputs, replay: true })} className={`kid-pill flex-1 px-3 py-2.5 rounded-2xl border-2 text-xs font-bold transition-colors ${inputs.replay ? "bg-orange-500 text-white border-orange-600" : "bg-white text-slate-500 border-slate-200"}`}>REPLAY</button>
      </div>
      <button onClick={() => setInputs({ ...inputs, allBlack: !inputs.allBlack })} className={`kid-pill w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl border-2 text-xs font-bold transition-colors ${inputs.allBlack ? "bg-blue-500 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200"}`}>
        <span className={`w-4 h-4 rounded-md border-2 ${inputs.allBlack ? "bg-white border-white" : "border-slate-300"}`} /> All 4 sensors black (FINISH)
      </button>
      <p className="text-xs text-slate-500 italic leading-relaxed">
        {inputs.replay
          ? "Replay follows the saved shortest path from memory."
          : "Explore prefers left, records each turn, then removes dead ends with the xBx rule."}
      </p>
    </div>
  );
}

function WallMazeInputs({ inputs, setInputs }) {
  const dirs = [
    { key: "left", label: "Left", color: "#16a34a", text: "text-green-600" },
    { key: "front", label: "Front", color: "#2563eb", text: "text-blue-600" },
    { key: "right", label: "Right", color: "#ea580c", text: "text-orange-600" },
  ];
  const msg = inputs.left > 150 && inputs.front > 150 && inputs.right > 150 ? "All open: EXIT reached."
    : inputs.left > 30 ? "Left open: turn left."
    : inputs.front > 30 ? "Front open: go straight."
    : inputs.right > 30 ? "Right open: turn right."
    : "Blocked on three sides: U-turn.";
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {dirs.map((s) => (
          <div key={s.key}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-sm font-bold ${s.text}`}>{s.label}</span>
              <span className="font-poppins font-extrabold text-slate-700">{inputs[s.key]} cm</span>
            </div>
            <input type="range" min="5" max="200" value={inputs[s.key]} onChange={(e) => setInputs({ ...inputs, [s.key]: +e.target.value })} className="kid-slider w-full" style={{ "--knob": s.color }} />
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 text-xs font-bold text-slate-700">{msg}</div>
    </div>
  );
}

const INPUT_CONFIGS = {
  A: { defaults: { distance: 50, left: 40, right: 40 }, Comp: ObstacleInputs },
  B: { defaults: { s1: false, s2: true, s3: true, s4: false, lastError: 0 }, Comp: LineInputs },
  C1: { defaults: { replay: false, allBlack: false }, Comp: MazeLineInputs },
  C2: { defaults: { left: 50, front: 50, right: 50 }, Comp: WallMazeInputs },
};

// Scoped CSS: slider + pill styling, and the flowchart SVG sizing (scoped to .flow-chart-svg only).
const KID_CSS = `
.kid-slider{-webkit-appearance:none;appearance:none;height:16px;border-radius:999px;background:#eef2f7;outline:none;border:2px solid #d8e1ec}
.kid-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:30px;height:30px;border-radius:999px;background:var(--knob,#2563eb);border:4px solid #fff;box-shadow:0 3px 8px rgba(0,0,0,.25);cursor:pointer;transition:transform .1s}
.kid-slider::-webkit-slider-thumb:active{transform:scale(1.15)}
.kid-slider::-moz-range-thumb{width:30px;height:30px;border-radius:999px;background:var(--knob,#2563eb);border:4px solid #fff;box-shadow:0 3px 8px rgba(0,0,0,.25);cursor:pointer}
.kid-pill{transition:transform .1s}
.kid-pill:active{transform:scale(.95)}
.flow-chart-svg{display:block;width:100%;height:auto}
`;

function RobotFace() {
  return (
    <svg width="54" height="54" viewBox="0 0 64 64" aria-hidden="true" className="flex-shrink-0">
      <line x1="32" y1="3" x2="32" y2="13" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="6" r="4" fill="#f59e0b" />
      <rect x="9" y="14" width="46" height="34" rx="13" fill="#ea580c" />
      <rect x="5" y="25" width="6" height="12" rx="3" fill="#ea580c" />
      <rect x="53" y="25" width="6" height="12" rx="3" fill="#ea580c" />
      <circle cx="24" cy="28" r="4.5" fill="#fff" />
      <circle cx="40" cy="28" r="4.5" fill="#fff" />
      <circle cx="25" cy="29" r="2.2" fill="#1e293b" />
      <circle cx="41" cy="29" r="2.2" fill="#1e293b" />
      <path d="M24 38 Q32 44 40 38" stroke="#fff" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function ProgramFlowSimulator({ defaultFlow = "A" }) {
  const [activeFlow, setActiveFlow] = useState(defaultFlow);
  const [inputs, setInputs] = useState(INPUT_CONFIGS[defaultFlow].defaults);
  const [stepMode, setStepMode] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const flow = FLOWS.find((f) => f.id === activeFlow).flow;
  const fullPath = flow.evaluate(inputs);
  const activePath = stepMode
    ? new Set([...fullPath].slice(0, stepIndex + 1))
    : fullPath;

  const switchFlow = (id) => {
    setActiveFlow(id);
    setInputs(INPUT_CONFIGS[id].defaults);
    setStepMode(false);
    setStepIndex(0);
    setRunning(false);
  };

  const startStep = () => {
    setStepMode(true);
    setStepIndex(0);
    setRunning(true);
  };

  const stepNext = () => {
    const pathArr = [...fullPath];
    if (stepIndex < pathArr.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setRunning(false);
    }
  };

  useEffect(() => {
    if (running && stepMode) {
      timerRef.current = setTimeout(() => {
        const pathArr = [...fullPath];
        if (stepIndex < pathArr.length - 1) {
          setStepIndex(stepIndex + 1);
        } else {
          setRunning(false);
        }
      }, 850);
    }
    return () => clearTimeout(timerRef.current);
  }, [running, stepMode, stepIndex, fullPath]);

  const reset = () => {
    setStepMode(false);
    setStepIndex(0);
    setRunning(false);
  };

  const InputComp = INPUT_CONFIGS[activeFlow].Comp;

  return (
    <div className="space-y-4">
      <style>{KID_CSS}</style>
      <p className="text-sm text-slate-600 leading-relaxed">
        Move the knobs and watch the bright path light up. <span className="font-bold text-green-600">Green lines = "Yes"</span>, <span className="font-bold text-red-500">red lines = "No"</span>. Press Step to walk the robot through one choice at a time.
      </p>

      {/* Flow tabs */}
      <div className="flex flex-wrap gap-2">
        {FLOWS.map((f) => (
          <button
            key={f.id}
            onClick={() => switchFlow(f.id)}
            className={`kid-pill px-4 py-2 rounded-2xl text-xs font-bold border-2 transition-colors ${
              activeFlow === f.id ? "bg-blue-500 text-white border-blue-600 shadow" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
            }`}
          >
            {f.flow.name}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {!stepMode ? (
          <button onClick={startStep} className="kid-pill inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-green-500 text-white text-xs font-bold border-2 border-green-600 shadow hover:bg-green-600">
            <Play size={14} /> Step Through
          </button>
        ) : (
          <>
            <button onClick={() => setRunning(!running)} className="kid-pill inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-500 text-white text-xs font-bold border-2 border-blue-600 shadow hover:bg-blue-600">
              {running ? <Pause size={14} /> : <Play size={14} />} {running ? "Pause" : "Auto-play"}
            </button>
            <button onClick={stepNext} disabled={running} className="kid-pill inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-orange-500 text-white text-xs font-bold border-2 border-orange-600 shadow hover:bg-orange-600 disabled:opacity-50">
              <StepForward size={14} /> Next Step
            </button>
          </>
        )}
        <button onClick={reset} className="kid-pill inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white text-slate-600 text-xs font-bold border-2 border-slate-200 hover:bg-slate-50">
          <RotateCcw size={14} /> Reset
        </button>
        {stepMode && <span className="text-xs font-bold text-slate-500 ml-1">Step {stepIndex + 1} / {[...fullPath].length}</span>}
      </div>

      {/* Flowchart + Robot Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.75fr] gap-4">
        <FlowchartSVG flow={flow} activePath={activePath} stepMode={stepMode} />
        <Card className="p-5 border-2 border-orange-200 bg-gradient-to-b from-orange-50/70 to-white shadow-sm">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-orange-200/60">
            <RobotFace />
            <div>
              <p className="font-poppins font-extrabold text-base text-slate-800">Robot Controls</p>
              <p className="text-xs text-slate-500">Change a sense, and the bright path updates.</p>
            </div>
          </div>
          <InputComp inputs={inputs} setInputs={setInputs} />
        </Card>
      </div>
    </div>
  );
}